import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentItem } from "../../../interface";

type AppointmentState = {
    appointmentItems: AppointmentItem[];
};

const initialState: AppointmentState = {
    appointmentItems: [],
};

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        addAppointment: (state, action: PayloadAction<AppointmentItem>) => {
            state.appointmentItems.push(action.payload);
        },
        removeAppointment: (state, action: PayloadAction<AppointmentItem>) => {
            const remainItems = state.appointmentItems.filter(obj => {
                return ((obj.service !== action.payload.service)
                || (obj.registrationNumber !== action.payload.registrationNumber)
                || (obj.brand !== action.payload.brand)
                || (obj.model !== action.payload.model)
                || (obj.appointmentDate !== action.payload.appointmentDate)
                || (obj.startTime !== action.payload.startTime));
            })
            state.appointmentItems = remainItems;
        }
    }
})

export const { addAppointment, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;