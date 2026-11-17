import { AppointmentJson } from "../../interface";

export const MAX_FUTURE_APPOINTMENTS = 3;

export function getFutureAppointmentCount(appointmentsJson: AppointmentJson): number {
    const now = Date.now();

    return appointmentsJson.data.filter((appointment) => {
        const startsAt = new Date(
            `${appointment.appointmentDate.slice(0, 10)}T${appointment.startTime}:00.000Z`,
        ).getTime();

        return startsAt >= now;
    }).length;
}
