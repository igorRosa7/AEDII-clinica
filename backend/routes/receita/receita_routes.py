from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from dao.BancoDados import get_db
from models.Receita import Receita
from schemas.receita import ReceitaCreate, ReceitaResponse

router = APIRouter(prefix="/receitas", tags=["Receitas"])

@router.post("/", response_model=ReceitaResponse)
def criar_receita(dados: ReceitaCreate, db: Session = Depends(get_db)):
    data_final = dados.data_prescricao if dados.data_prescricao else date.today()

    nova_receita = Receita(
        paciente=dados.paciente,
        medicamento=dados.medicamento,
        dosagem=dados.dosagem,
        data_prescricao=data_final
    )

    try:
        db.add(nova_receita)
        db.commit()
        db.refresh(nova_receita)
        return nova_receita
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao salvar receita: {str(e)}")