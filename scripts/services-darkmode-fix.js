// حل مخصص لمشكلة لون النصوص في قسم الخدمات في وضع التباين الداكن

// متغير للتحقق من مصدر تفعيل الوضع الداكن
(function() {
    let darkModeActivatedByUserClick = false;

// التحقق من وجود نظام التباين الأسود الجديد وعدم التدخل معه
function isNewDarkContrastActive() {
    return document.body.classList.contains('dark-contrast');
}

// مراقبة النقر على زر التباين الداكن
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList && e.target.classList.contains('contrast-dark')) {
        // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
        if (isNewDarkContrastActive()) {
            return;
        }
        
            darkModeActivatedByUserClick = true;
        setTimeout(function() {
            if (document.body.classList.contains('dark-mode')) {
                applySidebarButtonsDarkMode();
                applySubpageStyles();
            }
        }, 100);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // التحقق مما إذا كان وضع التباين الداكن مفعلاً
    if (localStorage.getItem('theme') === 'dark') {
        // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
        if (isNewDarkContrastActive()) {
            return;
        }
        
        // تطبيق المظهر العام فقط عند تحميل الصفحة
        setTimeout(applySidebarButtonsDarkMode, 100);
        
        // تطبيق أنماط الصفحات الفرعية
        setTimeout(applySubpageStyles, 100);
    }

    // مراقبة تغيرات الكلاس على العنصر body للاستجابة عند تفعيل أو إلغاء الوضع الداكن
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const bodyClasses = document.body.classList;
                
                if (bodyClasses.contains('dark-mode')) {
                    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
                    if (isNewDarkContrastActive()) {
                        return;
                    }
                    
                    // تطبيق اللون الأبيض على نصوص الفوتر وقائمة التنقل فوراً عند تفعيل الوضع الداكن
                    makeFooterTextWhite();
                    makeNavMenuTextWhite();
                    applySubpageStyles();
                        darkModeActivatedByUserClick = true;
                    
                    // تأكيد إضافي بعد تأخير قصير
                    setTimeout(function() {
                        makeFooterTextWhite();
                        makeNavMenuTextWhite();
                    }, 200);
                } else {
                    removeAllStyles();
                        darkModeActivatedByUserClick = false;
                    }
                }
        });
    });
    
    bodyObserver.observe(document.body, { attributes: true });
    
    // تطبيق على الفوتر وقائمة التنقل إذا كان الوضع الداكن مفعلاً بالفعل عند تحميل الصفحة
    if (document.body.classList.contains('dark-mode')) {
        makeFooterTextWhite();
        makeNavMenuTextWhite();
    }

        // اختيار جميع الأيقونات التي تدعم وضع التباين الأسود
        const darkModeIcons = document.querySelectorAll('.dark-mode-icon');
        
        // دالة تحديث الأيقونات
        function updateDarkModeIcons() {
            // التحقق من وجود الفئة dark-mode
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            
            
            
            
            darkModeIcons.forEach((icon, index) => {
                const darkSrc = icon.getAttribute('data-dark-src');
                const defaultSrc = icon.getAttribute('src');
                const iconType = icon.getAttribute('data-icon-type') || 'غير محدد';
                

                
                
                
                if (isDarkMode && darkSrc) {
                    icon.setAttribute('src', darkSrc);
                    
                } else {
                    icon.setAttribute('src', defaultSrc);
                    
                }
                

            });
        }
        
        // إضافة مستمع للتغيرات في وضع التباين
        const darkModeToggles = document.querySelectorAll('.dark-mode-toggle, .contrast-toggle, .contrast-dark, .contrast-light');
        darkModeToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // تأخير بسيط للتأكد من تطبيق الفئة
                setTimeout(updateDarkModeIcons, 50);
            });
        });
        
        // تحديث الأيقونات عند التحميل
        updateDarkModeIcons();

        // إضافة دعم للأيقونات الأخرى في صفحة الخدمات
        const servicesIcons = [
            { selector: 'img[src="../assets/icons/book2.svg"]', darkSrc: '../assets/icons/book2-black.svg', type: 'services-book' },
            { selector: 'img[src="../assets/icons/our-services/bank.png"]', darkSrc: '../assets/icons/bank-black.svg', type: 'services-bank' },
            { selector: 'img[src="../assets/icons/our-services/mosq.png"]', darkSrc: '../assets/icons/mosq-black.svg', type: 'services-mosq' }
        ];

        servicesIcons.forEach(iconConfig => {
            const icons = document.querySelectorAll(iconConfig.selector);
            icons.forEach(icon => {
                icon.classList.add('dark-mode-icon');
                icon.setAttribute('data-dark-src', iconConfig.darkSrc);
                icon.setAttribute('data-icon-type', iconConfig.type);
            });
        });

        // طباعة معلومات التصحيح
        
        
    });

