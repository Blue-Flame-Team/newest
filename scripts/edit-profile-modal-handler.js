function openEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleEditProfile(event) {
    event.preventDefault();
    
    // جمع البيانات من الحقول
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;

    // حفظ البيانات في localStorage
    const userData = {
        username: username,
        email: email,
        phone: phone
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // إغلاق النافذة بعد الحفظ
    closeEditProfileModal();

    // يمكنك إضافة رسالة نجاح هنا
    alert('تم حفظ البيانات بنجاح');
}

// إضافة مستمع لحدث تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // البحث عن الزر باستخدام الكلاس profile-btn
    const profileButton = document.querySelector('.profile-btn');
    
    // التأكد من وجود الزر
    if (profileButton) {
        // إضافة حدث النقر لفتح النافذة
        profileButton.addEventListener('click', (event) => {
            event.preventDefault(); // منع السلوك الافتراضي للرابط
            openEditProfileModal();
        });
    }

    // الدوال الموجودة مسبقاً
    function openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function handleEditProfile(event) {
        event.preventDefault();
        
        // جمع البيانات من الحقول
        const username = document.getElementById('editUsername').value;
        const email = document.getElementById('editEmail').value;
        const phone = document.getElementById('editPhone').value;

        // حفظ البيانات في localStorage
        const userData = {
            username: username,
            email: email,
            phone: phone
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // إغلاق النافذة بعد الحفظ
        closeEditProfileModal();

        // يمكنك إضافة رسالة نجاح هنا
        alert('تم حفظ البيانات بنجاح');
    }

    // استرجاع البيانات المحفوظة
    const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // تعبئة الحقول إذا كانت هناك بيانات محفوظة
    if (Object.keys(savedUser).length > 0) {
        document.getElementById('editUsername').value = savedUser.username || '';
        document.getElementById('editEmail').value = savedUser.email || '';
        document.getElementById('editPhone').value = savedUser.phone || '';
    }
}); 