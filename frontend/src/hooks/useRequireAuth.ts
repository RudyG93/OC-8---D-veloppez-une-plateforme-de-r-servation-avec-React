"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Redirige vers /login si l'utilisateur n'est pas connecté.
 * Ajoute un paramètre ?redirect= pour revenir après connexion.
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
