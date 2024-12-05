import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useDeliveryStore } from '../../store/deliveryStore';
import { DeliveryFormModal } from '../DeliveryFormModal';
import { SchedulingTable } from './SchedulingTable';
import { DateFilter } from '../dashboard/DateFilter';

export function SchedulingManagement() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  const { deliveries, loadDeliveries, addDelivery } = useDeliveryStore();

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  const handleDeliverySubmit = async (delivery: any) => {
    try {
      await addDelivery(delivery);
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error adding delivery:', error);
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesDate = new Date(delivery.deliveryDate) >= dateRange.start && 
                       new Date(delivery.deliveryDate) <= dateRange.end;
    const matchesSearch = delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    
    return matchesDate && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Delivery Scheduling</h2>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Delivery
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by customer or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="block w-full px-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <DateFilter onDateChange={setDateRange} />
          </div>
        </div>

        <SchedulingTable deliveries={filteredDeliveries} />
      </div>

      {isFormModalOpen && (
        <DeliveryFormModal
          onSubmit={handleDeliverySubmit}
          onClose={() => setIsFormModalOpen(false)}
        />
      )}
    </div>
  );
}