document.addEventListener('DOMContentLoaded', function() {


    // تحديد جميع أزرار الإعدادات وقوائم الإعدادات
    const settingsButtons = document.querySelectorAll('.settings-toggle-btn, .mobile-settings-icon');
    const settingsMenus = document.querySelectorAll('.settings-menu');
    const contrastOptions = document.querySelectorAll('.contrast-option');
    const contrastSubmenus = document.querySelectorAll('.contrast-submenu');
    const contrastDarkOptions = document.querySelectorAll('.contrast-dark');
    const contrastLightOptions = document.querySelectorAll('.contrast-light');
    const logoutOptions = document.querySelectorAll('.logout-option');
    const statsOptions = document.querySelectorAll('.stats-option');
    const settingsMenu = document.querySelector('.settings-menu');
    const settingsOptions = document.querySelectorAll('.settings-option');
    const contrastSubmenuOptions = document.querySelectorAll('.contrast-submenu .settings-option');

    // إخفاء القائمة بشكل افتراضي
    function hideSettingsMenu() {
        if (settingsMenu) {
            // إزالة الكلاس show
            settingsMenu.classList.remove('show');
            
            // إخفاء القائمة بالكامل
            settingsMenu.style.display = 'none';
            settingsMenu.style.visibility = 'hidden';
            settingsMenu.style.opacity = '0';
            settingsMenu.style.transform = 'scale(0.7)';
        }
    }

    // تهيئة إخفاء القائمة عند تحميل الصفحة
    hideSettingsMenu();

    // دالة إغلاق جميع قوائم الإعدادات
    function closeAllSettingsMenus() {
        settingsMenus.forEach(menu => {
            menu.classList.remove('show');
            menu.style.display = 'none';
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            menu.style.transform = 'scale(0.7)';
        });
        
        // إغلاق القوائم الفرعية
        contrastSubmenus.forEach(submenu => {
            submenu.classList.remove('show');
        });
    }

    // دالة تحديد موضع قائمة الإعدادات
    function positionSettingsMenu(triggerBtn, settingsMenu) {
        if (!triggerBtn || !settingsMenu) return;

        // التحقق من عرض الشاشة
        const screenWidth = window.innerWidth;
        
        // إعداد الموضع الأساسي
        settingsMenu.style.position = 'absolute';
        settingsMenu.style.zIndex = '9999';
        
        // تحديد الموضع العمودي والأفقي
        const btnRect = triggerBtn.getBoundingClientRect();
        const topPosition = btnRect.bottom + window.scrollY;
        
        // للشاشات الكبيرة (سطح المكتب)
        if (screenWidth > 768) {
            settingsMenu.style.top = `${topPosition}px`;
            settingsMenu.style.left = `${btnRect.left}px`;
            settingsMenu.style.right = 'auto';
            settingsMenu.style.transform = 'none';
            settingsMenu.style.width = '250px';
            settingsMenu.style.padding = '10px';
            settingsMenu.style.fontSize = '16px';
            settingsMenu.style.maxWidth = 'none';
            settingsMenu.style.borderRadius = '8px';
            settingsMenu.style.textAlign = 'center';
        } else {
            // للشاشات الصغيرة (الموبايل)
            settingsMenu.style.top = '60px';
            settingsMenu.style.right = '20px';
            settingsMenu.style.left = 'auto';
            settingsMenu.style.transform = 'none';
        }
    }

    // دالة فتح/إغلاق قائمة الإعدادات
    function toggleSettingsMenu(event) {
        // منع الانتشار الافتراضي للحدث
        event.stopPropagation();
        
        // العثور على عناصر القائمة
        const settingsMenu = document.querySelector('.settings-menu');
        const triggerBtn = event.currentTarget;
        
        if (!settingsMenu) return;
        
        // إخفاء جميع القوائم الأخرى
        const allSettingsMenus = document.querySelectorAll('.settings-menu');
        allSettingsMenus.forEach(menu => {
            if (menu !== settingsMenu) {
                menu.classList.remove('show');
                menu.style.display = 'none';
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.transform = 'scale(0.7)';
            }
        });
        
        // تبديل حالة القائمة
        const isMenuVisible = settingsMenu.classList.contains('show');
        
        if (!isMenuVisible) {
            // إضافة تأخير بسيط للتأكد من التحميل الكامل
            setTimeout(() => {
                settingsMenu.classList.add('show');
                settingsMenu.style.display = 'block';
                settingsMenu.style.visibility = 'visible';
                settingsMenu.style.opacity = '1';
                settingsMenu.style.transform = 'scale(1)';
                
                // تموضع القائمة
                positionSettingsMenu(triggerBtn, settingsMenu);
                
                // إضافة استماع للنقر خارج القائمة
                document.addEventListener('click', closeSettingsMenuOutside);
            }, 50);
        } else {
            hideSettingsMenu();
            document.removeEventListener('click', closeSettingsMenuOutside);
        }
    }

    function closeSettingsMenuOutside(event) {
        const settingsMenu = document.querySelector('.settings-menu');
        const triggerBtn = document.querySelector('.settings-toggle-btn');
        
        if (settingsMenu && !settingsMenu.contains(event.target) && 
            triggerBtn && !triggerBtn.contains(event.target)) {
            hideSettingsMenu();
            document.removeEventListener('click', closeSettingsMenuOutside);
        }
    }

    // معالجة التباين
    function setupContrastOptions() {
        // معالجة خيارات التباين الفرعية
        contrastDarkOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // تفعيل الوضع الداكن
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
                localStorage.setItem('contrast-mode', 'dark');
                
                // إغلاق القوائم
                closeAllSettingsMenus();
            });
        });

        contrastLightOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // تفعيل الوضع الفاتح
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('contrast-mode', 'light');
                
                // إغلاق القوائم
                closeAllSettingsMenus();
            });
        });

        // استعادة وضع التباين المحفوظ
        const savedMode = localStorage.getItem('contrast-mode');
        if (savedMode === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (savedMode === 'light') {
            document.body.classList.add('light-mode');
        }
    }


    // معالجة الانتقال للإحصائيات
    function setupStatsOptions() {
        statsOptions.forEach(option => {
            option.addEventListener('click', function() {
                window.location.href = this.getAttribute('href');
            });
        });
    }


    function setupLogoutHandlers() {

        // This function is kept for backward compatibility but does nothing
        // The addDirectLogoutHandler handles all logout clicks with a single confirmation
    }
    
    // إضافة معالج أحداث مباشر للقائمة
    function addDirectLogoutHandler() {

        
        // استخدام event delegation على document level
        document.addEventListener('click', function(e) {
            const target = e.target.closest('.logout-option, [data-logout="true"]');
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                

                
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    if (typeof window.logoutUser === 'function') {

                        window.logoutUser();
                    } else {

                        performFallbackLogout();
                    }
                }
            }
        });
    }
    
    // Fallback Logout Method
    function performFallbackLogout() {

    
        // مسح جميع بيانات المستخدم بشكل كامل
        const allUserDataKeys = [
            'currentUser',
            'userLoginTime',
            'isLoggedIn',
            'userLoggedIn',
            'username',
            'token',
            'userSession',
            'loginStatus',
            'userData',
            'authToken',
            'userRole',
            'userEmail',
            'userPhone',
            'userPermissions',
            'userPreferences',
            'lastLoginTime',
            'rememberMe'
        ];
        
        allUserDataKeys.forEach(key => {
            localStorage.removeItem(key);

        });
        
        // مسح أي sessionStorage أيضاً
        sessionStorage.clear();

    
        // إعادة تعيين واجهة المستخدم إلى حالة تسجيل الخروج
        if (typeof resetToLoggedOutState === 'function') {
            resetToLoggedOutState();
        } else {
            // fallback if resetToLoggedOutState is not available
            // Hide profile buttons
            const profileSelectors = [
                '.profile-icon-btn', 
                '.profile-btn', 
                '#mobile-profile-btn',
                '.main-icons-group .profile-icon-btn',
                '.mobile-icons .profile-btn'
            ];
            
            profileSelectors.forEach(selector => {
                const buttons = document.querySelectorAll(selector);
                buttons.forEach(btn => {
                    if (btn && btn.parentNode) {
                        btn.style.display = 'none';
                        btn.style.visibility = 'hidden';
                    }
                });
            });
        
            // Show login buttons
            const loginSelectors = [
                '.login-btn', 
                '#login-btn', 
                '#mobile-login-btn'
            ];
            
            loginSelectors.forEach(selector => {
                const buttons = document.querySelectorAll(selector);
                buttons.forEach(btn => {
                    if (btn) {
                        btn.style.display = 'block';
                        btn.style.visibility = 'visible';
                    }
                });
            });
        }
    
        // Close menus
        const settingsMenu = document.querySelector('.settings-menu');
        if (settingsMenu) {
            settingsMenu.classList.remove('show');
        }
    
        // Alert and redirect
    alert('تم تسجيل الخروج بنجاح');
    window.location.href = 'index.html';
}

