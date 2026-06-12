import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppointmentDetails from './components/AppointmentDetails';
import DoctorList from './components/DoctorList';
import PatientList from './components/PatientList';
import DoctorPatientDetails from './components/DoctorPatientDetails';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <nav style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '10px', 
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/doctors" style={{ marginRight: '15px' }}>Doctors</Link>
          <Link to="/patients/1/appointments/123">Sample Appointment</Link>
        </nav>

        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <div>
                <h1>Medix Patient Portal</h1>
                <p>Welcome to the Medix healthcare management system.</p>
                <h3>Quick Links:</h3>
                <ul>
                  <li><Link to="/doctors">View All Doctors</Link></li>
                  <li><Link to="/doctors/1/patients">View Dr. Sarah's Patients</Link></li>
                  <li><Link to="/patients/1/appointments/123">View Sample Appointment</Link></li>
                </ul>
              </div>
            } 
          />
          
          {/* Route with params - Appointment Details */}
          <Route 
            path="/patients/:patientId/appointments/:appointmentId" 
            element={<AppointmentDetails />} 
          />
          
          {/* Doctor List Route */}
          <Route 
            path="/doctors" 
            element={<DoctorList />} 
          />
          
          {/* Patient List for specific doctor */}
          <Route 
            path="/doctors/:doctorId/patients" 
            element={<PatientList />} 
          />
          
          {/* YOUR CHALLENGE: Doctor-Patient Details Route */}
          <Route 
            path="/doctors/:doctorId/patients/:patientId" 
            element={<DoctorPatientDetails />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;