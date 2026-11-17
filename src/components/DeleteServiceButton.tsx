"use client";

import type { FormEvent } from "react";

type DeleteServiceButtonProps = {
    action: (formData: FormData) => Promise<void>;
    serviceId: string;
};

export default function DeleteServiceButton({
    action,
    serviceId,
}: DeleteServiceButtonProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!window.confirm("Are you sure you want to delete this service?")) {
            event.preventDefault();
        }
    };

    return (
        <form action={action} onSubmit={handleSubmit} className="mt-2">
            <input type="hidden" name="serviceId" value={serviceId} />
            <button
                type="submit"
                className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
                Delete
            </button>
        </form>
    );
}
