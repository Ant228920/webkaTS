"use client";
import { useState, useEffect } from "react";
import { Participant } from "@/app/page";

interface Props {
    participant: Participant;
    onUpdate: (p: Participant) => void;
    onClose: () => void;
}

export default function EditModal({ participant, onUpdate, onClose }: Props) {
    const [form, setForm] = useState(participant);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Редагувати учасника</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="border rounded p-2"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <input
                        className="border rounded p-2"
                        placeholder="Birth Date"
                        type="date"
                        value={form.birthDate}
                        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Оновити дані
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
