// src/App.tsx
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import NotificationList from './components/NotificationList';

// Inner component that uses theme (needs to be inside provider)
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#222',
      color: theme === 'light' ? '#333' : '#fff',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: `2px solid ${theme === 'light' ? '#ddd' : '#444'}`
        }}>
          <h1>TaskFlow Project Management</h1>
          <ThemeSwitcher />
        </header>

        <main>
          <h2>Tasks</h2>
          <AddTask />
          <TaskList />
          
          <h2 style={{ marginTop: '40px' }}>Notifications Center</h2>
          <NotificationList />
        </main>
      </div>
    </div>
  );
};

// Main App component with ThemeProvider wrapper
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
