// src/components/AdminPanel.tsx
import React from 'react';
// Import heavy libraries only used in admin panel
import _ from 'lodash';
import moment from 'moment';

const AdminPanel: React.FC = () => {
  console.log('Admin panel loaded (heavy bundle only when needed)');
  
  const analyticsData = _.range(100).map(i => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 1000),
    date: moment().subtract(i, 'days').format('MM/DD')
  }));

  return (
    <div style={{ padding: '20px', backgroundColor: '#fce4ec', borderRadius: '8px' }}>
      <h2>Admin Panel (Lazy Loaded)</h2>
      <p>This heavy component only loads when you click the button!</p>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Day</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sales</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map(item => (
              <tr key={item.day}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.day}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.sales}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        This panel uses lodash and moment, but loads separately!
      </p>
    </div>
  );
};

export default AdminPanel;
