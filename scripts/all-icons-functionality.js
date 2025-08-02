/**
 * ملف جافاسكريبت موحد لوظائف الأيقونات في جميع الأجهزة
 * يعمل على كل من الموبايل وسطح المكتب
 */

document.addEventListener('DOMContentLoaded', function() {

    // ---- تهيئة نافذة البحث ----
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    if (!searchPopupOverlay) {
        initializeSearchPopup();
    }

    // ---- وظائف أيقونة البحث ----
    // 1. أيقونة البحث في نسخة سطح المكتب
    const desktopSearchBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(1)');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchPopup();
        });
    }

    // 2. أيقونة البحث في الموبايل
    const mobileSearchBtn = document.querySelector('.mobile-icons .search-btn');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchPopup();
        });
    }

    // 3. أي أيقونات بحث أخرى
    const otherSearchBtns = document.querySelectorAll('.search-btn:not(.zoom-in-btn):not(.zoom-out-btn), .icon-btn:not(.zoom-in-btn):not(.zoom-out-btn) img[src*="search.png"]');
    otherSearchBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchPopup();
        });
    });

    // ---- وظائف أيقونة الإعدادات ----
    // 1. أيقونة الإعدادات في سطح المكتب
    const desktopSettingsBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(4)');
    const desktopSettingsMenu = document.querySelector('.main-icons-group .settings-menu');
    
    if (desktopSettingsBtn && desktopSettingsMenu) {
        
        // تهيئة قائمة الإعدادات لسطح المكتب
        initializeSettingsMenuListeners(desktopSettingsMenu);
        
        // فتح/إغلاق قائمة الإعدادات عند النقر على الأيقونة
        desktopSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إظهار/إخفاء القائمة
            desktopSettingsMenu.classList.toggle('show');
        });
    }

    // 2. أيقونة الإعدادات في الموبايل
    const mobileSettingsBtn = document.querySelector('.mobile-icons .settings-toggle-btn');
    let mobileSettingsMenu = document.querySelector('.mobile-settings-menu');
    
    // إنشاء قائمة الإعدادات للموبايل إذا لم تكن موجودة
    if (!mobileSettingsMenu && desktopSettingsMenu) {
        mobileSettingsMenu = desktopSettingsMenu.cloneNode(true);
        mobileSettingsMenu.classList.add('mobile-settings-menu');
        document.body.appendChild(mobileSettingsMenu);
        initializeSettingsMenuListeners(mobileSettingsMenu);
    }
    
    if (mobileSettingsBtn && mobileSettingsMenu) {
        
        // فتح/إغلاق قائمة الإعدادات عند النقر على الأيقونة
        mobileSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // إظهار/إخفاء القائمة
            mobileSettingsMenu.classList.toggle('show');
            
            // تموضع القائمة
            positionMobileSettingsMenu(mobileSettingsMenu, mobileSettingsBtn);
        });
    }

    // ---- وظائف زر الهامبرغر ----
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    if (hamburgerMenu && mobileMenuOverlay && mobileSideMenu) {
        // فتح القائمة الجانبية
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenuOverlay.classList.add('show');
            mobileSideMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // إغلاق القائمة عند النقر خارجها
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
        
        // إغلاق القائمة عند النقر على الروابط
        const sideMenuLinks = document.querySelectorAll('.mobile-side-menu-links a:not(.has-dropdown)');
        sideMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 100);
            });
        });
        
        // القوائم المنسدلة
        const dropdownLinks = document.querySelectorAll('.mobile-side-menu-links a.has-dropdown');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('open');
            });
        });
    }

    // ---- إغلاق القوائم عند النقر خارجها ----
    document.addEventListener('click', function(e) {
        // إغلاق قائمة الإعدادات في سطح المكتب
        if (desktopSettingsMenu && !desktopSettingsMenu.contains(e.target) && 
            desktopSettingsBtn && !desktopSettingsBtn.contains(e.target)) {
            desktopSettingsMenu.classList.remove('show');
        }
        
        // إغلاق قائمة الإعدادات في الموبايل
        if (mobileSettingsMenu && !mobileSettingsMenu.contains(e.target) && 
            mobileSettingsBtn && !mobileSettingsBtn.contains(e.target)) {
            mobileSettingsMenu.classList.remove('show');
        }
    });

    // ---- الدوال المساعدة ----
    // دالة فتح نافذة البحث
    function openSearchPopup() {
        searchPopupOverlay = document.getElementById('searchPopupOverlay');
        if (searchPopupOverlay) {
            searchPopupOverlay.style.display = 'flex';
            setTimeout(() => {
                const searchPopup = document.querySelector('.search-popup');
                if (searchPopup) {
                    searchPopup.classList.add('active');
                    const searchInput = document.querySelector('.search-popup-input');
                    if (searchInput) searchInput.focus();
                }
            }, 10);
        }
    }
    
    // دالة إغلاق القائمة الجانبية
    function closeMenu() {
        if (mobileMenuOverlay && mobileSideMenu) {
            mobileMenuOverlay.classList.remove('show');
            mobileSideMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    // دالة تهيئة نافذة البحث المنبثقة
    function initializeSearchPopup() {
        // إنشاء غلاف النافذة المنبثقة
        searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // إنشاء حاوية النافذة المنبثقة
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // إنشاء حاوية للأزرار
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // إنشاء حقل الإدخال
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // إضافة النافذة المنبثقة إلى الغلاف
        searchPopupOverlay.appendChild(searchPopup);
        
        // إضافة الغلاف إلى الجسم
        document.body.appendChild(searchPopupOverlay);
        
        // إنشاء زر البحث (الأخضر)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // إنشاء زر محرك البحث (البرتقالي)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);
        
        // إضافة مستمعات الأحداث
        // إغلاق النافذة المنبثقة عند النقر على الغلاف
        searchPopupOverlay.addEventListener('click', function(e) {
            if (e.target === searchPopupOverlay) {
                closeSearchPopup();
            }
        });
        
        // معالجة زر البحث
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // معالجة زر محرك البحث
        engineBtn.addEventListener('click', function() {
                            window.location.href = 'pages/general-search-engine.html';
        });
        
        // معالجة مفتاح Enter في حقل البحث
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // دالة إغلاق نافذة البحث
    function closeSearchPopup() {
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup) {
            searchPopup.classList.remove('active');
            setTimeout(() => {
                if (searchPopupOverlay) searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    // دالة إجراء البحث
    function performSearch() {
        const searchInput = document.querySelector('.search-popup-input');
        if (searchInput) {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                // تنفيذ وظيفة البحث الفعلية هنا
                closeSearchPopup();
            }
        }
    }
    
    // دالة تموضع قائمة الإعدادات في الموبايل
    function positionMobileSettingsMenu(menu, button) {
        if (menu && button) {
            const buttonRect = button.getBoundingClientRect();
            
            // تحديد موقع القائمة بالنسبة للزر
            menu.style.position = 'fixed';
            menu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
            
            // في نسخة RTL، نضع القائمة لليمين من الزر
            if (document.dir === 'rtl' || getComputedStyle(document.body).direction === 'rtl') {
                menu.style.right = (window.innerWidth - buttonRect.right) + 'px';
            } else {
                menu.style.left = buttonRect.left + 'px';
            }
        }
    }
    
    // دالة تهيئة مستمعات الأحداث لقائمة الإعدادات
    function initializeSettingsMenuListeners(menu) {
        if (!menu) return;
        
        // خيار التباين
        const contrastOption = menu.querySelector('.contrast-option');
        const contrastSubmenu = menu.querySelector('.contrast-submenu');
        
        if (contrastOption && contrastSubmenu) {
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contrastSubmenu.classList.toggle('show');
            });
        }
        
        // خيار التباين الفاتح
        const contrastLight = menu.querySelector('.contrast-light');
        if (contrastLight) {
            contrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                document.documentElement.style.setProperty('--primary-color', '#17a891');
                document.documentElement.style.setProperty('--secondary-color', '#24516c');
                menu.classList.remove('show');
                if (contrastSubmenu) contrastSubmenu.classList.remove('show');
            });
        }
        
        // خيار التباين الداكن
        const contrastDark = menu.querySelector('.contrast-dark');
        if (contrastDark) {
            contrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                document.documentElement.style.setProperty('--primary-color', '#000000');
                document.documentElement.style.setProperty('--secondary-color', '#000000');
                menu.classList.remove('show');
                if (contrastSubmenu) contrastSubmenu.classList.remove('show');
            });
        }
        
        // خيار الإحصائيات
        const statsOption = menu.querySelector('.stats-option');
        if (statsOption) {
            statsOption.addEventListener('click', function(e) {
                e.preventDefault();
                // تحديد ما إذا كنا في الصفحة الرئيسية أو صفحة فرعية
                const isHomePage = window.location.pathname === '/' || 
                               window.location.pathname === '/index.html' || 
                               window.location.pathname.endsWith('/index.html') ||
                               window.location.pathname === '';
                               
                if (isHomePage) {
                    window.location.href = 'pages/analytics.html';
                } else {
                    window.location.href = '../pages/analytics.html';
                }
            });
        }
        
        // خيار تسجيل الخروج
        const logoutOption = menu.querySelector('.logout-option');
        if (logoutOption) {
            logoutOption.addEventListener('click', function(e) {
                e.preventDefault();
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
            });
        }
    }

    // Support Icon Functionality - Link to Contact Section
    const supportIcons = document.querySelectorAll('.support-icon-fixed, .support-icon-fixed img');
    supportIcons.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function(e) {
            e.preventDefault();
            // Check if we're on a subpage or main page
            const isSubpage = window.location.pathname.includes('/pages/');
            if (isSubpage) {
                // Navigate to main page contact section
                window.location.href = '../index.html#contact';
            } else {
                // Scroll to contact section on same page
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Fallback: navigate to main page
                    window.location.href = '#contact';
                }
            }
        });
    });
});
