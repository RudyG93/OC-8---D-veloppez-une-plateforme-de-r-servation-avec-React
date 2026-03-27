import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ConversationList from "@/components/Messaging/ConversationList";

const CONVERSATIONS = [
    {
        id: "1",
        participant: { id: 1, name: "Marie Dupont", picture: null },
        lastMessage: "Le logement est disponible ce week-end ?",
        lastMessageAt: new Date().toISOString(),
        unread: true,
    },
    {
        id: "2",
        participant: { id: 2, name: "Jean Martin", picture: null },
        lastMessage: "Merci pour votre réponse rapide !",
        lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
        unread: false,
    },
];

const meta = {
    title: "Components/ConversationList",
    component: ConversationList,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        conversations: CONVERSATIONS,
        activeId: null,
        onSelect: () => {},
    },
};

export const WithActive: Story = {
    args: {
        conversations: CONVERSATIONS,
        activeId: "1",
        onSelect: () => {},
    },
};

export const Empty: Story = {
    args: {
        conversations: [],
        activeId: null,
        onSelect: () => {},
    },
};
