import { apiFetch, authHeaders } from '@/lib/api';
import type { Conversation, Message } from '@/types/message';

/**
 * Liste les conversations de l'utilisateur connecté
 */
export async function getConversations(): Promise<Conversation[]> {
    return apiFetch<Conversation[]>('/api/conversations', {
        headers: authHeaders(),
    });
}

/**
 * Récupère ou crée une conversation avec un participant
 */
export async function getOrCreateConversation(participantId: number): Promise<{
    id: string;
    participant: { id: number; name: string; picture: string | null };
}> {
    return apiFetch('/api/conversations', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ participant_id: participantId }),
    });
}

/**
 * Liste les messages d'une conversation
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
    return apiFetch<Message[]>(`/api/conversations/${conversationId}/messages`, {
        headers: authHeaders(),
    });
}

/**
 * Envoie un message dans une conversation
 */
export async function sendMessage(conversationId: string, content: string): Promise<Message> {
    return apiFetch<Message>(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ content }),
    });
}
