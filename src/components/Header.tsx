import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-slate-900">منصة دعم</span>
            <span className="text-xs text-slate-500">للأطفال ذوي الإعاقة</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          <Link className="hover:text-slate-900" href="/">
            الرئيسية
          </Link>
          <Link className="hover:text-slate-900" href="/specialists">
            خريطة المختصين
          </Link>
          <Link className="hover:text-slate-900" href="/workshops">
            ورش العمل
          </Link>
          <Link className="hover:text-slate-900" href="/news">
            الأخبار
          </Link>
          <Link className="hover:text-slate-900" href="/store">
            المتجر
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
            href="/login"
          >
            تسجيل دخول
          </Link>
          <Link
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
            href="/register-parent"
          >
            سجل الآن
          </Link>
        </div>
      </div>
    </header>
  );
}
