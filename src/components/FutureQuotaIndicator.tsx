import { MAX_FUTURE_APPOINTMENTS } from "@/libs/getFutureAppointmentCount";

export default function FutureQuotaIndicator({ used }: { used: number }) {
    const remaining = Math.max(MAX_FUTURE_APPOINTMENTS - used, 0);
    const percentage = Math.min((used / MAX_FUTURE_APPOINTMENTS) * 100, 100);
    const isFull = remaining === 0;

    return (
        <section
            aria-label="Future appointment quota"
            className={`mx-4 mt-4 rounded-lg border p-4 ${
                isFull
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-blue-200 bg-blue-50 text-blue-800"
            }`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>
                    You have used {Math.min(used, MAX_FUTURE_APPOINTMENTS)} / {MAX_FUTURE_APPOINTMENTS} future appointment slots
                </strong>
                <span>
                    {isFull ? "No future appointment slots remaining" : `${remaining} slot${remaining === 1 ? "" : "s"} remaining`}
                </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
                <div
                    className={`h-full rounded-full ${isFull ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {isFull && (
                <p className="mt-2 text-sm">
                    Wait for a future appointment to pass or delete an existing appointment before booking a new one.
                </p>
            )}
        </section>
    );
}
