import { useEffect, useState } from 'react';
import * as S from './medicoPageStyled'; // Importando estilos

// --- IMPORTAÇÃO DOS MODALS ---
// Ajuste os caminhos caso seus arquivos tenham nomes diferentes (ex: index.tsx ou Laudo.tsx)
import LaudoModal from '../../Components/Laudo/Laudo';
import ReceitaModal from '../../Components/Receita/Receita'; 

// --- INTERFACE DO DADO ---
interface AgendaItem {
  idagenda: number;
  data_consulta: string;
  hora_consulta: string;
  paciente: {
    nome: string;
    cpf: string;
  };
}

export const PaginaMedico = () => {
  // 1. Estados de Dados
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Estados do Modal de LAUDO
  const [modalLaudoOpen, setModalLaudoOpen] = useState(false);
  const [pacienteLaudo, setPacienteLaudo] = useState('');

  // 3. Estados do Modal de RECEITA
  const [modalReceitaOpen, setModalReceitaOpen] = useState(false);
  const [pacienteReceita, setPacienteReceita] = useState('');

  // Pega os dados do médico logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');

  useEffect(() => {
    const fetchMeusAgendamentos = async () => {
      // Se não tiver ID, não busca
      if (!usuarioLogado.id) return;

      try {
        const response = await fetch(`http://localhost:8000/agendas/medico/${usuarioLogado.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setAgendas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar agenda do médico", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeusAgendamentos();
  }, [usuarioLogado.id]);

  // --- FORMATAÇÃO ---
  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const formatarHora = (hora: string) => {
    return hora.substring(0, 5); // Corta os segundos
  };

  // --- HANDLERS (Funções de Clique) ---
  const abrirLaudo = (nome: string) => {
    setPacienteLaudo(nome);
    setModalLaudoOpen(true);
  };

  const abrirReceita = (nome: string) => {
    setPacienteReceita(nome);
    setModalReceitaOpen(true);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <S.Container>
      <S.Header>
        <h2>Painel do Médico</h2>
        <p>Olá, Dr(a). {usuarioLogado.nome}. Aqui estão seus próximos atendimentos.</p>
      </S.Header>

      {loading ? (
        <p>Carregando sua agenda...</p>
      ) : (
        <>
          {agendas.length === 0 ? (
            <S.EmptyState>
              Nenhum paciente agendado para você no momento.
            </S.EmptyState>
          ) : (
            <S.Grid>
              {agendas.map((agenda) => (
                <S.AppointmentCard key={agenda.idagenda}>
                  <S.TimeBadge>
                    📅 {formatarData(agenda.data_consulta)} às {formatarHora(agenda.hora_consulta)}
                  </S.TimeBadge>
                  
                  <S.PatientName>{agenda.paciente.nome}</S.PatientName>
                  <S.PatientInfo>CPF: {agenda.paciente.cpf}</S.PatientInfo>
                  
                  {/* Container para os Botões Lado a Lado */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    
                    {/* Botão de LAUDO */}
                    <S.StartButton onClick={() => abrirLaudo(agenda.paciente.nome)}>
                      📝 Laudo
                    </S.StartButton>

                    {/* Botão de RECEITA (Azul para diferenciar) */}
                    <S.StartButton 
                      onClick={() => abrirReceita(agenda.paciente.nome)}
                      style={{ backgroundColor: '#007bff' }} 
                    >
                      💊 Receita
                    </S.StartButton>

                  </div>

                </S.AppointmentCard>
              ))}
            </S.Grid>
          )}
        </>
      )}

      {/* --- MODAL DE LAUDO --- */}
      <LaudoModal 
        isOpen={modalLaudoOpen} 
        onClose={() => setModalLaudoOpen(false)} 
        paciente={pacienteLaudo} 
      />

      {/* --- MODAL DE RECEITA --- */}
      <ReceitaModal 
        isOpen={modalReceitaOpen} 
        onClose={() => setModalReceitaOpen(false)} 
        paciente={pacienteReceita} 
      />

    </S.Container>
  );
};