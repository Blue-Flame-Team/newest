// مودال الإعدادات الموحد - نسخة شاملة لجميع الوظائف
(function(window) {
    'use strict';

    // فئة مودال الإعدادات المتكامل
    class UnifiedSettingsModal {
        constructor(options = {}) {
            // الإعدادات الافتراضية
            this.options = {
                targetSelector: '.settings-modal', // المحدد الافتراضي
                toggleButtonSelector: '.settings-toggle-btn',
                onContrastChange: null,
                onZoomChange: null,
                defaultMode: 'light',
                minZoom: 0.7,
                maxZoom: 1.5,
                zoomStep: 0.1,
                ...options
            };

            // تهيئة العناصر
            this.initElements();
            
            // إعداد الأحداث
            this.setupEvents();
            
            // تطبيق الوضع الافتراضي
            this.applyDefaultSettings();
        }

        // تهيئة العناصر
        initElements() {
            // العثور على العناصر الرئيسية
            this.container = document.querySelector(this.options.targetSelector);
            this.toggleButton = document.querySelector(this.options.toggleButtonSelector);
            
            if (!this.container || !this.toggleButton) {

                return;
            }

            // تحديد العناصر الداخلية
            this.settingsMenu = this.container.querySelector('.settings-menu');
            this.contrastOption = this.container.querySelector('.contrast-option');
            this.contrastSubmenu = this.container.querySelector('.contrast-submenu');
            this.contrastLightOption = this.container.querySelector('.contrast-light');
            this.contrastDarkOption = this.container.querySelector('.contrast-dark');
            this.zoomInOption = this.container.querySelector('.zoom-in-btn');
            this.zoomOutOption = this.container.querySelector('.zoom-out-btn');
            this.zoomResetOption = this.container.querySelector('.zoom-reset-btn');
            this.logoutOption = this.container.querySelector('.logout-option');
        }

        // إعداد الأحداث
        setupEvents() {
            // فتح/إغلاق القائمة
            if (this.toggleButton) {
                this.toggleButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleMenu();
                });
            }

            // معالجة خيارات التباين
            if (this.contrastLightOption) {
                this.contrastLightOption.addEventListener('click', () => this.setContrastMode('light'));
            }

            if (this.contrastDarkOption) {
                this.contrastDarkOption.addEventListener('click', () => this.setContrastMode('dark'));
            }

            // معالجة خيارات التكبير
            if (this.zoomInOption) {
                this.zoomInOption.addEventListener('click', () => this.adjustZoom('in'));
            }

            if (this.zoomOutOption) {
                this.zoomOutOption.addEventListener('click', () => this.adjustZoom('out'));
            }

            if (this.zoomResetOption) {
                this.zoomResetOption.addEventListener('click', () => this.adjustZoom('reset'));
            }

            // معالجة تسجيل الخروج
            if (this.logoutOption) {
                this.logoutOption.addEventListener('click', () => this.handleLogout());
            }

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (this.settingsMenu && 
                    !this.settingsMenu.contains(e.target) && 
                    !this.toggleButton.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }

        // تبديل القائمة
        toggleMenu() {
            if (!this.settingsMenu) return;

            // تبديل الظهور
            this.settingsMenu.classList.toggle('show');

            // إغلاق القائمة الفرعية للتباين
            if (this.contrastSubmenu) {
                this.contrastSubmenu.classList.remove('show');
            }

            // تموضع القائمة
            this.positionMenu();
        }

        // إغلاق القائمة
        closeMenu() {
            if (this.settingsMenu) {
                this.settingsMenu.classList.remove('show');
                
                // إغلاق القائمة الفرعية للتباين
                if (this.contrastSubmenu) {
                    this.contrastSubmenu.classList.remove('show');
                }
            }
        }

        // تموضع القائمة
        positionMenu() {
            if (!this.settingsMenu || !this.toggleButton) return;

            const buttonRect = this.toggleButton.getBoundingClientRect();
            
            // تحديد الموضع بناءً على موقع الزر
            this.settingsMenu.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
            this.settingsMenu.style.right = `${window.innerWidth - buttonRect.right}px`;
        }

        // تعيين وضع التباين
        setContrastMode(mode) {
            // إزالة الأوضاع السابقة
            document.body.classList.remove('light-mode', 'dark-mode');
            
            // إضافة الوضع الجديد
            document.body.classList.add(`${mode}-mode`);
            
            // حفظ الوضع
            localStorage.setItem('contrast', mode);
            
            // إغلاق القائمة
            this.closeMenu();
            
            // تنفيذ دالة الاسترجاع إن وجدت
            if (typeof this.options.onContrastChange === 'function') {
                this.options.onContrastChange(mode);
            }
        }

        // تعديل التكبير
        adjustZoom(action) {
            const currentZoom = parseFloat(localStorage.getItem('zoom') || '1');
            let newZoom = currentZoom;

            switch(action) {
                case 'in':
                    newZoom = Math.min(currentZoom + this.options.zoomStep, this.options.maxZoom);
                    break;
                case 'out':
                    newZoom = Math.max(currentZoom - this.options.zoomStep, this.options.minZoom);
                    break;
                case 'reset':
                    newZoom = 1;
                    break;
            }

            // تطبيق التكبير
            this.applyZoom(newZoom);
        }

        // تطبيق التكبير
        applyZoom(zoom) {
            // تطبيق التكبير على جميع العناصر النصية
            const textElements = document.querySelectorAll(
                '.text-content, p, h1, h2, h3, h4, h5, h6, span, div, a, button, input, textarea, label, li, td, th'
            );
            
            textElements.forEach(element => {
                // تجاهل العناصر المستثناة
                if (this.shouldExcludeFromZoom(element)) return;

                try {
                    element.style.transform = `scale(${zoom})`;
                    element.style.transformOrigin = 'right top';
                    element.style.display = 'inline-block';
                } catch (error) {

                }
            });

            // حفظ التكبير
            localStorage.setItem('zoom', zoom.toString());
            
            // تنفيذ دالة الاسترجاع إن وجدت
            if (typeof this.options.onZoomChange === 'function') {
                this.options.onZoomChange(zoom);
            }
        }

        // التحقق من استبعاد العنصر من التكبير
        shouldExcludeFromZoom(element) {
            return element.closest('.icon-btn') || 
                   element.closest('.logo') || 
                   element.closest('.settings-toggle-btn') ||
                   element.closest('.hamburger-menu') ||
                   element.closest('.mobile-menu-overlay') ||
                   element.closest('.zoom-group') ||
                   element.tagName.toLowerCase() === 'img' ||
                   element.tagName.toLowerCase() === 'svg';
        }

        // معالجة تسجيل الخروج
        handleLogout() {
            // محو بيانات تسجيل الدخول
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            
            // إعادة توجيه المستخدم أو تحديث الصفحة
            window.location.reload();
        }

        // تطبيق الإعدادات الافتراضية
        applyDefaultSettings() {
            // استرجاع وضع التباين المحفوظ
            const savedMode = localStorage.getItem('contrast') || this.options.defaultMode;
            this.setContrastMode(savedMode);

            // استرجاع التكبير المحفوظ
            const savedZoom = localStorage.getItem('zoom');
            if (savedZoom) {
                this.applyZoom(parseFloat(savedZoom));
            }
        }
    }

    // تصدير الفئة للاستخدام العالمي
    window.UnifiedSettingsModal = UnifiedSettingsModal;
})(window);

// مثال على الاستخدام:
// document.addEventListener('DOMContentLoaded', () => {
//     const settingsModal = new UnifiedSettingsModal({
//         targetSelector: '.settings-modal',
//         toggleButtonSelector: '.settings-toggle-btn',
//         defaultMode: 'light',
//         minZoom: 0.7,
//         maxZoom: 1.5,
//         zoomStep: 0.1,
//         onContrastChange: (mode) => {

//         },
//         onZoomChange: (zoom) => {

//         }
//     });
// }); 