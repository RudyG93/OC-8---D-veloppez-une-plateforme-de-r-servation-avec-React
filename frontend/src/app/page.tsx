import Image from "next/image";
import { getProperties } from "@/api/properties";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

const STEPS = [
    {
        title: "Recherchez",
        description:
            "Entrez votre destination, vos dates et laissez Kasa faire le reste.",
    },
    {
        title: "Réservez",
        description:
            "Profitez d\u2019une plateforme sécurisée et de profils d\u2019hôtes vérifiés.",
    },
    {
        title: "Vivez l\u2019expérience",
        description:
            "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
    },
];

export default async function Home() {
    const properties = await getProperties();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Logements disponibles sur Kasa",
        itemListElement: properties.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"}/properties/${p.id}`,
            name: p.title,
        })),
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* ============ HERO ============ */}
            <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 text-center md:pt-14 md:pb-10">
                <h1 className="text-2xl font-bold text-main-red md:text-3xl lg:text-4xl">
                    Chez vous, partout et ailleurs
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm text-dark-gray md:text-base">
                    Avec Kasa, vivez des séjours uniques dans des hébergements
                    chaleureux, sélectionnés avec soin par nos hôtes.
                </p>

                {/* Image landing — hauteur fixe, image croppée (object-cover) */}
                <div className="relative mt-8 h-52 overflow-hidden rounded-[10px] md:h-72 lg:h-80">
                    <Image
                        src="/img-landing.png"
                        alt="Maison moderne avec vue sur la nature"
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </div>
            </section>

            {/* ============ GRILLE PROPRIÉTÉS ============ */}
            <section className="mx-auto max-w-6xl px-5 py-6 md:py-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>

            {/* ============ COMMENT ÇA MARCHE ============ */}
            <section className="mx-auto max-w-6xl px-5 py-10 md:py-16">
                <h2 className="text-center text-xl font-bold md:text-2xl">
                    Comment ça marche ?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-dark-gray md:text-base">
                    Que vous partiez pour un week-end improvisé, des vacances en
                    famille ou un voyage professionnel, Kasa vous aide à trouver
                    un lieu qui vous ressemble.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                    {STEPS.map((step) => (
                        <div
                            key={step.title}
                            className="rounded-[10px] border-t-4 border-main-red bg-white p-6"
                        >
                            <h3 className="text-lg font-bold text-main-red">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm text-dark-gray">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
