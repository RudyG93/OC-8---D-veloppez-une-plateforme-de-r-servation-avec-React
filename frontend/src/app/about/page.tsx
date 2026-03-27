import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez Kasa, la plateforme de location de logements entre particuliers. Notre mission, notre équipe et nos valeurs.",
};

/**
 * Page À propos – Server Component.
 * Présente la mission et les valeurs de Kasa.
 */
export default function AboutPage() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            {/* ===== Titre + intro ===== */}
            <h1 className="text-center text-2xl font-bold text-main-red md:text-4xl">
                À propos
            </h1>

            <div className="mx-auto mt-4 max-w-3xl space-y-2 text-center text-sm md:text-base">
                <p>
                    Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
                </p>
                <p>
                    Depuis notre création, nous mettons en relation des voyageurs en quête
                    d&apos;authenticité avec des hôtes passionnés qui aiment partager leur région
                    et leurs bonnes adresses.
                </p>
            </div>

            {/* ===== Image principale ===== */}
            <div className="relative mt-8 h-72 overflow-hidden rounded-[10px] md:h-80 lg:h-96">
                <Image
                    src="/img-a-propos.png"
                    alt="Maison en bois chaleureuse"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                />
            </div>

            {/* ===== Mission + image secondaire ===== */}
            <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                <div>
                    <h2 className="text-lg font-bold text-main-red md:text-xl">
                        Notre mission est simple :
                    </h2>

                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm md:text-base">
                        <li>Offrir une plateforme fiable et simple d&apos;utilisation</li>
                        <li>Proposer des hébergements variés et de qualité</li>
                        <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
                    </ol>

                    {/* Image 2 visible uniquement en mobile, avant le texte italic */}
                    <div className="relative mt-6 h-72 overflow-hidden rounded-[10px] md:hidden">
                        <Image
                            src="/img2-a-propos.png"
                            alt="Maison de charme au coucher du soleil"
                            fill
                            sizes="100vw"
                            className="object-cover"
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    <p className="mt-6 text-sm text-main-red font-medium md:text-base">
                        Que vous cherchiez un appartement cosy en centre-ville, une maison en bord
                        de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque
                        séjour devienne un souvenir inoubliable.
                    </p>
                </div>

                {/* Image 2 visible uniquement en desktop, colonne droite */}
                <div className="relative hidden overflow-hidden rounded-[10px] md:block md:h-80 lg:h-96">
                    <Image
                        src="/img2-a-propos.png"
                        alt="Maison de charme au coucher du soleil"
                        fill
                        sizes="50vw"
                        className="object-cover"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
        </main>
    );
}
