"use client";

import { useSession } from "next-auth/react";

export default function CustomerDashboard() {
  const { data: session } = useSession();

  if (!session) return <p className="text-center p-10">Loading...</p>;
  if (session.user.role !== "customer") return <p>Access Denied</p>;

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-24 pb-10">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">

      
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Customer Dashboard
        </h1>

     
        <p className="text-lg text-gray-600 mb-6">
          Welcome, <span className="font-semibold text-gray-900">{session.user.name}</span>
        </p>

        <hr className="my-4 border-gray-300" />


        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Orders</h2>

        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">No orders found. Coming soon...</p>
        </div>

      </div>
    </div>
  );
}
