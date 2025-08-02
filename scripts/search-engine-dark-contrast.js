// تطبيق التنسيقات الخاصة بالتباين الأسود على صفحة محرك البحث
document.addEventListener('DOMContentLoaded', function() {
    // وظيفة لتطبيق التنسيقات على أزرار البحث
    function applyDarkContrastToSearchButtons() {
        const searchButtons = document.querySelectorAll('.search-button, .press-search-button, button[class*="search-button"]');
        
        searchButtons.forEach(button => {
            if (document.body.classList.contains('dark-contrast')) {
                button.style.backgroundColor = '#000000';
                button.style.color = '#ffffff';
                button.style.border = '2px solid #000000';
            }
        });
    }
    
    // وظيفة لتطبيق التنسيقات على جميع النصوص
    function applyDarkContrastToText() {
        if (document.body.classList.contains('dark-contrast')) {
            // تطبيق اللون الأسود على جميع النصوص
            const textElements = document.querySelectorAll('*:not(.search-button):not(.search-tab.active):not(.tab-button.active):not(.horizontal-tab.active)');
            
            textElements.forEach(element => {
                // تجنب تطبيق اللون على أزرار البحث والعناصر النشطة
                if (!element.classList.contains('search-button') && 
                    !element.classList.contains('press-search-button') &&
                    !element.classList.contains('active')) {
                    element.style.color = '#000000';
                }
            });
        }
    }
    
    // تطبيق التنسيقات عند تحميل الصفحة
    applyDarkContrastToSearchButtons();
    applyDarkContrastToText();
    
    // مراقبة تغييرات فئة التباين الأسود
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                applyDarkContrastToSearchButtons();
                applyDarkContrastToText();
            }
        });
    });
    
    // بدء مراقبة تغييرات فئة body
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // التحقق الدوري للتأكد من تطبيق التنسيقات
    setInterval(function() {
        if (document.body.classList.contains('dark-contrast')) {
            applyDarkContrastToSearchButtons();
        }
    }, 1000);
});

// وظيفة لتطبيق التنسيقات فوراً عند استدعائها
function forceDarkContrastOnSearchEngine() {
    if (document.body.classList.contains('dark-contrast')) {
        // تطبيق التنسيقات على أزرار البحث
        const searchButtons = document.querySelectorAll('.search-button, .press-search-button, button[class*="search-button"]');
        searchButtons.forEach(button => {
            button.style.setProperty('background-color', '#000000', 'important');
            button.style.setProperty('color', '#ffffff', 'important');
            button.style.setProperty('border', '2px solid #000000', 'important');
        });
        
        // تطبيق اللون الأسود على جميع النصوص
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (!element.classList.contains('search-button') && 
                !element.classList.contains('press-search-button') &&
                !element.classList.contains('active') &&
                !element.matches('.search-tab.active') &&
                !element.matches('.tab-button.active') &&
                !element.matches('.horizontal-tab.active')) {
                element.style.setProperty('color', '#000000', 'important');
            }
        });
    }
}

// تصدير الوظيفة للاستخدام العام
window.forceDarkContrastOnSearchEngine = forceDarkContrastOnSearchEngine; 