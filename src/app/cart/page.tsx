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

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: "خطة تعليمية فردية للأطفال ذوي الإعاقة",
      description: "خطة شاملة للتعليم الفردي مع أمثلة ونماذج.",
      price: 15,
      category: "خطط تعليمية",
      image: "/product1.jpg",
    },
  ]); // Placeholder, in real app use context or state management

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">السلة</h1>
        <p className="mt-2 text-sm text-slate-600">
          مراجعة المنتجات المختارة قبل الدفع.
        </p>

        {cart.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-lg text-slate-600">السلة فارغة</p>
            <Link
              href="/store"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            >
              تصفح المتجر
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-20 w-20 rounded-2xl bg-slate-100"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  <p className="text-sm font-semibold text-sky-600">
                    {item.price} دينار
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-2xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
                >
                  إزالة
                </button>
              </div>
            ))}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  المجموع: {total} دينار
                </span>
                <Link
                  href="/checkout"
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                >
                  المتابعة للدفع
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
