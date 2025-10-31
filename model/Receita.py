from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

class Receita(Base):
    __tablename__ = 'receitas'

    # Adicionado um PK simples, pois o SQL original não tinha. É necessário para ORMs.
    id = Column(Integer, primary_key=True, autoincrement=True) 
    medicamento = Column(Text, nullable=False)
    dosagem = Column(Text, nullable=False)
    data_prescricao = Column(Date, nullable=False)

    # Chave Estrangeira
    prontuario_idprontuario = Column(ForeignKey('prontuario.idprontuario'), nullable=False)
