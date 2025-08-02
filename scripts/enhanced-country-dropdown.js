/**
 * Enhanced Country Dropdown - نظام قائمة الدول المحسن
 * يعمل بشكل موثوق على GitHub Pages مع معالجة الأخطاء
 */

(function() {
    'use strict';
    

    
    // بيانات الدول مع أعلام مناسبة (CDN + SVG محلي)
    const countries = [
        { 
            name: 'مصر', 
            code: '+20', 
            flag: '../assets/icons/egypt-flag.svg',
            flagLocal: '../assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg',
            flagEmoji: '🇪🇬',
            colors: ['#FF0000', '#FFFFFF', '#000000'], // أحمر، أبيض، أسود
            fullName: 'جمهورية مصر العربية'
        },
        { 
            name: 'السعودية', 
            code: '+966', 
            flag: '../assets/icons/saudi-flag.svg',
            flagLocal: '../assets/icons/saudi-flag.svg',
            flagEmoji: '🇸🇦',
            colors: ['#006C35', '#FFFFFF'], // أخضر، أبيض
            fullName: 'المملكة العربية السعودية'
        },
        { 
            name: 'الإمارات', 
            code: '+971', 
            flag: '../assets/icons/uae-flag.svg',
            flagLocal: '../assets/icons/uae-flag.svg',
            flagEmoji: '🇦🇪',
            colors: ['#FF0000', '#00FF00', '#FFFFFF', '#000000'], // أحمر، أخضر، أبيض، أسود
            fullName: 'دولة الإمارات العربية المتحدة'
        },
        { 
            name: 'الكويت', 
            code: '+965', 
            flag: '../assets/icons/kuwait-flag.svg',
            flagLocal: '../assets/icons/kuwait-flag.svg',
            flagEmoji: '🇰🇼',
            colors: ['#007A3D', '#FFFFFF', '#CE1126', '#000000'], // أخضر، أبيض، أحمر، أسود
            fullName: 'دولة الكويت'
        },
        { 
            name: 'البحرين', 
            code: '+973', 
            flag: '../assets/icons/bahrain-flag.svg',
            flagLocal: '../assets/icons/bahrain-flag.svg',
            flagEmoji: '🇧🇭',
            colors: ['#CE1126', '#FFFFFF'], // أحمر، أبيض
            fullName: 'مملكة البحرين'
        },
        { 
            name: 'قطر', 
            code: '+974', 
            flag: '../assets/icons/qatar-flag.svg',
            flagLocal: '../assets/icons/qatar-flag.svg',
            flagEmoji: '🇶🇦',
            colors: ['#8D1B3D', '#FFFFFF'], // خمري، أبيض
            fullName: 'دولة قطر'
        },
        { 
            name: 'عُمان', 
            code: '+968', 
            flag: '../assets/icons/oman-flag.svg',
            flagLocal: '../assets/icons/oman-flag.svg',
            flagEmoji: '🇴🇲',
            colors: ['#FF0000', '#FFFFFF', '#008000'], // أحمر، أبيض، أخضر
            fullName: 'سلطنة عُمان'
        },
        { 
            name: 'الأردن', 
            code: '+962', 
            flag: '../assets/icons/jordan-flag.svg',
            flagLocal: '../assets/icons/jordan-flag.svg',
            flagEmoji: '🇯🇴',
            colors: ['#000000', '#FFFFFF', '#007A3D', '#CE1126'], // أسود، أبيض، أخضر، أحمر
            fullName: 'المملكة الأردنية الهاشمية'
        },
        { 
            name: 'لبنان', 
            code: '+961', 
            flag: '../assets/icons/lebanon-flag.svg',
            flagLocal: '../assets/icons/lebanon-flag.svg',
            flagEmoji: '🇱🇧',
            colors: ['#ED1C24', '#FFFFFF', '#00A651'], // أحمر، أبيض، أخضر
            fullName: 'الجمهورية اللبنانية'
        },
        { 
            name: 'سوريا', 
            code: '+963', 
            flag: '../assets/icons/syria-flag.svg',
            flagLocal: '../assets/icons/syria-flag.svg',
            flagEmoji: '🇸🇾',
            colors: ['#CE1126', '#FFFFFF', '#000000', '#007A3D'], // أحمر، أبيض، أسود، أخضر
            fullName: 'الجمهورية العربية السورية'
        }
    ];
    
    let dropdown = null;
    let isVisible = false;
    
    // إنشاء القائمة
    function createDropdown() {
        if (dropdown) return dropdown;
        
        dropdown = document.createElement('div');
        dropdown.id = 'enhancedCountryDropdown';
        
        // تنسيق القائمة
        Object.assign(dropdown.style, {
            position: 'fixed',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '99999',
            maxHeight: '300px',
            overflowY: 'auto',
            minWidth: '250px',
            display: 'none',
            direction: 'rtl',
            fontFamily: '"Droid Arabic Kufi", Arial, sans-serif'
        });
        
        // إضافة الدول
        countries.forEach((country, index) => {
            const item = document.createElement('div');
            item.style.cssText = `
                display: flex;
                align-items: center;
                padding: 12px 15px;
                cursor: pointer;
                gap: 10px;
                border-bottom: ${index < countries.length - 1 ? '1px solid #f0f0f0' : 'none'};
                font-size: 14px;
                transition: background-color 0.2s ease;
            `;
            
            // إنشاء العنصر مع fallback متعدد المراحل
            const flagContainer = document.createElement('div');
            flagContainer.style.cssText = 'width: 24px; height: 18px; display: flex; align-items: center; justify-content: center;';
            
            const flagImg = document.createElement('img');
            flagImg.src = country.flag;
            flagImg.alt = country.name;
            flagImg.style.cssText = 'width: 24px; height: 18px; border-radius: 3px; object-fit: cover;';
            
            // Fallback chain: CDN → Local SVG → Emoji
            flagImg.onerror = function() {

                
                // محاولة المسار البديل
                if (country.flagLocal && this.src !== country.flagLocal) {
                    
                    this.src = country.flagLocal;
                    return;
                }
                
                // إخفاء الصورة وعرض الرمز التعبيري
                this.style.display = 'none';
                const emojiSpan = document.createElement('span');
                emojiSpan.textContent = country.flagEmoji;
                emojiSpan.style.cssText = `
                    font-size: 18px; 
                    width: 24px; 
                    height: 18px;
                    text-align: center; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center;
                    border-radius: 3px;
                    background-color: #f0f0f0;
                `;
                this.parentNode.insertBefore(emojiSpan, this.nextSibling);
            };
            
            flagContainer.appendChild(flagImg);
            
            const nameSpan = document.createElement('span');
            nameSpan.style.cssText = 'flex: 1; color: #333;';
            nameSpan.textContent = country.name;
            
            const codeSpan = document.createElement('span');
            codeSpan.style.cssText = 'color: #666; font-weight: 500;';
            codeSpan.textContent = country.code;
            
            item.appendChild(flagContainer);
            item.appendChild(nameSpan);
            item.appendChild(codeSpan);
            
            // أحداث التفاعل
            item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f8f9fa');
            item.addEventListener('mouseleave', () => item.style.backgroundColor = '');
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectCountry(country);
            });
            
            dropdown.appendChild(item);
        });
        
        document.body.appendChild(dropdown);
        return dropdown;
    }
    
    // اختيار دولة
    function selectCountry(country) {
        
        // تحديث العناصر النشطة
        const activeSelectors = document.querySelectorAll('.country-code-select.active');
        activeSelectors.forEach(selector => {
            const flagImg = selector.querySelector('.flag-img');
            const codeSpan = selector.querySelector('.code');
            
            if (flagImg) {
                flagImg.src = country.flag;
                flagImg.alt = country.name;
                // إضافة fallback للأعلام
                flagImg.onerror = function() {
                    this.style.display = 'none';
                    // إنشاء عنصر emoji كبديل
                    const emojiSpan = document.createElement('span');
                    emojiSpan.textContent = country.flagEmoji;
                    emojiSpan.style.cssText = 'font-size: 16px; width: 20px; text-align: center;';
                    this.parentNode.insertBefore(emojiSpan, this.nextSibling);
                };
            }
            
            if (codeSpan) {
                codeSpan.textContent = country.code;
            }
            
            // حفظ بيانات الدولة المختارة
            selector.dataset.selectedCountry = country.code;
            selector.dataset.selectedCountryName = country.name;
        });
        
        hideDropdown();
        
        // حدث مخصص مع معلومات إضافية
        document.dispatchEvent(new CustomEvent('countrySelected', {
            detail: {
                ...country,
                timestamp: new Date().getTime()
            }
        }));
    }
    
    // إظهار القائمة
    function showDropdown(trigger) {
        if (!dropdown) createDropdown();
        
        const rect = trigger.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        dropdown.style.left = (rect.left + window.scrollX) + 'px';
        dropdown.style.display = 'block';
        
        isVisible = true;
        trigger.classList.add('active');
    }
    
    // إخفاء القائمة
    function hideDropdown() {
        if (dropdown) dropdown.style.display = 'none';
        document.querySelectorAll('.country-code-select').forEach(s => s.classList.remove('active'));
        isVisible = false;
    }
    
    // إعداد المحددات
    function setupSelectors() {
        const selectors = document.querySelectorAll('.country-code-select');
        
        selectors.forEach((selector, index) => {
            // إزالة المستمع القديم
            const newSelector = selector.cloneNode(true);
            selector.parentNode.replaceChild(newSelector, selector);
            
            // إضافة مستمع جديد
            newSelector.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (isVisible && newSelector.classList.contains('active')) {
                    hideDropdown();
                } else {
                    document.querySelectorAll('.country-code-select').forEach(s => s.classList.remove('active'));
                    showDropdown(newSelector);
                }
            });
        });
    }
    
    // إعداد الأحداث العامة
    function setupEvents() {
        // إغلاق عند النقر خارجياً
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.country-code-select') && 
                !e.target.closest('#enhancedCountryDropdown')) {
                hideDropdown();
            }
        });
        
        // إغلاق بـ Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isVisible) hideDropdown();
        });
    }
    
    // التهيئة
    function init() {
        
        const initSystem = () => {
            try {
                setupSelectors();
                setupEvents();
                
                // مراقبة العناصر الجديدة كل ثانيتين
                setInterval(() => {
                    const currentCount = document.querySelectorAll('.country-code-select').length;
                    const setupCount = document.querySelectorAll('.country-code-select[data-enhanced="true"]').length;
                    
                    if (currentCount > setupCount) {
                        setupSelectors();
                        document.querySelectorAll('.country-code-select').forEach(s => s.dataset.enhanced = 'true');
                    }
                }, 2000);
            } catch (error) {

            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => setTimeout(initSystem, 100));
        } else {
            setTimeout(initSystem, 100);
        }
    }
    
    // إتاحة للاستخدام العام
    window.EnhancedCountryDropdown = {
        init,
        showDropdown,
        hideDropdown,
        selectCountry,
        setupSelectors,
        countries
    };
    
    // تشغيل تلقائي
    init();
    
})(); 