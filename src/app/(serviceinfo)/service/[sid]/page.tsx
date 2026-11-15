import Image from "next/image";
import getService from "@/libs/getService";
import getServiceImgSrc from "@/libs/getServiceImgSrc";

export default async function ServiceDetailPage({params}: {params: Promise<{sid: string}>}) {

    const {sid} = await params;
    const serviceDetails = await getService(sid);

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
                </div>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    return [{sid: "001"}, {sid: "002"}, {sid: "003"}, {sid: "004"}, {sid: "005"}];
}