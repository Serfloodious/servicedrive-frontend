"use client"

import { removeAppointment } from "@/redux/features/appointmentSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function AppointmentList() {

    const appointmentItems = useAppSelector((state) => state.appointmentSlice.appointmentItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            {
                appointmentItems.length > 0 ? appointmentItems.map((appointmentItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={appointmentItem.service}>
                        <div className="text-xl"><b>{appointmentItem.name}</b></div>
                        <div className="text-sm"><b>Registration-Number: </b>{appointmentItem.registrationNumber}</div>
                        <div className="text-sm"><b>Brand: </b>{appointmentItem.brand}</div>
                        <div className="text-sm"><b>Model: </b>{appointmentItem.model}</div>
                        <div className="text-sm"><b>Appointment-Date: </b>{appointmentItem.appointmentDate}</div>
                        <div className="text-sm"><b>Start-Time: </b>{appointmentItem.startTime}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
                         onClick={() => dispatch(removeAppointment(appointmentItem))}
                        >
                            Remove from Appointment
                        </button>
                    </div>
                )) : <div className="text-sm text-center">No Service Appointment</div>
            }่
        </>
    )
}