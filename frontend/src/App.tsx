import UserForm from './Components/UserRegistration/userRegistration';

function App() {
  interface UserData {
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: 'secretaria' | 'medico';
}
  const handleUserSubmit = (userData: UserData) => {
    console.log("Dados recebidos do formulário:", userData);

    // Aqui você pode futuramente fazer:
    // fetch("http://localhost:8000/usuarios", { ... })
  };

  return (
    <>
      <UserForm 
        onSubmit={handleUserSubmit}
        message="Preencha todos os campos corretamente"
        messageType="error"
      />
    </>
  );
}

export default App;
