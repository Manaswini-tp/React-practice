// src/store/taskStore.ts
import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now().toString(), title, completed: false }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));

export default useTaskStore;
