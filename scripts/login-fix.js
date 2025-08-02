// إصلاح مشكلة تسجيل الدخول - الاعتماد الكامل على CSS بدون inline styles
(function() {
    'use strict';
    
    // إنشاء نسخة معدلة من دوال تسجيل الدخول
    function fixedUpdateUIAfterLogin(user) {

        
        // إضافة كلاس تسجيل الدخول للـ body
        document.body.classList.add('user-logged-in');
        
        // إزالة جميع الأنماط المضمنة المتعلقة بالعرض
        const loginBtns = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
        const profileBtns = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');
        
        // إزالة الأنماط المضمنة من أزرار تسجيل الدخول
        loginBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
                btn.removeAttribute('style');
            }
        });
        
        // إزالة الأنماط المضمنة من أيقونات الملف الشخصي
        profileBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
                btn.removeAttribute('style');
                btn.classList.remove('hidden');
                btn.removeAttribute('hidden');
            }
        });
        
        // إضافة زر تسجيل الخروج إذا لم يكن موجوداً
        if (!document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.textContent = 'تسجيل الخروج';
            logoutBtn.className = 'logout-btn';
            logoutBtn.onclick = fixedLogoutUser;
            
            // إضافة الزر في مكان مناسب
            const topActions = document.querySelector('.top-actions');
            if (topActions) {
                topActions.appendChild(logoutBtn);
            }
        }
        
        // تحديث عرض اسم المستخدم
        if (user && user.username) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            const userDisplay = document.querySelector('.user-display');
            if (userDisplay) {
                userDisplay.textContent = user.username;
            }
        }
        

    }
    
    function fixedLogoutUser() {

        
        // إزالة كلاس تسجيل الدخول من body
        document.body.classList.remove('user-logged-in');
        
        // إزالة بيانات المستخدم
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        
        // إزالة الأنماط المضمنة من جميع العناصر
        const loginBtns = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
        const profileBtns = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');
        
        loginBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
                btn.removeAttribute('style');
            }
        });
        
        profileBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
                btn.removeAttribute('style');
            }
        });
        
        // إزالة زر تسجيل الخروج
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.remove();
        }
        

    }
    
    // دالة لتنظيف جميع الأنماط المضمنة عند تحميل الصفحة
    function cleanInlineStyles() {

        
        // إزالة الأنماط المضمنة من جميع عناصر تسجيل الدخول والبروفايل
        const elements = document.querySelectorAll('.login-btn, .profile-icon-btn, #mobile-profile-btn, .profile-btn, #login-btn, #mobile-login-btn');
        
        elements.forEach(el => {
            if (el && el.hasAttribute('style')) {
                el.removeAttribute('style');
            }
        });
        

    }
    
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = localStorage.getItem('currentUser');
        

        
        // تنظيف الأنماط المضمنة أولاً
        cleanInlineStyles();
        
        if (isLoggedIn && currentUser) {
            try {
                const user = JSON.parse(currentUser);

                fixedUpdateUIAfterLogin(user);
            } catch (e) {

                fixedLogoutUser();
            }
        } else {

            fixedLogoutUser();
        }
    }
    
    // استبدال الدوال القديمة بالدوال المعدلة
    window.updateUIAfterLogin = fixedUpdateUIAfterLogin;
    window.logoutUser = fixedLogoutUser;
    
    // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkLoginStatus);
    } else {
        checkLoginStatus();
    }
    

})();