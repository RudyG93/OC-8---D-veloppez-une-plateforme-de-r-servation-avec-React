import type { AuthUser, UserRole } from './user';

export interface LoginBody {
    email: string;
    password: string;
}

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    picture?: string;
    role?: UserRole;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface RequestResetBody {
    email: string;
}

export interface ResetPasswordBody {
    token: string;
    password: string;
}
