document.addEventListener('DOMContentLoaded', function() {
    // تأكد من عدم تكرار التهيئة
    if (window.profileInitialized) {
        return;
    }
    window.profileInitialized = true;

    
    // فحص بيانات تسجيل الدخول الموجودة بطرق متعددة
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    const authSystemUser = localStorage.getItem('currentUser');
    
    // فحص إضافي للمستخدم المسجل من auth-system
    let isUserLoggedIn = false;
    try {
        if (authSystemUser) {
            const userData = JSON.parse(authSystemUser);
            isUserLoggedIn = userData && (userData.isLoggedIn === true || userData.name);
        }
    } catch (e) {
    }
    
    // تنظيف localStorage من أي بيانات قديمة أو مُفسدة
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn && isLoggedIn !== 'true' && isLoggedIn !== 'false') {
            localStorage.removeItem('isLoggedIn');
        }
        
        // إزالة أي تسجيل دخول تجريبي متبقي
        if (isLoggedIn === 'true') {
            const currentUser = localStorage.getItem('currentUser');
            try {
                const user = JSON.parse(currentUser);
                if (user && user.username === 'test') {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                }
            } catch (e) {
                // إذا كان هناك خطأ في البيانات، احذفها
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
            }
        }
    } catch (e) {
    }
    
    // البحث عن أيقونات البروفايل
    const desktopProfileBtn = document.querySelector('.profile-icon-btn');
    const mobileProfileBtn = document.querySelector('#mobile-profile-btn');
    
    
    // إخفاء الأيقونات بدون فرض أنماط CSS
    if (desktopProfileBtn) {
        desktopProfileBtn.classList.remove('show');
        desktopProfileBtn.removeAttribute('data-profile-setup');
    }
    if (mobileProfileBtn) {
        mobileProfileBtn.classList.remove('show');
        mobileProfileBtn.removeAttribute('data-profile-setup');
    }
    
    // فحص حالة تسجيل الدخول بطرق متعددة
    const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    const isLoggedIn = isLoggedInFlag || isUserLoggedIn;
    
    // إظهار الأيقونات إذا كان المستخدم مسجل دخول
    if (isLoggedIn) {
        if (desktopProfileBtn) {
            desktopProfileBtn.classList.add('show');
        }
        if (mobileProfileBtn) {
            mobileProfileBtn.classList.add('show');
        }
    } else {
        // إخفاء الأيقونات إذا لم يكن مسجل دخول
        if (desktopProfileBtn) {
            desktopProfileBtn.classList.remove('show');
        }
        if (mobileProfileBtn) {
            mobileProfileBtn.classList.remove('show');
        }
    }
    
    // إضافة event listeners للأيقونات
    if (desktopProfileBtn && !desktopProfileBtn.hasAttribute('data-profile-initialized')) {
        desktopProfileBtn.setAttribute('data-profile-initialized', 'true');
        desktopProfileBtn.addEventListener('click', function() {
            // يمكن إضافة وظيفة فتح قائمة البروفايل هنا
        });
    }
    
    if (mobileProfileBtn && !mobileProfileBtn.hasAttribute('data-profile-initialized')) {
        mobileProfileBtn.setAttribute('data-profile-initialized', 'true');
        mobileProfileBtn.addEventListener('click', function() {
            // يمكن إضافة وظيفة فتح قائمة البروفايل هنا
        });
    }
});

// دالة اختبار تسجيل الخروج (يمكن استدعاؤها من الكونسول)
function testLogoutNow() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
}

// إتاحة الدوال للاستخدام من الكونسول
window.testLogoutNow = testLogoutNow;
window.forceShowProfileIcons = forceShowProfileIcons;

// حل مؤقت لمشكلة عدم ظهور الأيقونة بعد تسجيل الدخول - مع احترام CSS المتجاوب
function forceShowProfileIcons() {
    const desktopBtn = document.querySelector('.profile-icon-btn');
    const mobileBtn = document.querySelector('#mobile-profile-btn');
    const isMobile = window.innerWidth <= 768;
    
    if (desktopBtn) {
        desktopBtn.classList.add('show');
        // لا نفرض الأنماط يدوياً على الكمبيوتر
    }
    
    if (mobileBtn) {
        // فقط على الموبايل نضيف الكلاس
        if (isMobile) {
            mobileBtn.classList.add('show');
        } else {
            mobileBtn.classList.remove('show');
        }
    }
}

