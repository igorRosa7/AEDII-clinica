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


session = SessionLocal()




# 2. O Base: Classe base para todos os modelos ORM.

Base = declarative_base()
Base.metadata.create_all(bind=engine)



# ====================================================================
# 3. Função de Inicialização (Opcional, mas Útil)
# ===================================================================

def init_db():
    Base.metadata.create_all(bind=engine)   

# ===================================================================
# 4. FUNÇÃO PARA OBTER SESSÃO (Essencial para o Fast API/MVC)
# ===================================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  

