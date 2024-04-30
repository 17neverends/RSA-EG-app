from fastapi import APIRouter
from fastapi.responses import JSONResponse
from backend.models.rsa_signature import SignatureRSA
from backend.models.eg_signature import SignatureEG
from backend.middleware.rsa_funcs import rsa_sign
from backend.middleware.eg_funcs import eg_sign

router = APIRouter(prefix="/sign")


@router.post("/rsa", response_class=JSONResponse)
async def sign_rsa(signature: SignatureRSA) -> JSONResponse:
    try:
        result = await rsa_sign(exp=signature.exp, size=signature.size, message=signature.message)
        return JSONResponse(content=result.hex(), status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    

@router.post("/eg", response_class=JSONResponse)
async def sign_eg(signature: SignatureEG) -> JSONResponse:
    try:
        result = await eg_sign(message=signature.message)
        return JSONResponse(content=result.hex(), status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