// دالة لإزالة جميع الأنماط المطبقة
function removeAllStyles() {
    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
    if (isNewDarkContrastActive()) {
        return;
    }
    
    
    // إزالة الأنماط من جميع العناصر
    const allElements = document.querySelectorAll('*[style]');
    allElements.forEach(element => {
        if (element.style.getPropertyValue('color') === 'white' ||
            element.style.getPropertyValue('background-color') === 'rgb(42, 42, 42)' ||
            element.style.getPropertyValue('background-color') === '#2A2A2A') {
            element.style.removeProperty('color');
            element.style.removeProperty('background-color');
            element.style.removeProperty('border-color');
            element.style.removeProperty('background');
        }
    });
}

// وظيفة خاصة بتطبيق اللون الأبيض على نصوص الفوتر
function makeFooterTextWhite() {
    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
    if (isNewDarkContrastActive()) {
        return;
    }
    
    
    // تحديد جميع عناصر الفوتر
    const allFooterElements = document.querySelectorAll('.footer, .footer *, .main-footer, .main-footer *, .footer-bottom, .footer-bottom *, .footer-top, .footer-top *, .footer-column, .footer-column *, .footer-links, .footer-links *, .footer-menu, .footer-menu *, .footer-info, .footer-info *, .footer-copyright, .footer-copyright *');
    
    // تطبيق اللون الأبيض على جميع العناصر
    allFooterElements.forEach(element => {
        if (element) {
            // تطبيق لون النص الأبيض بشكل مباشر
            element.style.setProperty('color', 'white', 'important');
        }
    });
    
    // تطبيق بشكل خاص على الروابط والعناوين والنصوص
    document.querySelectorAll('.footer a, .footer h1, .footer h2, .footer h3, .footer h4, .footer h5, .footer p, .footer span, .main-footer a, .main-footer h1, .main-footer h2, .main-footer h3, .main-footer h4, .main-footer h5, .main-footer p, .main-footer span').forEach(element => {
        element.style.setProperty('color', 'white', 'important');
    });
}

