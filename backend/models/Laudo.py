from sqlalchemy import Column, Integer, String, Date, Text
from dao.BancoDados import Base

class Laudo(Base):
    __tablename__ = 'laudos'

    idlaudos = Column(Integer, primary_key=True, autoincrement=True)

    
    # Campo adicionado para identificar de quem é o laudo, já que não temos mais ID
    paciente = Column(String(150), nullable=False) 
    
    descricao = Column(Text, nullable=False)
    data_emissao = Column(Date, nullable=False)

    def __repr__(self):
        return f"<Laudo {self.idlaudos} - {self.paciente}>"