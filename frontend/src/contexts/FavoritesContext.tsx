"use client";

import {
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "@/api/favorites";

interface FavoritesContextValue {
    /** IDs des propriétés en favoris */
    favorites: string[];
    /** Vérifie si une propriété est en favoris */
    isFavorite: (propertyId: string) => boolean;
    /** Ajoute ou retire un favori (ne fait rien si non connecté) */
    toggleFavorite: (propertyId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/* -------- Provider -------- */

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);

    // Charge les favoris depuis l'API quand l'utilisateur change
    useEffect(() => {
        if (!isAuthenticated || !user) return;

        let cancelled = false;

        getFavorites(user.id)
            .then((props) => {
                if (!cancelled) {
                    setFavorites(props.map((p) => p.id));
                }
            })
            .catch(() => {
                if (!cancelled) setFavorites([]);
            });

        return () => {
            cancelled = true;
        };
    }, [user, isAuthenticated]);

    // Réinitialise les favoris quand l'utilisateur se déconnecte
    const prevAuthenticated = favorites.length > 0 && !isAuthenticated;
    if (prevAuthenticated) {
        setFavorites([]);
    }

    const isFavorite = useCallback(
        (propertyId: string) => favorites.includes(propertyId),
        [favorites],
    );

    const toggleFavorite = useCallback(
        (propertyId: string) => {
            if (!isAuthenticated) return;

            const isCurrentlyFavorite = favorites.includes(propertyId);

            if (isCurrentlyFavorite) {
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
                removeFavorite(propertyId).catch(() => {
                    setFavorites((prev) => [...prev, propertyId]);
                });
            } else {
                setFavorites((prev) => [...prev, propertyId]);
                addFavorite(propertyId).catch(() => {
                    setFavorites((prev) => prev.filter((id) => id !== propertyId));
                });
            }
        },
        [favorites, isAuthenticated],
    );

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
    return ctx;
}
