"use client";

import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteProps {
    propertyId: string;
    className?: string;
}

/**
 * Bouton cœur pour ajouter/retirer une propriété des favoris.
 * Se connecte au FavoritesContext global (localStorage).
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
            className={`w-10 h-10 rounded-[10px] bg-white shadow-sm flex items-center justify-center cursor-pointer transition-colors ${className}`}
            aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors ${liked ? "text-main-red" : "text-dark-gray"}`}
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        </button>
    );
}
