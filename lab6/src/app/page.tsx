"use client";

import { useState, useEffect } from "react";
import RegistrationForm from "../components/RegisrationForm";
import ParticipantsTable from "../components/ParticipantsTable";
import WinnersBlock from "../components/WinnerBlock";
import EditModal from "../components/editModal";
import ConfirmDeleteModal from "../components/deleteModal";
import { useToast } from "@/useToast";
import ToastContainer from "@/components/ToastContainer";
import SearchBar from "@/components/SearchBar";

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

export default function HomePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Participant[]>([]);
  const [editing, setEditing] = useState<Participant | null>(null);
  const [deleting, setDeleting] = useState<Participant | null>(null);
  const { toasts, showToast, removeToast } = useToast();
  const [filter, setFilter] = useState("");

  // ✅ 1. Завантаження учасників із localStorage при старті
  useEffect(() => {
    const saved = localStorage.getItem("participants");
    if (saved) {
      try {
        setParticipants(JSON.parse(saved));
      } catch {
        console.error("Помилка при читанні localStorage");
      }
    }
  }, []);

  // ✅ 2. Збереження у localStorage при кожній зміні списку
  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(participants));
  }, [participants]);

  // ✅ Додавання нового учасника
  const addParticipant = (participant: Participant) => {
    // Перевірка на унікальний email
    if (participants.some((p) => p.email === participant.email)) {
      showToast("❌ Учасник із такою електронною поштою вже існує!", "success");
      return;
    }
    setParticipants([...participants, participant]);
  };

  // ✅ Видалення учасника
  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Оновлення після редагування
  const updateParticipant = (updated: Participant) => {
    setParticipants((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // ✅ Генерація нового переможця
  const newWinner = () => {
    if (participants.length === 0 || winners.length >= 3) return;
    const random = participants[Math.floor(Math.random() * participants.length)];
    if (!winners.find((w) => w.id === random.id)) {
      setWinners([...winners, random]);
    }
  };

  // ✅ Видалення переможця
  const removeWinner = (id: string) => {
    setWinners((prev) => prev.filter((w) => w.id !== id));
  };

  const filteredParticipants = participants.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
  );
  // ✅ Відкрити модалку редагування
  const handleEdit = (participant: Participant) => setEditing(participant);

  // ✅ Відкрити модалку видалення
  const handleDeleteConfirm = (participant: Participant) => setDeleting(participant);

  // ✅ Закрити модалки
  const closeEdit = () => setEditing(null);
  const closeDelete = () => setDeleting(null);

  return (
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center">🎟 Lottery App</h1>

        {/* Блок переможців */}
        <WinnersBlock
            winners={winners}
            onNewWinner={newWinner}
            onRemove={removeWinner}
            participantsCount={participants.length}
        />

        {/* Форма реєстрації */}
        <RegistrationForm onAdd={addParticipant} />

        {/* Таблиця учасників */}
        <SearchBar onFilter={setFilter} />
        <ParticipantsTable
            participants={filteredParticipants}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
        />

        {/* ✅ Модалка редагування */}
        {editing && (
            <EditModal
                participant={editing}
                onUpdate={(updated) => {
                  updateParticipant(updated);
                  closeEdit();
                }}
                onClose={closeEdit}
            />
        )}

        {/* ✅ Модалка підтвердження видалення */}
        {deleting && (
            <ConfirmDeleteModal
                participant={deleting}
                onConfirm={() => {
                  removeParticipant(deleting.id);
                  closeDelete();
                }}
                onClose={closeDelete}
            />
        )}
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </main>
  );
}
