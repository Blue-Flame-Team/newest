document.addEventListener('DOMContentLoaded', function() {
    // قائمة الدول
    const countries = [
        { name: 'مصر', code: '+20', flag: '../assets/icons/flag-for-flag-egypt-svgrepo-com 1.png' },
        { name: 'السعودية', code: '+966', flag: '../assets/icons/saudi-flag.svg' },
        { name: 'الإمارات', code: '+971', flag: '../assets/icons/uae-flag.svg' }
    ];

    function initializeLoginCountrySelector() {
        const selector = document.querySelector('.login-modal .country-code-select');
        if (!selector) return;

        // إضافة السهم للقائمة
        const arrow = document.createElement('span');
        arrow.className = 'dropdown-arrow';
        arrow.innerHTML = '▼';
        arrow.style.cssText = `
            margin-right: 5px;
            font-size: 12px;
            color: #666;
        `;
        selector.appendChild(arrow);

        // إنشاء القائمة المنسدلة
        // const dropdown = document.createElement('div');
        // dropdown.className = 'login-country-dropdown';
        // dropdown.style.cssText = `
        //     display: none;
        //     position: absolute;
        //     top: 100%;
        //     left: 0;
        //     width: 100%;
        //     background: white;
        //     border: 1px solid #ddd;
        //     border-radius: 0 0 8px 8px;
        //     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        //     z-index: 1000;
        //     margin-top: -1px;
        // `;

        // إضافة الدول للقائمة
        countries.forEach(country => {
            const item = document.createElement('div');
            item.className = 'country-item';
            item.style.cssText = `
                display: flex;
                align-items: center;
                padding: 10px;
                cursor: pointer;
                transition: background 0.2s;
            `;
            item.innerHTML = `
                <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 18px; margin-left: 10px;">
                <span style="flex: 1;">${country.name}</span>
                <span style="color: #666;">${country.code}</span>
            `;

            item.addEventListener('mouseenter', () => {
                item.style.background = '#f5f5f5';
            });

            item.addEventListener('mouseleave', () => {
                item.style.background = 'white';
            });

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const flagImg = selector.querySelector('.flag-img');
                const codeSpan = selector.querySelector('.code');
                
                if (flagImg && codeSpan) {
                    flagImg.src = country.flag;
                    flagImg.alt = country.name;
                    codeSpan.textContent = country.code;
                }
                
                dropdown.style.display = 'none';
                selector.classList.remove('active');
                arrow.style.transform = 'rotate(0deg)';
            });

            dropdown.appendChild(item);
        });

        selector.appendChild(dropdown);

        // تحسين موضع القائمة
        selector.style.position = 'relative';

        // معالجة النقر على المحدد
        selector.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            
            // إغلاق أي قوائم مفتوحة أخرى
            document.querySelectorAll('.login-country-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                    d.parentElement.classList.remove('active');
                    d.parentElement.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
                }
            });

            dropdown.style.display = isOpen ? 'none' : 'block';
            selector.classList.toggle('active', !isOpen);
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
            selector.classList.remove('active');
            arrow.style.transform = 'rotate(0deg)';
        });
    }

    // تهيئة عند تحميل الصفحة
    initializeLoginCountrySelector();

    // إعادة التهيئة عند فتح النافذة المنبثقة
    document.addEventListener('click', (e) => {
        if (e.target.matches('.login-btn, .login-modal-trigger')) {
            setTimeout(initializeLoginCountrySelector, 300);
        }
    });

    // مراقبة التغييرات في DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                setTimeout(initializeLoginCountrySelector, 100);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 