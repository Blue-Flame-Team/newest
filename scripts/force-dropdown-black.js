// قوة قصوى لفرض القوائم المنسدلة أسوداء دائماً في جميع الحالات
(function() {
    'use strict';
    
    // دالة فرض اللون الأسود بقوة قصوى
    function forceDropdownBlack() {
        const dropdowns = document.querySelectorAll('.dropdown-menu, .dropdown-menu *, .dropdown-menu a, .dropdown-menu span, .dropdown-menu div, .dropdown-menu li');
        
        dropdowns.forEach(element => {
            // فرض اللون الأسود بقوة
            element.style.setProperty('color', '#000000', 'important');
            element.style.setProperty('text-shadow', 'none', 'important');
            
            // إضافة class للحماية
            element.classList.add('force-black-text');
            
            // منع تغيير اللون بـ JavaScript
            try {
                Object.defineProperty(element.style, 'color', {
                    value: '#000000',
                    writable: false,
                    configurable: false
                });
            } catch(e) {
                // تجاهل الأخطاء
            }
            
            // مراقبة تغييرات الـ style attribute
            if (element.setAttribute) {
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                    if (name === 'style' && value.includes('color') && !value.includes('color: #000000')) {
                        value = value.replace(/color\s*:\s*[^;]+/gi, 'color: #000000');
                    }
                    return originalSetAttribute.call(this, name, value);
                };
            }
        });
        
        // إنشاء CSS runtime بأولوية قصوى
        const style = document.createElement('style');
        style.id = 'force-dropdown-black-ultimate';
        style.innerHTML = `
            /* قوة قصوى للقوائم المنسدلة */
            .dropdown-menu, .dropdown-menu *, .dropdown-menu a, .dropdown-menu span, .dropdown-menu div, .dropdown-menu li,
            .force-black-text, .force-black-text *,
            html .dropdown-menu, html .dropdown-menu *, html .dropdown-menu a,
            body .dropdown-menu, body .dropdown-menu *, body .dropdown-menu a,
            html body .dropdown-menu, html body .dropdown-menu *, html body .dropdown-menu a,
            body.dark-mode .dropdown-menu, body.dark-mode .dropdown-menu *, body.dark-mode .dropdown-menu a,
            body.dark-contrast .dropdown-menu, body.dark-contrast .dropdown-menu *, body.dark-contrast .dropdown-menu a,
            body.light-mode .dropdown-menu, body.light-mode .dropdown-menu *, body.light-mode .dropdown-menu a,
            body.light-contrast .dropdown-menu, body.light-contrast .dropdown-menu *, body.light-contrast .dropdown-menu a,
            .dark-mode .dropdown-menu, .dark-mode .dropdown-menu *, .dark-mode .dropdown-menu a,
            .dark-contrast .dropdown-menu, .dark-contrast .dropdown-menu *, .dark-contrast .dropdown-menu a,
            .light-mode .dropdown-menu, .light-mode .dropdown-menu *, .light-mode .dropdown-menu a,
            .light-contrast .dropdown-menu, .light-contrast .dropdown-menu *, .light-contrast .dropdown-menu a {
                color: #000000 !important;
                text-shadow: none !important;
            }
            
            .dropdown-menu,
            html .dropdown-menu,
            body .dropdown-menu,
            html body .dropdown-menu,
            body.dark-mode .dropdown-menu,
            body.dark-contrast .dropdown-menu,
            body.light-mode .dropdown-menu,
            body.light-contrast .dropdown-menu,
            .dark-mode .dropdown-menu,
            .dark-contrast .dropdown-menu,
            .light-mode .dropdown-menu,
            .light-contrast .dropdown-menu {
                background-color: #ffffff !important;
                border: 1px solid #ddd !important;
            }
            
            /* حماية إضافية ضد hover effects */
            .dropdown-menu a:hover,
            .dropdown-menu a:focus,
            body.dark-mode .dropdown-menu a:hover,
            body.dark-contrast .dropdown-menu a:hover,
            .dark-mode .dropdown-menu a:hover,
            .dark-contrast .dropdown-menu a:hover {
                color: #000000 !important;
                background-color: #f0f0f0 !important;
                text-shadow: none !important;
            }
        `;
        
        // إزالة الـ style القديم إن وجد وإضافة الجديد
        const oldStyle = document.getElementById('force-dropdown-black-ultimate');
        if (oldStyle) oldStyle.remove();
        document.head.appendChild(style);
    }
    
    // دالة مراقبة التغييرات المستمرة
    function setupObservers() {
        // مراقبة تغييرات DOM
        const observer = new MutationObserver(function(mutations) {
            let needsUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    const target = mutation.target;
                    if (target.classList && (target.classList.contains('dropdown-menu') || target.closest('.dropdown-menu'))) {
                        needsUpdate = true;
                    }
                }
            });
            if (needsUpdate) {
                setTimeout(forceDropdownBlack, 10);
            }
        });
        
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
        
        // مراقبة تغييرات التباين
        const bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setTimeout(forceDropdownBlack, 50);
                }
            });
        });
        
        bodyObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // مراقبة localStorage changes
        window.addEventListener('storage', function(e) {
            if (e.key === 'theme' || e.key === 'contrast-mode') {
                setTimeout(forceDropdownBlack, 100);
            }
        });
    }
    
    // تطبيق فوري
    forceDropdownBlack();
    
    // تطبيق عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            forceDropdownBlack();
            setupObservers();
        });
    } else {
        forceDropdownBlack();
        setupObservers();
    }
    
    // تطبيق عند تحميل النافذة
    window.addEventListener('load', forceDropdownBlack);
    
    // تطبيق دوري كحماية إضافية
    setInterval(forceDropdownBlack, 1000);
    
    // تطبيق عند تغيير focus
    window.addEventListener('focus', forceDropdownBlack);
    
    // تطبيق عند تغيير الصفحة
    window.addEventListener('pageshow', forceDropdownBlack);
    
    // إتاحة الدالة عالمياً للاستخدام الخارجي
    window.forceDropdownBlack = forceDropdownBlack;
    
})(); 