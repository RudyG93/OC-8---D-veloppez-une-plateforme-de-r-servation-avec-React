import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InputText from "@/components/Ui/InputText";

const meta = {
    title: "Ui/InputText",
    component: InputText,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: "Email", id: "email", type: "email", placeholder: "john@kasa.fr" },
};

export const Password: Story = {
    args: { label: "Mot de passe", id: "pass", type: "password", placeholder: "••••••••" },
};

export const WithoutLabel: Story = {
    args: { placeholder: "Rechercher…", type: "text" },
};
