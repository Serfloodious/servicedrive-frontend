import { AppointmentJson } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AppointmentList({appointmentsJson}: {appointmentsJson: Promise<AppointmentJson>}) {

    const readyAppointmentsJson = await appointmentsJson;
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

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

        revalidatePath("/appointments");
    };

    return (
        <>
            <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {
                    readyAppointmentsJson.count > 0 ? readyAppointmentsJson.data.map((appointmentItem) => (
                        <div className="w-full rounded bg-slate-200 px-5 py-2" key={appointmentItem._id}>
                            <div className="text-xl"><b>{appointmentItem.name}</b></div>
                            <div className="text-sm"><b>Registration-Number: </b>{appointmentItem.registrationNumber}</div>
                            <div className="text-sm"><b>Brand: </b>{appointmentItem.brand}</div>
                            <div className="text-sm"><b>Model: </b>{appointmentItem.model}</div>
                            <div className="text-sm"><b>Appointment-Date: </b>{appointmentItem.appointmentDate}</div>
                            <div className="text-sm"><b>Start-Time: </b>{appointmentItem.startTime}</div>
                            <Link href={`/appointments/${appointmentItem._id}/edit`} 
                             className="inline-block rounded-md bg-amber-500 px-3 py-2 text-white! shadow-sm hover:bg-amber-600"
                            >
                                Edit
                            </Link>
                            <form action={deleteAppointment} className="ml-2 inline-block">
                                <input type="hidden" name="appointmentId" value={appointmentItem._id} />
                                <button
                                    type="submit"
                                    className="inline-block rounded-md bg-red-500 px-3 py-2 text-white! shadow-sm hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))
                    : <div className="text-sm text-center">No Service Appointment</div>
                }
            </div>
            {
                session.user.role === "member" ?
                <div className="flex justify-center">
                    <Link href="/appointments/add"
                     className="inline-block rounded-md bg-sky-600 px-3 py-2 text-white! shadow-sm hover:bg-indigo-600"
                    >
                        Add Appointment
                    </Link>
                </div>
                : null
            }
        </>
    )
}