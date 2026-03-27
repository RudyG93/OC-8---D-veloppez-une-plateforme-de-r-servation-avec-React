"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface BackButtonProps {
    label?: string;
    icon?: boolean;
    className?: string;
}

/** Bouton de retour vers l'accueil utilisant router.push. */
export default function BackButton({
    label = "Retour aux annonces",
    icon = true,
    className = "",
}: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.push("/")}
            className={`inline-block rounded-[10px] bg-light-gray px-4 py-2 text-sm text-dark-gray transition-colors hover:bg-dark-gray/10 cursor-pointer ${className}`}
        >
            {icon && (
                <div className="inline-block mr-1">
                    <Image src="/icons/ico-back.svg" alt="" width={10} height={10} />
                </div>
            )}
            {label}
        </button>
    );
}
