import React, { useState } from 'react';
import { X, Package, Phone, Calendar, Clock, User, MapPin, CreditCard, BanknoteIcon, Wallet, UserCircle, Edit, XCircle, Truck } from 'lucide-react';
import { RoutePoint } from '../types/delivery';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';
import { CancellationModal } from './CancellationModal';
import { EditDeliveryModal } from './EditDeliveryModal';
import { useDeliveryStore } from '../store/deliveryStore';
import { useCourierStore } from '../store/courierStore';

interface DeliveryDetailModalProps {
  delivery: RoutePoint;
  onClose: () => void;
}

const PaymentIcon = {
  pix: Wallet,
  cash: BanknoteIcon,
  card: CreditCard,
};

export function DeliveryDetailModal({ delivery, onClose }: DeliveryDetailModalProps) {
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState(delivery);
  const { updateDeliveryStatus } = useDeliveryStore();
  const { couriers } = useCourierStore();

  if (!currentDelivery) return null;

  const assignedCourier = couriers.find(courier => courier.id === currentDelivery.courierId);

  const handleCancellation = async (reason: string) => {
    await updateDeliveryStatus(currentDelivery.id, 'cancelled', reason);
    setShowCancellationModal(false);
    onClose();
  };

  const handleEditComplete = (updatedDelivery: RoutePoint) => {
    setCurrentDelivery(updatedDelivery);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{currentDelivery.orderIndex}
                </h3>
                <div className="mt-1 text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(currentDelivery.deliveryDate).toLocaleDateString()}
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  {currentDelivery.estimatedArrival}
                </div>
                {currentDelivery.createdBy && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <UserCircle className="w-4 h-4 mr-1" />
                    Added by {currentDelivery.createdBy.name} ({currentDelivery.createdBy.role}) on{' '}
                    {new Date(currentDelivery.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
              <DeliveryStatusBadge status={currentDelivery.routeStatus} />
            </div>

            {assignedCourier && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Assigned Courier
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{assignedCourier.name}</p>
                  <div className="mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Username: {assignedCourier.username}
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="w-4 h-4 mr-2" />
                      {assignedCourier.phone}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Customer Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900">{currentDelivery.customerName}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-2" />
                  {currentDelivery.phone}
                </div>
                <div className="mt-2 flex items-start text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                  {currentDelivery.address}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Order Details
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                {currentDelivery.products.map((product, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <div className="font-medium text-gray-900">Item {index + 1}</div>
                    <div className="mt-1 grid grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>Quantity: {product.quantity}</div>
                      <div>Size: {product.size}</div>
                      <div>Color: {product.color}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Information</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    {PaymentIcon[currentDelivery.paymentMethod] && (
                      <>
                        {React.createElement(PaymentIcon[currentDelivery.paymentMethod], { className: 'w-4 h-4 mr-2' })}
                        <span className="capitalize">{currentDelivery.paymentMethod}</span>
                      </>
                    )}
                  </div>
                  <div className="font-medium text-green-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(currentDelivery.paymentAmount)}
                  </div>
                </div>
                {currentDelivery.notes && (
                  <div className="mt-2 text-sm text-amber-600">
                    Note: {currentDelivery.notes}
                  </div>
                )}
                {currentDelivery.cancellationReason && (
                  <div className="mt-2 text-sm text-red-600">
                    Cancellation reason: {currentDelivery.cancellationReason}
                  </div>
                )}
              </div>
            </div>

            {currentDelivery.status === 'pending' && (
              <div className="border-t border-gray-200 pt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowCancellationModal(true)}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Order
                </button>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCancellationModal && (
        <CancellationModal
          onConfirm={handleCancellation}
          onClose={() => setShowCancellationModal(false)}
        />
      )}

      {showEditModal && (
        <EditDeliveryModal
          delivery={currentDelivery}
          onClose={() => setShowEditModal(false)}
          onEditComplete={handleEditComplete}
        />
      )}
    </>
  );
}