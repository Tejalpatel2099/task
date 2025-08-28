import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "src/data", "professors.json");

export async function GET() {
    const file = fs.readFileSync(filePath, "utf-8");
    const professors = JSON.parse(file);
    return NextResponse.json(professors);
}

export async function getProfessorById(id: string) {
    try {
        const file = fs.readFileSync(filePath, "utf-8");
        const professors = JSON.parse(file);

        const professor = professors.find((p: any) => String(p.id) === String(id));
        if (!professor) {
            return NextResponse.json({ error: "Professor not found" }, { status: 404 });
        }

        return NextResponse.json(professor);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch professor" }, { status: 500 });
    }
}