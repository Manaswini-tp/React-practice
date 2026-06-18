// src/store/slices/historyStore.ts
import { create } from 'zustand';
import { devtools} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface HistoryEntry {
  noteId: string;
  action: 'create' | 'update' | 'delete';
  timestamp: number;
}

interface HistoryStore {
  history: HistoryEntry[];
  addHistoryEntry: (noteId: string, action: 'create' | 'update' | 'delete') => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  devtools(
    immer((set) => ({
      history: [],
      
      addHistoryEntry: (noteId: string, action: 'create' | 'update' | 'delete') =>
        set((state) => {
          state.history.push({
            noteId,
            action,
            timestamp: Date.now(),
          });
        }),
        
      clearHistory: () =>
        set((state) => {
          state.history = [];
        }),
    }))
  )
);