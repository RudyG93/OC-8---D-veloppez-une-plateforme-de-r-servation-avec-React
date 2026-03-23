import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "@/components/Ui/Button";

const meta = {
    title: "Ui/Button",
    component: Button,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fit: Story = {
    args: { variant: "fit", children: "Rechercher" },
};

export const Full: Story = {
    args: { variant: "full", children: "Contacter l'hôte" },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const AsLink: Story = {
    args: { variant: "fit", children: "Voir le logement", href: "#" },
};
