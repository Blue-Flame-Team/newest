// سكريبت للتحكم في السلايد الجانبي للخدمات في نسخة الموبايل
document.addEventListener('DOMContentLoaded', function() {
    // العناصر المطلوبة 
    const menuToggle = document.querySelector('.services-menu-toggle');
    const menuClose = document.querySelector('.services-menu-close');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    // فتح القائمة عند النقر على زر التبديل
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebarMenu.classList.add('open');
            // إضافة طبقة تعتيم خلف القائمة
            addOverlay();
        });
    }
    
    // إغلاق القائمة عند النقر على زر الإغلاق
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            sidebarMenu.classList.remove('open');
            // إزالة طبقة التعتيم
            removeOverlay();
        });
    }
    
    // إضافة طبقة تعتيم خلف القائمة
    function addOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'services-menu-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        
        document.body.appendChild(overlay);
        
        // إغلاق القائمة عند النقر على الطبقة
        overlay.addEventListener('click', function() {
            sidebarMenu.classList.remove('open');
            removeOverlay();
        });
    }
    
    // إزالة طبقة التعتيم
    function removeOverlay() {
        const overlay = document.querySelector('.services-menu-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // إغلاق القائمة عند تغيير حجم النافذة للشاشة الكبيرة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && sidebarMenu.classList.contains('open')) {
            sidebarMenu.classList.remove('open');
            removeOverlay();
        }
    });
});
