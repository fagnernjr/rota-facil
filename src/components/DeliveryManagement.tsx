import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDeliveryStore } from '../store/deliveryStore';
import { DeliveryStatus, RoutePoint } from '../types/delivery';
import { DeliveryCard } from './DeliveryCard';
import { DeliveryDetailModal } from './DeliveryDetailModal';
import { DeliveryFormModal } from './DeliveryFormModal';
import { DateFilter } from './dashboard/DateFilter';

export function DeliveryManagement() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<RoutePoint | null>(null);
  const [activeTab, setActiveTab] = useState<DeliveryStatus | 'pending'>('pending');
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  
  const { addDelivery, getDeliveriesByStatus, getStatusCounts } = useDeliveryStore();
  const statusCounts = getStatusCounts();

  const handleDeliverySubmit = async (delivery: any) => {
    await addDelivery(delivery);
    setIsFormModalOpen(false);
  };

  const deliveries = getDeliveriesByStatus(activeTab).filter(
    delivery => {
      const deliveryDate = new Date(delivery.deliveryDate);
      return deliveryDate >= dateRange.start && deliveryDate <= dateRange.end;
    }
  );

  const statusTabs = [
    { id: 'pending', label: 'Active', count: statusCounts.pending, color: 'bg-blue-50 text-blue-600' },
    { id: 'completed', label: 'Completed', count: statusCounts.completed, color: 'bg-green-50 text-green-600' },
    { id: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled, color: 'bg-red-50 text-red-600' },
    { id: 'no_response', label: 'No Response', count: statusCounts.no_response, color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <DateFilter onDateChange={setDateRange} />
        </div>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Delivery
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
          {statusTabs.map(({ id, label, count, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as DeliveryStatus | 'pending')}
              className={`
                flex flex-col items-center justify-center p-4 transition-colors
                ${activeTab === id ? color : 'hover:bg-gray-50'}
              `}
            >
              <span className="text-2xl font-semibold">{count}</span>
              <span className="text-sm text-gray-600">{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                onClick={() => setSelectedDelivery(delivery)}
                className="cursor-pointer"
              >
                <DeliveryCard delivery={delivery} showActions={false} />
              </div>
            ))}

            {deliveries.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No {activeTab} deliveries found for the selected date range
              </div>
            )}
          </div>
        </div>
      </div>

      {isFormModalOpen && (
        <DeliveryFormModal
          onSubmit={handleDeliverySubmit}
          onClose={() => setIsFormModalOpen(false)}
        />
      )}

      {selectedDelivery && (
        <DeliveryDetailModal
          delivery={selectedDelivery}
          onClose={() => setSelectedDelivery(null)}
        />
      )}
    </div>
  );
}