import secrets
import sqlite3
from datetime import datetime, timezone

from .config import get_db_path

SCHEMA = """
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    project_type TEXT NOT NULL,
    location TEXT,
    preferred_product TEXT,
    estimated_bill TEXT,
    message TEXT NOT NULL,
    consent_to_contact INTEGER NOT NULL
);
"""


def _connect() -> sqlite3.Connection:
    db_path = get_db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(db_path, timeout=10)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    with _connect() as connection:
        connection.execute(SCHEMA)


def create_inquiry(data: dict) -> str:
    """Persist an inquiry and return its public reference id."""
    now = datetime.now(timezone.utc)
    reference = f"OP-{now:%Y%m%d}-{secrets.token_hex(3).upper()}"

    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO inquiries (
                id, created_at, name, email, phone, project_type,
                location, preferred_product, estimated_bill, message,
                consent_to_contact
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                reference,
                now.isoformat(),
                data["name"],
                data.get("email"),
                data.get("phone"),
                data["project_type"],
                data.get("location"),
                data.get("preferred_product"),
                data.get("estimated_bill"),
                data["message"],
                int(bool(data["consent_to_contact"])),
            ),
        )

    return reference
