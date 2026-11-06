import DateReserve from "@/components/DateReserve";

export default function Appointment() {
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Service Appointment</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">
                    Please fill in the form below to appoint your desired service
                </div>
                <DateReserve />
            </div>
            <button name="Appoint Service" id="Appoint Service" 
             className="block rounded-md bg-sky-600 hover:bg-indigo-600 
             px-3 py-2 shadow-sm text-white"
            >
                Appoint Service
            </button>
        </main>
    )
}