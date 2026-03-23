"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
    alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    const prev = useCallback(() => {
        setCurrent((i) => (i - 1 + total) % total);
    }, [total]);

    const next = useCallback(() => {
        setCurrent((i) => (i + 1) % total);
    }, [total]);

    // Navigation clavier
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [prev, next]);

    if (total === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-[10px] bg-light-gray text-dark-gray">
                Pas de photos
            </div>
        );
    }

    return (
        <div
            className="relative h-72 overflow-hidden rounded-[10px] md:h-80 lg:h-96"
            role="region"
            aria-label="Galerie d'images"
            aria-roledescription="carousel"
        >
            {/* Image courante */}
            <Image
                src={images[current]}
                alt={`${alt} - ${current + 1} sur ${total}`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-opacity duration-300"
                priority={current === 0}
            />

            {/* Flèches (masquées s'il n'y a qu'une image) */}
            {total > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Image précédente"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={next}
                        aria-label="Image suivante"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </>
            )}

            {/* Compteur */}
            {total > 1 && (
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                    {current + 1}/{total}
                </span>
            )}
        </div>
    );
}
