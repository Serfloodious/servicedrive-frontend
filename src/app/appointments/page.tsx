import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getAppointments from "@/libs/getAppointments";
import AppointmentList from "@/components/AppointmentList";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Appointments() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const appointmentsJson = getAppointments(session.user.token);

    return (
        <main>
            <Suspense fallback={<p className="text-center">Loading...<LinearProgress/></p>}>
                <AppointmentList
                    appointmentsJson={appointmentsJson}
                    showQuota={session.user.role === "member"}
                />
            </Suspense>
        </main>
    )
}