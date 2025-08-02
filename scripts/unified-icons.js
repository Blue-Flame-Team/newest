// ملف جافاسكريبت موحد لوظائف الأيقونات في جميع النسخ (الموبايل والكمبيوتر)

(function() {
    'use strict';
    
    // تهيئة وظائف الأيقونات
    
    // وظيفة البحث للسطح المكتبي
    function setupDesktopSearch() {
        const searchButton = document.getElementById('search-icon');
        if (searchButton) {
            // تم العثور على زر البحث في نسخة سطح المكتب
            setupSearchPopup();
        }
    }
    
    // وظيفة البحث للجوال
    function setupMobileSearch() {
        const mobileSearchButtons = document.querySelectorAll('.mobile-search-icon, [id*="mobile-search"], .search-icon-mobile');
        
        if (mobileSearchButtons.length > 0) {
            // تم العثور على أزرار البحث
            mobileSearchButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // فتح نافذة البحث
                    if (typeof showSearchPopup === 'function') {
                        showSearchPopup();
                    }
                });
            });
        }
    }
    
    // إعداد نافذة البحث المنبثقة
    function setupSearchPopup() {
        // البحث عن عناصر النافذة المنبثقة
        const popup = document.getElementById('search-popup');
        const overlay = document.getElementById('search-overlay');
        
        if (popup && overlay) {
            // إعداد الأحداث
            document.addEventListener('click', function(e) {
                if (e.target.id === 'search-icon' || e.target.closest('#search-icon')) {
                    e.preventDefault();
                    popup.style.display = 'block';
                    overlay.style.display = 'block';
                }
                
                if (e.target === overlay || e.target.closest('.close-search')) {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }
            });
        }
    }
    
    // إعداد وظائف القوائم
    function setupMenuFunctions() {
        const menuElements = document.querySelectorAll('.menu-icon, .hamburger-menu, .mobile-menu-toggle');
        
        if (menuElements.length > 0) {
            // تم العثور على عناصر القائمة
            menuElements.forEach(element => {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // تبديل حالة القائمة
                    const menu = document.querySelector('.mobile-side-menu, .sidebar-menu');
                    if (menu) {
                        menu.classList.toggle('active');
                    }
                });
            });
        }
    }
    
    // تهيئة عامة
    function init() {
        setupDesktopSearch();
        setupMobileSearch();
        setupMenuFunctions();
    }
    
    // تشغيل عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

// تهيئة قائمة الإعدادات الموحدة
document.addEventListener('DOMContentLoaded', function() {
    // تحديد جميع أزرار الإعدادات
    const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
    
    settingsButtons.forEach(function(settingsBtn) {
        // البحث عن القائمة الأقرب
        let settingsMenu = settingsBtn.closest('.main-icons-group, .mobile-icons')?.querySelector('.settings-menu');
        
        if (!settingsMenu) {
            // إذا لم نجد قائمة، نستخدم أول قائمة موجودة في الصفحة
            settingsMenu = document.querySelector('.settings-menu');
        }
        
        if (settingsBtn && settingsMenu) {
            // نسخ القائمة الأصلية
            const clonedMenu = settingsMenu.cloneNode(true);
            clonedMenu.classList.add('settings-menu');
            document.body.appendChild(clonedMenu);
            
            // تهيئة الأحداث للقائمة
            initializeSettingsMenuListeners(clonedMenu);
            
            // فتح/إغلاق القائمة عند النقر على الزر
            settingsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // إغلاق جميع القوائم الأخرى
                document.querySelectorAll('.settings-menu').forEach(menu => {
                    if (menu !== clonedMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                // تحديد موقع القائمة
                const buttonRect = settingsBtn.getBoundingClientRect();
                clonedMenu.style.top = (buttonRect.bottom + window.scrollY + 5) + 'px';
                clonedMenu.style.right = (window.innerWidth - buttonRect.right) + 'px';
                
                // عرض/إخفاء القائمة
                clonedMenu.classList.toggle('show');
                
                // إغلاق القائمة الفرعية للتباين
                const contrastSubmenu = clonedMenu.querySelector('.contrast-submenu');
                if (contrastSubmenu) {
                    contrastSubmenu.classList.remove('show');
                }
            });
        }
    });
    
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        const settingsMenus = document.querySelectorAll('.settings-menu');
        const settingsButtons = document.querySelectorAll('.settings-toggle-btn');
        
        let clickedOnMenuOrButton = false;
        
        // التحقق من النقر على زر أو قائمة
        settingsButtons.forEach(button => {
            if (button.contains(e.target)) {
                clickedOnMenuOrButton = true;
            }
        });
        
        settingsMenus.forEach(menu => {
            if (menu.contains(e.target)) {
                clickedOnMenuOrButton = true;
            } else if (!clickedOnMenuOrButton) {
                menu.classList.remove('show');
            }
        });
    });
});

// دالة تهيئة أحداث القائمة
function initializeSettingsMenuListeners(menu) {
    // التباين
    const contrastOption = menu.querySelector('.contrast-option');
    const contrastSubmenu = menu.querySelector('.contrast-submenu');
    
    if (contrastOption && contrastSubmenu) {
        contrastOption.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contrastSubmenu.classList.toggle('show');
        });
    }
    
    // التباين الفاتح
    const contrastLight = menu.querySelector('.contrast-light');
    if (contrastLight) {
        contrastLight.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة dark-mode
            document.body.classList.remove('dark-mode');
            
            // حفظ في localStorage
            localStorage.setItem('theme', 'light');
            
            // تحديث CSS variables
            document.documentElement.style.setProperty('--primary-color', '#17a891');
            document.documentElement.style.setProperty('--secondary-color', '#24516c');
            
            // إغلاق القائمة
            menu.classList.remove('show');
            contrastSubmenu?.classList.remove('show');
            
            // فرض إعادة تحديث الصفحة للتأكد
            setTimeout(() => {
            }, 100);
        });
    }
    
    // التباين الداكن
    const contrastDark = menu.querySelector('.contrast-dark');
    if (contrastDark) {
        contrastDark.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            document.documentElement.style.setProperty('--primary-color', '#000000');
            document.documentElement.style.setProperty('--secondary-color', '#000000');
            menu.classList.remove('show');
            contrastSubmenu?.classList.remove('show');
        });
    }
    
    // الإحصائيات
    const statsOption = menu.querySelector('.stats-option');
    if (statsOption) {
        statsOption.addEventListener('click', function(e) {
            e.preventDefault();
            const isHomePage = window.location.pathname === '/' || 
                           window.location.pathname === '/index.html' || 
                           window.location.pathname.endsWith('/index.html') ||
                           window.location.pathname === '';
                           
            window.location.href = isHomePage ? 'pages/analytics.html' : '../pages/analytics.html';
        });
    }
    
    // تسجيل الخروج
    const logoutOption = menu.querySelector('.logout-option');
    if (logoutOption) {
        logoutOption.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('isLoggedIn');
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
                setTimeout(() => window.location.reload(), 500);
            }
        });
    }
}
