"use client";
import { useState, useEffect } from "react";
import { Participant } from "@/app/page";
import Button from "./Button";
import { ArrowDownAZ, ArrowUpAZ, Calendar } from "lucide-react";

interface Props {
    participants: Participant[];
    onDelete: (p: Participant) => void;
    onEdit: (p: Participant) => void;
}

export default function ParticipantsTable({ participants, onDelete, onEdit }: Props) {
    const [sortField, setSortField] = useState<"name" | "birthDate">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // ✅ автоматичне сортування за іменем при першому рендері
    useEffect(() => {
        setSortField("name");
        setSortOrder("asc");
    }, []);

    const toggleSort = (field: "name" | "birthDate") => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedParticipants = [...participants].sort((a, b) => {
        const valA = a[sortField].toLowerCase();
        const valB = b[sortField].toLowerCase();
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">📋 Список учасників</h2>

                {/* Панель сортування */}
                <div className="flex gap-3">
                    {/* Кнопка сортування за іменем */}
                    <button
                        onClick={() => toggleSort("name")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                            sortField === "name"
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                        }`}
                    >
                        {sortField === "name" && sortOrder === "asc" ? (
                            <ArrowDownAZ size={20} />
                        ) : (
                            <ArrowUpAZ size={20} />
                        )}
                        <span>Сортувати за ім’ям</span>
                    </button>

                    {/* Кнопка сортування за датою */}
                    <button
                        onClick={() => toggleSort("birthDate")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                            sortField === "birthDate"
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                        }`}
                    >
                        <Calendar size={20} />
                        <span>Сортувати за датою</span>
                    </button>
                </div>
            </div>

            {participants.length === 0 ? (
                <p className="text-gray-500">Поки що немає учасників</p>
            ) : (
                <table className="w-full text-left border">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="p-2">Ім’я</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Телефон</th>
                        <th className="p-2">Дата народження</th>
                        <th className="p-2">Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedParticipants.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                            <td className="p-2 font-medium">{p.name}</td>
                            <td className="p-2">{p.email}</td>
                            <td className="p-2">{p.phone}</td>
                            <td className="p-2">{p.birthDate}</td>
                            <td className="p-2 flex gap-2">
                                <Button text="Редагувати" color="secondary" onClick={() => onEdit(p)} />
                                <Button text="Видалити" color="danger" onClick={() => onDelete(p)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
