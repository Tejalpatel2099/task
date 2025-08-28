"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessors } from "../../store/actions/professorsActions";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchDepartments } from "@/store/actions/departmentsActions";
import { fetchCourses } from "@/store/actions/coursesActions";
import { fetchAppointments } from "@/store/actions/appointmentsActions";

import Link from "next/link";
import { fetchStudents } from "@/store/actions/studentsActions";

export default function AppointmentsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: appointments } = useSelector(
        (state: RootState) => state.appointments
    );
    const { data: students } = useSelector(
        (state: RootState) => state.students
    );
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
        dispatch(fetchAppointments());
        dispatch(fetchStudents());

    }, [dispatch]);

    return (
        <div>
            <h1>Appointments</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            {!loading && !error && appointments.length === 0 && <p>No appointments found.</p>}
            {!loading && appointments.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Professor</th>
                                <th>Student</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((a) => {
                                // Find department for this student
                                const professor = professors.find(
                                    (p) => String(p.id) === String(a.professorId)
                                );
                                const student = students.find(
                                    (s) => String(s.id) === String(a.studentId)
                                );

                                return (
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{professor ? professor.name : "Unknown"}</td>
                                        <td>{student ? student.name : "Unknown"}</td>
                                        <td>{a.date}</td>
                                        <td>{a.time}</td>
                                        <td>{a.type}</td>
                                        <td>{a.notes !== null ? a.notes : "No notes"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
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
                                <th>Office</th>
                                <th>Action</th>
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
                                        <td>{p.officeLocation}</td>
                                        <td>
                                            <Link href={`/add-appointment/${p.id}`} className="btn btn-primary">
                                                Book Appointment
                                            </Link>
                                        </td>
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