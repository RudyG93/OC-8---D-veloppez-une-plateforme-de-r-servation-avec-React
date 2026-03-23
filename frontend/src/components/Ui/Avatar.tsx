import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

const sizes: Record<AvatarSize, number> = {
    sm: 32,
    md: 48,
    lg: 80,
};

interface AvatarProps {
    /** URL de l'image (picture de User), null si pas de photo */
    src: string | null;
    /** Nom de l'utilisateur (utilisé pour le alt et le fallback) */
    alt: string;
    /** sm = 32px (message), md = 48px (défaut), lg = 80px (hôte) */
    size?: AvatarSize;
    className?: string;
}

export default function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
    const px = sizes[size];

    // Fallback : initiale sur fond gris si pas de photo
    if (!src) {
        return (
            <div
                className={`shrink-0 rounded-[10px] bg-dark-gray flex items-center justify-center text-white font-semibold ${className}`}
                style={{ width: px, height: px, fontSize: px * 0.4 }}
            >
                {alt.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={px}
            height={px}
            unoptimized
            className={`shrink-0 rounded-[10px] object-cover ${className}`}
        />
    );
}
