from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict

from config import cors_origins


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(predict.router)

