/**
 * GitHub Pages Fix Script
 * يتحقق من تحميل جميع الموارد وإصلاح المشاكل المحتملة
 */

(function() {
    'use strict';
    

    
    // 1. فحص تحميل الخطوط
    function checkFonts() {
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        
        fontLinks.forEach((link, index) => {
            link.addEventListener('load', () => {
                // Font loaded successfully
            });
            link.addEventListener('error', () => {

            });
        });
    }
    
    // 2. فحص تحميل CSS
    function checkCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([href*="googleapis.com"])');
        
        cssLinks.forEach((link, index) => {
            if (!link.sheet) {

            }
        });
    }
    
    // 3. فحص تحميل JavaScript
    function checkJS() {
        const scripts = document.querySelectorAll('script[src]');
        
        scripts.forEach((script, index) => {
            script.addEventListener('error', () => {

            });
        });
    }
    
    // 4. فحص الصور
    function checkImages() {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        let errorCount = 0;
        
        images.forEach((img, index) => {
            if (img.complete) {
                if (img.naturalWidth === 0) {
                    errorCount++;

                } else {
                    loadedCount++;
                }
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                });
                img.addEventListener('error', () => {
                    errorCount++;

                });
            }
        });
    }
    
    // 5. فحص معلومات الصفحة
    function checkPageInfo() {
        const isGitHubPages = window.location.hostname.includes('github.io');
        const protocol = window.location.protocol;
        const isHTTPS = protocol === 'https:';
        
        if (isGitHubPages && !isHTTPS) {

        }
    }
    
    // 6. فحص أخطاء JavaScript
    function setupErrorHandling() {
        window.addEventListener('error', (event) => {

                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {

        });
    }
    
    // تشغيل الفحوصات
    function runAllChecks() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                checkFonts();
                checkCSS();
                checkJS();
                checkImages();
                checkPageInfo();
                setupErrorHandling();
            });
        } else {
            checkFonts();
            checkCSS();
            checkJS();
            checkImages();
            checkPageInfo();
            setupErrorHandling();
        }
    }
    
    // بدء التشغيل
    runAllChecks();
    
})(); 