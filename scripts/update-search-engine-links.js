// تحديث شامل لروابط محرك البحث
document.addEventListener('DOMContentLoaded', function() {
    const searchEngineURL = 'http://127.0.0.1:5504/pages/general-search-engine.html';
    
    // تحديث جميع أزرار محرك البحث
    function updateSearchEngineButtons() {
        // أزرار محرك البحث في النوافذ المنبثقة
        const engineButtons = document.querySelectorAll('.search-popup-button.engine, button:contains("محرك البحث")');
        engineButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = searchEngineURL;
            });
        });
        
        // روابط محرك البحث المباشرة
        const engineLinks = document.querySelectorAll('a[href*="general-search-engine"]');
        engineLinks.forEach(link => {
            link.href = searchEngineURL;
        });
        
        // أزرار "التعرف على المزيد" التي تؤدي لمحرك البحث
        const moreButtons = document.querySelectorAll('.more-btn[href*="general-search-engine"]');
        moreButtons.forEach(button => {
            button.href = searchEngineURL;
        });
    }
    
    // تحديث وظائف البحث مع الاستعلام
    function updateSearchFunctions() {
        // إعادة تعريف وظيفة البحث العامة
        window.performSearchWithQuery = function(query) {
            if (query && query.trim()) {
                window.location.href = searchEngineURL + '?q=' + encodeURIComponent(query.trim());
            } else {
                window.location.href = searchEngineURL;
            }
        };
        
        // تحديث أزرار البحث
        const searchButtons = document.querySelectorAll('.search-popup-button.search, .search-btn');
        searchButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const searchInput = document.querySelector('.search-popup-input, .search-input');
                if (searchInput) {
                    const query = searchInput.value.trim();
                    window.performSearchWithQuery(query);
                } else {
                    window.location.href = searchEngineURL;
                }
            });
        });
    }
    
    // تحديث أحداث Enter في حقول البحث
    function updateSearchInputs() {
        const searchInputs = document.querySelectorAll('.search-popup-input, .search-input');
        searchInputs.forEach(input => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = this.value.trim();
                    window.performSearchWithQuery(query);
                }
            });
        });
    }
    
    // تشغيل جميع التحديثات
    updateSearchEngineButtons();
    updateSearchFunctions();
    updateSearchInputs();
    
    // مراقبة إضافة عناصر جديدة للصفحة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // تحديث الأزرار الجديدة
                        if (node.matches && node.matches('.search-popup-button.engine')) {
                            node.addEventListener('click', function(e) {
                                e.preventDefault();
                                window.location.href = searchEngineURL;
                            });
                        }
                        
                        // تحديث الروابط الجديدة
                        if (node.matches && node.matches('a[href*="general-search-engine"]')) {
                            node.href = searchEngineURL;
                        }
                        
                        // تحديث العناصر الفرعية
                        const childEngineButtons = node.querySelectorAll && node.querySelectorAll('.search-popup-button.engine');
                        if (childEngineButtons) {
                            childEngineButtons.forEach(button => {
                                button.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    window.location.href = searchEngineURL;
                                });
                            });
                        }
                        
                        const childEngineLinks = node.querySelectorAll && node.querySelectorAll('a[href*="general-search-engine"]');
                        if (childEngineLinks) {
                            childEngineLinks.forEach(link => {
                                link.href = searchEngineURL;
                            });
                        }
                    }
                });
            }
        });
    });
    
    // بدء مراقبة التغييرات
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    

}); 