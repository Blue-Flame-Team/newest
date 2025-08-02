// إصلاح شامل لزر طلب خدمة الأسانيد
// يضمن فتح النافذة الصحيحة "خدمة الاسانيد القانونية" وليس النافذة الخطأ

(function() {
    'use strict';
    
    
    // تعطيل دالة auth-system.js فوراً
    window._showAsanidServiceForm = function() {
        
        // إزالة أي نوافذ خاطئة فوراً
        const wrongModals = document.querySelectorAll('#asanid-form-modal, .asanid-form-modal, #subscribe-modal, .profile-edit-modal');
        wrongModals.forEach(modal => {
            if (modal && modal.remove) {
                modal.remove();
            }
        });
        
        // فتح النافذة الصحيحة
        setTimeout(() => {
            if (typeof showAsanidServicePopup === 'function') {
                showAsanidServicePopup();
            } else {

            }
        }, 50);
    };
    
    // دالة إصلاح الأزرار
    function fixAsanidButton(element) {
        if (!element || element.hasAttribute('data-ultimate-asanid-fixed')) return;
        
        const text = element.textContent || element.innerText || '';
        if (text.includes('طلب خدمة الأسانيد')) {
            
            // إزالة جميع الأحداث الموجودة
            const newElement = element.cloneNode(true);
            if (element.parentNode) {
                element.parentNode.replaceChild(newElement, element);
            }
            
            // إزالة الروابط والأحداث القديمة
            newElement.removeAttribute('href');
            newElement.removeAttribute('onclick');
            newElement.style.cursor = 'pointer';
            
            // إضافة حدث جديد
            newElement.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                
                // إزالة أي نوافذ خاطئة
                document.querySelectorAll('#asanid-form-modal, .asanid-form-modal, #subscribe-modal, .profile-edit-modal, .modal').forEach(modal => {
                    if (modal.style) modal.style.display = 'none';
                    if (modal.remove && (modal.id === 'asanid-form-modal' || modal.classList.contains('asanid-form-modal') || modal.id === 'subscribe-modal')) {
                        modal.remove();
                    }
                });
                
                // فتح النافذة الصحيحة بعد تأخير قصير
                setTimeout(() => {
                    if (typeof showAsanidServicePopup === 'function') {
                        showAsanidServicePopup();
                    } else {

                        
                        // محاولة البحث عن الدالة
                        for (let prop in window) {
                            if (typeof window[prop] === 'function' && prop.toLowerCase().includes('asanid')) {
                                try {
                                    window[prop]();
                                    break;
                                } catch (e) {
                                }
                            }
                        }
                    }
                }, 100);
                
                return false;
            }, true);
            
            newElement.setAttribute('data-ultimate-asanid-fixed', 'true');
        }
    }
    
    // دالة إصلاح جميع الأزرار
    function fixAllAsanidButtons() {
        
        // البحث في جميع العناصر
        const allElements = document.querySelectorAll('*');
        allElements.forEach(fixAsanidButton);
        
        // البحث المخصص في العناصر الأكثر شيوعاً
        const commonSelectors = [
            'a', 'button', '.btn', '.dashboard-btn', '.sidebar-btn', 
            '[onclick]', '[href]', '.menu-item', '.service-card'
        ];
        
        commonSelectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(fixAsanidButton);
            } catch (e) {
            }
        });
    }
    
    // تشغيل الإصلاح عند تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // تجاوز AuthSystem إذا وُجد
            if (window.AuthSystem) {
                window.AuthSystem._showAsanidServiceForm = window._showAsanidServiceForm;
                window.AuthSystem.showAsanidServiceForm = window._showAsanidServiceForm;
            }
            
            // إصلاح فوري
            setTimeout(fixAllAsanidButtons, 100);
            setTimeout(fixAllAsanidButtons, 500);
            setTimeout(fixAllAsanidButtons, 1000);
            setTimeout(fixAllAsanidButtons, 2000);
        });
    } else {
        // إذا كان DOM محمل بالفعل
        if (window.AuthSystem) {
            window.AuthSystem._showAsanidServiceForm = window._showAsanidServiceForm;
            window.AuthSystem.showAsanidServiceForm = window._showAsanidServiceForm;
        }
        
        setTimeout(fixAllAsanidButtons, 100);
        setTimeout(fixAllAsanidButtons, 500);
        setTimeout(fixAllAsanidButtons, 1000);
        setTimeout(fixAllAsanidButtons, 2000);
    }
    
    // مراقبة إضافة عناصر جديدة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                setTimeout(() => {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            fixAsanidButton(node);
                            if (node.querySelectorAll) {
                                node.querySelectorAll('*').forEach(fixAsanidButton);
                            }
                        }
                    });
                }, 100);
            }
        });
    });
    
    // بدء المراقبة عند تحميل الصفحة
    setTimeout(() => {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }, 500);
    
    // إصلاح دوري كل 3 ثوان
    setInterval(fixAllAsanidButtons, 3000);
    
})(); 