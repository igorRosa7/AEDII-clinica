from sqlalchemy.orm import Session
from models.Secretaria import Secretaria
from models.Medico import Medico

def is_id_associado(db: Session, usuario_id: int) -> bool:
    """
    Verifica se o ID de Usuário já existe em Secretaria OU em Medico.
    Retorna True se o ID já estiver sendo usado em alguma função, False caso contrário.
    """
    medico_existe = db.query(Medico).filter(
        Medico.idmedico == usuario_id
    ).first()
    
    if medico_existe:
        return True

    secretaria_existe = db.query(Secretaria).filter(
        Secretaria.idsecretaria == usuario_id
    ).first()

    if secretaria_existe:
        return True
        
    return False