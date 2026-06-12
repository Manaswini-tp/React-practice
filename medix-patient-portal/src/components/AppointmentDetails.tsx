// AppointmentDetails.tsx - SIMPLE FIX
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Interface for appointment data
interface AppointmentData {
  id: number;
  patientId: number;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const AppointmentDetails: React.FC = () => {
  // DON'T use <AppointmentParams> - just let TypeScript infer
  const { patientId, appointmentId } = useParams();  // ← REMOVED the generic
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Validate and use parameters
  if (!patientId || !appointmentId) {
    return <div>Missing or invalid parameters</div>;
  }

  const patientIdNum = Number(patientId);
  const apptIdNum = Number(appointmentId);
  
  if (isNaN(patientIdNum) || isNaN(apptIdNum)) {
    return <div>Invalid ID format. IDs must be numbers.</div>;
  }

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      setTimeout(() => {
        const sampleAppointment: AppointmentData = {
          id: apptIdNum,
          patientId: patientIdNum,
          doctorName: apptIdNum === 123 ? 'Dr. Sarah Johnson' : 'Dr. Michael Chen',
          date: '2024-01-15',
          time: '10:30 AM',
          reason: apptIdNum === 123 ? 'Regular Checkup' : 'Follow-up Consultation',
          status: 'scheduled'
        };
        setAppointment(sampleAppointment);
        setLoading(false);
      }, 500);
    };

    fetchAppointment();
  }, [patientIdNum, apptIdNum]);

  if (loading) {
    return <div>Loading appointment details...</div>;
  }

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  const handleCancelAppointment = () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointment(prev => prev ? { ...prev, status: 'cancelled' } : null);
      alert('Appointment cancelled successfully');
    }
  };

  const handleBackToPatient = () => {
    navigate(`/patients/${patientId}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return '#4caf50';
      case 'completed': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Appointment Details</h1>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Patient Information</h2>
        <p><strong>Patient ID:</strong> {patientIdNum}</p>
        <Link to={`/patients/${patientId}`}>View Full Patient Profile</Link>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Appointment Information</h2>
        <p><strong>Appointment ID:</strong> {appointment.id}</p>
        <p><strong>Doctor:</strong> {appointment.doctorName}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
        <p>
          <strong>Status:</strong> 
          <span style={{ color: getStatusColor(appointment.status), marginLeft: '5px' }}>
            {appointment.status.toUpperCase()}
          </span>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {appointment.status === 'scheduled' && (
          <button 
            onClick={handleCancelAppointment}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel Appointment
          </button>
        )}
        
        <button 
          onClick={handleBackToPatient}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Patient
        </button>
        
        <Link to="/">
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Home
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
        <h3>Quick Navigation</h3>
        <Link to="/doctors" style={{ marginRight: '15px' }}>View All Doctors</Link>
        <Link to={`/doctors/1/patients`}>View Doctor's Patients</Link>
      </div>
    </div>
  );
};

export default AppointmentDetails;