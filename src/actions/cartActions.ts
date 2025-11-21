"use server";

export async function getUserCart() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (err) {
    console.error("getCart error:", err);
    return { cart: [] };
  }
}

export async function addToUserCart(product: unknown) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "add",
        product,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("addToCart error:", err);
    return { error: true };
  }
}

export async function mergeGuestCart(items: unknown[]) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "merge",
        items,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("mergeGuestCart error:", err);
    return { error: true };
  }
}

export async function updateCartQuantity(id: string, quantity: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "updateQty",
        id,
        quantity,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("updateQty error:", err);
    return { error: true };
  }
}

export async function removeFromCart(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "remove",
        id,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("removeFromCart error:", err);
    return { error: true };
  }
}

export async function clearCart() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "clear" }),
    });

    return await res.json();
  } catch (err) {
    console.error("clearCart error:", err);
    return { error: true };
  }
}
