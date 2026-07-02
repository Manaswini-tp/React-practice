// src/components/NotificationsPanel.tsx
import React from 'react';
import { useDesignHubStore } from '../store';

const NotificationsPanel: React.FC = () => {
  const notifications = useDesignHubStore((state) => state.notifications);
  const addNotification = useDesignHubStore((state) => state.addNotification);
  const markAsRead = useDesignHubStore((state) => state.markAsRead);
  const clearNotifications = useDesignHubStore((state) => state.clearNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <h3 style={{ margin: 0 }}>
          Notifications ({unreadCount} unread)
        </h3>
        <button
          onClick={() =>
            addNotification(`New notification at ${new Date().toLocaleTimeString()}`)
          }
          style={{
            padding: '5px 10px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Add Test Notification
        </button>
      </div>

      {notifications.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>
          No notifications yet
        </p>
      ) : (
        <>
          {unreadCount > 0 && (
            <button
              onClick={clearNotifications}
              style={{
                marginBottom: '10px',
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Clear All
            </button>
          )}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: notification.read ? '#fff' : '#e3f2fd',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                }}
              >
                <span
                  style={{
                    fontWeight: notification.read ? 'normal' : 'bold',
                  }}
                >
                  {notification.message}
                </span>
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
                      fontSize: '12px',
                    }}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NotificationsPanel;