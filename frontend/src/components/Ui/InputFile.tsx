"use client";

import { useRef, useState } from "react";
import PlusIcon from "@/components/Icons/PlusIcon";

const fieldBase =
    "w-full rounded-[4px] border border-light-gray bg-white px-[10px] py-[16px] text-sm text-black placeholder:text-dark-gray/50 outline-none focus:border-main-red transition-colors";

const actionButton =
    "shrink-0 flex items-center justify-center w-10 h-10 rounded-[10px] bg-main-red text-white hover:bg-dark-orange transition-colors cursor-pointer";

interface InputFileProps {
    label?: string;
    id?: string;
    accept?: string;
    altLabel?: string;
    onChange?: (file: File | null) => void;
}

export default function InputFile({ label, id, accept = "image/*", altLabel = "Ou choisir un fichier", onChange }: InputFileProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleChange = () => {
        const file = fileRef.current?.files?.[0] ?? null;
        setFileName(file?.name ?? "");
        onChange?.(file);
    };

    const openPicker = () => fileRef.current?.click();

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-black">
                    {label}
                </label>
            )}
            <div className="flex items-center gap-2">
                <div
                    onClick={openPicker}
                    className={`${fieldBase} h-10 flex items-center cursor-pointer truncate ${fileName ? "text-black" : "text-dark-gray/50"}`}
                >
                    {fileName}
                </div>
                <button type="button" onClick={openPicker} className={actionButton} aria-label="Ajouter un fichier">
                    <PlusIcon />
                </button>
            </div>
            <button type="button" onClick={openPicker} className="self-start text-xs text-main-red hover:text-dark-orange underline transition-colors cursor-pointer">
                {altLabel}
            </button>
            <input
                ref={fileRef}
                id={id}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}
