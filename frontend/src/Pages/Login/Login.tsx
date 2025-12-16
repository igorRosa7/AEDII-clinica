import { useState } from 'react';
import * as S from './LoginStyled';
import api from '../../services/api'; // Certifique-se que o caminho está correto

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
      // MUDANÇA 1: Usando api.post
      // Não precisa da URL inteira, nem de headers manuais, nem de JSON.stringify
      const response = await api.post('/auth/login', { 
        nome, 
        senha 
      });

      // MUDANÇA 2: Sucesso
      // O axios joga a resposta do backend dentro de .data
      onLoginSuccess(response.data);

    } catch (error: any) {
      // MUDANÇA 3: Tratamento de Erro
      // O axios lança erro se o status for 4xx ou 5xx.
      
      if (error.response && error.response.data) {
        // O servidor respondeu, mas com erro (ex: senha errada)
        const data = error.response.data;

        // Mantive EXATAMENTE sua lógica original de leitura de erro
        if (data.detail && Array.isArray(data.detail)) {
           setErro(`Erro: ${data.detail[0].msg}`);
        } else if (typeof data.detail === 'string') {
           setErro(data.detail);
        } else {
           setErro('Erro ao entrar. Verifique suas credenciais.');
        }
      } else {
        // Erro de rede ou servidor fora do ar
        console.error("Erro técnico:", error);
        setErro('Erro de conexão com o servidor.');
      }
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