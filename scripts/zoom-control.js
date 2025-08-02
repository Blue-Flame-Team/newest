document.addEventListener('DOMContentLoaded', () => {
    // الدالة الرئيسية للتحكم في حجم الخط
    function controlFontSize(zoomGroup) {
        const zoomInBtn = zoomGroup.querySelector('.zoom-in-btn');
        const zoomOutBtn = zoomGroup.querySelector('.zoom-out-btn');
        
        // الحد الأقصى والأدنى للتكبير
        const MAX_ZOOM = 24;
        const MIN_ZOOM = 12;
        
        // دالة لإزالة !important من جميع الأنماط
        function removeImportantStyles(element) {
            // محاولة إزالة !important من جميع الأنماط المرتبطة بحجم الخط
            const styleProperties = [
                'font-size', 
                'font', 
                'text-size', 
                'line-height'
            ];
            
            styleProperties.forEach(prop => {
                // إزالة الأنماط المضمنة
                if (element.style[prop]) {
                    element.style.setProperty(prop, element.style[prop], null);
                }
                
                // محاولة إزالة الأنماط من ورقة الأنماط
                try {
                    const computedStyle = window.getComputedStyle(element);
                    const importantValue = computedStyle.getPropertyValue(prop);
                    if (importantValue) {
                        element.style.setProperty(prop, importantValue, null);
                    }
                } catch (error) {

                }
            });
        }
        
        // استرجاع حجم الخط الأصلي
        function getOriginalFontSize(element) {
            // محاولة استرجاع الحجم من مصادر مختلفة
            const originalSize = 
                element.getAttribute('data-original-font-size') || 
                element.style.fontSize || 
                window.getComputedStyle(element).fontSize;
            
            return parseFloat(originalSize);
        }
        
        // تعيين حجم الخط مع التغلب على !important
        function setFontSize(element, size) {
            // إزالة الأنماط المهمة
            removeImportantStyles(element);
            
            // تعيين حجم الخط الجديد
            element.style.setProperty('font-size', `${size}px`, 'important');
            element.setAttribute('data-current-font-size', size);
        }
        
        // تحديد العناصر التي سيتم تغيير حجم الخط لها
        const elementsToResize = document.querySelectorAll('body, body *:not(.zoom-group):not(img):not(svg)');
        
        // معالج حدث التكبير
        zoomInBtn.addEventListener('click', () => {
            elementsToResize.forEach(element => {
                const currentSize = parseFloat(
                    element.getAttribute('data-current-font-size') || 
                    getOriginalFontSize(element)
                );
                const newSize = Math.min(currentSize + 2, MAX_ZOOM);
                setFontSize(element, newSize);
            });
        });
        
        // معالج حدث التصغير
        zoomOutBtn.addEventListener('click', () => {
            elementsToResize.forEach(element => {
                const currentSize = parseFloat(
                    element.getAttribute('data-current-font-size') || 
                    getOriginalFontSize(element)
                );
                const newSize = Math.max(currentSize - 2, MIN_ZOOM);
                setFontSize(element, newSize);
            });
        });
    }
    
    // تطبيق التحكم في حجم الخط لكل مجموعة تكبير
    const zoomGroups = document.querySelectorAll('.zoom-group');
    zoomGroups.forEach(controlFontSize);
}); 