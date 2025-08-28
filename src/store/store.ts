import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./reducers/studentsReducer";
import departmentsReducer from "./reducers/departmentsReducer";
import professorsReducer from "./reducers/profReducers";
import coursesReducer from "./reducers/coursesReducer";
import appointmentsReducer from "./reducers/appointmentsReducer";

export const store = configureStore({
    reducer: {
        students: studentsReducer,
        departments: departmentsReducer,
        professors: professorsReducer,
        courses: coursesReducer,
        appointments: appointmentsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;