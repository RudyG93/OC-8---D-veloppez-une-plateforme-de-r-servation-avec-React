"use client";

import { Suspense } from "react";
import ContactPageContent from "@/components/Messaging/ContactPageContent";

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
