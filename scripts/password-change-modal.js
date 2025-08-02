/**
 * وظائف نافذة تعديل كلمة المرور
 * يدير جميع وظائف تعديل كلمة المرور للمستخدمين
 */

// نظام إدارة تغيير كلمة المرور
const PasswordChangeManager = (function() {
    // المتغيرات الداخلية
    let passwordChangeModal = null;
    let currentPasswordInput = null;
    let newPasswordInput = null;
    let confirmPasswordInput = null;
    let savePasswordBtn = null;

    // دالة التهيئة
    function init() {
        try {
            // العثور على العناصر
            passwordChangeModal = document.getElementById('password-change-modal');
            currentPasswordInput = document.getElementById('currentPassword');
            newPasswordInput = document.getElementById('newPassword');
            confirmPasswordInput = document.getElementById('confirmPassword');
            savePasswordBtn = document.getElementById('savePasswordBtn');

            // ربط الأحداث
            bindEvents();
        } catch (error) {

        }
    }

    // دالة ربط الأحداث
    function bindEvents() {
        if (savePasswordBtn) {
            savePasswordBtn.addEventListener('click', handlePasswordChange);
        }

        // إغلاق النافذة
        const closeBtn = passwordChangeModal?.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', hidePasswordChangeModal);
        }
    }

    // معالجة تغيير كلمة المرور
    function handlePasswordChange(e) {
        e.preventDefault();
        
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // التحقق من صحة كلمات المرور
        if (!validatePasswords(currentPassword, newPassword, confirmPassword)) {
            return;
        }

        // محاولة تغيير كلمة المرور
        try {
            // يمكنك إضافة منطق التحقق من كلمة المرور هنا
            updatePassword(newPassword);
            
            // إغلاق النافذة وإظهار رسالة نجاح
            hidePasswordChangeModal();
            alert('تم تغيير كلمة المرور بنجاح');
        } catch (error) {

            alert('حدث خطأ أثناء تغيير كلمة المرور');
        }
    }

    // التحقق من صحة كلمات المرور
    function validatePasswords(currentPassword, newPassword, confirmPassword) {
        if (!currentPassword) {
            alert('يرجى إدخال كلمة المرور الحالية');
            return false;
        }

        if (newPassword.length < 8) {
            alert('يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل');
            return false;
        }

        if (newPassword !== confirmPassword) {
            alert('كلمتا المرور غير متطابقتين');
            return false;
        }

        return true;
    }

    // تحديث كلمة المرور
    function updatePassword(newPassword) {
        // يمكنك إضافة منطق تحديث كلمة المرور هنا
        // مثلاً: الاتصال بواجهة برمجة التطبيقات أو تحديث localStorage
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        userData.password = newPassword;
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    // إظهار نافذة تغيير كلمة المرور
    function showPasswordChangeModal() {
        if (passwordChangeModal) {
            passwordChangeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // إخفاء نافذة تغيير كلمة المرور
    function hidePasswordChangeModal() {
        if (passwordChangeModal) {
            passwordChangeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // مسح حقول كلمة المرور
            if (currentPasswordInput) currentPasswordInput.value = '';
            if (newPasswordInput) newPasswordInput.value = '';
            if (confirmPasswordInput) confirmPasswordInput.value = '';
        }
    }

    // التهيئة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', init);

    // واجهة عامة للنظام
    return {
        init,
        showPasswordChangeModal,
        hidePasswordChangeModal
    };
})();

// جعل النظام متاحاً عالمياً
window.PasswordChangeManager = PasswordChangeManager;

// دالة لإعداد أحداث نافذة تغيير كلمة المرور
function setupPasswordModalEvents() {
    const modal = document.getElementById('password-change-modal');
    if (!modal) return;
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            PasswordChangeManager.hidePasswordChangeModal();
        }
    });
    
    // معالجة تقديم النموذج
    window.handlePasswordSubmit = function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // التحقق من تطابق كلمات المرور
        if (newPassword !== confirmPassword) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقين');
            return;
        }
        
        // التحقق من طول كلمة المرور
        if (newPassword.length < 6) {
            alert('يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل');
            return;
        }
        
        // محاكاة تغيير كلمة المرور (يمكن تعديل هذا الجزء لاحقاً)
        alert('تم تغيير كلمة المرور بنجاح');
        PasswordChangeManager.hidePasswordChangeModal();
        
        // إعادة تعيين النموذج
        e.target.reset();
    };
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // محاولة إعداد الأحداث إذا كانت النافذة موجودة
    setupPasswordModalEvents();
}); 