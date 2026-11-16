import { AppointmentJson } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AppointmentList({appointmentsJson}: {appointmentsJson: Promise<AppointmentJson>}) {

    const readyAppointmentsJson = await appointmentsJson;
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    return (
        <>
            {
                readyAppointmentsJson.count > 0 ? readyAppointmentsJson.data.map((appointmentItem) => (
                    <div className="w-1/2 bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={appointmentItem._id}>
                        <div className="text-xl"><b>{appointmentItem.name}</b></div>
                        <div className="text-sm"><b>Registration-Number: </b>{appointmentItem.registrationNumber}</div>
                        <div className="text-sm"><b>Brand: </b>{appointmentItem.brand}</div>
                        <div className="text-sm"><b>Model: </b>{appointmentItem.model}</div>
                        <div className="text-sm"><b>Appointment-Date: </b>{appointmentItem.appointmentDate}</div>
                        <div className="text-sm"><b>Start-Time: </b>{appointmentItem.startTime}</div>
                    </div>
                )) 
                : <div className="text-sm text-center">No Service Appointment</div>
            }
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