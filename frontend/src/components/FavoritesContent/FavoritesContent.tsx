"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getFavorites } from "@/api/favorites";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import type { Property } from "@/types/property";

/** Contenu de la page Favoris, protégé par authentification. */
export default function FavoritesContent() {
    const { user, isLoading } = useRequireAuth();
    const { favorites } = useFavorites();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // Utilise la longueur des favoris comme clé de re-fetch (valeur dérivée, pas de setState dans un effect)
    const favCount = favorites.length;

    useEffect(() => {
        if (!user) return;

        let cancelled = false;

        getFavorites(user.id)
            .then((data) => { if (!cancelled) setProperties(data); })
            .catch(() => { if (!cancelled) setProperties([]); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [user, favCount]);

    if (isLoading || loading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                Chargement...
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="text-2xl font-bold">Favoris</h1>

            {properties.length === 0 ? (
                <p className="mt-6 text-dark-gray">
                    Vous n&apos;avez pas encore de favoris.
                </p>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </main>
    );
}
