// ملف جافاسكريبت موحد لإضافة وتفعيل قائمة الموبايل في جميع صفحات الموقع

document.addEventListener('DOMContentLoaded', function() {
    
    // التحقق من وجود قائمة الموبايل أولاً
    if (!document.querySelector('.mobile-menu-overlay')) {
        // إضافة قائمة الموبايل - نفس هيكل الصفحة الرئيسية
        const mobileMenuHTML = `
            <!-- القائمة الجانبية للموبايل -->
            <div class="mobile-menu-overlay">
                <div class="mobile-side-menu">
                    <div class="mobile-side-menu-links">
                        <a href="${document.location.pathname.includes('/pages/') ? '../index.html' : 'index.html'}">الرئيسية</a>
                        
                        <!-- زر نبذة عنا -->
                        <a href="#" id="about-toggle" class="dropdown-button">
                            نبذة عنا
                            <img src="${document.location.pathname.includes('/pages/') ? '../assets/icons/menu-Down.svg' : 'assets/icons/menu-Down.svg'}" alt="سهم" class="dropdown-arrow-svg">
                        </a>
                        
                        <!-- القائمة المنسدلة لنبذة عنا -->
                        <div id="about-submenu" class="submenu-container">
                            <a href="${document.location.pathname.includes('/pages/') ? 'about-site.html' : 'pages/about-site.html'}">عن الموقع</a>
                            <a href="#">عن الشبكة</a>
                        </div>
                        
                        <!-- زر سياستنا -->
                        <a href="#" id="policies-toggle" class="dropdown-button">
                            سياستنا
                            <img src="${document.location.pathname.includes('/pages/') ? '../assets/icons/menu-Down.svg' : 'assets/icons/menu-Down.svg'}" alt="سهم" class="dropdown-arrow-svg">
                        </a>
                        
                        <!-- القائمة المنسدلة لسياستنا -->
                        <div id="policies-submenu" class="submenu-container">
                            <a href="${document.location.pathname.includes('/pages/') ? 'privacy-policy.html' : 'pages/privacy-policy.html'}">سياسة الخصوصية</a>
                            <a href="${document.location.pathname.includes('/pages/') ? 'terms.html' : 'pages/terms.html'}">الشروط والأحكام</a>
                        </div>
                        
                        <a href="${document.location.pathname.includes('/pages/') ? 'jornal-profile-view.html' : 'pages/jornal-profile-view.html'}">جريدة أم القرى</a>
                        <a href="${document.location.pathname.includes('/pages/') ? 'asanid-service.html' : 'pages/asanid-service.html'}">خدمة الأسانيد</a>
                        <a href="${document.location.pathname.includes('/pages/') ? 'faq.html' : 'pages/faq.html'}" class="colored-link">الأسئلة الشائعة</a>
                    </div>
                    <div class="mobile-side-menu-buttons">
                        <a href="${document.location.pathname.includes('/pages/') ? 'subscribe.html' : 'pages/subscribe.html'}" class="subscribe-btn">اشترك معنا</a>
                        <a href="#" class="login-btn" id="mobile-login-btn">تسجيل الدخول</a>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة HTML إلى الصفحة
        document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);
    }
    
    // التحقق من وجود زر الهامبرغر أولاً
    if (!document.querySelector('.hamburger-menu')) {
        // إضافة زر الهامبرغر
        const hamburgerHTML = `
            <!-- زر الهامبرغر للموبايل -->
            <div class="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // إضافة زر الهامبرغر إلى الصفحة
        document.body.insertAdjacentHTML('afterbegin', hamburgerHTML);
    }
    
    // بعد إضافة العناصر، تفعيل قائمة الموبايل
    initMobileMenu();
});

