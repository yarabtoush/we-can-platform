# We Can - Disability Support Platform

منصة شاملة لدعم ذوي الاحتياجات الخاصة وأسرهم في الأردن، مبنية بتقنيات حديثة لتوفير خدمات متكاملة.

## 🚀 الميزات الرئيسية

### للوالدين
- تسجيل آمن مع التحقق من الهوية
- رفع التقارير الطبية وصور الأطفال
- البحث عن المختصين وحجز المواعيد
- تتبع جلسات العلاج والتقدم
- الوصول إلى الخطط التعليمية والموارد
- المشاركة في الورش والفعاليات
- متجر موارد رقمية قابلة للتحميل

### للمختصين
- تسجيل معتمد مع رفع الشهادات
- عرض على خريطة الأردن
- إدارة المواعيد والجلسات
- تتبع تقدم الأطفال
- رفع الخطط التعليمية والتقارير

### للإدارة
- لوحة تحكم شاملة
- مراجعة واعتماد طلبات التسجيل
- إدارة الورش والفعاليات
- نشر الأخبار والإعلانات
- إدارة المتجر والمنتجات
- مراجعة الشكاوى والاقتراحات
- إحصائيات مفصلة

## 🛠️ التقنيات المستخدمة

### الواجهة الأمامية (Frontend)
- **Next.js 16** - إطار عمل React مع App Router
- **Tailwind CSS 4** - تصميم متجاوب وحديث
- **TypeScript** - كتابة آمنة للكود
- **React 19** - مكتبة واجهة المستخدم

### الخادم الخلفي (Backend)
- **Node.js** - بيئة تشغيل JavaScript
- **Express.js** - إطار عمل خادم ويب
- **MongoDB** - قاعدة بيانات NoSQL
- **Mongoose** - ODM لـ MongoDB

### الأمان والمصادقة
- **JWT** - رموز الوصول الآمنة
- **bcrypt** - تشفير كلمات المرور
- **Twilio** - إرسال رسائل OTP
- **Helmet** - أمان HTTP headers

### التخزين والملفات
- **Cloudinary** - تخزين الملفات السحابي
- **Multer** - معالجة رفع الملفات

## 📋 متطلبات النظام

- Node.js 18+
- MongoDB 5+
- npm أو yarn

## 🚀 التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd we-can-platform
```

### 2. تثبيت التبعيات
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies (from root)
cd ..
npm install
```

### 3. إعداد متغيرات البيئة

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/we-can-platform
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4. تشغيل قاعدة البيانات
```bash
# تأكد من تشغيل MongoDB
mongod
```

### 5. تشغيل التطبيق
```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
npm run dev
```

### 6. الوصول للتطبيق
- الواجهة الأمامية: http://localhost:3000
- الخادم الخلفي: http://localhost:5000

## 📁 هيكل المشروع

```
we-can-platform/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── parentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Parent.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   └── parents.js
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── src/
│   ├── api/
│   │   └── client.js
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── register-parent/
│   │   └── ...
│   ├── components/
│   └── ...
├── public/
├── package.json
└── README.md
```

## 🔧 الإعدادات الإضافية

### إعداد MongoDB Atlas (للإنتاج)
1. إنشاء حساب في MongoDB Atlas
2. إنشاء cluster جديد
3. إضافة IP address (0.0.0.0/0 للتطوير)
4. إنشاء مستخدم قاعدة بيانات
5. نسخ connection string وتحديث MONGODB_URI

### إعداد Twilio (للـ OTP)
1. إنشاء حساب في Twilio
2. شراء رقم هاتف
3. نسخ Account SID و Auth Token
4. تحديث متغيرات البيئة

### إعداد Cloudinary (للملفات)
1. إنشاء حساب في Cloudinary
2. نسخ Cloud Name و API Key و API Secret
3. تحديث متغيرات البيئة

## 🚀 النشر

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Railway/Render (Backend)
1. ربط المشروع بـ GitHub
2. إضافة متغيرات البيئة
3. نشر تلقائي

### MongoDB Atlas
- قاعدة البيانات جاهزة للاستخدام

## 📊 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - إرسال OTP
- `POST /api/auth/verify-otp` - التحقق من OTP
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - المستخدم الحالي

### Parents
- `POST /api/parents/register` - تسجيل ولي أمر
- `GET /api/parents/profile` - ملف الوالد
- `PUT /api/parents/profile` - تحديث الملف
- `GET /api/parents` - جميع الوالدين (Admin)
- `PUT /api/parents/:id/status` - تحديث حالة التسجيل (Admin)

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- البريد الإلكتروني: support@we-can.com
- الموقع: https://we-can.com

## 🙏 شكر وتقدير

نشكر جميع المساهمين والمطورين الذين ساعدوا في بناء هذه المنصة لخدمة مجتمع ذوي الاحتياجات الخاصة.
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
