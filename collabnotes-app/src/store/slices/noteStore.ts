// src/store/slices/noteStore.ts (Simplest working version)
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Note {
  id: string;
  text: string;
  createdAt: Date;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
}

export const useNoteStore = create<NoteStore>()(
  devtools((set) => ({
    notes: [],
    
    addNote: (note) =>
      set((state) => ({ 
        notes: [...state.notes, note] 
      })),
      
    updateNote: (id, text) =>
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, text } : note
        ),
      })),
      
    deleteNote: (id) =>
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
      })),
      
    setNotes: (notes) =>
      set({ notes }),
  }))
);