import { db } from "@/db";
import { orders } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CartLine {
  productId: string;
  name: string;
  size: string;
  color: string;
  qty: number;
  price: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      address,
      pincode,
      paymentMethod,
      amount,
      items,
    } = body as {
      customerName?: string;
      phone?: string;
      email?: string;
      address?: string;
      pincode?: string;
      paymentMethod?: string;
      amount?: number;
      items?: CartLine[];
    };

    if (!customerName || !phone || !address || !pincode) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Cart is empty." },
        { status: 400 }
      );
    }

    const orderId = `VM-SIWAN-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(orders).values({
      orderId,
      customerName,
      phone,
      email: email ?? null,
      address,
      pincode,
      paymentMethod: paymentMethod ?? "cod",
      amount: String(Number(amount).toFixed(2)),
      status: "placed",
      items: items as unknown,
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (err) {
    console.error("Order creation failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not place order. Please retry." },
      { status: 500 }
    );
  }
}
