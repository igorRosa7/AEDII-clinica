from pydantic import BaseModel


class SecretariaCreate(BaseModel):
    idsecretaria: int
    horario_trab: str
    
    class Config:
        orm_mode = True

class SecretariaResponse(BaseModel):
    """Retorno de dados da secretária."""
    idsecretaria: int
    horario_trab: str
    nome: str
    
    class Config:
        from_attributes = True