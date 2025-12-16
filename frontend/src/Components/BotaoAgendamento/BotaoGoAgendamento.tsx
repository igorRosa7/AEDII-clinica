import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Estilização exclusiva deste botão
const ButtonStyled = styled.button`
  background-color: #6366f1; /* Indigo */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px; /* Espaço entre ícone e texto */
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BotaoIrAgendamento = () => {
  const navigate = useNavigate();

  return (
    <ButtonStyled onClick={() => navigate('/sistema/agendamento')}>
      📅 Novo Agendamento
    </ButtonStyled>
  );
};