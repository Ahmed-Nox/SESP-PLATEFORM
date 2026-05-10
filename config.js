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
    apiKey:            "AIzaSyDaqELq9wH5ewLLbO7KE0du04uJmd_ndl4",
    authDomain:        "edu-plateform-mwl.firebaseapp.com",
    projectId:         "edu-plateform-mwl",
    storageBucket:     "edu-plateform-mwl.firebasestorage.app",
    messagingSenderId: "484666536360",
    appId:             "1:484666536360:web:aae1837e5a749a4c53ed9d"
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
