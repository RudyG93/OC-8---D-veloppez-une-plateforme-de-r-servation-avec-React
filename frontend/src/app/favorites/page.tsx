"use client";

import { Suspense } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";

function FavoritesPageInner() {
    const { isLoading } = useRequireAuth();

    if (isLoading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                Chargement...
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="text-2xl font-bold">Favoris</h1>
        </main>
    );
}

export default function FavoritesPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <FavoritesPageInner />
        </Suspense>
    );
}
