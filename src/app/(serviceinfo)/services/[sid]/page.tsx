import Image from "next/image";
import getService from "@/libs/getService";
import getServiceImgSrc from "@/libs/getServiceImgSrc";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function ServiceDetailPage({params}: {params: Promise<{sid: string}>}) {

    const {sid} = await params;
    const serviceDetails = await getService(sid);
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    return (
        <main className="text-center p-5">
            <div className="flex flex-row my-5">
                <Image src={getServiceImgSrc(serviceDetails.data.name)}
                    alt="Product Picture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] bg-black"
                />
                <div className="text-md mx-5 text-left">
                    <b>{serviceDetails.data.name}</b>
                    <div><b>Description: </b> {serviceDetails.data.description} </div>
                    <div><b>Estimated Duration: </b> {serviceDetails.data.estimatedDuration} minutes</div>
                    <div><b>Service Fee: </b> {serviceDetails.data.serviceFee} THB</div>
                    {
                        session.user.role === "member" ?
                        <Link href={"/appointments/add"}>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 shadow-sm text-white">
                                Add Appointment
                            </button>
                        </Link>
                        : null
                    }
                </div>
            </div>
        </main>
    );
}