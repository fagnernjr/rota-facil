import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CancellationModalProps {
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

const CANCELLATION_REASONS = [
  { id: 'customer_withdrawn', label: 'Customer has withdrawn' },
  { id: 'outside_delivery_area', label: 'Outside the delivery area' },
  { id: 'system_error', label: 'System error' },
];

export function CancellationModal({ onConfirm, onClose }: CancellationModalProps) {
  const [selectedReason, setSelectedReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReason) {
      onConfirm(selectedReason);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Cancel Delivery</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for cancellation
            </label>
            <div className="space-y-2">
              {CANCELLATION_REASONS.map(({ id, label }) => (
                <label key={id} className="flex items-center">
                  <input
                    type="radio"
                    name="cancellationReason"
                    value={id}
                    checked={selectedReason === id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedReason}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}