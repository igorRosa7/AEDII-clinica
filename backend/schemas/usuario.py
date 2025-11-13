from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    class Config:
        orm_mode = True

class UsuarioResponse(BaseModel):
    """Retorno do usuário, omitindo a senha."""
    idusuario: int
    nome: str
    email: str
    
    class Config:
        from_attributes = True
