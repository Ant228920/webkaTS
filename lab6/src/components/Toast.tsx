"use client";
import { useEffect } from "react";
import { ToastType } from "@/useToast";

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type = "info", onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    return (
        <div
            className={`${colors[type]} text-white px-4 py-2 rounded-lg shadow-md mb-2 transition-all duration-300`}
        >
            {message}
        </div>
    );
}
