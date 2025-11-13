from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

class Laudo(Base):
    __tablename__ = 'laudos'

    idlaudos = Column(Integer, primary_key=True, autoincrement=True)
    descricao = Column(Text, nullable=False)
    data_emissao = Column(Date, nullable=False)

    # Chave Estrangeira
    prontuario_idprontuario = Column(ForeignKey('prontuario.idprontuario'), nullable=False)