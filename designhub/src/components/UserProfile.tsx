// src/components/UserProfile.tsx
import React from 'react';
import { useDesignHubStore } from '../store';

const UserProfile: React.FC = () => {
  const user = useDesignHubStore((state) => state.user);
  const setUser = useDesignHubStore((state) => state.setUser);

  if (!user) {
    return (
      <button
        onClick={() =>
          setUser({ id: 'u1', name: 'Alex Johnson', email: 'alex@designhub.com' })
        }
        style={{
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    );
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
      <strong>Welcome, {user.name}!</strong>
      <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
        {user.email}
      </p>
    </div>
  );
};

export default UserProfile;