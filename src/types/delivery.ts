export type DeliveryStatus = 'pending' | 'completed' | 'cancelled' | 'no_response';
export type RouteStatus = 'waiting' | 'in_progress' | DeliveryStatus;
export type DeliveryService = 'logzz' | 'correios';

export interface ProductDetails {
  quantity: number;
  size: string;
  color: string;
}

export interface DeliveryPoint {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'pix' | 'cash' | 'card';
  paymentAmount: number;
  notes?: string;
  confirmed: boolean;
  status: DeliveryStatus;
  routeStatus: RouteStatus;
  updatedAt?: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: 'admin' | 'employee';
  };
  cancellationReason?: string;
  products: ProductDetails[];
  deliveryDate: string;
  deliveryService: DeliveryService;
  trackingCode?: string;
}

export interface RoutePoint extends DeliveryPoint {
  orderIndex: number;
  estimatedArrival: string;
  mapUrl: string;
  whatsappUrl: string;
}