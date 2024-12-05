import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  colorClass: string;
  isCurrency?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, colorClass, isCurrency = false }: StatCardProps) {
  const formattedValue = isCurrency
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    : value.toLocaleString();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{formattedValue}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="mt-4">
          <span className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}