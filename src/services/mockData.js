// src/services/mockData.js

export const initialPatients = [
  { id: 1, name: 'João Silva', cpf: '123.456.789-00', birthDate: '1985-05-15', phone: '(11) 98765-4321', email: 'joao@email.com' },
  { id: 2, name: 'Maria Santos', cpf: '987.654.321-11', birthDate: '1992-10-22', phone: '(11) 91234-5678', email: 'maria@email.com' },
];

export const initialDoctors = [
  { id: 1, name: 'Dr. Roberto Costa', specialty: 'Cardiologia', crm: '12345-SP', phone: '(11) 99999-8888' },
  { id: 2, name: 'Dra. Ana Paula', specialty: 'Pediatria', crm: '67890-SP', phone: '(11) 97777-6666' },
];

export const initialAppointments = [
  { id: 1, patientId: 1, doctorId: 1, date: '2024-05-10', time: '09:00', observations: 'Consulta de rotina' },
  { id: 2, patientId: 2, doctorId: 2, date: '2024-05-10', time: '14:30', observations: 'Retorno' },
];
