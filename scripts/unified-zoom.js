// وظائف تكبير وتصغير النص في الموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // المتغيرات الأساسية
    let currentSize = parseInt(localStorage.getItem('textSize')) || 100;
    const minSize = 70;  // الحد الأدنى للتصغير
    const maxSize = 150; // الحد الأقصى للتكبير
    const step = 10;     // مقدار التغيير في كل مرة
    
    // تطبيق الحجم المحفوظ عند بدء التحميل
    // applyTextSize(currentSize);
    
    // البحث عن جميع أزرار التكبير والتصغير في الصفحة
    const zoomInButtons = document.querySelectorAll('.zoom-in-btn');
    const zoomOutButtons = document.querySelectorAll('.zoom-out-btn');
    
    // إضافة مستمعات الأحداث لأزرار التكبير
    zoomInButtons.forEach(btn => {
        btn.removeAttribute('onclick');
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentSize < maxSize) {
                currentSize += step;
                applyTextSize(currentSize);
            }
        };
    });
    
    // إضافة مستمعات الأحداث لأزرار التصغير
    zoomOutButtons.forEach(btn => {
        btn.removeAttribute('onclick');
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentSize > minSize) {
                currentSize -= step;
                applyTextSize(currentSize);
            }
        };
    });
    
    // دالة تطبيق حجم النص
    function applyTextSize(size) {
        // تحديث المتغير الحالي
        currentSize = size;
        
        // حفظ في التخزين المحلي
        localStorage.setItem('textSize', size);
        
        // تطبيق الحجم على HTML
        document.documentElement.style.fontSize = size + '%';
        
        // تحديث حالة الأزرار
        // updateButtonStates();
        
    }
    
    // دالة تحديث حالة الأزرار
    function updateButtonStates() {
        // zoomInButtons.forEach(btn => {
        //     if (currentSize >= maxSize) {
        //         btn.classList.add('disabled');
        //         btn.style.opacity = '0.5';
        //         btn.style.cursor = 'not-allowed';
        //     } else {
        //         btn.classList.remove('disabled');
        //         btn.style.opacity = '1';
        //         btn.style.cursor = 'pointer';
        //     }
        // });
        
        zoomOutButtons.forEach(btn => {
            if (currentSize <= minSize) {
                btn.classList.add('disabled');
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            } else {
                btn.classList.remove('disabled');
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        });
    }
    
    // تصدير الدالة للاستخدام العام
    window.changeFontSize = function(change) {
        const newSize = currentSize + change;
        if (newSize >= minSize && newSize <= maxSize) {
            applyTextSize(newSize);
        }
    };
    
}); 