"use client";

import { Suspense } from "react";
import FavoritesContent from "@/components/FavoritesContent/FavoritesContent";

/**
 * Page des favoris – Client Component.
 * Route protégée par authentification.
 */
export default function FavoritesPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <FavoritesContent />
        </Suspense>
    );
}
