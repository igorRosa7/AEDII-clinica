from pydantic import BaseModel
from datetime import date
from typing import Optional

class ReceitaCreate(BaseModel):
    paciente: str
    medicamento: str
    dosagem: str
    data_prescricao: Optional[date] = None

class ReceitaResponse(BaseModel):
    id: int
    paciente: str
    medicamento: str
    dosagem: str
    data_prescricao: date

    class Config:
        from_attributes = True