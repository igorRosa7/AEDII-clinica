from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dao.BancoDados import get_db
from models import Usuario, Medico, Secretaria
from schemas.auth import LoginRequest, LoginResponse # Importe o schema acima

auth_router = APIRouter(prefix="/auth", tags=["Autenticação"])

@auth_router.post("/login", response_model=LoginResponse)
def login_unificado(dados: LoginRequest, db: Session = Depends(get_db)):
    
    # 1. Autenticação Básica (Tabela Pai)
    # Procura o usuário pelo nome (ou email)
    usuario = db.query(Usuario).filter(Usuario.nome == dados.nome).first()
    
    # Validações básicas
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    if usuario.senha != dados.senha:
        raise HTTPException(status_code=401, detail="Senha incorreta.")

    # 2. Descobrir o Cargo (Role)
    role_detectada = "usuario_comum" # Default caso não seja nenhum dos dois

    # Verifica se o ID existe na tabela de Médicos
    medico = db.query(Medico).filter(Medico.idmedico == usuario.idusuario).first()
    if medico:
        role_detectada = "medico"
    
    # Se não for médico, verifica se é Secretária
    else:
        secretaria = db.query(Secretaria).filter(Secretaria.idsecretaria == usuario.idusuario).first()
        if secretaria:
            role_detectada = "secretaria"
    
    # Se chegou aqui e a role continua "usuario_comum", significa que ele tem login
    # mas não foi cadastrado nem como médico nem como secretária (Erro de consistência ou admin)
    if role_detectada == "usuario_comum":
         raise HTTPException(status_code=403, detail="Usuário sem perfil de acesso definido.")

    # 3. Retorno Unificado
    return {
        "id": usuario.idusuario,
        "nome": usuario.nome,
        "role": role_detectada,
        "token": "token_falso_123" # Futuramente você implementa JWT aqui
    }