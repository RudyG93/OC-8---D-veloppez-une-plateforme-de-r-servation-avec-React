import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Collapse from "@/components/Ui/Collapse";

const meta = {
    title: "Ui/Collapse",
    component: Collapse,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenByDefault: Story = {
    args: {
        title: "Description",
        defaultOpen: true,
        children: "Logement spacieux avec vue sur la mer, idéal pour des vacances en famille.",
    },
};

export const Closed: Story = {
    args: {
        title: "Équipements",
        defaultOpen: false,
        children: "Cuisine équipée, Wi-Fi, Parking, Piscine",
    },
};
