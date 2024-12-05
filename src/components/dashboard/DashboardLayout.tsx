import React from 'react';
import { LayoutDashboard, TrendingUp } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          </div>
          <p className="text-sm text-gray-500">
            Monitor your business performance and track key metrics
          </p>
        </div>

        <div className="p-6 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}