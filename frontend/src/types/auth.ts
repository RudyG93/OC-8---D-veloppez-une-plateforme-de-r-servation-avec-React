import type { AuthUser, UserRole } from './user';

/** Corps de la requête de connexion. */
export interface LoginBody {
    email: string;
    password: string;
}

/** Corps de la requête d'inscription d'un nouvel utilisateur. */
export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    picture?: string;
    role?: UserRole;
}

/** Réponse retournée après authentification (login ou register). */
export interface AuthResponse {
    token: string;
    user: AuthUser;
}

/** Corps de la requête de demande de réinitialisation de mot de passe. */
export interface RequestResetBody {
    email: string;
}

/** Corps de la requête de réinitialisation de mot de passe. */
export interface ResetPasswordBody {
    token: string;
    password: string;
}
