import { apiFetch } from '@/lib/api';
import type { Rating, CreateRatingBody, CreateRatingSummary } from '@/types/rating';

/**
 * Récupère les notes d'une propriété
 */
export async function getRatings(propertyId: string): Promise<Rating[]> {
    return apiFetch<Rating[]>(`/api/properties/${propertyId}/ratings`);
}

/**
 * Ajoute une note à une propriété
 */
export async function addRating(propertyId: string, body: CreateRatingBody): Promise<CreateRatingSummary> {
    return apiFetch<CreateRatingSummary>(`/api/properties/${propertyId}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}
