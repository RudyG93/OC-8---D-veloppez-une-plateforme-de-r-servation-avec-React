"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

/** Contenu de la page d'ajout de logement, protégé par authentification. */
export default function AddPropertyContent() {
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
            <h1 className="text-2xl font-bold">Ajouter un logement</h1>
        </main>
    );
}
