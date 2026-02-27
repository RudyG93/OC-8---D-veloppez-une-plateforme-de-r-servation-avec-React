import type { ComponentProps } from "react";

const fieldBase =
    "w-full rounded-[4px] border border-light-gray bg-white px-[10px] py-[16px] text-sm text-black placeholder:text-dark-gray/50 outline-none focus:border-main-red transition-colors";

interface InputTextareaProps extends ComponentProps<"textarea"> {
    label?: string;
}

export default function InputTextarea({ label, id, ...props }: InputTextareaProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-black">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={`${fieldBase} min-h-25 resize-y`}
                {...props}
            />
        </div>
    );
}
