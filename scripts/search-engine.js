// محرك البحث العام - وظائف البحث
document.addEventListener('DOMContentLoaded', function() {
    // Check if we need to activate a specific tab on load
    const urlParams = new URLSearchParams(window.location.search);
    const activeTabParam = urlParams.get('tab');
    
    // تحديد العناصر
    const searchTabs = document.querySelectorAll('.search-tabs .search-tab');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchOptions = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    const searchTitle = document.querySelector('.search-engine-title');
    const scopeSection = document.querySelector('.search-scope');
    
    // التبديل بين تبويبات البحث
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الكلاس النشط من جميع التبويبات
            searchTabs.forEach(t => t.classList.remove('active'));
            // إضافة الكلاس النشط إلى التبويب المحدد
            this.classList.add('active');
            
            // تحديث المحتوى بناءً على التبويب المحدد
            const tabText = this.textContent.trim();
            
            // تغيير عنوان الصفحة
            searchTitle.textContent = tabText;
            
            // إخفاء جميع محتويات التبويبات
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            switch(tabText) {
                case 'الباحث العام':
                    // إظهار محتوى الباحث العام
                    document.getElementById('general-search-content').classList.add('active');
                    searchInput.placeholder = 'ابحث في الاحكام والانظمة...';
                    // إظهار قسم مجال البحث وحقل البحث الرئيسي
                    scopeSection.style.display = 'block';
                    document.querySelector('.search-input-container').style.display = 'block';
                    document.querySelector('.search-options').style.display = 'flex';
                    break;
                case 'باحث التعاميم':
                    // إظهار محتوى باحث التعاميم
                    document.getElementById('circulars-search-content').classList.add('active');
                    searchInput.placeholder = 'ابحث في الاحكام والانظمة...';
                    // إخفاء قسم مجال البحث
                    scopeSection.style.display = 'none';
                    // إظهار حقل البحث والخيارات
                    document.querySelector('.search-input-container').style.display = 'block';
                    document.querySelector('.search-options').style.display = 'flex';
                    break;
                case 'باحث أرقام الوثائق':
                    // إظهار محتوى باحث أرقام الوثائق
                    document.getElementById('document-numbers-search-content').classList.add('active');
                    // إخفاء قسم مجال البحث وحقل البحث الرئيسي
                    scopeSection.style.display = 'none';
                    // إخفاء حقل البحث الأصلي والخيارات
                    document.querySelector('.search-input-container').style.display = 'none';
                    document.querySelector('.search-options').style.display = 'none';
                    break;
                case 'باحث الأحكام السعودية':
                    // إظهار محتوى باحث الأحكام السعودية
                    document.getElementById('saudi-judgments-search-content').classList.add('active');
                    // إخفاء قسم مجال البحث وحقل البحث الرئيسي
                    scopeSection.style.display = 'none';
                    // إخفاء حقل البحث والخيارات
                    document.querySelector('.search-input-container').style.display = 'none';
                    document.querySelector('.search-options').style.display = 'none';
                    break;
                case 'باحث الملف الصحفي':
                    // إظهار محتوى باحث الملف الصحفي
                    document.getElementById('press-file-search-content').classList.add('active');
                    searchInput.placeholder = 'كلمات البحث...';
                    // إخفاء قسم مجال البحث
                    scopeSection.style.display = 'none';
                    
                    // إعادة تهيئة القوائم المنسدلة في تبويب الملف الصحفي
                    setTimeout(function() {
                        const dropdownSelects = document.querySelectorAll('#press-file-search-content .dropdown-select');
                        if (dropdownSelects.length > 0) {
                            setupDropdowns();
                        }
                    }, 100);
                    break;
                default:
                    // إظهار محتوى الباحث العام بشكل افتراضي
                    document.getElementById('general-search-content').classList.add('active');
                    searchInput.placeholder = 'ابحث...';
                    // إظهار قسم مجال البحث
                    scopeSection.style.display = 'block';
            }
        });
    });
    
    // تنفيذ البحث عند النقر على زر البحث
    searchButton.addEventListener('click', performSearch);
    
    // إعداد سلوك القوائم المنسدلة
    function setupDropdowns() {
        // الحصول على جميع قوائم الاختيار
        const dropdownsSelected = document.querySelectorAll('.dropdown-selected');
        
        // إضافة معالج وقائع لكل قائمة منسدلة
        dropdownsSelected.forEach(dropdownSelected => {
            const dropdownOptions = dropdownSelected.nextElementSibling;
            
            // معالجة فتح/إغلاق القائمة المنسدلة
            dropdownSelected.addEventListener('click', function() {
                // إغلاق جميع القوائم المنسدلة الأخرى
                dropdownsSelected.forEach(otherDropdown => {
                    if (otherDropdown !== dropdownSelected) {
                        otherDropdown.nextElementSibling.style.display = 'none';
                    }
                });
                
                // تبديل حالة العرض للقائمة الحالية
                dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
            });
            
            // معالجة اختيار عنصر من القائمة
            const options = dropdownOptions.querySelectorAll('.dropdown-option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    dropdownSelected.querySelector('span').textContent = this.textContent;
                    dropdownOptions.style.display = 'none';
                });
            });
        });
        
        // إغلاق جميع القوائم عند النقر خارجها
        document.addEventListener('click', function(e) {
            dropdownsSelected.forEach(dropdownSelected => {
                const dropdownOptions = dropdownSelected.nextElementSibling;
                if (!dropdownSelected.contains(e.target)) {
                    dropdownOptions.style.display = 'none';
                }
            });
        });
    }
    
    // تهيئة القوائم المنسدلة
    setupDropdowns();
    
    // تنفيذ البحث عند الضغط على مفتاح Enter في حقل البحث
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // وظيفة تنفيذ البحث
    function performSearch() {
        // تحديد التبويب النشط
        const activeTab = document.querySelector('.search-tab.active').textContent.trim();
        
        // إذا كنا في تبويب باحث الأحكام السعودية
        if (activeTab === 'باحث الأحكام السعودية') {
            // جمع البيانات من نموذج باحث الأحكام السعودية
            const searchForm = document.querySelector('.saudi-judgments-search-form');
            const formInputs = searchForm.querySelectorAll('.form-input');
            
            // جمع القيم من حقول الإدخال
            const searchData = {
                searchKeywords: formInputs[0].value.trim(),
                judgmentNumber: formInputs[1].value.trim(),
                caseNumber: formInputs[2].value.trim(),
                sessionDateHijri: formInputs[3].value.trim(),
                sessionDateGregorian: formInputs[4].value.trim()
            };
            
            // جمع القيم من القوائم المنسدلة
            const dropdowns = searchForm.querySelectorAll('.dropdown-selected');
            searchData.searchType = dropdowns[0].querySelector('span').textContent.trim();
            searchData.court = dropdowns[1].querySelector('span').textContent.trim();
            searchData.judgmentYear = dropdowns[2].querySelector('span').textContent.trim();
            searchData.caseYear = dropdowns[3].querySelector('span').textContent.trim();
            
            // التحقق من تعبئة على الأقل حقل واحد
            let hasValue = false;
            for (const key in searchData) {
                if (searchData[key] && searchData[key] !== 'البحث عن...' && 
                    searchData[key] !== 'المحكمة...' && 
                    searchData[key] !== 'سنة الحكم/القرار...' && 
                    searchData[key] !== 'سنة القضية...') {
                    hasValue = true;
                    break;
                }
            }
            
            if (!hasValue) {
                alert('الرجاء إدخال معيار واحد على الأقل للبحث');
                return;
            }
            
            // طباعة معلومات البحث في الأحكام السعودية
            
            alert('جاري البحث في الأحكام السعودية...');
            return;
        }
        
        // إذا كنا في تبويب باحث أرقام الوثائق
        else if (activeTab === 'باحث أرقام الوثائق') {
            const documentNumberInput = document.querySelector('.document-number-input');
            const documentNumber = documentNumberInput ? documentNumberInput.value.trim() : '';
            const documentType = document.querySelector('.dropdown-selected span').textContent.trim();
            
            if (!documentNumber) {
                alert('الرجاء إدخال رقم الوثيقة');
                return;
            }
            
            if (documentType === 'نوع الوثيقة') {
                alert('الرجاء اختيار نوع الوثيقة');
                return;
            }
            
            // طباعة معلومات البحث عن أرقام الوثائق
            
            alert('جاري البحث عن ' + documentType + ' رقم: ' + documentNumber);
            return;
        }
        
        // إذا كنا في تبويب باحث الملف الصحفي
        else if (activeTab === 'باحث الملف الصحفي') {
            // جمع البيانات من حقل البحث الرئيسي
            const searchField = document.querySelector('#press-file-search-content .search-field');
            const searchQuery = searchField ? searchField.value.trim() : '';
            
            // جمع البيانات من حقل رقم الوثيقة
            const documentNumberInput = document.querySelector('#press-file-search-content .document-number-input');
            const documentNumber = documentNumberInput ? documentNumberInput.value.trim() : '';
            
            // جمع نوع الوثيقة
            const documentTypeSpan = document.querySelector('#press-file-search-content .dropdown-selected span');
            const documentType = documentTypeSpan ? documentTypeSpan.textContent.trim() : 'نوع الوثيقة';
            
            // جمع نوع البحث (كامل الجملة أو بكل كلمة)
            const searchTypeRadio = document.querySelector('input[name="search-type-press"]:checked');
            const searchType = searchTypeRadio ? searchTypeRadio.nextElementSibling.textContent.trim() : 'كامل الجملة';
            
            // جمع موقع البحث (العناوين أو الموضوعات)
            const searchLocationRadio = document.querySelector('input[name="search-location-press"]:checked');
            const searchLocation = searchLocationRadio ? searchLocationRadio.nextElementSibling.textContent.trim() : 'البحث في العناوين';
            
            // التحقق من تعبئة على الأقل حقل واحد (نص البحث أو رقم الوثيقة)
            if (!searchQuery && !documentNumber) {
                alert('الرجاء إدخال نص للبحث أو رقم الوثيقة');
                return;
            }
            
            // إذا تم إدخال رقم الوثيقة، تحقق من تحديد نوع الوثيقة
            if (documentNumber && documentType === 'نوع الوثيقة') {
                alert('الرجاء اختيار نوع الوثيقة');
                return;
            }
            
            // طباعة معلومات البحث عن الملف الصحفي
            
            if (documentNumber) {
                alert('جاري البحث عن ' + documentType + ' رقم: ' + documentNumber);
            } else {
                alert('جاري البحث عن: ' + searchQuery);
            }
            return;
        }
        
        // للتبويبات الأخرى (الباحث العام، باحث التعاميم)
        const searchQuery = searchInput.value.trim();
        if (!searchQuery) {
            // إظهار رسالة خطأ إذا كان حقل البحث فارغًا
            alert('الرجاء إدخال نص للبحث');
            return;
        }
        
        // تحديد نوع البحث (كامل الجملة أو بكل كلمة)
        const searchType = document.querySelector('input[name="search-type"]:checked').nextSibling.textContent.trim();
        
        // تحديد موقع البحث (العناوين أو الموضوعات)
        const searchLocation = document.querySelector('input[name="search-location"]:checked').nextSibling.textContent.trim();
        
        // جمع مجالات البحث المحددة إذا كانت مرئية
        const searchScopes = [];
        if (scopeSection.style.display !== 'none') {
            document.querySelectorAll('.search-checkbox:checked').forEach(checkbox => {
                searchScopes.push(checkbox.parentElement.textContent.trim());
            });
        }
        
        // طباعة معلومات البحث في وحدة التحكم
        
        // عرض نتائج البحث
        // إظهار قسم نتائج البحث
        document.querySelector('.search-results-container').style.display = 'block';
        
        // يمكن هنا إضافة كود لتحميل نتائج البحث الفعلية من الخادم
    }
});
