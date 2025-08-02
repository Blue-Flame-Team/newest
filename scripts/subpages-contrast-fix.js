// إصلاح قائمة التباين الفرعية في الصفحات الفرعية
document.addEventListener('DOMContentLoaded', function() {
    
    
    // تأخير لضمان تحميل جميع العناصر
    setTimeout(function() {
        // البحث عن جميع أزرار التباين الرئيسية
        const contrastOptions = document.querySelectorAll('.contrast-option');
        
        
        contrastOptions.forEach((contrastOption, index) => {
            
            
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                
                
                // البحث عن القائمة الفرعية المرتبطة - تحسين البحث
                let contrastSubmenu = this.parentElement.querySelector('.contrast-submenu');
                
                // إذا لم نجدها في العنصر الأب، ابحث في العنصر نفسه
                if (!contrastSubmenu) {
                    contrastSubmenu = this.nextElementSibling;
                    if (contrastSubmenu && !contrastSubmenu.classList.contains('contrast-submenu')) {
                        contrastSubmenu = null;
                    }
                }
                
                // البحث في القائمة الرئيسية
                if (!contrastSubmenu) {
                    const settingsMenu = this.closest('.settings-menu');
                    if (settingsMenu) {
                        contrastSubmenu = settingsMenu.querySelector('.contrast-submenu');
                    }
                }
                
                if (contrastSubmenu) {
                    // تبديل عرض القائمة الفرعية
                    const isVisible = contrastSubmenu.classList.contains('show');
                    
                    // إخفاء جميع القوائم الفرعية الأخرى أولاً
                    document.querySelectorAll('.contrast-submenu').forEach(otherSubmenu => {
                        otherSubmenu.classList.remove('show');
                    });
                    
                    // إظهار/إخفاء القائمة المطلوبة
                    if (!isVisible) {
                        contrastSubmenu.classList.add('show');
                        
                    } else {
                        
                    }
                } else {

                    // محاولة إضافية للبحث في الصفحة كاملة
                    const allSubmenus = document.querySelectorAll('.contrast-submenu');
                    
                }
            });
        });
    }, 300); // انتظار 300ms لضمان تحميل جميع العناصر
    
    // معالجة خيارات التباين الفرعية
    const contrastLightOptions = document.querySelectorAll('.contrast-light');
    const contrastDarkOptions = document.querySelectorAll('.contrast-dark');
    
    // التباين الفاتح
    contrastLightOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            
            
            // إزالة الوضع المظلم
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            
            // حفظ الإعداد
            localStorage.setItem('theme', 'light');
            localStorage.setItem('contrast-mode', 'light');
            
            // إغلاق جميع القوائم
            closeAllMenus();
        });
    });
    
    // التباين الداكن
    contrastDarkOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            
            
            // تطبيق الوضع المظلم
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            
            // حفظ الإعداد
            localStorage.setItem('theme', 'dark');
            localStorage.setItem('contrast-mode', 'dark');
            
            // إغلاق جميع القوائم
            closeAllMenus();
        });
    });
    
    // دالة إغلاق جميع القوائم
    function closeAllMenus() {
        document.querySelectorAll('.settings-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        
        document.querySelectorAll('.contrast-submenu').forEach(submenu => {
            submenu.classList.remove('show');
        });
    }
    
    // إغلاق القوائم عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.settings-menu') && 
            !e.target.closest('.settings-toggle-btn') &&
            !e.target.closest('.contrast-option')) {
            closeAllMenus();
        }
    });
    
    // استعادة حالة التباين المحفوظة
    const savedTheme = localStorage.getItem('theme');
    const savedContrastMode = localStorage.getItem('contrast-mode');
    
    if (savedTheme === 'dark' || savedContrastMode === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        
    } else if (savedTheme === 'light' || savedContrastMode === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        
    }
    
    // إضافة CSS ديناميكي لضمان عرض القائمة الفرعية
    const style = document.createElement('style');
    style.textContent = `
        /* إصلاحات خاصة بقائمة التباين الفرعية */
        .contrast-submenu {
            display: none !important;
            position: static !important;
            width: 100% !important;
            background-color: rgba(240, 240, 240, 0.95) !important;
            margin: 5px 0 0 0 !important;
            padding: 5px !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            border-radius: 6px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        
        .contrast-submenu.show {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .contrast-submenu .settings-option {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 8px 12px !important;
            margin: 2px 0 !important;
            border-radius: 4px !important;
            text-decoration: none !important;
            transition: all 0.2s ease !important;
            background-color: rgba(255, 255, 255, 0.7) !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            cursor: pointer !important;
        }
        
        .contrast-submenu .settings-option:hover {
            background-color: rgba(0, 161, 154, 0.1) !important;
            border-color: rgba(0, 161, 154, 0.2) !important;
            transform: translateY(-1px) !important;
        }
        
        .contrast-submenu .settings-option span {
            font-size: 13px !important;
            color: #333 !important;
            margin-left: 8px !important;
            font-weight: 500 !important;
        }
        
        .contrast-submenu .settings-option img {
            width: 18px !important;
            height: 18px !important;
            opacity: 0.8 !important;
        }
        
        /* تحسينات للشاشات الصغيرة */
        @media (max-width: 768px) {
            .contrast-submenu {
                padding: 3px !important;
                border-radius: 4px !important;
            }
            
            .contrast-submenu .settings-option {
                padding: 6px 10px !important;
                font-size: 12px !important;
                margin: 1px 0 !important;
            }
            
            .contrast-submenu .settings-option span {
                font-size: 12px !important;
            }
            
            .contrast-submenu .settings-option img {
                width: 16px !important;
                height: 16px !important;
            }
        }
        
        /* تأكيد أن القائمة الرئيسية للإعدادات تظهر فوق كل شيء */
        .settings-menu {
            z-index: 9999 !important;
        }
        
        .settings-menu.show {
            z-index: 10000 !important;
        }
    `;
    document.head.appendChild(style);
    
    
}); 