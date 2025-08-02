(function() {
    'use strict';

    function openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (!modal) {

            return;
        }

        // Show modal
        modal.style.display = 'flex';
        
        // Populate current user data
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        // تعبئة الحقول
        document.getElementById('userType').value = currentUser.userType || '';
        document.getElementById('editEmail').value = currentUser.email || '';
        document.getElementById('city').value = currentUser.city || '';
        document.getElementById('detailedAddress').value = currentUser.detailedAddress || '';
        document.getElementById('editPhone').value = currentUser.phone || '';
        document.getElementById('fax').value = currentUser.fax || '';
        document.getElementById('mailBox').value = currentUser.mailBox || '';
        document.getElementById('postalCode').value = currentUser.postalCode || '';
    }

    function closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function handleEditProfile(event) {
        event.preventDefault();

        // جمع البيانات من النموذج
        const userData = {
            userType: document.getElementById('userType').value,
            email: document.getElementById('editEmail').value,
            city: document.getElementById('city').value,
            detailedAddress: document.getElementById('detailedAddress').value,
            phone: document.getElementById('editPhone').value,
            fax: document.getElementById('fax').value,
            mailBox: document.getElementById('mailBox').value,
            postalCode: document.getElementById('postalCode').value
        };

        // التحقق من صحة البيانات
        if (!userData.email || !userData.phone) {
            alert('يرجى ملء الحقول الإلزامية');
            return;
        }

        // حفظ البيانات في localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // إظهار رسالة نجاح
        alert('تم تحديث البيانات بنجاح');

        // إغلاق النافذة
        closeEditProfileModal();
    }

    // تعريض الدوال عالمياً
    window.openEditProfileModal = openEditProfileModal;
    window.closeEditProfileModal = closeEditProfileModal;
    window.handleEditProfile = handleEditProfile;

    // تهيئة الأحداث عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        const profileButtons = document.querySelectorAll('.profile-btn');
        profileButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                if (buttonText === 'عدل بياناتك') {
                    openEditProfileModal();
                }
            });
        });

        // إضافة حدث النقر لزر الإغلاق
        const closeBtn = document.getElementById('closeEditProfileModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEditProfileModal);
        }

        // إغلاق النافذة عند النقر خارجها
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeEditProfileModal();
                }
            });
        }
    });
})();