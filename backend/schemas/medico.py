from pydantic import BaseModel

class MedicoCreate(BaseModel):
    idmedico: int
    especialidade: str
    crm: str
    
    class Config:
        from_attributes = True

class MedicoResponse(BaseModel):
    """Retorno de dados do médico."""
    idmedico: int
    especialidade: str
    crm: str
    nome: str
    
    class Config:
        from_attributes = True
