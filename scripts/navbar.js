// كود القوائم المنسدلة - مخصص للتفاعل بالتحويم
document.addEventListener('DOMContentLoaded', function() {
    // تحديد ما إذا كان الجهاز الحالي هو جهاز لمس
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // إذا كان الجهاز يدعم اللمس، نترك التعامل مع القوائم لملف main.js
    if (isTouchDevice) return;
    
    // الحصول على جميع عناصر القائمة المنسدلة لأجهزة الكمبيوتر (غير اللمسية)
    const dropdownItems = document.querySelectorAll('.dropdown');
    
    // إضافة تفاعلات التحويم للقوائم المنسدلة
    dropdownItems.forEach(function(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu) {
            // عرض القائمة المنسدلة عند تحريك المؤشر فوق العنصر
            dropdown.addEventListener('mouseenter', function() {
                menu.style.display = 'block';
            });
            
            // إخفاء القائمة المنسدلة عند مغادرة المؤشر
            dropdown.addEventListener('mouseleave', function() {
                menu.style.display = 'none';
            });
        }
    });
});
