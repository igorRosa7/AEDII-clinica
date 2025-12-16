import { useState } from 'react';
import * as S from './LoginStyled';

interface LoginProps {
  onLoginSuccess: (dadosUsuario: any) => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEntrar = async () => {
    setLoading(true);
    setErro('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // DICA: O padrão do schema geralmente é "username". 
        // Estamos enviando o valor do campo 'nome' dentro da chave 'username'.
        body: JSON.stringify({ nome: nome, senha }), 
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data);
      } else {
        // TRATAMENTO DE ERRO (Para não travar a tela branca)
        if (data.detail && Array.isArray(data.detail)) {
           setErro(`Erro: ${data.detail[0].msg}`);
        } else if (typeof data.detail === 'string') {
           setErro(data.detail);
        } else {
           setErro('Erro ao entrar. Verifique suas credenciais.');
        }
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Card>
        <S.Title>ClinicaSys</S.Title>
        <S.Subtitle>Acesse sua conta</S.Subtitle>

        <S.InputGroup>
          <S.Label>USUÁRIO</S.Label>
          <S.Input 
            placeholder="Digite seu usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>SENHA</S.Label>
          <S.Input 
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </S.InputGroup>

        <S.Button onClick={handleEntrar} disabled={loading}>
          {loading ? 'ENTRANDO...' : 'ENTRAR'}
        </S.Button>

        {erro && <S.ErrorBox>{erro}</S.ErrorBox>}
      </S.Card>
    </S.Wrapper>
  );
};