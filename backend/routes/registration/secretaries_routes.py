from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from typing import List
from models import Usuario, Secretaria
from schemas.secretaria import SecretariaCreate, SecretariaResponse
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from services.verifica_user import is_id_associado

secretarie_router = APIRouter(prefix="/secretarias", tags=["secRoutes"])

@secretarie_router.get("/", response_model=List[SecretariaResponse])
def listar_secretarias(db: Session = Depends(get_db)):
    
    # 🛑 MUDANÇA: Usar selectinload para carregar o Usuario junto
    stmt = select(Secretaria).options(
        selectinload(Secretaria.usuario) 
    )
    
    secretarias = db.scalars(stmt).all()
    
    # O Pydantic agora tentará ler 'secretaria.usuario.nome'
    return secretarias


@secretarie_router.post("/novo", response_model=SecretariaResponse)
async def criar_secretaria(secretaria: SecretariaCreate, db: Session = Depends(get_db)):
    usuario_id = secretaria.idsecretaria
    
    # Confirma que o ID não está sendo usado por outro cargo
    if is_id_associado(db, usuario_id):
        raise HTTPException(
            status_code=400, 
            detail=f"O ID {usuario_id} já está associado a outro cargo (Médico ou Secretária)."
        )
    # Verifica se o usuario existe
    usuario = db.query(Usuario).filter(Usuario.idusuario == secretaria.idsecretaria).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado para associar à secretária")

    nova_secretaria = Secretaria(
        idsecretaria=secretaria.idsecretaria,
        horario_trab=secretaria.horario_trab
    )
    db.add(nova_secretaria)
    db.commit()
    db.refresh(nova_secretaria)
    return nova_secretaria