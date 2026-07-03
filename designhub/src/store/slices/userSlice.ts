// src/store/slices/userSlice.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const createUserSlice = (set: any) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
});
