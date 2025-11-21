import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";
import { authOptions } from "@/lib/auth";

const dbPath = path.join(
  process.cwd(),
  "src",
  "app",
  "api",
  "cart",
  "data",
  "cart-db.json"
);


function readDB() {
  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    console.error("DB read error:", e);
    return {};
  }
}


function writeDB(data: unknown) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("DB write error:", e);
  }
}



// GET - Return customer cart

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "customer") {
    return NextResponse.json({ cart: [] });
  }

  const db = readDB();
  const cart = db[session.user.id] || [];

  return NextResponse.json({ cart });
}

// POST - Add item to cart

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, product } = await req.json();
  const db = readDB();
  const uid = session.user.id;

  const cart = db[uid] || [];

  if (type === "add") {
    const existing = cart.find((i: {id:string}) => String(i.id) === String(product.id));
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }

  db[uid] = cart;
  writeDB(db);

  return NextResponse.json({ cart });
}



//  DELETE - Remove or Clear

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, id } = await req.json();
  const db = readDB();
  const uid = session.user.id;

  let cart = db[uid] || [];

  // Remove single item
  if (type === "remove") {
    cart = cart.filter((c: {id:string}) => String(c.id) !== String(id));
  }

  // Clear entire cart
  if (type === "clear") {
    cart = [];
  }

  db[uid] = cart;
  writeDB(db);

  return NextResponse.json({ cart });
}
