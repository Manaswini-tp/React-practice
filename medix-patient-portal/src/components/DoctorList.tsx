import React from 'react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const DoctorList: React.FC = () => {
  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Our Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id} style={{ marginBottom: '15px' }}>
            <strong>{doctor.name}</strong> - {doctor.specialty}
            <br />
            <Link to={`/doctors/${doctor.id}/patients`}>
              View Dr. {doctor.name.split(' ')[1]}'s Patients
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
