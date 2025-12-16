from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

# Imports dos Models e Schemas
from models import Agenda, Paciente, Usuario
from schemas.agenda import AgendaCreate, AgendaResponse

agendamento_router = APIRouter(prefix="/agendas", tags=["scheduleRoutes"])

@agendamento_router.post("/novo", response_model=AgendaResponse, status_code=201)
def criar_agendamento(agenda_data: AgendaCreate, db: Session = Depends(get_db)):
    
    # === 1. LÓGICA DO PACIENTE (Buscar ID através do CPF) ===
    # O front enviou o CPF (string). Precisamos achar o objeto Paciente no banco.
    paciente = db.query(Paciente).filter(Paciente.cpf == agenda_data.cpf_paciente).first()
    
    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Paciente não encontrado com o CPF: {agenda_data.cpf_paciente}"
        )

    # === 2. LÓGICA DO MÉDICO (Manter ID vindo do Dropdown) ===
    # O front enviou o ID (int) direto do Select. Só validamos se ele existe.
    medico = db.query(Usuario).filter(Usuario.idusuario == agenda_data.medico_id).first()
    
    if not medico:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Médico informado (ID {agenda_data.medico_id}) não existe."
        )

    # === 3. CRIAÇÃO DO AGENDAMENTO ===
    novo_agendamento = Agenda(
        # Aqui usamos o ID que descobrimos na etapa 1
        paciente_id=paciente.idpaciente, 
        
        # Aqui usamos o ID que veio direto do front (dropdown)
        usuario_id=agenda_data.medico_id, 
        
        data_consulta=agenda_data.data_consulta,
        hora_consulta=agenda_data.hora_consulta
    )
    
    try:
        db.add(novo_agendamento)
        db.commit()
        db.refresh(novo_agendamento)
        return novo_agendamento
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Erro ao salvar agenda: {str(e)}"
        )
    
@agendamento_router.get("/", response_model=List[AgendaResponse])
def listar_agendamentos(db: Session = Depends(get_db)):
    # Buscamos a agenda carregando os relacionamentos de Paciente e Usuario (Médico)
    # para podermos exibir os nomes na tela
    stmt = select(Agenda).options(
        selectinload(Agenda.paciente),
        selectinload(Agenda.usuario)
    )
    agendas = db.scalars(stmt).all()
    return agendas

@agendamento_router.get("/medico/{medico_id}", response_model=List[AgendaResponse])
def listar_agenda_do_medico(medico_id: int, db: Session = Depends(get_db)):
    
    # Busca agendamentos ONDE o usuario_id (médico) é igual ao solicitado
    stmt = select(Agenda).where(
        Agenda.usuario_id == medico_id
    ).options(
        # Carregamos os dados do paciente para mostrar o nome/CPF
        selectinload(Agenda.paciente)
    ).order_by(
        Agenda.data_consulta, 
        Agenda.hora_consulta
    ) # Ordena por data e hora (os mais cedo primeiro)

    agendas = db.scalars(stmt).all()
    return agendas