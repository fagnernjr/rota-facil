import { useDeliveryStore } from '../store/deliveryStore';
import { useEmployeeStore } from '../store/employeeStore';

export async function initializeDefaultData() {
  // Load existing data first
  const employeeStore = useEmployeeStore.getState();
  const deliveryStore = useDeliveryStore.getState();

  // Load all data from Firestore
  await Promise.all([
    employeeStore.loadEmployees(),
    deliveryStore.loadDeliveries(),
  ]);
}