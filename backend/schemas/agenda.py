from pydantic import BaseModel
from datetime import datetime, time
# Mantenha os imports de response se for usar no AgendaResponse
from schemas.usuario import UsuarioResponse
from schemas.paciente import PacienteResponse

class AgendaCreate(BaseModel):
    # MUDANÇA AQUI: Recebemos o CPF (texto), pois a secretária digita o CPF.
    cpf_paciente: str 
    
    # AQUI MANTÉM: Recebemos o ID, pois a secretária seleciona de uma lista.
    medico_id: int
    
    secretaria_id: int
    data_consulta: datetime
    hora_consulta: time 

class AgendaResponse(BaseModel):
    idagenda: int
    data_consulta: datetime
    hora_consulta: time
    
    # Relações para exibir os dados bonitos no retorno
    paciente: PacienteResponse 
    usuario: UsuarioResponse
    
    class Config:
        from_attributes = True