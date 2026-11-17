import getServices from "@/libs/getServices";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

type EditAppointmentPageProps = {
    params: Promise<{ aid: string }>;
};

type AppointmentDetails = {
    service: {
        _id: string;
    };
    registrationNumber: string;
    brand: string;
    model: string;
    appointmentDate: string;
    startTime: string;
};

export default async function EditAppointment({ params }: EditAppointmentPageProps) {
    const { aid } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) return null;

    const [appointmentResponse, servicesJson] = await Promise.all([
        fetch(`http://localhost:5000/api/v1/appointments/${aid}`, {
            headers: {
                authorization: `Bearer ${session.user.token}`,
            },
            cache: "no-store",
        }),
        getServices(),
    ]);

    if (appointmentResponse.status === 404) notFound();
    if (!appointmentResponse.ok) {
        throw new Error("Failed to fetch appointment");
    }

    const appointmentJson = await appointmentResponse.json() as { data: AppointmentDetails };
    const appointment = appointmentJson.data;

    const updateAppointment = async (updateAppointmentForm: FormData) => {
        "use server";
        const service = updateAppointmentForm.get("service");
        const registrationNumber = updateAppointmentForm.get("registrationNumber");
        const brand = updateAppointmentForm.get("brand");
        const model = updateAppointmentForm.get("model");
        const appointmentDate = updateAppointmentForm.get("appointmentDate");
        const startTime = updateAppointmentForm.get("startTime");

        if (![service, registrationNumber, brand, model, appointmentDate, startTime]
            .every((value): value is string => typeof value === "string" && value.trim().length > 0)) {
            throw new Error("Please complete all appointment fields");
        }

        const currentSession = await getServerSession(authOptions);
        if (!currentSession?.user?.token) {
            throw new Error("You must be logged in to edit an appointment");
        }

        const response = await fetch(`http://localhost:5000/api/v1/appointments/${aid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${currentSession.user.token}`,
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
            throw new Error(result?.error || "Failed to update appointment");
        }

        updateTag("appointments");
        redirect("/appointments");
    };

    return (
        <main className="w-full p-5 flex flex-col items-center">
            <form action={updateAppointment} className="w-full max-w-4xl bg-slate-100 p-5" id="appointmentForm">
                <div className="text-xl text-blue-700">Edit Appointment</div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="service">Service</label>
                    <select required id="service" name="service" form="appointmentForm" defaultValue={appointment.service._id}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    >
                        <option value="" disabled>Select Service</option>
                        {servicesJson.data.map((serviceItem) => (
                            <option key={serviceItem._id} value={serviceItem._id}>
                                {serviceItem.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="registrationNumber">Registration Number</label>
                    <input type="text" required id="registrationNumber" name="registrationNumber" defaultValue={appointment.registrationNumber}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="brand">Brand</label>
                    <input type="text" required id="brand" name="brand" defaultValue={appointment.brand}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="model">Model</label>
                    <input type="text" required id="model" name="model" defaultValue={appointment.model}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="appointmentDate">Appointment Date</label>
                    <input type="date" required id="appointmentDate" name="appointmentDate"
                        defaultValue={appointment.appointmentDate.slice(0, 10)}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="startTime">Start Time</label>
                    <input type="time" required id="startTime" name="startTime" defaultValue={appointment.startTime}
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Update Appointment</button>
            </form>
        </main>
    );
}
