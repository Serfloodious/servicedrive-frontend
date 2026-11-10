"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextField } from "@mui/material"
import { Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function DateReserve() {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [service, setService] = useState("PeriodicMaintenance");

    return (
        <div className="bg-slate-100 rounded-lg gap-x-5 gap-y-5
         w-fit px-10 py-5 flex flex-col justify-center"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                 value={reserveDate} onChange={(value) => setReserveDate(value)}
                />
            </LocalizationProvider>
            <TextField variant="standard" name="License-Plate" id="License-Plate" label="License-Plate" className="h-[2em] w-[200px]"/>
            <TextField variant="standard" name="Province" id="Province" label="Province" className="h-[2em] w-[200px]"/>
            <TextField variant="standard" name="Brand" id="Brand" label="Brand" className="h-[2em] w-[200px]"/>
            <TextField variant="standard" name="Model" id="Model" label="Model" className="h-[2em] w-[200px]"/>
            <Select variant="standard" name="service" id="service" value={service}
             onChange={(e) => setService(e.target.value)} className="h-[2em] w-[200px]"
            >
                <MenuItem value="PeriodicMaintenance">Periodic Maintenance</MenuItem>
                <MenuItem value="BatteryElectrical">Battery & Electrical System Check</MenuItem>
                <MenuItem value="BrakeSuspension">Brake & Suspension Service</MenuItem>
                <MenuItem value="WheelAlignment">Wheel Alignment & Tire Balancing</MenuItem>
                <MenuItem value="AC-Cleaning">AC Cleaning & Ozone Sterilization</MenuItem>
            </Select>
        </div>
    )
}