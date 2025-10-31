from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base

class Agenda(Base):
    __tablename__ = 'agenda'

    idagenda = Column(Integer, primary_key=True, autoincrement=True)
    data_consulta = Column(DateTime, nullable=False)
    hora_consulta = Column(Time, nullable=False)
    
    # Chaves Estrangeiras
    paciente_id = Column(ForeignKey('paciente.idpaciente'), nullable=False)
    usuario_id = Column(ForeignKey('usuario.idusuario'), nullable=False)

