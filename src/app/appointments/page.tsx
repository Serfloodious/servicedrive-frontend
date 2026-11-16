"use client";

import DateAppointment from "@/components/DateAppointment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addAppointment } from "@/redux/features/appointmentSlice";
import getServices from "@/libs/getServices";
import { AppointmentItem, ServiceItem } from "../../../interface";

export default function Appointments() {

    const urlParams = useSearchParams();
    const serviceIdFromUrl = urlParams.get("id") || "";
    const serviceNameFromUrl = urlParams.get("name") || "";
    const dispatch = useDispatch<AppDispatch>();

    const [services, setServices] = useState<ServiceItem[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState(serviceIdFromUrl);
    const [selectedServiceName, setSelectedServiceName] = useState(serviceNameFromUrl);
    const [servicesError, setServicesError] = useState<string | null>(null);
    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const servicesJson = await getServices();
                setServices(servicesJson.data);

                const selectedService = servicesJson.data.find(
                    (service: ServiceItem) => service._id === serviceIdFromUrl
                );
                if (selectedService) {
                    setSelectedServiceName(selectedService.name);
                }
            } catch (error) {
                console.error("Failed to load services", error);
                setServicesError("Unable to load services. Please try again.");
            }
        };

        loadServices();
    }, [serviceIdFromUrl]);

    const makeAppointment = () => {
        if (selectedServiceId && appointmentDate && startTime) {
            const item: AppointmentItem = {
                service: selectedServiceId,
                name: selectedServiceName,
                registrationNumber: (document.getElementById("Registration-Number") as HTMLInputElement).value,
                brand: (document.getElementById("Brand") as HTMLInputElement).value,
                model: (document.getElementById("Model") as HTMLInputElement).value,
                appointmentDate: appointmentDate.format("YYYY-MM-DD"),
                startTime: startTime.format("HH:mm")
            };
            dispatch(addAppointment(item));
        }
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-bold">New Appointment</div>
            <div className="text-xl font-bold">{selectedServiceName}</div>
            <div className="text-md text-left text-gray-600">
                Please fill in the form below to appoint your desired service
            </div>
            <DateAppointment
             services={services}
             selectedServiceId={selectedServiceId}
             servicesError={servicesError}
             onServiceChange={(serviceId) => {
                 const selectedService = services.find((service) => service._id === serviceId);
                 setSelectedServiceId(serviceId);
                 setSelectedServiceName(selectedService?.name || "");
             }}
             onDateChange={(value) => {setAppointmentDate(value)}}
             onTimeChange={(value) => {setStartTime(value)}}
            />
            <button name="Appoint Service" id="Appoint Service" 
             className="block rounded-md bg-sky-600 hover:bg-indigo-600 
             px-3 py-2 shadow-sm text-white"
             onClick={makeAppointment}
            >
                Appoint this Service
            </button>
        </main>
    )
}