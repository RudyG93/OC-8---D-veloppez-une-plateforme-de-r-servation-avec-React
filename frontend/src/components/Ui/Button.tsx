import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "fit" | "full";

interface ButtonBaseProps {
    /** "fit" = s'adapte au texte, "full" = prend toute la largeur du parent */
    variant?: Variant;
    children: React.ReactNode;
}

/** Props pour un bouton classique (<button>) */
type ButtonAsButton = ButtonBaseProps &
    Omit<ComponentProps<"button">, keyof ButtonBaseProps> & { href?: never };

/** Props pour un bouton-lien (<Link>) */
type ButtonAsLink = ButtonBaseProps &
    Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
    "inline-flex items-center justify-center rounded-[10px] bg-main-red text-white text-sm font-medium px-8 py-2 hover:bg-dark-orange transition-colors cursor-pointer";

const variants: Record<Variant, string> = {
    fit: "w-fit",
    full: "w-full",
};

export default function Button({ variant = "fit", children, ...props }: ButtonProps) {
    const className = `${base} ${variants[variant]} ${(props as { className?: string }).className ?? ""}`.trim();

    if ("href" in props && props.href) {
        const { href, ...rest } = props as ButtonAsLink;
        return (
            <Link href={href} {...rest} className={className}>
                {children}
            </Link>
        );
    }

    const { ...rest } = props as ButtonAsButton;
    return (
        <button {...rest} className={className}>
            {children}
        </button>
    );
}
