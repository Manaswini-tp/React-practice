// src/components/FileList.tsx
import React from 'react';
import { useDesignHubStore } from '../store';

const FileList: React.FC = () => {
  const files = useDesignHubStore((state) => state.files);
  const addFile = useDesignHubStore((state) => state.addFile);
  const updateFile = useDesignHubStore((state) => state.updateFile);

  const handleAddFile = () => {
    const newFile = {
      id: Date.now().toString(),
      name: `Design File ${files.length + 1}`,
      content: '// Start designing here...',
    };
    addFile(newFile);
  };

  return (
    <div>
      <button
        onClick={handleAddFile}
        style={{
          padding: '8px 16px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        + Add File
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((file) => (
          <li
            key={file.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => updateFile(file.id, `${file.content}\n// Updated!`)}
          >
            <strong>{file.name}</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
              {file.content.substring(0, 50)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;