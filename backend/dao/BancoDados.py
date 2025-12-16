from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# --- CONFIGURAÇÃO POSTGRESQL (SUPABASE) ---

# A string de conexão completa.
# Nota: O driver padrão do SQLAlchemy para Postgres é o psycopg2.
# Certifique-se de ter rodado: pip install psycopg2-binary
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:clinicaaedii@db.angsheibevviixfluzax.supabase.co:5432/postgres"

# Criação do Engine
# echo=False desativa o log de SQL no terminal (bom para produção/limpeza)
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)

# Configuração da Sessão (Mantida idêntica para compatibilidade)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: Classe base para todos os modelos ORM.
Base = declarative_base()

# --- FUNÇÕES ---

# Função de Inicialização
# Ao rodar isso com o novo engine, ele vai criar as tabelas no Supabase automaticamente
def init_db():
    Base.metadata.create_all(bind=engine)

# Função de Dependência para obter sessão (Mantida idêntica)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()