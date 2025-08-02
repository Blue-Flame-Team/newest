// وظائف نافذة خدمة الأسانيد
"use strict";

let asanidModal;
let closeAsanidModal;
let asanidContactForm;
let submitAsanidForm;

// دالة لفتح النافذة
window.showAsanidModal = function() {
    
    // إذا لم تكن النافذة موجودة، نحاول تحميلها من الملف
    if (!asanidModal) {
        const modalPath = window.location.pathname.includes('/pages/') ? '../include/user-dashboard-modal.html' : '../include/user-dashboard-modal.html';
        fetch(modalPath)
            .then(response => {
                return response.text();
            })
            .then(html => {
                // إضافة النافذة للصفحة
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const newModal = tempDiv.querySelector('#asanid-mobile-modal');
                if (newModal) {
                    document.body.appendChild(newModal);
                    asanidModal = newModal;
                    
                    // تحديث المراجع
                    closeAsanidModal = document.getElementById('closeAsanidModal');
                    asanidContactForm = document.getElementById('asanidContactForm');
                    submitAsanidForm = document.getElementById('submitAsanidForm');
                    
                    // إعادة ربط الأحداث
                    bindEvents();
                    
                    // فتح النافذة
                    showModal();
                } else {

                }
            })
            .catch(error => {

                alert('حدث خطأ في تحميل نافذة خدمة الأسانيد');
            });
    } else {
        showModal();
    }
};

// دالة لإظهار النافذة
function showModal() {
    if (asanidModal) {
        asanidModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // ملء البيانات من localStorage إذا كانت موجودة
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                document.getElementById('fullName').value = user.name || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('phone').value = user.phone || '';
            } catch (error) {

            }
        }
        
    }
}

// دالة لإغلاق النافذة
function closeModal() {
    if (asanidModal) {
        asanidModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// دالة لربط الأحداث
function bindEvents() {
    
    // إضافة مستمع حدث للزر إغلاق
    if (closeAsanidModal) {
        closeAsanidModal.addEventListener('click', closeModal);
    }

    // إغلاق النافذة عند النقر خارجها
    if (asanidModal) {
        asanidModal.addEventListener('click', function(e) {
            if (e.target === asanidModal) {
                closeModal();
            }
        });
    }

    // معالجة حدث النقر على زر الإرسال
    if (submitAsanidForm) {
        submitAsanidForm.addEventListener('click', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value
            };

            // التحقق من صحة البيانات
            if (!formData.fullName || !formData.email || !formData.phone || !formData.subject) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // التحقق من صحة البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // إرسال البيانات (يمكن تعديل هذا الجزء لإرسال البيانات إلى الخادم)
            
            // إظهار رسالة نجاح وإغلاق النافذة
            alert('تم إرسال طلبك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.');
            closeModal();
        });
    }
    
}

// تحميل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث المراجع
    asanidModal = document.getElementById('asanid-mobile-modal');
    closeAsanidModal = document.getElementById('closeAsanidModal');
    asanidContactForm = document.getElementById('asanidContactForm');
    submitAsanidForm = document.getElementById('submitAsanidForm');
    
    // ربط الأحداث
    bindEvents();
}); 