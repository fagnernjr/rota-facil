import React, { useState } from 'react';
import { useDeliveryStore } from '../store/deliveryStore';
import { RoutePoint, DeliveryStatus } from '../types/delivery';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';
import { Calendar, Search } from 'lucide-react';

export function DeliveryList() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { deliveries } = useDeliveryStore();

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesDate = delivery.deliveryDate === selectedDate;
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    const matchesSearch = delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesStatus && matchesSearch;
  });

  const statusOptions: Array<{ value: DeliveryStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'no_response', label: 'No Response' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-2" />
              Delivery Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as DeliveryStatus | 'all')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Search className="w-4 h-4 inline mr-2" />
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer or address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {filteredDeliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}

          {filteredDeliveries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No deliveries found for the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DeliveryCard({ delivery }: { delivery: RoutePoint }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium text-gray-900">
          {delivery.customerName}
        </span>
        <DeliveryStatusBadge status={delivery.routeStatus} />
      </div>
      
      <p className="text-gray-600 mb-2">{delivery.address}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span>Order #{delivery.orderIndex}</span>
        <span>Payment: {delivery.paymentMethod}</span>
        <span>Amount: {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(delivery.paymentAmount)}</span>
      </div>
    </div>
  );
}