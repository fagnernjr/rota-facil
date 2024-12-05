import { DeliveryPoint } from '../types/delivery';

const API_URL = 'http://localhost:3000/api/sheets';

export async function initializeSheets() {
  try {
    const response = await fetch(`${API_URL}/init`, {
      method: 'POST',
    });
    return response.json();
  } catch (error) {
    console.error('Error initializing sheets:', error);
    throw error;
  }
}

export async function addDeliveryToSheets(delivery: DeliveryPoint) {
  try {
    const response = await fetch(`${API_URL}/delivery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(delivery),
    });
    return response.json();
  } catch (error) {
    console.error('Error adding delivery to sheets:', error);
    throw error;
  }
}

export async function updateDeliveryInSheets(id: string, updates: Partial<DeliveryPoint>) {
  try {
    const response = await fetch(`${API_URL}/delivery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  } catch (error) {
    console.error('Error updating delivery in sheets:', error);
    throw error;
  }
}