import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { 
  Overlay, ModalContainer, Header, CloseButton, 
  Form, Label, InputReadonly, TextArea, Footer, Button 
} from './laudoStyled';
import api from '../../services/api'; // <--- IMPORTANTE: Ajuste o caminho se necessário

// 1. Definimos a interface das Props
interface LaudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: string;
}

// 2. Definimos o formato dos dados
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

  const handleSalvar = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dados: LaudoPayload = {
      paciente: paciente,
      descricao: descricao
    };

    try {
      // --- MUDANÇA AQUI: USANDO API.POST ---
      // Removemos o cabeçalho manual e o JSON.stringify
      await api.post('/laudos/', dados);

      alert('Laudo salvo com sucesso!');
      onClose();

    } catch (error: any) {
      console.error(error);
      
      // Tratamento de erro padrão do Axios
      if (error.response && error.response.data) {
        const erroData = error.response.data;
        alert(`Erro: ${erroData.detail || 'Erro desconhecido'}`);
      } else {
        alert('Erro de conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

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