// نظام تحميل الملفات البرمجية بشكل آمن
const ScriptLoader = {
    // تحميل ملف برمجي بشكل آمن
    loadScript: function(src, type = 'text/javascript') {
        return new Promise((resolve, reject) => {
            // التحقق من وجود الملف البرمجي بالفعل
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }

            // إنشاء عنصر الملف البرمجي
            const script = document.createElement('script');
            script.src = src;
            script.type = type;
            script.async = true;

            // معالجة نجاح التحميل
            script.onload = () => {
                
                resolve();
            };

            // معالجة فشل التحميل
            script.onerror = () => {

                reject(new Error(`فشل تحميل الملف البرمجي: ${src}`));
            };

            // إضافة الملف البرمجي للصفحة
            document.head.appendChild(script);
        });
    },

    // تحميل عدة ملفات برمجية
    loadScripts: function(scripts) {
        return Promise.all(scripts.map(script => 
            this.loadScript(script.src, script.type)
        ));
    }
};

// تحميل الملفات البرمجية الأساسية
document.addEventListener('DOMContentLoaded', () => {
    const requiredScripts = [
        { src: '/scripts/modal-manager.js', type: 'text/javascript' },
        { src: '/scripts/login-modal-country-selector.js', type: 'text/javascript' },
        { src: '/scripts/asanid-modal.js', type: 'text/javascript' }
    ];

    ScriptLoader.loadScripts(requiredScripts)
        .then(() => {
            
        })
        .catch(error => {

        });
}); 