from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime, Time, Text, ForeignKey
from dao.BancoDados import Base


class Secretaria(Base):
    __tablename__ = 'secretaria'

    # FK e PK (idsecretaria é a chave primária E a chave estrangeira referenciando Usuario)
    idsecretaria = Column(ForeignKey('usuario.idusuario'), primary_key=True)
    horario_trab = Column(String(45), nullable=False)
