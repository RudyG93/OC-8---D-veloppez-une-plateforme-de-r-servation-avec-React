import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Rating from "@/components/Ui/Rating";

const meta = {
    title: "Ui/Rating",
    component: Rating,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { score: 4.5 },
};

export const Perfect: Story = {
    args: { score: 5 },
};

export const Low: Story = {
    args: { score: 2.1 },
};
