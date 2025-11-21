"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-gray-500">Loading...</p>;
  if (!session) return <p className="text-red-500">Access Denied</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="mb-2">
          <span className="font-semibold">Welcome:</span> {session.user.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {session.user.email}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Role:</span> {session.user.role || "N/A"}
        </p>
      </main>
    </div>
  );
}
