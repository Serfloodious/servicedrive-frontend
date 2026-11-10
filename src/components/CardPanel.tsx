"use client";

import { useReducer } from "react";
import Card from "./Card";

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

    return (
        <div style={{width: "100%"}}>
            <div className="grid w-full grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card serviceName="Periodic Maintenance" imgSrc="/img/periodic-maintenance.jpg" 
                 onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                />
                <Card serviceName="Battery & Electrical System Check" imgSrc="/img/battery-electrical.jpg"
                 onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                />
                <Card serviceName="Brake & Suspension Service" imgSrc="/img/brake-suspension.jpg"
                 onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                />
                <Card serviceName="Wheel Alignment & Tire Balancing" imgSrc="/img/wheel-alignment.jpg"
                 onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                />
                <Card serviceName="AC Cleaning & Ozone Sterilization" imgSrc="/img/ac-cleaning.jpg"
                 onRating={(service: string, rating: number | null) => dispatchRating({type: "add", serviceName: service, rating})}
                />
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
