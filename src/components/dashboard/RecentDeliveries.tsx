import React from 'react';
import { RoutePoint } from '../../types/delivery';
import { DeliveryStatusBadge } from '../DeliveryStatusBadge';

interface RecentDeliveriesProps {
  deliveries: RoutePoint[];
}

export function RecentDeliveries({ deliveries }: RecentDeliveriesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Deliveries</h3>
      
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{delivery.customerName}</p>
              <p className="text-sm text-gray-500 mt-1">{delivery.address}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(delivery.createdAt).toLocaleDateString()}
              </p>
            </div>
            <DeliveryStatusBadge status={delivery.routeStatus} />
          </div>
        ))}

        {deliveries.length === 0 && (
          <p className="text-gray-500 text-center py-4">No recent deliveries</p>
        )}
      </div>
    </div>
  );
}