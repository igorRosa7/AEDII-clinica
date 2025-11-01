from sqlalchemy import Column, Integer, String, ForeignKey
from dao.BancoDados import Base # Importa a Base (do dao/BancoDados.py)
from sqlalchemy.orm import relationship
from models.Usuario import Usuario

# Importação do Usuario não é estritamente necessária aqui, 
# mas é mantida por clareza se for usada em outra parte do arquivo
# from .Usuario import Usuario 

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
    # NOVO: Adiciona o relationship 1:1 para a tabela Usuario
    # Isso permite que o Pydantic acesse: secretaria_obj.usuario.nome
    usuario = relationship("Usuario", primaryjoin=idsecretaria==Usuario.idusuario, uselist=False)

# FIM DO MODELO.