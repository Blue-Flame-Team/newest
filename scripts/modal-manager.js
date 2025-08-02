/**
 * نظام إدارة النوافذ المنبثقة المحسن
 * يدعم تحميل النوافذ من ملفات منفصلة لتنظيم أفضل
 */

const ModalManager = {
    modals: new Map(),
    
    init() {
        // تهيئة Modal Manager
        this.loadModals();
    },
    
    async loadModals() {
        const modalConfigs = [
            { id: 'login-modal', file: '/include/login-modal.html' },
            { id: 'forgot-password-modal', file: '/include/forgot-password-modal.html' }
        ];
        
        for (const config of modalConfigs) {
            try {
                // const response = await fetch(config.file);
                if (response.ok) {
                    const html = await response.text();
                    
                    // إنشاء container للـ modal
                    const container = document.createElement('div');
                    container.innerHTML = html;
                    
                    // إضافة للصفحة
                    document.body.appendChild(container);
                    
                    // حفظ في الـ Map
                    this.modals.set(config.id, container);
                    
                    // Modal loaded successfully
                } else {

                }
            } catch (error) {

            }
        }
        
        // Modal Manager ready
    },
    
    show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    },
    
    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
};

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    ModalManager.init();
});

// جعل النظام متاحاً عالمياً
window.ModalManager = ModalManager; 