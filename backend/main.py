from fastapi import FastAPI
from routes.auth_routes import auth_router
from routes.patient_routes import patiente_router
from routes.agendamento_route import agendamento_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(patiente_router)
app.include_router(agendamento_router)
