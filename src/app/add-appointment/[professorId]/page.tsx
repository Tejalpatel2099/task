"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessorById } from "../../../store/actions/professorsActions";
import { addAppointment, fetchAppointmentsByProfessor } from "@/store/actions/appointmentsActions";
import type { RootState, AppDispatch } from "../../../store/store";
import { fetchDepartments } from "@/store/actions/departmentsActions";
import { fetchCourses } from "@/store/actions/coursesActions";
import { fetchStudents } from "../../../store/actions/studentsActions";

import { useRouter } from "next/navigation";
import { Appointment } from "../../../store/types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddAppointmentPage() {
    const router = useRouter();
    const params = useParams();
    const { professorId } = params;
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);


    const dispatch = useDispatch<AppDispatch>();

    const { data: students } = useSelector(
        (state: RootState) => state.students
    );
    const { selectedProfessor, loading, error } = useSelector(
        (state: RootState) => state.professors
    );
    const { data: professorAppointment } = useSelector(
        (state: RootState) => state.appointments
    );
    const { data: departments } = useSelector(
        (state: RootState) => state.departments
    );
    const { data: courses } = useSelector((state: RootState) => state.courses);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [appointmentType, setAppointmentType] = useState<"in-person" | "virtual">("in-person");
    const [studentId, setStudentId] = useState<number | "">("");
    const [formError, setFormError] = useState("");


    useEffect(() => {
        if (professorId) {
            dispatch(fetchProfessorById(Number(professorId)));
            dispatch(fetchAppointmentsByProfessor(Number(professorId)));
        }
        dispatch(fetchStudents());
        dispatch(fetchDepartments());
        dispatch(fetchCourses());
    }, [dispatch, professorId]);

    useEffect(() => {
        if (selectedDate && professorAppointment.length > 0) {
            const dateStr = selectedDate.toISOString().split("T")[0];

            const bookedForDate = professorAppointment
                .filter((appt: Appointment) => appt.date === dateStr)
                .map((appt: Appointment) => appt.time);

            setBookedSlots(bookedForDate);
        } else {
            setBookedSlots([]);
        }
    }, [selectedDate, professorAppointment]);

    if (loading) return <p>Loading professor data...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!selectedProfessor) return <p>No professor found.</p>;

    const department = departments.find(
        (d) => String(d.id) === String(selectedProfessor.deptId)
    );

    const courseIds: string[] = Array.isArray(selectedProfessor.coursesId)
        ? selectedProfessor.coursesId.map(String)
        : String(selectedProfessor.coursesId).split(",").map((id) => id.trim());

    const courseNames = courseIds
        .map((id) => {
            const course = courses.find((c) => String(c.id) === id);
            return course ? course.name : null;
        })
        .filter(Boolean)
        .join(", ");

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour < 17; hour++) {
            // 9 AM to 4 PM range
            const suffix = hour >= 12 ? "PM" : "AM";
            const displayHour = hour > 12 ? hour - 12 : hour;

            slots.push(`${displayHour.toString().padStart(2, "0")}:00 ${suffix}`);
            slots.push(`${displayHour.toString().padStart(2, "0")}:30 ${suffix}`);
        }
        return slots;
    };


    const timeSlots = generateTimeSlots();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const time = (e.currentTarget.time.value as string) || null;

        // Validation
        if (!selectedDate) {
            setFormError("Please select a date.");
            return;
        }
        if (!time) {
            setFormError("Please select a time slot.");
            return;
        }
        if (!appointmentType) {
            setFormError("Please select appointment type.");
            return;
        }

        setFormError("");

        const data: any = {
            professorId: selectedProfessor.id,
            studentId: Number(studentId),
            date: selectedDate.toISOString().split("T")[0],
            time,
            type: appointmentType,
            notes: e.currentTarget.notes.value,
        };

        dispatch(addAppointment(data));

        // Reset form
        e.currentTarget.reset();
        setSelectedDate(null);
        setAppointmentType("in-person");

        router.push("/appointments");
    };

    return (
        <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>

            <h1 style={{ textAlign: "center" }}>Book Appointment</h1>
            <h2>{selectedProfessor.name}</h2>
            <p>Department: {department ? department.name : "Unknown"}</p>
            <p>Courses: {courseNames || "None"}</p>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="student" style={{ marginBottom: "0.5rem" }}>Student:</label>
                    <select
                        id="student"
                        value={studentId}
                        onChange={(e) => setStudentId(Number(e.target.value))}
                        style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                        required
                    >
                        <option value="">Select a student</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Date Picker */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "0.5rem" }}>Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6} // exclude Sat & Sun
                        placeholderText="Click here to select date"
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </div>

                {/* Time Slots */}
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.5rem" }}>Time Slot:</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);

              return (
                <label
                  key={slot}
                  style={{
                    padding: "0.5rem 1rem",
                    border: isBooked ? "1px solid #ccc" : "1px solid #0070f3",
                    borderRadius: "5px",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    backgroundColor: isBooked ? "#eee" : "#fff",
                    color: isBooked ? "#888" : "#000",
                  }}
                >
                  <input
                    type="radio"
                    name="time"
                    value={slot}
                    required
                    disabled={isBooked}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {slot}
                </label>
              );
            })}
          </div>
        </div> */}
                {/* Time Slots */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "0.5rem" }}>Time Slot:</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {timeSlots.map((slot) => {
                            const isBooked = bookedSlots.includes(slot);

                            // Check if selected date is today
                            let isPast = false;
                            if (selectedDate) {
                                const today = new Date();
                                const selectedDateStr = selectedDate.toISOString().split("T")[0];
                                const todayStr = today.toISOString().split("T")[0];

                                if (selectedDateStr === todayStr) {
                                    // Parse slot like "09:00 AM" → hours & minutes
                                    const [timePart, meridiem] = slot.split(" ");
                                    const [hourStr, minuteStr] = timePart.split(":");
                                    let hour = parseInt(hourStr, 10);
                                    const minute = parseInt(minuteStr, 10);

                                    if (meridiem === "PM" && hour !== 12) hour += 12;
                                    if (meridiem === "AM" && hour === 12) hour = 0;

                                    const slotDateTime = new Date(selectedDate);
                                    slotDateTime.setHours(hour, minute, 0, 0);

                                    if (slotDateTime.getTime() <= today.getTime()) {
                                        isPast = true;
                                    }
                                }
                            }

                            const disabled = isBooked || isPast;

                            return (
                                <label
                                    key={slot}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        border: disabled ? "1px solid #ccc" : "1px solid #0070f3",
                                        borderRadius: "5px",
                                        cursor: disabled ? "not-allowed" : "pointer",
                                        backgroundColor: disabled ? "#eee" : "#fff",
                                        color: disabled ? "#888" : "#000",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="time"
                                        value={slot}
                                        required
                                        disabled={disabled}
                                        style={{ marginRight: "0.5rem" }}
                                    />
                                    {slot}
                                </label>
                            );
                        })}
                    </div>
                </div>


                {/* Appointment Type */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="type" style={{ marginBottom: "0.5rem" }}>Type:</label>
                    <select
                        id="type"
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value as "in-person" | "virtual")}
                        style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                        required
                    >
                        <option value="in-person">In-Person</option>
                        <option value="virtual">Virtual</option>
                    </select>
                </div>

                {/* Notes */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="notes" style={{ marginBottom: "0.5rem" }}>Notes:</label>
                    <textarea
                        name="notes"
                        id="notes"
                        rows={4}
                        placeholder="Optional notes..."
                        style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>

                {/* Error Message */}
                {formError && <p style={{ color: "red" }}>{formError}</p>}

                {/* Submit */}
                <button
                    type="submit"
                    style={{
                        padding: "0.75rem",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Book
                </button>
            </form>
        </div>
    );
}