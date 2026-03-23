import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites, __resetFavoritesStore } from "./FavoritesContext";

// Composant helper pour tester le hook
function TestConsumer() {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    return (
        <div>
            <span data-testid="count">{favorites.length}</span>
            <span data-testid="is-fav-1">{isFavorite("1") ? "oui" : "non"}</span>
            <span data-testid="is-fav-2">{isFavorite("2") ? "oui" : "non"}</span>
            <button data-testid="toggle-1" onClick={() => toggleFavorite("1")}>
                Toggle 1
            </button>
            <button data-testid="toggle-2" onClick={() => toggleFavorite("2")}>
                Toggle 2
            </button>
        </div>
    );
}

function renderWithProvider() {
    return render(
        <FavoritesProvider>
            <TestConsumer />
        </FavoritesProvider>,
    );
}

describe("FavoritesContext", () => {
    beforeEach(() => {
        localStorage.clear();
        __resetFavoritesStore();
    });

    it("démarre avec une liste vide", () => {
        renderWithProvider();
        expect(screen.getByTestId("count").textContent).toBe("0");
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
    });

    it("ajoute un favori au clic", () => {
        renderWithProvider();
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("count").textContent).toBe("1");
        expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
    });

    it("retire un favori au second clic", () => {
        renderWithProvider();
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
        expect(screen.getByTestId("count").textContent).toBe("0");
    });

    it("gère plusieurs favoris indépendamment", () => {
        renderWithProvider();
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        act(() => {
            screen.getByTestId("toggle-2").click();
        });
        expect(screen.getByTestId("count").textContent).toBe("2");
        expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        expect(screen.getByTestId("is-fav-2").textContent).toBe("oui");

        // Retirer seulement le 1
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("count").textContent).toBe("1");
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
        expect(screen.getByTestId("is-fav-2").textContent).toBe("oui");
    });

    it("persiste les favoris dans localStorage", () => {
        renderWithProvider();
        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        const stored = JSON.parse(localStorage.getItem("kasa_favorites") || "[]");
        expect(stored).toEqual(["1"]);
    });

    it("charge les favoris depuis localStorage au montage", () => {
        localStorage.setItem("kasa_favorites", JSON.stringify(["1", "2"]));
        __resetFavoritesStore(); // re-lire le localStorage mis à jour

        renderWithProvider();
        expect(screen.getByTestId("count").textContent).toBe("2");
        expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        expect(screen.getByTestId("is-fav-2").textContent).toBe("oui");
    });

    it("lance une erreur si useFavorites est utilisé hors du Provider", () => {
        // Supprimer les erreurs console attendues
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(() => render(<TestConsumer />)).toThrow(
            "useFavorites doit être utilisé dans un FavoritesProvider",
        );
        spy.mockRestore();
    });
});
