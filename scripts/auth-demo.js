/**
 * ملف تجريبي لوظائف تسجيل الدخول - لأغراض العرض التوضيحي فقط
 */

// تهيئة نظام تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    
    // بيانات المستخدمين للتجربة
    var testUsers = [
        { username: 'test', password: '123456', name: 'مستخدم تجريبي' },
        { username: 'admin', password: 'admin123', name: 'مشرف النظام' },
        { username: 'lawyer', password: 'lawyer123', name: 'المحامي عبدالله' },
        { username: 'manal', password: 'manal123', name: 'Manal Mohamed taha' }
    ];
    
    // تحديد العناصر في صفحة HTML
    var loginModal = document.getElementById('login-modal');
    var loginBtn = document.querySelector('.login-btn');
    var closeModal = document.querySelector('.close-modal');
    var usernameInput = document.querySelector('.credentials-login-section input[type="text"]');
    var passwordInput = document.querySelector('.credentials-login-section input[type="password"]');
    var loginSubmitBtn = document.querySelector('.login-submit-btn');
    var phoneInput = document.querySelector('.phone-field input');
    var sendCodeBtn = document.querySelector('.send-code-btn');
    var errorMsg = document.querySelector('.error-msg');
    var mainIconsGroup = document.querySelector('.main-icons-group');
    
    // وظيفة لإضافة أيقونة الملف الشخصي
    function addProfileIcon() {
        // التحقق من وجود عنصر mainIconsGroup
        if (!mainIconsGroup) {

            return;
        }
        
        // إزالة أي أيقونة ملف شخصي موجودة مسبقاً
        var existingProfileBtn = document.querySelector('.profile-icon-btn');
        if (existingProfileBtn) {
            existingProfileBtn.remove();
        }
        
        // إنشاء زر الملف الشخصي
        var profileButton = document.createElement('button');
        profileButton.className = 'icon-btn profile-icon-btn';
        profileButton.title = 'الملف الشخصي';
        
        // إنشاء أيقونة الملف الشخصي
        var profileIcon = document.createElement('img');
        profileIcon.src = '../assets/icons/profile-circle.png';
        profileIcon.alt = 'الملف الشخصي';
        
        // إضافة الأيقونة للزر
        profileButton.appendChild(profileIcon);
        
        // إضافة الزر كأول عنصر في مجموعة الأيقونات
        mainIconsGroup.insertBefore(profileButton, mainIconsGroup.firstChild);
        
        // إضافة حدث النقر على الزر
        profileButton.addEventListener('click', function() {
            showUserDashboard();
        });
    }
    
    // وظيفة تسجيل الدخول
    function login(username, password) {
        // البحث عن المستخدم في قائمة المستخدمين
        var user = null;
        for (var i = 0; i < testUsers.length; i++) {
            if (testUsers[i].username === username && testUsers[i].password === password) {
                user = testUsers[i];
                break;
            }
        }
        
        if (user) {
            // تسجيل الدخول ناجح
            
            // إخفاء زر تسجيل الدخول
            if (loginBtn) {
                loginBtn.style.display = 'none';
            }
            
            // إضافة أيقونة الملف الشخصي
            addProfileIcon();
            
            // إغلاق نافذة تسجيل الدخول
            if (loginModal) {
                loginModal.style.display = 'none';
            }
            
            // حفظ بيانات المستخدم في التخزين المحلي
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                name: user.name,
                isLoggedIn: true
            }));
            
            // إظهار رسالة ترحيب
            alert('مرحبًا ' + user.name + '! تم تسجيل الدخول بنجاح');
            
            return true;
        } else {
            // فشل تسجيل الدخول
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            return false;
        }
    }
    
    // تحقق من وجود زر تسجيل الدخول قبل إضافة الحدث
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
        });
    }
    
    // تحقق من وجود زر الإغلاق قبل إضافة الحدث
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(event) {
        if (loginModal && event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // تحقق من وجود زر الدخول قبل إضافة الحدث
    if (loginSubmitBtn && usernameInput && passwordInput) {
        loginSubmitBtn.addEventListener('click', function() {
            var username = usernameInput.value.trim();
            var password = passwordInput.value;
            
            if (!username || !password) {
                alert('الرجاء إدخال اسم المستخدم وكلمة المرور');
                return;
            }
            
            login(username, password);
        });
    }
    
    // تحقق من وجود زر إرسال الرمز قبل إضافة الحدث
    if (sendCodeBtn && phoneInput && errorMsg) {
        sendCodeBtn.addEventListener('click', function() {
            var phone = phoneInput.value.trim();
            
            if (!phone) {
                errorMsg.style.display = 'block';
                return;
            }
            
            errorMsg.style.display = 'none';
            alert('تم إرسال رمز التحقق إلى الرقم: ' + phone);
            
            // محاكاة تسجيل الدخول بعد التحقق من رقم الهاتف
            setTimeout(function() {
                // تسجيل الدخول كمستخدم تجريبي بعد 2 ثانية
                login('test', '123456');
            }, 2000);
        });
    }
    
    // فحص إذا كان المستخدم مسجل الدخول بالفعل
    function checkLoggedInUser() {
        try {
            var userData = localStorage.getItem('currentUser');
            if (!userData) return;
            
            var currentUser = JSON.parse(userData);
            
            if (currentUser && currentUser.isLoggedIn) {
                // إخفاء زر تسجيل الدخول
                if (loginBtn) {
                    loginBtn.style.display = 'none';
                }
                
                // إضافة أيقونة الملف الشخصي
                addProfileIcon();
                
            }
        } catch (error) {

        }
    }
    
    // وظيفة لتسجيل الخروج
    function logout() {
        // حذف بيانات المستخدم من التخزين المحلي
        localStorage.removeItem('currentUser');
        
        // إظهار زر تسجيل الدخول
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
        
        // إزالة أيقونة الملف الشخصي
        var profileButton = document.querySelector('.profile-icon-btn');
        if (profileButton) {
            profileButton.remove();
        }
        
        alert('تم تسجيل الخروج بنجاح');
    }
    
    // إضافة وظيفة تسجيل الخروج للمتصفح للاختبار
    window.logoutDemo = logout;
    
    // إضافة وظيفة لعرض لوحة المستخدم
    function showUserDashboard() {
        // الحصول على بيانات المستخدم الحالي
        var userData = localStorage.getItem('currentUser');
        if (!userData) return;
        
        var currentUser = JSON.parse(userData);
        if (!currentUser || !currentUser.isLoggedIn) return;
        
        // إنشاء وإضافة الـmodal للوحة المستخدم إلى الصفحة
        createUserDashboardModal(currentUser);
    }
    
    // وظيفة لإنشاء modal لوحة المستخدم
    function createUserDashboardModal(user) {
        // إزالة أي لوحة موجودة سابقاً
        var existingDashboard = document.getElementById('user-dashboard-modal');
        if (existingDashboard) {
            existingDashboard.remove();
        }
        
        // إنشاء عنصر modal للوحة المستخدم
        var dashboardModal = document.createElement('div');
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
        var dashboardContent = document.createElement('div');
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
        var title = document.createElement('h2');
        title.textContent = 'مرحبا ' + user.name;
        title.style.color = '#ced4da';
        title.style.margin = '10px 0 20px';
        title.style.fontSize = '1.5rem';
        dashboardContent.appendChild(title);
        
        // إضافة الإطار الرئيسي للأزرار
        var buttonFrame = document.createElement('div');
        buttonFrame.style.color = '#ced4da';
        buttonFrame.style.fontSize = '0.8rem';
        buttonFrame.style.margin = '10px 0';
        buttonFrame.textContent = 'Frame 2362';
        dashboardContent.appendChild(buttonFrame);
        
        // إنشاء حاوية للأزرار في صفين
        var btnContainer = document.createElement('div');
        btnContainer.style.display = 'grid';
        btnContainer.style.gridTemplateColumns = '1fr 1fr';
        btnContainer.style.gap = '15px';
        btnContainer.style.margin = '15px 0';
        
        // وظيفة لإنشاء زر في اللوحة
        function createDashboardButton(text, iconPath, bgColor = '#2b3a63') {
            var btn = document.createElement('button');
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
            
            var textSpan = document.createElement('span');
            textSpan.textContent = text;
            
            var icon = document.createElement('img');
            icon.src = iconPath;
            icon.alt = text;
            icon.style.width = '24px';
            icon.style.height = '24px';
            
            btn.appendChild(textSpan);
            btn.appendChild(icon);
            
            return btn;
        }
        
        // إنشاء الأزرار الأربعة الرئيسية
        var asanidBtn = createDashboardButton('طلب خدمة الأسانيد', '../assets/icons/document.png');
        var editProfileBtn = createDashboardButton('عدل بياناتك', '../assets/icons/edit.png');
        var selfHelpBtn = createDashboardButton('المساعدة الذاتية', '../assets/icons/chat-help.png');
        var customerServiceBtn = createDashboardButton('خدمة العملاء', '../assets/icons/customer-service.png');
        
        // إضافة الأزرار إلى الحاوية
        btnContainer.appendChild(asanidBtn);
        btnContainer.appendChild(editProfileBtn);
        btnContainer.appendChild(selfHelpBtn);
        btnContainer.appendChild(customerServiceBtn);
        
        // إضافة حاوية الأزرار إلى المحتوى
        dashboardContent.appendChild(btnContainer);
        
        // إنشاء زر تسجيل الخروج
        var logoutBtn = createDashboardButton('تسجيل الخروج', '../assets/icons/logout.png', '#d9534f');
        logoutBtn.style.margin = '20px auto';
        logoutBtn.style.width = '70%';
        
        // إضافة حدث لزر تسجيل الخروج
        logoutBtn.addEventListener('click', function() {
            logout();
            dashboardModal.style.display = 'none';
        });
        
        dashboardContent.appendChild(logoutBtn);
        
        // إضافة زر إغلاق (اختياري)
        var closeBtn = document.createElement('span');
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
        
        // إضافة حدث للأزرار (يمكن تعديلها حسب الحاجة)
        asanidBtn.addEventListener('click', function() {
            window.location.href = '../pages/asanid-service.html';
        });
        
        editProfileBtn.addEventListener('click', function() {
            alert('صفحة تعديل البيانات الشخصية');
        });
        
        selfHelpBtn.addEventListener('click', function() {
            alert('صفحة المساعدة الذاتية');
        });
        
        customerServiceBtn.addEventListener('click', function() {
            alert('صفحة خدمة العملاء');
        });
        
        // إضافة محتوى اللوحة إلى modal
        dashboardModal.appendChild(dashboardContent);
        
        // إضافة اللوحة إلى الصفحة
        document.body.appendChild(dashboardModal);
    }
    
    // فحص حالة تسجيل الدخول عند تحميل الصفحة
    checkLoggedInUser();
});
