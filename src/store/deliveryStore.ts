import { create } from 'zustand';
import { DeliveryPoint, DeliveryStatus, RoutePoint } from '../types/delivery';
import { optimizeRoute } from '../utils/routeOptimizer';
import { useAuthStore } from './authStore';
import { useEmployeeStore } from './employeeStore';
import {
  addDeliveryToFirestore,
  updateDeliveryInFirestore,
  deleteDeliveryFromFirestore,
  getDeliveriesFromFirestore
} from '../services/firestore';

interface DeliveryStore {
  deliveries: RoutePoint[];
  addDelivery: (delivery: Omit<DeliveryPoint, 'id' | 'status' | 'routeStatus' | 'createdAt' | 'createdBy'>) => Promise<void>;
  updateDeliveryStatus: (id: string, status: DeliveryStatus, reason?: string) => Promise<void>;
  updateRouteStatus: (id: string, status: RouteStatus) => Promise<void>;
  updateDelivery: (id: string, updates: Partial<DeliveryPoint>) => Promise<void>;
  getDeliveriesByStatus: (status: DeliveryStatus | 'pending') => RoutePoint[];
  getStatusCounts: () => {
    pending: number;
    completed: number;
    cancelled: number;
    no_response: number;
  };
  loadDeliveries: () => Promise<void>;
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  deliveries: [],
  
  addDelivery: async (delivery) => {
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User must be logged in to add delivery');

      let creatorName = '';
      if (user.role === 'admin' || user.role === 'employee') {
        const employee = useEmployeeStore.getState().getEmployeeByAccessCode(user.accessCode);
        if (employee) creatorName = employee.name;
      }

      // Ensure all required fields are present and properly formatted
      const newDelivery: DeliveryPoint = {
        ...delivery,
        id: crypto.randomUUID(),
        status: 'pending',
        routeStatus: 'waiting',
        createdAt: new Date().toISOString(),
        createdBy: {
          id: user.id,
          name: creatorName || 'Unknown',
          role: user.role,
        },
        confirmed: false,
        products: delivery.products.map(product => ({
          quantity: Number(product.quantity),
          size: String(product.size),
          color: String(product.color),
        })),
        paymentAmount: Number(delivery.paymentAmount),
        deliveryDate: String(delivery.deliveryDate),
        deliveryService: delivery.deliveryService,
        trackingCode: delivery.trackingCode || '',
        notes: delivery.notes || '',
      };
      
      const savedDelivery = await addDeliveryToFirestore(newDelivery);
      
      const currentDeliveries = get().deliveries;
      const updatedDeliveries = await optimizeRoute([...currentDeliveries, savedDelivery]);
      set({ deliveries: updatedDeliveries });
    } catch (error) {
      console.error('Error adding delivery:', error);
      throw error;
    }
  },

  updateDeliveryStatus: async (id, status, reason) => {
    const updates = {
      status,
      routeStatus: status,
      updatedAt: new Date().toISOString(),
      ...(reason && { cancellationReason: reason }),
    };
    
    await updateDeliveryInFirestore(id, updates);
    
    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, ...updates } : delivery
      ),
    }));
  },

  updateRouteStatus: async (id, status) => {
    const updates = {
      routeStatus: status,
      updatedAt: new Date().toISOString(),
    };
    
    await updateDeliveryInFirestore(id, updates);
    
    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, ...updates } : delivery
      ),
    }));
  },

  updateDelivery: async (id, updates) => {
    const updatedDelivery = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await updateDeliveryInFirestore(id, updatedDelivery);

    set((state) => ({
      deliveries: state.deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, ...updatedDelivery } : delivery
      ),
    }));
  },
  
  getDeliveriesByStatus: (status) => {
    return get().deliveries.filter((delivery) => {
      const statusMatch = status === 'pending' ? delivery.status === 'pending' : delivery.status === status;
      return statusMatch;
    });
  },

  getStatusCounts: () => {
    const deliveries = get().deliveries;
    
    return {
      pending: deliveries.filter(d => d.status === 'pending').length,
      completed: deliveries.filter(d => d.status === 'completed').length,
      cancelled: deliveries.filter(d => d.status === 'cancelled').length,
      no_response: deliveries.filter(d => d.status === 'no_response').length,
    };
  },

  loadDeliveries: async () => {
    const deliveries = await getDeliveriesFromFirestore();
    const optimizedDeliveries = await optimizeRoute(deliveries);
    set({ deliveries: optimizedDeliveries });
  },
}));