import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InputMessage from "@/components/Ui/InputMessage";

const meta = {
    title: "Ui/InputMessage",
    component: InputMessage,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof InputMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: "Écrivez votre message…" },
};
