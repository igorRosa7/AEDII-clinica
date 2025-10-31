from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

class Usuario(Base):
    __tablename__ = "usuario"
    
    idusuario = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nome = Column(String(80), nullable=False)
    email = Column(String(80), nullable=False)
    senha = Column(String(100), nullable=False)
    
    
    def __init__(self, nome:str, email:str, senha:str):
        self.nome = nome
        self.email = email
        self.senha = senha
