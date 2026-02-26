import { apiFetch, authHeaders } from '@/lib/api';
import type { Property } from '@/types/property';

/**
 * Récupère les favoris d'un utilisateur (self ou admin)
 */
export async function getFavorites(userId: number): Promise<Property[]> {
    return apiFetch<Property[]>(`/api/users/${userId}/favorites`, {
        headers: authHeaders(),
    });
}

/**
 * Ajoute une propriété aux favoris (utilisateur connecté)
 */
export async function addFavorite(propertyId: string): Promise<{ ok: boolean }> {
    return apiFetch(`/api/properties/${propertyId}/favorite`, {
        method: 'POST',
        headers: authHeaders(),
    });
}

/**
 * Retire une propriété des favoris (utilisateur connecté)
 */
export async function removeFavorite(propertyId: string): Promise<{ ok: boolean }> {
    return apiFetch(`/api/properties/${propertyId}/favorite`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
}
