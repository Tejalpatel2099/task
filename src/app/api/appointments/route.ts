import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "src/data", "appointments.json");

// Helper to read appointments
const readAppointments = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf-8");
    }
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
};

// Helper to write appointments
const writeAppointments = (data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// GET all appointments
export async function GET() {
    const appointments = readAppointments();
    return NextResponse.json(appointments);
}

export const getAppointmentsByProfessorId = (id: number) => {
    const appointments = readAppointments();
    return appointments.filter((a: any) => Number(a.professorId) === id);
};

// POST new appointment
export async function POST(req: Request) {
    const body = await req.json();
    const appointments = readAppointments();

    // Generate numeric ID
    const maxId = appointments.length > 0 ? Math.max(...appointments.map((a: any) => a.id)) : 0;
    const newId = maxId + 1;

    const newAppointment = { id: newId, ...body };
    appointments.push(newAppointment);
    writeAppointments(appointments);

    return NextResponse.json(newAppointment, { status: 201 });
}