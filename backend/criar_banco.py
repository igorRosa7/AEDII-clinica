# Arquivo: criar_banco.py
from dao.BancoDados import engine, Base

# --- IMPORTAÇÃO DE TODOS OS MODELS ---
# O SQLAlchemy precisa "ler" essas classes para criar as tabelas no banco

# 1. Usuário Base e Tipos Específicos
from models.Usuario import Usuario
from models.Medico import Medico         # <--- Adicionado
from models.Secretaria import Secretaria # <--- Adicionado

# 2. Paciente e Agendamento
from models.Paciente import Paciente
from models.Agenda import Agenda 

# 3. Documentos Clínicos
from models.Laudo import Laudo
from models.Receita import Receita

def criar_tabelas():
    print("⏳ Conectando ao Supabase (PostgreSQL)...")
    
    # Cria todas as tabelas encontradas nos imports acima
    Base.metadata.create_all(bind=engine)
    
    print("✅ Todas as tabelas foram criadas com sucesso!")
    print("   - usuarios, medicos, secretarias")
    print("   - pacientes, agendas")
    print("   - laudos, receitas")

if __name__ == "__main__":
    criar_tabelas()