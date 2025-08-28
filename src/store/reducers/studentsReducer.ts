import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "../actions/studentsActions";
import { Student } from "../types";

interface StudentsState {
    data: Student[];
    loading: boolean;
    error: string | null;
}

const initialState: StudentsState = {
    data: [],
    loading: false,
    error: null,
};

export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => { state.loading = true; })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch students";
            });
    },
});

export default studentsSlice.reducer;