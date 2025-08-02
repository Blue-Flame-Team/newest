/**
 * Enhanced Country Dropdown Script
 * نسخة محسنة ومستقرة من قائمة الدول للعمل بشكل موثوق على GitHub Pages
 */

(function() {
    'use strict';
    
    
    // بيانات الدول مع أعلام متنوعة
    const countries = [
        { 
            name: 'مصر', 
            code: '+20', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/egypt-flag.svg'
        },
        { 
            name: 'المملكة العربية السعودية', 
            code: '+966', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'الإمارات العربية المتحدة', 
            code: '+971', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'الكويت', 
            code: '+965', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'البحرين', 
            code: '+973', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'قطر', 
            code: '+974', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'عمان', 
            code: '+968', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'الأردن', 
            code: '+962', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'لبنان', 
            code: '+961', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        },
        { 
            name: 'سوريا', 
            code: '+963', 
            flag: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            flagAlt: 'assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg'
        }
    ];
    
    let dropdownElement = null;
    let isDropdownVisible = false;
    
    // إنشاء القائمة المنسدلة
    function createDropdown() {
        if (dropdownElement) {
            return dropdownElement;
        }
        
        dropdownElement = document.createElement('div');
        dropdownElement.id = 'countryDropdownEnhanced';
        dropdownElement.className = 'country-dropdown-enhanced';
        
        // تطبيق التنسيق
        Object.assign(dropdownElement.style, {
            position: 'fixed',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '999999',
            maxHeight: '300px',
            overflowY: 'auto',
            minWidth: '250px',
            display: 'none',
            direction: 'rtl',
            fontFamily: '"Droid Arabic Kufi", Arial, sans-serif'
        });
        
        // إضافة الدول
        countries.forEach((country, index) => {
            const item = createCountryItem(country, index);
            dropdownElement.appendChild(item);
        });
        
        document.body.appendChild(dropdownElement);
        
        return dropdownElement;
    }
    
    // إنشاء عنصر دولة
    function createCountryItem(country, index) {
        const item = document.createElement('div');
        item.className = 'country-item';
        item.dataset.countryCode = country.code;
        item.dataset.countryName = country.name;
        
        Object.assign(item.style, {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 15px',
            cursor: 'pointer',
            gap: '10px',
            borderBottom: index < countries.length - 1 ? '1px solid #f0f0f0' : 'none',
            fontSize: '14px',
            transition: 'background-color 0.2s ease'
        });
        
        // HTML العنصر مع معالجة الأخطاء للصور
        item.innerHTML = `
            <img src="${country.flag}" 
                 alt="${country.name}" 

                 style="width: 24px; height: 18px; border-radius: 3px; object-fit: cover; flex-shrink: 0;">
            <span style="flex: 1; color: #333; font-weight: 400;">${country.name}</span>
            <span style="color: #666; font-weight: 500; font-size: 13px;">${country.code}</span>
        `;
        
        // أحداث التفاعل
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
        
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            selectCountry(country);
        });
        
        return item;
    }
    
    // اختيار دولة
    function selectCountry(country) {
        
        // تحديث جميع العناصر النشطة
        const activeSelectors = document.querySelectorAll('.country-code-select.active');
        activeSelectors.forEach(selector => {
            updateSelectorDisplay(selector, country);
        });
        
        // إغلاق القائمة
        hideDropdown();
        
        // إرسال حدث مخصص
        const event = new CustomEvent('countrySelected', {
            detail: {
                name: country.name,
                code: country.code,
                flag: country.flag
            }
        });
        document.dispatchEvent(event);
    }
    
    // تحديث عرض المحدد
    function updateSelectorDisplay(selector, country) {
        const flagImg = selector.querySelector('.flag-img');
        const codeSpan = selector.querySelector('.code');
        
        if (flagImg) {
            flagImg.src = country.flag;
            flagImg.alt = country.name;
            flagImg.onerror = function() {
                this.onerror = null;
                this.src = country.flagAlt || country.flag;
            };
        }
        
        if (codeSpan) {
            codeSpan.textContent = country.code;
        }
        
        // إضافة attribute للدولة المختارة
        selector.dataset.selectedCountry = country.code;
        selector.dataset.selectedCountryName = country.name;
    }
    
    // إظهار القائمة
    function showDropdown(triggerElement) {
        if (!dropdownElement) {
            createDropdown();
        }
        
        // حساب الموقع
        const rect = triggerElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        dropdownElement.style.top = (rect.bottom + scrollTop + 5) + 'px';
        dropdownElement.style.left = (rect.left + scrollLeft) + 'px';
        dropdownElement.style.width = Math.max(rect.width, 250) + 'px';
        dropdownElement.style.display = 'block';
        
        isDropdownVisible = true;
        
        // تأكد من وضع active class
        triggerElement.classList.add('active');
    }
    
    // إخفاء القائمة
    function hideDropdown() {
        if (dropdownElement) {
            dropdownElement.style.display = 'none';
        }
        
        isDropdownVisible = false;
        
        // إزالة active class من جميع المحددات
        document.querySelectorAll('.country-code-select').forEach(selector => {
            selector.classList.remove('active');
        });
        
    }
    
    // إعداد العناصر المحددة
    function setupSelectors() {
        const selectors = document.querySelectorAll('.country-code-select');
        
        selectors.forEach((selector, index) => {
            // إزالة المستمعات القديمة إذا وجدت
            selector.removeEventListener('click', handleSelectorClick);
            
            // إضافة المستمع الجديد
            selector.addEventListener('click', handleSelectorClick);
            
        });
    }
    
    // معالج النقر على المحدد
    function handleSelectorClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const selector = e.currentTarget;
        
        // إغلاق المحددات الأخرى
        document.querySelectorAll('.country-code-select').forEach(s => {
            if (s !== selector) {
                s.classList.remove('active');
            }
        });
        
        // تبديل عرض القائمة
        if (isDropdownVisible && selector.classList.contains('active')) {
            hideDropdown();
        } else {
            showDropdown(selector);
        }
    }
    
    // إعداد أحداث النقر العامة
    function setupGlobalEvents() {
        document.addEventListener('click', function(e) {
            // إذا كان النقر خارج المحدد والقائمة
            if (!e.target.closest('.country-code-select') && 
                !e.target.closest('#countryDropdownEnhanced')) {
                hideDropdown();
            }
        });
        
        // إغلاق عند الضغط على Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isDropdownVisible) {
                hideDropdown();
            }
        });
        
    }
    
    // تهيئة النظام
    function init() {
        
        // انتظار تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initializeSystem, 100);
            });
        } else {
            setTimeout(initializeSystem, 100);
        }
    }
    
    function initializeSystem() {
        try {
            setupSelectors();
            setupGlobalEvents();
            
            // فحص دوري لعناصر جديدة
            setInterval(function() {
                const currentSelectors = document.querySelectorAll('.country-code-select');
                const setupSelectors = document.querySelectorAll('.country-code-select[data-setup="true"]');
                
                if (currentSelectors.length > setupSelectors.length) {
                    setupSelectors();
                    
                    // وضع علامة على المحددات المعدة
                    currentSelectors.forEach(selector => {
                        selector.dataset.setup = 'true';
                    });
                }
            }, 2000);
            
            
        } catch (error) {

        }
    }
    
    // إتاحة الدوال للاستخدام العام
    window.CountryDropdownSystem = {
        init,
        showDropdown,
        hideDropdown,
        selectCountry,
        setupSelectors,
        countries
    };
    
    // بدء التشغيل التلقائي
    init();
    
})(); 