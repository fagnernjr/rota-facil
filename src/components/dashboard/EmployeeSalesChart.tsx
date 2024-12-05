import React, { useMemo } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RoutePoint } from '../../types/delivery';
import { useEmployeeStore } from '../../store/employeeStore';

interface EmployeeSalesChartProps {
  deliveries: RoutePoint[];
  dateRange: { start: Date; end: Date };
}

export function EmployeeSalesChart({ deliveries, dateRange }: EmployeeSalesChartProps) {
  const { employees } = useEmployeeStore();

  const data = useMemo(() => {
    const salesByEmployee = new Map<string, { total: number; count: number }>();

    deliveries
      .filter(
        delivery =>
          new Date(delivery.createdAt) >= dateRange.start &&
          new Date(delivery.createdAt) <= dateRange.end &&
          delivery.status === 'completed'
      )
      .forEach(delivery => {
        const employeeId = delivery.createdBy.id;
        const current = salesByEmployee.get(employeeId) || { total: 0, count: 0 };
        salesByEmployee.set(employeeId, {
          total: current.total + delivery.paymentAmount,
          count: current.count + 1,
        });
      });

    return Array.from(salesByEmployee.entries())
      .map(([employeeId, stats]) => {
        const employee = employees.find(emp => emp.id === employeeId);
        return {
          name: employee?.name || 'Unknown',
          total: stats.total,
          count: stats.count,
          average: stats.total / stats.count,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [deliveries, dateRange, employees]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Sales Performance</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'Total Sales') return formatCurrency(value);
                if (name === 'Number of Sales') return value;
                if (name === 'Average Sale') return formatCurrency(value);
                return value;
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="total" name="Total Sales" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="count" name="Number of Sales" fill="#82ca9d" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Performance</h4>
        <div className="space-y-4">
          {data.map((employee) => (
            <div key={employee.name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{employee.name}</span>
                <span className="text-sm text-gray-500">
                  {employee.count} sales
                </span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-600">
                  Total: {formatCurrency(employee.total)}
                </span>
                <span className="text-gray-600">
                  Average: {formatCurrency(employee.average)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}