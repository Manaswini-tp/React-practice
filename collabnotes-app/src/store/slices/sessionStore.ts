// src/store/slices/sessionStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SessionStore {
  userId: string;
  token: string;
  expiresAt: number;
  role: 'admin' | 'user';
  setSession: (userId: string, token: string, expiresAt: number, role?: 'admin' | 'user') => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      userId: '',
      token: '',
      expiresAt: 0,
      role: 'user',
      
      setSession: (userId, token, expiresAt, role = 'user') =>
        set({ userId, token, expiresAt, role }),
        
      clearSession: () =>
        set({ userId: '', token: '', expiresAt: 0, role: 'user' }),
    }),
    {
      name: 'collabnotes-session',
      storage: createJSONStorage(() => localStorage),
      // Only persist userId and token, NOT expiresAt
      partialize: (state) => ({ 
        userId: state.userId, 
        token: state.token,
        role: state.role 
      }),
      version: 2,
      migrate: (persisted: any, version: number) => {
        // Add role field with default 'user' for version 2
        if (version < 2) {
          return { ...persisted, role: 'user' };
        }
        return persisted;
      },
    }
  )
);