from sqlalchemy import Column, Integer, String, Date, ForeignKey
from dao.BancoDados import Base
from sqlalchemy.orm import relationship

class Paciente(Base):
    __tablename__ = 'paciente'

    idpaciente = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    sexo = Column(String(10), nullable=False)
    cpf = Column(String(11), nullable=False, unique=True)
    data_nascimento = Column(Date, nullable=False)
    telefone = Column(String(15), nullable=False)
    email = Column(String(45), nullable=False)
    endereco = Column(String(100), nullable=False)
    data_cadastro = Column(Date, nullable=False)
    secretaria_idsecretaria = Column(
        Integer, 
        ForeignKey('secretaria.idsecretaria'),
        nullable=False
    )
    agendas = relationship("Agenda", back_populates="paciente")