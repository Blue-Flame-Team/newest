// محدد الدول - مودال متعدد الاستخدامات
(function(window) {
    'use strict';

    // قائمة الدول الكاملة مع أرقام الهواتف
    const COUNTRIES = [
        { 
            name: 'مصر', 
            code: '+20', 
            flag: '/assets/icons/egypt-flag.svg',
            fallbackFlag: '/assets/icons/flag-for-flag-egypt-svgrepo-com 1.png',
            countryCode: 'eg',
            phoneRegex: '^(010|011|012|015)\\d{8}$'
        },
        { 
            name: 'السعودية', 
            code: '+966', 
            flag: '/assets/icons/saudi-flag.svg',
            fallbackFlag: '/assets/icons/saudi-flag.svg',
            countryCode: 'sa',
            phoneRegex: '^(05)\\d{8}$'
        },
        { 
            name: 'الإمارات', 
            code: '+971', 
            flag: '/assets/icons/uae-flag.svg',
            fallbackFlag: '/assets/icons/uae-flag.svg',
            countryCode: 'ae',
            phoneRegex: '^(05)\\d{8}$'
        },
        { 
            name: 'البحرين', 
            code: '+973', 
            flag: '/assets/icons/bahrain-flag.svg',
            fallbackFlag: '/assets/icons/bahrain-flag.svg',
            countryCode: 'bh',
            phoneRegex: '^(3|66)\\d{6}$'
        },
        { 
            name: 'الأردن', 
            code: '+962', 
            flag: '/assets/icons/jordan-flag.svg',
            fallbackFlag: '/assets/icons/jordan-flag.svg',
            countryCode: 'jo',
            phoneRegex: '^(07)\\d{8}$'
        },
        { 
            name: 'الكويت', 
            code: '+965', 
            flag: '/assets/icons/kuwait-flag.svg',
            fallbackFlag: '/assets/icons/kuwait-flag.svg',
            countryCode: 'kw',
            phoneRegex: '^(5|6|9)\\d{7}$'
        },
        { 
            name: 'لبنان', 
            code: '+961', 
            flag: '/assets/icons/lebanon-flag.svg',
            fallbackFlag: '/assets/icons/lebanon-flag.svg',
            countryCode: 'lb',
            phoneRegex: '^(03|70|71|76|78|79)\\d{6}$'
        },
        { 
            name: 'سوريا', 
            code: '+963', 
            flag: '/assets/icons/syria-flag.svg',
            fallbackFlag: '/assets/icons/syria-flag.svg',
            countryCode: 'sy',
            phoneRegex: '^(09)\\d{8}$'
        },
        { 
            name: 'فلسطين', 
            code: '+970', 
            flag: '/assets/icons/palestine-flag.svg',
            fallbackFlag: '/assets/icons/palestine-flag.svg',
            countryCode: 'ps',
            phoneRegex: '^(05|059|056)\\d{7}$'
        }
    ];

    // فئة محدد الدول مع دعم الهاتف
    class CountrySelector {
        constructor(options = {}) {
            // الإعدادات الافتراضية
            this.options = {
                targetSelector: '.country-code-select', // المحدد الافتراضي
                phoneInputSelector: '.phone-input', // محدد حقل الهاتف
                onSelect: null, // دالة اختيار اختيارية
                defaultCountry: 'مصر', // الدولة الافتراضية
                validatePhone: true, // التحقق من صحة رقم الهاتف
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
            // تعديل لدعم المحددات المختلفة
            if (typeof this.options.targetSelector === 'string') {
                // إذا كان محدد نصي
                this.container = document.querySelector(this.options.targetSelector);
            } else if (this.options.targetSelector instanceof HTMLElement) {
                // إذا كان عنصر HTML مباشر
                this.container = this.options.targetSelector;
            } else {

                return;
            }

            if (!this.container) {

                return;
            }

            // إنشاء القائمة المنسدلة إذا لم تكن موجودة
            this.createDropdown();

            // تحديد العناصر الداخلية
            this.flagContainer = this.container.querySelector('.country-flag');
            this.currentFlag = this.flagContainer.querySelector('.flag-img');
            this.currentCode = this.container.querySelector('.code');

            // تعيين الدولة الافتراضية
            const defaultCountry = COUNTRIES.find(c => c.name === this.options.defaultCountry) || COUNTRIES[0];
            this.setCountry(defaultCountry);
        }

        // إنشاء القائمة المنسدلة
        createDropdown() {
            // التأكد من عدم وجود القائمة بالفعل
            if (document.getElementById('country-dropdown')) return;

            // إنشاء القائمة المنسدلة
            const dropdown = document.createElement('div');
            dropdown.id = 'country-dropdown';
            dropdown.style.cssText = `
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 450px;
                max-height: 70vh;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                z-index: 99999; /* أعلى مستوى z-index ممكن */
                overflow-y: auto;
                direction: rtl;
                padding: 15px;
                font-family: 'Droid Arabic Kufi', sans-serif;
            `;

            // إنشاء عنوان للقائمة
            const title = document.createElement('h3');
            title.textContent = 'اختر الدولة';
            title.style.cssText = `
                text-align: center;
                margin-bottom: 15px;
                color: #333;
            `;
            dropdown.appendChild(title);

            // إنشاء حقل البحث
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'البحث عن دولة';
            searchInput.style.cssText = `
                width: 95%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
            `;
            dropdown.appendChild(searchInput);

            // إضافة خيارات الدول
            COUNTRIES.forEach(country => {
                const option = document.createElement('div');
                option.className = 'country-option';
                option.setAttribute('data-flag', country.flag);
                option.setAttribute('data-code', country.code);
                option.setAttribute('data-phone-regex', country.phoneRegex);
                option.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    border-bottom: 1px solid #eee;
                `;

                option.innerHTML = `
                    <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                    <span class="country-name" style="flex-grow: 1;">${country.name}</span>
                    <span class="country-code">${country.code}</span>
                `;

                dropdown.appendChild(option);
            });

            // إنشاء زر الإغلاق
            const closeButton = document.createElement('button');
            closeButton.textContent = 'إغلاق';
            closeButton.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-top: 15px;
                background-color: #17A891;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
            dropdown.appendChild(closeButton);

            // إضافة القائمة إلى الجسم
            document.body.appendChild(dropdown);

            // إعداد حدث البحث
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const options = dropdown.querySelectorAll('.country-option');
                
                options.forEach(option => {
                    const name = option.querySelector('.country-name').textContent.toLowerCase();
                    const code = option.querySelector('.country-code').textContent.toLowerCase();
                    
                    if (name.includes(searchTerm) || code.includes(searchTerm)) {
                        option.style.display = 'flex';
                    } else {
                        option.style.display = 'none';
                    }
                });
            });

            // إعداد زر الإغلاق
            closeButton.addEventListener('click', () => this.closeDropdown());

            return dropdown;
        }

        // إعداد الأحداث
        setupEvents() {
            // التأكد من وجود القائمة
            const ensureDropdown = () => {
                let dropdown = document.getElementById('country-dropdown');
                if (!dropdown) {
                    dropdown = this.createDropdown();
                }
                return dropdown;
            };

            // إعداد أحداث اختيار الدول
            const setupCountrySelection = (dropdown) => {
                const dropdownOptions = dropdown.querySelectorAll('.country-option');
                
                dropdownOptions.forEach(option => {
                    // إزالة الأحداث السابقة لتجنب التراكم
                    option.removeEventListener('click', countrySelectHandler);
                    
                    // إضافة حدث جديد
                    option.addEventListener('click', countrySelectHandler);
                });
            };

            // معالج اختيار الدولة
            const countrySelectHandler = (e) => {
                e.stopPropagation();
                const option = e.currentTarget;
                
                const country = {
                    name: option.querySelector('.country-name').textContent,
                    code: option.getAttribute('data-code'),
                    flag: option.getAttribute('data-flag'),
                    phoneRegex: option.getAttribute('data-phone-regex')
                };

                // تحديث الدولة
                this.setCountry(country);
                
                // إغلاق القائمة
                this.closeDropdown();
            };

            // فتح القائمة
            this.container.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = ensureDropdown();
                setupCountrySelection(dropdown);
                this.toggleDropdown();
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                const dropdown = document.getElementById('country-dropdown');
                if (dropdown && 
                    !dropdown.contains(e.target) && 
                    !this.container.contains(e.target)) {
                    this.closeDropdown();
                }
            });

            // إنشاء القائمة أول مرة
            const initialDropdown = ensureDropdown();
            setupCountrySelection(initialDropdown);
        }

        // تبديل القائمة المنسدلة
        toggleDropdown() {
            const dropdown = document.getElementById('country-dropdown');
            if (dropdown.style.display === 'block') {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        }

        // فتح القائمة المنسدلة
        openDropdown() {
            // التأكد من وجود القائمة
            let dropdown = document.getElementById('country-dropdown');
            if (!dropdown) {
                dropdown = this.createDropdown();
            }
            
            // إنشاء طبقة التراكب الشفافة
            const overlay = document.createElement('div');
            overlay.id = 'country-dropdown-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                direction: rtl;
            `;
            
            // إنشاء حاوية النافذة المنبثقة
            const modalContainer = document.createElement('div');
            modalContainer.style.cssText = `
                background-color: white;
                width: 90%;
                max-width: 450px;
                max-height: 70vh;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                overflow-y: auto;
            `;
            
            // إنشاء عنوان النافذة
            const title = document.createElement('h2');
            title.textContent = 'اختر الدولة';
            title.style.cssText = `
                text-align: center;
                margin-bottom: 15px;
                color: #00a19a;
                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
            `;
            modalContainer.appendChild(title);
            
            // إضافة حقل البحث
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'البحث عن دولة';
            searchInput.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                text-align: right;
                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
            `;
            modalContainer.appendChild(searchInput);
            
            // إضافة قائمة الدول
            const countriesList = document.createElement('div');
            countriesList.style.cssText = `
                max-height: 300px;
                overflow-y: auto;
            `;
            
            // إنشاء عناصر الدول
            COUNTRIES.forEach(country => {
                const countryItem = document.createElement('div');
                countryItem.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.3s;
                `;
                
                countryItem.innerHTML = `
                    <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                    <span style="flex-grow: 1;">${country.name}</span>
                    <span>${country.code}</span>
                `;
                
                countryItem.addEventListener('click', () => {
                    // تحديث الدولة
                    this.setCountry(country);
                    
                    // إغلاق النافذة
                    overlay.remove();
                });
                
                countriesList.appendChild(countryItem);
            });
            
            // إضافة قائمة الدول للحاوية
            modalContainer.appendChild(countriesList);
            
            // إضافة زر الإغلاق
            const closeButton = document.createElement('button');
            closeButton.textContent = 'إغلاق';
            closeButton.style.cssText = `
                width: 100%;
                padding: 10px;
                margin-top: 15px;
                background-color: #00a19a;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
            `;
            closeButton.addEventListener('click', () => {
                overlay.remove();
            });
            modalContainer.appendChild(closeButton);
            
            // إضافة حدث البحث
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const countryItems = countriesList.querySelectorAll('div');
                
                countryItems.forEach(item => {
                    const countryName = item.querySelector('span:first-of-type').textContent.toLowerCase();
                    const countryCode = item.querySelector('span:last-of-type').textContent.toLowerCase();
                    
                    if (countryName.includes(searchTerm) || countryCode.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
            
            // إضافة الحاوية للطبقة
            overlay.appendChild(modalContainer);
            
            // إضافة الطبقة للجسم
            document.body.appendChild(overlay);
            
            // إغلاق عند النقر خارج النافذة
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                }
            });
        }

        // إغلاق القائمة المنسدلة
        closeDropdown() {
            const overlay = document.getElementById('country-dropdown-overlay');
            const dropdown = document.getElementById('country-dropdown');
            
            if (overlay) {
                document.body.removeChild(overlay);
            }
            
            dropdown.style.display = 'none';
            this.container.classList.remove('active');
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

    // تهيئة تلقائية لجميع عناصر country-code-select
    document.addEventListener('DOMContentLoaded', () => {
        const countryCodeSelects = document.querySelectorAll('.country-code-select, .country-selector, .country-code-container');


        countryCodeSelects.forEach((select, index) => {


            // إنشاء عناصر محدد الدولة بشكل ديناميكي إذا لم تكن موجودة
            let flagContainer = select.querySelector('.country-flag');
            if (!flagContainer) {

                const flagWrapper = document.createElement('div');
                flagWrapper.className = 'country-flag';
                flagWrapper.style.cssText = `
                    width: 80px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f8f9fa;
                    gap: 3px;
                    padding: 0 8px;
                    cursor: pointer;
                `;
                flagWrapper.innerHTML = `
                    <span class="code" style="font-family: 'Droid Arabic Kufi', Arial, sans-serif; font-size: 12px; color: #666; font-weight: 500;">+20</span>
                    <img src="../assets/icons/call-arrow.svg" alt="Arrow" style="width: 8px; height: 8px; opacity: 0.6;">
                    <img class="flag-img" src="../assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg" alt="Egypt Flag" style="width: 16px; height: 11px;">
                `;
                select.appendChild(flagWrapper);
                flagContainer = flagWrapper;
            }

            // إنشاء محدد الدول
            const countrySelector = new CountrySelector({
                targetSelector: select, // تمرير العنصر مباشرة
                defaultCountry: 'مصر', // الدولة الافتراضية
                onSelect: (country) => {

                    // تحديث العلم ورمز الدولة بشكل يدوي
                    const codeSpan = flagContainer.querySelector('.code');
                    const flagImg = flagContainer.querySelector('.flag-img');
                    
                    if (codeSpan) codeSpan.textContent = country.code;
                    if (flagImg) {
                        flagImg.src = country.flag;
                        flagImg.alt = country.name;
                    }
                }
            });

            // إضافة حدث النقر للعنصر
            if (flagContainer) {
                flagContainer.addEventListener('click', (e) => {

                    e.stopPropagation();
                    
                    // التأكد من وجود القائمة
                    const dropdown = document.getElementById('country-dropdown') || countrySelector.createDropdown();

                    
                    // فتح القائمة
                    countrySelector.openDropdown();
                });
            } else {

            }
        });
    });
})(window); 