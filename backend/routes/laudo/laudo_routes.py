from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

# Imports dos seus arquivos
from dao.BancoDados import get_db  # Função que gera a sessão do banco (dependency)
from models.Laudo import Laudo
from schemas.laudo import LaudoCreate, LaudoResponse

router = APIRouter(prefix="/laudos", tags=["Laudos"])

# --- ROTA DE CRIAÇÃO (POST) ---
# Substitui o método "criar_laudo" do Controller antigo
@router.post("/", response_model=LaudoResponse)
def criar_laudo(laudo_data: LaudoCreate, db: Session = Depends(get_db)):
    
    # 1. Lógica de data (se vier vazia, usa hoje)
    data_final = laudo_data.data_emissao if laudo_data.data_emissao else date.today()

    # 2. Cria o objeto do Model (Banco)
    novo_laudo = Laudo(
        paciente=laudo_data.paciente,
        descricao=laudo_data.descricao,
        data_emissao=data_final
    )

    # 3. Salva no banco
    try:
        db.add(novo_laudo)
        db.commit()
        db.refresh(novo_laudo) # Recarrega para pegar o ID gerado
        return novo_laudo
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao salvar laudo: {str(e)}")

# --- ROTA DE LISTAGEM (GET) ---
# Substitui o método "listar_todos"
@router.get("/", response_model=list[LaudoResponse])
def listar_laudos(db: Session = Depends(get_db)):
    return db.query(Laudo).order_by(Laudo.idlaudos.desc()).all()