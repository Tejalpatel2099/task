"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../store/actions/studentsActions";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDepartments } from "@/store/actions/departmentsActions";

export default function StudentsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: students, loading, error } = useSelector(
        (state: RootState) => state.students
    );
    const { data: departments } = useSelector(
        (state: RootState) => state.departments
    );

    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(fetchDepartments());
    }, [dispatch]);

    return (
        <div>
            <h1>Students</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {!loading && !error && students.length === 0 && <p>No students found.</p>}

            {!loading && students.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => {
                                // Find department for this student
                                const department = departments.find(
                                    (d) => String(d.id) === String(s.deptId)
                                );
                                return (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                        <td>{department ? department.name : "Unknown"}</td>
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