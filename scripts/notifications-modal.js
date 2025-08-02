(function() {
    'use strict';

    // دالة فتح نافذة الإشعارات
    function openNotificationsModal() {
        const modal = document.getElementById('notifications-modal');
        if (modal) {
            // إخفاء جميع النوافذ الأخرى
            const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
            allModals.forEach(m => {
                if (m.id !== 'notifications-modal') {
                    m.style.display = 'none';
                }
            });

            // إظهار نافذة الإشعارات
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.position = 'fixed';
            modal.style.zIndex = '99999';
            modal.style.left = '0';

            // تحميل الإشعارات
            loadNotifications();
        }
    }

    // دالة إغلاق نافذة الإشعارات
    function closeNotificationsModal() {
        const modal = document.getElementById('notifications-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // دالة تحميل الإشعارات
    function loadNotifications() {
        const notificationsList = document.getElementById('notifications-list');
        const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');

        // مسح الإشعارات الحالية
        notificationsList.innerHTML = '';

        // إضافة الإشعارات المحفوظة
        savedNotifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification-item');
            notificationItem.innerHTML = `
                <div class="notification-icon">${notification.icon}</div>
                <div class="notification-text">
                    <strong>${notification.title}</strong>
                    <p>${notification.message}</p>
                </div>
                <div class="notification-time">${notification.time}</div>
            `;
            notificationsList.appendChild(notificationItem);
        });
    }

    // دالة إضافة إشعار جديد
    function addNotification(icon, title, message) {
        const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        
        const newNotification = {
            icon: icon,
            title: title,
            message: message,
            time: 'الآن'
        };

        savedNotifications.unshift(newNotification);

        // الحفاظ على 10 إشعارات كحد أقصى
        if (savedNotifications.length > 10) {
            savedNotifications.pop();
        }

        localStorage.setItem('notifications', JSON.stringify(savedNotifications));

        // تحديث قائمة الإشعارات إذا كانت النافذة مفتوحة
        const modal = document.getElementById('notifications-modal');
        if (modal && modal.style.display !== 'none') {
            loadNotifications();
        }
    }

    // دالة مسح كل الإشعارات
    function clearAllNotifications() {
        localStorage.removeItem('notifications');
        const notificationsList = document.getElementById('notifications-list');
        notificationsList.innerHTML = '';

        // عرض رسالة التأكيد
        showToast('تم مسح جميع الإشعارات');
    }

    // دالة عرض رسالة التنبيه
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 100000;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }

    // ربط الدوال بالأحداث
    document.addEventListener('DOMContentLoaded', () => {
        const notificationsButtons = document.querySelectorAll('.open-notifications-btn');
        notificationsButtons.forEach(btn => {
            btn.addEventListener('click', openNotificationsModal);
        });
    });

    // تصدير الدوال للاستخدام العام
    window.openNotificationsModal = openNotificationsModal;
    window.closeNotificationsModal = closeNotificationsModal;
    window.addNotification = addNotification;
    window.clearAllNotifications = clearAllNotifications;
})(); 