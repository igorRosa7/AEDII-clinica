import React, { useState } from 'react';
import { FormContainer } from './userForm.styles';

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
  message?: string;
  messageType?: 'success' | 'error';
}

interface UserData {
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: 'secretaria' | 'medico';
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, message, messageType }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'secretaria' | 'medico'>('secretaria');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ nome, email, senha, tipo_usuario: tipoUsuario });
  };

  return (
    <FormContainer>
      <h2>Cadastro de Usuário</h2>

      {message && (
        <div className={`message ${messageType}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value as 'secretaria' | 'medico')}
          >
            <option value="secretaria">Secretária</option>
            <option value="medico">Médico</option>
          </select>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </FormContainer>
  );
};

export default UserForm;
