// إصلاح قائمة التباين الفرعية - إصدار محسن
(function() {
    'use strict';
    
    
    
    // دالة انتظار تحميل العناصر
    function waitForElements(selector, callback, maxWait = 5000) {
        const startTime = Date.now();
        
        function checkElements() {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                callback(elements);
            } else if (Date.now() - startTime < maxWait) {
                setTimeout(checkElements, 100);
            } else {

            }
        }
        
        checkElements();
    }
    
    // دالة إضافة CSS الأساسي
    function addContrastSubmenuCSS() {
        const existingStyle = document.querySelector('#contrast-submenu-fix-styles');
        if (existingStyle) existingStyle.remove();
        
        const style = document.createElement('style');
        style.id = 'contrast-submenu-fix-styles';
        style.textContent = `
            /* إصلاح قائمة التباين الفرعية */
            .contrast-submenu {
                display: none !important;
                position: static !important;
                width: 100% !important;
                background-color: rgba(248, 248, 248, 0.98) !important;
                margin: 8px 0 0 0 !important;
                padding: 8px !important;
                border: 1px solid rgba(0, 161, 154, 0.2) !important;
                border-radius: 8px !important;
                box-shadow: 0 4px 12px rgba(0, 161, 154, 0.15) !important;
                overflow: hidden !important;
                z-index: 1000 !important;
                transition: all 0.3s ease !important;
            }
            
            .contrast-submenu.show {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }
            
            .contrast-submenu .settings-option {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 10px 15px !important;
                margin: 3px 0 !important;
                border-radius: 6px !important;
                text-decoration: none !important;
                transition: all 0.2s ease !important;
                background-color: rgba(255, 255, 255, 0.8) !important;
                border: 1px solid rgba(0, 161, 154, 0.1) !important;
                cursor: pointer !important;
                color: #333 !important;
            }
            
            .contrast-submenu .settings-option:hover {
                background-color: rgba(0, 161, 154, 0.1) !important;
                border-color: rgba(0, 161, 154, 0.3) !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 2px 8px rgba(0, 161, 154, 0.2) !important;
            }
            
            .contrast-submenu .settings-option:active {
                transform: translateY(0) !important;
                background-color: rgba(0, 161, 154, 0.2) !important;
            }
            
            .contrast-submenu .settings-option span {
                font-size: 14px !important;
                color: #333 !important;
                margin-left: 10px !important;
                font-weight: 500 !important;
                flex-grow: 1 !important;
            }
            
            .contrast-submenu .settings-option img {
                width: 20px !important;
                height: 20px !important;
                opacity: 0.8 !important;
                transition: opacity 0.2s ease !important;
            }
            
            .contrast-submenu .settings-option:hover img {
                opacity: 1 !important;
            }
            
            /* تحسينات للشاشات الصغيرة */
            @media (max-width: 768px) {
                .contrast-submenu {
                    padding: 6px !important;
                    margin: 5px 0 0 0 !important;
                }
                
                .contrast-submenu .settings-option {
                    padding: 8px 12px !important;
                    margin: 2px 0 !important;
                }
                
                .contrast-submenu .settings-option span {
                    font-size: 13px !important;
                    margin-left: 8px !important;
                }
                
                .contrast-submenu .settings-option img {
                    width: 18px !important;
                    height: 18px !important;
                }
            }
            
            @media (max-width: 480px) {
                .contrast-submenu .settings-option {
                    padding: 6px 10px !important;
                }
                
                .contrast-submenu .settings-option span {
                    font-size: 12px !important;
                }
                
                .contrast-submenu .settings-option img {
                    width: 16px !important;
                    height: 16px !important;
                }
            }
        `;
        document.head.appendChild(style);
        
    }
    
    // دالة إعداد قائمة التباين الفرعية
    function setupContrastSubmenu() {
        // إضافة CSS أولاً
        addContrastSubmenuCSS();
        
        // انتظار تحميل عناصر التباين
        waitForElements('.contrast-option', function(contrastOptions) {
            
            
            contrastOptions.forEach((contrastOption, index) => {
                // إزالة المستمعات القديمة إذا وجدت
                const newContrastOption = contrastOption.cloneNode(true);
                contrastOption.parentNode.replaceChild(newContrastOption, contrastOption);
                
                newContrastOption.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    
                    
                    // البحث عن القائمة الفرعية بطرق متعددة
                    let submenu = null;
                    
                    // الطريقة الأولى: في نفس العنصر الأب
                    submenu = this.parentElement.querySelector('.contrast-submenu');
                    
                    // الطريقة الثانية: العنصر التالي مباشرة
                    if (!submenu) {
                        const nextElement = this.nextElementSibling;
                        if (nextElement && nextElement.classList.contains('contrast-submenu')) {
                            submenu = nextElement;
                        }
                    }
                    
                    // الطريقة الثالثة: في قائمة الإعدادات الرئيسية
                    if (!submenu) {
                        const settingsMenu = this.closest('.settings-menu');
                        if (settingsMenu) {
                            submenu = settingsMenu.querySelector('.contrast-submenu');
                        }
                    }
                    
                    // الطريقة الرابعة: في كامل الصفحة
                    if (!submenu) {
                        const allSubmenus = document.querySelectorAll('.contrast-submenu');
                        if (allSubmenus.length > 0) {
                            submenu = allSubmenus[0]; // أول قائمة فرعية موجودة
                        }
                    }
                    
                    if (submenu) {
                        // إخفاء جميع القوائم الفرعية الأخرى
                        document.querySelectorAll('.contrast-submenu').forEach(otherSubmenu => {
                            if (otherSubmenu !== submenu) {
                                otherSubmenu.classList.remove('show');
                            }
                        });
                        
                        // تبديل عرض القائمة المطلوبة
                        submenu.classList.toggle('show');
                        
                        const isVisible = submenu.classList.contains('show');
                        
                        
                        // تأكد من أن القائمة تظهر بشكل صحيح
                        if (isVisible) {
                            submenu.style.display = 'block';
                            submenu.style.opacity = '1';
                            submenu.style.visibility = 'visible';
                        }
                    } else {

                        
                        // تشخيص إضافي
                        
                        
                        
                        
                    }
                });
                
                
            });
        });
        
        // إعداد خيارات التباين الفرعية
        waitForElements('.contrast-light, .contrast-dark', function(options) {
            
            
            options.forEach((option, index) => {
                const newOption = option.cloneNode(true);
                option.parentNode.replaceChild(newOption, option);
                
                newOption.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isLightMode = this.classList.contains('contrast-light');
                    
                    if (isLightMode) {
                        
                        document.body.classList.remove('dark-mode', 'dark-contrast');
                        document.body.classList.add('light-mode', 'light-contrast');
                        localStorage.setItem('theme', 'light');
                        localStorage.setItem('contrast-mode', 'light');
                    } else {
                        
                        document.body.classList.remove('light-mode', 'light-contrast');
                        document.body.classList.add('dark-mode', 'dark-contrast');
                        localStorage.setItem('theme', 'dark');
                        localStorage.setItem('contrast-mode', 'dark');
                    }
                    
                    // إغلاق جميع القوائم
                    document.querySelectorAll('.settings-menu, .contrast-submenu').forEach(menu => {
                        menu.classList.remove('show');
                    });
                });
            });
        });
    }
    
    // دالة إغلاق القوائم عند النقر خارجها
    function setupOutsideClickHandler() {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.settings-menu') && 
                !e.target.closest('.settings-toggle-btn') &&
                !e.target.closest('.contrast-option') &&
                !e.target.closest('.contrast-submenu')) {
                
                document.querySelectorAll('.contrast-submenu, .settings-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }
    
    // دالة استعادة حالة التباين المحفوظة
    function restoreSavedContrast() {
        const savedTheme = localStorage.getItem('theme');
        const savedContrastMode = localStorage.getItem('contrast-mode');
        
        if (savedTheme === 'dark' || savedContrastMode === 'dark') {
            document.body.classList.add('dark-mode', 'dark-contrast');
            document.body.classList.remove('light-mode', 'light-contrast');
            
        } else if (savedTheme === 'light' || savedContrastMode === 'light') {
            document.body.classList.add('light-mode', 'light-contrast');
            document.body.classList.remove('dark-mode', 'dark-contrast');
            
        }
    }
    
    // التهيئة الرئيسية
    function init() {
        
        
        // انتظار تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // تأخير لضمان تحميل جميع السكريپتات الأخرى
        setTimeout(() => {
            setupContrastSubmenu();
            setupOutsideClickHandler();
            restoreSavedContrast();
            
        }, 1000); // زيادة التأخير لضمان تحميل كامل
    }
    
    // بدء التهيئة عند تحميل النافذة أيضاً
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // تأكد إضافي عند تحميل النافذة
    window.addEventListener('load', function() {
        setTimeout(init, 500);
    });
    
})(); 