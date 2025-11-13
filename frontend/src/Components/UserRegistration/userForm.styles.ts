// frontend/src/components/UserForm/userForm.styles.ts
import styled from 'styled-components';

export const FormContainer = styled.div`
  /* Container principal */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  /* Título */
  h1, h2, h3 {
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  /* Mensagem de sucesso/erro */
  .message {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    text-align: center;
  }

  .message.success {
    background-color: #d4edda;
    color: #155724;
  }

  .message.error {
    background-color: #f8d7da;
    color: #721c24;
  }

  /* Formulário */
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Cada grupo de campo */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    font-weight: 600;
    color: #555;
  }

  input,
  select {
    padding: 0.6rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
