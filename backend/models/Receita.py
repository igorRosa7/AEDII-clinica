from sqlalchemy import Column, Integer, Date, Text, String
from dao.BancoDados import Base

class Receita(Base):
    __tablename__ = 'receitas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Adicionado para vincular ao nome do paciente
    paciente = Column(String(150), nullable=False)
    
    medicamento = Column(Text, nullable=False)
    dosagem = Column(Text, nullable=False)
    data_prescricao = Column(Date, nullable=False)