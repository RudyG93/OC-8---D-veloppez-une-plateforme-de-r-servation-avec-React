import Image from "next/image";
import Link from "next/link";
import Favorite from "@/components/Ui/Favorite";
import type { Property } from "@/types/property";

interface PropertyCardProps {
    property: Property;
}

/** Carte de propriété avec image, prix, localisation et bouton favori. */
export default function PropertyCard({ property }: PropertyCardProps) {
    const { id, title, cover, location, price_per_night } = property;

    return (
        <Link
            href={`/properties/${id}`}
            aria-label={title}
            className="group block rounded-[10px] bg-white overflow-hidden transition-shadow"
        >
            {/* -------- Image + bouton favori -------- */}
            <div className="relative aspect-square w-full overflow-hidden">
                {cover ? (
                    <Image
                        src={cover}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-light-gray flex items-center justify-center text-dark-gray text-sm">
                        Pas de photo
                    </div>
                )}

                {/* Favori en haut à droite */}
                <div className="absolute top-3 right-3">
                    <Favorite propertyId={id} />
                </div>
            </div>

            {/* -------- Infos -------- */}
            <div className="flex flex-col gap-10 p-5 pb-5">
                <div className="flex flex-col gap-1.5">
                    <h2 className="font-medium text-lg truncate">{title}</h2>
                    {location && (
                        <p className="text-sm text-dark-gray truncate">{location}</p>
                    )}
                </div>

                <p className="mt-4 text-sm">
                    <span className="font-medium">{price_per_night}&euro;</span>{" "}
                    par nuit
                </p>
            </div>
        </Link>
    );
}
