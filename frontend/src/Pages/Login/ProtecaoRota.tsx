import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface RotaProtegidaProps {
  children: JSX.Element;
}

export const RotaProtegida = ({ children }: RotaProtegidaProps) => {
  // Tenta recuperar o usuário salvo no navegador
  const usuarioSalvo = localStorage.getItem('usuario_logado');

  if (!usuarioSalvo) {
    // Se não tem ninguém logado, redireciona para a tela de Login (raiz)
    return <Navigate to="/" replace />;
  }

  // Se tem usuário, renderiza a página que foi pedida (os filhos)
  return children;
};