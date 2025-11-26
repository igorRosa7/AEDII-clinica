from starlette import status
from sqlalchemy import select
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from models import Usuario
from schemas.usuario import UsuarioCreate, UsuarioResponse
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from services.verifica_user import is_id_associado

user_router = APIRouter(prefix="/usuarios", tags=["userRoutes"])

@user_router.get("/", response_model=List[UsuarioResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    """
    Lista todos os usuários cadastrados no sistema (base).
    """
    
    # 1. CONSTRUÇÃO DA QUERY (SELECT * FROM usuario)
    stmt = select(Usuario)
    
    # 2. EXECUÇÃO DA CONSULTA
    # O .scalars() é o método ideal para obter os objetos ORM diretamente
    usuarios = db.scalars(stmt).all()
    
    # 3. RETORNO: O FastAPI serializa a lista de objetos Usuario para o Schema UsuarioResponse
    return usuarios


@user_router.get("/{usuario_id}", response_model=UsuarioResponse)
def buscar_usuario_por_id(usuario_id: int, db: Session = Depends(get_db)):
    """
    Busca um usuário específico pelo ID.
    """
    
    # 1. CONSTRUÇÃO E EXECUÇÃO DA QUERY
    # O .get() é um atalho eficiente para buscar pela Chave Primária (PK)
    usuario = db.get(Usuario, usuario_id)
    
    # 2. VERIFICAÇÃO DE EXISTÊNCIA
    if not usuario:
        # Se não for encontrado, retorna o código 404
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Usuário com ID {usuario_id} não encontrado."
        )
        
    # 3. RETORNO
    return usuario


@user_router.post("/novo", response_model=UsuarioResponse)
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