// مراقبة تغييرات localStorage لإظهار الأيقونة عند تسجيل الدخول
if (!window.localStorageOverrideInitialized) {
    window.localStorageOverrideInitialized = true;
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        
        if (key === 'isLoggedIn' && value === 'true') {
            setTimeout(forceShowProfileIcons, 100);
        }
        
        if (key === 'currentUser') {
            try {
                const userData = JSON.parse(value);
                if (userData && (userData.isLoggedIn === true || userData.name)) {
                    setTimeout(forceShowProfileIcons, 100);
                }
            } catch (e) {
                // تجاهل الأخطاء
            }
        }
    };
}

// إضافة CSS للتصميم الصحيح
if (!document.querySelector('#profile-icons-style')) {
    const profileCSS = document.createElement('style');
    profileCSS.id = 'profile-icons-style';
    profileCSS.textContent = `
        /* تصميم أيقونة البروفايل مثل باقي الأيقونات */
        .profile-icon-btn,
        #mobile-profile-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        
        .profile-icon-btn:hover,
        #mobile-profile-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .profile-icon-btn img,
        #mobile-profile-btn img {
            width: 24px;
            height: 24px;
            filter: brightness(0) invert(1);
        }
        
        /* إخفاء افتراضي - مهم جداً */
        .profile-icon-btn,
        #mobile-profile-btn {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
        }
        
        /* إخفاء حتى لو كان له data-profile-setup */
        .profile-icon-btn[data-profile-setup],
        #mobile-profile-btn[data-profile-setup] {
            display: none !important;
            visibility: hidden !important;
        }
        
        /* إظهار عند تسجيل الدخول - احترام CSS المتجاوب */
        .profile-icon-btn.show,
        #mobile-profile-btn.show {
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            position: relative !important;
            left: auto !important;
            /* لا نفرض display: block !important لاحترام media queries */
        }
    `;
    document.head.appendChild(profileCSS);
}

// تهيئة زر البروفايل للموبايل
function initializeMobileProfileButton() {
    const mobileProfileBtn = document.getElementById('mobile-profile-btn');
    
    if (mobileProfileBtn && !mobileProfileBtn.hasAttribute('data-mobile-profile-initialized')) {
        mobileProfileBtn.setAttribute('data-mobile-profile-initialized', 'true');
        
        // إزالة جميع الأنماط المخفية
        mobileProfileBtn.style.display = '';
        mobileProfileBtn.style.visibility = '';
        mobileProfileBtn.style.opacity = '';
        
        // إضافة الأنماط الأساسية
        mobileProfileBtn.style.fontFamily = '"Droid Arabic Kufi", sans-serif';
        
        // تحديث حالة العرض عند تغيير حجم النافذة - احترام قواعد CSS المتجاوبة
        function updateProfileButtonVisibility() {
            // لا نفرض الأنماط يدوياً، بل نترك CSS المتجاوب يتحكم
            // فقط نضيف/نزيل كلاس 'show' بناءً على حالة تسجيل الدخول
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                // على الكمبيوتر، نخفي الزر بغض النظر عن حالة تسجيل الدخول
                mobileProfileBtn.classList.remove('show');
            }
        }
        
        // تحديث حالة العرض عند التحميل
        updateProfileButtonVisibility();
        
        // تحديث حالة العرض عند تغيير حجم النافذة
        if (!window.profileResizeInitialized) {
            window.profileResizeInitialized = true;
            window.addEventListener('resize', updateProfileButtonVisibility);
        }
    }
}

// استدعاء الدالة عند تحميل الصفحة
if (!window.profileButtonInitialized) {
    window.profileButtonInitialized = true;
    document.addEventListener('DOMContentLoaded', function() {
        initializeMobileProfileButton();
    });
}