import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Collaborator, useCollaboratorStore } from '../store/collaboratorStore';

// Simulate API call to fetch collaborators
const fetchCollaboratorsFromAPI = async (): Promise<Collaborator[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: '1', name: 'Alice Johnson', email: 'alice@collabnotes.com', avatar: '👩' },
    { id: '2', name: 'Bob Smith', email: 'bob@collabnotes.com', avatar: '👨' },
    { id: '3', name: 'Carol Davis', email: 'carol@collabnotes.com', avatar: '👩' },
    { id: '4', name: 'David Wilson', email: 'david@collabnotes.com', avatar: '👨' },
  ];
};

const CollaboratorList: React.FC = () => {
  const { collaborators, setCollaborators } = useCollaboratorStore();

  // React Query v5 - no onSuccess option
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['collaborators'],
    queryFn: fetchCollaboratorsFromAPI,
  });

  // Use useEffect to sync data to Zustand store
  useEffect(() => {
    if (data) {
      setCollaborators(data);
    }
  }, [data, setCollaborators]);

  if (isLoading) {
    return <div>Loading collaborators...</div>;
  }

  if (error) {
    return <div>Error loading collaborators: {error.message}</div>;
  }

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Collaborators ({collaborators.length})</h3>
        <button
          onClick={() => refetch()}
          style={{
            padding: '5px 10px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Refresh
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {collaborators.map((collaborator) => (
          <li
            key={collaborator.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '24px', marginRight: '10px' }}>
              {collaborator.avatar}
            </span>
            <div>
              <div>
                <strong>{collaborator.name}</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {collaborator.email}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorList;
