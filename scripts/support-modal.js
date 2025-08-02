(function() {
    'use strict';

    // دالة فتح نافذة الدعم
    function openSupportModal() {
        const modal = document.getElementById('support-modal');
        if (modal) {
            // إخفاء جميع النوافذ الأخرى
            const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
            allModals.forEach(m => {
                if (m.id !== 'support-modal') {
                    m.style.display = 'none';
                }
            });

            // إظهار نافذة الدعم
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.position = 'fixed';
            modal.style.zIndex = '99999';
            modal.style.left = '0';
        }
    }

    // دالة إغلاق نافذة الدعم
    function closeSupportModal() {
        const modal = document.getElementById('support-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // دالة إرسال نموذج الدعم
    function submitSupportForm(event) {
        event.preventDefault();

        const nameInput = document.getElementById('support-name');
        const emailInput = document.getElementById('support-email');
        const messageInput = document.getElementById('support-message');

        // التحقق من صحة المدخلات
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            showToast('يرجى ملء جميع الحقول');
            return;
        }

        // محاكاة إرسال رسالة الدعم (يمكن استبدالها بطلب AJAX حقيقي)
        const supportMessage = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            timestamp: new Date().toISOString()
        };

        // حفظ الرسالة في localStorage (يمكن استبدالها بإرسال إلى الخادم)
        const savedSupportMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
        savedSupportMessages.push(supportMessage);
        localStorage.setItem('supportMessages', JSON.stringify(savedSupportMessages));

        // مسح الحقول
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // إغلاق النافذة
        closeSupportModal();

        // عرض رسالة نجاح
        showToast('تم إرسال رسالتك بنجاح. سنقوم بالرد قريباً');
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
        const supportButtons = document.querySelectorAll('.open-support-btn');
        supportButtons.forEach(btn => {
            btn.addEventListener('click', openSupportModal);
        });
    });

    // تصدير الدوال للاستخدام العام
    window.openSupportModal = openSupportModal;
    window.closeSupportModal = closeSupportModal;
    window.submitSupportForm = submitSupportForm;
})(); 