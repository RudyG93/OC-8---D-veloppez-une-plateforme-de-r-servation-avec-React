"use client";

import { useState, useRef, useEffect } from "react";

interface CollapseProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

/**
 * Panneau repliable avec animation de hauteur.
 * Gère l'ouverture/fermeture avec transition CSS sur la propriété height.
 */
export default function Collapse({ title, children, defaultOpen = false }: CollapseProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

    // Animation de hauteur en 2 étapes :
    // Ouverture : scrollHeight → auto (auto après transition pour supporter le contenu dynamique)
    // Fermeture : scrollHeight → 0 (double rAF pour forcer le reflow entre les deux valeurs)
    useEffect(() => {
        if (!contentRef.current) return;
        if (isOpen) {
            setHeight(contentRef.current.scrollHeight);
            const timer = setTimeout(() => setHeight(undefined), 300);
            return () => clearTimeout(timer);
        } else {
            setHeight(contentRef.current.scrollHeight);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setHeight(0));
            });
        }
    }, [isOpen]);

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium transition-colors hover:text-main-red cursor-pointer"
                aria-expanded={isOpen}
            >
                {title}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                ref={contentRef}
                style={{ height: height !== undefined ? `${height}px` : "auto" }}
                className="overflow-hidden transition-[height] duration-300 ease-in-out"
            >
                <div className="pt-2 pb-1">{children}</div>
            </div>
        </div>
    );
}
