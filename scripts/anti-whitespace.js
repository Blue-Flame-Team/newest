// ملف منع المساحة البيضاء عند التكبير - بدون تأثير على التصميم

(function() {
    'use strict';
    
    // منع المساحة البيضاء فور تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        enforceNoWhitespace();
    });
    
    // مراقب مستمر لمنع المساحة البيضاء
    function enforceNoWhitespace() {
        // إجبار إعدادات أساسية
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.documentElement.style.overflowX = 'hidden';
        
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflowX = 'hidden';
    }
    
    // مراقب للتغييرات على style attributes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;
                
                if (target === document.body || target === document.documentElement) {
                    // منع أي margin أو padding إضافي
                    if (target.style.marginTop && target.style.marginTop !== '0px') {
                        target.style.marginTop = '0';
                    }
                    if (target.style.paddingTop && target.style.paddingTop !== '0px') {
                        target.style.paddingTop = '0';
                    }
                    if (target.style.marginLeft && target.style.marginLeft !== '0px') {
                        target.style.marginLeft = '0';
                    }
                    if (target.style.paddingLeft && target.style.paddingLeft !== '0px') {
                        target.style.paddingLeft = '0';
                    }
                }
            }
        });
    });
    
    // بدء مراقبة body و html
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style']
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style']
    });
    
    // فحص دوري كل 100ms لضمان عدم ظهور المساحة البيضاء
    setInterval(function() {
        // فحص موقع التوب بار
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            const rect = topBar.getBoundingClientRect();
            // إذا كان التوب بار خارج الشاشة لأعلى، أعد ضبط الصفحة
            if (rect.top < -10) {
                enforceNoWhitespace();
                window.scrollTo(0, 0);
            }
        }
        
        // فحص إذا كان هناك scroll غير طبيعي
        if (document.documentElement.scrollLeft > 0) {
            document.documentElement.scrollLeft = 0;
        }
        if (document.body.scrollLeft > 0) {
            document.body.scrollLeft = 0;
        }
    }, 100);
    
    // إجبار الإعدادات عند تغيير حجم الخط
    document.addEventListener('click', function(e) {
        if (e.target.closest('.zoom-in-btn') || e.target.closest('.zoom-out-btn')) {
            setTimeout(enforceNoWhitespace, 0);
            setTimeout(enforceNoWhitespace, 10);
            setTimeout(enforceNoWhitespace, 50);
        }
    });
    
})(); 