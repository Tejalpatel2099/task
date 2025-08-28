import { createAsyncThunk } from "@reduxjs/toolkit";
import { Student } from "../types";

export const fetchStudents = createAsyncThunk(
    "students/fetch",
    async () => {
        const res = await fetch("/api/students");
        return (await res.json()) as Student[];
    }
);