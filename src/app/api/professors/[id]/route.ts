import { NextResponse } from "next/server";
import { getProfessorById } from "../route"; // import from your main professors API file

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return getProfessorById(params.id);
}