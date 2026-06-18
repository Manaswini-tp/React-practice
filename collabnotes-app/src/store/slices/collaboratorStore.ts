// src/store/slices/collaboratorStore.ts
import { create } from 'zustand';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CollaboratorStore {
  collaborators: Collaborator[];
  setCollaborators: (collaborators: Collaborator[]) => void;
}

export const useCollaboratorStore = create<CollaboratorStore>((set) => ({
  collaborators: [],
  setCollaborators: (collaborators) => set({ collaborators }),
}));
