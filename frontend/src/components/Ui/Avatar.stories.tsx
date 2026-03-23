import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar from "@/components/Ui/Avatar";

const meta = {
    title: "Ui/Avatar",
    component: Avatar,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
    args: {
        src: "https://i.pravatar.cc/150?u=storybook",
        alt: "Jane Doe",
        size: "lg",
    },
};

export const Fallback: Story = {
    args: {
        src: null,
        alt: "Marie Dupont",
        size: "lg",
    },
};

export const Small: Story = {
    args: {
        src: null,
        alt: "Alice",
        size: "sm",
    },
};
