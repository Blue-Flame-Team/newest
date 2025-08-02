// إدارة نافذة تعديل كلمة المرور - جميع الأجهزة
document.addEventListener('DOMContentLoaded', function() {
    
    // دالة لإظهار النافذة
    function showPasswordChangeModal() {
        const modal = document.getElementById('password-change-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
        }
    }
    
    // دالة لإخفاء النافذة
    function hidePasswordChangeModal() {
        const modal = document.getElementById('password-change-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // استعادة التمرير
            
            // مسح الحقول عند الإغلاق
            const inputs = modal.querySelectorAll('.password-change-input');
            inputs.forEach(input => input.value = '');
            
        }
    }
    
    // إعداد أحداث إغلاق النافذة
    function setupModalEvents() {
        const modal = document.getElementById('password-change-modal');
        const closeBtn = document.querySelector('.password-change-close');
        
        // إغلاق بالنقر على زر X
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                hidePasswordChangeModal();
            });
        }
        
        // إغلاق بالنقر خارج النافذة
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    hidePasswordChangeModal();
                }
            });
        }
        
        // إغلاق بضغط مفتاح Escape
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('password-change-modal');
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                hidePasswordChangeModal();
            }
        });
    }
    
    // دالة التحقق من صحة البيانات
    function validatePasswordForm() {
        const currentPassword = document.querySelector('.password-change-input[placeholder="كلمة المرور الحالية"]');
        const newPassword = document.querySelector('.password-change-input[placeholder="كلمة المرور الجديدة"]');
        const confirmPassword = document.querySelector('.password-change-input[placeholder="تأكيد كلمة المرور الجديدة"]');
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            return false;
        }
        
        // التحقق من أن جميع الحقول مملوءة
        if (!currentPassword.value.trim() || !newPassword.value.trim() || !confirmPassword.value.trim()) {
            alert('يرجى ملء جميع الحقول');
            return false;
        }
        
        // التحقق من أن كلمة المرور الجديدة على الأقل 6 أحرف
        if (newPassword.value.length < 6) {
            alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
            return false;
        }
        
        // التحقق من تطابق كلمة المرور الجديدة مع التأكيد
        if (newPassword.value !== confirmPassword.value) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقتين');
            return false;
        }
        
        // التحقق من أن كلمة المرور الجديدة مختلفة عن الحالية
        if (currentPassword.value === newPassword.value) {
            alert('كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية');
            return false;
        }
        
        return true;
    }
    
    // إعداد تقديم النموذج
    function setupFormSubmission() {
        const submitBtn = document.querySelector('.password-change-btn');
        const form = document.querySelector('.password-change-form');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (validatePasswordForm()) {
                    // إظهار حالة التحميل
                    submitBtn.classList.add('loading');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'جاري الحفظ...';
                    submitBtn.disabled = true;
                    
                    // محاكاة طلب الحفظ
                    setTimeout(function() {
                        // إعادة تعيين الحالة
                        submitBtn.classList.remove('loading');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        
                        // إظهار رسالة نجاح
                        alert('تم تغيير كلمة المرور بنجاح!');
                        
                        // إغلاق النافذة
                        hidePasswordChangeModal();
                    }, 2000);
                }
            });
        }
        
        // معالجة submit event أيضاً
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (submitBtn) {
                    submitBtn.click();
                }
            });
        }
    }
    
    // تحسينات للتفاعل على جميع الأجهزة
    function setupInteractionOptimizations() {
        const inputs = document.querySelectorAll('.password-change-input');
        
        inputs.forEach(input => {
            // تحسينات focus
            input.addEventListener('focus', function() {
                this.style.borderColor = '#00a19a';
                this.style.backgroundColor = 'white';
                this.style.boxShadow = '0 0 0 3px rgba(0, 161, 154, 0.2)';
                this.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = '#f8f9fa';
                this.style.boxShadow = 'none';
                this.style.transform = 'translateY(0)';
            });
            
            // منع التكبير في Safari على iOS
            input.addEventListener('touchstart', function() {
                if (window.innerWidth <= 768) {
                    this.style.fontSize = '16px';
                }
            });
            
            // تحسينات للديسكتوب
            input.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.borderColor = '#00a19a';
                    this.style.backgroundColor = '#f0fffe';
                }
            });
            
            input.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768 && document.activeElement !== this) {
                    this.style.borderColor = '#e0e0e0';
                    this.style.backgroundColor = '#f8f9fa';
                }
            });
        });
        
        // تحسينات الزر
        const submitBtn = document.querySelector('.password-change-btn');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', function() {
                if (!this.disabled) {
                    this.style.backgroundColor = '#008f89';
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = '0 8px 25px rgba(0, 161, 154, 0.3)';
                }
            });
            
            submitBtn.addEventListener('mouseleave', function() {
                if (!this.disabled) {
                    this.style.backgroundColor = '#00a19a';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });
        }
    }
    
    // إعداد responsive للنافذة حسب حجم الشاشة
    function setupResponsiveModal() {
        const modal = document.getElementById('password-change-modal');
        if (!modal) return;
        
        function adjustModalForScreen() {
            const screenWidth = window.innerWidth;
            const content = modal.querySelector('.password-change-content');
            const title = modal.querySelector('.password-change-title');
            const inputs = modal.querySelectorAll('.password-change-input');
            const submitBtn = modal.querySelector('.password-change-btn');
            
            if (screenWidth >= 1440) {
                // شاشات فائقة الكبر
                if (content) {
                    content.style.maxWidth = '800px';
                    content.style.padding = '50px';
                }
                if (title) title.style.fontSize = '30px';
                inputs.forEach(input => {
                    input.style.height = '65px';
                    input.style.fontSize = '20px';
                });
                if (submitBtn) {
                    submitBtn.style.height = '65px';
                    submitBtn.style.fontSize = '18px';
                }
            } else if (screenWidth >= 1024) {
                // ديسكتوب
                if (content) {
                    content.style.maxWidth = '700px';
                    content.style.padding = '40px';
                }
                if (title) title.style.fontSize = '28px';
                inputs.forEach(input => {
                    input.style.height = '60px';
                    input.style.fontSize = '18px';
                });
                if (submitBtn) {
                    submitBtn.style.height = '60px';
                    submitBtn.style.fontSize = '16px';
                }
            } else if (screenWidth >= 769) {
                // تابلت
                if (content) {
                    content.style.maxWidth = '600px';
                    content.style.padding = '35px';
                }
                if (title) title.style.fontSize = '26px';
                inputs.forEach(input => {
                    input.style.height = '58px';
                    input.style.fontSize = '17px';
                });
                if (submitBtn) {
                    submitBtn.style.height = '58px';
                    submitBtn.style.fontSize = '14px';
                }
            }
        }
        
        // تشغيل عند تغيير حجم الشاشة
        window.addEventListener('resize', adjustModalForScreen);
        
        // تشغيل عند فتح النافذة
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (modal.style.display === 'block') {
                        adjustModalForScreen();
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
    }
    
    // تشغيل جميع الوظائف
    setupModalEvents();
    setupFormSubmission();
    setupInteractionOptimizations();
    setupResponsiveModal();
    
    // تصدير الدوال للاستخدام العام
    window.showPasswordChangeModal = showPasswordChangeModal;
    window.hidePasswordChangeModal = hidePasswordChangeModal;
    
    
    // كود إضافي شامل لضمان عمل زر تعديل كلمة المرور على PC
    setTimeout(function() {
        
        function findAndBindPasswordButtons() {
            // البحث في جميع الأماكن المحتملة
            const possibleSelectors = [
                'a[href*="password"]',
                'button[onclick*="password"]',
                '*[data-action*="password"]',
                '.dashboard-btn',
                '.profile-btn',
                '.menu-item',
                '.btn',
                'a',
                'button'
            ];
            
            possibleSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const text = element.textContent || element.innerText || '';
                    const href = element.getAttribute('href') || '';
                    const onclick = element.getAttribute('onclick') || '';
                    const title = element.getAttribute('title') || '';
                    
                    // البحث عن أي عنصر يحتوي على كلمة المرور
                    if ((text.includes('كلمة المرور') || 
                        text.includes('تعديل كلمة') ||
                        text.includes('تغيير كلمة') ||
                        text.includes('كلمة السر') ||
                        text.includes('change password') ||
                        text.includes('edit password') ||
                        href.includes('password') ||
                        onclick.includes('password') ||
                        title.includes('كلمة المرور')) && 
                        !element.hasAttribute('data-pc-password-bound') &&
                        element.tagName !== 'SCRIPT' &&
                        element.tagName !== 'STYLE') {
                        
                        
                        // إزالة أي روابط أو أحداث موجودة
                        element.removeAttribute('href');
                        element.removeAttribute('onclick');
                        element.style.cursor = 'pointer';
                        
                        // إنشاء نسخة جديدة لإزالة event listeners القديمة
                        const newElement = element.cloneNode(true);
                        element.parentNode.replaceChild(newElement, element);
                        
                        // إضافة event listener
                        newElement.addEventListener('click', function(e) {
                            
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            
                            // إخفاء جميع النوافذ
                            const modals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"], .popup, [class*="popup"]');
                            modals.forEach(modal => {
                                if (modal.style) modal.style.display = 'none';
                            });
                            
                            // فتح نافذة تعديل كلمة المرور
                            showPasswordChangeModal();
                            
                            return false;
                        }, true);
                        
                        newElement.setAttribute('data-pc-password-bound', 'true');
                    }
                });
            });
        }
        
        // تشغيل البحث
        findAndBindPasswordButtons();
        
        // إعادة البحث كل ثانية لالتقاط الأزرار الجديدة
        const searchInterval = setInterval(function() {
            findAndBindPasswordButtons();
        }, 1000);
        
        // توقيف البحث بعد 10 ثوانِ
        setTimeout(function() {
            clearInterval(searchInterval);
        }, 10000);
        
        // مراقبة أي تغييرات في DOM
        const observer = new MutationObserver(function(mutations) {
            let shouldSearch = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldSearch = true;
                }
            });
            
            if (shouldSearch) {
                setTimeout(findAndBindPasswordButtons, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        
    }, 1000);

    // كود إضافي لمراقبة أي نقرات على الملف الشخصي وإعادة ربط الأزرار
    /*
    document.addEventListener('click', function(e) {
        const target = e.target;
        const text = target.textContent || target.innerText || '';
        const className = target.className || '';
        const id = target.id || '';
        
        if (text.includes('الملف الشخصي') || 
            text.includes('profile') || 
            text.includes('الحساب') ||
            text.includes('تسجيل الدخول') ||
            className.includes('profile') ||
            id.includes('profile') ||
            target.closest('.profile-btn') ||
            target.closest('#mobile-profile-btn') ||
            target.closest('.profile-icon-btn')) {
            
            
            setTimeout(function() {
                // البحث في النافذة الجديدة
                const passwordBtns = document.querySelectorAll('a, button, .btn, .dashboard-btn, .menu-item');
                passwordBtns.forEach(btn => {
                    const btnText = btn.textContent || btn.innerText || '';
                    if ((btnText.includes('كلمة المرور') || btnText.includes('تعديل كلمة')) && 
                        !btn.hasAttribute('data-pc-password-bound')) {
                        
                        
                        btn.removeAttribute('href');
                        btn.removeAttribute('onclick');
                        btn.style.cursor = 'pointer';
                        
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        
                        newBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // إخفاء جميع النوافذ
                            const modals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
                            modals.forEach(modal => {
                                if (modal.style) modal.style.display = 'none';
                            });
                            
                            showPasswordChangeModal();
                            return false;
                        }, true);
                        
                        newBtn.setAttribute('data-pc-password-bound', 'true');
                    }
                });
            }, 200);
        }
    });
    */
}); 