from fastapi import APIRouter, Depends, HTTPException
from models import Usuario, Secretaria, Medico
from schemas.usuario import UsuarioCreate, UsuarioResponse
from schemas.secretaria import SecretariaCreate, SecretariaResponse
from schemas.medico import MedicoCreate, MedicoResponse
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from services.verifica_user import is_id_associado

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/usuarios/", response_model=UsuarioResponse)
async def criar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    # Verifica se email já existe
    existe = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if existe:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    novo_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=usuario.senha
    )
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@auth_router.post("/secretarias/", response_model=SecretariaResponse)
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

@auth_router.post("/medicos/", response_model=MedicoResponse)
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

