"use client";

import Link from "next/link";
import { useState } from "react";
import supabase from "../../lib/supabase";

type FormData = {
  parentName: string;
  nationalId: string;
  phone: string;
  password: string;
  childName: string;
  childNationalId: string;
  disabilityType: string;
  medicalReports: FileList | null;
  childPhotos: FileList | null;
  documents: FileList | null;
  signature: string;
};

export default function RegisterParentPage() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    nationalId: "",
    phone: "",
    password: "",
    childName: "",
    childNationalId: "",
    disabilityType: "",
    medicalReports: null,
    childPhotos: null,
    documents: null,
    signature: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendOTP = async () => {
    if (!formData.phone) {
      setMessage("يرجى إدخال رقم الهاتف");
      return;
    }

    setLoading(true);
    try {
      // Check if phone already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('phone_number', formData.phone)
        .single();

      if (existingUser) {
        setMessage("رقم الهاتف مسجل مسبقاً");
        return;
      }

      // Generate OTP (in production, use Twilio or similar)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP in database
      const { error } = await supabase
        .from('users')
        .insert({
          phone_number: formData.phone,
          password_hash: formData.password, // In production, hash this
          role: 'parent',
          otp_code: otp,
          otp_expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
        });

      if (error) throw error;

      setOtpSent(true);
      setMessage(`تم إرسال رمز التحقق إلى ${formData.phone}`);
      // In production: send SMS with Twilio
      alert(`رمز التحقق: ${otp}`); // For testing only

    } catch (error: any) {
      setMessage("فشل في إرسال رمز التحقق");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otpCode) {
      setMessage("يرجى إدخال رمز التحقق");
      return;
    }

    setLoading(true);
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', formData.phone)
        .eq('otp_code', otpCode)
        .gt('otp_expires_at', new Date().toISOString())
        .single();

      if (error || !user) {
        setMessage("رمز التحقق غير صحيح أو منتهي الصلاحية");
        return;
      }

      // Update user as verified
      await supabase
        .from('users')
        .update({
          is_verified: true,
          otp_code: null,
          otp_expires_at: null
        })
        .eq('id', user.id);

      // Create parent record
      const { error: parentError } = await supabase
        .from('parents')
        .insert({
          user_id: user.id,
          full_name: formData.parentName,
          national_id: formData.nationalId,
          child_name: formData.childName,
          child_national_id: formData.childNationalId,
          disability_type: formData.disabilityType,
          medical_reports: [], // Will be updated with file uploads
          child_photos: [],
          documents: [],
          signature: formData.signature,
        });

      if (parentError) throw parentError;

      setMessage("تم التسجيل بنجاح! يرجى انتظار الموافقة من الإدارة.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (error: any) {
      setMessage("فشل في إكمال التسجيل");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!otpSent) {
      await sendOTP();
    } else {
      await verifyOTP();
    }
  };

  const renderStep = () => {
    if (otpSent) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">التحقق من رقم الهاتف</h2>
          <p className="text-slate-600">تم إرسال رمز التحقق إلى {formData.phone}</p>
          <div>
            <label className="block text-sm font-medium text-slate-700">رمز التحقق (6 أرقام)</label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>
          <button
            type="button"
            onClick={verifyOTP}
            disabled={loading}
            className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 focus:ring-4 focus:ring-sky-100 disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : "تحقق من الرمز"}
          </button>
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            تعديل رقم الهاتف
          </button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">معلومات ولي الأمر</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">الاسم الكامل</label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => updateFormData("parentName", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">رقم الهوية الوطنية</label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={(e) => updateFormData("nationalId", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="xxxxxxxxx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">رقم الهاتف</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="05xxxxxxxx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">كلمة المرور</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="أدخل كلمة مرور قوية"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">معلومات الطفل</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">اسم الطفل</label>
              <input
                type="text"
                value={formData.childName}
                onChange={(e) => updateFormData("childName", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="أدخل اسم الطفل"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">رقم الهوية الوطنية للطفل</label>
              <input
                type="text"
                value={formData.childNationalId}
                onChange={(e) => updateFormData("childNationalId", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="xxxxxxxxx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">نوع الإعاقة</label>
              <select
                value={formData.disabilityType}
                onChange={(e) => updateFormData("disabilityType", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                required
              >
                <option value="">اختر نوع الإعاقة</option>
                <option value="physical">إعاقة جسدية</option>
                <option value="intellectual">إعاقة ذهنية</option>
                <option value="learning">إعاقة تعلمية</option>
                <option value="sensory">إعاقة حسية</option>
                <option value="other">أخرى</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">رفع الملفات</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">التقارير الطبية</label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.png"
                onChange={(e) => updateFormData("medicalReports", e.target.files)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">صور الطفل</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => updateFormData("childPhotos", e.target.files)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">الوثائق الأخرى</label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => updateFormData("documents", e.target.files)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">التوقيع الإلكتروني</h2>
            <p className="text-sm text-slate-600">
              يرجى التوقيع إلكترونياً لتأكيد صحة البيانات المقدمة.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <canvas
                width={400}
                height={200}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50"
                style={{ touchAction: "none" }}
                onMouseDown={(e) => {
                  // Placeholder for signature logic
                  updateFormData("signature", "توقيع إلكتروني");
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => updateFormData("signature", "توقيع إلكتروني")}
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            >
              توقيع
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">مراجعة البيانات</h2>
            <div className="space-y-4 text-sm">
              <div><strong>الاسم الكامل:</strong> {formData.parentName}</div>
              <div><strong>رقم الهوية:</strong> {formData.nationalId}</div>
              <div><strong>رقم الهاتف:</strong> {formData.phone}</div>
              <div><strong>اسم الطفل:</strong> {formData.childName}</div>
              <div><strong>رقم هوية الطفل:</strong> {formData.childNationalId}</div>
              <div><strong>نوع الإعاقة:</strong> {formData.disabilityType}</div>
              <div><strong>التوقيع:</strong> {formData.signature ? "تم التوقيع" : "لم يتم التوقيع"}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-lg backdrop-blur">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-slate-900">تسجيل ولي أمر</h1>
              <Link
                href="/login"
                className="text-sm text-sky-600 hover:text-sky-700"
              >
                لديك حساب؟ سجل دخولك
              </Link>
            </div>
            <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    step >= num
                      ? "bg-sky-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            {message ? (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                {message}
              </div>
            ) : null}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  السابق
                </button>
              ) : (
                <div />
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 disabled:opacity-50"
                >
                  {loading ? "جاري الإرسال..." : otpSent ? "إرسال الطلب" : "إرسال رمز التحقق"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
