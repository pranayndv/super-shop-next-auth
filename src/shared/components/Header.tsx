"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Header() {
  const { cart } = useCart(); 
  const { data: session } = useSession();
  const role = session?.user?.role;


  const [serverCart, setServerCart] = useState<unknown[]>([]);


  console.log("Count>>",serverCart.length)
  useEffect(() => {
    const loadServerCart = async () => {
      if (role === "customer") {
        try {
          const res = await fetch("/api/cart", { cache: "no-store" });
          const data = await res.json();
          setServerCart(data.cart || []);
        } catch (err) {
          console.error("Header cart fetch error:", err);
        }
      }
    };

    loadServerCart();
  }, [role]);


  const cartCount =
    role === "customer" ? serverCart.length : cart.length;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Product List" },
    { href: "/cart", label: `Cart (${cartCount})` },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md top-0 fixed w-full z-10">
      <nav className="flex items-center justify-between px-6 py-4 bg-lime-600 relative">
        <h1 className="text-3xl italic font-extrabold text-gray-100">
          Super Shop
        </h1>

        <div className="hidden md:flex space-x-8 items-center">
     
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 hover:text-white hover:underline transition duration-200"
            >
              {link.label}
            </Link>
          ))}

   
          {!session && (
            <Link
              href="/login"
              className="px-3 bg-black text-white font-semibold py-1 rounded-lg border-2 border-lime-500 hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}

     
          {session && role === "admin" && (
            <>
              <Link
                href="/admin"
                className="text-gray-200 hover:text-white hover:underline"
              >
                Admin Panel
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 bg-black text-white font-semibold py-1 rounded-lg border-2 border-lime-500 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}

    
          {session && role === "customer" && (
            <>
              <Link
                href="/customer/dashboard"
                className="text-gray-200 hover:text-white hover:underline"
              >
                My Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 bg-black text-white font-semibold py-1 rounded-lg border-2 border-lime-500 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
