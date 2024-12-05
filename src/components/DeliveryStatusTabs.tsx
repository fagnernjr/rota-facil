import React from 'react';
import { ClipboardList, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { DeliveryStatus } from '../types/delivery';

interface DeliveryStatusTabsProps {
  activeTab: DeliveryStatus | 'pending';
  onTabChange: (status: DeliveryStatus | 'pending') => void;
  counts: {
    pending: number;
    completed: number;
    cancelled: number;
    no_response: number;
  };
}

export function DeliveryStatusTabs({ activeTab, onTabChange, counts }: DeliveryStatusTabsProps) {
  const tabs = [
    { id: 'pending', label: 'Active', icon: ClipboardList, count: counts.pending },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', icon: XCircle, count: counts.cancelled },
    { id: 'no_response', label: 'No Response', icon: AlertCircle, count: counts.no_response },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as DeliveryStatus | 'pending')}
            className={`
              flex flex-col sm:flex-row items-center justify-center p-2 sm:p-4 text-sm font-medium 
              border-b-2 transition-colors duration-200
              ${activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Icon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
            <span className="hidden sm:inline">{label}</span>
            <span className={`
              ml-0 sm:ml-2 px-2 py-0.5 rounded-full text-xs
              ${activeTab === id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
            `}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}