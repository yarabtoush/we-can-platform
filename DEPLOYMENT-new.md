# دليل النشر - We Can Platform (Supabase Migration)

## نظرة عامة
هذا الدليل يوضح كيفية نشر منصة We Can على الإنترنت مجاناً باستخدام Supabase.

## المتطلبات المسبقة

### 1. إنشاء حسابات مجانية
- [GitHub](https://github.com) - لاستضافة الكود
- [Supabase](https://supabase.com) - قاعدة البيانات والـ backend (مجاني)
- [Vercel](https://vercel.com) - النشر المجاني للـ Frontend
- [Twilio](https://twilio.com) - إرسال OTP (اختياري)
- [Cloudinary](https://cloudinary.com) - تخزين الملفات (اختياري)

---

## الخطوة 1: إعداد Supabase

### 1.1 إنشاء حساب Supabase
1. اذهب إلى [Supabase.com](https://supabase.com)
2. سجل حساب جديد (مجاني)
3. اضغط "New Project"
4. أدخل اسم المشروع: `we-can-platform`
5. اختر المنطقة الأقرب (مثل: EU West)
6. أدخل كلمة مرور قوية لقاعدة البيانات
7. اضغط "Create new project"

### 1.2 إعداد قاعدة البيانات
1. انتظر حتى ينشأ المشروع (دقيقتين)
2. اذهب إلى "SQL Editor" من القائمة الجانبية
3. انسخ محتوى ملف `supabase-schema.sql` والصقه
4. اضغط "Run" لإنشاء الجداول والـ policies

### 1.3 الحصول على مفاتيح API
1. اذهب إلى "Settings" > "API"
2. انسخ:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (احتفظ به سراً)

### 1.4 إنشاء مستخدم إداري
1. اذهب إلى "SQL Editor"
2. شغل هذا الأمر (غير رقم الهاتف وكلمة المرور):
```sql
INSERT INTO users (phone_number, password_hash, role, is_verified, is_approved)
VALUES ('+962xxxxxxxxx', crypt('your-admin-password', gen_salt('bf')), 'admin', true, true);
```

---

## الخطوة 2: رفع المشروع إلى GitHub

### 2.1 إنشاء Repository جديد
```bash
# في GitHub.com
1. اضغط "New repository"
2. أدخل اسم المشروع: we-can-platform
3. اجعله Public (مجاني)
4. لا تضف README أو .gitignore (موجودان بالفعل)
5. اضغط "Create repository"
```

### 2.2 رفع الكود
```bash
# في مجلد المشروع
git add .
git commit -m "Migrate to Supabase - production ready"
git remote add origin https://github.com/YOUR_USERNAME/we-can-platform.git
git push -u origin main
```

---

## الخطوة 3: نشر الـ Frontend (Vercel)

### 3.1 إنشاء حساب Vercel
1. اذهب إلى [Vercel.com](https://vercel.com)
2. سجل دخول باستخدام GitHub

### 3.2 نشر المشروع
1. اضغط "New Project"
2. اربط مع GitHub repo `we-can-platform`
3. في Configure Project:
   - Framework Preset: Next.js
   - Root Directory: `./`
4. في Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: رابط Supabase (مثل: https://xxxxx.supabase.co)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: مفتاح anon
   - `NEXT_PUBLIC_API_URL`: نفس رابط Supabase + /api (اختياري للـ backend)
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: مفتاح Google Maps

### 3.3 النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل النشر
3. ستحصل على رابط مثل: `https://we-can-platform.vercel.app`

---

## الخطوة 4: إعداد الخدمات الإضافية (اختياري)

### Twilio للـ OTP
1. إنشاء حساب في Twilio
2. شراء رقم هاتف
3. نسخ Account SID و Auth Token
4. أضف إلى Supabase environment variables:
   - اذهب إلى Supabase > Settings > Environment variables
   - أضف: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

### Cloudinary للملفات
1. إنشاء حساب مجاني
2. نسخ Cloud Name و API Keys
3. أضف إلى Supabase environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

---

## الخطوة 5: التحقق من النشر

### 5.1 اختبار الاتصال بـ Supabase
1. اذهب إلى رابط Vercel
2. جرب تسجيل الدخول
3. تأكد من عمل جميع الصفحات

### 5.2 اختبار لوحة الإدارة
1. سجل دخول بالمستخدم الإداري الذي أنشأته
2. اذهب إلى `/admin`
3. تأكد من ظهور بيانات الوالدين

---

## استكشاف الأخطاء

### مشاكل شائعة:

1. **Supabase Connection Error**
   - تأكد من صحة URL و keys
   - تأكد من تفعيل RLS policies

2. **Environment Variables**
   - تأكد من إضافة جميع المتغيرات المطلوبة
   - لا تنس إعادة النشر بعد التغيير

3. **Admin Login**
   - تأكد من إنشاء المستخدم الإداري في قاعدة البيانات
   - استخدم رقم الهاتف وكلمة المرور الصحيحة

4. **RLS Policies**
   - إذا لم تظهر البيانات، تحقق من RLS policies في Supabase

---

## ملاحظات مهمة

- **الأمان**: لا تشارك service_role key مع أي شخص
- **النسخ الاحتياطي**: Supabase يقوم بنسخ احتياطي تلقائي
- **التحديثات**: يمكن تحديث الـ schema من SQL Editor
- **التكلفة**: الطبقة المجانية تكفي لمعظم الاستخدامات

**تهانينا! 🎉 المنصة الآن على الإنترنت مجاناً مع Supabase!**