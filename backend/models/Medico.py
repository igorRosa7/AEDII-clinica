from sqlalchemy import Column, Integer, String, ForeignKey
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

    usuario = relationship(
        "Usuario",
        primaryjoin=idmedico==Usuario.idusuario,
        uselist=False)
    
    @property
    def nome(self):
        """Retorna o nome do usuário base (tabela Usuario)."""
        # Verifica se o relacionamento 'usuario' foi carregado antes de acessar o nome
        if self.usuario:
            return self.usuario.nome
        return "Usuário Não Carregado"

