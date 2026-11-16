import Service from "@/db/models/Service";
import { dbConnect } from "@/db/dbConnect";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function AddService() {

    const addService = async (addServiceForm: FormData) => {
        "use server";
        const name = addServiceForm.get("name")
        const description = addServiceForm.get("description")
        const estimatedDuration = addServiceForm.get("duration")
        const serviceFee = addServiceForm.get("serviceFee")

        try {
            await dbConnect();
            const service = await Service.create({
                name,
                description,
                estimatedDuration: Number(estimatedDuration),
                serviceFee: Number(serviceFee)
            });
            console.log("Service added successfully: ", service);
        } catch (error) {
            console.error(error);
        }

        updateTag("services");
        redirect("/services");
    }

    return (
        <main className="m-5 p-5 flex flex-col items-center">
            <form action={addService} className="w-1/2 max-w-4xl bg-slate-100 p-5">
                <div className="text-xl text-blue-700">Add Service</div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="name">Name</label>
                    <input type="text" required id="name" name="name" placeholder="Service Name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="description">Description</label>
                    <input type="text" required id="description" name="description" placeholder="Service Description"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="duration">Estimated Duration</label>
                    <input type="number" required id="duration" name="duration" placeholder="Estimated Duration (Minutes)"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block whitespace-nowrap text-gray-700 pr-4" htmlFor="serviceFee">Service Fee</label>
                    <input type="number" required id="serviceFee" name="serviceFee" placeholder="Service Fee (THB)"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add Service</button>
            </form>
        </main>
    );
}