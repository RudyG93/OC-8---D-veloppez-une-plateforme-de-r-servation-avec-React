"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { login as apiLogin, register as apiRegister } from "@/api/auth";
import type { AuthUser } from "@/types/user";
import type { LoginBody, RegisterBody } from "@/types/auth";

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    /** true tant que le contexte vérifie le cookie au montage */
    isLoading: boolean;
    login: (body: LoginBody) => Promise<void>;
    register: (body: RegisterBody) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* -------- Helpers cookie -------- */

function setTokenCookie(token: string) {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

function removeTokenCookie() {
    document.cookie = "token=; path=/; max-age=0";
}

function getToken(): string {
    if (typeof document === "undefined") return "";
    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "";
}

/** Décode le payload d'un JWT (sans vérification de signature) */
function decodeJwtPayload(token: string): AuthUser | null {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return {
            id: decoded.id ?? decoded.sub,
            name: decoded.name ?? "",
            email: decoded.email ?? "",
            picture: decoded.picture ?? null,
            role: decoded.role ?? "client",
        };
    } catch {
        return null;
    }
}

/* -------- Helpers localStorage pour persister l'user -------- */

const USER_STORAGE_KEY = "kasa_auth_user";

function saveUser(user: AuthUser) {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch { /* ignore */ }
}

function loadUser(): AuthUser | null {
    try {
        const raw = localStorage.getItem(USER_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
        return null;
    }
}

function clearUser() {
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch { /* ignore */ }
}

/* -------- Provider -------- */

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Au montage, restaurer la session depuis le cookie + localStorage
    useEffect(() => {
        const token = getToken();
        if (token) {
            // Essayer localStorage d'abord, sinon décoder le JWT
            const stored = loadUser();
            if (stored) {
                setUser(stored);
            } else {
                const decoded = decodeJwtPayload(token);
                if (decoded) {
                    setUser(decoded);
                    saveUser(decoded);
                }
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (body: LoginBody) => {
        const res = await apiLogin(body);
        setTokenCookie(res.token);
        saveUser(res.user);
        setUser(res.user);
    }, []);

    const register = useCallback(async (body: RegisterBody) => {
        const res = await apiRegister(body);
        setTokenCookie(res.token);
        saveUser(res.user);
        setUser(res.user);
    }, []);

    const logout = useCallback(() => {
        removeTokenCookie();
        clearUser();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return ctx;
}
