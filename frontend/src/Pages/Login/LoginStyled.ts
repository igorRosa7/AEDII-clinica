import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%); /* Gradiente suave */
`;

export const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  
  /* Animação suave de entrada */
  animation: slideUp 0.5s ease-out;
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Title = styled.h2`
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 5px;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 30px;
  font-size: 0.95rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  color: #475569;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  color: #334155;

  &:focus {
    border-color: #6366f1; /* Indigo */
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background-color: #4f46e5; /* Indigo 600 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: wait;
  }
`;

export const ErrorBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #fee2e2;
  color: #ef4444;
  border-radius: 6px;
  font-size: 0.9rem;
  border: 1px solid #fecaca;
`;