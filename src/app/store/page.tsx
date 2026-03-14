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

const products: Product[] = [
  {
    id: 1,
    name: "خطة تعليمية فردية للأطفال ذوي الإعاقة",
    description: "خطة شاملة للتعليم الفردي مع أمثلة ونماذج.",
    price: 15,
    category: "خطط تعليمية",
    image: "/product1.jpg",
  },
  {
    id: 2,
    name: "مخطط سلوك يومي",
    description: "مخطط تفاعلي لتتبع السلوك اليومي وتحسينه.",
    price: 10,
    category: "مخططات سلوك",
    image: "/product2.jpg",
  },
  {
    id: 3,
    name: "أوراق عمل للتخاطب",
    description: "مجموعة من الأوراق القابلة للطباعة لتمارين التخاطب.",
    price: 8,
    category: "أوراق عمل",
    image: "/product3.jpg",
  },
  {
    id: 4,
    name: "دليل PDF للأهل",
    description: "دليل شامل لدعم الأطفال ذوي الإعاقة في المنزل.",
    price: 12,
    category: "موارد PDF",
    image: "/product4.jpg",
  },
];

export default function StorePage() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-slate-900">المتجر</h1>
          <Link
            href="/cart"
            className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
          >
            السلة ({cart.length})
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          موارد تعليمية وأدوات لدعم الأطفال ذوي الإعاقة.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="aspect-square w-full rounded-2xl bg-slate-100"></div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{product.description}</p>
              <p className="mt-2 text-sm font-semibold text-sky-600">
                {product.price} دينار
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/store/${product.id}`}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  عرض التفاصيل
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                >
                  إضافة للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
