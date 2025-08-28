"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessors } from "../../store/actions/professorsActions";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDepartments } from "@/store/actions/departmentsActions";
import { fetchCourses } from "@/store/actions/coursesActions";

export default function ProfessorsPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { data: professors, loading, error } = useSelector(
        (state: RootState) => state.professors
    );
    const { data: departments } = useSelector(
        (state: RootState) => state.departments
    );
    const { data: courses } = useSelector(
        (state: RootState) => state.courses
    );

    useEffect(() => {
        dispatch(fetchProfessors());
        dispatch(fetchDepartments());
        dispatch(fetchCourses());
    }, [dispatch]);

    return (
        <div>
            <h1>Professors</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {!loading && !error && professors.length === 0 && <p>No professor found.</p>}

            {!loading && professors.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Courses</th>
                                <th>Email</th>
                                <th>Office</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professors.map((p) => {
                                // Find department for this student
                                const department = departments.find(
                                    (d) => String(d.id) === String(p.deptId)
                                );

                                const courseIds: string[] = Array.isArray(p.coursesId) ? p.coursesId.map(String) : String(p.coursesId).split(",").map((id) => id.trim());

                                const courseNames = courseIds
                                    .map((id) => {
                                        const course = courses.find((c) => String(c.id) === id);
                                        return course ? course.name : null;
                                    })
                                    .filter(Boolean) // remove nulls
                                    .join(", ");

                                return (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{department ? department.name : "Unknown"}</td>
                                        <td>{courseNames ? courseNames : "Unknown"}</td>
                                        <td>{p.email}</td>
                                        <td>{p.officeLocation}</td>
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