"use client";
import { useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
    message: string;
    type?: ToastType;
    id: string;
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = (message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, message, type };
        setToasts((prev) => [...prev, newToast]);

        // авто-закриття через 3 сек
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { toasts, showToast, removeToast };
}
