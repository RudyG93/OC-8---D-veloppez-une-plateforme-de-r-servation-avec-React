import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kasa - Location de logements entre particuliers",
    template: "%s | Kasa",
  },
  description:
    "Découvrez et réservez des logements uniques à louer entre particuliers sur Kasa. Plateforme sécurisée avec profils d'hôtes vérifiés.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Kasa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kasa",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"}/logo.png`,
    description:
      "Plateforme de location de logements entre particuliers en France.",
    sameAs: [],
  };

  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-main-red focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <div className="flex flex-1 flex-col min-h-0" id="main-content">{children}</div>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
