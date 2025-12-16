import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './listagemAgendaStyled';

interface AgendaItem {
  idagenda: number;
  data_consulta: string;
  hora_consulta: string;
  paciente: { nome: string; cpf: string };
  usuario: { nome: string; especialidade?: string }; // Médico
}

export const ListaAgendamentos = () => {
  const navigate = useNavigate();
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await fetch('http://localhost:8000/agendas/');
        if (response.ok) {
          const data = await response.json();
          setAgendas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar agendas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendas();
  }, []);

  // Formata a data para ficar bonita (dd/mm/aaaa)
  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Agenda da Clínica</h2>
        
        <S.ButtonGroup>
          {/* Botão 1: Novo Paciente */}
          <S.ActionButton 
            $variant="secondary" 
            onClick={() => navigate('/sistema/cadastro')}
          >
            + Novo Paciente
          </S.ActionButton>

          {/* Botão 2: Novo Agendamento */}
          <S.ActionButton 
            $variant="primary" 
            onClick={() => navigate('/sistema/agendamento')}
          >
            📅 Novo Agendamento
          </S.ActionButton>
        </S.ButtonGroup>
      </S.Header>

      {loading ? (
        <p>Carregando agenda...</p>
      ) : (
        <>
          {agendas.length === 0 ? (
            <S.EmptyState>
              Sem agendamentos no momento.
            </S.EmptyState>
          ) : (
            <S.Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {agendas.map((agenda) => (
                  <tr key={agenda.idagenda}>
                    <td>{formatarData(agenda.data_consulta)}</td>
                    <td>{agenda.hora_consulta}</td>
                    <td>
                      <strong>{agenda.paciente?.nome}</strong>
                      <br />
                      <span style={{fontSize: '0.8rem', color: '#999'}}>{agenda.paciente?.cpf}</span>
                    </td>
                    <td>{agenda.usuario?.nome}</td>
                    <td>
                        <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#4338ca', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                            Agendado
                        </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          )}
        </>
      )}
    </S.Container>
  );
};