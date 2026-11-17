import getServices from "@/libs/getServices";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

type AddAppointmentPageProps = {
    searchParams: Promise<{ error?: string | string[] }>;
};

export default async function AddAppointment({ searchParams }: AddAppointmentPageProps) {

    const servicesJson = getServices();
    const readyServicesJson = await servicesJson;
    const params = await searchParams;
    const errorMessage = typeof params.error === "string" ? params.error : undefined;

    const addAppointment = async (addAppointmentForm: FormData) => {
        "use server";
        const service = addAppointmentForm.get("service")
        const registrationNumber = addAppointmentForm.get("registrationNumber")
        const brand = addAppointmentForm.get("brand")
        const model = addAppointmentForm.get("model")
        const appointmentDate = addAppointmentForm.get("appointmentDate")
        const startTime = addAppointmentForm.get("startTime")

        if (![service, registrationNumber, brand, model, appointmentDate, startTime]
            .every((value): value is string => typeof value === "string" && value.trim().length > 0)) {
            redirect("/appointments/add?error=Please%20complete%20all%20appointment%20fields");
        }

        const session = await getServerSession(authOptions);
        if (!session?.user?.token) {
            redirect("/appointments/add?error=You%20must%20be%20logged%20in%20to%20add%20an%20appointment");
        }

        const response = await fetch("http://localhost:5000/api/v1/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
                service,
                registrationNumber,
                brand,
                model,
                appointmentDate,
                startTime,
            }),
        });

        if (!response.ok) {
            const result = await response.json().catch(() => null);
            const message = result?.error || "Failed to add appointment";
            redirect(`/appointments/add?error=${encodeURIComponent(message)}`);
        }

        updateTag("appointments");
        redirect("/appointments?toast=appointment-added");
    }

    return (
        <main className="w-full p-5 flex flex-col items-center">
            <form action={addAppointment} className="w-full max-w-4xl bg-slate-100 p-5" id="appointmentForm">
                <div className="text-xl text-blue-700">Add Appointment</div>
                {errorMessage && (
                    <p role="alert" className="my-3 rounded border border-red-300 bg-red-50 p-3 text-red-700">
                        {errorMessage}
                    </p>
                )}
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="service">Service</label>
                    <select required id="service" name="service" form="appointmentForm"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    >
                        <option value="" disabled>Select Service</option>
                        {readyServicesJson.data.map((serviceItem) => (
                            <option key={serviceItem._id} value={serviceItem._id}>
                                {serviceItem.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="registrationNumber">Registration Number</label>
                    <input type="text" required id="registrationNumber" name="registrationNumber" placeholder="1กข-1234"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="brand">Brand</label>
                    <input type="text" required id="brand" name="brand" placeholder="Brand"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="model">Model</label>
                    <input type="text" required id="model" name="model" placeholder="Model"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="appointmentDate">Appointment Date</label>
                    <input type="date" required id="appointmentDate" name="appointmentDate"
                        min={new Date().toISOString().slice(0, 10)}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="startTime">Start Time</label>
                    <input type="time" required id="startTime" name="startTime" placeholder="Start Time"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add Appointment</button>
            </form>
        </main>
    );
}