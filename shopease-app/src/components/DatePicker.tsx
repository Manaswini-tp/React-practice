// src/components/DatePicker.tsx
import React, { useState } from 'react';
// ❌ BAD: Importing entire moment library
import moment from 'moment';

const DatePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  
  const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
      <h3>Date Picker (Heavy Library)</h3>
      <p>Selected: {formattedDate}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Note: Moment.js adds ~70KB to bundle!
      </p>
      <button
        onClick={() => setDate(new Date())}
        style={{
          padding: '5px 10px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Update Date
      </button>
    </div>
  );
};

export default DatePicker;