import React, { useState } from 'react';
import { SchedulingDashboard } from '../scheduling/SchedulingDashboard';
import { SalesAnalytics } from './SalesAnalytics';
import { FinancialDashboard } from './FinancialDashboard';
import { LayoutDashboard, TrendingUp, DollarSign } from 'lucide-react';

type DashboardTab = 'scheduling' | 'sales' | 'financial';

export function StatisticsDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('financial');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('financial')}
          className={`
            relative py-4 px-1 -mb-px
            ${activeTab === 'financial'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Financial Health</span>
          </div>
          {activeTab === 'financial' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('scheduling')}
          className={`
            relative py-4 px-1 -mb-px
            ${activeTab === 'scheduling'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Scheduling Overview</span>
          </div>
          {activeTab === 'scheduling' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`
            relative py-4 px-1 -mb-px
            ${activeTab === 'sales'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Sales Analytics</span>
          </div>
          {activeTab === 'sales' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'financial' && <FinancialDashboard />}
        {activeTab === 'scheduling' && <SchedulingDashboard />}
        {activeTab === 'sales' && <SalesAnalytics />}
      </div>
    </div>
  );
}