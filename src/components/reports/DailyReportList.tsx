import React, { useState } from 'react';
import { useReportStore } from '../../store/reportStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, DollarSign, Users, Package, TrendingUp, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { DailyReport } from '../../types/report';

interface DailyReportListProps {
  selectedDate: string;
}

export function DailyReportList({ selectedDate }: DailyReportListProps) {
  const user = useAuthStore((state) => state.user);
  const reports = useReportStore((state) => {
    const dateReports = state.getReportsByDate(selectedDate);
    // If user is an employee, only show their reports
    if (user?.role === 'employee') {
      return dateReports.filter(report => report.employeeId === user.id);
    }
    return dateReports;
  });
  const { deleteReport } = useReportStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateMetrics = (report: DailyReport) => {
    const roas = report.revenue / report.adSpend;
    const costPerLead = report.adSpend / report.leads;
    const conversionRate = (report.scheduledDeliveries / report.leads) * 100;

    return {
      roas,
      costPerLead,
      conversionRate
    };
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => {
        const metrics = calculateMetrics(report);

        return (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.employeeName}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(report.date), 'PPP')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteReport(report.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <DollarSign className="w-5 h-5 mr-1" />
                  <span className="font-medium">Ad Spend</span>
                </div>
                <p className="text-2xl font-semibold text-blue-700">
                  {formatCurrency(report.adSpend)}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center text-green-600 mb-2">
                  <Users className="w-5 h-5 mr-1" />
                  <span className="font-medium">Leads</span>
                </div>
                <p className="text-2xl font-semibold text-green-700">
                  {report.leads}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center text-purple-600 mb-2">
                  <Package className="w-5 h-5 mr-1" />
                  <span className="font-medium">Deliveries</span>
                </div>
                <p className="text-2xl font-semibold text-purple-700">
                  {report.scheduledDeliveries}
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center text-amber-600 mb-2">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  <span className="font-medium">Revenue</span>
                </div>
                <p className="text-2xl font-semibold text-amber-700">
                  {formatCurrency(report.revenue)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">ROAS</p>
                <p className="font-semibold text-gray-900">{metrics.roas.toFixed(2)}x</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">Cost per Lead</p>
                <p className="font-semibold text-gray-900">{formatCurrency(metrics.costPerLead)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">Conversion Rate</p>
                <p className="font-semibold text-gray-900">{metrics.conversionRate.toFixed(1)}%</p>
              </div>
            </div>

            {report.notes && (
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium text-gray-700">Notes:</p>
                <p className="mt-1">{report.notes}</p>
              </div>
            )}
          </div>
        );
      })}

      {reports.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No reports found for this date</p>
        </div>
      )}
    </div>
  );
}