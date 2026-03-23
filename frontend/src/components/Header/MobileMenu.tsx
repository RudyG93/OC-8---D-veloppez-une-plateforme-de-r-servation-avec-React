"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Ui/Button";
import MenuIcon from "@/components/Icons/MenuIcon";
import CloseIcon from "@/components/Icons/CloseIcon";

export default function MobileMenu() {
    const { isAuthenticated, user, logout } = useAuth();
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
                            href="/contact"
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
                        <div className="my-6 self-start">
                            <Button href="/properties/add" onClick={close}>Ajouter un logement</Button>
                        </div>

                        <hr className="border-light-gray" />

                        {isAuthenticated ? (
                            <button
                                onClick={() => { logout(); close(); }}
                                className="py-5 text-lg text-left text-dark-gray hover:text-main-red transition-colors cursor-pointer"
                            >
                                Se déconnecter ({user?.name?.split(" ")[0]})
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={close}
                                className="py-5 text-lg text-main-red hover:text-dark-orange transition-colors"
                            >
                                Se connecter
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}
