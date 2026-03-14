export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
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
              <span className="text-lg font-semibold text-slate-900">
                منصة دعم
              </span>
              <span className="text-xs text-slate-500">
                للأطفال ذوي الإعاقة
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
            <a className="hover:text-slate-900" href="#home">
              الرئيسية
            </a>
            <a className="hover:text-slate-900" href="/specialists">
              خريطة المختصين
            </a>
            <a className="hover:text-slate-900" href="#workshops">
              ورش العمل
            </a>
            <a className="hover:text-slate-900" href="#news">
              الأخبار
            </a>
            <a className="hover:text-slate-900" href="#store">
              المتجر
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
              href="#login"
            >
              تسجيل دخول
            </a>
            <a
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              href="#register"
            >
              سجل الآن
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700">
                منصة مجانية لدعم الأسر
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                كل طفل يستحق فرصة
                <span className="block text-sky-600">للنمو والنجاح</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-600">
                نقدم خدمات متكاملة لدعم الأطفال ذوي الإعاقة وعائلاتهم في الأردن: تقييم
                نمو، خطط تعليم فردية، ورش للمربين والمختصين، وربط مباشر مع فريق
                متخصص.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-sky-500"
                  href="#register"
                >
                  تسجيل كوليّ أمر
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                  href="#register"
                >
                  تسجيل كاختصاصي
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-sky-50 via-white to-emerald-50 shadow-lg">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_50%)]" />
                <div className="relative flex aspect-[4/3] w-full items-center justify-center p-10">
                  <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          خريطة المختصين
                        </p>
                        <p className="text-xs text-slate-500">
                          العثور على الدعم القريب منك
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3Zm0 0v10m0 0l-2-2m2 2l2-2"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="h-40 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
                        معاينة خريطة
                        <br />
                        (تفاعلية قريبًا)
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500">
                        عيّن موقعك للحصول على نتائج أدق
                      </span>
                      <a
                        className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                        href="/specialists"
                      >
                        اطلع على خريطة المختصين
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">عن المبادرة</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                تهدف المنصة إلى توفير شبكة دعم متكاملة للعائلات والأطفال ذوي الإعاقة في الأردن، من خلال تقديم موارد معتمدة، ومختصين متمرسين، وأدوات قابلة للتنفيذ في المنزل والمدرسة.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                نعمل مع شركائنا المحليين لتطوير برامج تستند إلى الاحتياجات الفعلية لكل طفل، مع التأكيد على المشاركة الفعالة للأهل والتحفيز على بناء مجتمعات شاملة ومستدامة.
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 shadow-lg">
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                    ✓
                  </span>
                  <span>تقييم شامل وتوصيف احتياجات فردية.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                    ✓
                  </span>
                  <span>دعم مباشر من أخصائيين محليين.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                    ✓
                  </span>
                  <span>ورش عمل لأولياء الأمور والمربين.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              ما نقدمه
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              خدمات متخصصة وموجهة لمساعدة الأطفال وأسرهم من خلال فريق محترف ودعم
              مستمر.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "تقييم الطفل",
                description:
                  "تقييم شامل للاحتياجات التعليمية والنموية لتحديد نقاط القوة وفرص الدعم.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2Zm0 0v2m0 4h.01M17 17H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2Z"
                    />
                  </svg>
                ),
              },
              {
                title: "خطط تعليم فردية",
                description:
                  "خطة تعليمية مخصصة بناءً على قدرات الطفل واحتياجاته لضمان نمو تدريجي.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m-15 4.5h15M6 7.5h12"
                    />
                  </svg>
                ),
              },
              {
                title: "تعديل السلوك",
                description:
                  "دعم سلوكي إيجابي للحفاظ على بيئة تعلم آمنة ومحفزة.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m-6 6h6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12c0 4.97-4.03 9-9 9a8.96 8.96 0 01-6.72-2.95L3 21l1.95-2.28A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9Z"
                    />
                  </svg>
                ),
              },
              {
                title: "ورش للأهل",
                description:
                  "ورش تفاعلية لتمكين الأسرة في دعم الطفل عبر استراتيجيات يومية.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12v.01"
                    />
                  </svg>
                ),
              },
              {
                title: "ربط المختصين",
                description:
                  "شبكة من الأخصائيين المعتمدين للحصول على استشارات ودعم مباشر.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                ),
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="success" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              قصص نجاح
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              تعرف على بعض العائلات والأطفال الذين حققوا تقدماً ملحوظاً بمساعدتنا.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "سارة",
                role: "أم لطفل في المرحلة الابتدائية",
                quote:
                  "منصة دعم أعطتنا خطة واضحة ومستمرة، وأحدثت فرقاً حقيقياً في حياة طفلنا.",
              },
              {
                name: "عمر",
                role: "أخصائي تخاطب",
                quote:
                  "الربط مع الأهل والعمل المشترك أدى إلى نتائج أسرع وأكثر استدامة.",
              },
              {
                name: "ليلى",
                role: "مربية في مدرسة خاصة",
                quote:
                  "الورش ساعدتني على تقديم دعم أفضل لكل طفل واحتياجاته الخاصة.",
              },
            ].map((story) => (
              <div
                key={story.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-sky-100 text-center text-sky-700">
                    <span className="mt-2 block text-2xl font-semibold">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {story.name}
                    </p>
                    <p className="text-xs text-slate-500">{story.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  “{story.quote}”
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="news" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              آخر الأخبار
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              تابع أحدث المشاريع والفعاليات والمقالات المفيدة للعائلة.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "ورشة دعم التحصيل الدراسي",
                date: "مارس 2026",
                excerpt:
                  "انضم إلينا في ورشة عمل تفاعلية حول بناء خطط تعليمية مرنة للأطفال.",
              },
              {
                title: "دليل لأولياء الأمور",
                date: "فبراير 2026",
                excerpt:
                  "نشرنا دليلاً جديداً يحتوي على أدوات يومية لدعم السلوك الإيجابي.",
              },
              {
                title: "مقابلات مع مختصين",
                date: "يناير 2026",
                excerpt:
                  "سلسلة فيديوهات لخبراء يتحدثون عن أحدث الاستراتيجيات في التأهيل.",
              },
            ].map((news) => (
              <article
                key={news.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-slate-500">
                    {news.date}
                  </p>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    جديد
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {news.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {news.excerpt}
                </p>
                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
                  href="#"
                >
                  اقرأ المزيد
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              شركاؤنا
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              فخورون بالشراكات مع مؤسسات محلية تهدف لتعزيز الخدمات والدعم.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="text-sm font-semibold text-slate-500">
                  شعار
                  <span className="mr-1 font-semibold text-slate-400">{idx + 1}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">تواصل معنا</p>
              <p className="mt-3 text-sm text-slate-600">
                البريد الإلكتروني: info@daam-platform.org
              </p>
              <p className="mt-1 text-sm text-slate-600">
                الهاتف: 009627xxxxxxxx
              </p>
              <p className="mt-1 text-sm text-slate-600">
                عمان، الأردن
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">روابط</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <a className="hover:text-slate-900" href="#about">
                    عن المبادرة
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#services">
                    خدماتنا
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#success">
                    قصص النجاح
                  </a>
                </li>
                <li>
                  <a className="hover:text-slate-900" href="#news">
                    الأخبار
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">تابعنا</p>
              <div className="mt-4 flex items-center gap-3">
                {[
                  {
                    label: "فيسبوك",
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
                    href: "#",
                  },
                  {
                    label: "تويتر",
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
                    href: "#",
                  },
                  {
                    label: "إنستغرام",
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
                    href: "#",
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
              <p className="text-lg font-semibold text-slate-900">
                سياسة الخصوصية
              </p>
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
    </div>
  );
}
