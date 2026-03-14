import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "منصة دعم الأطفال",
  description:
    "منصة لدعم الأطفال ذوي الإعاقة وأسرهم في الأردن: تقييم، خطط تعليمية، ورش، ومجتمع متخصصين.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} antialiased`}>{children}</body>
    </html>
  );
}
