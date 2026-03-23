import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ajouter un logement",
    robots: { index: false, follow: false },
};

export default function AddPropertyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
