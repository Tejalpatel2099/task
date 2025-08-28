import { createSlice } from "@reduxjs/toolkit";
import { fetchProfessors, fetchProfessorById } from "../actions/professorsActions";
import { Professor } from "../types";

interface ProfessorState {
    data: Professor[];          // all professors
    selectedProfessor: Professor | null; // single professor
    loading: boolean;
    error: string | null;
}

const initialState: ProfessorState = {
    data: [],
    selectedProfessor: null,
    loading: false,
    error: null,
};

export const professorsSlice = createSlice({
    name: "professors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all professors
        builder
            .addCase(fetchProfessors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfessors.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfessors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch professors";
            });

        // Fetch single professor by ID
        builder
            .addCase(fetchProfessorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfessorById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProfessor = action.payload;
            })
            .addCase(fetchProfessorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch professor";
            });
    },
});

export default professorsSlice.reducer;