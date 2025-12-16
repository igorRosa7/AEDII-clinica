import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- ESTILOS ---

const Navbar = styled.nav`
  background-color: #ffffff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between; /* Mantém Logo na esquerda e Botões na direita */
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 20px;
`;

// Container para agrupar os botões na direita
const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const BackBtn = styled.button`
  background: transparent;
  border: 1px solid #64748b; /* Cinza azulado */
  color: #64748b;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover { background: #f1f5f9; }
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover { background: #fee2e2; }
`;

// --- COMPONENTE ---

export const Layout = () => {
  const navigate = useNavigate();
  
  // Recupera dados apenas para mostrar o nome (cosmético)
  const usuario = JSON.parse(localStorage.getItem('usuario_logado') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado'); // Limpa a sessão
    navigate('/'); // Manda pro login
  };

  const handleVoltar = () => {
    navigate(-1); // Volta para a página anterior no histórico
  };

  return (
    <>
      <Navbar>
        {/* Lado Esquerdo: Logo e Nome */}
        <div>
          <strong>ClinicaSys</strong> <span style={{fontSize: '0.8rem', color: '#888'}}>| Olá, {usuario.nome}</span>
        </div>
        
        {/* Lado Direito: Botões de Ação */}
        <ButtonGroup>
          <BackBtn onClick={handleVoltar}>⬅ Voltar</BackBtn>
          <LogoutBtn onClick={handleLogout}>Sair</LogoutBtn>
        </ButtonGroup>
      </Navbar>

      {/* Onde as telas são renderizadas */}
      <Outlet />
    </>
  );
};