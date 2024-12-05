import React, { useState } from 'react';
import { EmployeeList } from './EmployeeList';
import { StatisticsDashboard } from './dashboard/StatisticsDashboard';
import { SchedulingManagement } from './scheduling/SchedulingManagement';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { ReportManagement } from './reports/ReportManagement';
import { LayoutDashboard, Calendar, Users, UserPlus, FileText } from 'lucide-react';
import { EmployeeRegistrationModal } from './EmployeeRegistrationModal';

export function AdminDashboard() {
  const [activeMainTab, setActiveMainTab] = useState<'dashboard' | 'reports' | 'scheduling' | 'employees'>('dashboard');
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveMainTab('dashboard')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeMainTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <LayoutDashboard className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveMainTab('reports')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeMainTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Daily Reports
          </button>
          <button
            onClick={() => setActiveMainTab('scheduling')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeMainTab === 'scheduling'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Scheduling
          </button>
          <button
            onClick={() => setActiveMainTab('employees')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeMainTab === 'employees'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Employees
          </button>
        </nav>
      </div>

      {activeMainTab === 'dashboard' && (
        <DashboardLayout
          activeTab="sales"
          onTabChange={() => {}}
        >
          <StatisticsDashboard />
        </DashboardLayout>
      )}
      {activeMainTab === 'reports' && <ReportManagement />}
      {activeMainTab === 'scheduling' && <SchedulingManagement />}
      {activeMainTab === 'employees' && (
        <div>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setIsEmployeeModalOpen(true)}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
          </div>
          <EmployeeList />
        </div>
      )}

      {isEmployeeModalOpen && (
        <EmployeeRegistrationModal onClose={() => setIsEmployeeModalOpen(false)} />
      )}
    </div>
  );
}