// محدد الدول - مودال متعدد الاستخدامات
(function(window) {
    'use strict';

    // قائمة الدول الكاملة
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
            name: 'سوريا', 
            code: '+963', 
            flag: '/assets/icons/syria-flag.svg',
            fallbackFlag: '/assets/icons/syria-flag.svg',
            countryCode: 'sy'
        },
        { 
            name: 'فلسطين', 
            code: '+970', 
            flag: '/assets/icons/palestine-flag.svg',
            fallbackFlag: '/assets/icons/palestine-flag.svg',
            countryCode: 'ps'
        }
    ];

    // فئة محدد الدول
    class CountrySelector {
        constructor(options = {}) {
            // الإعدادات الافتراضية
            this.options = {
                targetSelector: '.country-select', // المحدد الافتراضي
                onSelect: null, // دالة اختيار اختيارية
                defaultCountry: 'السعودية', // الدولة الافتراضية
                ...options
            };

            // تهيئة العناصر
            this.initElements();
            
            // إعداد الأحداث
            this.setupEvents();
        }

        // تهيئة العناصر
        initElements() {
            // العثور على العناصر الرئيسية
            this.container = document.querySelector(this.options.targetSelector);
            if (!this.container) {

                return;
            }

            // إنشاء القائمة المنسدلة إذا لم تكن موجودة
            this.createDropdown();

            // تحديد العناصر الداخلية
            this.flagCircle = this.container.querySelector('.flag-circle');
            this.currentFlag = this.container.querySelector('.flag-img');
            this.currentCode = this.container.querySelector('.code');
            this.dropdown = this.container.querySelector('.country-dropdown');
            this.dropdownOptions = this.dropdown.querySelectorAll('.country-option');

            // تعيين الدولة الافتراضية
            const defaultCountry = COUNTRIES.find(c => c.name === this.options.defaultCountry) || COUNTRIES[0];
            this.setCountry(defaultCountry);
        }

        // إنشاء القائمة المنسدلة
        createDropdown() {
            // التأكد من عدم وجود القائمة بالفعل
            if (this.container.querySelector('.country-dropdown')) return;

            // إنشاء القائمة المنسدلة
            const dropdown = document.createElement('div');
            dropdown.className = 'country-dropdown';
            dropdown.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                z-index: 1100;
                max-height: 200px;
                overflow-y: auto;
                direction: rtl;
                margin-top: 5px;
            `;

            // إضافة خيارات الدول
            COUNTRIES.forEach(country => {
                const option = document.createElement('div');
                option.className = 'country-option';
                option.setAttribute('data-flag', country.flag);
                option.setAttribute('data-code', country.code);
                option.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                `;

                option.innerHTML = `
                    <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                    <span class="country-name" style="flex-grow: 1;">${country.name}</span>
                    <span class="country-code">${country.code}</span>
                `;

                dropdown.appendChild(option);
            });

            this.container.appendChild(dropdown);
        }

        // إعداد الأحداث
        setupEvents() {
            // فتح وإغلاق القائمة المنسدلة
            this.flagCircle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });

            // اختيار دولة
            this.dropdownOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const newFlag = option.getAttribute('data-flag');
                    const newCode = option.getAttribute('data-code');
                    const countryName = option.querySelector('.country-name').textContent;

                    this.setCountry({
                        name: countryName,
                        code: newCode,
                        flag: newFlag
                    });
                });
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target)) {
                    this.closeDropdown();
                }
            });
        }

        // تبديل القائمة المنسدلة
        toggleDropdown() {
            this.container.classList.toggle('active');
            this.dropdown.style.display = this.container.classList.contains('active') ? 'block' : 'none';
        }

        // إغلاق القائمة المنسدلة
        closeDropdown() {
            this.container.classList.remove('active');
            this.dropdown.style.display = 'none';
        }

        // تعيين الدولة
        setCountry(country) {
            // تحديث العلم ورمز الدولة
            this.currentFlag.src = country.flag;
            this.currentFlag.alt = country.name;
            this.currentCode.textContent = country.code;

            // إغلاق القائمة
            this.closeDropdown();

            // تنفيذ دالة الاختيار إن وجدت
            if (typeof this.options.onSelect === 'function') {
                this.options.onSelect(country);
            }

            // إرسال حدث مخصص
            const event = new CustomEvent('countrySelected', {
                detail: country
            });
            this.container.dispatchEvent(event);
        }

        // الحصول على الدولة الحالية
        getCurrentCountry() {
            return {
                name: this.currentFlag.alt,
                code: this.currentCode.textContent,
                flag: this.currentFlag.src
            };
        }
    }

    // تصدير الفئة للاستخدام العالمي
    window.CountrySelector = CountrySelector;
})(window);

// مثال على الاستخدام:
// document.addEventListener('DOMContentLoaded', () => {
//     // إنشاء محدد دولة في نموذج تسجيل الدخول
//     const loginCountrySelector = new CountrySelector({
//         targetSelector: '.login-country-select',
//         onSelect: (country) => {

//         }
//     });
//
//     // إنشاء محدد دولة في نموذج الاشتراك
//     const subscribeCountrySelector = new CountrySelector({
//         targetSelector: '.subscribe-country-select',
//         defaultCountry: 'مصر'
//     });
// }); 