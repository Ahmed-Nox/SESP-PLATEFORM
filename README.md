# 🎓 SMT Platform — دليل الإعداد والـ Deploy

## 📁 هيكل الملفات

```
smt-platform/
├── index.html              ← صفحة تسجيل الدخول
├── admin.html              ← لوحة المدرس
├── student.html            ← بوابة الطالب
├── firestore.rules         ← قواعد الأمان
├── firestore.indexes.json  ← indexes الـ queries
├── netlify.toml            ← إعدادات Netlify
└── README.md               ← هذا الملف
```

---

## ⚡ خطوات الإعداد

### 1️⃣ إنشاء Firebase Project

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اضغط **Add project** واختر اسماً للمشروع
3. فعّل **Google Analytics** (اختياري)
4. بعد الإنشاء، اضغط على أيقونة **Web** `</>`
5. سجّل التطبيق واحفظ بيانات الـ Config

### 2️⃣ تفعيل الخدمات في Firebase

```
Firebase Console → Authentication → Sign-in method → Email/Password → Enable
Firebase Console → Firestore Database → Create database → Start in production mode
```

### 3️⃣ وضع Firebase Config في الملفات

افتح الملفات الثلاثة (`index.html`, `admin.html`, `student.html`) وابحث عن:

```javascript
const firebaseConfig = {
  apiKey:            "FIREBASE_API_KEY",        // ← ضع قيمتك
  authDomain:        "FIREBASE_AUTH_DOMAIN",    // ← ضع قيمتك
  projectId:         "FIREBASE_PROJECT_ID",     // ← ضع قيمتك
  storageBucket:     "FIREBASE_STORAGE_BUCKET", // ← ضع قيمتك
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID", // ← ضع قيمتك
  appId:             "FIREBASE_APP_ID"          // ← ضع قيمتك
};
```

استبدل القيم بالبيانات من Firebase Console → Project Settings → Your apps.

### 4️⃣ رفع Firestore Rules

```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# تهيئة المشروع
firebase init firestore

# رفع الـ rules والـ indexes
firebase deploy --only firestore
```

أو من Firebase Console → Firestore → Rules → انسخ محتوى `firestore.rules` والصقه.

### 5️⃣ إنشاء حساب المدرس

من Firebase Console → Authentication → Add user:
- أدخل إيميل وباسورد المدرس

ثم من Firestore → users → Add document:
- **Document ID**: نفس الـ UID من Authentication
- **البيانات**:
```json
{
  "name": "اسم المدرس",
  "email": "teacher@school.com",
  "role": "admin",
  "isActive": true,
  "createdAt": (serverTimestamp)
}
```

### 6️⃣ Deploy على Netlify

**الطريقة السهلة (Drag & Drop):**
1. اذهب إلى [netlify.com](https://netlify.com)
2. اسحب مجلد المشروع وأفلته في الصفحة الرئيسية
3. خلاص! 🎉

**الطريقة بالـ CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

---

## 🗃️ هيكل Firestore Collections

```
users/
  {uid}/
    name, email, role, studentId, phone, groupId, isActive, createdAt

groups/
  {id}/
    name, subject, level, teacherId, studentCount, createdAt

attendance/
  {studentId_date}/
    studentId, groupId, teacherId, dateStr, status, note, recordedAt

grades/
  {id}/
    studentId, examId, groupId, score, maxScore, type, gradedAt

exams/
  {id}/
    title, groupId, teacherId, date, maxScore, type, createdAt

assignments/
  {id}/
    title, description, groupId, teacherId, dueDate, submissions{}, createdAt

notifications/
  {id}/
    toUid, type, message, relatedId, isRead, createdAt

lessons/
  {id}/
    title, description, groupId, teacherId, videoUrl, date,
    code, codeUsed, accessList[], createdAt

analytics/
  {groupId}/
    groupId, avgGrade, topStudent, atRiskCount, studentCount, lastUpdated
```

---

## 🔒 ملاحظات أمان

- الـ Firestore Rules تمنع الطلاب من قراءة بيانات بعضهم
- الطالب يقدر يعدل اسمه فقط — مش باقي البياناتلا
- كود الحصة one-time — بعد الاستخدام يتغلق
- تغيير باسورد الطالب يتم عن طريق رابط إيميل

---

## ❓ مشاكل شائعة

**"Missing or insufficient permissions"**
→ الـ Firestore Rules مش اترفعت — ارفعها من الـ CLI أو Console

**"The query requires an index"**
→ الـ Firestore Indexes مش اترفعت — نفذ `firebase deploy --only firestore`

**الـ Secondary App بتعمل logout للمدرس**
→ ده مش المفروض يحصل — تأكد إن `secondaryAuth` منفصل عن `auth`

**"auth/email-already-in-use"**
→ الطالب عنده حساب بالفعل — استخدم إيميل تاني
