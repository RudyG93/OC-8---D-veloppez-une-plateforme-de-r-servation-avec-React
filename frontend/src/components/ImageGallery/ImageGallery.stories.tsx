import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ImageGallery from "@/components/ImageGallery/ImageGallery";

const IMAGES = [
    "/img-landing.png",
    "/img-landing.png",
    "/img-landing.png",
];

const meta = {
    title: "Components/ImageGallery",
    component: ImageGallery,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleImages: Story = {
    args: { images: IMAGES, alt: "Logement de test" },
};

export const SingleImage: Story = {
    args: { images: [IMAGES[0]], alt: "Logement unique" },
};

export const NoImages: Story = {
    args: { images: [], alt: "Logement vide" },
};
