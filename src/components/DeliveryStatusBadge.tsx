import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import type { RouteStatus } from '../types/delivery';

interface DeliveryStatusBadgeProps {
  status: RouteStatus;
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  const getStatusConfig = (status: RouteStatus) => {
    switch (status) {
      case 'waiting':
        return {
          icon: Clock,
          text: 'Waiting',
          className: 'bg-gray-100 text-gray-700',
        };
      case 'in_progress':
        return {
          icon: Loader2,
          text: 'In Progress',
          className: 'bg-blue-100 text-blue-700',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Completed',
          className: 'bg-green-100 text-green-700',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          text: 'Cancelled',
          className: 'bg-red-100 text-red-700',
        };
      case 'no_response':
        return {
          icon: AlertCircle,
          text: 'No Response',
          className: 'bg-yellow-100 text-yellow-700',
        };
      default:
        return {
          icon: Clock,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-700',
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {text}
    </span>
  );
}