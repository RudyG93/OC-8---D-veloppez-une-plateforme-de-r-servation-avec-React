import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BackButton from "@/components/Ui/BackButton";

const meta = {
    title: "Ui/BackButton",
    component: BackButton,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
    args: { label: "← Retour", icon: false },
};

export const CustomLabel: Story = {
    args: { label: "Retour à la liste" },
};
