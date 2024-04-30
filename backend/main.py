from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.sign import router as sign_router
from backend.routers.verify import router as verify_router
from backend.routers.check import router as check_router
from backend.routers.bigdata_sign import router as bigdata_sign
from backend.routers.bigdata_verify import router as bigdata_verify

app = FastAPI()

app.include_router(sign_router)
app.include_router(verify_router)
app.include_router(check_router)
app.include_router(bigdata_sign)
app.include_router(bigdata_verify)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)