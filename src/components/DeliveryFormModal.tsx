import React from 'react';
import { X } from 'lucide-react';
import { DeliveryForm } from './DeliveryForm';

interface DeliveryFormModalProps {
  onSubmit: (delivery: any) => void;
  onClose: () => void;
}

export function DeliveryFormModal({ onSubmit, onClose }: DeliveryFormModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">New Delivery</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <DeliveryForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}