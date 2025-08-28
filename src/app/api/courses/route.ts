import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "src/data", "courses.json");

export async function GET() {
    const file = fs.readFileSync(filePath, "utf-8");
    const courses = JSON.parse(file);
    return NextResponse.json(courses);
}