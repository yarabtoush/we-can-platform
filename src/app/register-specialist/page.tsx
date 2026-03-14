import Link from "next/link";

export default function RegisterSpecialistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-lg backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">تسجيل اختصاصي</h1>
          <p className="mt-2 text-sm text-slate-600">
            هذا القسم مخصص للاختصاصيين الراغبين في تقديم الخدمات والدعم للأسر.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-sky-50 p-5 text-sm text-slate-700">
              (هذه صفحة نموذجية. يمكن إضافة نموذج التسجيل الفعلي لاحقاً.)
            </div>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
