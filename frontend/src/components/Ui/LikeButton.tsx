"use client";

import { useState } from "react";

interface LikeButtonProps {
    /** État initial (déjà liké ou non) */
    defaultLiked?: boolean;
    /** Callback appelé quand l'état change */
    onToggle?: (liked: boolean) => void;
    /** Taille de l'icône en px */
    size?: number;
    className?: string;
}

export default function LikeButton({ defaultLiked = false, onToggle, size = 24, className = "" }: LikeButtonProps) {
    const [liked, setLiked] = useState(defaultLiked);

    const toggle = () => {
        const next = !liked;
        setLiked(next);
        onToggle?.(next);
    };

    return (
        <button
            onClick={toggle}
            className={`cursor-pointer transition-colors ${liked ? "text-main-red" : "text-dark-gray"} hover:text-main-red ${className}`}
            aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        </button>
    );
}
