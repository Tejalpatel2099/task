import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAppointments, fetchAppointmentsByProfessor, addAppointment } from "../actions/appointmentsActions";
import { Appointment } from "../types";

interface AppointmentsState {
    data: Appointment[];
    professorAppointment: Appointment[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: AppointmentsState = {
    data: [],
    professorAppointment: null,
    loading: false,
    error: null,
};

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(fetchAppointmentsByProfessor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentsByProfessor.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
                state.loading = false;
                state.professorAppointment = action.payload;
            })
            .addCase(fetchAppointmentsByProfessor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(addAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default appointmentsSlice.reducer;