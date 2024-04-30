from pydantic import BaseModel

class Verify(BaseModel):
    signature: str
    message: str