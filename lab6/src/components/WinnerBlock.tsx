"use client";
import { Participant } from "@/app/page";

interface Props {
    winners: Participant[];
    onNewWinner: () => void;
    onRemove: (id: string) => void;
    participantsCount: number;
}

export default function WinnersBlock({ winners, onNewWinner, onRemove, participantsCount }: Props) {
    const disabled = winners.length >= 3 || participantsCount === 0;
    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Winners</h2>
            <div className="flex flex-wrap gap-3 mb-4">
                {winners.map(w => (
                    <div key={w.id} className="bg-green-100 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span>{w.name}</span>
                        <button onClick={() => onRemove(w.id)} className="text-red-600 hover:underline">x</button>
                    </div>
                ))}
            </div>
            <button
                onClick={onNewWinner}
                disabled={disabled}
                className={`px-4 py-2 rounded text-white ${disabled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
                New winner
            </button>
        </div>
    );
}
