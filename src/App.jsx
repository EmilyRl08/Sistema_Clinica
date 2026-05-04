// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/medicos" element={<Doctors />} />
            <Route path="/consultas" element={<Appointments />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
