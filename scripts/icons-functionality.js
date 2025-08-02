// JavaScript file for icons functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // --- زر البحث ---
    const searchBtns = document.querySelectorAll('.search-btn');
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    
    // إنشاء نافذة البحث المنبثقة إذا لم تكن موجودة
    if (!searchPopupOverlay) {
        // إنشاء الطبقة الخارجية
        searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // إنشاء حاوية البحث المنبثقة
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // إنشاء حاوية للأزرار التي ستكون على اليسار
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // إنشاء حقل الإدخال
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // إضافة النافذة المنبثقة إلى الطبقة الخارجية
        searchPopupOverlay.appendChild(searchPopup);
        
        // إضافة الطبقة الخارجية إلى الجسم
        document.body.appendChild(searchPopupOverlay);
        
        // إنشاء زر البحث (الزر الأخضر)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // إنشاء زر محرك البحث (الزر البرتقالي)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);
    }
    
    // عرض/إخفاء نافذة البحث عند النقر على زر البحث
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            searchPopupOverlay.style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.search-popup').classList.add('active');
                document.querySelector('.search-popup-input').focus();
            }, 10);
        });
    });
    
    // إغلاق النافذة المنبثقة عند النقر على الطبقة الخارجية
    searchPopupOverlay.addEventListener('click', function(e) {
        if (e.target === searchPopupOverlay) {
            document.querySelector('.search-popup').classList.remove('active');
            setTimeout(() => {
                searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    });
    
    // معالجة النقر على زر البحث في النافذة المنبثقة
    document.querySelector('.search-popup-button.search').addEventListener('click', function() {
        performSearch();
    });
    
    // معالجة النقر على زر محرك البحث
    document.querySelector('.search-popup-button.engine').addEventListener('click', function() {
        window.location.href = 'pages/general-search-engine.html';
    });
    
    // معالجة ضغط مفتاح Enter في حقل البحث
    document.querySelector('.search-popup-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // وظيفة البحث (لتنفيذها حسب متطلبات المشروع)
    function performSearch() {
        const searchQuery = document.querySelector('.search-popup-input').value.trim();
        if (searchQuery) {
            // تنفيذ وظيفة البحث الفعلية هنا
            // حاليًا، سنغلق النافذة المنبثقة فقط
            closePopup();
        }
    }
    
    // وظيفة إغلاق النافذة المنبثقة
    function closePopup() {
        document.querySelector('.search-popup').classList.remove('active');
        setTimeout(() => {
            searchPopupOverlay.style.display = 'none';
        }, 300);
    }

    // --- أزرار التكبير والتصغير ---
    const zoomInBtns = document.querySelectorAll('.zoom-in-btn');
    const zoomOutBtns = document.querySelectorAll('.zoom-out-btn');
    
    // حجم الخط الأساسي والحد الأدنى والأقصى
    let currentFontSize = 16; // حجم الخط الافتراضي
    const minFontSize = 12;
    const maxFontSize = 24;
    
    // استرجاع حجم الخط المحفوظ إن وجد
    if(localStorage.getItem('fontSize')) {
        currentFontSize = parseInt(localStorage.getItem('fontSize'));
        document.body.style.fontSize = currentFontSize + 'px';
    }
    
    // وظيفة زر التكبير
    zoomInBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(currentFontSize < maxFontSize) {
                currentFontSize += 1;
                document.body.style.fontSize = currentFontSize + 'px';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
    });
    
    // وظيفة زر التصغير
    zoomOutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(currentFontSize > minFontSize) {
                currentFontSize -= 1;
                document.body.style.fontSize = currentFontSize + 'px';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
    });

    // --- زر الموقع ---
    const locationBtns = document.querySelectorAll('button.icon-btn:has(img[src*="location"])');
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // فتح قسم الخريطة في صفحة اتصل بنا
            window.location.href = window.location.pathname.includes('/pages/') ? 
                                  '../index.html#contact-section' : 
                                  '#contact-section';
        });
    });

    // --- زر الاتصال ---
    const callBtns = document.querySelectorAll('button.icon-btn:has(img[src*="call"])');
    callBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
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

    // Alternative selector for call buttons (more comprehensive)
    const callBtnsAlt = document.querySelectorAll('.icon-btn img[src*="call"], .icon-btn img[alt*="اتصال"]');
    callBtnsAlt.forEach(icon => {
        const button = icon.closest('.icon-btn');
        if (button && !button.hasAttribute('data-call-linked')) {
            button.setAttribute('data-call-linked', 'true');
            button.addEventListener('click', function(e) {
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
        }
    });

    // --- زر الإعدادات وقائمة الإعدادات ---
    const settingsToggleBtns = document.querySelectorAll('.settings-toggle-btn');
    
    // تفعيل زر الإعدادات
    settingsToggleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // البحث عن قائمة الإعدادات المرتبطة بهذا الزر
            const settingsMenu = this.nextElementSibling;
            if (settingsMenu && settingsMenu.classList.contains('settings-menu')) {
                settingsMenu.classList.toggle('show');
            }
        });
    });

    // إغلاق قائمة الإعدادات عند النقر في أي مكان آخر
    document.addEventListener('click', function(e) {
        const settingsMenus = document.querySelectorAll('.settings-menu');
        settingsMenus.forEach(menu => {
            if (menu.classList.contains('show') && !menu.contains(e.target)) {
                const settingsBtn = menu.previousElementSibling;
                if (!settingsBtn || !settingsBtn.contains(e.target)) {
                    menu.classList.remove('show');
                }
            }
        });
    });

    // --- خيارات التباين ---
    const contrastOptions = document.querySelectorAll('.contrast-option');
    const contrastLight = document.querySelector('.contrast-light');
    const contrastDark = document.querySelector('.contrast-dark');
    
    // استرجاع إعداد التباين المحفوظ
    const savedContrast = localStorage.getItem('contrast');
    if (savedContrast === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // تبديل عرض قائمة خيارات التباين
    contrastOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const contrastSubmenu = document.querySelector('.contrast-submenu');
            if (contrastSubmenu) {
                contrastSubmenu.classList.toggle('show');
            }
        });
    });
    
    // تطبيق وضع التباين الفاتح
    if (contrastLight) {
        contrastLight.addEventListener('click', function() {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('contrast', 'light');
            const settingsMenu = this.closest('.settings-menu');
            if (settingsMenu) {
                settingsMenu.classList.remove('show');
            }
        });
    }
    
    // تطبيق وضع التباين الداكن
    if (contrastDark) {
        contrastDark.addEventListener('click', function() {
            document.body.classList.add('dark-mode');
            localStorage.setItem('contrast', 'dark');
            const settingsMenu = this.closest('.settings-menu');
            if (settingsMenu) {
                settingsMenu.classList.remove('show');
            }
        });
    }
    
    // تأكد من إضافة لينكات CSS للبحث المنبثق إذا لم تكن موجودة
    if (!document.querySelector('link[href*="search-popup.css"]')) {
        const searchPopupCss = document.createElement('link');
        searchPopupCss.rel = 'stylesheet';
        searchPopupCss.href = window.location.pathname.includes('/pages/') ? 
                              '../styles/search-popup.css' : 
                              'styles/search-popup.css';
        document.head.appendChild(searchPopupCss);
    }

    // --- إضافة وظائف زر الإعدادات من الصفحة الرئيسية ---
    // تحديد إذا كانت الصفحة هي الرئيسية أم صفحة فرعية
    const isHomePage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' || 
                      window.location.pathname.endsWith('/index.html') ||
                      window.location.pathname === '';
    
    // إضافة فئة تعريفية للصفحة الرئيسية
    if (isHomePage) {
        document.body.classList.add('home-page');
    }
    
    // زر الإعدادات وقائمة الإعدادات
    const settingsToggleBtn = document.querySelector('.settings-toggle-btn');
    const settingsMenu = document.querySelector('.settings-menu');
    
    // تحقق من وجود عناصر واجهة المستخدم قبل إضافة المستمعين
    if (settingsToggleBtn && settingsMenu) {
        // عند النقر على زر الإعدادات
        settingsToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsMenu.classList.toggle('show');
            
            // إغلاق القائمة الفرعية للتباين إذا كانت مفتوحة
            const contrastSubmenu = document.querySelector('.contrast-submenu');
            if (contrastSubmenu) {
                contrastSubmenu.classList.remove('show');
            }
        });
        
        // إغلاق القائمة عند النقر في أي مكان آخر
        document.addEventListener('click', function(e) {
            if (settingsMenu && !settingsMenu.contains(e.target) && !settingsToggleBtn.contains(e.target)) {
                settingsMenu.classList.remove('show');
                
                // إغلاق القائمة الفرعية للتباين أيضًا
                const contrastSubmenu = document.querySelector('.contrast-submenu');
                if (contrastSubmenu) {
                    contrastSubmenu.classList.remove('show');
                }
            }
        });
        
        // التعامل مع خيارات التباين الجديدة
        const contrastOption = document.querySelector('.contrast-option');
        const contrastSubmenu = document.querySelector('.contrast-submenu');
        const contrastLight = document.querySelector('.contrast-light');
        const contrastDark = document.querySelector('.contrast-dark');
        
        if (contrastOption && contrastSubmenu) {
            // إظهار/إخفاء قائمة التباين الفرعية
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contrastSubmenu.classList.toggle('show');
            });
            
            // خيار التباين الفاتح
            if (contrastLight) {
                contrastLight.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                    // تطبيق الألوان الفاتحة
                    document.documentElement.style.setProperty('--primary-color', '#17a891');
                    document.documentElement.style.setProperty('--secondary-color', '#24516c');
                    settingsMenu.classList.remove('show');
                    contrastSubmenu.classList.remove('show');
                });
            }
            
            // خيار التباين الداكن
            if (contrastDark) {
                contrastDark.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                    // تطبيق الألوان الداكنة
                    document.documentElement.style.setProperty('--primary-color', '#000000');
                    document.documentElement.style.setProperty('--secondary-color', '#000000');
                    settingsMenu.classList.remove('show');
                    contrastSubmenu.classList.remove('show');
                });
            }
        }
        
        // التعامل مع الخيارات الأخرى
        const statsOption = document.querySelector('.stats-option');
        const logoutOption = document.querySelector('.logout-option');
        
        if (statsOption) {
            // خيار الإحصائيات
            statsOption.addEventListener('click', function(e) {
                e.preventDefault();
                // الانتقال إلى صفحة الإحصائيات
                if (isHomePage) {
                    window.location.href = 'pages/analytics.html';
                } else {
                    window.location.href = '../pages/analytics.html';
                }
            });
        }
        
        if (logoutOption) {
            // خيار تسجيل الخروج
            logoutOption.addEventListener('click', function(e) {
                e.preventDefault();
                alert('تم تسجيل الخروج بنجاح');
                settingsMenu.classList.remove('show');
            });
        }
    }
    
    // تحقق من وجود تفضيل سابق للسمة
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // تطبيق الألوان الداكنة
        document.documentElement.style.setProperty('--primary-color', '#000000');
        document.documentElement.style.setProperty('--secondary-color', '#000000');
    }
});
