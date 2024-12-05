import React, { useState, useEffect } from 'react';
import { useReportStore } from '../../store/reportStore';
import { useDeliveryStore } from '../../store/deliveryStore';
import { DateFilter } from './DateFilter';
import { DollarSign, TrendingUp, Users, Package, Target, Percent } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function FinancialDashboard() {
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const { reports, loadReports } = useReportStore();
  const { deliveries, loadDeliveries } = useDeliveryStore();

  useEffect(() => {
    loadReports();
    loadDeliveries();
  }, [loadReports, loadDeliveries]);

  // Filter data based on date range
  const filteredReports = reports?.filter(report => {
    const reportDate = new Date(report.date);
    return reportDate >= dateRange.start && reportDate <= dateRange.end;
  }) || [];

  const completedDeliveries = deliveries.filter(delivery => {
    const deliveryDate = new Date(delivery.deliveryDate);
    return (
      deliveryDate >= dateRange.start &&
      deliveryDate <= dateRange.end &&
      delivery.status === 'completed'
    );
  });

  // Calculate actual metrics
  const actualRevenue = completedDeliveries.reduce((sum, delivery) => sum + delivery.paymentAmount, 0);
  const totalAdSpend = filteredReports.reduce((sum, report) => sum + report.adSpend, 0);
  const totalLeads = filteredReports.reduce((sum, report) => sum + report.leads, 0);
  const scheduledDeliveries = filteredReports.reduce((sum, report) => sum + report.scheduledDeliveries, 0);

  const metrics = {
    actualRevenue,
    totalAdSpend,
    roas: totalAdSpend > 0 ? actualRevenue / totalAdSpend : 0,
    costPerLead: totalLeads > 0 ? totalAdSpend / totalLeads : 0,
    leadToScheduleRate: totalLeads > 0 ? (scheduledDeliveries / totalLeads) * 100 : 0,
    scheduleToSaleRate: scheduledDeliveries > 0 ? (completedDeliveries.length / scheduledDeliveries) * 100 : 0,
  };

  // Prepare chart data
  const chartData = filteredReports.map(report => {
    const completedOnDate = completedDeliveries.filter(
      d => format(new Date(d.deliveryDate), 'yyyy-MM-dd') === report.date
    );
    const actualRevenueOnDate = completedOnDate.reduce((sum, d) => sum + d.paymentAmount, 0);

    return {
      date: format(new Date(report.date), 'MMM dd'),
      scheduledRevenue: report.revenue,
      actualRevenue: actualRevenueOnDate,
      adSpend: report.adSpend,
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: 'Actual Revenue',
      value: formatCurrency(metrics.actualRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ad Spend',
      value: formatCurrency(metrics.totalAdSpend),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'ROAS',
      value: `${metrics.roas.toFixed(2)}x`,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Cost per Lead',
      value: formatCurrency(metrics.costPerLead),
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Lead to Schedule',
      value: `${metrics.leadToScheduleRate.toFixed(1)}%`,
      icon: Package,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Schedule to Sale',
      value: `${metrics.scheduleToSaleRate.toFixed(1)}%`,
      icon: Percent,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Financial Overview</h2>
        <DateFilter onDateChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.title} className={`${card.bgColor} rounded-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${card.color} text-sm font-medium`}>{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} bg-white rounded-full p-3 shadow-sm`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue vs Reality</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.375rem'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="scheduledRevenue"
                name="Expected Revenue"
                stroke="#818CF8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="actualRevenue"
                name="Actual Revenue"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="adSpend"
                name="Ad Spend"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}