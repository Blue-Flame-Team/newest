// تحميل المكونات العامة للموقع
document.addEventListener('DOMContentLoaded', () => {
    // دالة تحميل مكون HTML
    async function loadComponent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`خطأ في تحميل المكون: ${response.status}`);
            }
            const htmlContent = await response.text();
            
            // إنشاء عنصر مؤقت
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            
            // نقل المحتوى إلى الجسم
            const componentElements = tempDiv.querySelectorAll('body > *');
            componentElements.forEach(el => {
                document.body.appendChild(el);
            });
            

            
            // تشغيل السكريبتات المرتبطة
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                newScript.src = script.src;
                document.body.appendChild(newScript);
            });
        } catch (error) {

        }
    }

    // وظيفة تحميل المكونات
    function initializeGlobalComponents() {
        // مودال تسجيل الدخول
        loadComponent('../include/login-modal.html');
        
        // مودال الإعدادات
        loadComponent('../include/settings-modal.html');
        
        // مودال اختيار الدولة
        loadComponent('../include/country-selector-modal.html');
    }

    // إضافة زر تسجيل الدخول
    function addLoginButton() {
        // التحقق من وجود الزر بالفعل
        if (document.querySelector('.login-btn')) return;

        // إنشاء زر تسجيل الدخول
        const loginBtn = document.createElement('button');
        loginBtn.classList.add('login-btn', 'btn', 'btn-primary');
        loginBtn.textContent = 'تسجيل الدخول';
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

        // معالج الحدث لفتح المودال
        loginBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'block';
            }
        });
    }

    // تحميل المكونات العامة
    initializeGlobalComponents();

    // إضافة زر تسجيل الدخول
    addLoginButton();
});

// دوال عامة للتحكم في التباين والتكبير (كما في النسخة السابقة)
function toggleContrast(mode) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);
    localStorage.setItem('contrast', mode);
}

// دالة عامة للتكبير/التصغير
function adjustZoom(action) {
    const currentZoom = parseFloat(localStorage.getItem('zoom') || '1');
    let newZoom = currentZoom;

    switch(action) {
        case 'in':
            newZoom = Math.min(currentZoom + 0.1, 1.5);
            break;
        case 'out':
            newZoom = Math.max(currentZoom - 0.1, 0.7);
            break;
        case 'reset':
            newZoom = 1;
            break;
    }

    applyZoom(newZoom);
}

function applyZoom(zoom) {
    const textElements = document.querySelectorAll(
        'body, body *:not(.settings-modal):not(img):not(svg)'
    );
    
    textElements.forEach(element => {
        element.style.setProperty('transform', `scale(${zoom})`, 'important');
        element.style.setProperty('transform-origin', 'right top', 'important');
    });

    localStorage.setItem('zoom', zoom.toString());
}

// استعادة الإعدادات السابقة عند تحميل الصفحة
function restoreUserPreferences() {
    const savedMode = localStorage.getItem('contrast') || 'light';
    toggleContrast(savedMode);

    const savedZoom = localStorage.getItem('zoom');
    if (savedZoom) {
        applyZoom(parseFloat(savedZoom));
    }
}

// تشغيل استعادة الإعدادات
document.addEventListener('DOMContentLoaded', restoreUserPreferences); 