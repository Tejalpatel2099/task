export interface Student {
    id: number;
    name: string;
    email: string;
    deptId: number;
}

export interface Professor {
    id: number;
    name: string;
    deptId: number;
    coursesId: number[];
    email: string;
    officeLocation: string;
}

export interface Course {
    id: number;
    name: string;
    deptId: number;
    offered: string[];
    credits: number;
}

export interface Department {
    id: number;
    name: string;
}

export interface Appointment {
    id: number;
    professorId: number;
    studentId: number;
    date: string;
    time: string;
    type: string;
    notes?: string;
}