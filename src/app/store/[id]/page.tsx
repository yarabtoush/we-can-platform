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
  details: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "خطة تعليمية فردية للأطفال ذوي الإعاقة",
    description: "خطة شاملة للتعليم الفردي مع أمثلة ونماذج.",
    price: 15,
    category: "خطط تعليمية",
    image: "/product1.jpg",
    details: "هذه الخطة تشمل أهدافاً تعليمية، استراتيجيات، وأدوات تقييم.",
  },
  {
    id: 2,
    name: "مخطط سلوك يومي",
    description: "مخطط تفاعلي لتتبع السلوك اليومي وتحسينه.",
    price: 10,
    category: "مخططات سلوك",
    image: "/product2.jpg",
    details: "مخطط سهل الاستخدام مع رموز بصرية وتتبع تقدم.",
  },
  {
    id: 3,
    name: "أوراق عمل للتخاطب",
    description: "مجموعة من الأوراق القابلة للطباعة لتمارين التخاطب.",
    price: 8,
    category: "أوراق عمل",
    image: "/product3.jpg",
    details: "20 ورقة عمل متنوعة لمختلف مستويات التخاطب.",
  },
  {
    id: 4,
    name: "دليل PDF للأهل",
    description: "دليل شامل لدعم الأطفال ذوي الإعاقة في المنزل.",
    price: 12,
    category: "موارد PDF",
    image: "/product4.jpg",
    details: "دليل 50 صفحة مع نصائح عملية وأمثلة.",
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  const [cart, setCart] = useState<Product[]>([]);

  if (!product) {
    return <div>المنتج غير موجود</div>;
  }

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/store"
          className="text-sm text-sky-600 hover:text-sky-700"
        >
          ← العودة إلى المتجر
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="aspect-square w-full rounded-3xl bg-slate-100"></div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-slate-600">{product.category}</p>
            </div>

            <p className="text-lg text-slate-700">{product.description}</p>
            <p className="text-base text-slate-700">{product.details}</p>

            <p className="text-2xl font-semibold text-sky-600">
              {product.price} دينار
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                إضافة للسلة
              </button>
              <Link
                href="/cart"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                عرض السلة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
