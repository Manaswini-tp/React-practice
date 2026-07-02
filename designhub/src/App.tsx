// src/App.tsx
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import FileList from './components/FileList';
import CommentsPanel from './components/CommentsPanel';
import NotificationsPanel from './components/NotificationsPanel';
import { useDesignHubStore } from './store';

const App: React.FC = () => {
  const user = useDesignHubStore((state) => state.user);
  const files = useDesignHubStore((state) => state.files);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #ddd',
        }}
      >
        <h1>DesignHub Collaborative Platform</h1>
        <UserProfile />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column - Files */}
        <div>
          <h2>Your Design Files</h2>
          <FileList />
        </div>

        {/* Right Column - Notifications */}
        <div>
          <NotificationsPanel />
        </div>
      </div>

      {/* Comments Section - Shows when file is selected */}
      {user && files.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Comments</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Select a file to comment on: </label>
            <select
              onChange={(e) => setSelectedFileId(e.target.value)}
              style={{ padding: '5px', marginLeft: '10px' }}
            >
              <option value="">Select a file...</option>
              {files.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))}
            </select>
          </div>
          {selectedFileId && <CommentsPanel fileId={selectedFileId} />}
        </div>
      )}
    </div>
  );
};

export default App;
