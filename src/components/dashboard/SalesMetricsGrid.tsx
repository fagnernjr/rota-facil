import React from 'react';
import { DollarSign, Users, Package, TrendingUp, Target, Percent, Calendar, CheckCircle } from 'lucide-react';

interface SalesMetricsGridProps {
  metrics: {
    totalRevenue: number;
    totalLeads: number;
    totalDeliveries: number;
    totalAdSpend: number;
    roas: number;
    conversionRate: number;
  };
}

export function SalesMetricsGrid({ metrics }: SalesMetricsGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Leads',
      value: metrics.totalLeads.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Scheduled Deliveries',
      subtitle: 'Pending confirmation',
      value: metrics.totalDeliveries.toLocaleString(),
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Ad Spend',
      value: formatCurrency(metrics.totalAdSpend),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'ROAS',
      value: `${metrics.roas.toFixed(2)}x`,
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Lead to Schedule',
      subtitle: 'Conversion rate',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      icon: Percent,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.title} className={`${card.bgColor} rounded-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${card.color} text-sm font-medium`}>{card.title}</p>
              {card.subtitle && (
                <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>
              )}
              <p className="mt-2 text-3xl font-semibold text-gray-900">{card.value}</p>
            </div>
            <div className={`${card.color} bg-white rounded-full p-3 shadow-sm`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}