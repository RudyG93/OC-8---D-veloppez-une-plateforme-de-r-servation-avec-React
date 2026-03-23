"use client";

import Avatar from "@/components/Ui/Avatar";

interface MessageBoxProps {
    senderName: string;
    senderPicture: string | null;
    content: string;
    time: string;
    /** true = message envoyé par l'utilisateur courant (aligné à droite) */
    isOwn?: boolean;
}

export default function MessageBox({
    senderName,
    senderPicture,
    content,
    time,
    isOwn = false,
}: MessageBoxProps) {
    return (
        <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
            <Avatar src={senderPicture} alt={senderName} size="sm" />

            <div className={`max-w-[70%] ${isOwn ? "text-right" : ""}`}>
                {/* En-tête : nom + heure */}
                <p className="mb-1 text-xs text-dark-gray">
                    {senderName}
                    <span className="mx-1">&bull;</span>
                    {time}
                </p>

                {/* Bulle */}
                <div
                    className={`inline-block rounded-[10px] px-4 py-3 text-sm ${
                        isOwn
                            ? "bg-main-red text-white"
                            : "border border-light-gray bg-white text-black"
                    }`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
