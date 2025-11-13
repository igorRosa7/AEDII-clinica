from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from schemas.paciente import PacienteCreate, PacienteResponse
from models import  Paciente, Secretaria
from schemas.paciente import PacienteCreate, PacienteResponse

patiente_router = APIRouter(prefix="/patients", tags=["patiente"])

@patiente_router.post("/", response_model=PacienteResponse)
async def criar_paciente(paciente: PacienteCreate, db: Session = Depends(get_db)):
    # Verifica se a secretária existe
    secretaria = db.query(Secretaria).filter(Secretaria.idsecretaria == paciente.secretaria_idsecretaria).first()
    if not secretaria:
        raise HTTPException(status_code=404, detail="Secretária não encontrada para associar ao paciente")
    
    novo_paciente = Paciente(
        nome=paciente.nome,
        sexo=paciente.sexo,
        cpf=paciente.cpf,
        data_nascimento=paciente.data_nascimento,
        telefone=paciente.telefone,
        email=paciente.email,
        endereco=paciente.endereco,
        data_cadastro=paciente.data_cadastro,
        secretaria_idsecretaria=paciente.secretaria_idsecretaria
    )
    try:
        db.add(novo_paciente)
        db.flush()
        db.commit()
        return novo_paciente
    except Exception:
        db.rollback()
        # ... (Seu tratamento de erro de CPF ou outro)
    raise HTTPException(status_code=500, detail=f"Erro interno ao cadastrar paciente. Confira se o CPF já não está cadastrado.")