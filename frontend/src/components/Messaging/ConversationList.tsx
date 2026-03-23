"use client";

import Avatar from "@/components/Ui/Avatar";
import type { Conversation } from "@/types/message";

interface ConversationListProps {
    conversations: Conversation[];
    activeId: string | null;
    onSelect: (id: string) => void;
}

/** Liste des conversations avec indicateur de non-lu et sélection active. */
export default function ConversationList({
    conversations,
    activeId,
    onSelect,
}: ConversationListProps) {
    return (
        <ul className="divide-y divide-light-gray" role="listbox" aria-label="Conversations">
            {conversations.map((conv) => {
                const isActive = conv.id === activeId;
                const date = new Date(conv.lastMessageAt);
                const time = date.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                return (
                    <li key={conv.id} role="option" aria-selected={isActive}>
                        <button
                            type="button"
                            onClick={() => onSelect(conv.id)}
                            className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-light-gray/50 ${
                                isActive ? "bg-light-gray/60" : ""
                            }`}
                        >
                            <Avatar
                                src={conv.participant.picture}
                                alt={conv.participant.name}
                                size="md"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold">
                                    {conv.participant.name}
                                </p>
                                <p className="truncate text-xs text-dark-gray">
                                    {conv.lastMessage}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-xs text-dark-gray">{time}</span>
                                {conv.unread && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-main-red" aria-label="Non lu" />
                                )}
                            </div>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
