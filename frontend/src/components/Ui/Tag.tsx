interface TagProps {
    label: string;
    className?: string;
}

export default function Tag({ label, className = "" }: TagProps) {
    return (
        <span
            className={`block w-full truncate rounded-[5px] bg-light-gray px-2 py-2 text-center text-xs text-dark-gray md:text-sm ${className}`}
        >
            {label}
        </span>
    );
}
