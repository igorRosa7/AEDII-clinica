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
    "http://localhost:5173", # O domínio onde o seu React está rodando
    "http://127.0.0.1:5173",
    # Se você for usar proxy no Vite, adicione a origem de lá também.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Lista de origens permitidas
    allow_credentials=True,           # Permite cookies/cabeçalhos de autenticação
    allow_methods=["*"],              # Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],              # Permite todos os cabeçalhos
)

app.include_router(user_router)
app.include_router(secretarie_router)
app.include_router(doctor_router)
app.include_router(patiente_router)
app.include_router(agendamento_router)
app.include_router(auth_router)
app.include_router(laudo_router)
app.include_router(receita_router)