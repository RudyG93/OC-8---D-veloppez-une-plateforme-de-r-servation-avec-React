"use client";

import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

/**
 * Page d'inscription – Client Component.
 * Encapsule le formulaire dans un Suspense.
 */
export default function RegisterPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <RegisterForm />
        </Suspense>
    );
}
