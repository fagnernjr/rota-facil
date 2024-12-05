import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { RoutePoint } from '../../types/delivery';
import { DeliveryStatusBadge } from '../DeliveryStatusBadge';
import { format } from 'date-fns';
import { Package, MapPin } from 'lucide-react';

interface SchedulingTableProps {
  deliveries: RoutePoint[];
}

export function SchedulingTable({ deliveries }: SchedulingTableProps) {
  const columnHelper = createColumnHelper<RoutePoint>();

  const columns = [
    columnHelper.accessor('deliveryDate', {
      header: 'Date',
      cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
    }),
    columnHelper.accessor('customerName', {
      header: 'Customer',
      cell: (info) => (
        <div>
          <div className="font-medium text-gray-900">{info.getValue()}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {info.row.original.address}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('products', {
      header: 'Products',
      cell: (info) => (
        <div className="space-y-1">
          {info.getValue().map((product, index) => (
            <div key={index} className="flex items-center text-sm">
              <Package className="w-4 h-4 mr-1 text-gray-400" />
              <span>
                {product.quantity}x {product.color} ({product.size})
              </span>
            </div>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('deliveryService', {
      header: 'Service',
      cell: (info) => (
        <span className="capitalize">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('trackingCode', {
      header: 'Tracking',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <DeliveryStatusBadge status={info.row.original.routeStatus} />
      ),
    }),
  ];

  const table = useReactTable({
    data: deliveries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {deliveries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No deliveries found
        </div>
      )}
    </div>
  );
}