// وظيفة لتطبيق اللون الأبيض على قائمة التنقل nav-menu
function makeNavMenuTextWhite() {
    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
    if (isNewDarkContrastActive()) {
        return;
    }
    
    
    // التحقق مما إذا كانت الصفحة الحالية هي الصفحة الرئيسية
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html';
    
    // إذا كانت هذه هي الصفحة الرئيسية، فلا نقوم بتطبيق طراز موحد على الناف بار
    if (isHomePage) {
        return; // الخروج من الوظيفة إذا كانت الصفحة الرئيسية
    }
    
    
    // تحديد جميع عناصر قائمة التنقل
    const navMenuElements = document.querySelectorAll('nav, .navbar, .nav-menu, .top-bar, .menu-item, .dropdown-menu, header nav, .nav-container, .navigation, nav *, .navbar *, .nav-menu *, .top-bar *, .menu-item *, .dropdown-menu *, header nav *, .nav-container *, .navigation *');
    
    // تطبيق اللون الأبيض على جميع العناصر
    navMenuElements.forEach(element => {
        if (element) {
            // تطبيق لون النص الأبيض والخلفية الداكنة بشكل مباشر
            element.style.setProperty('color', 'white', 'important');
            // element.style.setProperty('background-color', '#2A2A2A', 'important');
            
            // إذا كان العنصر يحتوي على أسلوب مضمن
            if (element.hasAttribute('style')) {
                const currentStyle = element.getAttribute('style');
                if (!currentStyle.includes('color: white !important')) {
                    element.setAttribute('style', currentStyle + '; color: white !important; background-color: #2A2A2A !important;');
                }
            }
            
            // بالنسبة للعناصر ذات داتا-أوريجينل-فونت-سايز
            if (element.hasAttribute('data-original-font-size')) {
                element.style.setProperty('color', 'white', 'important');
            }
        }
    });
    
    // معالجة خاصة للعناصر التي تحتوي على سمات نمط مضمنة
    document.querySelectorAll('.nav-menu .menu-item[style], .nav-menu .menu-item a[style], .nav-menu .dropdown[style], .nav-menu .dropdown a[style], .nav-menu .dropdown-menu[style], .nav-menu .dropdown-menu a[style], .menu-item[data-original-font-size], .menu-item a[data-original-font-size]').forEach(element => {
        element.style.setProperty('color', 'white', 'important');
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        
        // إذا كان العنصر يحتوي على أسلوب مضمن
        if (element.hasAttribute('style')) {
            const currentStyle = element.getAttribute('style');
            if (!currentStyle.includes('color: white !important')) {
                element.setAttribute('style', currentStyle + '; color: white !important; background-color: #2A2A2A !important;');
            }
        }
    });
    
    // معالجة خاصة لعناصر قائمة التنقل بالتحديد
    document.querySelectorAll('ul.nav-menu li.menu-item, ul.nav-menu li.menu-item a, ul.nav-menu li.dropdown a, ul.nav-menu .dropdown-menu a').forEach(element => {
        element.style.setProperty('color', 'white', 'important');
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        
        // إذا كان العنصر يحتوي على أسلوب مضمن
        if (element.hasAttribute('style')) {
            const currentStyle = element.getAttribute('style');
            if (!currentStyle.includes('color: white !important')) {
                element.setAttribute('style', currentStyle + '; color: white !important; background-color: #2A2A2A !important;');
            }
        }
    });
    
    // تطبيق خلفية داكنة للقوائم المنسدلة
    document.querySelectorAll('.nav-menu .dropdown-menu, .dropdown-menu').forEach(element => {
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        element.style.setProperty('border-color', '#444', 'important');
    });
    
        // معالجة خاصة للصور والأيقونات
    document.querySelectorAll('.nav-menu img.dropdown-arrow, .dropdown img.dropdown-arrow, img, svg, i[class*="fa-"], i[class*="icon"], .icon, .dropdown-arrow, .nav-icon, button img, a img, .button img').forEach(element => {
        // جعل خلفية الأيقونات شفافة بدون خلفية
        element.style.setProperty('background-color', 'transparent', 'important');
        element.style.setProperty('background', 'transparent', 'important');
        
        // للصور والأيقونات التي تنطبق عليها القاعدة
        if (element.tagName === 'IMG' || element.tagName === 'SVG') {
            // لا نقوم بتغيير لون الصورة نفسها
            element.style.setProperty('background-color', 'transparent', 'important');
            
            // للعناصر التي لها أباء
            let parent = element.parentElement;
            if (parent) {
                parent.style.setProperty('background-color', 'transparent', 'important');
                parent.style.setProperty('background', 'transparent', 'important');
            }
        } else if (element.tagName === 'I' || element.classList.contains('icon') || element.classList.contains('nav-icon')) {
            // للأيقونات الأخرى
            element.style.setProperty('background-color', 'transparent', 'important');
            element.style.setProperty('background', 'transparent', 'important');
        }
    });
    
    // معالجة خاصة للعناصر التي تحتوي على صور أو أيقونات
    document.querySelectorAll('.nav-item, .nav-link, .menu-item, .menu-item a, [class*="icon-container"], [class*="-icon"], [class*="_icon"]').forEach(container => {
        if (container.querySelector('img, svg, i[class*="fa-"], i[class*="icon"], .icon')) {
            container.style.setProperty('background-color', 'transparent', 'important');
            container.style.setProperty('background', 'transparent', 'important');
        }
    });
}

