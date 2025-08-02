const fs = require('fs');
const path = require('path');

// مسار مجلد الصفحات
const pagesDir = './pages';

// السكريبت المراد إضافته
const scriptToAdd = '<script src="../scripts/subpages-contrast-fix.js"></script>';

// البحث عن نمط السكريبتات الموجودة
const scriptPattern = '<script src="../scripts/subpages-dark-contrast.js"></script>';

// الحصول على جميع ملفات HTML في مجلد الصفحات
const htmlFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));



htmlFiles.forEach(file => {
    const filePath = path.join(pagesDir, file);
    
    try {
        // قراءة محتوى الملف
        let content = fs.readFileSync(filePath, 'utf8');
        
        // التحقق من وجود السكريبت المطلوب إضافته
        if (content.includes(scriptToAdd)) {
            
            return;
        }
        
        // التحقق من وجود السكريبت المرجعي
        if (content.includes(scriptPattern)) {
            // إضافة السكريبت الجديد بعد السكريبت المرجعي
            content = content.replace(
                scriptPattern,
                scriptPattern + '\n    ' + scriptToAdd
            );
            
            // كتابة المحتوى المحدث
            fs.writeFileSync(filePath, content, 'utf8');
            
        } else {
            
        }
    } catch (error) {

    }
});

 