import type { ComponentProps, ReactNode } from "react";

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
    label: ReactNode;
}

export default function Checkbox({ label, id, className = "", ...props }: CheckboxProps) {
    return (
        <label htmlFor={id} className={`flex items-center gap-3 py-2 cursor-pointer ${className}`}>
            <input
                id={id}
                type="checkbox"
                className="peer hidden"
                {...props}
            />
            {/* Case : bordure grise → fond noir quand cochée. Le check blanc est toujours rendu mais invisible sur fond blanc. */}
            <span className="shrink-0 w-5 h-5 rounded border border-dark-gray/30 flex items-center justify-center peer-checked:bg-black peer-checked:border-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
            <span className="text-sm text-dark-gray">
                {label}
            </span>
        </label>
    );
}
