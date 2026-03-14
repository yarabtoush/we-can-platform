"use client";

import Link from "next/link";
import { useState } from "react";
import apiClient from "../../api/client";

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

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // First, send OTP if not already done
      if (!localStorage.getItem('otpSent')) {
        await apiClient.sendOTP(formData.phone);
        localStorage.setItem('otpSent', 'true');
        setMessage("تم إرسال رمز التحقق إلى رقم هاتفك. يرجى إدخال الرمز في صفحة تسجيل الدخول.");
        setLoading(false);
        return;
      }

      // Create FormData for file uploads
      const submitData = new FormData();
      submitData.append('fullName', formData.parentName);
      submitData.append('nationalId', formData.nationalId);
      submitData.append('childName', formData.childName);
      submitData.append('childNationalId', formData.childNationalId);
      submitData.append('disabilityType', formData.disabilityType);
      submitData.append('password', formData.password);

      // Add medical reports
      if (formData.medicalReports) {
        Array.from(formData.medicalReports).forEach((file) => {
          submitData.append('medicalReports', file);
        });
      }

      // Add child photos
      if (formData.childPhotos) {
        Array.from(formData.childPhotos).forEach((file) => {
          submitData.append('childPhotos', file);
        });
      }

      // Add signature if available
      if (formData.signature) {
        // Convert signature to file if it's a data URL
        const signatureBlob = await fetch(formData.signature).then(res => res.blob());
        submitData.append('signature', signatureBlob, 'signature.png');
      }

      await apiClient.registerParent(submitData);
      setMessage("تم إرسال طلب التسجيل بنجاح! سيتم مراجعته من قبل الإدارة خلال 24 ساعة.");
      localStorage.removeItem('otpSent');
    } catch (error: any) {
      setMessage(error.message || "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
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
                  className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
                >
                  إرسال الطلب
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
