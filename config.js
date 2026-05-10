// ════════════════════════════════════════════════
//  📋 SMT PLATFORM — ملف الإعداد
//  غيّر القيم هنا فقط، ومش هتحتاج تلمس أي ملف تاني
// ════════════════════════════════════════════════

const APP_CONFIG = {

  // ── اسم المنصة ──
  name_ar:    "منصة التعليمية",        // الاسم بالعربي
  name_en:    "Educational Platform",  // الاسم بالإنجليزي
  short_name: "EduPlatform",           // اسم مختصر (للـ PWA)
  tagline:    "نظام إدارة المراكز التعليمية",

  // ── Student ID Prefix ──
  // مثال: "STU" → STU-001 | "EGY" → EGY-001
  student_id_prefix: "STU",

  // ── Firebase Config ──
  firebase: {
    apiKey:            "FIREBASE_API_KEY",
    authDomain:        "FIREBASE_AUTH_DOMAIN",
    projectId:         "FIREBASE_PROJECT_ID",
    storageBucket:     "FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
    appId:             "FIREBASE_APP_ID"
  },

  // ── إعدادات الجلسة ──
  session: {
    admin_timeout_minutes:   60,   // وقت تسجيل الخروج التلقائي للمدرس
    student_timeout_minutes: 120,  // وقت تسجيل الخروج التلقائي للطالب
    max_devices:             3,    // الحد الأقصى للأجهزة للطالب
  },

  // ── إعدادات عامة ──
  default_lesson_require_code: true,  // هل الحصة تحتاج كود بشكل افتراضي؟
  copyright_year: new Date().getFullYear(),

};

// تجميد الـ config عشان ميتعدلش بالغلط
Object.freeze(APP_CONFIG);
Object.freeze(APP_CONFIG.firebase);
Object.freeze(APP_CONFIG.session);
