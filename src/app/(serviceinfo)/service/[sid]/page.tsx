import Image from "next/image";

export default async function ServiceDetailPage({params}: {params: Promise<{sid: string}>}) {

    const {sid} = await params;

    const mockServiceRepo = new Map();
    mockServiceRepo.set("001", {name:"Periodic Maintenance", imgSrc:"/img/periodic-maintenance.jpg"});
    mockServiceRepo.set("002", {name:"Battery & Electrical System Check", imgSrc:"/img/battery-electrical.jpg"});
    mockServiceRepo.set("003", {name:"Brake & Suspension Service", imgSrc:"/img/brake-suspension.jpg"});
    mockServiceRepo.set("004", {name:"Wheel Alignment & Tire Balancing", imgSrc:"/img/wheel-alignment.jpg"});
    mockServiceRepo.set("005", {name:"AC Cleaning & Ozone Sterilization", imgSrc:"/img/ac-cleaning.jpg"});

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">Service ID {sid}</h1>
            <div className="flex flex-row my-5">
                <Image src = {(mockServiceRepo.get(sid).imgSrc)}
                 alt = "Service Picture"
                 width = {0} height = {0} sizes="100vw"
                 className="rounded-lg w-[30%] bg-black"
                />
                <div className="text-md mx-5">{(mockServiceRepo.get(sid)).name}</div>
            </div>
        </main>
    );
}