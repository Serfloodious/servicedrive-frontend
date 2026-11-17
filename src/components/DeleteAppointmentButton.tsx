"use client";

import type { FormEvent } from "react";

type DeleteAppointmentButtonProps = {
    action: (formData: FormData) => Promise<void>;
    appointmentId: string;
};

export default function DeleteAppointmentButton({
    action,
    appointmentId,
}: DeleteAppointmentButtonProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) {
            event.preventDefault();
        }
    };

    return (
        <form action={action} onSubmit={handleSubmit} className="ml-2 inline-block">
            <input type="hidden" name="appointmentId" value={appointmentId} />
            <button
                type="submit"
                className="inline-block rounded-md bg-red-500 px-3 py-2 text-white! shadow-sm hover:bg-red-600"
            >
                Delete
            </button>
        </form>
    );
}
