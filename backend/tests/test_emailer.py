import smtplib

import pytest

from app import emailer
from app.config import MailSettings

INQUIRY = {
    "name": "Juan Dela Cruz",
    "email": "juan@example.com",
    "phone": "0917 123 4567",
    "project_type": "residential",
    "location": "Cabanatuan City, Nueva Ecija",
    "preferred_product": "Hybrid Solar System",
    "estimated_bill": "8000",
    "message": "Please prepare a quotation.\nThank you.",
    "consent_to_contact": True,
}


def settings(**overrides) -> MailSettings:
    values = {
        "host": "smtp.gmail.com",
        "port": 587,
        "username": "notifications@example.com",
        "password": "app-password",
        "mail_from": "notifications@example.com",
        "mail_to": "company@example.com",
        "use_ssl": False,
        "use_tls": True,
    }
    values.update(overrides)
    return MailSettings(**values)


def test_skips_when_not_configured(monkeypatch):
    called = False

    def fake_deliver(_settings, _message):
        nonlocal called
        called = True

    monkeypatch.setattr(emailer, "_deliver", fake_deliver)

    result = emailer.send_inquiry_notification(
        INQUIRY,
        "OP-20261026-TEST01",
        settings=settings(username=None, password=None),
    )

    assert result is False
    assert called is False


def test_builds_and_sends_plain_and_html_message(monkeypatch):
    captured = {}

    def fake_deliver(settings_arg, message):
        captured["settings"] = settings_arg
        captured["message"] = message

    monkeypatch.setattr(emailer, "_deliver", fake_deliver)

    result = emailer.send_inquiry_notification(
        INQUIRY, "OP-20261026-TEST02", settings=settings()
    )

    assert result is True
    message = captured["message"]
    assert message["To"] == "company@example.com"
    assert message["Reply-To"] == "juan@example.com"
    assert "OP-20261026-TEST02" in message["Subject"]

    plain = message.get_body(preferencelist=("plain",)).get_content()
    assert "Juan Dela Cruz" in plain
    assert "Please prepare a quotation." in plain

    html_body = message.get_body(preferencelist=("html",)).get_content()
    assert "Juan Dela Cruz" in html_body
    assert "Please prepare a quotation.<br>Thank you." in html_body


def test_escapes_html_in_user_content():
    body = emailer._html_body(
        {
            **INQUIRY,
            "name": "<script>alert('x')</script>",
            "message": "<b>bold</b> & <img src=x onerror=alert(1)>",
        },
        "OP-20261026-TEST03",
    )

    assert "<script>" not in body
    assert "&lt;script&gt;" in body
    assert "<img src=x" not in body
    assert "&lt;img src=x" in body


def test_raises_after_retrying_failed_delivery(monkeypatch):
    attempts = []

    def failing_deliver(_settings, _message):
        attempts.append(1)
        raise smtplib.SMTPServerDisconnected("connection lost")

    monkeypatch.setattr(emailer, "_deliver", failing_deliver)
    monkeypatch.setattr(emailer.time, "sleep", lambda _seconds: None)

    with pytest.raises(emailer.EmailDeliveryError):
        emailer.send_inquiry_notification(
            INQUIRY, "OP-20261026-TEST04", settings=settings(), attempts=2
        )

    assert len(attempts) == 2
