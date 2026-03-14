import Link from "next/link";

export default function DownloadsPage() {
  const downloads = [
    {
      id: 1,
      name: "خطة تعليمية فردية للأطفال ذوي الإعاقة",
      file: "/downloads/product1.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">تحميلاتك</h1>
        <p className="mt-2 text-sm text-slate-600">
          قم بتحميل المنتجات التي اشتريتها.
        </p>

        <div className="mt-8 space-y-6">
          {downloads.map((download) => (
            <div
              key={download.id}
              className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {download.name}
                </h3>
                <p className="text-sm text-slate-600">PDF - 2.5 MB</p>
              </div>
              <a
                href={download.file}
                download
                className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                تحميل
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/store"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
          >
            تصفح المزيد من المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
}
