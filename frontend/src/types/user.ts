export type UserRole = 'owner' | 'client' | 'admin';

/** Hôte affiché dans une propriété */
export interface Host {
    id: number;
    name: string;
    picture: string | null;
}

/** Utilisateur renvoyé par GET /api/users */
export interface User {
    id: number;
    name: string;
    picture?: string | null;
    role: UserRole;
}

/** Utilisateur renvoyé après login/register (inclut l'email) */
export interface AuthUser {
    id: number;
    name: string;
    email: string;
    picture?: string | null;
    role: UserRole;
}

export interface RegisterUserBody {
    name: string;
    picture?: string | null;
    role?: UserRole;
}

/** Corps de requête pour PATCH /api/users/:id */
export interface UpdateUserBody {
    name?: string;
    picture?: string | null;
    role?: UserRole;
}
