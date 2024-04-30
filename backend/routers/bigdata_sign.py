from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from backend.middleware.bigdata_rsa_funcs import generate_keypair_rsa_bd, sign_rsa_bd
from backend.middleware.bigdata_eg_funcs import generate_keypair_eg_bd, sign_eg_bd
from sympy import isprime


router = APIRouter(prefix="/bigdata/sign")




@router.get("/rsa", response_class=JSONResponse)
async def sign_rsa_bd_endpoint(message: int = Query(...), p: int = Query(...), q: int = Query(...)) -> JSONResponse:
    try:
        while not isprime(p):
            p += 1
        while not isprime(q):
            q += 1
        public_key, private_key =  generate_keypair_rsa_bd(p, q)
        signature = sign_rsa_bd(message, private_key)
        return JSONResponse(content={"signature": signature, "public_key": public_key}, status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    

@router.get("/eg", response_class=JSONResponse)
async def sign_rsa_bd_endpoint(message: int = Query(...), p: int = Query(...), g: int = Query(...)) -> JSONResponse:
    try:
        while not isprime(p):
            p += 1
        while not isprime(g):
            g += 1
        private_key, public_key = generate_keypair_eg_bd(p=p, g=g)
        signature = sign_eg_bd(message, p, g, private_key)
        return JSONResponse(content={"signature": signature, "public_key": public_key}, status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)


@router.get("/rsa/pow", response_class=JSONResponse)
async def sign_rsa_bd_pow_endpoint(messagen: int = Query(...), pn: int = Query(...), qn: int = Query(...)) -> JSONResponse:
    try:
        p = 2**pn
        q = 2**qn
        while not isprime(p):
            p += 1
        while not isprime(q):
            q += 1
        public_key, private_key = generate_keypair_rsa_bd(p, q)
        signature =  sign_rsa_bd(message=2**messagen, private_key=private_key)
        return JSONResponse(content={"signature": str(signature),
                                     "p1": str(public_key[0]),
                                     "p2": str(public_key[1])}, status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)
    

@router.get("/eg/pow", response_class=JSONResponse)
async def sign_rsa_bd_pow_endpoint(messagen: int = Query(...), pn: int = Query(...), gn: int = Query(...)) -> JSONResponse:
    try:
        p = 2**pn
        g = 2**gn
        while not isprime(p):
            p += 1
        while not isprime(g):
            g += 1
        public_key, private_key = generate_keypair_eg_bd(p=p, g=g)
        signature =  sign_eg_bd(message=2**messagen,p=p, g=g, private_key=private_key)
        return JSONResponse(content={"s1": str(signature[0]),
                                     "s2": str(signature[1]),
                                     "public": str(public_key)}, status_code=200)
    except:
        return JSONResponse(content="Неверные входные данные", status_code=400)