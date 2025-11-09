"use client";
import { useState } from "react";
import { Participant } from "@/app/page";
import InputField from "@/components/InputField";

interface Props {
    onAdd: (p: Participant) => void;
}

export default function RegistrationForm({ onAdd }: Props) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", birthDate: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = "Invalid email";
        if (!/^\+?\d{10,15}$/.test(form.phone)) newErrors.phone = "Invalid phone";
        if (!form.birthDate) newErrors.birthDate = "Date required";
        else if (new Date(form.birthDate) > new Date()) newErrors.birthDate = "Cannot be in future";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onAdd({ ...form, id: crypto.randomUUID() });
        setForm({ name: "", email: "", phone: "", birthDate: "" });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">Register new participant</h2>
            <InputField  label="Name" placeholder="Name"
                   value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <InputField label="Email" placeholder="Email"
                   value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <InputField label="Phone" placeholder="Phone"
                   value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <InputField type="date" label="Date"
                   value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
            </button>
        </form>
    );
}
