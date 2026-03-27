/**
 * Page de détail d'un logement – Server Component.
 * Récupère les données via l'API et génère les métadonnées dynamiques (title, OG, JSON-LD).
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPropertyById } from "@/api/properties";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Avatar from "@/components/Ui/Avatar";
import BackButton from "@/components/Ui/BackButton";
import Button from "@/components/Ui/Button";
import Rating from "@/components/Ui/Rating";
import Tag from "@/components/Ui/Tag";
import Collapse from "@/components/Ui/Collapse";
import Image from "next/image";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001").replace(/\/$/, "");

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const property = await getPropertyById(id);
    if (!property) {
        return { title: "Logement introuvable" };
    }
    return {
        title: property.title,
        description: property.description || `Découvrez ${property.title} sur Kasa`,
        openGraph: {
            title: property.title,
            description: property.description || `Découvrez ${property.title} sur Kasa`,
            images: property.pictures.length > 0 ? [property.pictures[0]] : [],
        },
    };
}

export default async function PropertyPage({ params }: Props) {
    const { id } = await params;

    const property = await getPropertyById(id);
    if (!property) {
        notFound();
    }

    const { title, location, description, host, rating_avg, ratings_count, pictures, equipments, tags, price_per_night } =
        property;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        url: `${SITE_URL}/properties/${id}`,
        name: title,
        description: description || undefined,
        image: pictures.length > 0 ? pictures[0] : undefined,
        address: location
            ? { "@type": "PostalAddress", addressLocality: location }
            : undefined,
        aggregateRating: rating_avg > 0
            ? {
                  "@type": "AggregateRating",
                  ratingValue: rating_avg,
                  bestRating: 5,
                  reviewCount: ratings_count || 1,
              }
            : undefined,
        priceRange: price_per_night ? `${price_per_night}€ / nuit` : undefined,
    };

    return (
        <main className="mx-auto max-w-6xl px-5 py-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Retour */}
            <BackButton className="ml-5 mt-10" />

            {/* Galerie + Hôte + Détails */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                {/* Galerie d'images */}
                <ImageGallery images={pictures} alt={title} />

                {/* Détails du logement — même largeur que la galerie */}
                <div className="rounded-[10px] border border-light-gray bg-white p-6 [&>*+*]:mt-10">
                <div>
                    <h1 className="text-xl font-medium">{title}</h1>
                    {location && (
                        <div className="mt-2 flex items-center gap-1 text-dark-gray">
                            <Image src="/icons/ico-localisation.svg" alt="Emplacement" width={14} height={14} className="inline-block mr-1" />
                            {location}
                        </div>
                    )}
                </div>

                {description && (
                        <p className="text-sm text-dark-gray">{description}</p>
                )}

                {/* Équipements */}
                {equipments.length > 0 && (
                    <Collapse title="Équipements" defaultOpen>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-[repeat(3,150px)]">
                            {equipments.map((eq) => (
                                <Tag key={eq} label={eq} />
                            ))}
                        </div>
                    </Collapse>
                )}

                {/* Catégorie / Tags */}
                {tags.length > 0 && (
                    <Collapse title="Catégorie" defaultOpen>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-[repeat(3,150px)]">
                            {tags.map((tag) => (
                                <Tag key={tag} label={tag} />
                            ))}
                        </div>
                    </Collapse>
                )}
                </div>

                {/* Carte hôte — en mobile tout en bas, en desktop colonne droite */}
                <div className="order-last lg:order-0 lg:row-start-1 lg:col-start-2 lg:row-span-2 rounded-[10px] bg-white p-6 shadow-sm h-fit">
                    <h2 className="text-sm font-bold">Votre hôte</h2>

                    <div className="mt-4 flex items-center gap-2 min-w-0 sm:gap-3">
                        <Avatar src={host.picture} alt="" size="md" className="sm:w-20! sm:h-20!" />
                        <span className="truncate text-sm font-medium sm:text-base">{host.name}</span>
                        <Rating score={rating_avg} className="shrink-0 text-xs sm:text-sm" />
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                        <Button variant="full" href={`/contact?hostId=${host.id}&hostName=${encodeURIComponent(host.name)}`}>
                            Contacter l&apos;hôte
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
