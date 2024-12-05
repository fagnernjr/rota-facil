import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { useReportStore } from '../../store/reportStore';
import { X, DollarSign, Users, Package, TrendingUp } from 'lucide-react';

interface DailyReportFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function DailyReportForm({ onClose, onSuccess }: DailyReportFormProps) {
  const user = useAuthStore((state) => state.user);
  const { employees } = useEmployeeStore();
  const currentEmployee = useEmployeeStore((state) => state.getEmployeeByAccessCode(user?.accessCode || ''));
  const { addReport } = useReportStore();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    employeeId: user?.role === 'admin' ? '' : currentEmployee?.id || '',
    adSpend: '',
    leads: '',
    scheduledDeliveries: '',
    revenue: '',
    notes: '',
  });

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, field: 'adSpend' | 'revenue') => {
    const value = e.target.value.replace(/\D/g, '');
    const numberValue = value ? parseInt(value) / 100 : 0;
    setFormData(prev => ({ ...prev, [field]: numberValue.toString() }));
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, field: 'leads' | 'scheduledDeliveries') => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let reportEmployee;
    if (user?.role === 'admin') {
      reportEmployee = employees.find(emp => emp.id === formData.employeeId);
    } else {
      reportEmployee = currentEmployee;
    }
    
    if (!reportEmployee) return;

    await addReport({
      ...formData,
      employeeId: reportEmployee.id,
      employeeName: reportEmployee.name,
      adSpend: parseFloat(formData.adSpend),
      leads: parseInt(formData.leads),
      scheduledDeliveries: parseInt(formData.scheduledDeliveries),
      revenue: parseFloat(formData.revenue),
    });

    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Daily Report</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {user?.role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee
                </label>
                <select
                  value={formData.employeeId}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-blue-600" />
                Ad Spend
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatCurrency(formData.adSpend)}
                  onChange={(e) => handleCurrencyInput(e, 'adSpend')}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Users className="w-4 h-4 mr-1 text-green-600" />
                Leads
              </label>
              <input
                type="text"
                value={formData.leads}
                onChange={(e) => handleNumberInput(e, 'leads')}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Package className="w-4 h-4 mr-1 text-purple-600" />
                Deliveries
              </label>
              <input
                type="text"
                value={formData.scheduledDeliveries}
                onChange={(e) => handleNumberInput(e, 'scheduledDeliveries')}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-amber-600" />
                Revenue
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatCurrency(formData.revenue)}
                  onChange={(e) => handleCurrencyInput(e, 'revenue')}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Additional observations..."
            />
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}