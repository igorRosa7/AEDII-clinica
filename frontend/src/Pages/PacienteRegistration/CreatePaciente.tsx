import { useState } from 'react';
import * as S from './StyledCreatePaciente';
import { BotaoIrAgendamento } from '../../Components/BotaoAgendamento/BotaoGoAgendamento';
import api from '../../services/api';

export const CadastroPaciente = () => {
  // 1. Pega os dados do usuário (secretária) logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');

  const [formulario, setFormulario] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    sexo: 'M',
    data_nascimento: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const salvarNoBanco = async () => {
    // Validação de segurança
    if (!usuarioLogado.id) {
        alert("Erro: Não foi possível identificar a secretária logada.");
        return;
    }

    const payload = {
      ...formulario,
      data_cadastro: new Date().toISOString().split('T')[0],
      
      // O ID vai automático no envio, sem precisar de campo visual
      secretaria_idsecretaria: Number(usuarioLogado.id)
    };

    try {
      // MUDANÇA: Substituído fetch por api.post
      await api.post('/pacientes/novo', payload);

      alert('Paciente cadastrado com sucesso!');
      // setFormulario({...}) // Opcional: limpar campos

    } catch (error: any) {
      console.error(error);
      
      // Tratamento de erro do Axios
      if (error.response && error.response.data) {
        alert(`Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Erro de conexão.');
      }
    }
  };

  return (
    <S.PageWrapper>
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <S.Title style={{ marginBottom: 0 }}>Novo Paciente</S.Title>
            <BotaoIrAgendamento />
        </div>
        
        <S.Title>Cadastro</S.Title>

        {/* --- AQUI: MOSTRA QUEM ESTÁ CRIANDO (Visual) --- */}
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
            Criado por: <strong>{usuarioLogado.nome}</strong>
        </div>

        <S.Label>Nome Completo</S.Label>
        <S.Input 
          name="nome" 
          value={formulario.nome} 
          onChange={handleChange} 
          placeholder="Ex: João da Silva"
        />

        <S.Row>
          <div>
            <S.Label>CPF</S.Label>
            <S.Input 
              name="cpf" 
              value={formulario.cpf} 
              onChange={handleChange} 
              maxLength={11} 
              placeholder="000.000.000-00"
            />
          </div>
          <div>
             <S.Label>Telefone</S.Label>
             <S.Input 
              name="telefone" 
              value={formulario.telefone} 
              onChange={handleChange} 
              placeholder="(00) 00000-0000"
            />
          </div>
        </S.Row>

        <S.Row>
          <div>
            <S.Label>Data Nascimento</S.Label>
            <S.Input type="date" name="data_nascimento" value={formulario.data_nascimento} onChange={handleChange} />
          </div>
          <div>
            <S.Label>Sexo</S.Label>
            <S.Select name="sexo" value={formulario.sexo} onChange={handleChange}>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </S.Select>
          </div>
        </S.Row>

        <S.Label>E-mail</S.Label>
        <S.Input type="email" name="email" value={formulario.email} onChange={handleChange} placeholder="joao@email.com" />

        <S.Label>Endereço</S.Label>
        <S.Input name="endereco" value={formulario.endereco} onChange={handleChange} placeholder="Rua das Flores, 123" />

        <S.Button onClick={salvarNoBanco}>CADASTRAR</S.Button>
      </S.Container>
    </S.PageWrapper>
  );
};