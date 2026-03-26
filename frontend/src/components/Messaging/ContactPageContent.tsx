"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
    getConversations,
    getOrCreateConversation,
    getMessages,
    sendMessage as apiSendMessage,
} from "@/api/messages";
import ConversationList from "@/components/Messaging/ConversationList";
import ChatView from "@/components/Messaging/ChatView";
import type { Conversation, Message } from "@/types/message";

export default function ContactPageContent() {
    const { user, isLoading } = useRequireAuth();

    const searchParams = useSearchParams();
    const hostId = searchParams.get("hostId");

    const currentUserId = user?.id ?? 0;

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>({});
    const [loadingConvs, setLoadingConvs] = useState(true);
    const hostHandledRef = useRef(false);

    const loadMessages = useCallback(async (convId: string) => {
        try {
            const msgs = await getMessages(convId);
            setMessagesByConv((prev) => ({ ...prev, [convId]: msgs }));
        } catch {
            // silently fail
        }
    }, []);

    // Charger les conversations depuis l'API
    useEffect(() => {
        if (isLoading || !user) return;

        getConversations()
            .then((convs) => {
                setConversations(convs);
                setLoadingConvs(false);
            })
            .catch(() => {
                setLoadingConvs(false);
            });
    }, [isLoading, user]);

    // Si on arrive avec ?hostId=X, ouvrir/créer la conversation avec l'hôte
    useEffect(() => {
        if (hostHandledRef.current || !hostId || isLoading || !user || loadingConvs) return;

        hostHandledRef.current = true;
        const participantId = Number(hostId);

        getOrCreateConversation(participantId)
            .then(async (conv) => {
                setConversations((prev) => {
                    const exists = prev.some((c) => c.id === conv.id);
                    if (exists) return prev;
                    const newConv: Conversation = {
                        id: conv.id,
                        participant: conv.participant,
                        lastMessage: "",
                        lastMessageAt: new Date().toISOString(),
                        unread: false,
                    };
                    return [newConv, ...prev];
                });
                setActiveConvId(conv.id);
                await loadMessages(conv.id);
            })
            .catch(() => {
                // silently fail
            });
    }, [hostId, isLoading, user, loadingConvs, loadMessages]);

    const selectConversation = useCallback(
        (id: string) => {
            setActiveConvId(id);
            loadMessages(id);
        },
        [loadMessages],
    );

    const handleSend = useCallback(
        async (content: string) => {
            if (!activeConvId) return;
            try {
                const newMsg = await apiSendMessage(activeConvId, content);
                setMessagesByConv((prev) => ({
                    ...prev,
                    [activeConvId]: [...(prev[activeConvId] ?? []), newMsg],
                }));
                setConversations((prev) =>
                    prev.map((c) =>
                        c.id === activeConvId
                            ? {
                                  ...c,
                                  lastMessage: content.length > 40 ? content.slice(0, 40) + "..." : content,
                                  lastMessageAt: new Date().toISOString(),
                              }
                            : c,
                    ),
                );
            } catch {
                // silently fail
            }
        },
        [activeConvId],
    );

    if (isLoading || loadingConvs) {
        return (
            <main className="flex flex-1 items-center justify-center text-dark-gray">
                Chargement...
            </main>
        );
    }

    const activeMessages = activeConvId ? messagesByConv[activeConvId] ?? [] : [];

    return (
        <main className="mx-auto mt-0 flex max-w-6xl w-full overflow-hidden bg-white h-[calc(100dvh-140px)] md:mt-5 md:h-[calc(100dvh-192px)]">
            {/* ---- Panneau gauche : liste des conversations ---- */}
            <aside
                className={`w-full shrink-0 flex-col border-r border-light-gray bg-white md:flex md:w-95 ${
                    activeConvId ? "hidden" : "flex"
                }`}
            >
                <div className="shrink-0 p-5">
                    <Link
                        href="/"
                        className="inline-block rounded-[10px] bg-light-gray px-4 py-2 text-sm text-dark-gray transition-colors hover:bg-dark-gray/10"
                    >
                        &larr; Retour
                    </Link>
                    <h1 className="mt-4 text-4xl font-medium">Messages</h1>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto bg-white">
                    {conversations.length === 0 ? (
                        <p className="px-5 py-8 text-center text-sm text-dark-gray">
                            Aucune conversation pour le moment.
                        </p>
                    ) : (
                        <ConversationList
                            conversations={conversations}
                            activeId={activeConvId}
                            onSelect={selectConversation}
                        />
                    )}
                </div>
            </aside>

            {/* ---- Panneau droit : chat ---- */}
            <section
                className={`min-h-0 flex-1 flex-col ${
                    activeConvId ? "flex" : "hidden md:flex"
                }`}
            >
                {activeConvId ? (
                    <div className="flex flex-1 min-h-0 flex-col">
                        {/* Bouton retour mobile → retour liste contacts */}
                        <div className="shrink-0 bg-white p-3 md:hidden">
                            <button
                                type="button"
                                onClick={() => setActiveConvId(null)}
                                className="rounded-[10px] bg-light-gray px-4 py-2 text-sm text-dark-gray cursor-pointer"
                            >
                                &larr; Retour
                            </button>
                        </div>
                        <div className="flex-1 min-h-0 bg-light-orange">
                            <ChatView
                                messages={activeMessages}
                                currentUserId={currentUserId}
                                onSend={handleSend}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-1 items-center justify-center bg-light-orange text-dark-gray">
                        Sélectionnez une conversation
                    </div>
                )}
            </section>
        </main>
    );
}
