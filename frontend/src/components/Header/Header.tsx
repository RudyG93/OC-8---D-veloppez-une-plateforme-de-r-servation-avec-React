import Image from "next/image";
import Link from "next/link";
import AuthNav from "./AuthNav";
import MobileMenu from "./MobileMenu";

/** Header principal responsive avec navigation desktop (barre centrée) et menu mobile (burger). */
export default function Header() {
    return (
        <header>
            {/* ========== DESKTOP / TABLETTE (md+) — conteneur centré avec marge ========== */}
            <div className="hidden md:block px-6 lg:px-10 pt-4 lg:pt-6">
                <div className="flex items-center mx-auto max-w-6xl bg-white rounded-[10px] px-8 lg:px-14 py-2 shadow-[0_4px_4px_rgba(182,182,182,0.05)]">
                    <nav aria-label="Navigation principale" className="flex-1 flex items-center justify-center gap-6 lg:gap-12">
                        <Link href="/" className="text-[13px] text-black hover:text-main-red transition-colors">
                            Accueil
                        </Link>
                        <Link href="/about" className="text-[13px] text-black hover:text-main-red transition-colors">
                            À propos
                        </Link>
                    </nav>

                    <Link href="/" className="shrink-0 mx-6 lg:mx-10" aria-label="Kasa - Retour à l'accueil">
                        <Image
                            src="/logo.png"
                            alt="Kasa"
                            width={120}
                            height={40}
                            priority
                            unoptimized
                        />
                    </Link>

                    <AuthNav />
                </div>
            </div>

            {/* ========== MOBILE (< md) — collé en haut, pleine largeur ========== */}
            <div className="flex md:hidden items-center justify-between bg-white px-4 py-3 shadow-[0_4px_4px_rgba(182,182,182,0.05)]">
                <Link href="/" aria-label="Kasa - Retour à l'accueil">
                    <Image
                        src="/ico-logo.png"
                        alt="Kasa"
                        width={32}
                        height={37}
                        priority
                        unoptimized
                    />
                </Link>

                <MobileMenu />
            </div>
        </header>
    );
}
