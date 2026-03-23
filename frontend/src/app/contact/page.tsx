"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
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

/* ============================================================
   Composant interne (utilise useSearchParams)
   ============================================================ */

function ContactPageInner() {
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

        // Toujours passer par l'API pour obtenir/créer la conversation
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
                // Mettre à jour le lastMessage dans la liste
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
            <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                Chargement...
            </main>
        );
    }

    const activeMessages = activeConvId ? messagesByConv[activeConvId] ?? [] : [];

    return (
        <main className="mx-auto flex h-[calc(100vh-140px)] max-w-6xl overflow-hidden">
            {/* ---- Panneau gauche : liste des conversations ---- */}
            <aside
                className={`w-full shrink-0 flex-col border-r border-light-gray bg-white md:flex md:w-95 ${
                    activeConvId ? "hidden" : "flex"
                }`}
            >
                <div className="p-5">
                    <Link
                        href="/"
                        className="inline-block rounded-[10px] bg-light-gray px-4 py-2 text-sm text-dark-gray transition-colors hover:bg-dark-gray/10"
                    >
                        &larr; Retour
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold">Messages</h1>
                </div>

                <div className="flex-1 overflow-y-auto">
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
                className={`flex-1 flex-col bg-light-orange ${
                    activeConvId ? "flex" : "hidden md:flex"
                }`}
            >
                {activeConvId ? (
                    <>
                        {/* Bouton retour mobile */}
                        <div className="border-b border-light-gray p-3 md:hidden">
                            <button
                                type="button"
                                onClick={() => setActiveConvId(null)}
                                className="rounded-[10px] bg-light-gray px-4 py-2 text-sm text-dark-gray"
                            >
                                &larr; Retour
                            </button>
                        </div>
                        <ChatView
                            messages={activeMessages}
                            currentUserId={currentUserId}
                            onSend={handleSend}
                        />
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-dark-gray">
                        Sélectionnez une conversation
                    </div>
                )}
            </section>
        </main>
    );
}

/* ============================================================
   Page wrapper (Suspense requis pour useSearchParams)
   ============================================================ */

export default function ContactPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[60vh] items-center justify-center text-dark-gray">
                    Chargement...
                </main>
            }
        >
            <ContactPageInner />
        </Suspense>
    );
}
