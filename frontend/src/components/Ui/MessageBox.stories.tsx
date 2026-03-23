import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MessageBox from "@/components/Ui/MessageBox";

const meta = {
    title: "Ui/MessageBox",
    component: MessageBox,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof MessageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Received: Story = {
    args: {
        senderName: "Marie Dupont",
        senderPicture: null,
        content: "Bonjour, le logement est-il disponible le week-end prochain ?",
        time: "14:32",
        isOwn: false,
    },
};

export const Sent: Story = {
    args: {
        senderName: "Vous",
        senderPicture: null,
        content: "Oui, il est disponible ! Je vous envoie les détails.",
        time: "14:35",
        isOwn: true,
    },
};
