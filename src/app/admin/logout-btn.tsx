"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-lime-600 text-white rounded-md px-3 py-1 mt-4"
    >
      Logout
    </button>
  );
}
