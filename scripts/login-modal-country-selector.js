// محدد الدول للنموذج - نسخة موحدة ومحسنة
document.addEventListener('DOMContentLoaded', function() {
    // قائمة الدول المحدثة مع مسارات الأعلام الصحيحة
    const COUNTRIES = [
        { 
            name: 'مصر', 
            code: '+20', 
            flag: '/assets/icons/egypt-flag.svg',
            fallbackFlag: '/assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            countryCode: 'eg'
        },
        { 
            name: 'السعودية', 
            code: '+966', 
            flag: '/assets/icons/saudi-flag.svg',
            fallbackFlag: '/assets/icons/saudi-flag.svg',
            countryCode: 'sa'
        },
        { 
            name: 'الإمارات', 
            code: '+971', 
            flag: '/assets/icons/uae-flag.svg',
            fallbackFlag: '/assets/icons/uae-flag.svg',
            countryCode: 'ae'
        },
        { 
            name: 'البحرين', 
            code: '+973', 
            flag: '/assets/icons/bahrain-flag.svg',
            fallbackFlag: '/assets/icons/bahrain-flag.svg',
            countryCode: 'bh'
        },
        { 
            name: 'الأردن', 
            code: '+962', 
            flag: '/assets/icons/jordan-flag.svg',
            fallbackFlag: '/assets/icons/jordan-flag.svg',
            countryCode: 'jo'
        },
        { 
            name: 'الكويت', 
            code: '+965', 
            flag: '/assets/icons/kuwait-flag.svg',
            fallbackFlag: '/assets/icons/kuwait-flag.svg',
            countryCode: 'kw'
        },
        { 
            name: 'لبنان', 
            code: '+961', 
            flag: '/assets/icons/lebanon-flag.svg',
            fallbackFlag: '/assets/icons/lebanon-flag.svg',
            countryCode: 'lb'
        },
        { 
            name: 'عُمان', 
            code: '+968', 
            flag: '/assets/icons/oman-flag.svg',
            fallbackFlag: '/assets/icons/oman-flag.svg',
            countryCode: 'om'
        },
        { 
            name: 'قطر', 
            code: '+974', 
            flag: '/assets/icons/qatar-flag.svg',
            fallbackFlag: '/assets/icons/qatar-flag.svg',
            countryCode: 'qa'
        },
        { 
            name: 'سوريا', 
            code: '+963', 
            flag: '/assets/icons/syria-flag.svg',
            fallbackFlag: '/assets/icons/syria-flag.svg',
            countryCode: 'sy'
        }
    ];

    // دالة إنشاء عنصر العلم مع تحسينات
    function createFlagElement(country, isDropdown = false) {
        const flagContainer = document.createElement('div');
        flagContainer.style.cssText = `
            width: 24px; 
            height: 18px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            overflow: hidden;
            position: relative;
        `;

        const imgElement = document.createElement('img');
        imgElement.src = country.flag;
        imgElement.alt = country.name;
        imgElement.style.cssText = `
            max-width: 100%; 
            max-height: 100%; 
            object-fit: cover;
            width: 100%;
            height: 100%;
        `;

        // معالجة الخطأ في تحميل الصورة مع احتياطي
        imgElement.onerror = function() {
            this.src = country.fallbackFlag || '/assets/icons/egypt-flag.svg';
        };

        // إضافة كلاس للتمييز
        imgElement.classList.add(isDropdown ? 'dropdown-flag-img' : 'flag-img');

        // منع إضافة أي رموز تعبيرية
        flagContainer.innerHTML = ''; 
        flagContainer.appendChild(imgElement);

        // إضافة رمز الدولة فقط للعلم الرئيسي (غير القائمة المنسدلة)
        if (!isDropdown) {
            const countryCodeSpan = document.createElement('span');
            countryCodeSpan.textContent = country.countryCode || 
                country.name.substring(0, 2).toLowerCase();
            countryCodeSpan.style.cssText = `
                position: absolute;
                bottom: -1px;
                right: -1px;
                background: rgba(255,255,255,0.8);
                padding: 1px 2px;
                border-radius: 2px;
                font-size: 8px;
                color: #333;
                font-weight: bold;
                text-transform: uppercase;
                border: 1px solid rgba(0,0,0,0.1);
            `;
            countryCodeSpan.classList.add('country-code-tag');
            flagContainer.appendChild(countryCodeSpan);
        }

        return flagContainer;
    }

    // دالة تحديث اختيار الدولة مع تحسينات
    function updateCountrySelection(country) {
        // التأكد من وجود العناصر
        const selectedCountry = document.querySelector('.selected-country');
        const countryDropdown = document.querySelector('.country-dropdown');
        const codeSpan = selectedCountry.querySelector('.code');

        if (!selectedCountry || !countryDropdown || !codeSpan) {

            return;
        }

        // إنشاء عنصر العلم الجديد
        const newFlagElement = createFlagElement(country);
        
        // استبدال العلم القديم
        const oldFlagContainer = selectedCountry.querySelector('.flag-img')?.parentElement;
        if (oldFlagContainer) {
            oldFlagContainer.parentNode.replaceChild(newFlagElement, oldFlagContainer);
        }

        // تحديث الكود بشكل مختلف
        codeSpan.textContent = country.code;
        codeSpan.dataset.code = country.code;
        codeSpan.style.display = 'none'; // إخفاء عنصر الكود

        // إغلاق القائمة المنسدلة
        countryDropdown.style.display = 'none';
    }

    // دالة إعادة بناء القائمة المنسدلة
    function rebuildCountryDropdown() {
        const countryDropdown = document.querySelector('.country-dropdown');
        if (!countryDropdown) return;

        countryDropdown.innerHTML = ''; // مسح القائمة الحالية

            COUNTRIES.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.style.cssText = `
                    display: flex;
                    align-items: center;
                padding: 10px 15px; 
                    cursor: pointer;
                gap: 10px; 
                border-bottom: 1px solid rgb(240, 240, 240); 
                font-size: 14px; 
                transition: background-color 0.2s;
                font-family: "Droid Arabic Kufi", sans-serif !important;
            `;

            // إنشاء عنصر العلم للقائمة المنسدلة
            const flagContainer = createFlagElement(country, true);

            // إزالة أي رموز تعبيرية أو عناصر غير مرغوب فيها
            const flagImg = flagContainer.querySelector('img');
            if (flagImg) {
                flagImg.style.width = '24px';
                flagImg.style.height = '18px';
                flagImg.style.objectFit = 'cover';
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = country.name;
            nameSpan.style.cssText = `
                flex: 1 1 0%; 
                color: rgb(51, 51, 51);
                font-family: "Droid Arabic Kufi", sans-serif !important;
            `;

            // إزالة عنصر الكود
            countryItem.appendChild(flagContainer);
            countryItem.appendChild(nameSpan);

            // معالج حدث النقر
            countryItem.addEventListener('click', function(e) {
                    e.stopPropagation();
                updateCountrySelection(country);
            });

            countryDropdown.appendChild(countryItem);
        });
    }

    // دالة تهيئة محدد الدولة
    function initializeCountrySelector() {
        const countrySelector = document.querySelector('.country-code-select');
        if (!countrySelector) return;

        const selectedCountry = countrySelector.querySelector('.selected-country');
        const countryDropdown = countrySelector.querySelector('.country-dropdown');

        // تبديل ظهور/إخفاء القائمة
        function toggleDropdown(e) {
                e.stopPropagation();
                
                // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.country-dropdown').forEach(dropdown => {
                if (dropdown !== countryDropdown) {
                    dropdown.style.display = 'none';
                }
            });

            // تبديل القائمة الحالية
            countryDropdown.style.display = 
                countryDropdown.style.display === 'none' 
                ? 'block' 
                : 'none';
        }

        // إغلاق القائمة عند النقر خارجها
        function closeDropdown(e) {
            if (!countrySelector.contains(e.target)) {
                countryDropdown.style.display = 'none';
            }
        }

        // إزالة المستمعين السابقين لتجنب التراكم
        selectedCountry.removeEventListener('click', toggleDropdown);
        document.removeEventListener('click', closeDropdown);

        // إعادة إضافة المستمعين
        selectedCountry.addEventListener('click', toggleDropdown);
        document.addEventListener('click', closeDropdown);

        // منع انتشار الأحداث داخل القائمة
        countryDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // إعادة بناء القائمة
        rebuildCountryDropdown();
    }

    // تشغيل التهيئة عند تحميل الصفحة
    initializeCountrySelector();

    // إعادة التهيئة عند فتح النموذج
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.addEventListener('show.bs.modal', initializeCountrySelector);
    }

    // مراقبة التغييرات في DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initializeCountrySelector();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// إضافة الأنماط
const style = document.createElement('style');
style.textContent = `
.country-code-select {
    position: relative;
    cursor: pointer;
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    transition: all 0.3s ease;
}

.country-code-select:hover {
    border-color: #007bff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.country-code-select .flag-img {
    width: 24px;
    height: 18px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.country-code-select .code {
    font-size: 14px;
    color: #333;
    font-weight: 500;
}

.country-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    margin-top: 8px;
    max-height: 280px;
    min-width: 280px;
    overflow-y: auto;
    z-index: 1000;
}

.country-item {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #eee;
}

.country-item:last-child {
    border-bottom: none;
}

.country-item:hover {
    background: #f8f9fa;
    transform: translateX(-2px);
}

.country-item .flag-img {
    width: 24px;
    height: 18px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.country-item .country-name {
    flex: 1;
    font-size: 14px;
    color: #333;
}

.country-item .country-code {
    font-size: 14px;
    color: #666;
    background: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
}
`;

document.head.appendChild(style); 

// في نهاية الملف، بعد الأنماط
document.addEventListener('DOMContentLoaded', function() {
    // استدعاء مباشر للتهيئة
    window.initializeCountrySelectors();
}); 