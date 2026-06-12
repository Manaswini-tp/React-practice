// src/components/TaskList.tsx
import React from 'react';
import useTaskStore from '../store/taskStore';
import { useTheme } from '../context/ThemeContext';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const { theme } = useTheme();

  if (tasks.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: theme === 'light' ? '#666' : '#aaa'
      }}>
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li 
          key={task.id} 
          style={{
            padding: '10px',
            marginBottom: '8px',
            backgroundColor: theme === 'light' ? '#f5f5f5' : '#444',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: theme === 'light' ? '#333' : '#fff'
            }}>
              {task.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;