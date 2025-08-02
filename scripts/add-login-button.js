// إضافة زر تسجيل الدخول للصفحات الفرعية
document.addEventListener('DOMContentLoaded', () => {
    // دالة إنشاء زر تسجيل الدخول
    function createLoginButton() {
        // التحقق من وجود الزر بالفعل
        if (document.querySelector('.login-btn')) return;

        // إنشاء زر تسجيل الدخول
        const loginBtn = document.createElement('button');
        loginBtn.classList.add('login-btn', 'btn', 'btn-primary');
        loginBtn.textContent = 'تسجيل الدخول';
        loginBtn.setAttribute('data-bs-toggle', 'modal');
        loginBtn.setAttribute('data-bs-target', '#loginModal');
        
        // أنماط الزر
        loginBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        `;

        // إضافة الزر للصفحة
        document.body.appendChild(loginBtn);

        // إضافة معالج الحدث
        loginBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                const modalInstance = new bootstrap.Modal(loginModal);
                modalInstance.show();
            }
        });
    }

    // إضافة الزر عند تحميل الصفحة
    createLoginButton();

    // إعادة التحقق في حالة التحميل الديناميكي
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                createLoginButton();
            }
        });
    });

    // مراقبة التغييرات في جسم الصفحة
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
}); 