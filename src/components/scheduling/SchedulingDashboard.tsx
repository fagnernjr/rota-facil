import React, { useState } from 'react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { DateFilter } from '../dashboard/DateFilter';
import { DeliveryStatusBadge } from '../DeliveryStatusBadge';
import { Package, MapPin, Truck, Barcode } from 'lucide-react';
import { format } from 'date-fns';

export function SchedulingDashboard() {
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const { deliveries, getStatusCounts } = useDeliveryStore();
  const statusCounts = getStatusCounts();

  const filteredDeliveries = deliveries.filter(delivery => {
    const deliveryDate = new Date(delivery.deliveryDate);
    return deliveryDate >= dateRange.start && deliveryDate <= dateRange.end;
  });

  const statusCards = [
    { id: 'pending', label: 'Scheduled', count: statusCounts.pending, color: 'bg-blue-50 text-blue-600' },
    { id: 'completed', label: 'Completed', count: statusCounts.completed, color: 'bg-green-50 text-green-600' },
    { id: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled, color: 'bg-red-50 text-red-600' },
    { id: 'no_response', label: 'No Response', count: statusCounts.no_response, color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Scheduling Overview</h2>
        <DateFilter onDateChange={setDateRange} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusCards.map(({ id, label, count, color }) => (
          <div
            key={id}
            className={`${color} rounded-lg p-6 flex flex-col items-center justify-center`}
          >
            <span className="text-3xl font-bold">{count}</span>
            <span className="text-sm mt-2">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Schedules</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDeliveries.slice(0, 5).map((delivery) => (
            <div key={delivery.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{delivery.customerName}</span>
                    <DeliveryStatusBadge status={delivery.routeStatus} />
                  </div>
                  
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {delivery.address}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      {delivery.products.length} items
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      {delivery.deliveryService}
                    </div>
                    {delivery.trackingCode && (
                      <div className="flex items-center">
                        <Barcode className="w-4 h-4 mr-1" />
                        {delivery.trackingCode}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  {format(new Date(delivery.deliveryDate), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          ))}

          {filteredDeliveries.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No deliveries scheduled for the selected date range
            </div>
          )}
        </div>
      </div>
    </div>
  );
}