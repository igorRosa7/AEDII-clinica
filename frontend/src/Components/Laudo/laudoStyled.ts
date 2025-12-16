import styled from 'styled-components';

// Tipagem para as props customizadas do estilo
interface ButtonProps {
  $variant?: 'primary' | 'secondary';
}

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    color: #333;
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Aumentei levemente o espaço entre os grupos */
`;

// --- ALTERAÇÃO PRINCIPAL AQUI ---
export const Label = styled.label`
  display: block;       /* Força a quebra de linha (ocupa a linha toda) */
  margin-bottom: 6px;   /* Um pequeno espaço entre o texto e a caixa */
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
`;

export const InputReadonly = styled.input`
  width: 100%;          /* Garante que ocupe a largura total */
  box-sizing: border-box; /* Garante que o padding não estoure a largura */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: #555;
  cursor: not-allowed;
  font-size: 1rem;
`;

// --- ALTERAÇÃO AQUI TAMBÉM ---
export const TextArea = styled.textarea`
  width: 100%;            /* Garante que ocupe a largura total */
  box-sizing: border-box; /* Garante que o padding não estoure a largura */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  color: white;

  &:hover {
    opacity: 0.9;
  }

  background-color: ${props => props.$variant === 'primary' ? '#28a745' : '#6c757d'};
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;