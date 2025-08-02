// نظام إصلاح نافذة تسجيل الدخول المحسن - نسخة نظيفة

(function() {
    'use strict';
    
    // وظائف النوافذ الأساسية
    function openLoginModal() {
        const modal = document.getElementById('login-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            if (overlay) {
                overlay.style.display = 'block';
            }
        }
    }
    
    function closeLoginModal() {
        const modal = document.getElementById('login-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    }
    
    function openForgotPasswordModal() {
        closeLoginModal();
        
        const modal = document.getElementById('forgot-password-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            if (overlay) {
                overlay.style.display = 'block';
            }
        }
    }
    
    function closeForgotPasswordModal() {
        const modal = document.getElementById('forgot-password-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    }
    
    // ربط أزرار تسجيل الدخول
    function setupLoginButtons() {
        // البحث عن جميع الأزرار والروابط المحتملة
        const allElements = document.querySelectorAll('button, a, [onclick]');
        
        allElements.forEach((element) => {
            const text = (element.textContent || element.innerText || '').trim();
            
            if (text.includes('تسجيل الدخول') || text.includes('دخول')) {
                element.removeAttribute('onclick');
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openLoginModal();
                });
            }
            
            if (text.includes('هل نسيت كلمة السر') || text.includes('نسيت كلمة المرور')) {
                element.removeAttribute('onclick');
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openForgotPasswordModal();
                });
            }
        });
    }
    
    // إعداد أحداث الإغلاق
    function setupCloseEvents() {
        // إغلاق نافذة تسجيل الدخول
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-modal') || 
                e.target.classList.contains('close-login-modal')) {
                closeLoginModal();
            }
            
            if (e.target.classList.contains('close-forgot-modal')) {
                closeForgotPasswordModal();
            }
            
            // إغلاق عند النقر على الخلفية
            if (e.target.id === 'login-modal' || e.target.id === 'forgot-password-modal') {
                closeLoginModal();
                closeForgotPasswordModal();
            }
        });
    }
    
    // معالجة تسجيل الدخول
    function handleLogin(username, password) {
        if (username.trim() && password.trim()) {
            // حفظ حالة تسجيل الدخول
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                username: username,
                loginTime: new Date().toISOString()
            }));
            
            closeLoginModal();
            
            // إرسال حدث تسجيل الدخول
            window.dispatchEvent(new CustomEvent('userLoggedIn', {
                detail: { username: username }
            }));
        }
    }
    
    // إعداد نماذج تسجيل الدخول
    function setupLoginForms() {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            const loginForm = loginModal.querySelector('form, .login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const usernameInput = loginForm.querySelector('input[type="text"], input[type="email"]');
                    const passwordInput = loginForm.querySelector('input[type="password"]');
                    
                    if (usernameInput && passwordInput) {
                        handleLogin(usernameInput.value, passwordInput.value);
                    }
                });
            }
            
            // زر إرسال رمز التحقق
            const sendCodeButton = loginModal.querySelector('.send-code-btn');
            if (sendCodeButton) {
                sendCodeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const phoneInput = loginModal.querySelector('input[type="tel"]');
                    if (phoneInput && phoneInput.value.trim()) {
                        alert('تم إرسال رمز التحقق');
                    }
                });
            }
        }
        
        // إعداد نافذة استرداد كلمة المرور
        const forgotModal = document.getElementById('forgot-password-modal');
        if (forgotModal) {
            const submitButton = forgotModal.querySelector('.forgot-submit');
            if (submitButton) {
                submitButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const usernameInput = forgotModal.querySelector('input[type="text"], input[type="email"]');
                    if (usernameInput && usernameInput.value.trim()) {
                        alert('تم إرسال رابط استرداد كلمة المرور إلى بريدك الإلكتروني');
                        closeForgotPasswordModal();
                    }
                });
            }
        }
    }
    
    // البحث الدوري عن العناصر الجديدة
    function startPeriodicSearch() {
        let searchCount = 0;
        const maxSearches = 10;
        
        const searchInterval = setInterval(() => {
            setupLoginButtons();
            setupLoginForms();
            
            searchCount++;
            if (searchCount >= maxSearches) {
                clearInterval(searchInterval);
            }
        }, 2000);
    }
    
    // التهيئة الرئيسية
    function init() {
        setupLoginButtons();
        setupCloseEvents();
        setupLoginForms();
        startPeriodicSearch();
    }
    
    // تشغيل النظام
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // جعل الوظائف متاحة عالمياً
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.openForgotPasswordModal = openForgotPasswordModal;
    window.closeForgotPasswordModal = closeForgotPasswordModal;
    
})(); 