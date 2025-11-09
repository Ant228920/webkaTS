"use client";

interface Props {
    onFilter: (text: string) => void;
}

export default function SearchBar({ onFilter }: Props) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 flex items-center">
            <input
                type="text"
                placeholder="🔍 Пошук за іменем..."
                onChange={(e) => onFilter(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
        </div>
    );
}
