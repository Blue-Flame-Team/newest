// دالة عامة لفتح القائمة المنسدلة للدول
function openCountryDropdown(element) {
    // إزالة القائمة المنسدلة السابقة إن وجدت
    const existingDropdown = document.getElementById('country-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    // إنشاء القائمة المنسدلة
    const dropdown = document.createElement('div');
    dropdown.id = 'country-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        margin-top: 5px;
        display: block;
    `;
    
    // قائمة الدول
    const countries = [
        { name: 'مصر', code: '+20', flag: '../assets/icons/flag-for-flag-egypt-svgrepo-com 1.svg' },
        { name: 'السعودية', code: '+966', flag: '../assets/icons/saudi-flag.svg' },
        { name: 'الإمارات', code: '+971', flag: '../assets/icons/uae-flag.svg' },
        { name: 'الأردن', code: '+962', flag: '../assets/icons/jordan-flag.svg' },
        { name: 'البحرين', code: '+973', flag: '../assets/icons/bahrain-flag.svg' },
        { name: 'الكويت', code: '+965', flag: '../assets/icons/kuwait-flag.svg' },
        { name: 'لبنان', code: '+961', flag: '../assets/icons/lebanon-flag.svg' },
        { name: 'سوريا', code: '+963', flag: '../assets/icons/syria-flag.svg' },
        { name: 'قطر', code: '+974', flag: '../assets/icons/qatar-flag.svg' }
    ];
    
    // إنشاء عناصر الدول
    const countriesHTML = countries.map(country => `
        <div class="country-option" data-code="${country.code}" data-flag="${country.flag}" style="
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        ">
            <img src="${country.flag}" alt="${country.name}" style="width: 24px; height: 16px; margin-left: 10px;">
            <span>${country.name} (${country.code})</span>
        </div>
    `).join('');
    
    dropdown.innerHTML = countriesHTML;
    
    // معالج حدث اختيار الدولة
    dropdown.addEventListener('click', (e) => {
        const selectedOption = e.target.closest('.country-option');
        if (selectedOption) {
            const code = selectedOption.getAttribute('data-code');
            const flag = selectedOption.getAttribute('data-flag');
            
            // تحديث الزر بالدولة المختارة
            const codeSpan = element.querySelector('span');
            const flagImg = element.querySelector('img[alt="Egypt Flag"]');
            
            if (codeSpan) codeSpan.textContent = code;
            if (flagImg) flagImg.src = flag;
            
            // إزالة القائمة المنسدلة
            dropdown.remove();
        }
    });
    
    // إضافة القائمة إلى النافذة
    element.appendChild(dropdown);
    
    // إغلاق القائمة عند النقر خارجها
    const closeDropdown = (e) => {
        if (!dropdown.contains(e.target) && e.target !== element) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    };
    
    // تأخير إضافة الحدث لتجنب إغلاق القائمة فورًا
    setTimeout(() => {
        document.addEventListener('click', closeDropdown);
    }, 0);
} 