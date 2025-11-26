// frontend/src/components/UserListButton/UserListButton.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // Reutilizando styled-components

// --- ESTILOS SIMPLES (Poderia estar em um .styles.ts) ---

const FetchButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    background-color: #1e7e34;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: #007bff;
  font-weight: bold;
`;

// --------------------------------------------------------

const UserListButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setMessage('Buscando dados...');
    
    try {
      // 🎯 Ajuste a URL base para sua API do FastAPI (ex: http://localhost:8000)
      // Se você configurou um proxy no Vite (ex: '/api/'), use o prefixo:
      const response = await axios.get('http://localhost:8000/usuarios/'); 

      // 1. Imprime os dados no DevTools
      console.log('✅ Dados de Usuários Recebidos:', response.data);
      setMessage(`Sucesso! ${response.data.length} usuários carregados. Veja o console.`);

    } catch (error) {
      console.error('❌ ERRO ao buscar usuários:', error);
      // Aqui, você pode capturar o erro HTTP 404/500 do FastAPI
      setMessage('Falha ao carregar usuários. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <FetchButton onClick={fetchUsers} disabled={loading}>
        {loading ? 'Carregando...' : 'GET: Listar Todos os Usuários'}
      </FetchButton>
      <Message>{message}</Message>
      <p style={{marginTop: '5px', fontSize: '12px'}}>Abra o Console (F12) para ver o retorno.</p>
    </div>
  );
};

export default UserListButton;