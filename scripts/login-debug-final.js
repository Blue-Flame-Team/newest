// سكريبت تصحيح نهائي لمشكلة أزرار تسجيل الدخول
(function() {
    'use strict';
    
    function debugLoginStatus() {

        
        // التحقق من وجود بيانات في localStorage
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = localStorage.getItem('currentUser');
        

            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            bodyClasses: document.body.className
        });
        
        // التحقق من وجود كلاس user-logged-in
        const hasUserClass = document.body.classList.contains('user-logged-in');

        
        // التحقق من أزرار تسجيل الدخول
        const loginBtns = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');

        loginBtns.forEach((btn, index) => {

                display: window.getComputedStyle(btn).display,
                visibility: window.getComputedStyle(btn).visibility,
                opacity: window.getComputedStyle(btn).opacity,
                classes: btn.className,
                id: btn.id
            });
        });
        
        // التحقق من أيقونات البروفايل
        const profileBtns = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');

        profileBtns.forEach((btn, index) => {

                display: window.getComputedStyle(btn).display,
                visibility: window.getComputedStyle(btn).visibility,
                opacity: window.getComputedStyle(btn).opacity,
                classes: btn.className,
                id: btn.id
            });
        });
        
        // إضافة كلاس تسجيل الدخول يدوياً للاختبار
        if (!hasUserClass && isLoggedIn) {

            document.body.classList.add('user-logged-in');
        }
    }
    
    // إضافة أزرار اختبار
    function addTestButtons() {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; background: white; padding: 10px; border: 1px solid black; border-radius: 5px;';
        testDiv.innerHTML = `
            <button onclick="debugLoginStatus()">فحص الحالة</button>
            <button onclick="localStorage.setItem('isLoggedIn', 'true'); localStorage.setItem('currentUser', JSON.stringify({username: 'test'})); document.body.classList.add('user-logged-in'); debugLoginStatus();">تسجيل دخول</button>
            <button onclick="localStorage.removeItem('isLoggedIn'); localStorage.removeItem('currentUser'); document.body.classList.remove('user-logged-in'); debugLoginStatus();">تسجيل خروج</button>
        `;
        document.body.appendChild(testDiv);
    }
    
    // تشغيل الفحص عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(debugLoginStatus, 1000);
            setTimeout(addTestButtons, 1500);
        });
    } else {
        setTimeout(debugLoginStatus, 1000);
        setTimeout(addTestButtons, 1500);
    }
    
    // إعادة الفحص كل 3 ثواني
    setInterval(debugLoginStatus, 3000);
    

})();