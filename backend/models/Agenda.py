from sqlalchemy import Column, Integer, DateTime, Time, ForeignKey
from dao.BancoDados import Base
from sqlalchemy.orm import relationship

class Agenda(Base):
    __tablename__ = 'agenda'

    idagenda = Column(Integer, primary_key=True, autoincrement=True)
    data_consulta = Column(DateTime, nullable=False)
    hora_consulta = Column(Time, nullable=False)
    
    # Chaves Estrangeiras
    paciente_id = Column(
        Integer, 
        ForeignKey('paciente.idpaciente'), 
        nullable=False
    )
    usuario_id = usuario_id = Column(
        Integer, 
        ForeignKey('usuario.idusuario'), 
        nullable=False
    )

    paciente = relationship("Paciente", back_populates="agendas")
    usuario = relationship("Usuario", back_populates="agendas")

