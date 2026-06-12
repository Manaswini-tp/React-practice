import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Add index signature to satisfy React Router
interface AppointmentParams {
  [key: string]: string | undefined;  // ← ADD THIS LINE
  patientId: string;
  appointmentId: string;
}

const AppointmentDetails: React.FC = () => {
  const { patientId, appointmentId } = useParams<AppointmentParams>();

  if (!patientId || !appointmentId) {
    return <div>Missing or invalid parameters</div>;
  }

  const apptId = Number(appointmentId);
  if (isNaN(apptId)) {
    return <div>Invalid appointment ID</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Appointment Details</h1>
      <p>Patient ID: {patientId}</p>
      <p>Appointment ID: {apptId}</p>
      <Link to={`/patients/${patientId}`}>Back to Patient</Link>
    </div>
  );
};

export default AppointmentDetails;