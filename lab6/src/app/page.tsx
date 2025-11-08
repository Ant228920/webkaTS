"use client";
import { useState } from "react";
import RegistrationForm from "../components/RegisrationForm";
import ParticipantsTable from "../components/ParticipantsTable";
import WinnersBlock from "../components/WinnerBlock";

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

  const addParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const newWinner = () => {
    if (participants.length === 0 || winners.length >= 3) return;
    const random = participants[Math.floor(Math.random() * participants.length)];
    if (!winners.find(w => w.id === random.id)) {
      setWinners([...winners, random]);
    }
  };

  const removeWinner = (id: string) => {
    setWinners(winners.filter(w => w.id !== id));
  };

  return (
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center">🎟 Lottery App</h1>
        <WinnersBlock winners={winners} onNewWinner={newWinner} onRemove={removeWinner} participantsCount={participants.length} />
        <RegistrationForm onAdd={addParticipant} />
        <ParticipantsTable participants={participants} onDelete={removeParticipant} />
      </main>
  );
}
