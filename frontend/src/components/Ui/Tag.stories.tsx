import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Tag from "@/components/Ui/Tag";

const meta = {
    title: "Ui/Tag",
    component: Tag,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: "Appartement" },
    decorators: [(Story) => <div style={{ width: 150 }}><Story /></div>],
};

export const LongLabel: Story = {
    args: { label: "Paris 10e arrondissement" },
    decorators: [(Story) => <div style={{ width: 150 }}><Story /></div>],
};

export const Grid: Story = {
    args: { label: "Appartement" },
    render: () => (
        <div className="grid grid-cols-3 gap-2" style={{ width: 480 }}>
            <Tag label="Appartement" />
            <Tag label="Standing" />
            <Tag label="Paris 10e" />
            <Tag label="Wi-Fi" />
            <Tag label="Parking" />
            <Tag label="Piscine" />
        </div>
    ),
};
