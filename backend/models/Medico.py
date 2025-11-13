from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base
from sqlalchemy.orm import relationship
from models.Usuario import Usuario

class Medico(Base):
    __tablename__ = 'medico'

    # FK e PK (idmedico é a chave primária E a chave estrangeira referenciando Usuario)
    idmedico = Column(
        Integer,
        ForeignKey('usuario.idusuario'), 
        primary_key=True
     )
    
    especialidade = Column(String(45), nullable=False)
    crm = Column(String(45), nullable=False)

    usuario = relationship("Usuario", primaryjoin=idmedico==Usuario.idusuario, uselist=False)

# FIM DO MODELO.
