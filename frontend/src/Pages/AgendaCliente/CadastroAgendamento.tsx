import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../PacienteRegistration/StyledCreatePaciente';
import api from '../../services/api';

// Interface para tipar o médico que vem do backend
interface MedicoOption {
  idmedico: number;
  nome: string;
  especialidade: string;
  crm: string;
}

export const CadastroAgendamento = () => {
  const navigate = useNavigate();
  
  // 1. Recupera dados da secretária logada
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
  
  const [listaMedicos, setListaMedicos] = useState<MedicoOption[]>([]);
  
  // Estado do formulário (sem o ID da secretária, pois é automático)
  const [formulario, setFormulario] = useState({
    cpf_paciente: '',
    medico_id: '',
    data_consulta: '',
    hora_consulta: ''
  });

  // BUSCAR MÉDICOS
  useEffect(() => {
    const buscarMedicos = async () => {
      try {
        // MUDANÇA: api.get em vez de fetch
        const response = await api.get('/doutores/'); 
        setListaMedicos(response.data);
      } catch (error) {
        console.error("Erro de conexão ao buscar médicos:", error);
      }
    };

    buscarMedicos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const salvarAgendamento = async () => {
    // Validação de Segurança
    if (!usuarioLogado.id) {
        alert("Erro: Não foi possível identificar a secretária logada.");
        return;
    }

    // Validação de Campos
    if (!formulario.cpf_paciente || !formulario.medico_id || !formulario.data_consulta || !formulario.hora_consulta) {
      alert("Preencha todos os campos!");
      return;
    }

    // Preparando o Payload
    const payload = {
      cpf_paciente: formulario.cpf_paciente,
      medico_id: Number(formulario.medico_id),
      
      // 2. ID inserido automaticamente aqui
      secretaria_id: Number(usuarioLogado.id),
      
      data_consulta: new Date(formulario.data_consulta).toISOString(),
      hora_consulta: formulario.hora_consulta.length === 5 ? `${formulario.hora_consulta}:00` : formulario.hora_consulta
    };

    try {
      // MUDANÇA: api.post em vez de fetch
      // Não precisa de headers nem JSON.stringify
      await api.post('/agendas/novo', payload);

      alert('Agendamento realizado com sucesso!');
      navigate('/sistema'); // Redireciona para a lista de agendamentos

    } catch (error: any) {
      // Tratamento de erro do Axios
      if (error.response && error.response.data) {
        const erroData = error.response.data;
        alert(`Erro: ${erroData.detail || JSON.stringify(erroData)}`);
      } else {
        alert('Erro de conexão ou servidor indisponível.');
      }
    }
  };

  return (
    <S.PageWrapper>
      <S.Container>
        <S.Title>Novo Agendamento</S.Title>

        {/* --- AQUI: MOSTRA QUEM ESTÁ AGENDANDO (Visual) --- */}
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
            Agendado por: <strong>{usuarioLogado.nome}</strong>
        </div>

        <S.Row>
            <div>
                <S.Label>CPF do Paciente</S.Label>
                <S.Input 
                  type="text" 
                  name="cpf_paciente" 
                  value={formulario.cpf_paciente} 
                  onChange={handleChange} 
                  placeholder="Apenas números"
                  maxLength={11} 
                />
            </div>
            
            {/* --- SELEÇÃO DE MÉDICO --- */}
            <div>
                <S.Label>Médico Responsável</S.Label>
                <S.Select 
                    name="medico_id" 
                    value={formulario.medico_id} 
                    onChange={handleChange}
                >
                    <option value="">Selecione...</option>
                    
                    {listaMedicos.map((medico) => (
                        <option key={medico.idmedico} value={medico.idmedico}>
                            {medico.nome} — {medico.especialidade}
                        </option>
                    ))}

                </S.Select>
            </div>
        </S.Row>

        <S.Row>
          <div>
            <S.Label>Data da Consulta</S.Label>
            <S.Input 
              type="date" 
              name="data_consulta" 
              value={formulario.data_consulta} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <S.Label>Horário</S.Label>
            <S.Input 
              type="time" 
              name="hora_consulta" 
              value={formulario.hora_consulta} 
              onChange={handleChange} 
            />
          </div>
        </S.Row>

        {/* CAMPO ID SECRETARIA FOI REMOVIDO VISUALMENTE */}

        <S.Button onClick={salvarAgendamento}>CONFIRMAR AGENDAMENTO</S.Button>
        
        <button 
            onClick={() => navigate('/sistema/agendamentos')}
            style={{ 
              marginTop: '15px', 
              width: '100%', 
              padding: '10px', 
              border: 'none', 
              background: 'transparent', 
              cursor: 'pointer', 
              color: '#64748b',
              fontWeight: 'bold' 
            }}
        >
            Cancelar
        </button>

      </S.Container>
    </S.PageWrapper>
  );
};