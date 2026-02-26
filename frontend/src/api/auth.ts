import { apiFetch } from '@/lib/api';
import type { LoginBody, RegisterBody, AuthResponse, RequestResetBody, ResetPasswordBody } from '@/types/auth';

/**
 * Connexion avec email et mot de passe
 */
export async function login(body: LoginBody): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

/**
 * Inscription d'un nouvel utilisateur
 */
export async function register(body: RegisterBody): Promise<AuthResponse> {
    return apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

/**
 * Demande de réinitialisation de mot de passe
 */
export async function requestReset(body: RequestResetBody): Promise<{ ok: boolean; message: string }> {
    return apiFetch('/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

/**
 * Réinitialisation du mot de passe avec un token
 */
export async function resetPassword(body: ResetPasswordBody): Promise<{ ok: boolean }> {
    return apiFetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}
