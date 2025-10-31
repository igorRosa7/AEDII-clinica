from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

class Prontuario(Base):
    __tablename__ = 'prontuario'

    idprontuario = Column(Integer, primary_key=True, autoincrement=True)
    evolucao = Column(Text, nullable=False) # Mapeia LONGTEXT
    data_consulta = Column(Date, nullable=False)

    # Chaves Estrangeiras
    paciente_id = Column(ForeignKey('paciente.idpaciente'), nullable=False)
    medico_idmedico = Column(ForeignKey('medico.idmedico'), nullable=False)
