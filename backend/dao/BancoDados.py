from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

USUARIO = "root"     
SENHA = ""        
HOST = "localhost"                
BANCO_DE_DADOS = "clinica_medica"


SQLALCHEMY_DATABASE_URL = (
    f"mysql+pymysql://{USUARIO}:{SENHA}@{HOST}/{BANCO_DE_DADOS}"
)


engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: Classe base para todos os modelos ORM.

Base = declarative_base()
Base.metadata.create_all(bind=engine)

# Função de Inicialização

def init_db():
    Base.metadata.create_all(bind=engine)   


# FUNÇÃO PARA OBTER SESSÃO

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  

