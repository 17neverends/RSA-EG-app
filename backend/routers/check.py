from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from backend.middleware.rsa_funcs import rsa_check
from backend.middleware.eg_funcs import calculate_public_key_eg, sign_message_eg, verify_signature_eg

router = APIRouter(prefix="/check")

@router.get("/rsa", response_class=JSONResponse)
async def check_rsa(m: int = Query(...), e: int = Query(...), n: int = Query(...), s: int = Query(...)) -> JSONResponse:
    try:
        if await rsa_check(m=m, e=e, n=n, s=s):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)


@router.get("/eg", response_class=JSONResponse)
async def check_eg(m: int = Query(...), k: int = Query(...), x: int = Query(...), p: int = Query(...), g: int = Query(...)) -> JSONResponse:
    try:
        y = await calculate_public_key_eg(g=g, x=x, p=p)
        r, s = await sign_message_eg(m=m, k=k, g=g, x=x, p=p)
        if await verify_signature_eg(m=m, r=r, s=s, g=g, y=y, p=p):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)