import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DB_PATH = BACKEND_DIR / "data" / "inquiries.db"

load_dotenv(BACKEND_DIR / ".env")


def get_db_path() -> Path:
    """Return the configured SQLite path, creating no directories yet."""
    return Path(os.getenv("OZEE_DB_PATH", str(DEFAULT_DB_PATH))).expanduser().resolve()


def get_allowed_origins() -> list[str]:
    raw = os.getenv(
        "OZEE_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    )
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


def get_rate_limit_per_hour() -> int:
    try:
        return max(1, int(os.getenv("OZEE_RATE_LIMIT_PER_HOUR", "5")))
    except ValueError:
        return 5


def _env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class MailSettings:
    host: str
    port: int
    username: str | None
    password: str | None
    mail_from: str
    mail_to: str
    use_ssl: bool
    use_tls: bool

    @property
    def is_configured(self) -> bool:
        # Gmail SMTP requires an authenticated account and a recipient.
        return bool(self.mail_to and self.username and self.password and self.mail_from)


def get_mail_settings() -> MailSettings:
    username = os.getenv("OZEE_SMTP_USERNAME", "").strip() or None
    password = os.getenv("OZEE_SMTP_PASSWORD") or None
    use_ssl = _env_bool("OZEE_SMTP_USE_SSL", False)
    use_tls = False if use_ssl else _env_bool("OZEE_SMTP_USE_TLS", True)

    try:
        port = int(os.getenv("OZEE_SMTP_PORT", "465" if use_ssl else "587"))
    except ValueError:
        port = 465 if use_ssl else 587

    return MailSettings(
        host=os.getenv("OZEE_SMTP_HOST", "smtp.gmail.com").strip() or "smtp.gmail.com",
        port=port,
        username=username,
        password=password,
        mail_from=(os.getenv("OZEE_MAIL_FROM", "").strip() or username or ""),
        mail_to=os.getenv("OZEE_MAIL_TO", "").strip(),
        use_ssl=use_ssl,
        use_tls=use_tls,
    )
