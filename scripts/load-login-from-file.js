/**
 * محمل نافذة تسجيل الدخول العالمي
 * يعمل على جميع الصفحات بدون تكرار
 */

(function() {
    'use strict';
    
    // طباعة رسالة تأكيد تحميل الملف


    // متغيرات عامة
    let isLoginModalLoaded = false;
    let retryCount = 0;
    const maxRetries = 3;
    
    // مستخدمون تجريبيون
    const testUsers = {
        admin: {
            username: 'admin',
            password: 'admin123',
            role: 'مسؤول النظام',
            permissions: ['كل الصلاحيات']
        },
        editor: {
            username: 'editor',
            password: 'editor456',
            role: 'محرر المحتوى',
            permissions: ['تعديل المحتوى', 'نشر المقالات']
        },
        viewer: {
            username: 'viewer',
            password: 'viewer789',
            role: 'مستخدم عادي',
            permissions: ['عرض المحتوى']
        },
        support: {
            username: 'support',
            password: 'support321',
            role: 'خدمة العملاء',
            permissions: ['دعم العملاء', 'حل المشكلات']
        }
    };

    // دالة التحقق من المستخدم
    function validateUser(username, password) {
        const user = testUsers[username];
        return user && user.password === password ? user : null;
    }

    // تعريف الدالة كدالة عامة
    window.updateUIAfterLogin = function(user) {


        // إضافة class user-logged-in إلى body
        document.body.classList.add('user-logged-in');


        // إعادة ربط زر تسجيل الخروج بعد عرض القائمة
if (typeof window.setupLogoutHandlers === 'function') {
    window.setupLogoutHandlers();
}

        // محددات متعددة لأزرار تسجيل الدخول
        const loginButtonSelectors = [
            '.login-btn#login-btn', 
            '.login-btn#mobile-login-btn', 
            '.top-actions .login-btn'
        ];

        // محددات متعددة لأيقونات البروفايل
        const profileButtonSelectors = [
            '.profile-icon-btn.profile-btn', 
            '#mobile-profile-btn',
            '.main-icons-group .profile-icon-btn'
        ];

        // إخفاء أزرار تسجيل الدخول - نعتمد على CSS بدلاً من inline styles
        loginButtonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(btn => {
                if (btn) {

                    // إزالة inline styles ليتم التحكم من CSS
                    btn.style.display = '';
                    btn.style.visibility = '';
                    btn.style.opacity = '';
                }
            });
        });

        // إظهار أيقونات البروفايل - إزالة inline styles ليتم التحكم من CSS
        profileButtonSelectors.forEach(selector => {
            const profileButtons = document.querySelectorAll(selector);
            profileButtons.forEach(profileButton => {
                if (profileButton) {

                    
                    // إزالة inline styles ليتم التحكم من CSS
                    profileButton.style.display = '';
                    profileButton.style.visibility = '';
                    profileButton.style.opacity = '';
                    profileButton.classList.remove('hidden');
                    profileButton.removeAttribute('hidden');
                    
                    // تحديث اسم المستخدم
                    let usernameSpan = profileButton.querySelector('.username');
                    if (!usernameSpan) {
                        usernameSpan = document.createElement('span');
                        usernameSpan.classList.add('username');
                        profileButton.appendChild(usernameSpan);
                    }
                    usernameSpan.textContent = user.username;
                }
            });
        });

        // إضافة زر تسجيل الخروج
        addLogoutButton();

        // تحديث localStorage
        try {
            // استخدام نفس نظام المفاتيح مثل auth-system.js
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

        } catch (error) {

        }

        // تشخيص النظام بعد التحديث
        debugLoginSystem();
    };

    // تعديل دالة addLogoutButton لتكون عامة أيضاً
    window.addLogoutButton = function() {
        const profileButtonSelectors = [
            '.profile-icon-btn.profile-btn', 
            '#mobile-profile-btn', 
            '.main-icons-group .profile-icon-btn'
        ];

        profileButtonSelectors.forEach(selector => {
            const profileButtons = document.querySelectorAll(selector);
            profileButtons.forEach(profileButton => {
                if (profileButton && !profileButton.querySelector('.logout-btn')) {
                const logoutButton = document.createElement('button');
                logoutButton.textContent = 'تسجيل الخروج';
                logoutButton.classList.add('logout-btn');
                    logoutButton.style.marginLeft = '10px';
                    logoutButton.addEventListener('click', window.logoutUser);
                    
                    profileButton.appendChild(logoutButton);

                }
            });
        });
    };

    // دالة تسجيل الخروج
    window.logoutUser = function() {

        
        // إزالة class user-logged-in من body
        document.body.classList.remove('user-logged-in');


        try {
            // محددات أزرار تسجيل الدخول
        const loginButtonSelectors = [
                '.login-btn#login-btn', 
                '.login-btn#mobile-login-btn', 
                '.top-actions .login-btn'
            ];

            // محددات أيقونات البروفايل
            const profileButtonSelectors = [
                '.profile-icon-btn.profile-btn', 
                '#mobile-profile-btn', 
                '.main-icons-group .profile-icon-btn'
            ];

            // إعادة إظهار أزرار تسجيل الدخول - إزالة inline styles
        loginButtonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(btn => {
                if (btn) {
                    // إزالة inline styles ليتم التحكم من CSS
                    btn.style.display = '';
                    btn.style.visibility = '';
                    btn.style.opacity = '';

                }
            });
        });

            // إخفاء أيقونات البروفايل - إزالة inline styles
            profileButtonSelectors.forEach(selector => {
                const profileButtons = document.querySelectorAll(selector);
                profileButtons.forEach(profileButton => {
                    if (profileButton) {
                        // إزالة inline styles ليتم التحكم من CSS
                        profileButton.style.display = '';
                        profileButton.style.visibility = '';
                        profileButton.style.opacity = '';

                    }
                });
            });

            // إزالة أزرار تسجيل الخروج
            const logoutButtons = document.querySelectorAll('.logout-btn');
            logoutButtons.forEach(btn => {
                btn.remove();

        });

        // مسح بيانات هذا النظام فقط
        localStorage.removeItem('userLoginTime');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userPermissions');
        

        
        // لا نقوم بمسح currentUser و isLoggedIn لأن auth-system.js يديرها

        // إعادة تعيين واجهة المستخدم إلى حالة تسجيل الخروج
        resetToLoggedOutState();
        
        debugLoginSystem(); // فحص الحالة بعد تسجيل الخروج
        } catch (error) {

        }
    }

    // إضافة اختبار تلقائي عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {


        // تشخيص أولي فقط بدون اختبار تلقائي
        debugLoginSystem();
    });

    // إعادة تعيين واجهة المستخدم إلى حالة تسجيل الخروج
    function resetToLoggedOutState() {
        // إزالة class user-logged-in من body
        document.body.classList.remove('user-logged-in');
        
        // إزالة زر تسجيل الخروج
        const logoutButtons = document.querySelectorAll('.logout-btn, #logout-btn, #mobile-logout-btn');
        logoutButtons.forEach(btn => {
            if (btn && btn.parentNode) {
                btn.parentNode.removeChild(btn);
            }
        });
        
        // إعادة تعيين أزرار تسجيل الدخول - إزالة inline styles
        const loginButtons = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
        loginButtons.forEach(btn => {
            if (btn) {
                btn.style.display = '';
                btn.style.visibility = '';
                btn.style.opacity = '';
            }
        });
        
        // إعادة تعيين أيقونات البروفايل - إزالة inline styles
        const profileButtons = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');
        profileButtons.forEach(btn => {
            if (btn) {
                btn.style.display = '';
                btn.style.visibility = '';
                btn.style.opacity = '';
            }
        });
        
        // إعادة تعيين اسم المستخدم في الهيدر
        const usernameDisplay = document.querySelector('.username-display, #username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = '';
            usernameDisplay.style.display = '';
        }
        
        // إعادة تعيين صورة الملف الشخصي
        const profilePic = document.querySelector('.profile-picture, #profile-picture');
        if (profilePic) {
            profilePic.style.display = '';
        }
        

    }

    // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUserData = localStorage.getItem('currentUser');

        if (isLoggedIn && currentUserData) {
            try {
                const user = JSON.parse(currentUserData);
                updateUIAfterLogin(user);
            } catch (error) {

                // في حالة وجود خطأ، إعادة تعيين الحالة فقط بدون مسح البيانات
                resetToLoggedOutState();
            }
        } else {
            // لا نقوم بمسح البيانات هنا لأن auth-system.js يديرها
            resetToLoggedOutState();
        }
    }

    // تحديد مسار الملفات حسب الصفحة الحالية
    function getAssetPath(relativePath) {
        const currentPath = window.location.pathname;
        const isInSubPage = currentPath.includes('/pages/');
        return isInSubPage ? '../' + relativePath : relativePath;
    }
    
    // تحميل CSS
    function loadLoginCSS() {
        if (document.querySelector('link[href*="login-modal.css"]')) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = getAssetPath('styles/login-modal.css');
            link.onload = () => resolve();
            link.onerror = () => reject(new Error('Failed to load CSS'));
            document.head.appendChild(link);
        });
    }
    
    // تحميل HTML النافذة
    function loadLoginHTML() {
        return new Promise((resolve, reject) => {
            // التأكد من استخدام المسار الصحيح
            const htmlPath = getAssetPath('include/login-modal.html');
            
            if (window.fetch) {
                fetch(htmlPath)
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.text();
                    })
                    .then(html => {
                        const correctedHTML = html.replace(
                            /src="assets\//g, 
                            `src="${getAssetPath('assets/')}`
                        );
                        
                        document.body.insertAdjacentHTML('beforeend', correctedHTML);
                        resolve();
                    })
                    .catch(() => loadWithXHR(htmlPath, resolve, reject));
            } else {
                loadWithXHR(htmlPath, resolve, reject);
            }
        });
    }
    
    // تحميل باستخدام XMLHttpRequest (لدعم المتصفحات القديمة)
    function loadWithXHR(htmlPath, resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', htmlPath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const correctedHTML = xhr.responseText.replace(
                        /src="assets\//g, 
                        `src="${getAssetPath('assets/')}`
                    );
                    document.body.insertAdjacentHTML('beforeend', correctedHTML);
                    resolve();
                } else {

                    reject(new Error('Failed to load HTML'));
                }ئ
            }
        };
        xhr.onerror = function() {

            reject(new Error('Failed to load HTML'));
        };
        xhr.send();
    }
    
    // تحميل JavaScript
    function loadLoginJS() {
        return new Promise((resolve, reject) => {
            // تحقق من وجود الدوال مسبقاً
            if (window.handleLogin && typeof window.handleLogin === 'function') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = getAssetPath('scripts/login-modal.js');
            script.onload = () => resolve();
            script.onerror = () => {
                createBasicLoginFunctions();
                resolve();
            };
            document.head.appendChild(script);
        });
    }
    
    // إنشاء دوال أساسية كـ fallback
    function createBasicLoginFunctions() {
        window.handleLogin = function(event) {
            event.preventDefault();
            
            // محددات أكثر شمولية للحقول
            const usernameInput = document.querySelector('.login-input[autocomplete="username"]') || 
                                   document.querySelector('input[name="username"]') ||
                                   document.querySelector('#username');
            
            const passwordInput = document.querySelector('.login-input[autocomplete="current-password"]') || 
                                   document.querySelector('input[name="password"]') ||
                                   document.querySelector('#password');
            
            const username = usernameInput ? usernameInput.value : '';
            const password = passwordInput ? passwordInput.value : '';
            

            
            const user = validateUser(username, password);
            
            if (user) {
                // تحديث واجهة المستخدم
                updateUIAfterLogin(user);
                
                // إشعار بنجاح تسجيل الدخول
                showToast(`مرحباً، ${user.username}! (${user.role})`, 'success');
                
                // إغلاق النافذة
                closeLoginModal();
            } else {
                // فشل تسجيل الدخول
                showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
            }
        };
    }
    
    // عرض الإشعارات
    function showToast(message, type = 'success') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
    
    // ربط أزرار تسجيل الدخول
    function setupLoginButtons() {
        const selectors = [
            '.login-btn',
            '#login-btn', 
            '#mobile-login-btn',
            'a[href="#login-modal"]',
            'button[data-action="login"]'
        ];
        
        selectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                if (!button.hasAttribute('data-login-bound')) {
                    const newButton = button.cloneNode(true);
                    if (button.parentNode) {
                        button.parentNode.replaceChild(newButton, button);
                    }
                    
                    newButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        openLoginModal();
                    });
                    
                    newButton.setAttribute('data-login-bound', 'true');
                }
            });
        });
    }
    
    // فتح النافذة
    function openLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {

            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(initializeLoginModal, 1000);
            }
        }
    }
    
    // إغلاق النافذة
    function closeLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
    
    // إعداد أحداث الإغلاق
    function setupCloseEvents() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-modal')) {
                closeLoginModal();
            }
            
            if (e.target.id === 'login-modal') {
                closeLoginModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLoginModal();
            }
        });
    }
    
    // دالة تشخيص شاملة
    function debugLoginSystem() {

        
        // فحص العناصر الأساسية
        const loginButtonSelectors = [
            '.login-btn#login-btn', 
            '.login-btn#mobile-login-btn', 
            '.top-actions .login-btn'
        ];

        const profileButtonSelectors = [
            '.profile-icon-btn.profile-btn', 
            '#mobile-profile-btn', 
            '.main-icons-group .profile-icon-btn'
        ];


        loginButtonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);

            buttons.forEach((btn, index) => {



            });
        });


        profileButtonSelectors.forEach(selector => {
            const profileButtons = document.querySelectorAll(selector);

            profileButtons.forEach((btn, index) => {




                    originalFontSize: btn.getAttribute('data-original-font-size'),
                    profileSetup: btn.getAttribute('data-profile-setup')
                });
            });
        });


    }

    // دالة تشخيص شامل للتحميل
    function diagnoseLoginSystem() {

        
        // فحص ملفات JavaScript
        const scripts = [
            'load-login-from-file.js',
            'login-modal.js'
        ];
        

        scripts.forEach(script => {
            const scriptElement = document.querySelector(`script[src*="${script}"]`);

        });

        // فحص ملفات CSS
        const stylesheets = [
            'login-modal.css',
            'global.css',
            'mobile-view.css'
        ];
        

        stylesheets.forEach(stylesheet => {
            const styleElement = document.querySelector(`link[href*="${stylesheet}"]`);

        });
        
        // فحص أيقونات البروفايل
        const profileButtonSelectors = [
            '.profile-icon-btn.profile-btn', 
            '#mobile-profile-btn', 
            '.main-icons-group .profile-icon-btn'
        ];


        profileButtonSelectors.forEach(selector => {
            const profileButtons = document.querySelectorAll(selector);

            
            if (profileButtons.length === 0) {

            }
            
            profileButtons.forEach((btn, index) => {





                    originalFontSize: btn.getAttribute('data-original-font-size'),
                    profileSetup: btn.getAttribute('data-profile-setup')
                });
            });
        });
        

    }

    // دالة فتح نافذة نسيت كلمة المرور
    function openForgotPasswordModal(event) {
        event.preventDefault();
        const modal = document.getElementById('forgot-password-modal');
        if (modal) {
            // إخفاء جميع النوافذ الأخرى
            const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
            allModals.forEach(m => {
                if (m.id !== 'forgot-password-modal') {
                    m.style.display = 'none';
                }
            });

            // إظهار نافذة نسيت كلمة المرور
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.position = 'fixed';
            modal.style.zIndex = '99999';
            modal.style.left = '0';
        }
    }

    // دالة إغلاق نافذة نسيت كلمة المرور
    function closeForgotPasswordModal() {
        const modal = document.getElementById('forgot-password-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // تصدير الدالة للاستخدام العام
    window.closeForgotPasswordModal = closeForgotPasswordModal;

    // دالة إرسال طلب استعادة كلمة المرور
    function submitForgotPassword(event) {
        event.preventDefault();
        const usernameInput = document.querySelector('.forgot-password-input');
        const submitButton = document.querySelector('.forgot-password-submit-btn');

        if (!usernameInput.value) {
            showToast('يرجى إدخال اسم المستخدم');
            return;
        }

        // محاكاة إرسال طلب استعادة كلمة المرور
        submitButton.disabled = true;
        submitButton.textContent = 'جاري الإرسال...';

        // محاكاة الاستجابة من الخادم
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'إرسال رابط الاسترداد';

            // عرض رسالة نجاح
            showToast('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
            
            // مسح الحقل
            usernameInput.value = '';

            // إغلاق النافذة
            closeForgotPasswordModal();
        }, 2000);
    }

    // دالة عرض رسالة التنبيه
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 100000;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }

    // ربط الدوال بالأحداث
    document.addEventListener('DOMContentLoaded', () => {
        const forgotPasswordLinks = document.querySelectorAll('.forgot-password');
        forgotPasswordLinks.forEach(link => {
            if (!link.hasAttribute('data-forgot-password-bound')) {
                link.addEventListener('click', openForgotPasswordModal);
                link.setAttribute('data-forgot-password-bound', 'true');
            }
        });

        const submitButton = document.querySelector('.forgot-password-submit-btn');
        if (submitButton) {
            submitButton.addEventListener('click', submitForgotPassword);
        }

        const closeButton = document.querySelector('.close-forgot-modal');
        if (closeButton) {
            closeButton.addEventListener('click', closeForgotPasswordModal);
        }

        // إغلاق النافذة عند النقر خارج المحتوى
        const forgotPasswordModal = document.getElementById('forgot-password-modal');
        if (forgotPasswordModal) {
            forgotPasswordModal.addEventListener('click', function(event) {
                if (event.target === forgotPasswordModal) {
                    closeForgotPasswordModal();
                }
            });
        }
    });

    // إضافة الدالة إلى نقاط التحميل المختلفة
    function initializeLoginModal() {
        if (isLoginModalLoaded) return;
        
        // تشخيص قبل التحميل

        diagnoseLoginSystem();
        
        Promise.all([
            loadLoginCSS(),
            loadLoginHTML(),
            loadLoginJS()
        ])
        .then(() => {
            isLoginModalLoaded = true;
            setupLoginButtons();
            setupCloseEvents();
            
            // إتاحة الدوال عالمياً
            window.openLoginModal = openLoginModal;
            window.closeLoginModal = closeLoginModal;
            window.testUsers = testUsers;
            window.validateUser = validateUser;
            window.updateUIAfterLogin = updateUIAfterLogin;
            window.logoutUser = logoutUser;
            window.debugLoginSystem = debugLoginSystem;
            

                logoutUser: typeof window.logoutUser,
                openLoginModal: typeof window.openLoginModal,
                closeLoginModal: typeof window.closeLoginModal
            });
            
            // التحقق من حالة تسجيل الدخول
            checkLoginStatus();
            
            // تشخيص بعد التحميل

            diagnoseLoginSystem();
            
            // إعادة ربط الأزرار كل ثانيتين
            setInterval(setupLoginButtons, 2000);

            // محاولة إظهار أيقونات البروفايل
            const profileButtonSelectors = [
                '.profile-icon-btn.profile-btn', 
                '#mobile-profile-btn', 
                '.main-icons-group .profile-icon-btn'
            ];

            profileButtonSelectors.forEach(selector => {
                const profileButtons = document.querySelectorAll(selector);
                profileButtons.forEach(btn => {
                    if (btn) {

                        btn.style.display = 'block';
                        btn.style.visibility = 'visible';
                        btn.classList.remove('hidden');
                        btn.removeAttribute('hidden');
                    }
                });
            });

            // إضافة ربط رابط نسيان كلمة المرور
            setupForgotPasswordLink();
        })
        .catch(error => {

            
            // تشخيص في حالة الخطأ
            diagnoseLoginSystem();
            
            if (retryCount < maxRetries) {
                retryCount++;

                setTimeout(initializeLoginModal, 2000);
            } else {

            }
        });
    }
    
    // بدء التحميل عند جاهزية الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLoginModal);
    } else {
        initializeLoginModal();
    }
    
    // دعم المتصفحات القديمة
    if (window.addEventListener) {
        window.addEventListener('load', function() {
            setTimeout(setupLoginButtons, 500);
        });
    } else if (window.attachEvent) {
        window.attachEvent('onload', function() {
            setTimeout(setupLoginButtons, 500);
        });
    }

})();
