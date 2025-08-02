/**
 * نظام تسجيل الدخول الموحد للصفحات الفرعية - ملف التوجيه
 * تم نقل جميع وظائف هذا الملف إلى auth-system.js
 * هذا الملف موجود فقط للحفاظ على التوافق مع الصفحات القديمة
 */

// توجيه الوظائف إلى نظام المصادقة الجديد
document.addEventListener('DOMContentLoaded', function() {
    
    // تحقق من وجود نظام المصادقة الجديد
    if (typeof AuthSystem !== 'undefined') {
    } else {

        
        // إضافة النظام الجديد ديناميكياً إذا لم يكن موجوداً
        const script = document.createElement('script');
        script.src = '../scripts/auth-system.js';
        script.async = true;
        script.onload = function() {
            // تهيئة النظام بعد التحميل
            if (typeof AuthSystem !== 'undefined') {
                AuthSystem.init();
            }
        };
        document.head.appendChild(script);
    }
});
