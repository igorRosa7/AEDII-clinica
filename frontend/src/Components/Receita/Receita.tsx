import React, { useState, useEffect, type FormEvent} from 'react';
// Importe os estilos (se for criar um styles.ts novo na pasta Receita, importe dele)
// Se quiser usar o mesmo do Laudo, ajuste o caminho. 
// Abaixo assumo que vc copiou o styles.ts para a pasta Receita também.
import { 
  Overlay, ModalContainer, Header, CloseButton, 
  Form, Label, InputReadonly, TextArea, Footer, Button 
} from "../Laudo/laudoStyled";
import api from '../../services/api'; // <--- IMPORTAÇÃO DA API

interface ReceitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: string;
}

interface ReceitaPayload {
  paciente: string;
  medicamento: string;
  dosagem: string;
}

const ReceitaModal: React.FC<ReceitaModalProps> = ({ isOpen, onClose, paciente }) => {
  const [medicamento, setMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMedicamento('');
      setDosagem('');
    }
  }, [isOpen, paciente]);

  if (!isOpen) return null;

  const handleSalvar = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dados: ReceitaPayload = {
      paciente,
      medicamento,
      dosagem
    };

    try {
      // --- MUDANÇA: USANDO API.POST ---
      await api.post('/receitas/', dados);

      alert('Receita salva com sucesso!');
      onClose();

    } catch (error: any) {
      console.error(error);
      
      // Tratamento de erro do Axios
      if (error.response && error.response.data) {
        const erroData = error.response.data;
        alert(`Erro: ${erroData.detail || 'Erro desconhecido'}`);
      } else {
        alert('Erro de conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Nova Receita Médica</h2>
          <CloseButton onClick={onClose} type="button">&times;</CloseButton>
        </Header>

        <Form onSubmit={handleSalvar}>
          <div>
            <Label>Paciente</Label>
            <InputReadonly type="text" value={paciente} readOnly />
          </div>

          <div>
            <Label>Medicamento</Label>
            {/* Reutilizando TextArea ou pode criar um Input normal no styles */}
            <TextArea 
              rows={2}
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
              placeholder="Ex: Amoxicilina 500mg"
              required
              style={{ minHeight: '60px' }}
            />
          </div>

          <div>
            <Label>Dosagem / Posologia</Label>
            <TextArea 
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              placeholder="Ex: Tomar 1 comprimido a cada 8 horas por 7 dias..."
              required
            />
          </div>

          <Footer>
            <Button type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" $variant="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Receita'}
            </Button>
          </Footer>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default ReceitaModal;