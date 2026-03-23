/** Un message individuel dans une conversation */
export interface Message {
    id: string;
    senderId: number;
    senderName: string;
    senderPicture: string | null;
    content: string;
    createdAt: string; // ISO date
}

/** Résumé d'une conversation (liste à gauche) */
export interface Conversation {
    id: string;
    /** L'autre participant */
    participant: {
        id: number;
        name: string;
        picture: string | null;
    };
    lastMessage: string;
    lastMessageAt: string; // ISO date
    unread: boolean;
}
