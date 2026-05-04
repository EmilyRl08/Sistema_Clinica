// src/context/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialPatients, initialDoctors, initialAppointments } from '../services/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [message, setMessage] = useState(null);

  const showFeedback = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  // CRUD Patients
  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now() }]);
    showFeedback('Paciente cadastrado com sucesso!');
  };

  const updatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    showFeedback('Paciente atualizado com sucesso!');
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    showFeedback('Paciente excluído com sucesso!');
  };

  // CRUD Doctors
  const addDoctor = (doctor) => {
    setDoctors([...doctors, { ...doctor, id: Date.now() }]);
    showFeedback('Médico cadastrado com sucesso!');
  };

  const updateDoctor = (updatedDoctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
    showFeedback('Médico atualizado com sucesso!');
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
    showFeedback('Médico excluído com sucesso!');
  };

  // CRUD Appointments
  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, id: Date.now() }]);
    showFeedback('Consulta agendada com sucesso!');
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(a => a.id === updatedAppointment.id ? updatedAppointment : a));
    showFeedback('Consulta atualizada com sucesso!');
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
    showFeedback('Consulta cancelada com sucesso!');
  };

  return (
    <AppContext.Provider value={{
      patients, addPatient, updatePatient, deletePatient,
      doctors, addDoctor, updateDoctor, deleteDoctor,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      message, showFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
