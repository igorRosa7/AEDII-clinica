from fastapi import APIRouter, Depends, HTTPException
from models import Usuario, Medico
from schemas.medico import MedicoCreate, MedicoResponse
from sqlalchemy.orm import Session, selectinload
from dao.BancoDados import get_db
from services.verifica_user import is_id_associado
from sqlalchemy import select
from typing import List


doctor_router = APIRouter(prefix="/doutores", tags=["docRoutes"])

@doctor_router.get("/", response_model=List[MedicoResponse])
def listar_medicos(db: Session = Depends(get_db)):
    """
    Lista todos os médicos cadastrados, incluindo o nome completo 
    do usuário base (tabela 'usuario') de forma eficiente.
    """
    
    # 1. CONSTRUÇÃO DA QUERY
    # Usamos selectinload(Medico.usuario) para carregar os dados da tabela Usuario
    # na mesma consulta, evitando o problema N+1.
    stmt = select(Medico).options(
        selectinload(Medico.usuario)
    )
    
    # 2. EXECUÇÃO DA CONSULTA
    medicos = db.scalars(stmt).all()
    
    # 3. RETORNO
    # O FastAPI serializa a lista de objetos Medico para o Schema MedicoResponse.
    # O Pydantic usará a propriedade @nome para preencher o campo nome.
    return medicos

@doctor_router.post("/novo", response_model=MedicoResponse)
async def criar_medico(medico: MedicoCreate, db: Session = Depends(get_db)):

    usuario_id = medico.idmedico

    if is_id_associado(db, usuario_id):
        raise HTTPException(
            status_code=400, 
            detail=f"O ID {usuario_id} já está associado a outro cargo (Médico ou Secretária)."
        )

    usuario = db.query(Usuario).filter(Usuario.idusuario == medico.idmedico).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado para associar ao médico")

    novo_medico = Medico(
        idmedico=medico.idmedico,
        especialidade=medico.especialidade,
        crm=medico.crm
    )
    db.add(novo_medico)
    db.commit()
    db.refresh(novo_medico)
    return novo_medico