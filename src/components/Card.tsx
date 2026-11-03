import Image from "next/image";

export default function Card({serviceName, imgSrc}: {serviceName: string, imgSrc: string}) {
    return (
        <div className="h-[300px] w-full rounded-lg shadow-lg">
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                 alt="Service Picture"
                 fill={true}
                 className="object-cover rounded-t-lg"
                />
            </div>
            <div className="w-full h-[30%] p-[10px]">
                <h2 style={{color: "#2565AE"}}>{serviceName}</h2>
            </div>
        </div>
    );
}