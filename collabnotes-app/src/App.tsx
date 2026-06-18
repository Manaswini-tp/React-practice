// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePreferencesStore } from './store/slices/preferencesStore';
import NoteList from './components/NoteList';
import Preferences from './components/Preferences';
import SessionInfo from './components/SessionInfo';
import HistoryLog from './components/HistoryLog';
import CollaboratorList from './components/CollaboratorList';

// Create React Query client
const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { theme, fontSize } = usePreferencesStore();

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      <h1>CollabNotes - Real-Time Collaborative Notes</h1>
      
      <div style={{ fontSize: `${fontSize}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left Column */}
          <div>
            <Preferences />
            <SessionInfo />
            <HistoryLog />
          </div>
          
          {/* Right Column */}
          <div>
            <CollaboratorList />
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Your Notes</h2>
          <NoteList />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
