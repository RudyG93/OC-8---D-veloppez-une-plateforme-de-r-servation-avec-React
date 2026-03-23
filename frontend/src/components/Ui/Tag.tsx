interface TagProps {
    label: string;
    className?: string;
}

export default function Tag({ label, className = "" }: TagProps) {
    return (
        <span
            className={`flex w-full items-center justify-center rounded-[5px] bg-light-gray py-2 text-xs text-dark-gray md:text-sm ${className}`}
        >
            {label}
        </span>
    );
}
