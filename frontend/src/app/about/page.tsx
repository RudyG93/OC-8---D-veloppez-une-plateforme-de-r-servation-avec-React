import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez Kasa, la plateforme de location de logements entre particuliers. Notre mission, notre équipe et nos valeurs.",
};

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="text-2xl font-bold">À propos</h1>
        </main>
    );
}
