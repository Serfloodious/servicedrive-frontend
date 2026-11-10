"use client";

import { useState } from "react";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

export default function Card({ serviceName, imgSrc, onRating }:{ serviceName: string, imgSrc: string, onRating: (serviceName: string, rating: number | null) => void }) {
    
    const [value, setValue] = useState<number | null>(0);
    const serviceNameRating = serviceName + " Rating";
    
    return (
        <InteractiveCard contentName={serviceName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                 alt="Service Picture"
                 fill={true}
                 className="object-cover rounded-t-lg"
                />
            </div>
            <div className="w-full h-[30%] p-[10px]">
                <h2 style={{color: "#2565AE"}}>{serviceName}</h2>
                <Rating name={serviceNameRating} id={serviceNameRating} data-testid={serviceNameRating} value={value} 
                 onClick={(event) => event.stopPropagation()}
                 onChange={(event, newValue) => {setValue(newValue); onRating(serviceName, newValue)}} precision={0.5} />
            </div>
        </InteractiveCard>
    );
}