import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles';

// --- IMPORTS DAS PÁGINAS ---
import { Login } from './Pages/Login/Login';
import { CadastroPaciente } from './Pages/PacienteRegistration/CreatePaciente';
import { CadastroAgendamento } from './Pages/AgendaCliente/CadastroAgendamento';
import { ListaAgendamentos } from './Pages/AgendaCliente/ListagemAgenda/ListagemAgendas';

// CORREÇÃO AQUI: Importamos 'PaginaMedico' (o nome que você definiu no componente)
import { PaginaMedico } from './Pages/MedicoPage/MedicoPage';

// --- IMPORTS DE ESTRUTURA ---
import { RotaProtegida } from './Pages/Login/ProtecaoRota';
import { Layout } from './Pages/Login/Layout';

const LoginWrapper = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (dados: any) => {
    localStorage.setItem('usuario_logado', JSON.stringify(dados));
    
    // Verifica o cargo para redirecionar
    if (dados.role === 'medico') {
        navigate('/medico/home');
    } else {
        navigate('/sistema/');
    }
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};

function App() {
  return (
   <BrowserRouter>
      <GlobalStyle />
      
      <Routes>
        {/* Rota Pública: Login */}
        <Route path="/" element={<LoginWrapper />} />

        {/* --- ÁREA DA SECRETÁRIA (/sistema) --- */}
        <Route path="/sistema" element={
            <RotaProtegida>
              <Layout />
            </RotaProtegida>
        }>
            {/* 1. ROTA INDEX: É a Home da Secretária (Lista de Agendamentos) */}
            <Route index element={<ListaAgendamentos />} />

            {/* 2. Outras rotas internas */}
            <Route path="cadastro" element={<CadastroPaciente />} />
            <Route path="agendamento" element={<CadastroAgendamento />} />
            
            {/* REMOVIDO: As linhas duplicadas com <Navigate ... /> saíram daqui */}
        </Route>

        {/* --- ÁREA DO MÉDICO (/medico) --- */}
        <Route path="/medico" element={
            <RotaProtegida>
              <Layout />
            </RotaProtegida>
        }>
            <Route path="home" element={<PaginaMedico />} />
            
            {/* Aqui mantemos o redirect pois o médico não tem uma página 'index' específica ainda */}
            <Route index element={<Navigate to="/medico/home" replace />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>Página não encontrada</h1>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;