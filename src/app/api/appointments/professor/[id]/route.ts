import { NextRequest, NextResponse } from "next/server";
import { getAppointmentsByProfessorId } from "../../route";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const professorId = Number(id);

        if (!professorId) {
            return NextResponse.json(
                { error: "Professor ID is required" },
                { status: 400 }
            );
        }

        const professorAppointments = getAppointmentsByProfessorId(professorId);

        if (professorAppointments.length === 0) {
            return NextResponse.json(
                { message: "No appointments found for this professor" },
                { status: 404 }
            );
        }

        return NextResponse.json(professorAppointments);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch professor appointments" },
            { status: 500 }
        );
    }
}