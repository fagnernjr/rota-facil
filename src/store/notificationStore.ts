import { create } from 'zustand';
import { sendNotification } from '../utils/notificationUtils';

interface NotificationStore {
  notifications: Array<{
    id: string;
    message: string;
    timestamp: string;
  }>;
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  addNotification: (message: string) => {
    const notification = {
      id: crypto.randomUUID(),
      message,
      timestamp: new Date().toISOString(),
    };
    
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
    
    sendNotification('Rota Fácil DF', {
      body: message,
      icon: '/vite.svg',
    });
  },
  
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));