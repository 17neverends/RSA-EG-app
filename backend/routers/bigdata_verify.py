from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from backend.middleware.bigdata_rsa_funcs import verify_rsa_bd
from backend.middleware.bigdata_eg_funcs import verify_eg_bd

router = APIRouter(prefix="/bigdata/verify")


@router.get("/rsa", response_class=JSONResponse)
async def verify_rsa_bd_endpoint(message: int = Query(...), signature: int = Query(...), p1: int = Query(...), p2: int = Query(...)) -> JSONResponse:
    try:
        if verify_rsa_bd(message=message, signature=signature, public_key=(p1, p2)):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    
@router.get("/rsa/pow", response_class=JSONResponse)
async def verify_rsa_bd_pow_endpoint(message: str = Query(...), signature: str = Query(...), p1: str = Query(...), p2: str = Query(...)) -> JSONResponse:
    try:
        if verify_rsa_bd(message=2**int(message), signature=int(signature), public_key=(int(p1), int(p2))):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    

@router.get("/eg", response_class=JSONResponse)
async def verify_eg_bd_endpoint(message: int = Query(...), s1: int = Query(...), s2: int = Query(...), p: int = Query(...), g: int = Query(...), public: int = Query(...)) -> JSONResponse:
    try:
        if verify_eg_bd(message=message, signature=(s1, s2), p=p, g=g, public_key=public):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    


@router.get("/eg/pow", response_class=JSONResponse)
async def verify_eg_bd_pow_endpoint(messagen: str = Query(...), s1: str = Query(...), s2: str = Query(...), public: str = Query(...), pn: int = Query(...), gn: int = Query(...)) -> JSONResponse:
    try:
        if verify_eg_bd(message=2**int(messagen), signature=(int(s1) , int(s2)), p=2**pn, g=2**gn, public_key=int(public)):
            return JSONResponse(content="Подпись верна", status_code=200)
        return JSONResponse(content="Подпись неверна", status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)