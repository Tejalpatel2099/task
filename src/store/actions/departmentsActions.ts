import { createAsyncThunk } from "@reduxjs/toolkit";
import { Department } from "../types";

export const fetchDepartments = createAsyncThunk(
    "departments/fetch",
    async () => {
        const res = await fetch("/api/departments");
        return (await res.json()) as Department[];
    }
);

