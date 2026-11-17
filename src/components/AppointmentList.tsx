import { AppointmentJson } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteAppointmentButton from "./DeleteAppointmentButton";
import FutureQuotaIndicator from "./FutureQuotaIndicator";
import { getFutureAppointmentCount, MAX_FUTURE_APPOINTMENTS } from "@/libs/getFutureAppointmentCount";

export default async function AppointmentList({
    appointmentsJson,
    showQuota,
}: {
    appointmentsJson: Promise<AppointmentJson>;
    showQuota: boolean;
}) {

    const readyAppointmentsJson = await appointmentsJson;
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const futureAppointmentCount = getFutureAppointmentCount(readyAppointmentsJson);
    const hasFutureQuota = futureAppointmentCount < MAX_FUTURE_APPOINTMENTS;

    const getNewDateString = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    }

    const deleteAppointment = async (formData: FormData) => {
        "use server";

        const appointmentId = formData.get("appointmentId");
        if (typeof appointmentId !== "string" || !appointmentId) {
            throw new Error("Appointment ID is required");
        }

        const response = await fetch(`http://localhost:5000/api/v1/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete appointment");
        }

        redirect("/appointments?toast=appointment-deleted");
    };

    return (
        <>
            {showQuota && <FutureQuotaIndicator used={futureAppointmentCount} />}
            <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    readyAppointmentsJson.count > 0 ? readyAppointmentsJson.data.map((item) => (
                        <div className="w-full rounded bg-slate-200 px-5 py-2" key={item._id}>
                            <div className="text-xl"><b>{item.name}</b></div>
                            <div className="text-sm"><b>Registration-Number: </b>{item.registrationNumber}</div>
                            <div className="text-sm"><b>Brand: </b>{item.brand}</div>
                            <div className="text-sm"><b>Model: </b>{item.model}</div>
                            <div className="text-sm"><b>Appointment-Date: </b>{getNewDateString(item.appointmentDate)}</div>
                            <div className="text-sm"><b>Start-Time: </b>{item.startTime}</div>
                            <Link href={`/appointments/${item._id}/edit`} 
                             className="inline-block rounded-md bg-amber-500 px-3 py-2 text-white! shadow-sm hover:bg-amber-600"
                            >
                                Edit
                            </Link>
                            <DeleteAppointmentButton
                                action={deleteAppointment}
                                appointmentId={item._id}
                            />
                        </div>
                    ))
                    : <div className="col-span-full text-center text-lg">No Service Appointment</div>
                }
            </div>
            {
                session.user.role === "member" ?
                <div className="flex justify-center">
                    {hasFutureQuota ? (
                        <Link
                            href="/appointments/add"
                            className="inline-block rounded-md bg-sky-600 px-3 py-2 text-white! shadow-sm hover:bg-indigo-600"
                        >
                            Add Appointment
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-md bg-gray-400 px-3 py-2 text-white! shadow-sm"
                        >
                            Add Appointment
                        </button>
                    )}
                </div>
                : null
            }
        </>
    )
}