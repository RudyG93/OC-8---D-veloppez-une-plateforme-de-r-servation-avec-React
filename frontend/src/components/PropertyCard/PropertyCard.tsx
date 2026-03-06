import Image from "next/image";
import Link from "next/link";
import Favorite from "@/components/Ui/Favorite";
import type { Property } from "@/types/property";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const { id, title, cover, location, price_per_night } = property;

    return (
        <Link
            href={`/properties/${id}`}
            className="group block rounded-[10px] bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
        >
            {/* -------- Image + bouton favori -------- */}
            <div className="relative aspect-4/3 w-full overflow-hidden">
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
            <div className="flex flex-col gap-1 p-4">
                <h3 className="font-bold text-base truncate">{title}</h3>

                {location && (
                    <p className="text-sm text-dark-gray truncate">{location}</p>
                )}

                <p className="mt-2 text-sm">
                    <span className="font-bold">{price_per_night}&euro;</span>{" "}
                    par nuit
                </p>
            </div>
        </Link>
    );
}
