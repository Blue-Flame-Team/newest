document.addEventListener('DOMContentLoaded', function() {
    

    // قائمة الدول المدعومة مع تحديث المسارات
    const COUNTRIES = [
        { name: 'مصر', code: '+20', flag: '../assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg' },
        { name: 'السعودية', code: '+966', flag: '../assets/icons/saudi-flag.svg' },
        { name: 'الإمارات', code: '+971', flag: '../assets/icons/uae-flag.svg' }
    ];

    // تصحيح مسارات الصور بناءً على الموقع الحالي
    // function fixImagePath(path) {
    //     if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    //         return path.replace('../', '');
    //     }
    //     return path;
    // }

    // دالة إنشاء وإعداد محدد الدولة
    function setupCountryDropdown(container) {
        // تجاهل القوائم التي ليست في نافذة تسجيل الدخول
        if (!container.closest('.login-modal') || container.getAttribute('data-initialized') === 'true') {
            return;
        }

        

        const flagImg = container.querySelector('.flag-img') || 
                       container.querySelector('.country-flag img');
        const codeSpan = container.querySelector('.code');
        
        if (!flagImg || !codeSpan) {

            return;
        }

        // let dropdown = container.querySelector('.country-dropdown');
        // if (!dropdown) {
        //     dropdown = document.createElement('div');
        //     dropdown.className = 'country-dropdown';
        //     dropdown.style.cssText = `
        //         display: none;
        //         position: absolute;
        //         top: 100%;
        //         left: 0;
        //         width: 100%;
        //         background: white;
        //         border: 1px solid #ddd;
        //         border-radius: 8px;
        //         box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        //         z-index: 1100;
        //         max-height: 200px;
        //         overflow-y: auto;
        //         direction: rtl;
        //     `;
        //     container.appendChild(dropdown);
        // }

        // dropdown.innerHTML = '';

        COUNTRIES.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.style.cssText = `
                display: flex;
                align-items: center;
                padding: 10px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;

            const imgPath = fixImagePath(country.flag);
            countryItem.innerHTML = `
                <img src="${imgPath}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px; object-fit: cover;">
                <span style="flex-grow: 1;">${country.name}</span>
                <span class="country-code">${country.code}</span>
            `;

            countryItem.addEventListener('click', (e) => {
                e.stopPropagation();
                flagImg.src = imgPath;
                flagImg.alt = country.name;
                codeSpan.textContent = country.code;
                dropdown.style.display = 'none';
                container.classList.remove('active');
            });

            countryItem.addEventListener('mouseenter', () => {
                countryItem.style.backgroundColor = '#f0f0f0';
            });
            countryItem.addEventListener('mouseleave', () => {
                countryItem.style.backgroundColor = 'transparent';
            });

            // dropdown.appendChild(countryItem);
        });

        // تأكيد الموضع النسبي للحاوية
        if (window.getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        function toggleDropdown(e) {
            e.stopPropagation();
            
            // إغلاق جميع القوائم الأخرى
            document.querySelectorAll('.country-dropdown').forEach(dd => {
                if (dd !== dropdown) {
                    dd.style.display = 'none';
                    dd.closest('.country-code-select').classList.remove('active');
                }
            });

            const isCurrentlyHidden = dropdown.style.display === 'none';
            dropdown.style.display = isCurrentlyHidden ? 'block' : 'none';
            container.classList.toggle('active', isCurrentlyHidden);
        }

        container.addEventListener('click', toggleDropdown);

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                // dropdown.style.display = 'none';
                container.classList.remove('active');
            }
        });

        container.setAttribute('data-initialized', 'true');
    }

    // تهيئة محددات الدول في نافذة تسجيل الدخول
    function initializeCountrySelectors() {
        const loginModal = document.querySelector('.login-modal');
        if (!loginModal) return;

        const countrySelectors = loginModal.querySelectorAll('.country-code-select');
        // countrySelectors.forEach(setupCountryDropdown);
    }

    // تهيئة أولية
    initializeCountrySelectors();

    // إعادة التهيئة عند فتح النوافذ المنبثقة
    document.addEventListener('click', function(e) {
        if (e.target.matches('.login-btn, .login-modal-trigger')) {
            setTimeout(initializeCountrySelectors, 300);
        }
    });

    // مراقبة التغييرات في DOM
    const observer = new MutationObserver(() => {
        setTimeout(initializeCountrySelectors, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // إعادة التهيئة عند تحميل الصفحة بالكامل
    window.addEventListener('load', initializeCountrySelectors);
}); 
