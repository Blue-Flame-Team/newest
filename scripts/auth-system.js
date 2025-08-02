/**
 * نظام تسجيل الدخول الموحد - محامون المملكة
 * 
 * ملف نظام المصادقة الرئيسي الذي يتعامل مع جميع وظائف تسجيل الدخول وواجهة المستخدم
 * تم هيكلته ليكون سهل الدمج مع نظام الباك إند مستقبلاً
 */

// تنفيذ النظام باستخدام نمط IIFE لتجنب التداخل مع المتغيرات العالمية
const AuthSystem = (function() {
    // المتغيرات الخاصة بالنظام
    let _currentUser = null;
    const LOCAL_STORAGE_KEY = 'currentUser';
    const LOGIN_STATUS_KEY = 'isLoggedIn';
    
    // بيانات المستخدمين للنسخة التجريبية فقط - سيتم استبدالها بباك إند حقيقي
    const _testUsers = [
        { username: 'test', password: '123456', name: 'مستخدم تجريبي' },
        { username: 'admin', password: 'admin123', name: 'مشرف النظام' },
        { username: 'lawyer', password: 'lawyer123', name: 'المحامي عبدالله' },
        { username: 'manal', password: 'manal123', name: 'Manal Mohamed taha' }
    ];
    
    // عناصر واجهة المستخدم
    let _elements = {
        loginBtns: null,
        loginModal: null,
        closeModal: null,
        togglePassword: null,
        passwordField: null,
        usernameInput: null,
        loginSubmitBtn: null,
        phoneInput: null,
        sendCodeBtn: null,
        errorMsg: null,
        forgotPasswordLink: null,
        forgotPasswordModal: null,
        closeForgotModal: null,
        mainIconsGroup: null,
        profileIconBtn: null
    };
    
    /**
     * تهيئة النظام عند تحميل الصفحة
     */
    function init() {
        // التأكد من أن DOM جاهز تماماً
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', _initializeAuthSystem);
        } else {
            _initializeAuthSystem();
        }
    }
    
    /**
     * تهيئة نظام المصادقة بعد تحميل DOM بالكامل
     */
    function _initializeAuthSystem() {
        // الحصول على كافة عناصر واجهة المستخدم
        _cacheElements();
        
        // إضافة سكريبت اختيار الدولة إذا لم يكن موجوداً
        if (!document.querySelector('script[src*="login-modal-country-selector.js"]')) {
            const script = document.createElement('script');
            script.src = '../scripts/login-modal-country-selector.js';
            script.onload = () => {
                if (typeof initializeCountrySelectors === 'function') {
                    setTimeout(initializeCountrySelectors, 100);
                }
            };
            // document.body.appendChild(script);
        }
        
        // تهيئة القائمة المنسدلة للدول
        if (typeof initializeCountryDropdown === 'function') {
            initializeCountryDropdown();
        }
        
        // تهيئة الأحداث لعناصر واجهة المستخدم
        _setupEventListeners();
        
        // التحقق من وجود مستخدم مسجل الدخول مسبقاً (بعد تأخير صغير للتأكد من تحميل جميع العناصر)
        setTimeout(() => {
            _checkLoggedInUser();
        }, 100);
    }
    
    /**
     * تخزين مراجع لعناصر DOM المطلوبة
     * يسهل الوصول إليها بدل البحث المتكرر في DOM
     */
    function _cacheElements() {
        _elements.loginBtns = document.querySelectorAll('.login-btn');
        _elements.loginModal = document.getElementById('login-modal');
        _elements.closeModal = document.querySelector('.close-modal');
        _elements.togglePassword = document.querySelector('.toggle-password');
        _elements.passwordField = document.querySelector('.password-field input');
        _elements.usernameInput = document.querySelector('.credentials-login-section input[type="text"]');
        _elements.loginSubmitBtn = document.querySelector('.login-submit-btn');
        _elements.phoneInput = document.querySelector('.phone-field input');
        _elements.sendCodeBtn = document.querySelector('.send-code-btn');
        _elements.errorMsg = document.querySelector('.error-msg');
        _elements.forgotPasswordLink = document.querySelector('.forgot-password');
        _elements.forgotPasswordModal = document.getElementById('forgot-password-modal');
        _elements.closeForgotModal = document.querySelector('.close-forgot-modal');
        _elements.mainIconsGroup = document.querySelector('.main-icons-group');
        _elements.profileIconBtn = document.querySelector('.profile-icon-btn');
        
        // تسجيل للتشخيص
        
        // تسجيل للتشخيص
    }
    
    /**
     * إعداد مستمعي الأحداث للعناصر المختلفة
     */
    function _setupEventListeners() {
        // التحقق من وجود العناصر المطلوبة قبل إضافة الأحداث
        
        // 1. أزرار تسجيل الدخول في جميع أنحاء الموقع
        if (_elements.loginBtns && _elements.loginBtns.length > 0) {
            _elements.loginBtns.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    _showLoginModal();
                });
            });
        }
        
        // 2. زر إغلاق النافذة المنبثقة
        if (_elements.closeModal && _elements.loginModal) {
            _elements.closeModal.addEventListener('click', _hideLoginModal);
        }
        
        // 3. إغلاق النافذة عند النقر خارجها
        window.addEventListener('click', function(e) {
            if (_elements.loginModal && e.target === _elements.loginModal) {
                _hideLoginModal();
            } else if (_elements.forgotPasswordModal && e.target === _elements.forgotPasswordModal) {
                _elements.forgotPasswordModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // 4. تبديل رؤية كلمة المرور
        if (_elements.togglePassword && _elements.passwordField) {
            _elements.togglePassword.addEventListener('click', function() {
                const type = _elements.passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                _elements.passwordField.setAttribute('type', type);
            });
        }
        
        // 5. إرسال نموذج تسجيل الدخول بواسطة اسم المستخدم وكلمة المرور
        if (_elements.loginSubmitBtn && _elements.usernameInput && _elements.passwordField) {
            _elements.loginSubmitBtn.addEventListener('click', function() {
                const username = _elements.usernameInput.value.trim();
                const password = _elements.passwordField.value;
                
                if (!username || !password) {
                    alert('الرجاء إدخال اسم المستخدم وكلمة المرور');
                    return;
                }
                
                login(username, password);
            });
        }
        
        // 6. إرسال رمز التحقق للهاتف
        if (_elements.sendCodeBtn && _elements.phoneInput && _elements.errorMsg) {
            _elements.sendCodeBtn.addEventListener('click', function() {
                const phone = _elements.phoneInput.value.trim();
                
                if (!phone) {
                    _elements.errorMsg.style.display = 'block';
                    return;
                }
                
                _elements.errorMsg.style.display = 'none';
                alert('تم إرسال رمز التحقق إلى الرقم: ' + phone);
                
                // محاكاة تسجيل الدخول بعد التحقق من رقم الهاتف
                setTimeout(function() {
                    // تسجيل الدخول كمستخدم تجريبي بعد 2 ثانية
                    login('test', '123456');
                }, 2000);
            });
        }
        
        // 7. رابط استعادة كلمة المرور
        if (_elements.forgotPasswordLink && _elements.forgotPasswordModal) {
            _elements.forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                _elements.loginModal.classList.remove('show');
                _elements.forgotPasswordModal.classList.add('show');
            });
        }
        
        // 8. إغلاق نافذة استعادة كلمة المرور
        if (_elements.closeForgotModal) {
            _elements.closeForgotModal.addEventListener('click', function() {
                _elements.forgotPasswordModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    }
    
    /**
     * إظهار النافذة المنبثقة لتسجيل الدخول
     */
    function _showLoginModal() {
        if (!_elements.loginModal) return;
        
        _elements.loginModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة الخلفية
    }
    
    /**
     * إخفاء النافذة المنبثقة لتسجيل الدخول
     */
    function _hideLoginModal() {
        if (!_elements.loginModal) return;
        
        _elements.loginModal.classList.remove('show');
        document.body.style.overflow = ''; // إعادة التمرير إلى وضعه الطبيعي
    }
    
    /**
     * تسجيل الدخول باستخدام اسم المستخدم وكلمة المرور
     * @param {string} username - اسم المستخدم
     * @param {string} password - كلمة المرور
     * @return {boolean} نجاح أو فشل تسجيل الدخول
     */
    function login(username, password) {
        // البحث عن المستخدم في قائمة المستخدمين التجريبية
        // ملاحظة: سيتم استبدال هذا بطلب API في النظام الحقيقي
        let user = null;
        
        for (let i = 0; i < _testUsers.length; i++) {
            if (_testUsers[i].username === username && _testUsers[i].password === password) {
                user = _testUsers[i];
                break;
            }
        }
        
        if (user) {
            // تسجيل الدخول ناجح
            _currentUser = {
                username: user.username,
                name: user.name,
                isLoggedIn: true
            };
            
            // حفظ بيانات المستخدم في التخزين المحلي
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_currentUser));
            localStorage.setItem(LOGIN_STATUS_KEY, 'true');


            
            // إخفاء زر تسجيل الدخول وإظهار أيقونة الملف الشخصي
            _updateUIAfterLogin();
            
            // إغلاق نافذة تسجيل الدخول
            _hideLoginModal();
            
            return true;
        } else {
            // فشل تسجيل الدخول
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            return false;
        }
    }
    
    /**
     * تسجيل الخروج من النظام
     */
    function logout() {
        // حذف بيانات المستخدم من الذاكرة والتخزين المحلي
        _currentUser = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(LOGIN_STATUS_KEY);

        
        // إزالة كلاس المستخدم المسجل من body
        document.body.classList.remove('user-logged-in');
        
        // إخفاء أيقونة الملف الشخصي وإظهار زر تسجيل الدخول
        _updateUIAfterLogout();
        
        // إغلاق أي نوافذ مفتوحة للمستخدم
        _hideUserDashboard();
        
    }
    
    /**
     * فحص حالة تسجيل الدخول عند تحميل الصفحة
     */
    function _checkLoggedInUser() {
        try {
            // التحقق من وجود حالة تسجيل الدخول أولاً
            const loginStatus = localStorage.getItem(LOGIN_STATUS_KEY);
            const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
            


            
            if (loginStatus === 'true' && userData) {
                const storedUser = JSON.parse(userData);

                
                if (storedUser) {
                    _currentUser = storedUser;
                    _currentUser.isLoggedIn = true; // ضمان حالة التسجيل
                    _updateUIAfterLogin();

                    
                    // إعادة تأكيد البيانات لمنع التعارض مع السكريبتات الأخرى
                    setTimeout(() => {
                        if (localStorage.getItem(LOCAL_STORAGE_KEY) && !localStorage.getItem(LOGIN_STATUS_KEY)) {
                            localStorage.setItem(LOGIN_STATUS_KEY, 'true');
                        }
                    }, 100);
                }
            } else {

                _updateUIAfterLogout();
            }
        } catch (error) {

            // تنظيف البيانات المُفسدة من localStorage
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem(LOGIN_STATUS_KEY);
            _currentUser = null;
        }
    }
    
    /**
     * تحديث واجهة المستخدم بعد تسجيل الدخول
     */
    function _updateUIAfterLogin() {
        // إضافة كلاس المستخدم المسجل إلى body
        document.body.classList.add('user-logged-in');
        
        // إخفاء أزرار تسجيل الدخول - الاعتماد على CSS بدلاً من inline styles
        // تم نقل المنطق إلى CSS عبر كلاس user-logged-in
        
        // إضافة أيقونة الملف الشخصي
        _addProfileIcon();
        
        // إجبار إظهار الأيقونة الموبايل فقط
        const mobileProfileBtn = document.querySelector('#mobile-profile-btn');
        
        // إخفاء أيقونة الديسكتوب
        const desktopProfileBtns = document.querySelectorAll('.profile-icon-btn:not(#mobile-profile-btn)');
        desktopProfileBtns.forEach(btn => {
            if (btn) {
                btn.style.display = 'none';
                btn.style.visibility = 'hidden';
            }
        });
        
        if (mobileProfileBtn) {
            mobileProfileBtn.style.display = 'block';
            mobileProfileBtn.style.visibility = 'visible';
        }
    }
    
    /**
     * تحديث واجهة المستخدم بعد تسجيل الخروج
     */
    function _updateUIAfterLogout() {
        // إزالة كلاس تسجيل الدخول من body - الاعتماد على CSS بدلاً من inline styles
        document.body.classList.remove('user-logged-in');
        
        // إزالة الأنماط المضمنة من جميع العناصر
        const loginBtns = document.querySelectorAll('.login-btn, #login-btn, #mobile-login-btn');
        const profileBtns = document.querySelectorAll('.profile-icon-btn, #mobile-profile-btn, .profile-btn');
        
        loginBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
            }
        });
        
        profileBtns.forEach(btn => {
            if (btn) {
                btn.style.removeProperty('display');
                btn.style.removeProperty('visibility');
            }
        });
    }
    
    /**
     * إضافة أيقونة الملف الشخصي إلى شريط الأدوات
     */
    function _addProfileIcon() {
        // البحث عن أيقونة البروفايل الموبايل فقط
        const mobileProfileBtn = document.querySelector('#mobile-profile-btn');
        
        // إخفاء أيقونة البروفايل للديسكتوب
        const desktopProfileBtns = document.querySelectorAll('.profile-icon-btn:not(#mobile-profile-btn)');
        desktopProfileBtns.forEach(btn => {
            if (btn) {
                btn.style.display = 'none';
                btn.style.visibility = 'hidden';
            }
        });
        
        // إجبار إظهار أيقونة الموبايل فقط
        if (mobileProfileBtn) {
            mobileProfileBtn.style.display = 'block';
            mobileProfileBtn.style.visibility = 'visible';
            mobileProfileBtn.addEventListener('click', _showUserDashboard);
        }
        
        // إذا لم توجد أيقونة موبايل، لا تنشئ أيقونة ديسكتوب
        if (!mobileProfileBtn) {
            // لا تنشئ أيقونة جديدة للديسكتوب - الموبايل فقط
        }
    }
    
    /**
     * إنشاء أيقونة ملف شخصي جديدة (في حالة عدم وجودها في HTML)
     * ملاحظة: الآن لا تنشئ أيقونة جديدة للديسكتوب - الموبايل فقط
     */
    function _createNewProfileIcon() {
        // لا تنشئ أيقونة جديدة للديسكتوب - الموبايل فقط
        // هذه الوظيفة أصبحت غير مستخدمة لأننا نريد الموبايل فقط
    }
    
    /**
     * عرض لوحة المستخدم
     */
    function _showUserDashboard() {
        // التحقق من وجود مستخدم مسجل الدخول
        if (!_currentUser || !_currentUser.isLoggedIn) return;
        
        // إنشاء وإضافة لوحة المستخدم إلى الصفحة
        _createUserDashboardModal(_currentUser);
    }
    
    /**
     * إخفاء لوحة المستخدم
     */
    function _hideUserDashboard() {
        const dashboardModal = document.getElementById('user-dashboard-modal');
        if (dashboardModal) {
            dashboardModal.style.display = 'none';
        }
    }
    
    /**
     * إنشاء لوحة تحكم المستخدم
     * @param {object} user - بيانات المستخدم
     */
    function _createUserDashboardModal(user) {
        // إزالة أي لوحة موجودة سابقاً
        const existingDashboard = document.getElementById('user-dashboard-modal');
        if (existingDashboard) {
            existingDashboard.remove();
        }
        
        // إنشاء عنصر modal للوحة المستخدم
        const dashboardModal = document.createElement('div');
        dashboardModal.id = 'user-dashboard-modal';
        dashboardModal.className = 'modal';
        dashboardModal.style.display = 'block';
        dashboardModal.style.position = 'fixed';
        dashboardModal.style.zIndex = '1000';
        dashboardModal.style.left = '0';
        dashboardModal.style.top = '0';
        dashboardModal.style.width = '100%';
        dashboardModal.style.height = '100%';
        dashboardModal.style.backgroundColor = 'rgba(0,0,0,0.4)';
        dashboardModal.style.overflow = 'auto';
        dashboardModal.style.direction = 'rtl';
        
        // محتوى اللوحة
        const dashboardContent = document.createElement('div');
        dashboardContent.className = 'modal-content';
        dashboardContent.style.backgroundColor = '#444';
        dashboardContent.style.margin = '15% auto';
        dashboardContent.style.padding = '20px';
        dashboardContent.style.width = '90%';
        dashboardContent.style.maxWidth = '500px';
        dashboardContent.style.borderRadius = '8px';
        dashboardContent.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        dashboardContent.style.position = 'relative';
        dashboardContent.style.textAlign = 'center';
        
        // إضافة العنوان
        const title = document.createElement('h2');
        title.textContent = 'مرحبا ' + user.name;
        title.style.color = '#ced4da';
        title.style.margin = '10px 0 20px';
        title.style.fontSize = '1.5rem';
        dashboardContent.appendChild(title);
        
        // إضافة الإطار الرئيسي للأزرار
        const buttonFrame = document.createElement('div');
        buttonFrame.style.color = '#ced4da';
        buttonFrame.style.fontSize = '0.8rem';
        buttonFrame.style.margin = '10px 0';
        dashboardContent.appendChild(buttonFrame);
        
        // إنشاء حاوية للأزرار في صفين
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'grid';
        btnContainer.style.gridTemplateColumns = '1fr 1fr';
        btnContainer.style.gap = '15px';
        btnContainer.style.margin = '15px 0';
        
        // وظيفة لإنشاء زر في اللوحة
        function createDashboardButton(text, iconPath, bgColor = '#2b3a63') {
            const btn = document.createElement('button');
            btn.style.backgroundColor = bgColor;
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.borderRadius = '8px';
            btn.style.padding = '15px 20px';
            btn.style.cursor = 'pointer';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'space-between';
            btn.style.width = '100%';
            btn.style.fontSize = '1rem';
            
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            
            const icon = document.createElement('img');
            icon.src = iconPath;
            icon.alt = text;
            icon.style.width = '24px';
            icon.style.height = '24px';
            
            btn.appendChild(textSpan);
            btn.appendChild(icon);
            
            return btn;
        }
        
        // إنشاء الأزرار الأربعة الرئيسية بالترتيب المطابق للصورة
        const asanidBtn = createDashboardButton('طلب خدمة الأسانيد', '../assets/icons/document-icon.svg');
        const editProfileBtn = createDashboardButton('عدل بياناتك', '../assets/icons/edit.png');
        const customerServiceBtn = createDashboardButton('خدمة العملاء', '../assets/icons/support.png');
        const selfHelpBtn = createDashboardButton('المساعدة الذاتية', '../assets/icons/message-search2.png');
        
        // إضافة الأزرار إلى الحاوية بالترتيب المطابق للصورة
        btnContainer.appendChild(editProfileBtn);
        btnContainer.appendChild(asanidBtn);
        btnContainer.appendChild(selfHelpBtn);
        btnContainer.appendChild(customerServiceBtn);
        
        // إضافة حاوية الأزرار إلى المحتوى
        dashboardContent.appendChild(btnContainer);
        
        // إنشاء زر تسجيل الخروج
        const logoutBtn = createDashboardButton('تسجيل الخروج', '../assets/icons/exit.png', '#d9534f');
        logoutBtn.style.margin = '20px auto';
        logoutBtn.style.width = '70%';
        
        // إضافة حدث لزر تسجيل الخروج
        logoutBtn.addEventListener('click', function() {
            logout();
            dashboardModal.style.display = 'none';
        });
        
        dashboardContent.appendChild(logoutBtn);
        
        // إضافة زر إغلاق
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'close-modal';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.left = '10px';
        closeBtn.style.color = '#aaa';
        closeBtn.style.fontSize = '28px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', function() {
            dashboardModal.style.display = 'none';
        });
        
        dashboardContent.appendChild(closeBtn);
        
        // إضافة حدث النقر خارج اللوحة لإغلاقها
        dashboardModal.addEventListener('click', function(event) {
            if (event.target === dashboardModal) {
                dashboardModal.style.display = 'none';
            }
        });
        
        // إضافة الأحداث للأزرار
        asanidBtn.addEventListener('click', function() {
            _showAsanidServiceForm();
        });
        
        editProfileBtn.addEventListener('click', function() {
            _navigateToProfileEditPage();
        });
        
        selfHelpBtn.addEventListener('click', function() {
            _navigateToSelfHelpPage();
        });
        
        customerServiceBtn.addEventListener('click', function() {
            _navigateToCustomerServicePage();
        });
        
        // إضافة محتوى اللوحة إلى modal
        dashboardModal.appendChild(dashboardContent);
        
        // إضافة اللوحة إلى الصفحة
        document.body.appendChild(dashboardModal);
    }
    
    /**
     * عرض نموذج طلب خدمة الأسانيد
     */
    function _showAsanidServiceForm() {
        // إزالة أي نموذج سابق
        const existingForm = document.getElementById('asanid-form-modal');
        if (existingForm) {
            existingForm.remove();
        }
        
        // إنشاء عنصر النموذج
        const formModal = document.createElement('div');
        formModal.id = 'asanid-form-modal';
        formModal.className = 'asanid-form-modal';
        formModal.style.display = 'block';
        
        // محتوى النموذج
        const formContent = document.createElement('div');
        formContent.className = 'asanid-form-content';
        
        // عنوان النموذج
        const formTitle = document.createElement('h2');
        formTitle.className = 'asanid-form-title';
        formTitle.textContent = 'تعديل الاشتراك في الخدمات';
        formContent.appendChild(formTitle);
        
        // صف الاشتراك في
        const serviceRow = document.createElement('div');
        serviceRow.className = 'asanid-form-row';
        
        const serviceLabel = document.createElement('div');
        serviceLabel.className = 'asanid-form-label';
        serviceLabel.textContent = 'الاشتراك في';
        
        const serviceSelect = document.createElement('div');
        serviceSelect.className = 'asanid-form-select';
        
        const serviceSelectElement = document.createElement('select');
        
        // قائمة خيارات الخدمات
        const serviceOptions = [
            { text: 'خدمة الأسانيد القانونية', selected: true },
            { text: 'باقة الأحكام القضائية', selected: false },
            { text: 'خدمة البحث القانوني المتقدم', selected: false },
            { text: 'منصة المراجع القانونية', selected: false },
            { text: 'الحزمة الذهبية الشاملة', selected: false }
        ];
        
        // إضافة جميع الخيارات إلى القائمة المنسدلة
        serviceOptions.forEach(function(option) {
            const optionElement = document.createElement('option');
            optionElement.textContent = option.text;
            optionElement.selected = option.selected;
            serviceSelectElement.appendChild(optionElement);
        });
        
        const dropdownArrow1 = document.createElement('span');
        dropdownArrow1.className = 'dropdown-arrow';
        dropdownArrow1.innerHTML = '&#9662;';
        
        serviceSelect.appendChild(serviceSelectElement);
        serviceSelect.appendChild(dropdownArrow1);
        
        serviceRow.appendChild(serviceLabel);
        serviceRow.appendChild(serviceSelect);
        
        formContent.appendChild(serviceRow);
        
        // صف مدة الاشتراك
        const durationRow = document.createElement('div');
        durationRow.className = 'asanid-form-row';
        
        const durationLabel = document.createElement('div');
        durationLabel.className = 'asanid-form-label';
        durationLabel.textContent = 'مدة الاشتراك';
        
        const durationSelect = document.createElement('div');
        durationSelect.className = 'asanid-form-select';
        
        const durationSelectElement = document.createElement('select');
        
        // قائمة خيارات المدة
        const durationOptions = [
            { text: 'شهر', selected: false },
            { text: 'ثلاثة أشهر', selected: false },
            { text: 'ستة أشهر', selected: false },
            { text: 'سنة', selected: true },
            { text: 'سنتين', selected: false },
            { text: 'ثلاث سنوات', selected: false }
        ];
        
        // إضافة جميع خيارات المدة إلى القائمة المنسدلة
        durationOptions.forEach(function(option) {
            const optionElement = document.createElement('option');
            optionElement.textContent = option.text;
            optionElement.selected = option.selected;
            durationSelectElement.appendChild(optionElement);
        });
        
        const dropdownArrow2 = document.createElement('span');
        dropdownArrow2.className = 'dropdown-arrow';
        dropdownArrow2.innerHTML = '&#9662;';
        
        durationSelect.appendChild(durationSelectElement);
        durationSelect.appendChild(dropdownArrow2);
        
        durationRow.appendChild(durationLabel);
        durationRow.appendChild(durationSelect);
        
        formContent.appendChild(durationRow);
        
        // زر الإرسال
        const submitButton = document.createElement('button');
        submitButton.className = 'asanid-form-submit';
        submitButton.textContent = 'ارسال';
        submitButton.style.marginTop = '25px';
        formContent.appendChild(submitButton);
        
        // زر الإغلاق
        const closeBtn = document.createElement('span');
        closeBtn.className = 'asanid-form-close';
        closeBtn.innerHTML = '&times;';
        formContent.appendChild(closeBtn);
        
        // إضافة المحتوى إلى النموذج
        formModal.appendChild(formContent);
        
        // إضافة النموذج إلى الصفحة
        document.body.appendChild(formModal);
        
        // إضافة الأحداث
        closeBtn.addEventListener('click', function() {
            formModal.style.display = 'none';
        });
        
        submitButton.addEventListener('click', function() {
            // إغلاق نموذج طلب خدمة الأسانيد
            formModal.style.display = 'none';
            
            // عرض نافذة طلب الاشتراك المنبثقة
            // التحقق من أننا في صفحة خدمة الأسانيد أو عرض نافذة الاشتراك من هذه الصفحة
            const subscribeModal = document.getElementById('subscribe-modal');
            
            if (subscribeModal) {
                // إذا كنا في صفحة خدمة الأسانيد
                subscribeModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                // إذا كنا في صفحة أخرى، نطلب من المستخدم الذهاب إلى صفحة خدمة الأسانيد
                if (confirm('سيتم توجيهك إلى صفحة طلب خدمة الأسانيد لإكمال طلبك. هل ترغب في المتابعة؟')) {
                    window.location.href = '../pages/asanid-service.html';
                }
            }
        });
        
        formModal.addEventListener('click', function(event) {
            if (event.target === formModal) {
                formModal.style.display = 'none';
            }
        });
        
        // إضافة عنصر النافذة المنبثقة للصفحة إذا لم تكن موجودة لإمكانية عرضها إن لم نكن في صفحة خدمة الأسانيد
        if (!document.getElementById('subscribe-modal') && window.location.pathname.indexOf('asanid-service.html') === -1) {
            _createSubscribeModal();
        }
        
        // التأكد من إضافة أنماط CSS للنموذج
        _loadAsanidFormStyles();
    }
    
    /**
     * تحميل أنماط CSS لنموذج الأسانيد
     */
    function _loadAsanidFormStyles() {
        // التحقق مما إذا كانت الأنماط محملة بالفعل
        const existingStyle = document.getElementById('asanid-form-styles');
        if (existingStyle) return;
        
        // إضافة ملف CSS الخارجي
        const styleLink = document.createElement('link');
        styleLink.id = 'asanid-form-styles';
        styleLink.rel = 'stylesheet';
        styleLink.href = '../styles/asanid-form.css';
        document.head.appendChild(styleLink);
    }
    
    /**
     * إنشاء نافذة طلب الاشتراك المنبثقة
     */
    function _createSubscribeModal() {
        // التحقق من وجود النافذة بالفعل
        if (document.getElementById('subscribe-modal')) return;

        // إنشاء النافذة المنبثقة
        const subscribeModal = document.createElement('div');
        subscribeModal.className = 'subscribe-modal';
        subscribeModal.id = 'subscribe-modal';
        
        // إنشاء محتوى النافذة
        const modalContent = document.createElement('div');
        modalContent.className = 'subscribe-modal-content';
        
        // رأس النافذة مع زر الإغلاق
        const modalHeader = document.createElement('div');
        modalHeader.className = 'subscribe-modal-header';
        
        const closeButton = document.createElement('span');
        closeButton.className = 'close-subscribe-modal';
        closeButton.innerHTML = '&times;';
        modalHeader.appendChild(closeButton);
        
        // جسم النافذة
        const modalBody = document.createElement('div');
        modalBody.className = 'subscribe-modal-body';
        
        // العنوان
        const title = document.createElement('h2');
        title.className = 'subscribe-title';
        title.textContent = 'طلب الاشتراك';
        modalBody.appendChild(title);
        
        // نموذج الاشتراك
        const form = document.createElement('form');
        form.className = 'subscribe-form';
        
        // حقول النموذج
        const formFields = [
            { placeholder: 'الاسم بالكامل / اسم الجهة', type: 'text' },
            { placeholder: 'البريد الالكتروني', type: 'email' },
            { placeholder: 'اسم المستخدم', type: 'text' },
            { placeholder: 'كلمة السر', type: 'password' },
            { placeholder: 'رقم الجوال', type: 'tel' }
        ];
        
        formFields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const input = document.createElement('input');
            input.type = field.type;
            input.placeholder = field.placeholder;
            input.className = 'subscribe-input';
            
            formGroup.appendChild(input);
            form.appendChild(formGroup);
        });
        
        // زر إرسال النموذج
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'subscribe-submit-btn';
        submitButton.textContent = 'إرسال';
        
        form.appendChild(submitButton);
        modalBody.appendChild(form);
        
        // تجميع النافذة
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        subscribeModal.appendChild(modalContent);
        
        // إضافة النافذة إلى الصفحة
        document.body.appendChild(subscribeModal);
        
        // إضافة الأحداث
        closeButton.addEventListener('click', function() {
            subscribeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('تم إرسال طلب الاشتراك بنجاح!');
            subscribeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        subscribeModal.addEventListener('click', function(e) {
            if (e.target === subscribeModal) {
                subscribeModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // إضافة أنماط CSS لنافذة طلب الاشتراك
        _loadSubscribeModalStyles();
    }
    
    /**
     * تحميل الأنماط المطلوبة لنافذة طلب الاشتراك
     */
    function _loadSubscribeModalStyles() {
        // التحقق من وجود الأنماط بالفعل
        const existingStyle = document.getElementById('subscribe-modal-styles');
        if (existingStyle) return;
        
        // إضافة الأنماط مباشرة بدلاً من إضافة ملف خارجي
        const styleElement = document.createElement('style');
        styleElement.id = 'subscribe-modal-styles';
        styleElement.textContent = `
            .subscribe-modal {
                display: none;
                position: fixed;
                z-index: 1200;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                overflow: auto;
                direction: rtl;
            }
            
            .subscribe-modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 30px;
                width: 90%;
                max-width: 500px;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            
            .subscribe-modal-header {
                text-align: left;
            }
            
            .close-subscribe-modal {
                color: #888;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .subscribe-title {
                color: #00a59a;
                text-align: center;
                font-size: 1.7rem;
                margin-bottom: 30px;
                font-weight: bold;
            }
            
            .subscribe-form .form-group {
                margin-bottom: 15px;
            }
            
            .subscribe-input {
                width: 100%;
                padding: 12px 15px;
                border-radius: 10px;
                border: 1px solid #ccc;
                font-size: 1rem;
                direction: rtl;
            }
            
            .subscribe-submit-btn {
                background-color: #00a59a;
                color: white;
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 10px;
                font-size: 1.2rem;
                cursor: pointer;
                margin-top: 20px;
                transition: background-color 0.3s;
            }
            
            .subscribe-submit-btn:hover {
                background-color: #008e85;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * الانتقال إلى صفحة خدمة العملاء
     */
    function _navigateToCustomerServicePage() {
        // قم بالتوجيه إلى صفحة خدمة العملاء عندما تكون جاهزة
        alert('صفحة خدمة العملاء');
    }
    
    /**
     * عرض نافذة تعديل بيانات المستخدم
     */
    function _navigateToProfileEditPage() {
        _showProfileEditModal();
    }
    
    /**
     * إنشاء وعرض نافذة تعديل بيانات المستخدم
     */
    function _showProfileEditModal() {
        // التحقق من وجود النافذة بالفعل
        let profileEditModal = document.getElementById('profile-edit-modal');
        
        // إذا كانت النافذة موجودة بالفعل، نقوم بإظهارها فقط
        if (profileEditModal) {
            profileEditModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            return;
        }
        
        // إنشاء النافذة المنبثقة
        profileEditModal = document.createElement('div');
        profileEditModal.className = 'profile-edit-modal';
        profileEditModal.id = 'profile-edit-modal';
        
        // إنشاء محتوى النافذة
        const modalContent = document.createElement('div');
        modalContent.className = 'profile-edit-content';
        
        // زر الإغلاق
        const closeButton = document.createElement('span');
        closeButton.className = 'profile-edit-close';
        closeButton.innerHTML = '&times;';
        modalContent.appendChild(closeButton);
        
        // العنوان
        const title = document.createElement('h2');
        title.className = 'profile-edit-title';
        title.textContent = 'تعديل بيانات مستخدم';
        modalContent.appendChild(title);
        
        // إنشاء النموذج
        const form = document.createElement('form');
        form.className = 'profile-edit-form';
        
        // قسم البيانات الأساسية
        const basicSection = _createFormSection(form, '');
        
        // نوع المستخدم (قائمة منسدلة)
        const userTypeGroup = document.createElement('div');
        userTypeGroup.className = 'form-group';
        
        const userTypeSelect = document.createElement('select');
        userTypeSelect.className = 'profile-edit-select';
        
        const userTypeOptions = [
            { value: '', label: 'نوع المستخدم' },
            { value: 'individual', label: 'فرد' },
            { value: 'company', label: 'شركة' },
            { value: 'government', label: 'جهة حكومية' },
        ];
        
        userTypeOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            userTypeSelect.appendChild(optionElement);
        });
        
        userTypeGroup.appendChild(userTypeSelect);
        basicSection.appendChild(userTypeGroup);
        
        // البريد الإلكتروني
        const emailGroup = document.createElement('div');
        emailGroup.className = 'form-group';
        
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.className = 'profile-edit-input';
        emailInput.placeholder = 'البريد الإلكتروني';
        
        emailGroup.appendChild(emailInput);
        basicSection.appendChild(emailGroup);
        
        // قسم التفاصيل الأخرى
        const detailsSection = _createFormSection(form, 'تفاصيل اخري');
        
        // المدينة (قائمة منسدلة)
        const cityGroup = document.createElement('div');
        cityGroup.className = 'form-group';
        
        const citySelect = document.createElement('select');
        citySelect.className = 'profile-edit-select';
        
        const cityOptions = [
            { value: '', label: 'المدينة' },
            { value: 'riyadh', label: 'الرياض' },
            { value: 'jeddah', label: 'جدة' },
            { value: 'dammam', label: 'الدمام' },
            { value: 'mecca', label: 'مكة المكرمة' },
        ];
        
        cityOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            citySelect.appendChild(optionElement);
        });
        
        cityGroup.appendChild(citySelect);
        detailsSection.appendChild(cityGroup);
        
        // العنوان التفصيلي
        const addressGroup = document.createElement('div');
        addressGroup.className = 'form-group';
        
        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.className = 'profile-edit-input';
        addressInput.placeholder = 'العنوان التفصيلي';
        
        addressGroup.appendChild(addressInput);
        detailsSection.appendChild(addressGroup);
        
        // رقم الهاتف
        const phoneGroup = document.createElement('div');
        phoneGroup.className = 'form-group';
        
        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.className = 'profile-edit-input';
        phoneInput.placeholder = 'رقم الهاتف';
        
        phoneGroup.appendChild(phoneInput);
        detailsSection.appendChild(phoneGroup);
        
        // الجوال (مع رمز الدولة)
        const mobileGroup = document.createElement('div');
        mobileGroup.className = 'form-group';
        
        const phoneRow = document.createElement('div');
        phoneRow.className = 'phone-row';
        
        const countryCode = document.createElement('div');
        countryCode.className = 'country-code';
        
        const flagImg = document.createElement('img');
        flagImg.src = '../assets/icons/saudi-flag.png'; // يجب التأكد من وجود هذه الصورة
        flagImg.alt = 'Saudi Arabia';
        
        const codeText = document.createElement('span');
        codeText.textContent = '+20';
        
        countryCode.appendChild(flagImg);
        countryCode.appendChild(codeText);
        
        const mobileInput = document.createElement('input');
        mobileInput.type = 'tel';
        mobileInput.className = 'profile-edit-input phone-input';
        mobileInput.placeholder = 'الجوال';
        
        phoneRow.appendChild(countryCode);
        phoneRow.appendChild(mobileInput);
        
        mobileGroup.appendChild(phoneRow);
        detailsSection.appendChild(mobileGroup);
        
        // الفاكس
        const faxGroup = document.createElement('div');
        faxGroup.className = 'form-group';
        
        const faxInput = document.createElement('input');
        faxInput.type = 'text';
        faxInput.className = 'profile-edit-input';
        faxInput.placeholder = 'الفاكس';
        
        faxGroup.appendChild(faxInput);
        detailsSection.appendChild(faxGroup);
        
        // صندوق البريد
        const poBoxGroup = document.createElement('div');
        poBoxGroup.className = 'form-group';
        
        const poBoxInput = document.createElement('input');
        poBoxInput.type = 'text';
        poBoxInput.className = 'profile-edit-input';
        poBoxInput.placeholder = 'صندوق البريد';
        
        poBoxGroup.appendChild(poBoxInput);
        detailsSection.appendChild(poBoxGroup);
        
        // الرمز البريدي
        const zipCodeGroup = document.createElement('div');
        zipCodeGroup.className = 'form-group';
        
        const zipCodeInput = document.createElement('input');
        zipCodeInput.type = 'text';
        zipCodeInput.className = 'profile-edit-input';
        zipCodeInput.placeholder = 'الرمز البريدي';
        
        zipCodeGroup.appendChild(zipCodeInput);
        detailsSection.appendChild(zipCodeGroup);
        
        // ملاحظة الاشتراك
        const subscriptionNote = document.createElement('div');
        subscriptionNote.className = 'subscription-note';
        subscriptionNote.textContent = 'احتفظ بالاشتراك ساريا';
        form.appendChild(subscriptionNote);
        
        // تاريخ انتهاء الاشتراك
        const subscriptionExpiry = document.createElement('div');
        subscriptionExpiry.className = 'subscription-expiry';
        subscriptionExpiry.textContent = 'تنتهي صلاحية اشتراككم بتاريخ 31/12/2025';
        form.appendChild(subscriptionExpiry);
        
        // أزرار النموذج
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'profile-edit-buttons';
        
        
        const updateButton = document.createElement('button');
        updateButton.className = 'profile-update-btn';
        updateButton.textContent = 'تعديل بياناتي';
        updateButton.type = 'button';
        
        const passwordButton = document.createElement('button');
        passwordButton.className = 'profile-password-btn';
        passwordButton.textContent = 'تعديل كلمة المرور';
        passwordButton.type = 'button';
        
        buttonsContainer.appendChild(passwordButton);
        buttonsContainer.appendChild(updateButton);
        form.appendChild(buttonsContainer);
        
        // إضافة النموذج إلى المحتوى
        modalContent.appendChild(form);
        
        // إضافة المحتوى إلى النافذة
        profileEditModal.appendChild(modalContent);
        document.body.appendChild(profileEditModal);
        
        // إظهار النافذة
        profileEditModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // إضافة الأحداث
        closeButton.addEventListener('click', function() {
            profileEditModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        profileEditModal.addEventListener('click', function(e) {
            if (e.target === profileEditModal) {
                profileEditModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        updateButton.addEventListener('click', function() {
            alert('تم تحديث بياناتك بنجاح');
            profileEditModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        passwordButton.addEventListener('click', function() {
            _showPasswordChangeModal();
        });
        
        // تحميل أنماط CSS للنافذة
        _loadProfileEditStyles();
    }
    
    /**
     * إنشاء قسم في نموذج تعديل البيانات
     */
    function _createFormSection(form, title) {
        const section = document.createElement('div');
        section.className = 'profile-edit-section';
        
        if (title) {
            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'profile-edit-section-title';
            sectionTitle.textContent = title;
            section.appendChild(sectionTitle);
        }
        
        form.appendChild(section);
        return section;
    }
    
    /**
     * تحميل أنماط CSS لنموذج تعديل البيانات
     */
    function _loadProfileEditStyles() {
        // التحقق مما إذا كانت الأنماط محملة بالفعل
        const existingStyle = document.getElementById('profile-edit-styles');
        if (existingStyle) return;
        
        // إضافة ملف CSS الخارجي
        const styleLink = document.createElement('link');
        styleLink.id = 'profile-edit-styles';
        styleLink.rel = 'stylesheet';
        styleLink.href = '../styles/profile-edit.css';
        document.head.appendChild(styleLink);
    }
    
    /**
     * عرض نافذة تغيير كلمة المرور
     */
    function _showPasswordChangeModal() {
        // التحقق من وجود النافذة بالفعل
        let passwordChangeModal = document.getElementById('password-change-modal');
        
        // إذا كانت النافذة موجودة بالفعل، نقوم بإظهارها فقط
        if (passwordChangeModal) {
            passwordChangeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            return;
        }
        
        // إنشاء النافذة المنبثقة
        passwordChangeModal = document.createElement('div');
        passwordChangeModal.className = 'password-change-modal';
        passwordChangeModal.id = 'password-change-modal';
        
        // إنشاء محتوى النافذة
        const modalContent = document.createElement('div');
        modalContent.className = 'password-change-content';
        
        // زر الإغلاق
        const closeButton = document.createElement('span');
        closeButton.className = 'password-change-close';
        closeButton.innerHTML = '&times;';
        modalContent.appendChild(closeButton);
        
        // العنوان
        const title = document.createElement('h2');
        title.className = 'password-change-title';
        title.textContent = 'تعديل كلمة المرور';
        modalContent.appendChild(title);
        
        // إنشاء النموذج
        const form = document.createElement('form');
        form.className = 'password-change-form';
        
        // كلمة المرور الحالية
        const currentPasswordGroup = document.createElement('div');
        currentPasswordGroup.className = 'form-group';
        
        const currentPasswordInput = document.createElement('input');
        currentPasswordInput.type = 'password';
        currentPasswordInput.className = 'password-change-input';
        currentPasswordInput.placeholder = 'كلمة المرور الحالية';
        
        currentPasswordGroup.appendChild(currentPasswordInput);
        form.appendChild(currentPasswordGroup);
        
        // كلمة المرور الجديدة
        const newPasswordGroup = document.createElement('div');
        newPasswordGroup.className = 'form-group';
        
        const newPasswordInput = document.createElement('input');
        newPasswordInput.type = 'password';
        newPasswordInput.className = 'password-change-input';
        newPasswordInput.placeholder = 'كلمة المرور الجديدة';
        
        newPasswordGroup.appendChild(newPasswordInput);
        form.appendChild(newPasswordGroup);
        
        // تأكيد كلمة المرور الجديدة
        const confirmPasswordGroup = document.createElement('div');
        confirmPasswordGroup.className = 'form-group';
        
        const confirmPasswordInput = document.createElement('input');
        confirmPasswordInput.type = 'password';
        confirmPasswordInput.className = 'password-change-input';
        confirmPasswordInput.placeholder = 'تأكيد كلمة المرور الجديدة';
        
        confirmPasswordGroup.appendChild(confirmPasswordInput);
        form.appendChild(confirmPasswordGroup);
        
        // زر الإرسال
        const submitButton = document.createElement('button');
        submitButton.type = 'button'; // لتجنب الإرسال التلقائي للنموذج
        submitButton.className = 'password-change-btn';
        submitButton.textContent = 'أرسل';
        form.appendChild(submitButton);
        
        // إضافة النموذج إلى المحتوى
        modalContent.appendChild(form);
        
        // إضافة المحتوى إلى النافذة
        passwordChangeModal.appendChild(modalContent);
        document.body.appendChild(passwordChangeModal);
        
        // إظهار النافذة
        passwordChangeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // إضافة الأحداث
        closeButton.addEventListener('click', function() {
            passwordChangeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        passwordChangeModal.addEventListener('click', function(e) {
            if (e.target === passwordChangeModal) {
                passwordChangeModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        submitButton.addEventListener('click', function() {
            // التحقق من أن كلمة المرور الجديدة تتطابق مع التأكيد
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                alert('كلمة المرور الجديدة وتأكيدها غير متطابقين');
                return;
            }
            
            // التحقق من أن جميع الحقول مملوءة
            if (!currentPasswordInput.value || !newPasswordInput.value || !confirmPasswordInput.value) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            // هنا يمكن إضافة منطق للتحقق من كلمة المرور الحالية وتغييرها
            // للتبسيط، نعرض رسالة نجاح
            alert('تم تغيير كلمة المرور بنجاح');
            passwordChangeModal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // تحميل أنماط CSS للنافذة
        _loadPasswordChangeStyles();
    }
    
    /**
     * تحميل أنماط CSS لنافذة تغيير كلمة المرور
     */
    function _loadPasswordChangeStyles() {
        // التحقق مما إذا كانت الأنماط محملة بالفعل
        const existingStyle = document.getElementById('password-change-styles');
        if (existingStyle) return;
        
        // إضافة ملف CSS الخارجي
        const styleLink = document.createElement('link');
        styleLink.id = 'password-change-styles';
        styleLink.rel = 'stylesheet';
        styleLink.href = '../styles/password-change.css';
        document.head.appendChild(styleLink);
    }
    
    /**
     * الحصول على بيانات المستخدم الحالي
     * @return {object|null} بيانات المستخدم أو null إذا لم يكن هناك مستخدم مسجل الدخول
     */
    function getCurrentUser() {
        return _currentUser;
    }
    
    /**
     * التحقق مما إذا كان المستخدم مسجل الدخول أم لا
     * @return {boolean} حالة تسجيل الدخول
     */
    function isLoggedIn() {
        return _currentUser !== null && _currentUser.isLoggedIn === true;
    }
    
    // كشف الوظائف العامة فقط للاستخدام الخارجي
    return {
        init: init,
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        isLoggedIn: isLoggedIn
    };
})();

/**
 * فحص ما إذا كان الملف موجوداً
 * @param {string} url - مسار الملف
 * @return {boolean} - إذا كان الملف موجوداً
 */
function fileExists(url) {
    try {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status !== 404;
    } catch (e) {
        return false;
    }
}

// تهيئة نظام المصادقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {

    AuthSystem.init();
    
    // إتاحة وظيفة تسجيل الخروج عالمياً للاختبار (سيتم إزالتها في الإنتاج)
    window.logoutDemo = AuthSystem.logout;
    
    // للتأكد من أن النظام يعمل، نعرض حالة localStorage

});

// تشغيل فوري عند تحميل السكربت
setTimeout(function() {


    
    // التحقق فوراً من حالة تسجيل الدخول
    if (typeof AuthSystem !== 'undefined') {
        AuthSystem.init();
    }
}, 100);
