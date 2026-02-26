import { API_BASE_URL } from '@/lib/api';
import type { Property, PropertyDetail } from '@/types/property';

/**
 * Récupère toutes les propriétés
 */
export async function getProperties(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/api/properties`);

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Récupère une propriété par son ID
 */
export async function getPropertyById(id: string): Promise<PropertyDetail> {
    const response = await fetch(`${API_BASE_URL}/api/properties/${id}`);

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
