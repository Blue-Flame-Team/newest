document.addEventListener('DOMContentLoaded', function() {
    // وظيفة لإظهار وإخفاء المحتوى القانوني
    const rulingToggle = document.querySelector('.ruling-toggle');
    const rulingContent = document.querySelector('.ruling-content');
    const toggleIcon = document.querySelector('.toggle-title i');
    
    if (rulingToggle && rulingContent && toggleIcon) {
        // إخفاء المحتوى في البداية
        rulingContent.style.display = 'none';
        
        rulingToggle.addEventListener('click', function() {
            if (rulingContent.style.display === 'none') {
                rulingContent.style.display = 'block';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            } else {
                rulingContent.style.display = 'none';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // وظيفة زر النسخ
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            // الحصول على المحتوى المراد نسخه
            const contentToCopy = document.querySelector('.ruling-content').innerText;
            
            // إنشاء عنصر textarea مؤقت
            const textarea = document.createElement('textarea');
            textarea.value = contentToCopy;
            document.body.appendChild(textarea);
            
            // تحديد ونسخ النص
            textarea.select();
            document.execCommand('copy');
            
            // إزالة textarea المؤقت
            document.body.removeChild(textarea);
            
            // تنبيه التأكيد
            alert('تم نسخ المحتوى بنجاح');
        });
    }
    
    // وظيفة زر الطباعة
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // إنشاء عنصر جديد يحتوي فقط على المحتوى المراد طباعته
            const printContent = document.querySelector('.ruling-content').innerHTML;
            
            // إنشاء نافذة مؤقتة
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            
            // كتابة محتوى HTML بما في ذلك الأنماط
            printWindow.document.write(`
                <html dir="rtl" lang="ar">
                <head>
                    <title>البيع بالتقسيط</title>
                    <style>
                        body {
                            font-family: 'Tajawal', sans-serif;
                            line-height: 1.6;
                            padding: 20px;
                        }
                        .ruling-title {
                            color: #ff7a45;
                            font-size: 24px;
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .islamic-greeting {
                            text-align: center;
                            margin-bottom: 15px;
                        }
                        .resolution-number {
                            text-align: center;
                            margin-bottom: 15px;
                        }
                        h3 {
                            color: #00a59a;
                            text-align: center;
                        }
                        ol {
                            padding-right: 25px;
                        }
                        li {
                            margin-bottom: 15px;
                        }
                        .sub-point {
                            margin-top: 10px;
                            padding-right: 15px;
                        }
                        @media print {
                            body {
                                font-size: 12pt;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-content">
                        ${printContent}
                    </div>
                </body>
                </html>
            `);
            
            // إغلاق المستند وتفعيل الطباعة
            printWindow.document.close();
            
            // الانتظار حتى يتم تحميل الصفحة ثم الطباعة
            setTimeout(function() {
                printWindow.print();
                printWindow.close();
            }, 500);
        });
    }
    
    // وظيفة زر الإبلاغ عن خطأ
    const reportBtn = document.querySelector('.report-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            // إذا لم يكن المستخدم مسجل الدخول، عرض نافذة تسجيل الدخول
            if (!isUserLoggedIn()) {
                const loginModal = document.getElementById('login-modal');
                if (loginModal) {
                    loginModal.style.display = 'flex';
                } else {
                    alert('يرجى تسجيل الدخول أولاً للإبلاغ عن خطأ');
                }
                return;
            }
            
            // إذا كان المستخدم مسجل الدخول، عرض نموذج التقرير
            alert('سيتم توجيهك إلى صفحة الإبلاغ عن الخطأ');
            // هنا ستكون المنطق لعرض نموذج التقرير أو إعادة التوجيه إلى صفحة أخرى
        });
    }
    
    // وظيفة بسيطة للتحقق مما إذا كان المستخدم مسجل الدخول (محاكاة)
    function isUserLoggedIn() {
        // في حالة حقيقية، سيتحقق هذا من ملفات تعريف الارتباط أو localStorage أو جلسة الخادم
        return false; // يعود دائماً بقيمة خاطئة لعرض نافذة تسجيل الدخول
    }
});
