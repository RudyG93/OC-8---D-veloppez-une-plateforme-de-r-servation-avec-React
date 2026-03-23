"use client";

import {
    createContext,
    useContext,
    useCallback,
    useSyncExternalStore,
    type ReactNode,
} from "react";

interface FavoritesContextValue {
    /** IDs des propriétés en favoris */
    favorites: string[];
    /** Vérifie si une propriété est en favoris */
    isFavorite: (propertyId: string) => boolean;
    /** Ajoute ou retire un favori, renvoie le nouvel état */
    toggleFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/** Clé localStorage pour persister les IDs de propriétés en favoris */
const STORAGE_KEY = "kasa_favorites";

/* -------- Store externe (localStorage) -------- */
// Pattern useSyncExternalStore : un store module-level avec snapshot immuable
// permet à React de souscrire aux changements sans useState dans le provider

let listeners: Array<() => void> = [];
let snapshot: string[] = [];

function notifyListeners() {
    for (const fn of listeners) fn();
}

function subscribe(callback: () => void): () => void {
    listeners = [...listeners, callback];

    const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) {
            snapshot = readFromStorage();
            callback();
        }
    };
    window.addEventListener("storage", onStorage);

    return () => {
        listeners = listeners.filter((l) => l !== callback);
        window.removeEventListener("storage", onStorage);
    };
}

function getSnapshot(): string[] {
    return snapshot;
}

// Référence stable pour le SSR : un nouveau [] à chaque appel causerait une boucle
// infinie de re-renders dans useSyncExternalStore
const SERVER_SNAPSHOT: string[] = [];

function getServerSnapshot(): string[] {
    return SERVER_SNAPSHOT;
}

function readFromStorage(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
        return [];
    }
}

function writeFavorites(ids: string[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    snapshot = ids;
    notifyListeners();
}

// Initialisation côté client
if (typeof window !== "undefined") {
    snapshot = readFromStorage();
}

/** Réinitialise l'état interne – usage tests uniquement */
export function __resetFavoritesStore() {
    snapshot = readFromStorage();
    notifyListeners();
}

/* -------- Provider -------- */

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const isFavorite = useCallback(
        (propertyId: string) => favorites.includes(propertyId),
        [favorites],
    );

    const toggleFavorite = useCallback(
        (propertyId: string) => {
            let next: string[];
            let liked: boolean;

            if (favorites.includes(propertyId)) {
                next = favorites.filter((id) => id !== propertyId);
                liked = false;
            } else {
                next = [...favorites, propertyId];
                liked = true;
            }

            writeFavorites(next);
            return liked;
        },
        [favorites],
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
