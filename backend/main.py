from fastapi import FastAPI
from routes.registration.users_routes import user_router
from routes.registration.secretaries_routes import secretarie_router
from routes.registration.doctors_routes import doctor_router
from routes.patient.patient_routes import patiente_router
from routes.schedule.schedule_route import agendamento_router
from routes.auth.auth_routes import auth_router
from routes.laudo.laudo_routes import router as laudo_router
from routes.receita.receita_routes import router as receita_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://aedii-clinica.vercel.app", # <--- COLOQUE AQUI A URL DO SEU FRONT NA VERCEL
    "*" # Use "*" apenas para testar se tudo falhar (libera para todo mundo)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(secretarie_router)
app.include_router(doctor_router)
app.include_router(patiente_router)
app.include_router(agendamento_router)
app.include_router(auth_router)
app.include_router(laudo_router)
app.include_router(receita_router)