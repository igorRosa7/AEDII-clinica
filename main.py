from fastapi import FastAPI
from routes.auth_rotes import auth_router

app = FastAPI()

app.include_router(auth_router)




