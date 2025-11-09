"use client";
import Toast from "./Toast";
import { ToastData } from "@/useToast";

interface Props {
    toasts: ToastData[];
    onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: Props) {
    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col items-end">
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    message={t.message}
                    type={t.type}
                    onClose={() => onClose(t.id)}
                />
            ))}
        </div>
    );
}
