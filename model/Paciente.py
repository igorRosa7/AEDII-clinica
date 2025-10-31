from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

# ------------------------------------------------------------------
# 3. Tabelas de Dados e Relacionamentos
# ------------------------------------------------------------------

class Paciente(Base):
    __tablename__ = 'paciente'

    idpaciente = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    sexo = Column(String(10), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    telefone = Column(String(15), nullable=False)
    email = Column(String(45), nullable=False)
    endereco = Column(String(100), nullable=False)
    data_cadastro = Column(Date, nullable=False)
    
    # Chave Estrangeira
    secretaria_idsecretaria = Column(ForeignKey('secretaria.idsecretaria'), nullable=False)
