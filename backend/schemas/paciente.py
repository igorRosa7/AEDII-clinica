from pydantic import BaseModel, Field
from datetime import date

class PacienteCreate(BaseModel):
    nome: str
    sexo: str
    data_nascimento: date
    data_cadastro: date
    telefone: str
    email: str
    endereco: str
    secretaria_idsecretaria: int
    cpf: str = Field(
        ...,
        min_length=11, 
        max_length=14, 
        description="CPF do paciente (obrigatório e único)."
    )
    
    class Config:
        from_attributes = True

class PacienteResponse(BaseModel):
    """Retorno de dados do paciente."""
    idpaciente: int
    nome: str
    sexo: str
    telefone: str
    email: str
    endereco: str
    secretaria_idsecretaria: int
    cpf: str
    
    
    class Config:
        from_attributes = True