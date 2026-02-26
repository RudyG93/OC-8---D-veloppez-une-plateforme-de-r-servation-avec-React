export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

/**
 * Récupère le token JWT depuis les cookies (côté client uniquement)
 */
function getToken(): string {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : '';
}

/**
 * Génère les headers avec authentification si un token est disponible
 */
export function authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Wrapper fetch qui gère les erreurs API automatiquement
 */
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Erreur API: ${response.status} ${response.statusText}`);
    }

    // 204 No Content
    if (response.status === 204) return undefined as T;

    return response.json();
}
