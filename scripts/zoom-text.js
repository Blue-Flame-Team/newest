// وظائف تكبير وتصغير النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على أزرار التكبير والتصغير
    const zoomInBtn = document.querySelector('.zoom-in-btn');
    const zoomOutBtn = document.querySelector('.zoom-out-btn');
    
    // التحقق من وجود تفضيل مسبق للمستخدم
    let currentFontSize = localStorage.getItem('fontSizeLevel') || 0;
    currentFontSize = parseInt(currentFontSize);
    
    // تطبيق حجم الخط المحفوظ عند تحميل الصفحة
    applyFontSize(currentFontSize);
    
    // إضافة مستمع أحداث لزر التكبير إذا كان موجودًا
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            // زيادة مستوى حجم الخط (بحد أقصى 5 مستويات)
            if (currentFontSize < 5) {
                currentFontSize++;
                applyFontSize(currentFontSize);
                // حفظ التفضيل في التخزين المحلي
                localStorage.setItem('fontSizeLevel', currentFontSize);
            }
        });
    }
    
    // إضافة مستمع أحداث لزر التصغير إذا كان موجودًا
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            // تقليل مستوى حجم الخط (بحد أدنى -3 مستويات)
            if (currentFontSize > -3) {
                currentFontSize--;
                applyFontSize(currentFontSize);
                // حفظ التفضيل في التخزين المحلي
                localStorage.setItem('fontSizeLevel', currentFontSize);
            }
        });
    }
    
    // دالة لتطبيق حجم الخط على جميع عناصر النص في الصفحة
    function applyFontSize(level) {
        // قائمة بجميع العناصر التي نريد تغيير حجم النص فيها
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, button, input, textarea, label, .settings-option span');
        
        // تحديد نسبة التغيير بناءً على المستوى (كل مستوى يزيد أو ينقص بنسبة 10%)
        const sizeChange = 1 + (level * 0.1);
        
        // تطبيق التغيير على جميع العناصر
        textElements.forEach(function(element) {
            // الحصول على حجم الخط الأصلي إذا لم يتم تخزينه بعد
            if (!element.dataset.originalFontSize) {
                const computedStyle = window.getComputedStyle(element);
                // استخراج الرقم فقط من حجم الخط (مثلاً "16px" -> 16)
                const originalSize = parseFloat(computedStyle.fontSize);
                element.dataset.originalFontSize = originalSize;
            }
            
            // تطبيق الحجم الجديد
            const originalSize = parseFloat(element.dataset.originalFontSize);
            const newSize = originalSize * sizeChange;
            element.style.fontSize = newSize + 'px';
        });
    }
});
