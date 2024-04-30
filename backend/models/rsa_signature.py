from pydantic import BaseModel

class SignatureRSA(BaseModel):
    message: str
    exp: int
    size: int