/* سكريبت جافاسكريبت لتحسين تجربة المستخدم في نموذج الاشتراك */

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود النموذج قبل إضافة المستمعين
    const subscriptionForm = document.getElementById('subscription-form');
    
    if (subscriptionForm) {
        // ضبط سلوك النموذج عند الإرسال
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });
        
        // إضافة تأثيرات للحقول عند التركيز عليها
        const formInputs = subscriptionForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            // إضافة الصف active عند التركيز على الحقل
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('active');
            });
            
            // إزالة الصف active عند إنهاء التركيز على الحقل إذا كان فارغًا
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('active');
                }
            });
        });
        
        // تعديل وضع الهاتف ورمز الدولة حسب حجم الشاشة
        function adjustPhoneLayout() {
            const phoneRow = document.querySelector('.phone-row');
            if (phoneRow) {
                if (window.innerWidth <= 375) {
                    // تعديل بعض المسافات للهواتف الصغيرة
                    phoneRow.style.gap = '5px';
                } else if (window.innerWidth <= 767) {
                    phoneRow.style.gap = '10px';
                } else {
                    phoneRow.style.gap = '20px';
                }
            }
        }
        
        // ضبط التخطيط عند تحميل الصفحة
        adjustPhoneLayout();
        
        // ضبط التخطيط عند تغيير حجم الشاشة
        window.addEventListener('resize', adjustPhoneLayout);
    }
    
    // التحقق من صحة النموذج
    function validateForm() {
        let isValid = true;
        const fullName = document.getElementById('full-name');
        const email = document.getElementById('email');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const phone = document.getElementById('phone');
        const terms = document.getElementById('terms');
        
        // إزالة رسائل الأخطاء السابقة
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // التحقق من حقل الاسم
        if (!fullName.value.trim()) {
            showError(fullName, 'الرجاء إدخال الاسم الكامل');
            isValid = false;
        }
        
        // التحقق من البريد الإلكتروني
        if (!validateEmail(email.value)) {
            showError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
            isValid = false;
        }
        
        // التحقق من اسم المستخدم
        if (!username.value.trim()) {
            showError(username, 'الرجاء إدخال اسم المستخدم');
            isValid = false;
        }
        
        // التحقق من كلمة المرور
        if (password.value.length < 6) {
            showError(password, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل');
            isValid = false;
        }
        
        // التحقق من تطابق كلمة المرور
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'كلمة المرور غير متطابقة');
            isValid = false;
        }
        
        // التحقق من رقم الهاتف
        if (!phone.value.trim()) {
            showError(phone, 'الرجاء إدخال رقم الهاتف');
            isValid = false;
        }
        
        // التحقق من الموافقة على الشروط
        if (!terms.checked) {
            showError(terms, 'يجب الموافقة على الشروط والأحكام');
            isValid = false;
        }
        
        // إذا تم التحقق من كل شيء، يمكن إرسال النموذج
        if (isValid) {
            // هنا يمكن إرسال النموذج فعليًا
            // subscriptionForm.submit();
            
            // للعرض التجريبي، سنعرض رسالة نجاح
            // alert('تم إرسال طلب الاشتراك بنجاح!');
        }
    }
    
    // عرض رسالة خطأ تحت الحقل
    function showError(input, message) {
        // إضافة حدود حمراء للحقل
        input.style.borderColor = '#ff3860';
        
        // إنشاء عنصر لعرض رسالة الخطأ
        const error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ff3860';
        error.style.fontSize = '12px';
        error.style.marginTop = '5px';
        error.style.textAlign = 'right';
        
        // الحصول على عنصر الأب (form-group)
        const parent = input.closest('.form-group') || input.parentElement;
        
        // إضافة رسالة الخطأ بعد الحقل
        parent.appendChild(error);
        
        // التركيز على الحقل الذي به خطأ
        input.focus();
    }
    
    // التحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const countrySelect = document.querySelector('.country-select');
    const countryDropdown = countrySelect.querySelector('.country-dropdown');
    const flagCircle = countrySelect.querySelector('.flag-circle');
    const currentFlag = flagCircle.querySelector('.flag-img');
    const currentCode = countrySelect.querySelector('.code');
    const countryOptions = countryDropdown.querySelectorAll('.country-option');

    // فتح وإغلاق القائمة المنسدلة
    flagCircle.addEventListener('click', function(e) {
        e.stopPropagation();
        countrySelect.classList.toggle('active');
    });

    // اختيار دولة
    countryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const newFlag = this.getAttribute('data-flag');
            const newCode = this.getAttribute('data-code');
            const countryName = this.querySelector('.country-name').textContent;

            // تحديث العلم ورمز الدولة
            currentFlag.src = newFlag;
            currentFlag.alt = countryName;
            currentCode.textContent = newCode;

            // إغلاق القائمة
            countrySelect.classList.remove('active');
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!countrySelect.contains(e.target)) {
            countrySelect.classList.remove('active');
        }
    });
});
