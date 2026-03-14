"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/client";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"enterPhone" | "enterOtp" | "enterPassword">("enterPhone");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await apiClient.sendOTP(phone);
      setMessage("تم إرسال رمز التحقق إلى رقم هاتفك.");
      setStep("enterOtp");
    } catch (error: any) {
      setMessage(error.message || "حدث خطأ في إرسال رمز التحقق.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await apiClient.verifyOTP(phone, otp, password);
      localStorage.setItem('token', response.data.token);
      setMessage("تم التحقق بنجاح! مرحباً بك في المنصة.");
      router.push('/');
    } catch (error: any) {
      if (error.message.includes('كلمة المرور مطلوبة')) {
        setStep("enterPassword");
        setMessage("يرجى إدخال كلمة مرور لإكمال التسجيل.");
      } else {
        setMessage(error.message || "رمز التحقق غير صحيح.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await apiClient.login(phone, password);
      localStorage.setItem('token', response.data.token);
      setMessage("تم تسجيل الدخول بنجاح!");
      router.push('/');
    } catch (error: any) {
      setMessage(error.message || "بيانات الدخول غير صحيحة.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = step === "enterPhone" ? handleSendOtp :
                     step === "enterOtp" ? handleVerifyOtp :
                     handlePasswordLogin;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">تسجيل الدخول</h1>
          <p className="mt-2 text-sm text-slate-600">
            سجل دخولك برقم الهاتف لاستكمال إجراءات الدعم والخدمات.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {step === "enterPhone" && (
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="05xxxxxxxx"
                  required
                />
              </div>
            )}

            {step === "enterOtp" && (
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="otp">
                  رمز التحقق (OTP)
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="123456"
                  required
                />
              </div>
            )}

            {step === "enterPassword" && (
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  كلمة المرور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
            )}

            {message ? (
              <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:opacity-50"
            >
              {loading ? "جاري التحميل..." :
               step === "enterPhone" ? "إرسال رمز التحقق" :
               step === "enterOtp" ? "تأكيد الرمز" :
               "تسجيل الدخول"}
            </button>

            {step === "enterOtp" && (
              <button
                type="button"
                onClick={() => {
                  setStep("enterPhone");
                  setOtp("");
                  setMessage(null);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                إعادة إرسال الرمز
              </button>
            )}

            {step === "enterPassword" && (
              <button
                type="button"
                onClick={() => {
                  setStep("enterPhone");
                  setPassword("");
                  setMessage(null);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                العودة
              </button>
            )}
          </form>

          <div className="mt-8 flex flex-col gap-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">لم تقم بالتسجيل بعد؟</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/register-parent"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-sky-600 bg-white px-4 py-3 text-center text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50"
              >
                التسجيل كولي أمر
              </Link>
              <Link
                href="/register-specialist"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                التسجيل كاختصاصي
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          بمتابعتك، فإنك توافق على شروط الاستخدام وسياسة الخصوصية.
        </p>
      </div>
    </div>
  );
}
