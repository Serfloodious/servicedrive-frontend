import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

type EditServicePageProps = {
    params: Promise<{ sid: string }>;
};

type ServiceDetails = {
    _id: string;
    name: string;
    description: string;
    estimatedDuration: number;
    serviceFee: number;
};

export default async function EditService({ params }: EditServicePageProps) {
    const { sid } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) return null;
    if (session.user.role !== "admin") redirect(`/services/${sid}`);

    const serviceResponse = await fetch(`http://localhost:5000/api/v1/services/${sid}`, {
        headers: {
            authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    if (serviceResponse.status === 404) notFound();
    if (!serviceResponse.ok) {
        throw new Error("Failed to fetch service");
    }

    const serviceJson = await serviceResponse.json() as { data: ServiceDetails };
    const service = serviceJson.data;

    const updateService = async (updateServiceForm: FormData) => {
        "use server";
        const name = updateServiceForm.get("name");
        const description = updateServiceForm.get("description");
        const estimatedDuration = updateServiceForm.get("estimatedDuration");
        const serviceFee = updateServiceForm.get("serviceFee");

        if (![name, description, estimatedDuration, serviceFee]
            .every((value) => typeof value === "string" && value.trim().length > 0)) {
            throw new Error("Please complete all service fields");
        }

        const currentSession = await getServerSession(authOptions);
        if (!currentSession?.user?.token || currentSession.user.role !== "admin") {
            throw new Error("You must be an admin to edit a service");
        }

        const response = await fetch(`http://localhost:5000/api/v1/services/${sid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${currentSession.user.token}`,
            },
            body: JSON.stringify({
                name,
                description,
                estimatedDuration: Number(estimatedDuration),
                serviceFee: Number(serviceFee),
            }),
        });

        if (!response.ok) {
            const result = await response.json().catch(() => null);
            throw new Error(result?.error || "Failed to update service");
        }

        updateTag("services");
        redirect(`/services/${sid}?toast=service-updated`);
    };

    return (
        <main className="m-5 flex flex-col items-center p-5">
            <form action={updateService} className="w-full max-w-4xl bg-slate-100 p-5">
                <div className="text-xl text-blue-700">Edit Service</div>
                <div className="my-2 flex w-full items-center">
                    <label className="block w-auto whitespace-nowrap pr-4 text-gray-700" htmlFor="name">Name</label>
                    <input type="text" required id="name" name="name" defaultValue={service.name}
                        className="w-full rounded border-2 border-gray-200 bg-white p-2 text-gray-700 focus:border-blue-400 focus:outline-none"
                    />
                </div>
                <div className="my-2 flex w-full items-center">
                    <label className="block w-auto whitespace-nowrap pr-4 text-gray-700" htmlFor="description">Description</label>
                    <input type="text" required id="description" name="description" defaultValue={service.description}
                        className="w-full rounded border-2 border-gray-200 bg-white p-2 text-gray-700 focus:border-blue-400 focus:outline-none"
                    />
                </div>
                <div className="my-2 flex w-full items-center">
                    <label className="block w-auto whitespace-nowrap pr-4 text-gray-700" htmlFor="estimatedDuration">Estimated Duration</label>
                    <input type="number" min="1" step="1" required id="estimatedDuration" name="estimatedDuration"
                        defaultValue={service.estimatedDuration}
                        className="w-full rounded border-2 border-gray-200 bg-white p-2 text-gray-700 focus:border-blue-400 focus:outline-none"
                    />
                </div>
                <div className="my-2 flex w-full items-center">
                    <label className="block w-auto whitespace-nowrap pr-4 text-gray-700" htmlFor="serviceFee">Service Fee</label>
                    <input type="number" min="0" step="0.01" required id="serviceFee" name="serviceFee"
                        defaultValue={service.serviceFee}
                        className="w-full rounded border-2 border-gray-200 bg-white p-2 text-gray-700 focus:border-blue-400 focus:outline-none"
                    />
                </div>
                <button type="submit" className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700">Edit Service</button>
            </form>
        </main>
    );
}
