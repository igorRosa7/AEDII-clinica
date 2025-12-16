import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { 
  Overlay, ModalContainer, Header, CloseButton, 
  Form, Label, InputReadonly, TextArea, Footer, Button 
} from './laudoStyled';

// 1. Definimos a interface das Props (O contrato do componente)
interface LaudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: string;
}

// 2. Definimos o formato dos dados que vamos enviar para a API (opcional, mas boa prática)
interface LaudoPayload {
  paciente: string;
  descricao: string;
}

const LaudoModal: React.FC<LaudoModalProps> = ({ isOpen, onClose, paciente }) => {
  const [descricao, setDescricao] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setDescricao('');
    }
  }, [isOpen, paciente]);

  if (!isOpen) return null;

  // Tipagem do evento de submit
  const handleSalvar = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dados: LaudoPayload = {
      paciente: paciente,
      descricao: descricao
    };

    try {
      const response = await fetch('http://localhost:8000/laudos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        alert('Laudo salvo com sucesso!');
        onClose();
      } else {
        const erro = await response.json();
        // Tratamento simples para garantir que erro.detail seja lido
        alert(`Erro: ${erro.detail || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Tipagem do evento de mudança no textarea
  const handleDescricaoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Novo Laudo Médico</h2>
          <CloseButton onClick={onClose} type="button">&times;</CloseButton>
        </Header>

        <Form onSubmit={handleSalvar}>
          <div>
            <Label>Paciente</Label>
            <InputReadonly 
              type="text" 
              value={paciente} 
              readOnly 
            />
          </div>

          <div>
            <Label>Descrição do Laudo</Label>
            <TextArea
              value={descricao}
              onChange={handleDescricaoChange}
              placeholder="Digite aqui o laudo..."
              required
            />
          </div>

          <Footer>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" $variant="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Laudo'}
            </Button>
          </Footer>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default LaudoModal;