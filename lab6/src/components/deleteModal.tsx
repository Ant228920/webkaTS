"use client";
import { useEffect } from "react";
import { Participant } from "@/app/page";

interface Props {
    participant: Participant;
    onConfirm: () => void;
    onClose: () => void;
}

export default function DeleteModal({ participant, onConfirm, onClose }: Props) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
                <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
                    Підтвердження видалення
                </h2>
                <p className="text-center mb-6">
                    Ви дійсно бажаєте видалити{" "}
                    <span className="font-semibold">{participant.name}</span> (
                    <span className="text-gray-600">{participant.email}</span>)?
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Ні
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Так
                    </button>
                </div>
            </div>
        </div>
    );
}
