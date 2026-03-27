"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthNav() {
    const {isAuthenticated, logout } = useAuth();

    return (
        <div className="flex-1 flex items-center justify-center gap-5 lg:gap-8">
            <Link
                href="/properties/add"
                className="text-[13px] text-main-red hover:text-dark-orange transition-colors whitespace-nowrap"
            >
                +Ajouter un logement
            </Link>
            <div className="flex items-center gap-2">
                <Link href="/favorites" aria-label="Favoris" className="hover:opacity-70 transition-opacity">
                    <Image src="/icons/ico-fav-header.svg" alt="Favoris" width={16} height={16} />
                </Link>
                <span className="text-dark-gray/30 text-xs">|</span>
                <Link href="/contact" aria-label="Messages" className="hover:opacity-70 transition-opacity">
                    <Image src="/icons/ico-contact.svg" alt="Messagerie" width={16} height={16} />
                </Link>
            </div>
            {isAuthenticated ? (
                <button
                    onClick={logout}
                    className="text-[11px] border border-main-red/40 rounded-full px-2.5 py-0.5 text-main-red hover:bg-main-red hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                    Se déconnecter
                </button>
            ) : (
                <Link
                    href="/login"
                    className="text-[11px] border border-main-red/30 rounded-full px-2.5 py-0.5 text-main-red hover:bg-main-red hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                    Se connecter
                </Link>
            )}
        </div>
    );
}
