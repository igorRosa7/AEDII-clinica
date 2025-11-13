from pydantic import BaseModel
from datetime import datetime, time
from schemas.usuario import UsuarioResponse
from schemas.paciente import PacienteResponse

class AgendaCreate(BaseModel):
  
    paciente_id: int
    medico_id: int
    secretaria_id: int
    data_consulta: datetime
    hora_consulta: time 

class AgendaResponse(BaseModel):
    idagenda: int
    data_consulta: datetime
    hora_consulta: time
    
    # Relações: Para exibir dados úteis sem forçar consulta extra
    # OBS: Para que isso funcione, os modelos ORM (Agenda) precisam ter o `relationship`
    # configurado para Paciente e Usuario.
    paciente: PacienteResponse 
    usuario: UsuarioResponse
    
    class Config:
        from_attributes = True