// وظيفة لتطبيق الستايل الداكن على الصفحة
function applySidebarButtonsDarkMode() {
    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
    if (isNewDarkContrastActive()) {
        return;
    }
    
    
    // تطبيق اللون الأبيض على نصوص الفوتر وقائمة التنقل
    makeFooterTextWhite();
    makeNavMenuTextWhite();
    
    // استهداف جميع العناصر في قسم الخدمات
    const servicesSection = document.querySelector('.services-section');
    if (!servicesSection) return;
    
    // استهداف أزرار الشريط الجانبي وتطبيق الأسلوب المطلوب
    const sidebarButtons = servicesSection.querySelectorAll('.sidebar-btn');
    sidebarButtons.forEach(button => {
        // تطبيق خلفية سوداء ونص أبيض
        // button.style.setProperty('background-color', '#2A2A2A', 'important');
        button.style.setProperty('color', 'white', 'important');
        // button.style.setProperty('border-color', '#2A2A2A', 'important');
        
        // إضافة الأنماط كخاصية مضمنة
        if (button.hasAttribute('style')) {
            const currentStyle = button.getAttribute('style');
            button.setAttribute('style', currentStyle + '; background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        } else {
            button.setAttribute('style', 'background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        }
    });
    
    // تطبيق اللون الأحمر على عنوان القسم وإزالة الخلفية
    const sectionTitles = servicesSection.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.setProperty('color', 'red', 'important');
        title.style.setProperty('background-color', 'transparent', 'important');
        
        if (title.hasAttribute('style')) {
            const currentStyle = title.getAttribute('style');
            title.setAttribute('style', currentStyle + '; color: red !important; background-color: transparent !important;');
        } else {
            title.setAttribute('style', 'color: red !important; background-color: transparent !important;');
        }
    });
    
    // تطبيق الخلفية السوداء والنص الأبيض على زر التبويب النشط
    const activeTabButtons = servicesSection.querySelectorAll('.tab-publish.active');
    activeTabButtons.forEach(tab => {
        // tab.style.setProperty('background-color', '#2A2A2A', 'important');
        tab.style.setProperty('color', 'white', 'important');
        // tab.style.setProperty('border-color', '#2A2A2A', 'important');
        
        if (tab.hasAttribute('style')) {
            const currentStyle = tab.getAttribute('style');
            tab.setAttribute('style', currentStyle + '; background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        } else {
            tab.setAttribute('style', 'background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        }
    });
    
    // تغيير لون عنوان الاتصال إلى اللون الأسود
    const contactTitles = document.querySelectorAll('.contact-title');
    contactTitles.forEach(title => {
        // title.style.setProperty('color', '#2A2A2A', 'important');
        
        if (title.hasAttribute('style')) {
            const currentStyle = title.getAttribute('style');
            title.setAttribute('style', currentStyle + '; color: #2A2A2A !important;');
        } else {
            title.setAttribute('style', 'color: #2A2A2A !important;');
        }
    });
    
    // تغيير لون عنوان الاشتراك إلى اللون الأسود
    const subscribeTitles = document.querySelectorAll('.subscribe-title');
    subscribeTitles.forEach(title => {
        // title.style.setProperty('color', '#2A2A2A', 'important');
        
        if (title.hasAttribute('style')) {
            const currentStyle = title.getAttribute('style');
            title.setAttribute('style', currentStyle + '; color: #2A2A2A !important;');
        } else {
            title.setAttribute('style', 'color: #2A2A2A !important;');
        }
    });
    
    // تغيير أسلوب زر الاشتراك إلى خلفية سوداء ونص أبيض
    const subscribeButtons = document.querySelectorAll('.subscribe-btn, .subscribe-button');
    subscribeButtons.forEach(button => {
        // button.style.setProperty('background-color', '#2A2A2A', 'important');
        button.style.setProperty('color', 'white', 'important');
        // button.style.setProperty('border-color', '#2A2A2A', 'important');
        
        if (button.hasAttribute('style')) {
            const currentStyle = button.getAttribute('style');
            button.setAttribute('style', currentStyle + '; background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        } else {
            button.setAttribute('style', 'background-color: #2A2A2A !important; color: white !important; border-color: #2A2A2A !important;');
        }
    });
    
    // تحويل لون قسم حقوق النشر إلى اللون الأسود والنص باللون الأبيض
    const copyrightElements = document.querySelectorAll('.copyright');
    copyrightElements.forEach(element => {
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        element.style.setProperty('color', 'white', 'important');
        
        if (element.hasAttribute('style')) {
            const currentStyle = element.getAttribute('style');
            element.setAttribute('style', currentStyle + '; background-color: #2A2A2A !important; color: white !important;');
        } else {
            element.setAttribute('style', 'background-color: #2A2A2A !important; color: white !important;');
        }
    });
    
    // تحويل جميع العناصر ذات الخلفية التي لونها #00665f إلى اللون الأسود
    const elementsWithGreenBg = document.querySelectorAll('[style*="background-color:#00665f"], [style*="background-color: #00665f"], [style*="background:#00665f"], [style*="background: #00665f"]');
    elementsWithGreenBg.forEach(element => {
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        // element.style.setProperty('background', '#2A2A2A', 'important');
        element.style.setProperty('color', 'white', 'important');
        
        if (element.hasAttribute('style')) {
            const currentStyle = element.getAttribute('style');
            element.setAttribute('style', currentStyle + '; background-color: #2A2A2A !important; background: #2A2A2A !important; color: white !important;');
        } else {
            element.setAttribute('style', 'background-color: #2A2A2A !important; background: #2A2A2A !important; color: white !important;');
        }
    });
}

// وظيفة خاصة بتطبيق اللون الأبيض على نصوص الفوتر
function makeFooterTextWhite() {
    // تحديد جميع عناصر الفوتر
    const allFooterElements = document.querySelectorAll('.footer, .footer *, .main-footer, .main-footer *, .footer-bottom, .footer-bottom *, .footer-top, .footer-top *, .footer-column, .footer-column *, .footer-links, .footer-links *, .footer-menu, .footer-menu *, .footer-info, .footer-info *, .footer-copyright, .footer-copyright *');
    
    // تطبيق اللون الأبيض على جميع العناصر
    allFooterElements.forEach(element => {
        if (element) {
            // تطبيق لون النص الأبيض بشكل مباشر
            element.style.setProperty('color', 'white', 'important');
        }
    });
    
    // تطبيق بشكل خاص على الروابط والعناوين والنصوص
    document.querySelectorAll('.footer a, .footer h1, .footer h2, .footer h3, .footer h4, .footer h5, .footer p, .footer span, .main-footer a, .main-footer h1, .main-footer h2, .main-footer h3, .main-footer h4, .main-footer h5, .main-footer p, .main-footer span').forEach(element => {
        element.style.setProperty('color', 'white', 'important');
    });
}

// وظيفة لتطبيق أنماط الصفحات الفرعية في وضع التباين الداكن
function applySubpageStyles() {
    // إذا كان نظام التباين الأسود الجديد نشط، لا نتدخل
    if (isNewDarkContrastActive()) {
        return;
    }
    
    
    // التحقق مما إذا كانت هذه صفحة فرعية وليست الصفحة الرئيسية
    const isHomePage = document.body.classList.contains('home-page');
    if (isHomePage) return;
    
    // تطبيق الخلفية الرمادية الفاتحة على جسم الصفحة
    document.body.style.setProperty('background-color', '#f5f5f5', 'important');
    document.body.style.setProperty('color', '#333', 'important');
    
    // تطبيق الخلفية البيضاء على محتوى الصفحة
    const mainContent = document.querySelector('.main-content, .content-area, .page-content');
    if (mainContent) {
        mainContent.style.setProperty('background-color', 'white', 'important');
        mainContent.style.setProperty('color', '#333', 'important');
    }
    
    // تطبيق الخلفية البيضاء على الأقسام الرئيسية في الصفحة (باستثناء التوب بار والناف بار)
    const mainSections = document.querySelectorAll('section:not(.services-section):not(.contact-section):not(.subscribe-section):not(.footer):not(.copyright):not(.top-bar):not(.navbar)');
    mainSections.forEach(section => {
        section.style.setProperty('background-color', 'white', 'important');
        section.style.setProperty('color', '#333', 'important');
    });
    
    // تطبيق الخلفية البيضاء على المقالات
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.style.setProperty('background-color', 'white', 'important');
        article.style.setProperty('color', '#333', 'important');
    });
    
    // تطبيق الألوان المناسبة على العناصر النصية
    const textElements = document.querySelectorAll('.main-content p, .main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content h6, .main-content li, .main-content a:not(.btn)');
    textElements.forEach(element => {
        element.style.setProperty('color', '#333', 'important');
    });
    
    // تطبيق اللون الداكن على التوب بار والناف بار والنصوص باللون الأبيض
    const navElements = document.querySelectorAll('.top-bar, .navbar, .topbar, .mobile-topbar, nav.navbar, .nav-container, header, header nav, .top-icons, .nav-links');
    navElements.forEach(element => {
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        element.style.setProperty('color', 'white', 'important');
        
        // تطبيق لون النص الأبيض على جميع العناصر في التوب بار والناف بار
        const childElements = element.querySelectorAll('*');
        childElements.forEach(child => {
            child.style.setProperty('color', 'white', 'important');
        });
        
        // تطبيق على الروابط والأزرار بشكل خاص
        const linkElements = element.querySelectorAll('a, button, .btn');
        linkElements.forEach(link => {
            link.style.setProperty('color', 'white', 'important');
        });
    });
    
    // تطبيق اللون الأبيض على نصوص الفوتر
    const footerElements = document.querySelectorAll('.footer, .footer-bottom, .main-footer, .footer-top, .footer-column, .footer-links, .footer-menu, .footer-info, .footer-copyright');
    footerElements.forEach(element => {
        // element.style.setProperty('background-color', '#2A2A2A', 'important');
        element.style.setProperty('color', 'white', 'important');
        
        // تطبيق لون النص الأبيض على جميع العناصر في الفوتر
        const childElements = element.querySelectorAll('*');
        childElements.forEach(child => {
            child.style.setProperty('color', 'white', 'important');
        });
        
        // تطبيق على الروابط بشكل خاص
        const linkElements = element.querySelectorAll('a');
        linkElements.forEach(link => {
            link.style.setProperty('color', 'white', 'important');
        });
    });
}
})();
