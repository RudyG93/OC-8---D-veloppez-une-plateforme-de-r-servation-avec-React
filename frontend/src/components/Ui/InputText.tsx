import type { ComponentProps } from "react";

const fieldBase =
    "w-full rounded-[4px] border border-light-gray bg-white px-[10px] py-[16px] text-sm text-black placeholder:text-dark-gray/50 outline-none focus:border-main-red transition-colors";

/** Props du champ texte. Hérite des props <input> natives (hors type). */
interface InputTextProps extends Omit<ComponentProps<"input">, "type"> {
    label?: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

/** Champ de saisie réutilisable avec label optionnel et style unifié. */
export default function InputText({ label, id, ...props }: InputTextProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-black">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`${fieldBase} h-10`}
                {...props}
            />
        </div>
    );
}
