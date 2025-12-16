from pydantic import BaseModel
from datetime import date
from typing import Optional

# O que eu recebo para criar (Input)
class LaudoCreate(BaseModel):
    paciente: str
    descricao: str
    data_emissao: Optional[date] = None # Se não mandar, tratamos na rota

# O que eu devolvo para quem chamou (Output)
class LaudoResponse(BaseModel):
    idlaudos: int
    paciente: str
    descricao: str
    data_emissao: date

    class Config:
        from_attributes = True # Permite ler direto do objeto SQLAlchemy