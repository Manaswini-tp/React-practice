// src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createFileSlice, FileSlice } from './slices/fileSlice';
import { createCommentSlice, CommentSlice } from './slices/commentSlice';
import { createNotificationSlice, NotificationSlice } from './slices/notificationSlice';

// Combine all slice types
type DesignHubStore = UserSlice & FileSlice & CommentSlice & NotificationSlice;

// Create the combined store
export const useDesignHubStore = create<DesignHubStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...createUserSlice(set),
        ...createFileSlice(set, get),
        ...createCommentSlice(set, get),
        ...createNotificationSlice(set, get),
      }),
      { name: 'designhub-store' }
    )
  )
);
