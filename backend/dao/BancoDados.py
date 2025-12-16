import os  # <--- ADICIONE ISSO NO TOPO DO ARQUIVO

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# --- CONFIGURAÇÃO POSTGRESQL (SUPABASE) ---

# URL FIXA (BACKUP): Sua string atual do Supabase
URL_SUPABASE = "postgresql://postgres:clinicaaedii@db.angsheibevviixfluzax.supabase.co:5432/postgres"

# LÓGICA DE SEGURANÇA:
# O código tenta pegar uma variável chamada "DATABASE_URL" (configurada no Render).
# Se não encontrar (ex: no seu PC), ele usa a URL_SUPABASE fixa acima.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", URL_SUPABASE)

# Correção de compatibilidade: O Render às vezes fornece a URL começando com "postgres://"
# mas o SQLAlchemy exige "postgresql://". Isso corrige automaticamente se necessário.
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Criação do Engine (Mantido igual)
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)

# Configuração da Sessão (Mantido igual)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base (Mantido igual)
Base = declarative_base()

# --- FUNÇÕES (MANTENHA TUDO IGUAL DAQUI PARA BAIXO) ---
def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()