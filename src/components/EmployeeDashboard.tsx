import React, { useState } from 'react';
import { StatisticsDashboard } from './dashboard/StatisticsDashboard';
import { SchedulingManagement } from './scheduling/SchedulingManagement';
import { ReportManagement } from './reports/ReportManagement';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { LayoutDashboard, Calendar, FileText } from 'lucide-react';

export function EmployeeDashboard() {
  const [activeMainTab, setActiveMainTab] = useState<'dashboard' | 'reports' | 'scheduling'>('dashboard');

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
    </div>
  );
}