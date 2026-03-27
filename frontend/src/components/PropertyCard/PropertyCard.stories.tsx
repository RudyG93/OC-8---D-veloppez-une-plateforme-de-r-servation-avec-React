import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

const meta = {
    title: "Components/PropertyCard",
    component: PropertyCard,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 380 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PropertyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
    args: {
        property: {
            id: "1",
            title: "Appartement lumineux – Bastille",
            slug: "appartement-lumineux-bastille",
            cover: "/img-landing.png",
            description: "Bel appartement au cœur de Paris",
            host: { id: 1, name: "Marie Dupont", picture: null },
            rating_avg: 4.5,
            ratings_count: 12,
            location: "Paris 11e",
            price_per_night: 95,
        },
    },
};

export const NoCover: Story = {
    args: {
        property: {
            id: "2",
            title: "Studio sans photo",
            slug: "studio-sans-photo",
            cover: null,
            description: null,
            host: { id: 2, name: "Jean Martin", picture: null },
            rating_avg: 0,
            ratings_count: 0,
            location: null,
            price_per_night: 50,
        },
    },
};
