from pydantic import BaseModel

class LoginRequest(BaseModel):
    nome: str  # ou email, dependendo do seu banco
    senha: str

class LoginResponse(BaseModel):
    id: int
    nome: str
    role: str      # Aqui vamos dizer se é "medico" ou "secretaria"
    token: str     # Em um sistema real, aqui iria o JWT