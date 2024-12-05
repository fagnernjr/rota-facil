import React from 'react';
import { Package, CreditCard, BanknoteIcon, Wallet } from 'lucide-react';
import { RoutePoint } from '../types/delivery';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';

interface DeliveryCardProps {
  delivery: RoutePoint;
  showActions?: boolean;
}

const PaymentIcon = {
  pix: Wallet,
  cash: BanknoteIcon,
  card: CreditCard,
};

export function DeliveryCard({ delivery, showActions = true }: DeliveryCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:bg-gray-100 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium text-gray-900">
          {delivery.orderIndex}. {delivery.customerName}
        </span>
        <DeliveryStatusBadge status={delivery.routeStatus} />
      </div>

      <p className="text-gray-600 mb-4">{delivery.address}</p>

      <div className="bg-white p-3 rounded-md mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Package className="w-4 h-4 mr-1" />
          Products
        </h4>
        <div className="space-y-2">
          {delivery.products.map((product, index) => (
            <div key={index} className="text-sm text-gray-600">
              <span className="font-medium">Item {index + 1}:</span>{' '}
              {product.quantity}x {product.color} (Size: {product.size})
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          {PaymentIcon[delivery.paymentMethod] && (
            <>
              {React.createElement(PaymentIcon[delivery.paymentMethod], { className: 'w-4 h-4 mr-1' })}
              <span className="capitalize">{delivery.paymentMethod}</span>
            </>
          )}
        </div>
        <div className="text-sm font-medium text-green-600">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(delivery.paymentAmount)}
        </div>
      </div>

      {delivery.notes && (
        <div className="text-sm text-amber-600 mt-2">
          Note: {delivery.notes}
        </div>
      )}
    </div>
  );
}