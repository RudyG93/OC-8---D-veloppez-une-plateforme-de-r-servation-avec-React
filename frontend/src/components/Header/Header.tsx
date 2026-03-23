import Image from "next/image";
import Link from "next/link";
import AuthNav from "./AuthNav";
import MobileMenu from "./MobileMenu";

export default function Header() {
    return (
        <header>
            {/* ========== DESKTOP / TABLETTE (md+) — conteneur centré avec marge ========== */}
            <div className="hidden md:block px-6 lg:px-10 pt-4 lg:pt-6">
                <div className="flex items-center justify-between mx-auto max-w-5xl bg-white rounded-[10px] px-8 lg:px-25 py-2 shadow-[0_4px_4px_rgba(182,182,182,0.05)]">
                    <nav className="flex items-center gap-8 lg:gap-20">
                        <Link href="/" className="text-sm text-black hover:text-main-red transition-colors">
                            Accueil
                        </Link>
                        <Link href="/about" className="text-sm text-black hover:text-main-red transition-colors">
                            À propos
                        </Link>
                    </nav>

                    <Link href="/" className="shrink-0">
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
                <Link href="/">
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
