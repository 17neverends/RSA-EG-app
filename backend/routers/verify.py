from fastapi import APIRouter
from fastapi.responses import JSONResponse
from backend.middleware.rsa_funcs import rsa_verify
from backend.middleware.eg_funcs import eg_verify
from backend.models.verify_data import Verify

router = APIRouter(prefix="/verify")

@router.post("/rsa", response_class=JSONResponse)
async def verify_rsa(verify_data: Verify) -> JSONResponse:
    try:
        if await rsa_verify(signature=verify_data.signature, data=verify_data.message):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)


@router.post("/eg", response_class=JSONResponse)
async def verify_eg(verify_data: Verify) -> JSONResponse:
    try:
        if await eg_verify(signature=verify_data.signature, data=verify_data.message):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)