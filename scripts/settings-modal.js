// مودال الإعدادات الموحد
document.addEventListener('DOMContentLoaded', () => {


    // البحث عن العناصر الرئيسية
    const settingsToggleBtn = document.querySelector('.settings-toggle-btn');
    const settingsModal = document.querySelector('.settings-modal');
    const settingsMenu = document.querySelector('.settings-menu');

    // التحقق من وجود العناصر
    if (!settingsToggleBtn || !settingsModal || !settingsMenu) {

            settingsToggleBtn: !!settingsToggleBtn,
            settingsModal: !!settingsModal,
            settingsMenu: !!settingsMenu
        });
        return;
    }

    // دالة فتح/إغلاق القائمة
    function toggleSettingsMenu(event) {

        
        // إيقاف انتشار الحدث
        event.stopPropagation();
        
        // تبديل عرض القائمة
        settingsMenu.classList.toggle('show');
        
        // تحديد موضع القائمة بالنسبة للزرار
        positionSettingsMenu();
    }

    // تحديد موضع القائمة
    function positionSettingsMenu() {
        const btnRect = settingsToggleBtn.getBoundingClientRect();
        
        // تحديد الموضع أسفل الزرار مباشرة
        settingsMenu.style.top = `${btnRect.bottom + window.scrollY + 5}px`;
        settingsMenu.style.left = `${btnRect.left + window.scrollX}px`;
        settingsMenu.style.width = `${btnRect.width}px`;
    }

    // إغلاق القائمة عند النقر خارجها
    function closeSettingsMenu(event) {

        
        // التحقق من عدم وجود النقر داخل القائمة أو على الزرار
        if (!settingsMenu.contains(event.target) && 
            !settingsToggleBtn.contains(event.target)) {
            settingsMenu.classList.remove('show');
        }
    }

    // إضافة المستمعين
    settingsToggleBtn.addEventListener('click', toggleSettingsMenu);
    document.addEventListener('click', closeSettingsMenu);
    window.addEventListener('resize', positionSettingsMenu);

    // معالجة خيارات القائمة
    const contrastLightOption = document.querySelector('.contrast-light');
    const contrastDarkOption = document.querySelector('.contrast-dark');
    const zoomInBtn = document.querySelector('.zoom-in-btn');
    const zoomOutBtn = document.querySelector('.zoom-out-btn');
    const zoomResetBtn = document.querySelector('.zoom-reset-btn');
    const logoutOption = document.querySelector('.logout-option');
    const contrastOption = document.querySelector('.contrast-option');
    const contrastSubmenu = document.querySelector('.contrast-submenu');

    // تغيير التباين
    function setContrastMode(mode) {

        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${mode}-mode`);
        
        // حفظ الوضع
        localStorage.setItem('contrast', mode);
        
        // إغلاق القوائم
        settingsMenu.classList.remove('show');
        if (contrastSubmenu) {
            contrastSubmenu.classList.remove('show');
        }
    }

    // معالجة التباين
    if (contrastLightOption) {
        contrastLightOption.addEventListener('click', () => setContrastMode('light'));
    }
    if (contrastDarkOption) {
        contrastDarkOption.addEventListener('click', () => setContrastMode('dark'));
    }

    // معالجة القائمة الفرعية للتباين
    if (contrastOption && contrastSubmenu) {
        contrastOption.addEventListener('click', (e) => {

            e.stopPropagation();
            contrastSubmenu.classList.toggle('show');
        });
    }

    // استعادة الإعدادات السابقة
    const savedMode = localStorage.getItem('contrast') || 'light';
    setContrastMode(savedMode);


}); 