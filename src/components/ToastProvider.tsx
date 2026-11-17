"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";

const toastMessages: Record<string, string> = {
    "service-added": "Service added successfully",
    "service-updated": "Service updated successfully",
    "service-deleted": "Service deleted successfully",
    "appointment-added": "Appointment added successfully",
    "appointment-updated": "Appointment updated successfully",
    "appointment-deleted": "Appointment deleted successfully",
};

function ToastQueryHandler() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const toastKey = searchParams.get("toast");
        if (!toastKey) return;

        const message = toastMessages[toastKey];
        if (message) {
            toast.success(message);
        }

        const nextSearchParams = new URLSearchParams(searchParams.toString());
        nextSearchParams.delete("toast");
        const query = nextSearchParams.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
    }, [pathname, router, searchParams]);

    return null;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster position="top-right" richColors closeButton />
            <Suspense fallback={null}>
                <ToastQueryHandler />
            </Suspense>
        </>
    );
}
