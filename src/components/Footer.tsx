import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">تواصل معنا</p>
            <p className="mt-3 text-sm text-slate-600">البريد الإلكتروني: info@daam-platform.org</p>
            <p className="mt-1 text-sm text-slate-600">الهاتف: 009627xxxxxxxx</p>
            <p className="mt-1 text-sm text-slate-600">عمان، الأردن</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-900">روابط</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-slate-900" href="/">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/specialists">
                  خريطة المختصين
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/workshops">
                  ورش العمل
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/news">
                  الأخبار
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-900" href="/store">
                  المتجر
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-900">تابعنا</p>
            <div className="mt-4 flex items-center gap-3">
              {[
                {
                  label: "فيسبوك",
                  href: "#",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H8.896v-2.888h1.542V9.797c0-1.523.905-2.366 2.292-2.366.664 0 1.357.118 1.357.118v1.497h-.767c-.756 0-.99.468-.99.946v1.14h1.683l-.269 2.888h-1.414v6.99C18.343 21.128 22 16.99 22 12z" />
                    </svg>
                  ),
                },
                {
                  label: "تويتر",
                  href: "#",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.23 4.23 0 0 0 1.86-2.33 8.41 8.41 0 0 1-2.67 1.02 4.2 4.2 0 0 0-7.14 3.82 11.92 11.92 0 0 1-8.66-4.39 4.18 4.18 0 0 0 1.3 5.6 4.14 4.14 0 0 1-1.9-.52v.05a4.2 4.2 0 0 0 3.37 4.11 4.22 4.22 0 0 1-1.9.07 4.21 4.21 0 0 0 3.93 2.92A8.43 8.43 0 0 1 2 19.54a11.89 11.89 0 0 0 6.45 1.89c7.74 0 11.97-6.42 11.97-12v-.55A8.62 8.62 0 0 0 22.46 6Z" />
                    </svg>
                  ),
                },
                {
                  label: "إنستغرام",
                  href: "#",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10z" />
                      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                      <circle cx="17.5" cy="6.5" r="1.5" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                  href={item.href}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-900">سياسة الخصوصية</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-slate-900" href="#">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900" href="#">
                  حماية البيانات
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900" href="#">
                  تواصل مع الدعم
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} منصة دعم. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
