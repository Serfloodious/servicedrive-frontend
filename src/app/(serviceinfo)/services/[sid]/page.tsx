import Image from "next/image";
import getService from "@/libs/getService";
import getServiceImgSrc from "@/libs/getServiceImgSrc";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeleteServiceButton from "@/components/DeleteServiceButton";

export default async function ServiceDetailPage({params}: {params: Promise<{sid: string}>}) {

    const {sid} = await params;
    const serviceDetails = await getService(sid);
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const deleteService = async (formData: FormData) => {
        "use server";

        const serviceId = formData.get("serviceId");
        if (typeof serviceId !== "string" || serviceId !== sid) {
            throw new Error("Service ID is required");
        }

        const currentSession = await getServerSession(authOptions);
        if (!currentSession?.user?.token || currentSession.user.role !== "admin") {
            throw new Error("You must be an admin to delete a service");
        }

        const response = await fetch(`http://localhost:5000/api/v1/services/${serviceId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${currentSession.user.token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json().catch(() => null);
            throw new Error(result?.error || "Failed to delete service");
        }

        revalidatePath("/services");
        redirect("/services?toast=service-deleted");
    };

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
                    {
                        session.user.role === "admin" ?
                        <Link href={`/services/${sid}/edit`}>
                            <button className="block rounded-md bg-amber-500 hover:bg-amber-600 px-3 py-1 shadow-sm text-white">
                                Edit
                            </button>
                        </Link>
                        : null
                    }
                    {
                        session.user.role === "admin" ?
                        <DeleteServiceButton
                                action={deleteService}
                                serviceId={sid}
                            />
                        : null
                    }
                </div>
            </div>
        </main>
    );
}