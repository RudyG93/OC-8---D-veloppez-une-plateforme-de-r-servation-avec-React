import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";

// -------- Mocks --------

const mockUser = { id: 1, name: "Test", email: "t@t.com", picture: null, role: "client" as const };

let authState = { user: mockUser, isAuthenticated: true, isLoading: false };
vi.mock("@/contexts/AuthContext", () => ({
    useAuth: () => authState,
}));

vi.mock("@/api/favorites", () => ({
    getFavorites: vi.fn().mockResolvedValue([]),
    addFavorite: vi.fn().mockResolvedValue({ ok: true }),
    removeFavorite: vi.fn().mockResolvedValue({ ok: true }),
}));

import { getFavorites, addFavorite, removeFavorite } from "@/api/favorites";

// -------- Composant de test --------

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
        vi.clearAllMocks();
        authState = { user: mockUser, isAuthenticated: true, isLoading: false };
        vi.mocked(getFavorites).mockResolvedValue([]);
    });

    it("démarre avec une liste vide", async () => {
        renderWithProvider();
        await waitFor(() => {
            expect(screen.getByTestId("count").textContent).toBe("0");
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
    });

    it("charge les favoris depuis l'API au montage", async () => {
        vi.mocked(getFavorites).mockResolvedValue([
            { id: "1", title: "A", slug: "a", cover: null, description: null, host: { id: 1, name: "H", picture: null }, rating_avg: 0, ratings_count: 0, location: null, price_per_night: 50 },
        ]);

        renderWithProvider();
        await waitFor(() => {
            expect(screen.getByTestId("count").textContent).toBe("1");
            expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        });
        expect(getFavorites).toHaveBeenCalledWith(1);
    });

    it("ajoute un favori au clic", async () => {
        renderWithProvider();
        await waitFor(() => expect(getFavorites).toHaveBeenCalled());

        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        expect(addFavorite).toHaveBeenCalledWith("1");
    });

    it("retire un favori au second clic", async () => {
        vi.mocked(getFavorites).mockResolvedValue([
            { id: "1", title: "A", slug: "a", cover: null, description: null, host: { id: 1, name: "H", picture: null }, rating_avg: 0, ratings_count: 0, location: null, price_per_night: 50 },
        ]);

        renderWithProvider();
        await waitFor(() => {
            expect(screen.getByTestId("is-fav-1").textContent).toBe("oui");
        });

        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
        expect(removeFavorite).toHaveBeenCalledWith("1");
    });

    it("ne fait rien si l'utilisateur n'est pas connecté", async () => {
        authState = { user: null as never, isAuthenticated: false, isLoading: false };

        renderWithProvider();
        await waitFor(() => {
            expect(screen.getByTestId("count").textContent).toBe("0");
        });

        act(() => {
            screen.getByTestId("toggle-1").click();
        });
        expect(screen.getByTestId("is-fav-1").textContent).toBe("non");
        expect(addFavorite).not.toHaveBeenCalled();
    });

    it("lance une erreur si useFavorites est utilisé hors du Provider", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(() => render(<TestConsumer />)).toThrow(
            "useFavorites doit être utilisé dans un FavoritesProvider",
        );
        spy.mockRestore();
    });
});
