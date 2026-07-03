// src/store/slices/notificationSlice.ts
export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export interface NotificationSlice {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const createNotificationSlice = (set: any, get: any) => ({
  notifications: [],
  
  addNotification: (message: string) =>
    set((state: any) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message,
          read: false,
        },
      ],
    })),
    
  markAsRead: (id: string) =>
    set((state: any) => ({
      notifications: state.notifications.map((n: Notification) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
    
  clearNotifications: () =>
    set({ notifications: [] }),
});
