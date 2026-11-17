import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="w-[100%] flex flex-col items-center space-y-2">
            <div className="text-xl py-2 font-medium">Profile</div>
            <table className="bg-slate-100 table-auto border-separate border-spacing-2"><tbody>
                <tr><td><b>Name</b></td><td>{profile.data.name}</td></tr>
                <tr><td><b>Email</b></td><td>{profile.data.email}</td></tr>
                <tr><td><b>Tel.</b></td><td>{profile.data.tel}</td></tr>
                <tr><td><b>Member Since</b></td><td>{createdAt.toString()}</td></tr>
            </tbody></table>
        </main>
    );
}