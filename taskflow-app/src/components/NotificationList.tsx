// src/components/NotificationList.tsx
import React, { useState } from 'react';
import useNotificationStore from '../store/notificationStore';
import { useTheme } from '../context/ThemeContext';

const NotificationList: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const clearNotifications = useNotificationStore((state) => state.clearNotifications);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { theme } = useTheme();

  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'error' | 'success'>('info');

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addNotification(message.trim(), type);
      setMessage('');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get color based on notification type
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'info': return '#2196f3';
      default: return '#999';
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      <h3 style={{ color: theme === 'light' ? '#333' : '#fff' }}>
        Notifications ({unreadCount} unread)
      </h3>

      {/* Add Notification Form */}
      <form onSubmit={handleAddNotification} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Notification message..."
            style={{
              flex: 2,
              padding: '8px',
              backgroundColor: theme === 'light' ? '#fff' : '#555',
              color: theme === 'light' ? '#333' : '#fff',
              border: `1px solid ${theme === 'light' ? '#ddd' : '#666'}`,
              borderRadius: '4px'
            }}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'info' | 'error' | 'success')}
            style={{
              padding: '8px',
              backgroundColor: theme === 'light' ? '#fff' : '#555',
              color: theme === 'light' ? '#333' : '#fff',
              border: `1px solid ${theme === 'light' ? '#ddd' : '#666'}`,
              borderRadius: '4px'
            }}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
          <button 
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Notification
          </button>
        </div>
      </form>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <button
          onClick={clearNotifications}
          style={{
            marginBottom: '15px',
            padding: '5px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Clear All
        </button>
      )}

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <p style={{ color: theme === 'light' ? '#666' : '#aaa', textAlign: 'center' }}>
          No notifications yet. Add one above!
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: notification.read 
                  ? (theme === 'light' ? '#f5f5f5' : '#444')
                  : (theme === 'light' ? '#e3f2fd' : '#2c3e50'),
                borderLeft: `4px solid ${getTypeColor(notification.type)}`,
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: notification.read ? 0.7 : 1
              }}
            >
              <div>
                <span style={{ 
                  fontWeight: notification.read ? 'normal' : 'bold',
                  color: theme === 'light' ? '#333' : '#fff'
                }}>
                  {notification.message}
                </span>
                <span style={{ 
                  marginLeft: '10px',
                  fontSize: '12px',
                  color: getTypeColor(notification.type)
                }}>
                  [{notification.type}]
                </span>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;