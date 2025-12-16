import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  
  h2 {
    color: #1e293b;
    font-size: 1.8rem;
    margin-bottom: 5px;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const AppointmentCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid #4f46e5; /* Detalhe colorido Roxo */
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

export const TimeBadge = styled.span`
  background-color: #e0e7ff;
  color: #4338ca;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 15px;
`;

export const PatientName = styled.h3`
  margin: 0 0 5px 0;
  color: #334155;
  font-size: 1.1rem;
`;

export const PatientInfo = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
`;

export const StartButton = styled.button`
  margin-top: 20px; 
  width: 100%; 
  padding: 10px; 
  background: #4f46e5; 
  color: white; 
  border: none; 
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: #f8fafc;
  border-radius: 12px;
  color: #94a3b8;
  border: 2px dashed #e2e8f0;
  font-size: 1.1rem;
`;