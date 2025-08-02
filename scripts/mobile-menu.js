// ملف جافاسكريبت للقائمة المتنقلة في الموبايل

document.addEventListener('DOMContentLoaded', function() {
    
    // عناصر القائمة المتنقلة
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    const dropdownLinks = document.querySelectorAll('.mobile-side-menu-links a.has-dropdown');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    const aboutDropdown = document.querySelector('.dropdown-toggle');
    const aboutSubmenu = document.getElementById('about-submenu');
    
    // التحقق من وجود العناصر الأساسية
    if (!hamburgerMenu || !mobileMenuOverlay || !mobileSideMenu) {

        return;
    }
    
    // دالة إغلاق القائمة
    function closeMenu() {
        mobileMenuOverlay.classList.remove('show');
        mobileSideMenu.classList.remove('show');
        document.body.style.overflow = ''; // إعادة السماح بالتمرير عند إغلاق القائمة
    }
    
    // فتح القائمة عند النقر على زر الهامبرغر
    hamburgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenuOverlay.classList.add('show');
        mobileSideMenu.classList.add('show');
        document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة عند فتح القائمة
    });
    
    // إغلاق القائمة عند النقر على الخلفية
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMenu();
        }
    });

    // تبسيط معالجة قائمة نبذة عنا المنسدلة
    if (aboutDropdown && aboutSubmenu) {
        aboutDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // تبديل حالة القائمة الفرعية
            aboutSubmenu.classList.toggle('open');
            // تبديل حالة الزر المنسدل
            this.classList.toggle('active');
        });
    }
    
    // معالجة بقية القوائم المنسدلة
    if (dropdownLinks && dropdownLinks.length > 0) {
        // إضافة معالج أحداث لكل رابط منسدل ما عدا نبذة عنا
        dropdownLinks.forEach(function(link) {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // تبديل حالة السهم
                    this.classList.toggle('open');
                });
            }
        });
    }
    
    // ربط أحداث النقر على أزرار القائمة
    const menuLinks = document.querySelectorAll('.mobile-side-menu-links a:not(.has-dropdown)');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // إغلاق القائمة عند النقر على رابط
            setTimeout(closeMenu, 100);
        });
    });
    
    // ربط أحداث النقر على عناصر القائمة الفرعية
    const submenuItems = document.querySelectorAll('.mobile-submenu .submenu-item');
    submenuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // إغلاق القائمة عند النقر على عنصر القائمة الفرعية
            setTimeout(closeMenu, 100);
        });
    });
    
    // إضافة معالج لزر تسجيل الدخول في القائمة المتنقلة
    if (mobileLoginBtn && loginModal) {
        mobileLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // أغلق القائمة المتنقلة
            closeMenu();
            // افتح نافذة تسجيل الدخول
            loginModal.style.display = 'flex';
        });
    }
});
