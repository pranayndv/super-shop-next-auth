"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

interface Product {
  id: string;
  name: string;
  gender: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity?: number;
}

interface BtnProp {
  label: string;
  item: Product;
  disabled?: boolean;
}

const CartButton: React.FC<BtnProp> = ({ label, item, disabled = false }) => {
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const loadCart = async (product: Product) => {

    const productWithQty = { ...product, quantity: product.quantity ?? 1 };

    if (session?.user?.role === "customer") {

      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "add",
          product: productWithQty,
        }),
      });

      addToCart(productWithQty);

    } else {
      addToCart(productWithQty);
    }
  };

  return (
    <button
      onClick={() => loadCart(item)}
      disabled={disabled}
      className={`px-4 py-2 my-2 rounded-md font-semibold text-white
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black border-2 border-lime-500 hover:bg-gray-600"}
      `}
    >
      {label}
    </button>
  );
};

export default CartButton;
