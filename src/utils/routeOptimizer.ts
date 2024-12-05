import { DeliveryPoint, RoutePoint } from '../types/delivery';

const RIACHO_FUNDO_COORDS = '-15.8801,-48.0189';

export async function optimizeRoute(deliveries: DeliveryPoint[]): Promise<RoutePoint[]> {
  // Note: In a real implementation, this would use the Google Maps Distance Matrix API
  // to calculate actual distances and optimal routes
  
  return deliveries.map((delivery, index) => ({
    ...delivery,
    orderIndex: index + 1,
    estimatedArrival: getEstimatedArrival(index),
    mapUrl: `https://www.google.com/maps/dir/${RIACHO_FUNDO_COORDS}/${encodeURIComponent(delivery.address)}`,
    whatsappUrl: `https://wa.me/${delivery.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Olá ${delivery.customerName}, sua entrega está a caminho!`
    )}`
  }));
}

function getEstimatedArrival(index: number): string {
  const baseTime = new Date();
  baseTime.setMinutes(baseTime.getMinutes() + (index + 1) * 15);
  return baseTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}