"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@/components/Icons/MenuIcon";
import CloseIcon from "@/components/Icons/CloseIcon";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);

    return (
        <>
            {/* Bouton burger */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-dark-gray"
                aria-label="Ouvrir le menu"
            >
                <MenuIcon />
            </button>

            {/* Overlay plein écran */}
            {isOpen && (
                <div className="fixed inset-x-0 top-0 z-50 bg-white flex flex-col px-4 py-3 shadow-lg">
                    {/* En-tête : logo icône + bouton fermer */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" onClick={close}>
                            <Image
                                src="/ico-logo.png"
                                alt="Kasa"
                                width={32}
                                height={37}
                                unoptimized
                            />
                        </Link>
                        <button onClick={close} className="p-2 text-dark-gray" aria-label="Fermer le menu">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Liens de navigation avec séparateurs */}
                    <nav className="flex flex-col">
                        <Link
                            href="/"
                            onClick={close}
                            className="py-5 text-lg text-black hover:text-main-red transition-colors"
                        >
                            Accueil
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/about"
                            onClick={close}
                            className="py-5 text-lg text-black hover:text-main-red transition-colors"
                        >
                            À propos
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/login"
                            onClick={close}
                            className="py-5 text-lg text-black hover:text-main-red transition-colors"
                        >
                            Messagerie
                        </Link>
                        <hr className="border-light-gray" />

                        <Link
                            href="/favorites"
                            onClick={close}
                            className="py-5 text-lg text-black hover:text-main-red transition-colors"
                        >
                            Favoris
                        </Link>

                        {/* Bouton CTA */}
                        <Link
                            href="/properties/add"
                            onClick={close}
                            className="my-6 self-start bg-main-red hover:bg-dark-orange text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                        >
                            Ajouter un logement
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
