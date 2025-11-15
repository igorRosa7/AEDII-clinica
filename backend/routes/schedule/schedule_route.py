from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from models.Usuario import Usuario
# Importe os modelos necessários
from models import Agenda, Paciente, Usuario # Certifique-se de ter todos
from schemas.agenda import AgendaCreate, AgendaResponse

agendamento_router = APIRouter(prefix="/agenda", tags=["scheduleRoutes"])

@agendamento_router.post("/novo", response_model=AgendaResponse, status_code=201)
async def criar_agendamento(agenda_data: AgendaCreate, db: Session = Depends(get_db)):
    
  # === 1. VALIDAÇÃO DE CHAVES ESTRANGEIRAS ===
    
    # A. Paciente deve existir
    paciente = db.query(Paciente).filter(Paciente.idpaciente == agenda_data.paciente_id).first()
    if not paciente:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Paciente não encontrado.")

    # B. Médico deve existir (validamos pelo ID de Usuário)
    medico = db.query(Usuario).filter(Usuario.idusuario == agenda_data.medico_id).first()
    if not medico:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Médico não encontrado.")
    
    # C. Secretária deve existir (validamos pelo ID de Usuário)
    secretaria = db.query(Usuario).filter(Usuario.idusuario == agenda_data.secretaria_id).first()
    if not secretaria:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Secretária (agendadora) não encontrada.")
        
    # === 2. CRIAÇÃO DO OBJETO ORM ===
    novo_agendamento = Agenda(
        paciente_id=agenda_data.paciente_id,
        # 🎯 SALVANDO O ID DO MÉDICO NO CAMPO usuario_id DA TABELA AGENDA
        usuario_id=agenda_data.medico_id, 
        data_consulta=agenda_data.data_consulta,
        hora_consulta=agenda_data.hora_consulta
    )
    
    try:
        db.add(novo_agendamento)
        db.flush() # flush para obter o ID do agendamento antes do commit final (opcional)
        db.commit()
        db.refresh(novo_agendamento) # Carrega os relacionamentos para o retorno
        
        return novo_agendamento
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                            detail=f"Erro ao agendar consulta. Detalhes: {e.orig if hasattr(e, 'orig') else e}")