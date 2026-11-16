import Link from "next/link";
import Card from "./Card";
import getServiceImgSrc from "@/libs/getServiceImgSrc";
import { ServiceJson } from "../../interface";

export default async function ServiceCatalog({servicesJson}: {servicesJson: Promise<ServiceJson>}) {
    
    const readyServicesJson = await servicesJson;

    return (
        <>
            Explore {readyServicesJson.count} services in our catalog
            <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {readyServicesJson.data.map((serviceItem) => (
                    <Link href={`/services/${serviceItem._id}`} className="w-full" key={serviceItem._id}>
                        <Card key={serviceItem._id} 
                         serviceName={serviceItem.name} 
                         imgSrc={getServiceImgSrc(serviceItem.name)}
                        />
                    </Link>
                    )
                )}
            </div>
        </>
    )
}