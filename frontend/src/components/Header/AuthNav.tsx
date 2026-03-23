"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import FavIcon from "@/components/Icons/FavIcon";
import MsgIcon from "@/components/Icons/MsgIcon";

export default function AuthNav() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="flex items-center gap-8 lg:gap-20">
            <Link
                href="/properties/add"
                className="text-sm text-main-red hover:text-dark-orange transition-colors whitespace-nowrap"
            >
                +Ajouter un logement
            </Link>
            <div className="flex items-center gap-2 lg:gap-3">
                <Link href="/favorites" aria-label="Favoris" className="text-main-red hover:text-dark-orange transition-colors">
                    <FavIcon />
                </Link>
                <span className="text-dark-gray/30">|</span>
                <Link href="/contact" aria-label="Messages" className="text-main-red hover:text-dark-orange transition-colors">
                    <MsgIcon />
                </Link>
            </div>
            {isAuthenticated ? (
                <button
                    onClick={logout}
                    className="text-sm text-dark-gray hover:text-main-red transition-colors cursor-pointer"
                >
                    {user?.name?.split(" ")[0] ?? "Déconnexion"} ✕
                </button>
            ) : (
                <Link href="/login" className="text-sm text-main-red hover:text-dark-orange transition-colors">
                    Se connecter
                </Link>
            )}
        </div>
    );
}
