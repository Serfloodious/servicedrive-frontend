import Link from "next/link";
import Card from "./Card";

export default async function ServiceCatalog({servicesJson}: {servicesJson: Promise<ServiceJson>}) {
    
    const readyServicesJson = await servicesJson;
    const serviceToImgSrcMap = new Map([
        ["Periodic Maintenance", "/img/periodic-maintenance.jpg"],
        ["Battery & Electrical System Check", "/img/battery-electrical.jpg"],
        ["Brake & Suspension Service", "/img/brake-suspension.jpg"],
        ["Wheel Alignment & Tire Balancing", "/img/wheel-alignment.jpg"],
        ["AC Cleaning & Ozone Sterilization", "/img/ac-cleaning.jpg"]
    ]);

    return (
        <>
            Explore {readyServicesJson.count} services in our catalog
            <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {readyServicesJson.data.map((serviceItem) => (
                    <Link href={`/service/${serviceItem._id}`} className="w-full" key={serviceItem._id}>
                        <Card key={serviceItem._id} 
                         serviceName={serviceItem.name} 
                         imgSrc={serviceToImgSrcMap.get(serviceItem.name) ?? "/img/default.jpg"} 
                        />
                    </Link>
                    )
                )}
            </div>
        </>
    )
}