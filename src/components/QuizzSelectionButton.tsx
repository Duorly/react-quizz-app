interface QuizzSelectionButtonProps {
    label: string;
    onClick: () => void;
    bgColorClass?: string;
    textColorClass?: string;
}

export const QuizzSelectionButton: React.FC<QuizzSelectionButtonProps> = ({
    label,
    onClick,
    bgColorClass = "bg-gray-200",
    textColorClass = "text-black",
}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full sm:w-auto flex-1 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32
                       py-4 sm:py-5 md:py-6
                       ${bgColorClass} ${textColorClass} rounded shadow-lg
                       hover:scale-105 active:scale-95 transition-transform
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px]`}
            style={{
                fontFamily: "'Jomhuria', cursive",
            }}
        >
            {label}
        </button>
    );
};