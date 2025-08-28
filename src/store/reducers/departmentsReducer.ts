import { createSlice } from "@reduxjs/toolkit";
import { fetchDepartments } from "../actions/departmentsActions";
import { Department } from "../types";

interface StudentsState {
    data: Department[];
    loading: boolean;
    error: string | null;
}

const initialState: StudentsState = {
    data: [],
    loading: false,
    error: null,
};

export const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => { state.loading = true; })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to departments students";
            });
    },
});

export default departmentsSlice.reducer;