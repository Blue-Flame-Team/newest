// Function to open edit profile modal
function openEditProfileModal() {
    const editProfileModal = document.getElementById('edit-profile-modal');
    if (editProfileModal) {
        editProfileModal.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من وجود مستخدم مسجل
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // إذا لم يكن هناك مستخدم، قم بإنشاء مستخدم تجريبي
    if (Object.keys(currentUser).length === 0) {
        const defaultUser = {
            username: 'مستخدم تجريبي',
            email: 'test@example.com',
            phone: '0501234567'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));

    }

    // إنشاء عنصر النافذة المنبثقة للملف الشخصي
    function createProfileMenu() {
        const profileMenuContent = `
        <div class="profile-menu-content">
            <span class="close-modal">×</span>
            <h2 class="profile-title">الوصول السريع</h2>
            <p class="welcome-text">مرحبا admin</p>
            
            <div class="profile-buttons">
                <a href="#" class="profile-btn">
                    <img src="assets/icons/profile-circle.svg" alt="عدل بياناتك">
                    <span>عدل بياناتك</span>
                </a>
                <a href="#" class="profile-btn">
                    <span>خدمة العملاء</span>
                </a>
                <a href="#" class="profile-btn">
                    <img src="assets/icons/message-search.svg" alt="المساعدة الذاتية">
                    <span>المساعدة الذاتية</span>
                </a>
                <a href="#" class="profile-btn">
                    <span>طلب خدمة الأساند</span>
                </a>
                <button class="profile-btn logout">
                    <img src="assets/icons/logout.svg" alt="تسجيل الخروج">
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </div>`;

        const profileMenu = document.createElement('div');
        profileMenu.classList.add('profile-menu');
        profileMenu.innerHTML = profileMenuContent;
        document.body.appendChild(profileMenu);

        // إضافة أنماط CSS مباشرة للتأكد من الظهور
        profileMenu.style.position = 'fixed';
        profileMenu.style.top = '0';
        profileMenu.style.left = '0';
        profileMenu.style.width = '100%';
        profileMenu.style.height = '100%';
        profileMenu.style.backgroundColor = 'rgba(0,0,0,0.5)';
        profileMenu.style.display = 'none';
        profileMenu.style.justifyContent = 'center';
        profileMenu.style.alignItems = 'center';
        profileMenu.style.zIndex = '1000';

        // إضافة أحداث للأزرار
        const closeModal = profileMenu.querySelector('.close-modal');
        const profileButtons = profileMenu.querySelectorAll('.profile-btn');

        // زر الإغلاق
        closeModal.addEventListener('click', () => {
            profileMenu.style.display = 'none';
        });

        // أزرار الملف الشخصي
        profileButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // منع الانتقال الافتراضي للروابط
                
                if (button.classList.contains('logout')) {
                    // منطق تسجيل الخروج
                    document.body.classList.remove('user-logged-in');
                    profileMenu.style.display = 'none';
                } else {
                    // فتح الصفحات المختلفة
                    const action = button.textContent.trim();
                    switch(action) {
                        case 'عدل بياناتك':

                            break;
                        case 'خدمة العملاء':

                            break;
                        case 'المساعدة الذاتية':

                            break;
                        case 'طلب خدمة الأساند':
                            if (typeof window.showAsanidServiceModal === 'function') {
                                window.showAsanidServiceModal();
                            } else {

                            }
                            break;
                    }
                    profileMenu.style.display = 'none';
                }
            });
        });

        // تبديل ظهور القائمة
        const profileIconBtn = document.querySelector('.profile-icon-btn');
        if (profileIconBtn) {
            // تعديل الزر ليكون مرئيًا
            profileIconBtn.style.display = 'flex';
            profileIconBtn.style.visibility = 'visible';

            profileIconBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // منع انتشار الحدث
                profileMenu.style.display = 'flex';
            });
        }

        // إغلاق القائمة عند النقر خارجها
        profileMenu.addEventListener('click', (e) => {
            if (e.target === profileMenu) {
                profileMenu.style.display = 'none';
            }
        });
    }

    // إنشاء القائمة عند تحميل الصفحة
    createProfileMenu();

    // دالة عامة للتبديل
    window.toggleProfileMenu = () => {
        const profileMenu = document.querySelector('.profile-menu');
        if (profileMenu) {
            profileMenu.style.display = profileMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    // Specific button click handlers
    const buttons = document.querySelectorAll('.profile-menu .profile-btn:not(.logout)');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            switch(index) {
                case 0: // "عدل بياناتك" button

                    // التأكد من وجود الدالة قبل استدعائها
                    if (typeof window.openEditProfileModal === 'function') {
                        window.openEditProfileModal();
                    } else if (typeof openEditProfileModal === 'function') {
                        openEditProfileModal();
                    } else {

                        // محاولة تحميل السكريبت
                        const script = document.createElement('script');
                        script.src = '../scripts/load-edit-profile-modal.js';
                        script.onload = function() {
                            if (typeof openEditProfileModal === 'function') {
                                openEditProfileModal();
                            }
                        };
                        document.head.appendChild(script);
                    }
                    break;
                case 1:

                    break;
                case 2:

                    break;
                case 3:
                    // Call the function to show the Asanid service modal
                    if (typeof window.showAsanidServiceModal === 'function') {
                        window.showAsanidServiceModal();
                    } else {

                        // محاولة تحميل السكريبت
                        const script = document.createElement('script');
                        script.src = '../scripts/load-asanid-service-modal.js';
                        script.onload = function() {
                            if (typeof window.showAsanidServiceModal === 'function') {
                                window.showAsanidServiceModal();
                            } else {

                            }
                        };
                        script.onerror = function() {

                        };
                        document.head.appendChild(script);
                    }
                    break;
            }
            toggleProfileMenu();
        });
    });
});
 