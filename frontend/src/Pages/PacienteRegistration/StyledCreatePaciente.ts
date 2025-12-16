import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100vh; /* Ocupa exatamente a altura da tela */
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  overflow: hidden; /* Impede a rolagem da página inteira */
  
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px; /* Um pouco mais largo para caber campos lado a lado */
  background-color: #ffffff;
  border-radius: 12px;
  padding: 25px 30px; /* Padding reduzido */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  color: #1e293b;
  font-size: 1.4rem; /* Título menor */
  margin: 0 0 20px 0; /* Margem reduzida */
  font-weight: 700;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px; /* Menos espaço abaixo do label */
  color: #64748b;
  font-weight: 600;
  font-size: 0.75rem; /* Fonte menor */
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px; /* Input mais fino */
  margin-bottom: 12px; /* Menos espaço entre os campos */
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #f8fafc;
  font-size: 0.9rem;
  color: #334155;
  box-sizing: border-box;

  &:focus {
    border-color: #6366f1;
    background-color: #fff;
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #f8fafc;
  font-size: 0.9rem;
  color: #334155;
  box-sizing: border-box;
  
  &:focus {
    border-color: #6366f1;
    background-color: #fff;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

// Row para colocar itens lado a lado
export const Row = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  
  & > div {
    flex: 1; /* Divide o espaço igualmente */
  }
`;

// Row especial onde o primeiro item é maior (ex: Endereço ocupa mais espaço que número)
export const UnevenRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;

  & > div:first-child {
    flex: 2; /* O primeiro item ocupa 2x mais espaço */
  }
  & > div:last-child {
    flex: 1;
  }
`;