"use client";

import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteProps {
    propertyId: string;
    className?: string;
}

/**
 * Bouton cœur pour ajouter/retirer une propriété des favoris.
 * Utilise le path de ico-fav.svg en inline pour pouvoir changer le fill dynamiquement.
 */
export default function Favorite({ propertyId, className = "" }: FavoriteProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const liked = isFavorite(propertyId);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(propertyId);
            }}
            className={`w-8 h-8 rounded-[5px] bg-white shadow-sm flex items-center justify-center cursor-pointer transition-colors ${className}`}
            aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <svg
                width={10}
                height={10}
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 2.742C0 6.434 4.8 8.914 4.8 8.914C4.8 8.914 9.6 6.436 9.6 2.742C9.6 1.228 8.372 0 6.858 0C6.034 0 5.304 0.37 4.8 0.946C4.298 0.37 3.566 0 2.742 0C1.228 0 0 1.226 0 2.742Z"
                    fill={liked ? "#99331A" : "#565656"}
                    opacity={liked ? 1 : 0.7}
                    className="transition-all duration-200"
                />
            </svg>
        </button>
    );
}
