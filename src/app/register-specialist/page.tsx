"use client";

import Link from "next/link";
import { useState } from "react";
import supabase from "../../lib/supabase";

type FormData = {
  fullName: string;
  phone: string;
  password: string;
  specialization: string;
  experienceYears: number;
  certifications: FileList | null;
  location: {
    governorate: string;
    city: string;
    address: string;
  };
  bio: string;
  hourlyRate: number;
  availability: string;
};

export default function RegisterSpecialistPage() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    password: "",
    specialization: "",
    experienceYears: 0,
    certifications: null,
    location: {
      governorate: "",
      city: "",
      address: "",
    },
    bio: "",
    hourlyRate: 0,
    availability: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: keyof FormData['location'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value }
    }));
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

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP in database
      const { error } = await supabase
        .from('users')
        .insert({
          phone_number: formData.phone,
          password_hash: formData.password,
          role: 'specialist',
          otp_code: otp,
          otp_expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        });

      if (error) throw error;

      setOtpSent(true);
      setMessage(`تم إرسال رمز التحقق إلى ${formData.phone}`);
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

      // Create specialist record
      const { error: specialistError } = await supabase
        .from('specialists')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          specialization: formData.specialization,
          experience_years: formData.experienceYears,
          certifications: [], // Will be updated with file uploads
          location: [formData.location],
          bio: formData.bio,
          hourly_rate: formData.hourlyRate,
          availability: formData.availability,
        });

      if (specialistError) throw specialistError;

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!otpSent) {
      await sendOTP();
    } else {
      await verifyOTP();
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
            <h2 className="text-xl font-semibold text-slate-900">المعلومات الشخصية</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">الاسم الكامل</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="أدخل اسمك الكامل"
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
                placeholder="+962xxxxxxxxx"
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
                placeholder="كلمة مرور قوية"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">الخبرة والتخصص</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">التخصص</label>
              <select
                value={formData.specialization}
                onChange={(e) => updateFormData("specialization", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                required
              >
                <option value="">اختر التخصص</option>
                <option value="أخصائي نفسي">أخصائي نفسي</option>
                <option value="أخصائي علاج وظيفي">أخصائي علاج وظيفي</option>
                <option value="أخصائي تخاطب">أخصائي تخاطب</option>
                <option value="أخصائي سمعيات">أخصائي سمعيات</option>
                <option value="أخصائي بصريات">أخصائي بصريات</option>
                <option value="معلم تربية خاصة">معلم تربية خاصة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">سنوات الخبرة</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => updateFormData("experienceYears", parseInt(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="عدد سنوات الخبرة"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">نبذة عنك</label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="اكتب نبذة قصيرة عن خبراتك ومهاراتك"
                rows={4}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">الموقع والأسعار</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">المحافظة</label>
                <select
                  value={formData.location.governorate}
                  onChange={(e) => updateLocation("governorate", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  required
                >
                  <option value="">اختر المحافظة</option>
                  <option value="عمان">عمان</option>
                  <option value="إربد">إربد</option>
                  <option value="الزرقاء">الزرقاء</option>
                  <option value="المفرق">المفرق</option>
                  <option value="العقبة">العقبة</option>
                  <option value="معان">معان</option>
                  <option value="الطفيلة">الطفيلة</option>
                  <option value="الكرك">الكرك</option>
                  <option value="مادبا">مادبا</option>
                  <option value="جرش">جرش</option>
                  <option value="عجلون">عجلون</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">المدينة</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => updateLocation("city", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="المدينة"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">العنوان التفصيلي</label>
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) => updateLocation("address", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="العنوان الكامل"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">السعر بالساعة (دينار أردني)</label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => updateFormData("hourlyRate", parseFloat(e.target.value))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="50"
                min="0"
                step="0.5"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">الشهادات والتوفر</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700">الشهادات والتراخيص</label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => updateFormData("certifications", e.target.files)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
              <p className="mt-1 text-xs text-slate-500">يمكن رفع ملفات PDF أو صور (JPG, PNG)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">أوقات التوفر</label>
              <textarea
                value={formData.availability}
                onChange={(e) => updateFormData("availability", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                placeholder="مثال: الأحد - الخميس، 9 صباحاً - 5 مساءً"
                rows={3}
                required
              />
            </div>
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-slate-900">مراجعة البيانات</h3>
              <div><strong>الاسم:</strong> {formData.fullName}</div>
              <div><strong>التخصص:</strong> {formData.specialization}</div>
              <div><strong>الخبرة:</strong> {formData.experienceYears} سنوات</div>
              <div><strong>الموقع:</strong> {formData.location.governorate}, {formData.location.city}</div>
              <div><strong>السعر:</strong> {formData.hourlyRate} دينار/ساعة</div>
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
              <h1 className="text-2xl font-semibold text-slate-900">تسجيل اختصاصي</h1>
              <Link
                href="/login"
                className="text-sm text-sky-600 hover:text-sky-700"
              >
                لديك حساب؟ سجل دخولك
              </Link>
            </div>
            <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse">
              {[1, 2, 3, 4].map((num) => (
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
              {step < 4 ? (
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
