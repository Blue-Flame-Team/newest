// تحديث شامل وعالمي لجميع روابط محرك البحث
(function() {
    'use strict';
    
    const SEARCH_ENGINE_URL = 'http://127.0.0.1:5504/pages/general-search-engine.html';
    
    // تحديث فوري عند تحميل الصفحة
    function immediateUpdate() {
        // تحديث جميع الروابط المباشرة
        const directLinks = document.querySelectorAll('a[href*="general-search-engine"]');
        directLinks.forEach(link => {
            const oldHref = link.href;
            link.href = SEARCH_ENGINE_URL;

        });
        
        // تحديث أزرار محرك البحث
        const engineButtons = document.querySelectorAll('.search-popup-button.engine');
        engineButtons.forEach(button => {
            // إزالة المستمعات القديمة وإضافة جديدة
            button.removeEventListener('click', handleEngineClick);
            button.addEventListener('click', handleEngineClick);
        });
    }
    
    // معالج النقر على زر محرك البحث
    function handleEngineClick(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = SEARCH_ENGINE_URL;
    }
    
    // إعادة تعريف الوظائف العامة
    function overrideGlobalFunctions() {
        // إعادة تعريف أي وظائف عامة للبحث
        if (typeof window.performEngineSearch === 'function') {
            window.performEngineSearch = function() {
                window.location.href = SEARCH_ENGINE_URL;
            };
        }
        
        // إعادة تعريف وظائف البحث مع الاستعلام
        if (typeof window.performSearch === 'function') {
            const originalPerformSearch = window.performSearch;
            window.performSearch = function(query) {
                if (query && query.trim()) {
                    window.location.href = SEARCH_ENGINE_URL + '?q=' + encodeURIComponent(query.trim());
                } else {
                    window.location.href = SEARCH_ENGINE_URL;
                }
            };
        }
    }
    
    // مراقبة التغييرات في DOM
    function setupDOMObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            // تحديث الروابط الجديدة
                            if (node.matches && node.matches('a[href*="general-search-engine"]')) {
                                node.href = SEARCH_ENGINE_URL;
                            }
                            
                            // تحديث الأزرار الجديدة
                            if (node.matches && node.matches('.search-popup-button.engine')) {
                                node.addEventListener('click', handleEngineClick);
                            }
                            
                            // تحديث العناصر الفرعية
                            const childLinks = node.querySelectorAll && node.querySelectorAll('a[href*="general-search-engine"]');
                            if (childLinks) {
                                childLinks.forEach(link => {
                                    link.href = SEARCH_ENGINE_URL;
                                });
                            }
                            
                            const childButtons = node.querySelectorAll && node.querySelectorAll('.search-popup-button.engine');
                            if (childButtons) {
                                childButtons.forEach(button => {
                                    button.addEventListener('click', handleEngineClick);
                                });
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // التحديث الدوري (كل 5 ثوانٍ)
    function setupPeriodicUpdate() {
        setInterval(function() {
            immediateUpdate();
        }, 5000);
    }
    
    // تشغيل التحديث عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            immediateUpdate();
            overrideGlobalFunctions();
            setupDOMObserver();
            setupPeriodicUpdate();
        });
    } else {
        immediateUpdate();
        overrideGlobalFunctions();
        setupDOMObserver();
        setupPeriodicUpdate();
    }
    
    // تشغيل التحديث عند تحميل النافذة
    window.addEventListener('load', function() {
        immediateUpdate();
        overrideGlobalFunctions();
    });
    

})(); 