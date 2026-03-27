"use client";

import { Suspense } from "react";
import ContactPageContent from "@/components/Messaging/ContactPageContent";

/**
 * Page de messagerie – Client Component.
 * Affiche les conversations et le chat via ContactPageContent.
 */
export default function ContactPage() {
    return (
        <Suspense
            fallback={
                <main className="flex flex-1 items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <ContactPageContent />
        </Suspense>
    );
}
