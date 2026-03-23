import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Checkbox from "@/components/Ui/Checkbox";

const meta = {
    title: "Ui/Checkbox",
    component: Checkbox,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    args: { label: "J'accepte les conditions générales", id: "cgu" },
};

export const Checked: Story = {
    args: { label: "Se souvenir de moi", id: "remember", defaultChecked: true },
};
