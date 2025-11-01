from pydantic import BaseModel, Field

class PacienteCreate(BaseModel):
    idpaciente: int
    nome: str
    sexo: str
    data_nascimento: str
    telefone: str
    email: str
    endereco: str
    data_cadastro: str
    secretaria_idsecretaria: int
    cpf: str = Field(
        ...,
        min_length=11, 
        max_length=14, 
        description="CPF do paciente (obrigatório e único)."
    )
    
    class Config:
        orm_mode = True

class PacienteResponse(BaseModel):
    """Retorno de dados do paciente."""
    idpaciente: int
    nome: str
    sexo: str
    data_nascimento: str
    telefone: str
    email: str
    endereco: str
    data_cadastro: str
    secretaria_idsecretaria: int
    cpf: str
    
    class Config:
        from_attributes = True