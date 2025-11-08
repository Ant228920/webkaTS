"use client";
import { Participant } from "@/app/page";

interface Props {
    participants: Participant[];
    onDelete: (id: string) => void;
}

export default function ParticipantsTable({ participants, onDelete }: Props) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Participants</h2>
            {participants.length === 0 ? (
                <p className="text-gray-500">No participants yet</p>
            ) : (
                <table className="w-full text-left border">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Birth Date</th>
                        <th className="p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.email}</td>
                            <td className="p-2">{p.phone}</td>
                            <td className="p-2">{p.birthDate}</td>
                            <td className="p-2">
                                <button onClick={() => onDelete(p.id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
