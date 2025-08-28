import { NextRequest, NextResponse } from "next/server";
import { getProfessorById } from "../route"; // import from your main professors API file

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    return getProfessorById(id);
}