// إعادة تعيين واجهة المستخدم إلى حالة تسجيل الخروج (للاستخدام المشترك)
function resetToLoggedOutState() {
    // إزالة زر تسجيل الخروج
    const logoutButtons = document.querySelectorAll('.logout-btn, #logout-btn, #mobile-logout-btn');
    logoutButtons.forEach(btn => {
        if (btn && btn.parentNode) {
            btn.parentNode.removeChild(btn);
        }
    });
    
    // إظهار أزرار تسجيل الدخول
    const loginButtons = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
    loginButtons.forEach(btn => {
        if (btn) btn.style.display = 'block';
    });
    
    // إعادة تعيين اسم المستخدم في الهيدر
    const usernameDisplay = document.querySelector('.username-display, #username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = '';
        usernameDisplay.style.display = 'none';
    }
    
    // إعادة تعيين صورة الملف الشخصي
    const profilePic = document.querySelector('.profile-picture, #profile-picture');
    if (profilePic) {
        profilePic.style.display = 'none';
    }
    

}
    
    // Placeholder for toggleZoom if it exists elsewhere
    function toggleZoom() {

        // Implement actual zoom logic here if needed
    }

    
    // إضافة معالجات الأحداث لأزرار الإعدادات
    settingsButtons.forEach(btn => {
        btn.addEventListener('click', toggleSettingsMenu);
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.settings-menu') && 
            !event.target.closest('.settings-toggle-btn')) {
            closeAllSettingsMenus();
        }
    });

    // تشغيل الوظائف الأساسية
    setupContrastOptions();
    setupStatsOptions();

    // إضافة استماع للتغيرات في حجم الشاشة
    window.addEventListener('resize', function() {
        const visibleSettingsMenu = document.querySelector('.settings-menu.show');
        const triggerBtn = document.querySelector('.settings-toggle-btn.active');
        
        if (visibleSettingsMenu && triggerBtn) {
            positionSettingsMenu(triggerBtn, visibleSettingsMenu);
        }
    });

    // التأكد من التموضع الصحيح عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        settingsMenus.forEach(menu => {
            if (menu.classList.contains('show')) {
                const triggerBtn = document.querySelector('.settings-toggle-btn.active');
                if (triggerBtn) {
                    positionSettingsMenu(triggerBtn, menu);
                }
            }
        });
    });

    // التأكد من أن القائمة تعمل على جميع الأجهزة
    function adjustSettingsMenuForMobile() {
        const settingsMenu = document.querySelector('.settings-menu');
        
        if (!settingsMenu) return;
        
        // معالجة الهواتف الصغيرة جدًا (أقل من 320 بكسل)
        if (window.innerWidth <= 320) {
            settingsMenu.style.width = '170px';
            settingsMenu.style.left = '50%';
            settingsMenu.style.transform = 'translateX(-50%)';
            settingsMenu.style.top = '55px';
            settingsMenu.style.padding = '6px';
            settingsMenu.style.fontSize = '12px';
            settingsMenu.style.maxWidth = '90vw';
            settingsMenu.style.borderRadius = '8px';
            settingsMenu.style.zIndex = '9999';
            settingsMenu.style.textAlign = 'center';
        } else if (window.innerWidth <= 375) {
            settingsMenu.style.width = '180px';
            settingsMenu.style.left = '50%';
            settingsMenu.style.transform = 'translateX(-50%)';
            settingsMenu.style.top = '60px';
            settingsMenu.style.padding = '8px';
            settingsMenu.style.fontSize = '13px';
            settingsMenu.style.maxWidth = '90vw';
            settingsMenu.style.borderRadius = '8px';
            settingsMenu.style.zIndex = '9999';
            settingsMenu.style.textAlign = 'center';
        } else if (window.innerWidth <= 480) {
            settingsMenu.style.width = '190px';
            settingsMenu.style.left = '50%';
            settingsMenu.style.transform = 'translateX(-50%)';
            settingsMenu.style.top = '60px';
            settingsMenu.style.padding = '10px';
            settingsMenu.style.fontSize = '14px';
            settingsMenu.style.maxWidth = '90vw';
            settingsMenu.style.borderRadius = '8px';
            settingsMenu.style.zIndex = '9999';
            settingsMenu.style.textAlign = 'center';
        } else {
            settingsMenu.style.width = '250px';
            settingsMenu.style.right = '20px';
            settingsMenu.style.left = 'auto';
            settingsMenu.style.top = '60px';
            settingsMenu.style.transform = 'none';
            settingsMenu.style.padding = '10px';
            settingsMenu.style.fontSize = '16px';
            settingsMenu.style.maxWidth = 'none';
            settingsMenu.style.zIndex = '9999';
        }
    }

    // إضافة معالج حدث للنقر على زر الإعدادات
    settingsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
        if (settingsMenu) {
                settingsMenu.classList.toggle('show');
                adjustSettingsMenuForMobile();
                
                // تحديد الموضع بدقة
                positionSettingsMenu(this, settingsMenu);
            }
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (settingsMenu && !settingsMenu.contains(e.target) && 
            !Array.from(settingsButtons).some(btn => btn.contains(e.target))) {
            settingsMenu.classList.remove('show');
        }
    });

    // معالجة خيارات الإعدادات
    settingsOptions.forEach(option => {
        option.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'contrast':
                    toggleContrast();
                    break;
                case 'zoom':
                    // toggleZoom(); // Assuming toggleZoom is defined elsewhere or not needed
                    break;
                // يمكن إضافة المزيد من الإجراءات هنا
            }
            
            settingsMenu.classList.remove('show');
        });
    });

    // استجابة التغيير في حجم الشاشة
    window.addEventListener('resize', adjustSettingsMenuForMobile);
    
    // تشغيل التعديل عند التحميل
    adjustSettingsMenuForMobile();

    // معالجة أحداث قائمة التباين
    contrastSubmenuOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الحالة النشطة من جميع الخيارات
            contrastSubmenuOptions.forEach(opt => opt.classList.remove('active'));
            
            // تفعيل الخيار المحدد
            this.classList.add('active');
            
            // تنفيذ التباين
            const contrastType = this.classList.contains('contrast-light') ? 'light' : 'dark';
            toggleContrast(contrastType);
        });
    });

    // دالة تهيئة قائمة الإعدادات للصفحات الفرعية
    // initSubpageSettingsMenu(); // Assuming this is not needed or handled by main settings logic


    
    // تأخير إعداد معالجات تسجيل الخروج للسماح بتحميل جميع العناصر
    setTimeout(() => {
        setupLogoutHandlers();
        addDirectLogoutHandler(); // إضافة المعالج المباشر
    }, 500); // تقليل التأخير

    // استماع لحدث تحميل القائمة
    document.addEventListener('settingsMenuLoaded', function() {

        setTimeout(() => {
            setupLogoutHandlers();
            addDirectLogoutHandler(); // إضافة المعالج المباشر
        }, 200); // تقليل التأخير
    });
    
    // إضافة المعالج المباشر فوراً
    addDirectLogoutHandler();

    // Global Logout Function
    // window.performLogout = performLogout; // Removed redundant global exposure
    // window.logoutUser = performLogout; // Removed redundant global exposure
});

// دالة التباين (يجب تعريفها في مكان آخر)
function toggleContrast(type) {
    document.body.classList.remove('dark-contrast', 'light-contrast');
    document.body.classList.add(`${type}-contrast`);
    localStorage.setItem('contrast-mode', type);
}

// دالة تحديد موضع القائمة للصفحات الفرعية (Consolidated into positionSettingsMenu)
// function positionSettingsMenuForSubpages(triggerBtn, settingsMenu) {
//     // ... (logic moved to positionSettingsMenu)
// }

// دالة تهيئة قائمة الإعدادات للصفحات الفرعية (Consolidated or removed)
// function initSubpageSettingsMenu() {
//     // ... (logic moved to main DOMContentLoaded or removed if redundant)
// }

// Setup Logout Event Listeners


