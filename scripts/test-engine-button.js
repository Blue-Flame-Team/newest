// اختبار زر محرك البحث
document.addEventListener('DOMContentLoaded', function() {

    
    // انتظار قليل للتأكد من تحميل جميع العناصر
    setTimeout(function() {
        testEngineButton();
    }, 1000);
    
    function testEngineButton() {
        // البحث عن جميع أزرار محرك البحث
        const engineButtons = document.querySelectorAll('.search-popup-button.engine');

        
        if (engineButtons.length === 0) {

            return;
        }
        
        // اختبار كل زر
        engineButtons.forEach((button, index) => {




            
            // إضافة مستمع أحداث جديد للتأكد
            button.addEventListener('click', function(e) {


                
                // التأكد من الانتقال
                e.preventDefault();
                window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
            });
        });
        

    }
    
    // إضافة زر اختبار في أعلى الصفحة
    function addTestButton() {
        const testButton = document.createElement('button');
        testButton.textContent = 'اختبار محرك البحث';
        testButton.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 9999;
            background: #ff6b35;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Droid Arabic Kufi', sans-serif;
        `;
        
        testButton.addEventListener('click', function() {

            window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
        });
        
        document.body.appendChild(testButton);
    }
    
    // إضافة زر الاختبار
    addTestButton();
    
    // مراقبة إضافة أزرار جديدة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.matches && node.matches('.search-popup-button.engine')) {

                        node.addEventListener('click', function(e) {

                            e.preventDefault();
                            window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 