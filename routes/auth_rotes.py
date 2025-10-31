from fastapi import APIRouter, Depends, HTTPException
from model.Usuario import Usuario
from schemas import UsuarioCreate
from sqlalchemy.orm import Session
from dao.BancoDados import Base, engine, get_db

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/usuarios/")
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