// تهيئة قائمة الموبايل
function initMobileMenu() {
    // عناصر القائمة المتنقلة
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    // التحقق من وجود العناصر
    if (!hamburgerMenu || !mobileMenuOverlay || !mobileSideMenu) {

        return;
    }
    
    // تأكيد أن زر الهامبرغر مرئي
    hamburgerMenu.style.display = 'flex';
    hamburgerMenu.style.visibility = 'visible';
    hamburgerMenu.style.opacity = '1';
    hamburgerMenu.style.zIndex = '9999 !important';
    
    // إضافة الأنماط إلى الشرائط الثلاثة
    const spans = hamburgerMenu.querySelectorAll('span');
    spans.forEach(function(span) {
        span.style.display = 'block';
        span.style.visibility = 'visible';
        span.style.opacity = '1';
        span.style.backgroundColor = '#fff';
    });
    
    // فتح القائمة عند النقر على زر الهامبرغر
    function openMobileMenu(e) {
        if (e && e.type !== 'touchstart') {
            e.preventDefault();
            e.stopPropagation(); // منع انتشار الحدث
        }
        mobileMenuOverlay.classList.add('show');
        mobileSideMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // فتح القائمة للمس (بدون preventDefault)
    function openMobileMenuTouch(e) {
        if (e) {
            e.stopPropagation(); // منع انتشار الحدث فقط
        }
        mobileMenuOverlay.classList.add('show');
        mobileSideMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // إغلاق القائمة
    function closeMobileMenu(e) {
        if (e && e.type !== 'touchstart') {
            e.preventDefault();
        }
        mobileMenuOverlay.classList.remove('show');
        mobileSideMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // إضافة أحداث متعددة للهامبرغر لضمان عملها على جميع الأجهزة
    hamburgerMenu.addEventListener('click', openMobileMenu);
    hamburgerMenu.addEventListener('touchstart', openMobileMenuTouch, {passive: true});
    
    // إغلاق القائمة عند النقر على الخلفية
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // منع إغلاق القائمة عند النقر داخل القائمة نفسها
    mobileSideMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // منع إغلاق القائمة عند النقر على زر الهامبرغر
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // إغلاق القائمة عند النقر في أي مكان خارج القائمة
    document.addEventListener('click', function(e) {
        // التحقق من أن القائمة مفتوحة
        if (mobileMenuOverlay.classList.contains('show')) {
            // التحقق من أن النقر ليس داخل القائمة أو على زر الهامبرغر
            if (!mobileSideMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // تهيئة القوائم المنسدلة في قائمة الموبايل
    const aboutToggle = document.getElementById('about-toggle');
    const policiesToggle = document.getElementById('policies-toggle');
    const aboutSubmenu = document.getElementById('about-submenu');
    const policiesSubmenu = document.getElementById('policies-submenu');
    
    if (aboutToggle && aboutSubmenu) {
        aboutToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // تبديل طبقة show للتأثيرات المتحركة
            aboutSubmenu.classList.toggle('show');
            
            // إغلاق القائمة الأخرى إذا كانت مفتوحة
            if (policiesSubmenu && policiesSubmenu.classList.contains('show')) {
                policiesSubmenu.classList.remove('show');
                const policiesToggle = document.getElementById('policies-toggle');
                if (policiesToggle) {
                    policiesToggle.classList.remove('active');
                    const policiesArrow = policiesToggle.querySelector('.dropdown-arrow-svg');
                    if (policiesArrow) policiesArrow.style.transform = 'rotate(0deg)';
                }
            }
            
            // تدوير السهم وإضافة active class عند الفتح/الإغلاق
            const arrow = this.querySelector('.dropdown-arrow-svg');
            if (aboutSubmenu.classList.contains('show')) {
                this.classList.add('active');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                this.classList.remove('active');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
        
        // منع إغلاق القائمة عند النقر على القائمة الفرعية
        aboutSubmenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (policiesToggle && policiesSubmenu) {
        policiesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // تبديل طبقة show للتأثيرات المتحركة
            policiesSubmenu.classList.toggle('show');
            
            // إغلاق القائمة الأخرى إذا كانت مفتوحة
            if (aboutSubmenu && aboutSubmenu.classList.contains('show')) {
                aboutSubmenu.classList.remove('show');
                const aboutToggle = document.getElementById('about-toggle');
                if (aboutToggle) {
                    aboutToggle.classList.remove('active');
                    const aboutArrow = aboutToggle.querySelector('.dropdown-arrow-svg');
                    if (aboutArrow) aboutArrow.style.transform = 'rotate(0deg)';
                }
            }
            
            // تدوير السهم وإضافة active class عند الفتح/الإغلاق
            const arrow = this.querySelector('.dropdown-arrow-svg');
            if (policiesSubmenu.classList.contains('show')) {
                this.classList.add('active');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                this.classList.remove('active');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
        
        // منع إغلاق القائمة عند النقر على القائمة الفرعية
        policiesSubmenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // ربط حدث تسجيل الدخول
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    
    if (mobileLoginBtn && loginModal) {
        mobileLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            loginModal.style.display = 'flex';
        });
    }
}

// تحديث زر الهامبرغر عند تغيير حجم الشاشة
window.addEventListener('resize', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.style.display = 'flex';
        hamburgerMenu.style.visibility = 'visible';
        hamburgerMenu.style.opacity = '1';
    }
});

// تنفيذ عند تحميل الصفحة وبعد ثانية للتأكد
window.addEventListener('load', function() {
    initMobileMenu();
    setTimeout(initMobileMenu, 1000);
});
