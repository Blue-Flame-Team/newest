// تحميل النموذج من ملف منفصل
function loadLoginModal() {
    const modalHTML = `
    <div class="login-modal" id="login-modal" style="display: none;">
        <div class="login-modal-content">
            <div class="login-modal-header">
                <span class="close-modal">&times;</span>
            </div>
            <div class="login-modal-body">
                <h2 class="login-title">الوصول السريع</h2>
                
                <div class="phone-login-section">
                    <div class="phone-input-row">
                        <div class="country-code-select">
                            <div class="country-flag">
                                <img src="assets/icons/flag-for-flag-egypt-svgrepo-com 1.png" alt="مصر" class="flag-img">
                            </div>
                            <span class="code">+20</span>
                        </div>
                        <div class="phone-field">
                            <input type="tel" placeholder="رقم الهاتف" class="login-input" autocomplete="tel">
                        </div>
                    </div>
                    
                    <button class="send-code-btn">ارسل رمز التحقق</button>
                    <p class="error-msg">يجب إدخال رقم الهاتف</p>
                </div>
                
                <div class="separator">
                    <span>أو يمكنك تسجيل الدخول باسم المستخدم وكلمة المرور</span>
                </div>
                
                <form onsubmit="handleLogin(event)">
                    <div class="credentials-login-section">
                        <input type="text" placeholder="اسم المستخدم" class="login-input" autocomplete="username">
                        <div class="password-field">
                            <input type="password" placeholder="كلمة المرور" class="login-input" autocomplete="current-password">
                            <button type="button" class="toggle-password">
                                <img src="assets/icons/eye.png" alt="إظهار" class="eye-icon">
                            </button>
                        </div>
                        <button type="submit" class="login-submit-btn">دخول</button>
                        <a href="#" class="forgot-password">هل نسيت كلمة السر؟</a>
                    </div>
                </form>

                <div class="help-section">
                    <a href="#" class="help-btn customer-service">
                        <span>خدمة العملاء</span>
                        <img src="assets/icons/support.png" alt="خدمة" class="help-icon">
                    </a>
                    <a href="#" class="help-btn self-help">
                        <span>المساعدة الذاتية</span>
                        <img src="assets/icons/message-search.png" alt="مساعدة" class="help-icon">
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupLoginButtons();
}

// إعداد أزرار تسجيل الدخول
function setupLoginButtons() {
    const modal = document.getElementById('login-modal');
    const loginButtons = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
    const closeButton = document.querySelector('.close-modal');

    // فتح النموذج
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // إغلاق النموذج بزر X
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // إغلاق النموذج بالنقر خارجه
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // إغلاق النموذج بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // إعداد زر إظهار/إخفاء كلمة المرور
    const passwordToggle = document.querySelector('.toggle-password');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const passwordInput = document.querySelector('.password-field input[type="password"], .password-field input[type="text"]');
            const eyeIcon = passwordToggle.querySelector('.eye-icon');
            
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    if (eyeIcon) eyeIcon.alt = 'إخفاء';
                } else {
                    passwordInput.type = 'password';
                    if (eyeIcon) eyeIcon.alt = 'إظهار';
                }
            }
        });
    }

    // إعداد إرسال كود التحقق
    const sendCodeBtn = document.querySelector('.send-code-btn');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneInput = document.querySelector('.phone-field input');
            const errorMsg = document.querySelector('.error-msg');
            
            if (!phoneInput || phoneInput.value.trim() === '') {
                if (errorMsg) errorMsg.style.display = 'block';
                return;
            }
            
            if (errorMsg) errorMsg.style.display = 'none';
            
            // محاكاة إرسال الكود
            const originalText = sendCodeBtn.textContent;
            sendCodeBtn.textContent = 'جاري الإرسال...';
            sendCodeBtn.disabled = true;
            
            setTimeout(() => {
                alert('تم إرسال رمز التحقق إلى هاتفك');
                sendCodeBtn.textContent = originalText;
                sendCodeBtn.disabled = false;
            }, 2000);
        });
    }

    // إعداد زر تسجيل الدخول
    const loginSubmitBtn = document.querySelector('.login-submit-btn');
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const usernameInput = document.querySelector('.credentials-login-section input[type="text"]');
            const passwordInput = document.querySelector('.credentials-login-section input[type="password"], .credentials-login-section input[type="text"]');
            
            if (!usernameInput || !passwordInput || 
                usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
                alert('يرجى إدخال اسم المستخدم وكلمة المرور');
                return;
            }
            
            // محاكاة تسجيل الدخول
            const originalText = loginSubmitBtn.textContent;
            loginSubmitBtn.textContent = 'جاري تسجيل الدخول...';
            loginSubmitBtn.disabled = true;
            
            setTimeout(() => {
                alert('تم تسجيل الدخول بنجاح');
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                
                // مسح الحقول
                usernameInput.value = '';
                passwordInput.value = '';
                
                loginSubmitBtn.textContent = originalText;
                loginSubmitBtn.disabled = false;
            }, 2000);
        });
    }
}

// دالة معالجة تسجيل الدخول
function handleLogin(event) {
    event.preventDefault();
    
    const usernameInput = document.querySelector('.credentials-login-section input[type="text"]');
    const passwordInput = document.querySelector('.credentials-login-section input[type="password"]');
    
    if (!usernameInput || !passwordInput || 
        usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
        alert('يرجى إدخال اسم المستخدم وكلمة المرور');
        return false;
    }
    
    // محاكاة تسجيل الدخول
    alert('تم تسجيل الدخول بنجاح');
    
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // إضافة كود إدارة حالة تسجيل الدخول
    function updateLoginState(isLoggedIn) {
        const body = document.body;
        const loginButtons = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
        const logoutButtons = document.querySelectorAll('.logout-option');
        const profileButtons = document.querySelectorAll('.profile-btn, #mobile-profile-btn');
        const topActions = document.querySelector('.top-actions');

        if (isLoggedIn) {
            // إضافة الكلاس للبودي
            body.classList.add('user-logged-in');
            
            // إخفاء أزرار تسجيل الدخول
            loginButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            
            // إظهار أزرار الملف الشخصي
            profileButtons.forEach(btn => {
                btn.classList.add('show');
                btn.style.display = 'flex';
            });

            // إضافة زر تسجيل الخروج
            if (topActions) {
                const logoutBtn = document.createElement('a');
                logoutBtn.href = 'javascript:void(0);';
                logoutBtn.classList.add('logout-btn');
                logoutBtn.textContent = 'تسجيل الخروج';
                logoutBtn.addEventListener('click', () => updateLoginState(false));
                topActions.appendChild(logoutBtn);
            }
        } else {
            // إزالة الكلاس من البودي
            body.classList.remove('user-logged-in');
            
            // إظهار أزرار تسجيل الدخول
            loginButtons.forEach(btn => {
                btn.style.display = 'block';
            });
            
            // إخفاء أزرار الملف الشخصي
            profileButtons.forEach(btn => {
                btn.classList.remove('show');
                btn.style.display = 'none';
            });

            // إزالة زر تسجيل الخروج
            const existingLogoutBtn = topActions.querySelector('.logout-btn');
            if (existingLogoutBtn) {
                existingLogoutBtn.remove();
            }
        }
    }
    
    // تحديث حالة تسجيل الدخول
    updateLoginState(true);
    
    return false;
}

function setupForgotPasswordLink() {
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            // فتح نافذة استرداد كلمة المرور
            const forgotPasswordModal = document.getElementById('forgot-password-modal');
            if (forgotPasswordModal) {
                forgotPasswordModal.style.display = 'block';
            }
        });
    }
}

// تشغيل التحميل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadLoginModal); 
document.addEventListener('DOMContentLoaded', setupForgotPasswordLink); 

// إضافة حدث لزر تسجيل الخروج في القائمة الجانبية
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLogoutBtn = document.querySelector('.logout-option');
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', () => updateLoginState(false));
    }
}); 