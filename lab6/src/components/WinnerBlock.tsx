"use client";
import { Participant } from "@/app/page";
import Button from "@/components/Button";

interface Props {
    winners: Participant[];
    onNewWinner: () => void;
    onRemove: (id: string) => void;
    participantsCount: number;
}

export default function WinnersBlock({ winners, onNewWinner, onRemove, participantsCount }: Props) {
    // const disabled = winners.length >= 3 || participantsCount === 0;
    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Winners</h2>
            <div className="flex flex-wrap gap-3 mb-4">
                {winners.map(w => (
                    <div key={w.id} className="bg-green-100 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span>{w.name}</span>
                        <Button onClick={() => onRemove(w.id)} color="danger" text={"x"}></Button>
                    </div>
                ))}
            </div>
            <Button
                onClick={onNewWinner}
                color="primary"
                text={"New winner"}>
            </Button>
        </div>
    );
}
