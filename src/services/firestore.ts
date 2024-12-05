import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Courier } from '../types/courier';
import type { Employee } from '../types/employee';
import type { DeliveryPoint } from '../types/delivery';

// Collections
const COURIERS = 'couriers';
const EMPLOYEES = 'employees';
const DELIVERIES = 'deliveries';

// Courier operations
export async function addCourierToFirestore(courier: Courier) {
  try {
    const docRef = await addDoc(collection(db, COURIERS), courier);
    return { ...courier, id: docRef.id };
  } catch (error) {
    console.error('Error adding courier to Firestore:', error);
    throw error;
  }
}

export async function updateCourierInFirestore(id: string, courier: Partial<Courier>) {
  try {
    await updateDoc(doc(db, COURIERS, id), courier);
  } catch (error) {
    console.error('Error updating courier in Firestore:', error);
    throw error;
  }
}

export async function deleteCourierFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, COURIERS, id));
  } catch (error) {
    console.error('Error deleting courier from Firestore:', error);
    throw error;
  }
}

export async function getCouriersFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, COURIERS));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Courier));
  } catch (error) {
    console.error('Error getting couriers from Firestore:', error);
    throw error;
  }
}

// Employee operations
export async function addEmployeeToFirestore(employee: Employee) {
  try {
    const docRef = await addDoc(collection(db, EMPLOYEES), employee);
    return { ...employee, id: docRef.id };
  } catch (error) {
    console.error('Error adding employee to Firestore:', error);
    throw error;
  }
}

export async function updateEmployeeInFirestore(id: string, employee: Partial<Employee>) {
  try {
    await updateDoc(doc(db, EMPLOYEES, id), employee);
  } catch (error) {
    console.error('Error updating employee in Firestore:', error);
    throw error;
  }
}

export async function deleteEmployeeFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, EMPLOYEES, id));
  } catch (error) {
    console.error('Error deleting employee from Firestore:', error);
    throw error;
  }
}

export async function getEmployeesFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, EMPLOYEES));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
  } catch (error) {
    console.error('Error getting employees from Firestore:', error);
    throw error;
  }
}

// Delivery operations
export async function addDeliveryToFirestore(delivery: DeliveryPoint) {
  try {
    const deliveryData = {
      ...delivery,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, DELIVERIES), deliveryData);
    return { ...deliveryData, id: docRef.id };
  } catch (error) {
    console.error('Error adding delivery to Firestore:', error);
    throw error;
  }
}

export async function updateDeliveryInFirestore(id: string, updates: Partial<DeliveryPoint>) {
  try {
    const docRef = doc(db, DELIVERIES, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating delivery in Firestore:', error);
    throw error;
  }
}

export async function deleteDeliveryFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, DELIVERIES, id));
  } catch (error) {
    console.error('Error deleting delivery from Firestore:', error);
    throw error;
  }
}

export async function getDeliveriesFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, DELIVERIES));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as DeliveryPoint[];
  } catch (error) {
    console.error('Error getting deliveries from Firestore:', error);
    throw error;
  }
}

export async function getDeliveriesByStatusFromFirestore(status: string) {
  try {
    const q = query(collection(db, DELIVERIES), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as DeliveryPoint[];
  } catch (error) {
    console.error('Error getting deliveries by status from Firestore:', error);
    throw error;
  }
}