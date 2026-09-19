"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ChevronRight,
  ShoppingBag,
  Truck,
  Store as StoreIcon,
  Smartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { checkPin, offers } from "@/lib/catalogue";
import { cn, formatINR } from "@/lib/utils";

const steps = ["Contact", "Delivery", "Payment"];

export default function CheckoutPage() {
  const store = useStore();
  const items = store.cart;
  const subtotal = store.cartSubtotal;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;

  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const total = Math.max(0, subtotal + shipping - discount);

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (code === "SIWAN100") {
      if (subtotal < 999) {
        store.toast("Add ₹999+ to use SIWAN100", "error");
        return;
      }
      setDiscount(100);
      setCouponMsg("₹100 off applied");
    } else if (code === "FIRST50") {
      setDiscount(50);
      setCouponMsg("₹50 off applied");
    } else if (code === "FESTIVE25") {
      setDiscount(Math.round(subtotal * 0.25));
      setCouponMsg("25% off applied");
    } else {
      store.toast("Invalid coupon code", "error");
      setDiscount(0);
      setCouponMsg(null);
      return;
    }
    store.toast("Coupon applied!", "success");
  }

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });
  const [pinResult, setPinResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [pickup, setPickup] = useState(false);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "netbanking">("upi");

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function next() {
    if (step === 0) {
      if (!form.name || !form.phone || !form.address || !form.pincode) {
        store.toast("Please fill all required fields", "error");
        return;
      }
      if (pinResult && !pinResult.ok && !pickup) {
        store.toast("That PIN isn't deliverable — try store pickup", "error");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function placeOrder() {
    setProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: pickup ? `${form.address} (Store pickup: Babunia More)` : form.address,
          pincode: form.pincode,
          paymentMethod: payMethod,
          amount: total,
          coupon: coupon.trim().toUpperCase() || null,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            size: i.size,
            color: i.color,
            qty: i.qty,
            price: i.salePrice ?? i.price,
          })),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPlaced(data.orderId);
        store.clearCart();
      } else {
        store.toast(data.error ?? "Order failed", "error");
      }
    } catch {
      store.toast("Network error — please retry", "error");
    } finally {
      setProcessing(false);
    }
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-5 pt-28">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/5 text-zinc-500">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <p className="mt-4 font-display text-2xl text-white">Your bag is empty</p>
          <Link
            href="/#shop"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white"
          >
            Browse styles <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-24 pt-28 lg:pt-32">
      {placed && <Confetti />}
      <div className="mx-auto max-w-6xl">
        <Link href="/#shop" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to shopping
        </Link>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full text-sm font-bold transition-colors",
                      i < step
                        ? "bg-vmart-red text-white"
                        : i === step
                          ? "bg-white text-zinc-900"
                          : "bg-white/10 text-zinc-500"
                    )}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      i <= step ? "text-white" : "text-zinc-500"
                    )}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-3 h-px flex-1 bg-white/10">
                    <motion.div
                      className="h-px bg-vmart-red"
                      initial={false}
                      animate={{ width: i < step ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main */}
          <div className="rounded-3xl glass-strong p-6 ring-1 ring-white/10">
            <AnimatePresence mode="wait">
              {placed ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-white">Order placed!</h2>
                  <p className="mt-2 text-zinc-400">
                    Confirmation sent to {form.phone}. Order ID:
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-vmart-red-soft">{placed}</p>
                  <p className="mt-3 text-sm text-zinc-500">
                    This is a prototype — no real payment was processed.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white"
                  >
                    Continue shopping
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 0 && (
                    <div className="space-y-4">
                      <h2 className="font-display text-2xl text-white">Contact & Address</h2>
                      <Field label="Full name" required>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="input"
                          placeholder="e.g. Aman Kumar"
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Phone" required>
                          <input
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className="input"
                            placeholder="+91 9XXXXXXXX"
                          />
                        </Field>
                        <Field label="Email (optional)">
                          <input
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="input"
                            placeholder="you@email.com"
                          />
                        </Field>
                      </div>
                      <Field label="Address" required>
                        <textarea
                          value={form.address}
                          onChange={(e) => update("address", e.target.value)}
                          className="input min-h-[80px]"
                          placeholder="House / flat, street, area"
                        />
                      </Field>
                      <Field label="PIN code" required>
                        <div className="flex gap-2">
                          <input
                            value={form.pincode}
                            onChange={(e) => {
                              update("pincode", e.target.value);
                              setPinResult(null);
                            }}
                            className="input"
                            placeholder="841226"
                            maxLength={6}
                          />
                          <button
                            onClick={() => setPinResult(checkPin(form.pincode))}
                            className="shrink-0 rounded-xl bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/20"
                          >
                            Check
                          </button>
                        </div>
                      </Field>
                      {pinResult && (
                        <p
                          className={cn(
                            "rounded-xl px-4 py-2 text-sm",
                            pinResult.ok
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-vmart-red/15 text-vmart-red-soft"
                          )}
                        >
                          {pinResult.message}
                        </p>
                      )}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="font-display text-2xl text-white">Delivery method</h2>
                      <OptionCard
                        active={!pickup && delivery === "standard"}
                        onClick={() => {
                          setPickup(false);
                          setDelivery("standard");
                        }}
                        icon={Truck}
                        title="Standard delivery"
                        sub="Free · 2–4 days in Siwan"
                        price="FREE"
                      />
                      <OptionCard
                        active={!pickup && delivery === "express"}
                        onClick={() => {
                          setPickup(false);
                          setDelivery("express");
                        }}
                        icon={Zap}
                        title="Express delivery"
                        sub="Next-day · Siwan city"
                        price="₹49"
                      />
                      <OptionCard
                        active={pickup}
                        onClick={() => setPickup(true)}
                        icon={StoreIcon}
                        title="Store pickup"
                        sub="Babunia More · collect in 2 hrs"
                        price="FREE"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display text-2xl text-white">Payment</h2>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Prototype — no real charge
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {([
                          { k: "upi", icon: Smartphone, label: "UPI" },
                          { k: "card", icon: CreditCard, label: "Card" },
                          { k: "netbanking", icon: Landmark, label: "Netbanking" },
                        ] as const).map((m) => (
                          <button
                            key={m.k}
                            onClick={() => setPayMethod(m.k)}
                            className={cn(
                              "flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors",
                              payMethod === m.k
                                ? "border-vmart-red bg-vmart-red/10 text-white"
                                : "border-white/15 text-zinc-300 hover:border-white/40"
                            )}
                          >
                            <m.icon className="h-4 w-4" /> {m.label}
                          </button>
                        ))}
                      </div>

                      <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                        {payMethod === "upi" && (
                          <div className="space-y-3">
                            <p className="text-sm text-zinc-400">Pay to UPI ID</p>
                            <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                              <span className="font-mono text-white">vmart-siwan@okproto</span>
                              <Smartphone className="h-4 w-4 text-vmart-red" />
                            </div>
                            <input className="input" placeholder="yourname@upi" />
                          </div>
                        )}
                        {payMethod === "card" && (
                          <div className="space-y-3">
                            <input className="input" placeholder="Card number" />
                            <div className="grid grid-cols-2 gap-3">
                              <input className="input" placeholder="MM / YY" />
                              <input className="input" placeholder="CVV" />
                            </div>
                          </div>
                        )}
                        {payMethod === "netbanking" && (
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {["SBI", "PNB", "BOB", "HDFC", "ICICI", "UCO"].map((b) => (
                              <div
                                key={b}
                                className="rounded-xl bg-white/5 px-3 py-3 text-center text-sm font-semibold text-zinc-300"
                              >
                                {b}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!placed && (
              <div className="mt-6 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:text-white"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {step < steps.length - 1 ? (
                  <button
                    onClick={next}
                    className="flex items-center gap-2 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white hover:bg-vmart-red-deep"
                  >
                    Continue <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={placeOrder}
                    disabled={processing}
                    className="flex items-center gap-2 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white hover:bg-vmart-red-deep disabled:opacity-60"
                  >
                    {processing ? "Processing…" : `Pay ${formatINR(total)}`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl glass-strong p-6 ring-1 ring-white/10 lg:sticky lg:top-28">
            <h3 className="font-display text-xl text-white">Order summary</h3>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto no-scrollbar">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i.image}
                    alt=""
                    className="h-14 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{i.name}</p>
                    <p className="text-xs text-zinc-500">
                      {i.size} · {i.color} · ×{i.qty}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {formatINR((i.salePrice ?? i.price) * i.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Coupon
              </p>
              {couponMsg ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300">
                  <span>{couponMsg}</span>
                  <button
                    onClick={() => {
                      setDiscount(0);
                      setCouponMsg(null);
                      setCoupon("");
                    }}
                    className="text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponMsg(null);
                    }}
                    placeholder="SIWAN100"
                    className="input flex-1 !py-2 !text-xs uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    className="shrink-0 rounded-xl bg-white/10 px-3 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="mt-2 text-[11px] text-zinc-500">
                Try {offers.map((o) => o.code).join(" · ")}
              </p>
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              {discount > 0 && (
                <Row label="Coupon" value={`- ${formatINR(discount)}`} />
              )}
              <Row
                label="Delivery"
                value={shipping === 0 ? "FREE" : formatINR(shipping)}
              />
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <span className="font-display text-lg text-white">Total</span>
                <span className="font-display text-lg text-vmart-red-soft">
                  {formatINR(total)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">
        {label} {required && <span className="text-vmart-red">*</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-zinc-400">
      <span>{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 36 });
  const colors = ["#e11d48", "#e7c989", "#fb7185", "#ffffff", "#9f1239"];
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const x = Math.cos(angle) * (120 + (i % 5) * 30);
        const y = Math.sin(angle) * (120 + (i % 5) * 30) - 120;
        return (
          <motion.span
            key={i}
            initial={{ x: "50%", y: "42%", opacity: 1, scale: 0.6, rotate: 0 }}
            animate={{
              x: `calc(50% + ${x}px)`,
              y: `calc(42% + ${y + 220}px)`,
              opacity: 0,
              scale: 1.1,
              rotate: 360,
            }}
            transition={{ duration: 1.1 + (i % 4) * 0.15, ease: "easeOut" }}
            className="absolute left-0 top-0 h-2.5 w-2.5 rounded-sm"
            style={{ background: colors[i % colors.length] }}
          />
        );
      })}
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
  price,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  price: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
        active ? "border-vmart-red bg-vmart-red/10" : "border-white/15 hover:border-white/40"
      )}
    >
      <Icon className="h-5 w-5 text-vmart-red" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-zinc-400">{sub}</p>
      </div>
      <span className="text-sm font-bold text-white">{price}</span>
    </button>
  );
}
