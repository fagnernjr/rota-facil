import React from 'react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { DeliveryStatusBadge } from '../DeliveryStatusBadge';
import { DateFilter } from './DateFilter';

export function DeliveryOverview() {
  const { deliveries, getStatusCounts } = useDeliveryStore();
  const statusCounts = getStatusCounts();

  const statusTabs = [
    { id: 'pending', label: 'Active', count: statusCounts.pending, color: 'bg-blue-50 text-blue-600' },
    { id: 'completed', label: 'Completed', count: statusCounts.completed, color: 'bg-green-50 text-green-600' },
    { id: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled, color: 'bg-red-50 text-red-600' },
    { id: 'no_response', label: 'No Response', count: statusCounts.no_response, color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Delivery Status</h2>
        <DateFilter onDateChange={() => {}} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusTabs.map(({ id, label, count, color }) => (
          <div
            key={id}
            className={`${color} rounded-lg p-4 flex flex-col items-center justify-center`}
          >
            <span className="text-2xl font-semibold">{count}</span>
            <span className="text-sm mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Deliveries</h3>
        </div>
        <div className="border-t border-gray-200">
          {deliveries.slice(0, 5).map((delivery) => (
            <div
              key={delivery.id}
              className="p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{delivery.customerName}</p>
                  <p className="text-sm text-gray-500 mt-1">{delivery.address}</p>
                </div>
                <DeliveryStatusBadge status={delivery.routeStatus} />
              </div>
            </div>
          ))}

          {deliveries.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No deliveries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}