import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Favorite from "@/components/Ui/Favorite";

const meta = {
    title: "Ui/Favorite",
    component: Favorite,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Favorite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { propertyId: "story-1" },
};
