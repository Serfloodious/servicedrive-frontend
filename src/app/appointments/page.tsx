"use client";

import DateAppointment from "@/components/DateAppointment";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addAppointment } from "@/redux/features/appointmentSlice";
import { AppointmentItem } from "../../../interface";

export default function Appointments() {

    const urlParams = useSearchParams();
    const sid = urlParams.get("id");
    const name = urlParams.get("name");
    const dispatch = useDispatch<AppDispatch>();

    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);

    const makeAppointment = () => {
        if (sid && appointmentDate && startTime) {
            const item: AppointmentItem = {
                service: sid,
                name: name || "",
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
            <div className="text-xl font-bold">{name}</div>
            <div className="text-md text-left text-gray-600">
                Please fill in the form below to appoint your desired service
            </div>
            <DateAppointment onDateChange={(value: Dayjs) => {setAppointmentDate(value)}}
             onTimeChange={(value: Dayjs) => {setStartTime(value)}}
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