"use client";

import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {

    const ratingReducer = (ratingList: Map<string, number>, action: {type: string, serviceName: string, rating?: number | null}) => {
        switch (action.type) {
            case "add":
                if (action.rating === null || action.rating === undefined) return ratingList;
                return new Map(ratingList).set(action.serviceName, action.rating);
            case "remove":
                ratingList.delete(action.serviceName);
                return new Map(ratingList);
            default:
                return ratingList;
        }
    }

    const [ratingList, dispatchRating] = useReducer(ratingReducer, new Map<string, number>());

    const mockServiceRepo = [
        {sid:"001", name:"Periodic Maintenance", imgSrc:"/img/periodic-maintenance.jpg"},
        {sid:"002", name:"Battery & Electrical System Check", imgSrc:"/img/battery-electrical.jpg"},
        {sid:"003", name:"Brake & Suspension Service", imgSrc:"/img/brake-suspension.jpg"},
        {sid:"004", name:"Wheel Alignment & Tire Balancing", imgSrc:"/img/wheel-alignment.jpg"},
        {sid:"005", name:"AC Cleaning & Ozone Sterilization", imgSrc:"/img/ac-cleaning.jpg"},
    ]

    return (
        <div style={{width: "100%"}}>
            <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {mockServiceRepo.map((serviceItem) => (
                        <Link href={`/service/${serviceItem.sid}`} className="w-full" key={serviceItem.sid}>
                            <Card key={serviceItem.sid} serviceName={serviceItem.name} imgSrc={serviceItem.imgSrc}
                            onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                            />
                        </Link>
                    )
                )}
            </div>
            <div className="w-full text-xl font-medium">Service List with Ratings: {ratingList.size}</div>
            {Array.from(ratingList).map(([service, rating]) => 
                <div key={service} data-testid={service} onClick={() => dispatchRating({type: "remove", serviceName: service})}>
                    {service}: {rating}
                </div>
            )}
        </div>
    );
}
