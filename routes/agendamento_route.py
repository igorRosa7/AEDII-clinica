from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from models.Usuario import Usuario
# Importe os modelos necessários
from models import Agenda, Paciente, Usuario # Certifique-se de ter todos
from schemas.agenda import AgendaCreate, AgendaResponse

router = APIRouter(prefix="/agenda", tags=["agenda"])

@router.post("/", response_model=AgendaResponse, status_code=201)
async def criar_agendamento(agenda_data: AgendaCreate, db: Session = Depends(get_db)):
    
    # 1. VALIDAÇÃO DE CHAVES ESTRANGEIRAS
    
    # A. Verifica se o Paciente existe
    paciente = db.query(Paciente).filter(Paciente.idpaciente == agenda_data.paciente_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail=f"Paciente ID {agenda_data.paciente_id} não encontrado.")

    # B. Verifica se o Usuário (Médico/Secretária) existe
    usuario = db.query(Usuario).filter(Usuario.idusuario == agenda_data.usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail=f"Usuário ID {agenda_data.usuario_id} não encontrado.")

    # [Opcional] Você poderia adicionar aqui uma checagem de horário duplicado

    # 2. CRIAÇÃO DO OBJETO ORM
    novo_agendamento = Agenda(
        paciente_id=agenda_data.paciente_id,
        usuario_id=agenda_data.usuario_id,
        data_consulta=agenda_data.data_consulta,
        hora_consulta=agenda_data.hora_consulta
    )
    
    try:
        # 3. TRANSAÇÃO E RETORNO
        db.add(novo_agendamento)
        db.flush()
        db.commit()
        
        return novo_agendamento
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, 
            detail=f"Erro interno ao criar agendamento: {e.orig if hasattr(e, 'orig') else e}"
        )