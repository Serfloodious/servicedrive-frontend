"use client"

import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextField } from "@mui/material"
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function DateAppointment({onDateChange, onTimeChange}: {onDateChange: Function, onTimeChange: Function}) {
    
    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);

    return (
        <div className="bg-slate-100 rounded-lg gap-x-5 gap-y-5
         w-fit px-10 py-5 flex flex-col justify-center"
        >
            <TextField variant="standard" name="Registration-Number" id="Registration-Number" label="Registration-Number" className="h-[2em] w-[200px]"/>
            <TextField variant="standard" name="Brand" id="Brand" label="Brand" className="h-[2em] w-[200px]"/>
            <TextField variant="standard" name="Model" id="Model" label="Model" className="h-[2em] w-[200px]"/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h2 className="mt-3 text-lg font-semibold">Appointment Date</h2>
                <DatePicker className="bg-white"
                 value={appointmentDate} onChange={(value) => {setAppointmentDate(value); onDateChange(value)}}
                />
                <h2 className="text-lg font-semibold">Start Time</h2>
                <TimePicker ampm={false} className="bg-white"
                 value={startTime} onChange={(value) => {setStartTime(value); onTimeChange(value)}}
                />
            </LocalizationProvider>
        </div>
    )
}