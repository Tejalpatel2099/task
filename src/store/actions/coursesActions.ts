import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../types";

export const fetchCourses = createAsyncThunk(
    "courses/fetch",
    async () => {
        const res = await fetch("/api/courses");
        return (await res.json()) as Course[];
    }
);