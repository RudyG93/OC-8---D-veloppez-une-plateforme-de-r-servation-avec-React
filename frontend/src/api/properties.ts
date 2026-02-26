import { apiFetch, authHeaders } from '@/lib/api';
import type { Property, PropertyDetail, CreatePropertyBody, UpdatePropertyBody } from '@/types/property';

/**
 * Récupère toutes les propriétés
 */
export async function getProperties(): Promise<Property[]> {
    return apiFetch<Property[]>('/api/properties');
}

/**
 * Récupère une propriété par son ID (détail complet)
 */
export async function getPropertyById(id: string): Promise<PropertyDetail> {
    return apiFetch<PropertyDetail>(`/api/properties/${id}`);
}

/**
 * Crée une nouvelle propriété (requiert rôle owner/admin)
 */
export async function createProperty(body: CreatePropertyBody): Promise<PropertyDetail> {
    return apiFetch<PropertyDetail>('/api/properties', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * Met à jour une propriété (requiert rôle owner/admin)
 */
export async function updateProperty(id: string, body: UpdatePropertyBody): Promise<PropertyDetail> {
    return apiFetch<PropertyDetail>(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
}

/**
 * Supprime une propriété (requiert rôle owner/admin)
 */
export async function deleteProperty(id: string): Promise<void> {
    return apiFetch<void>(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
}
