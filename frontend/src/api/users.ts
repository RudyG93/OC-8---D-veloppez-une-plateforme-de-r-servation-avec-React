import { apiFetch, authHeaders } from '@/lib/api';
import type { User, UpdateUserBody } from '@/types/user';

/**
 * Récupère tous les utilisateurs (requiert rôle admin)
 */
export async function getUsers(): Promise<User[]> {
    return apiFetch<User[]>('/api/users', {
        headers: authHeaders(),
    });
}

/**
 * Récupère un utilisateur par son ID (self ou admin)
 */
export async function getUserById(id: number): Promise<User> {
    return apiFetch<User>(`/api/users/${id}`, {
        headers: authHeaders(),
    });
}

/**
 * Met à jour un utilisateur (self ou admin)
 */
export async function updateUser(id: number, body: UpdateUserBody): Promise<User> {
    return apiFetch<User>(`/api/users/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(body),
    });
}
