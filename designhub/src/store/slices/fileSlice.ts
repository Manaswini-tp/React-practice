// src/store/slices/fileSlice.ts
export interface File {
  id: string;
  name: string;
  content: string;
}

export interface FileSlice {
  files: File[];
  addFile: (file: File) => void;
  updateFile: (id: string, content: string) => void;
}

export const createFileSlice = (set: any, get: any) => ({
  files: [],
  addFile: (file: File) =>
    set((state: any) => ({ files: [...state.files, file] })),
  updateFile: (id: string, content: string) =>
    set((state: any) => ({
      files: state.files.map((f: File) =>
        f.id === id ? { ...f, content } : f
      ),
    })),
});
