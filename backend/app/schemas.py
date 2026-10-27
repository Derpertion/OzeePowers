import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class InquiryIn(BaseModel):
    """Public inquiry payload.

    Field aliases follow the camelCase contract in Docs/API_ROUTES.md.
    """

    model_config = ConfigDict(
        populate_by_name=True,
        str_strip_whitespace=True,
        extra="forbid",
    )

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=32)
    project_type: Literal["residential", "commercial", "industrial", "other"] = Field(
        alias="projectType"
    )
    location: str | None = Field(default=None, max_length=160)
    preferred_product: str | None = Field(default=None, max_length=120, alias="preferredProduct")
    estimated_bill: str | None = Field(default=None, max_length=32, alias="estimatedBill")
    message: str = Field(min_length=5, max_length=2000)
    consent_to_contact: bool = Field(alias="consentToContact")

    # Hidden field used as a simple spam trap. Real users never fill this in.
    company: str | None = Field(default=None, max_length=200)

    @model_validator(mode="after")
    def validate_inquiry(self) -> "InquiryIn":
        if not self.email and not (self.phone or "").strip():
            raise ValueError("Provide an email address or a phone number.")
        if not self.consent_to_contact:
            raise ValueError("Consent to be contacted is required.")
        if self.phone:
            digits = re.sub(r"\D", "", self.phone)
            if not 10 <= len(digits) <= 15:
                raise ValueError("Phone number must contain 10 to 15 digits.")
        return self


class InquiryAccepted(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    message: str
    # False when the inquiry was stored but the company email could not be sent.
    notification_sent: bool = Field(alias="notificationSent")
