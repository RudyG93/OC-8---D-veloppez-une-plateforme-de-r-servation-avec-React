"use client";

import { useRef, type ComponentProps } from "react";
import SendIcon from "@/components/Icons/SendIcon";

const fieldBase =
    "w-full rounded-[4px] border border-light-gray bg-white px-[10px] py-[16px] text-sm text-black placeholder:text-dark-gray/50 outline-none focus:border-main-red transition-colors";

const actionButton =
    "shrink-0 flex items-center justify-center w-10 h-10 rounded-[10px] bg-main-red text-white hover:bg-dark-orange transition-colors cursor-pointer";

interface InputMessageProps extends Omit<ComponentProps<"textarea">, "onSubmit"> {
    onSubmit?: (message: string) => void;
}

export default function InputMessage({ onSubmit, ...props }: InputMessageProps) {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        const value = textRef.current?.value.trim();
        if (value) {
            onSubmit?.(value);
            if (textRef.current) textRef.current.value = "";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="relative">
            <textarea
                ref={textRef}
                onKeyDown={handleKeyDown}
                className={`${fieldBase} min-h-20 pr-14 resize-none rounded-[10px]`}
                {...props}
            />
            <button
                type="button"
                onClick={handleSend}
                className={`${actionButton} absolute bottom-3 right-3`}
                aria-label="Envoyer le message"
            >
                <SendIcon />
            </button>
        </div>
    );
}
