import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageGallery from "./ImageGallery";

// Mock next/image
vi.mock("next/image", () => ({
    default: (props: Record<string, unknown>) => {
        const { fill, priority, ...rest } = props;
        return <img {...rest} data-fill={fill ? "true" : undefined} data-priority={priority ? "true" : undefined} />;
    },
}));

const IMAGES = [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg",
    "https://example.com/img4.jpg",
];

describe("ImageGallery (Carousel)", () => {
    it("affiche un message quand il n'y a pas d'images", () => {
        render(<ImageGallery images={[]} alt="Test" />);
        expect(screen.getByText("Pas de photos")).toBeInTheDocument();
    });

    it("affiche la première image par défaut", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", IMAGES[0]);
        expect(img).toHaveAttribute("alt", "Logement - 1 sur 4");
    });

    it("affiche le compteur 1/4", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        expect(screen.getByText("1/4")).toBeInTheDocument();
    });

    it("n'affiche pas les flèches ni le compteur avec une seule image", () => {
        render(<ImageGallery images={[IMAGES[0]]} alt="Logement" />);
        expect(screen.queryByLabelText("Image précédente")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Image suivante")).not.toBeInTheDocument();
        expect(screen.queryByText(/\//)).not.toBeInTheDocument();
    });

    it("passe à l'image suivante au clic sur la flèche droite", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        fireEvent.click(screen.getByLabelText("Image suivante"));
        expect(screen.getByRole("img")).toHaveAttribute("src", IMAGES[1]);
        expect(screen.getByText("2/4")).toBeInTheDocument();
    });

    it("passe à l'image précédente au clic sur la flèche gauche", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        fireEvent.click(screen.getByLabelText("Image précédente"));
        // Boucle : de la 1ère à la dernière
        expect(screen.getByRole("img")).toHaveAttribute("src", IMAGES[3]);
        expect(screen.getByText("4/4")).toBeInTheDocument();
    });

    it("boucle de la dernière image à la première", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        // Aller à la dernière
        fireEvent.click(screen.getByLabelText("Image précédente"));
        expect(screen.getByText("4/4")).toBeInTheDocument();
        // Aller à la suivante → retour à la 1ère
        fireEvent.click(screen.getByLabelText("Image suivante"));
        expect(screen.getByText("1/4")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", IMAGES[0]);
    });

    it("navigue avec les touches clavier ArrowLeft et ArrowRight", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        fireEvent.keyDown(window, { key: "ArrowRight" });
        expect(screen.getByText("2/4")).toBeInTheDocument();
        fireEvent.keyDown(window, { key: "ArrowRight" });
        expect(screen.getByText("3/4")).toBeInTheDocument();
        fireEvent.keyDown(window, { key: "ArrowLeft" });
        expect(screen.getByText("2/4")).toBeInTheDocument();
    });

    it("a les attributs d'accessibilité carousel", () => {
        render(<ImageGallery images={IMAGES} alt="Logement" />);
        const region = screen.getByRole("region");
        expect(region).toHaveAttribute("aria-roledescription", "carousel");
        expect(region).toHaveAttribute("aria-label", "Galerie d'images");
    });
});
