import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses } from "../actions/coursesActions";
import { Course } from "../types";

interface CoursesState {
    data: Course[];
    loading: boolean;
    error: string | null;
}

const initialState: CoursesState = {
    data: [],
    loading: false,
    error: null,
};

export const departmentsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => { state.loading = true; })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch courses";
            });
    },
});

export default departmentsSlice.reducer;