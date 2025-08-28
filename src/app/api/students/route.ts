import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "src/data", "students.json");
const deptfilePath = path.join(process.cwd(), "src/data", "departments.json");

export async function GET() {
    const file = fs.readFileSync(filePath, "utf-8");
    const deptFile = fs.readFileSync(deptfilePath, "utf-8");

    const students = JSON.parse(file);
    const departments = JSON.parse(deptFile);

    return NextResponse.json(students);
}