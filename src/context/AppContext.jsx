import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState(null);

  const showFeedback = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [patientsData, doctorsData, appointmentsData] = await Promise.all([
        supabase.from('patients').select('*').order('id', { ascending: true }),
        supabase.from('doctors').select('*').order('id', { ascending: true }),
        supabase.from('appointments').select('*').order('id', { ascending: true })
      ]);

      if (patientsData.data) setPatients(patientsData.data);
      if (doctorsData.data) setDoctors(doctorsData.data);
      if (appointmentsData.data) setAppointments(appointmentsData.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  // ==========================================
  // CRUD Patients
  // ==========================================
  const addPatient = async (patient) => {
    const { id, created_at, ...cleanData } = patient;
    const { data, error } = await supabase
      .from('patients')
      .insert([cleanData])
      .select();

    if (!error && data) {
      setPatients(prev => [...prev, data[0]]);
      showFeedback('Paciente cadastrado com sucesso!');
    } else {
      showFeedback('Erro ao cadastrar paciente.');
      console.error("Erro Supabase (Patients):", error);
    }
  };

  const updatePatient = async (updatedPatient) => {
    const { id, created_at, ...rest } = updatedPatient;
    const { data, error } = await supabase
      .from('patients')
      .update(rest)
      .eq('id', id)
      .select();

    if (!error && data) {
      setPatients(prev => prev.map(p => p.id === id ? data[0] : p));
      showFeedback('Paciente atualizado com sucesso!');
    } else {
      showFeedback('Erro ao atualizar paciente.');
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    const { error } = await supabase.from('patients').delete().eq('id', id);
    if (!error) {
      setPatients(prev => prev.filter(p => p.id !== id));
      showFeedback('Paciente excluído com sucesso!');
    } else {
      showFeedback('Erro ao excluir paciente.');
      console.error(error);
    }
  };

  // ==========================================
  // CRUD Doctors
  // ==========================================
  const addDoctor = async (doctor) => {
    const { id, created_at, ...cleanData } = doctor;
    const { data, error } = await supabase.from('doctors').insert([cleanData]).select();
    if (!error && data) {
      setDoctors(prev => [...prev, data[0]]);
      showFeedback('Médico cadastrado com sucesso!');
    } else {
      showFeedback('Erro ao cadastrar médico.');
      console.error(error);
    }
  };

  const updateDoctor = async (updatedDoctor) => {
    const { id, created_at, ...rest } = updatedDoctor;
    const { data, error } = await supabase.from('doctors').update(rest).eq('id', id).select();
    if (!error && data) {
      setDoctors(prev => prev.map(d => d.id === id ? data[0] : d));
      showFeedback('Médico atualizado com sucesso!');
    } else {
      showFeedback('Erro ao atualizar médico.');
      console.error(error);
    }
  };

  const deleteDoctor = async (id) => {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (!error) {
      setDoctors(prev => prev.filter(d => d.id !== id));
      showFeedback('Médico excluído com sucesso!');
    } else {
      showFeedback('Erro ao excluir médico.');
      console.error(error);
    }
  };

  // ==========================================
  // CRUD Appointments
  // ==========================================
  const addAppointment = async (appointment) => {
    const { id, created_at, ...cleanData } = appointment;
    const { data, error } = await supabase.from('appointments').insert([cleanData]).select();
    if (!error && data) {
      setAppointments(prev => [...prev, data[0]]);
      showFeedback('Consulta agendada com sucesso!');
    } else {
      showFeedback('Erro ao agendar consulta.');
      console.error(error);
    }
  };

  const updateAppointment = async (updatedAppointment) => {
    const { id, created_at, ...rest } = updatedAppointment;
    const { data, error } = await supabase.from('appointments').update(rest).eq('id', id).select();
    if (!error && data) {
      setAppointments(prev => prev.map(a => a.id === id ? data[0] : a));
      showFeedback('Consulta atualizada com sucesso!');
    } else {
      showFeedback('Erro ao atualizar consulta.');
      console.error(error);
    }
  };

  const deleteAppointment = async (id) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (!error) {
      setAppointments(prev => prev.filter(a => a.id !== id));
      showFeedback('Consulta cancelada com sucesso!');
    } else {
      showFeedback('Erro ao cancelar consulta.');
      console.error(error);
    }
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