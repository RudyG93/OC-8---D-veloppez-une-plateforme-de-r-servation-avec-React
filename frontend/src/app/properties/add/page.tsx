"use client";

import { Suspense } from "react";
import AddPropertyContent from "@/components/AddPropertyContent/AddPropertyContent";

/**
 * Page d'ajout de logement – Client Component.
 * Route protégée par authentification.
 */
export default function AddPropertyPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <AddPropertyContent />
        </Suspense>
    );
}
