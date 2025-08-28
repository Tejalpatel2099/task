"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white px-6">
      {/* Hero Section */}
      <main className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Appointment Planner</span>
        </h1>
        <p className="text-lg text-white/90 mb-8">
          Schedule meetings effortlessly with professors and students.
          Pick a date, choose a time, and book instantly. 📅✨
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/appointments"
            className="px-6 py-3 rounded-xl bg-yellow-300 text-black font-semibold hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
          >
            Book an Appointment
          </Link>
          <Link
            href="/professors"
            className="px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition transform hover:scale-105"
          >
            View Professors
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-white/80">
        ©️ {new Date().getFullYear()} Appointment Planner. All rights reserved.
      </footer>
    </div>
  );
}