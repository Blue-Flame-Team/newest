// سكريپت اختبار بسيط لقائمة التباين الفرعية


// انتظار ثانية واحدة ثم تشغيل الاختبار
setTimeout(function() {
    
    
    // فحص عناصر التباين الرئيسية
    const contrastOptions = document.querySelectorAll('.contrast-option');
    
    
    // فحص القوائم الفرعية
    const contrastSubmenus = document.querySelectorAll('.contrast-submenu');
    
    
    // فحص قوائم الإعدادات
    const settingsMenus = document.querySelectorAll('.settings-menu');
    
    
    // إضافة مستمع بسيط لكل خيار تباين
    contrastOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            
            
            // البحث عن القائمة الفرعية
            const parentMenu = this.closest('.settings-menu');
            if (parentMenu) {
                const submenu = parentMenu.querySelector('.contrast-submenu');
                if (submenu) {
                    submenu.classList.toggle('show');
                    
                } else {
                    
                }
            }
        });
    });
    
    
    
}, 1000); 