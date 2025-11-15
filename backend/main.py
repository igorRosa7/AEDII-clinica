from fastapi import FastAPI
from routes.registration.users_routes import user_router
from routes.registration.secretaries_routes import secretarie_router
from routes.registration.doctors_routes import doctor_router
from routes.patient.patient_routes import patiente_router
from routes.schedule.schedule_route import agendamento_router

app = FastAPI()

app.include_router(user_router)
app.include_router(secretarie_router)
app.include_router(doctor_router)
app.include_router(patiente_router)
app.include_router(agendamento_router)
