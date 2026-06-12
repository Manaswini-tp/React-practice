// src/store/notificationStore.ts
import { create } from 'zustand';

// Notification interface matching their requirements
interface Notification {
  id: string;
  message: string;
  type: 'info' | 'error' | 'success';
  read: boolean;
}

// Store interface with all required actions
interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string, type: 'info' | 'error' | 'success') => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message,
          type,
          read: false
        }
      ]
    })),
  
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    })),
  
  clearNotifications: () =>
    set({ notifications: [] })
}));

export default useNotificationStore;