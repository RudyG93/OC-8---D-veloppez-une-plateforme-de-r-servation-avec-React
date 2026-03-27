"use client";

import { Suspense } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";

/**
 * Page de connexion – Client Component.
 * Encapsule le formulaire dans un Suspense pour gérer le useSearchParams.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
          Chargement...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
