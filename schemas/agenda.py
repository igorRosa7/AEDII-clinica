from pydantic import BaseModel
from datetime import datetime, time


# Importação dos Schemas de Saída para as relações (para puxar o nome do usuário/paciente)
from schemas.usuario import UsuarioResponse # Assumindo que você tem um Schema de Saída Usuario
from schemas.paciente import PacienteResponse # Assumindo que você tem um Schema de Saída Paciente

# -------------------------------------------------------------------
# 1. SCHEMA DE ENTRADA (INPUT)
# -------------------------------------------------------------------
class AgendaCreate(BaseModel):
    """
    Schema para receber dados de um novo agendamento (requisição POST).
    
    O FastAPI/Pydantic irá validar strings nos formatos ISO 8601 (Ex: '2025-11-15T10:00:00').
    """
    
    paciente_id: int 
    usuario_id: int 
    data_consulta: datetime
    hora_consulta: time 

# -------------------------------------------------------------------
# 2. SCHEMA DE SAÍDA (OUTPUT)
# -------------------------------------------------------------------
class Agenda(BaseModel):
    """
    Schema para retorno de dados (resposta da API).
    Inclui os IDs e, idealmente, os nomes associados.
    """
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