# دليل النشر - We Can Platform

## نظرة عامة
هذا الدليل يوضح كيفية نشر منصة We Can على الإنترنت مجاناً.

## المتطلبات المسبقة

### 1. إنشاء حسابات مجانية
- [GitHub](https://github.com) - لاستضافة الكود
- [MongoDB Atlas](https://www.mongodb.com/atlas) - قاعدة البيانات
- [Vercel](https://vercel.com) - النشر المجاني للـ Frontend
- [Railway](https://railway.app) أو [Render](https://render.com) - النشر المجاني للـ Backend
- [Twilio](https://twilio.com) - إرسال OTP (اختياري)
- [Cloudinary](https://cloudinary.com) - تخزين الملفات (اختياري)

---

## الخطوة 1: إعداد قاعدة البيانات (MongoDB Atlas)

### 1.1 إنشاء حساب MongoDB Atlas
1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ حساب جديد أو سجل دخول
3. اختر الخطة المجانية (M0)

### 1.2 إنشاء Cluster
1. اضغط "Create a New Cluster"
2. اختر "M0 Cluster" (مجاني)
3. اختر المنطقة الأقرب (مثل: AWS / eu-west-1)
4. اضغط "Create Cluster"

### 1.3 إعداد المستخدم والـ IP
1. اذهب إلى "Database Access"
2. اضغط "Add New Database User"
3. أدخل اسم المستخدم وكلمة المرور
4. اختر "Read and write" permissions

### 1.4 السماح بالوصول من أي مكان
1. اذهب إلى "Network Access"
2. اضغط "Add IP Address"
3. اختر "Allow Access from Anywhere" (0.0.0.0/0)

### 1.5 الحصول على Connection String
1. اذهب إلى "Clusters"
2. اضغط "Connect"
3. اختر "Connect your application"
4. انسخ الـ connection string

### 1.6 تحديث متغيرات البيئة
```bash
# في backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/we-can-platform
```

---

## الخطوة 2: رفع المشروع إلى GitHub

### 2.1 إنشاء Repository جديد
```bash
# في GitHub.com
1. اضغط "New repository"
2. أدخل اسم المشروع: we-can-platform
3. اجعله Public أو Private
4. لا تضف README أو .gitignore (موجودان بالفعل)
5. اضغط "Create repository"
```

### 2.2 رفع الكود
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - We Can Platform"

# أضف الـ remote
git remote add origin https://github.com/YOUR_USERNAME/we-can-platform.git

# ارفع الكود
git push -u origin main
```

---

## الخطوة 3: نشر الـ Backend

### خيار 1: Railway (موصى به)

#### 3.1.1 إنشاء حساب Railway
1. اذهب إلى [Railway.app](https://railway.app)
2. سجل دخول باستخدام GitHub

#### 3.1.2 نشر المشروع
1. اضغط "New Project"
2. اختر "Deploy from GitHub repo"
3. ابحث عن `we-can-platform` واربطه
4. في Settings > Environment:
   - أضف جميع المتغيرات من `.env.example`
   - تأكد من `MONGODB_URI` و `JWT_SECRET`

#### 3.1.3 الحصول على الرابط
بعد النشر، ستحصل على رابط مثل: `https://we-can-backend.up.railway.app`

### خيار 2: Render

#### 3.2.1 إنشاء حساب Render
1. اذهب إلى [Render.com](https://render.com)
2. سجل دخول

#### 3.2.2 نشر الـ Backend
1. اضغط "New" > "Web Service"
2. اربط مع GitHub repo
3. اختر مجلد `backend`
4. في Environment:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. أضف المتغيرات البيئية

---

## الخطوة 4: نشر الـ Frontend (Vercel)

### 4.1 إنشاء حساب Vercel
1. اذهب إلى [Vercel.com](https://vercel.com)
2. سجل دخول باستخدام GitHub

### 4.2 نشر المشروع
1. اضغط "New Project"
2. اربط مع GitHub repo `we-can-platform`
3. في Configure Project:
   - Framework Preset: Next.js
   - Root Directory: `./` (المجلد الرئيسي)
4. في Environment Variables:
   - `NEXT_PUBLIC_API_URL`: رابط الـ backend (مثل: https://we-can-backend.up.railway.app/api)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: مفتاح Google Maps

### 4.3 النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل النشر
3. ستحصل على رابط مثل: `https://we-can-platform.vercel.app`

---

## الخطوة 5: إعداد الخدمات الإضافية (اختياري)

### Twilio للـ OTP
1. إنشاء حساب في Twilio
2. شراء رقم هاتف
3. نسخ Account SID و Auth Token
4. تحديث المتغيرات البيئية

### Cloudinary للملفات
1. إنشاء حساب مجاني
2. نسخ Cloud Name و API Keys
3. تحديث المتغيرات البيئية

---

## الخطوة 6: التحقق من النشر

### 6.1 اختبار الـ Backend
```bash
# اختبار API
curl https://your-backend-url/api/health
```

### 6.2 اختبار الـ Frontend
1. اذهب إلى رابط Vercel
2. جرب تسجيل الدخول
3. تأكد من عمل جميع الصفحات

### 6.3 إعداد المستخدم الإداري
```bash
# في الـ backend، شغل setup
npm run setup
```

---

## استكشاف الأخطاء

### مشاكل شائعة:

1. **MongoDB Connection Error**
   - تأكد من صحة connection string
   - تأكد من السماح بالوصول من 0.0.0.0/0

2. **Environment Variables**
   - تأكد من إضافة جميع المتغيرات المطلوبة
   - لا تنس إعادة النشر بعد التغيير

3. **CORS Errors**
   - أضف رابط Vercel إلى `FRONTEND_URL` في backend

4. **Build Errors**
   - تأكد من وجود جميع dependencies
   - تحقق من syntax errors

---

## الصيانة والتحديث

### تحديث الكود:
```bash
# في المشروع المحلي
git add .
git commit -m "Update description"
git push origin main
```

سيتم النشر التلقائي على Vercel و Railway.

### مراقبة الأداء:
- Vercel Analytics
- Railway Logs
- MongoDB Atlas Monitoring

---

## الروابط النهائية

بعد النشر ستحصل على:

- **الموقع الرئيسي**: https://we-can-platform.vercel.app
- **لوحة الإدارة**: https://we-can-platform.vercel.app/admin
- **API Backend**: https://your-backend-url/api

🎉 **تهانينا! منصتك الآن تعمل على الإنترنت مجاناً!**