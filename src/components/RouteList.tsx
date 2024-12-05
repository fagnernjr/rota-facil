import React from 'react';
import { Navigation, Phone, CreditCard, BanknoteIcon, Wallet } from 'lucide-react';
import { RoutePoint } from '../types/delivery';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';

interface RouteListProps {
  routes: RoutePoint[];
}

const PaymentIcon = {
  pix: Wallet,
  cash: BanknoteIcon,
  card: CreditCard,
};

export function RouteList({ routes }: RouteListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Optimized Route</h2>
      
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-900">
                {route.orderIndex}. {route.customerName}
              </span>
              <DeliveryStatusBadge status={route.routeStatus} />
            </div>
            
            <p className="text-gray-600 mb-2">{route.address}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {PaymentIcon[route.paymentMethod] && (
                <div className="flex items-center">
                  {React.createElement(PaymentIcon[route.paymentMethod], { className: 'w-4 h-4 mr-1' })}
                  <span className="capitalize">{route.paymentMethod}</span>
                </div>
              )}
              
              {route.notes && (
                <div className="text-amber-600">
                  Note: {route.notes}
                </div>
              )}
            </div>
            
            <div className="mt-4 flex space-x-2">
              <a
                href={route.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </a>
              
              <a
                href={route.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}