"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { store } from "../store/store";
import { Provider } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "University Portal",
//   description: "Courses, Professors, and Students Data",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link href="/" className="navbar-brand">
                Appointment Planner
              </Link>
              <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link href="/courses" className="nav-link">
                      <span>Courses</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/appointments" className="nav-link">
                      <span>Appointment</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/professors" className="nav-link">
                      <span>Professors</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/students" className="nav-link">
                      <span>Students</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Main Content */}
          <main className="container py-4">{children}</main>
        </Provider>



      </body>
    </html>
  );
}