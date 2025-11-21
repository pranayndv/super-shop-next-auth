"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

type LoginForm = { email: string; password: string };


export default function LoginPage() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginForm>();

  const { data: session } = useSession();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError("Invalid Credentials");
    }else if(session?.user.role == "admin"){
      redirect("/admin");
    }
    else{
      redirect("/customer/dashboard")
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg border-2 border-lime-500 hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        
      </div>
    </div>
  );
}
