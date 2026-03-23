"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Hook de garde d'authentification.
 * Redirige vers /login si l'utilisateur n'est pas connecté.
 * Ajoute un paramètre ?redirect= pour revenir automatiquement après connexion.
 * @returns { user, isLoading } — l'utilisateur courant et un flag de chargement
 */
export function useRequireAuth() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            const currentUrl = searchParams.toString()
                ? `${pathname}?${searchParams.toString()}`
                : pathname;
            router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }, [isLoading, isAuthenticated, router, pathname, searchParams]);

    return { user, isLoading: isLoading || !isAuthenticated };
}
