"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);

    return (
        <>
            {/* Bouton burger */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2"
                aria-label="Ouvrir le menu"
            >
                <Image src="/icons/ico-menu.png" alt="" width={24} height={24} />
            </button>

            {/* Overlay plein écran */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col px-8 py-6">
                    {/* En-tête : logo icône + bouton fermer */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" onClick={close}>
                            <Image
                                src="/ico-logo.png"
                                alt="Kasa"
                                width={36}
                                height={36}
                            />
                        </Link>
                        <button onClick={close} className="p-2" aria-label="Fermer le menu">
                            <Image src="/icons/ico-close.png" alt="" width={24} height={24} />
                        </button>
                    </div>

                    {/* Liens de navigation avec séparateurs */}
                    <nav className="flex flex-col">
                        <Link
                            href="/"
                            onClick={close}
                            className="py-5 text-lg font-medium text-black hover:text-main-red transition-colors"
                        >
                            Accueil
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/about"
                            onClick={close}
                            className="py-5 text-lg font-medium text-black hover:text-main-red transition-colors"
                        >
                            À propos
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/login"
                            onClick={close}
                            className="py-5 text-lg font-medium text-black hover:text-main-red transition-colors"
                        >
                            Messagerie
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/favorites"
                            onClick={close}
                            className="py-5 text-lg font-medium text-black hover:text-main-red transition-colors"
                        >
                            Favoris
                        </Link>

                        {/* Bouton CTA */}
                        <Link
                            href="/properties/add"
                            onClick={close}
                            className="mt-6 self-start bg-main-red hover:bg-dark-orange text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                        >
                            Ajouter un logement
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
