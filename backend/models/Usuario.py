from sqlalchemy import Column, Integer, String
from dao.BancoDados import Base
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__ = "usuario"
    
    idusuario = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nome = Column(String(80), nullable=False)
    email = Column(String(80), nullable=False)
    senha = Column(String(100), nullable=False)
    agendas = relationship("Agenda", back_populates="usuario")

    def __init__(self, nome:str, email:str, senha:str):
        self.nome = nome
        self.email = email
        self.senha = senha
