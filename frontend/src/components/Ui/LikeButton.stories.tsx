import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LikeButton from "@/components/Ui/LikeButton";

const meta = {
    title: "Ui/LikeButton",
    component: LikeButton,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { defaultLiked: false, size: 24 },
};

export const Liked: Story = {
    args: { defaultLiked: true, size: 24 },
};

export const Large: Story = {
    args: { defaultLiked: false, size: 36 },
};
