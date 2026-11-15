import DateAppointment from "@/components/DateAppointment";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Appointment() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    var role = profile.data.role;
    var readyRole = role.charAt(0).toUpperCase() + role.slice(1);
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-bold">Service Appointment</div>
            <div className="text-2xl">{profile.data.name}</div>
            <table className="bg-slate-100 table-auto border-separate border-spacing-2"><tbody>
                <tr><td><b>Email</b></td><td>{profile.data.email}</td></tr>
                <tr><td><b>Tel.</b></td><td>{profile.data.tel}</td></tr>
                <tr><td><b>{readyRole} Since</b></td><td>{createdAt.toString()}</td></tr>
            </tbody></table>
            <div className="text-md text-left text-gray-600">
                Please fill in the form below to appoint your desired service
            </div>
            <DateAppointment />
            <button name="Appoint Service" id="Appoint Service" 
             className="block rounded-md bg-sky-600 hover:bg-indigo-600 
             px-3 py-2 shadow-sm text-white"
            >
                Appoint Service
            </button>
        </main>
    )
}