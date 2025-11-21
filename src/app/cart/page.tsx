"use client";

import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function CartPage() {
  const Router = useRouter();
  const { cart: guestCart, removeFromCart: removeGuestItem } = useCart();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadServerCart = async () => {
      if (role === "customer") {
        const res = await fetch("/api/cart", { cache: "no-store" });
        const data = await res.json();
        setCartData(data.cart || []);
      }
      setLoading(false);
    };
    loadServerCart();
  }, [role]);


  const items = role === "customer" ? cartData : guestCart;


  const [quantities, setQuantities] = useState<Record<string, number>>({});


  useEffect(() => {
    const initial = Object.fromEntries(
      items.map((item) => [item.id, item.quantity || 1])
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuantities(initial);
  }, [items]);

  const QuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const removeItem = async (id: string | number) => {
    if (role === "customer") {
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ type: "remove", id }),
      });
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      setCartData(data.cart);
    } else {
      removeGuestItem(id);
    }
  };

  const total = items.reduce(
    (sum: number, item) =>
      sum + item.price * (quantities[item.id] || item.quantity || 1),
    0
  );

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-50 p-6 rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  width={60}
                  height={60}
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover rounded"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Rs. {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    QuantityChange(item.id, (quantities[item.id] || 1) - 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantities[item.id] || 1}
                  onChange={(e) =>
                    QuantityChange(item.id, Number(e.target.value))
                  }
                  className="w-12 px-2 py-1 text-center border rounded"
                />
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    QuantityChange(item.id, (quantities[item.id] || 1) + 1)
                  }
                >
                  +
                </button>
              </div>

              <Button label="Remove" onClick={() => removeItem(item.id)} />
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <p className="font-semibold text-gray-700 mb-4">
            Total: <span className="text-black">Rs.{total.toFixed(2)}</span>
          </p>
          <Button label="Checkout" onClick={() => {}} />
        </div>
      )}

      <div className="mt-4">
        <Button label="Back to Products" onClick={() => Router.push("/")} />
      </div>
    </div>
  );
}
