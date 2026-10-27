import sqlite3

import pytest
from fastapi.testclient import TestClient

from app.config import get_db_path
from app.rate_limit import InMemoryRateLimiter

VALID_PAYLOAD = {
    "name": "Juan Dela Cruz",
    "email": "juan@example.com",
    "phone": "0917 123 4567",
    "projectType": "residential",
    "location": "Cabanatuan City, Nueva Ecija",
    "preferredProduct": "Hybrid Solar System",
    "estimatedBill": "8000",
    "message": "I would like to request a solar installation quotation.",
    "consentToContact": True,
}


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("OZEE_DB_PATH", str(tmp_path / "test-inquiries.db"))

    # Never allow a test run to send a real email, even if a local .env or
    # the developer's shell has SMTP credentials configured.
    for name in (
        "OZEE_MAIL_TO",
        "OZEE_MAIL_FROM",
        "OZEE_SMTP_USERNAME",
        "OZEE_SMTP_PASSWORD",
    ):
        monkeypatch.delenv(name, raising=False)

    from app.main import app, limiter

    limiter.reset()

    with TestClient(app) as test_client:
        yield test_client


def test_health(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_valid_inquiry_is_stored(client):
    response = client.post("/api/v1/inquiries", json=VALID_PAYLOAD)
    assert response.status_code == 201
    body = response.json()
    assert body["id"].startswith("OP-")
    assert body["message"] == "Your inquiry has been received."
    # Email is not configured in the test environment.
    assert body["notificationSent"] is False

    with sqlite3.connect(get_db_path()) as connection:
        row = connection.execute(
            "SELECT name, project_type, consent_to_contact FROM inquiries WHERE id = ?",
            (body["id"],),
        ).fetchone()

    assert row == ("Juan Dela Cruz", "residential", 1)


def test_notification_sent_flag_is_true_when_email_succeeds(client, monkeypatch):
    import app.main as main_module

    monkeypatch.setattr(main_module, "send_inquiry_notification", lambda inquiry, ref: True)

    response = client.post("/api/v1/inquiries", json=VALID_PAYLOAD)
    assert response.status_code == 201
    assert response.json()["notificationSent"] is True


def test_inquiry_is_kept_when_email_delivery_fails(client, monkeypatch):
    import app.main as main_module
    from app.emailer import EmailDeliveryError

    def fail(inquiry, reference):
        raise EmailDeliveryError("smtp down")

    monkeypatch.setattr(main_module, "send_inquiry_notification", fail)

    response = client.post("/api/v1/inquiries", json=VALID_PAYLOAD)
    assert response.status_code == 201
    body = response.json()
    assert body["notificationSent"] is False

    with sqlite3.connect(get_db_path()) as connection:
        stored = connection.execute(
            "SELECT COUNT(*) FROM inquiries WHERE id = ?", (body["id"],)
        ).fetchone()[0]

    assert stored == 1


def test_requires_email_or_phone(client):
    payload = {**VALID_PAYLOAD, "email": None, "phone": None}
    response = client.post("/api/v1/inquiries", json=payload)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_requires_consent(client):
    payload = {**VALID_PAYLOAD, "consentToContact": False}
    response = client.post("/api/v1/inquiries", json=payload)
    assert response.status_code == 400
    assert response.json()["error"]["code"] == "VALIDATION_ERROR"


def test_rejects_short_message(client):
    payload = {**VALID_PAYLOAD, "message": "Hi"}
    response = client.post("/api/v1/inquiries", json=payload)
    assert response.status_code == 400


def test_rejects_honeypot_submission(client):
    payload = {**VALID_PAYLOAD, "company": "spam-bot"}
    response = client.post("/api/v1/inquiries", json=payload)
    assert response.status_code == 400


def test_rate_limiter_blocks_after_limit():
    limiter = InMemoryRateLimiter(limit=2)
    assert limiter.allow("127.0.0.1") is True
    assert limiter.allow("127.0.0.1") is True
    assert limiter.allow("127.0.0.1") is False
    assert limiter.allow("127.0.0.2") is True
