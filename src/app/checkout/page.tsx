"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function CheckoutPage() {
  const [cart] = useState<Product[]>([
    {
      id: 1,
      name: "خطة تعليمية فردية للأطفال ذوي الإعاقة",
      description: "خطة شاملة للتعليم الفردي مع أمثلة ونماذج.",
      price: 15,
      category: "خطط تعليمية",
      image: "/product1.jpg",
    },
  ]); // Placeholder
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [message, setMessage] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    // Placeholder for payment processing
    setMessage("تم الدفع بنجاح! يمكنك الآن تحميل المنتجات.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">الدفع</h1>
        <p className="mt-2 text-sm text-slate-600">
          أكمل عملية الشراء للحصول على المنتجات.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">معلومات الدفع</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                طريقة الدفع
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              >
                <option value="card">بطاقة ائتمانية</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    رقم البطاقة
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      رمز الأمان
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="w-full rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            >
              إتمام الدفع
            </button>

            {message && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                {message}
                <div className="mt-4">
                  <Link
                    href="/downloads"
                    className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-500"
                  >
                    تحميل المنتجات
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">ملخص الطلب</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-100"></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600">{item.price} دينار</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  المجموع
                </span>
                <span className="text-lg font-semibold text-sky-600">
                  {total} دينار
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
