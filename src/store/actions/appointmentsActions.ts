import { createAsyncThunk } from "@reduxjs/toolkit";
import { Appointment } from "../types";

// GET all appointments
export const fetchAppointments = createAsyncThunk(
    "appointments/fetchAppointments",
    async () => {
        const res = await fetch("/api/appointments");
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return res.json();
    }
);

export const fetchAppointmentsByProfessor = createAsyncThunk(
    "appointments/fetchAppointmentsByProfessor",
    async (id: number) => {
        const res = await fetch(`/api/appointments/professor/${id}`);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        return res.json();
    }
);

// ADD appointment
export const addAppointment = createAsyncThunk(
    "appointments/addAppointment",
    async (appointment: Omit<Appointment, "id">) => {
        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        });
        if (!res.ok) throw new Error("Failed to add appointment");
        return res.json();
    }
);