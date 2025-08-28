import { createAsyncThunk } from "@reduxjs/toolkit";
import { Professor } from "../types";

export const fetchProfessors = createAsyncThunk(
    "professors/fetch",
    async () => {
        const res = await fetch("/api/professors");
        return (await res.json()) as Professor[];
    }
);

export const fetchProfessorById = createAsyncThunk(
    "professors/fetchById",
    async (id: number) => {
        const res = await fetch(`/api/professors/${id}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to fetch professor");
        }
        return (await res.json()) as Professor;
    }
);