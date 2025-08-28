"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/actions/coursesActions";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDepartments } from "@/store/actions/departmentsActions";

export default function CoursesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: courses, loading, error } = useSelector(
        (state: RootState) => state.courses
    );
    const { data: departments } = useSelector(
        (state: RootState) => state.departments
    );

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchDepartments());
    }, [dispatch]);
    return (
        <div>
            <h1>Students</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {!loading && !error && courses.length === 0 && <p>No courses found.</p>}

            {!loading && courses.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Offered</th>
                                <th>Credits</th>


                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((s) => {
                                // Find department for this student
                                const department = departments.find(
                                    (d) => String(d.id) === String(s.deptId)
                                );
                                return (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{department ? department.name : "Unknown"}</td>
                                        <td>{s.offered}</td>
                                        <td>{s.credits}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}