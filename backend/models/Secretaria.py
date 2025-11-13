from sqlalchemy import Column, Integer, String, ForeignKey
from dao.BancoDados import Base 
class Secretaria(Base):
    __tablename__ = 'secretaria'

    # 1. Chave Primária e Chave Estrangeira (O Ponto de Conexão com Usuario)
    # idsecretaria é a PK desta tabela, que referencia a PK de usuario.
    idsecretaria = Column(
        Integer, 
        ForeignKey('usuario.idusuario'), 
        primary_key=True
    )
    
    # Colunas Específicas da Secretária
    horario_trab = Column(String(45), nullable=False)