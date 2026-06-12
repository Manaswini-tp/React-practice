// src/components/AddTask.tsx
import React, { useState } from 'react';
import useTaskStore from '../store/taskStore';
import { useTheme } from '../context/ThemeContext';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTask = useTaskStore((state) => state.addTask);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: theme === 'light' ? '#fff' : '#555',
          color: theme === 'light' ? '#333' : '#fff',
          border: `1px solid ${theme === 'light' ? '#ddd' : '#666'}`,
          borderRadius: '4px'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
