import React from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { Bell, Trash2 } from 'lucide-react';

export function NotificationList() {
  const { notifications, clearNotifications } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-medium">Notifications</h3>
        </div>
        <button
          onClick={clearNotifications}
          className="text-gray-400 hover:text-gray-500"
          title="Clear all notifications"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <p className="text-gray-800">{notification.message}</p>
            <time className="text-xs text-gray-500">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}