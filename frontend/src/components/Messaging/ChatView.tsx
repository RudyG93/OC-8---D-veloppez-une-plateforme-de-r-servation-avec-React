"use client";

import { useRef, useEffect } from "react";
import MessageBox from "@/components/Ui/MessageBox";
import InputMessage from "@/components/Ui/InputMessage";
import type { Message } from "@/types/message";

interface ChatViewProps {
    messages: Message[];
    currentUserId: number;
    onSend: (content: string) => void;
}

/** Regroupe les messages par date (ex: "03 Septembre 2025") */
function groupByDate(messages: Message[]) {
    const groups: { date: string; messages: Message[] }[] = [];

    for (const msg of messages) {
        const dateLabel = new Date(msg.createdAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const last = groups[groups.length - 1];
        if (last && last.date === dateLabel) {
            last.messages.push(msg);
        } else {
            groups.push({ date: dateLabel, messages: [msg] });
        }
    }

    return groups;
}

export default function ChatView({ messages, currentUserId, onSend }: ChatViewProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const groups = groupByDate(messages);

    return (
        <div className="flex h-full flex-col">
            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {groups.map((group) => (
                    <div key={group.date}>
                        {/* Séparateur de date */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="flex-1 border-t border-light-gray" />
                            <span className="text-xs text-dark-gray">{group.date}</span>
                            <div className="flex-1 border-t border-light-gray" />
                        </div>

                        {/* Messages du groupe */}
                        <div className="space-y-5">
                            {group.messages.map((msg) => {
                                const time = new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                    <MessageBox
                                        key={msg.id}
                                        senderName={msg.senderName}
                                        senderPicture={msg.senderPicture}
                                        content={msg.content}
                                        time={time}
                                        isOwn={msg.senderId === currentUserId}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Zone de saisie */}
            <div className="border-t border-light-gray p-4">
                <InputMessage
                    placeholder="Envoyer un message"
                    onSubmit={onSend}
                />
            </div>
        </div>
    );
}
