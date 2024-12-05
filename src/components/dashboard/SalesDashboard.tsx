import React, { useState, useEffect } from 'react';
import { SalesMetricsGrid } from './SalesMetricsGrid';
import { SalesChart } from './SalesChart';
import { SalesTable } from './SalesTable';
import { DateFilter } from './DateFilter';
import { useReportStore } from '../../store/reportStore';
import { useDeliveryStore } from '../../store/deliveryStore';
import { startOfToday } from 'date-fns';

export function SalesDashboard() {
  const [dateRange, setDateRange] = useState({
    start: startOfToday(),
    end: startOfToday(),
  });
  
  const { reports, loadReports } = useReportStore();
  const { deliveries } = useDeliveryStore();

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const filteredReports = reports?.filter(report => {
    const reportDate = new Date(report.date);
    return reportDate >= dateRange.start && reportDate <= dateRange.end;
  });

  const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;

  const metrics = {
    totalRevenue: filteredReports?.reduce((sum, report) => sum + report.revenue, 0) || 0,
    totalLeads: filteredReports?.reduce((sum, report) => sum + report.leads, 0) || 0,
    totalDeliveries: filteredReports?.reduce((sum, report) => sum + report.scheduledDeliveries, 0) || 0,
    totalAdSpend: filteredReports?.reduce((sum, report) => sum + report.adSpend, 0) || 0,
    roas: (filteredReports?.reduce((sum, report) => sum + report.revenue, 0) || 0) / 
          (filteredReports?.reduce((sum, report) => sum + report.adSpend, 0) || 1),
    conversionRate: ((filteredReports?.reduce((sum, report) => sum + report.scheduledDeliveries, 0) || 0) / 
                    (filteredReports?.reduce((sum, report) => sum + report.leads, 0) || 1)) * 100,
    completedDeliveries,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Sales Analytics</h2>
        <DateFilter onDateChange={setDateRange} />
      </div>

      <SalesMetricsGrid metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={filteredReports || []} />
        <SalesTable data={filteredReports || []} />
      </div>
    </div>
  );
}