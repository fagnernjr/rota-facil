import React from 'react';
import { DeliveryStatus } from '../../types/delivery';

interface DeliveryChartProps {
  data: {
    status: DeliveryStatus;
    count: number;
  }[];
}

export function DeliveryChart({ data }: DeliveryChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const statusColors = {
    completed: 'bg-green-500',
    cancelled: 'bg-red-500',
    no_response: 'bg-yellow-500',
    pending: 'bg-blue-500',
  };

  const statusLabels = {
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_response: 'No Response',
    pending: 'Pending',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Status Distribution</h3>
      
      <div className="space-y-4">
        {data.map(({ status, count }) => (
          <div key={status} className="relative">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{statusLabels[status]}</span>
              <span className="text-gray-600">{((count / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${statusColors[status]}`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}