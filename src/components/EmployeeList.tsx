import React, { useState } from 'react';
import { useEmployeeStore } from '../store/employeeStore';
import { Eye, EyeOff, Mail, Phone, Trash2, Shield, User } from 'lucide-react';

export function EmployeeList() {
  const { employees, deleteEmployee } = useEmployeeStore();
  const [visibleAccessCodes, setVisibleAccessCodes] = useState<Record<string, boolean>>({});

  const toggleAccessCode = (employeeId: string) => {
    setVisibleAccessCodes(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Registered Employees</h2>
      
      <div className="space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{employee.name}</span>
                {employee.role === 'admin' && (
                  <Shield className="w-4 h-4 text-blue-600" title="Administrator" />
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                {employee.username}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="w-4 h-4 mr-1" />
                {employee.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="w-4 h-4 mr-1" />
                {employee.phone}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Access Code:</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                  {visibleAccessCodes[employee.id] ? employee.accessCode : '••••••'}
                </code>
                <button
                  onClick={() => toggleAccessCode(employee.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {visibleAccessCodes[employee.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => deleteEmployee(employee.id)}
              className="p-2 text-red-600 hover:text-red-700"
              title="Delete employee"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {employees.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No employees registered yet
          </div>
        )}
      </div>
    </div>
  );
}