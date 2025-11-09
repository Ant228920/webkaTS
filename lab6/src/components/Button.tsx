"use client";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    color?: "primary" | "danger" | "secondary";
}

export default function Button({ text, onClick, type = "button", color = "primary" }: ButtonProps) {
    const base = "px-4 py-2 rounded font-semibold transition";
    const styles =
        color === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : color === "danger"
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-black hover:bg-gray-400";

    return (
        <button type={type} onClick={onClick} className={`${base} ${styles}`}>
            {text}
        </button>
    );
}
