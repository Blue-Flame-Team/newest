/* كود جافاسكريبت للقائمة المنسدلة في وضع الموبايل */

document.addEventListener('DOMContentLoaded', function() {
    // عناصر القائمة المنسدلة
    const aboutBtn = document.querySelector('.mobile-about-btn');
    const aboutDropdown = document.querySelector('.about-dropdown');
    
    // التحقق من وجود العناصر قبل إضافة الأحداث
    if (aboutBtn && aboutDropdown) {
        // إغلاق القائمة عند النقر في أي مكان في الصفحة
        document.addEventListener('click', function(e) {
            // إذا كان النقر ليس على زر القائمة أو القائمة نفسها، أغلق القائمة
            if (!aboutBtn.contains(e.target) && !aboutDropdown.contains(e.target)) {
                aboutDropdown.classList.remove('show');
                aboutBtn.classList.remove('dropdown-open');
            }
        });
        
        // فتح/إغلاق القائمة عند النقر على الزر
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // منع انتشار الحدث
            
            // تبديل حالة القائمة
            aboutDropdown.classList.toggle('show');
            aboutBtn.classList.toggle('dropdown-open');
            
            // تغيير اتجاه السهم
            const arrow = aboutBtn.querySelector('.dropdown-arrow');
            if (arrow) {
                if (aboutDropdown.classList.contains('show')) {
                    arrow.innerHTML = '&#9650;'; // سهم لأعلى
                } else {
                    arrow.innerHTML = '&#9660;'; // سهم لأسفل
                }
            }
        });
        
        // إغلاق القائمة عند النقر على أحد عناصرها
        const dropdownLinks = aboutDropdown.querySelectorAll('a');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                aboutDropdown.classList.remove('show');
                aboutBtn.classList.remove('dropdown-open');
            });
        });
    }
});
