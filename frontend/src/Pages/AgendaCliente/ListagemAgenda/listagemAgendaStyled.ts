import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    color: #1e293b;
    font-size: 1.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  /* Se for primary (novo agendamento) é roxo, se for secondary (novo paciente) é verde ou cinza */
  background-color: ${props => props.$variant === 'primary' ? '#6366f1' : '#10b981'};
  color: white;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 15px;
    background-color: #f8fafc;
    color: #64748b;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
    color: #334155;
  }

  tr:hover {
    background-color: #f8fafc;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 50px;
  color: #94a3b8;
  font-size: 1.1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #e2e8f0;
`;