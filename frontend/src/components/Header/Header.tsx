import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
    return (
        <header className="px-4 pt-4 md:px-10 md:pt-6">
            {/* Desktop header — conteneur centré, ne prend pas toute la largeur */}
            <div className="hidden md:flex items-center justify-between mx-auto max-w-5xl bg-white rounded-[10px] px-25 py-2 shadow-[0_4px_4px_rgba(182,182,182,0.05)] gap-5">
                {/* Navigation gauche */}
                <nav className="flex items-center gap-5">
                    <Link
                        href="/"
                        className="text-sm text-black hover:text-main-red transition-colors"
                    >
                        Accueil
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm text-black hover:text-main-red transition-colors"
                    >
                        À propos
                    </Link>
                </nav>

                {/* Logo central */}
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Kasa"
                        width={120}
                        height={40}
                        priority
                    />
                </Link>

                {/* Actions droite */}
                <div className="flex items-center gap-5">
                    <Link
                        href="/properties/add"
                        className="text-sm text-main-red hover:text-dark-orange transition-colors"
                    >
                        +Ajouter un logement
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link href="/favorites" aria-label="Favoris">
                            <Image src="/icons/Group.png" alt="" width={12} height={15} />
                        </Link>
                        <span className="text-dark-gray/30">|</span>
                        <Link href="/login" aria-label="Messages">
                            <Image src="/icons/ico-msg.png" alt="" width={18} height={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile header — pleine largeur, logo icône + burger */}
            <div className="flex md:hidden items-center justify-between bg-white rounded-[10px] px-4 py-2 shadow-[0_4px_4px_rgba(182,182,182,0.05)]">
                <Link href="/">
                    <Image
                        src="/ico-logo.png"
                        alt="Kasa"
                        width={36}
                        height={36}
                        priority
                    />
                </Link>

                <MobileMenu />
            </div>
        </header>
    );
}
