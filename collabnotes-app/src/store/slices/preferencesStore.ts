// src/store/slices/preferencesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PreferencesStore {
  theme: 'light' | 'dark';
  fontSize: number;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: number) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 14,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'collabnotes-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme, fontSize: state.fontSize }),
      version: 2,
      migrate: (persisted: any, version: number) => {
        if (version < 2) {
          return { ...persisted, fontSize: 14 };
        }
        return persisted;
      },
    }
  )
);