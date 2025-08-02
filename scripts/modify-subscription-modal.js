// Functions for Modify Subscription Modal
function openModifySubscriptionModal() {

    
    const modal = document.getElementById('modify-subscription-modal');
    if (!modal) {

        alert('حدث خطأ في فتح نموذج تعديل الاشتراك');
        return;
    }


    modal.style.display = 'block';
    
    // Retrieve current subscription details from localStorage
    const currentSubscription = JSON.parse(localStorage.getItem('userSubscription') || '{}');

    
    // Populate form with current subscription details if available
    if (currentSubscription) {
        const serviceTypeSelect = modal.querySelector('#service-type');
        const subscriptionDurationSelect = modal.querySelector('#subscription-duration');
        
        if (serviceTypeSelect) {
            serviceTypeSelect.value = currentSubscription.serviceType || 'خدمة الأسانيد القانونيه';

        } else {

            // إنشاء العنصر إذا لم يكن موجودًا
            const newServiceTypeSelect = document.createElement('select');
            newServiceTypeSelect.id = 'service-type';
            newServiceTypeSelect.innerHTML = `<option>خدمة الأسانيد القانونيه</option>`;
            modal.querySelector('.modal-body').insertBefore(newServiceTypeSelect, modal.querySelector('.modal-body').firstChild);
        }
        
        if (subscriptionDurationSelect) {
            subscriptionDurationSelect.value = currentSubscription.subscriptionDuration || 'سنة';

        } else {

            // إنشاء العنصر إذا لم يكن موجودًا
            const newSubscriptionDurationSelect = document.createElement('select');
            newSubscriptionDurationSelect.id = 'subscription-duration';
            newSubscriptionDurationSelect.innerHTML = `<option>سنة</option>`;
            modal.querySelector('.modal-body').insertBefore(newSubscriptionDurationSelect, modal.querySelector('.modal-body').firstChild);
        }
    }
}

function closeModifySubscriptionModal() {

    
    const modal = document.getElementById('modify-subscription-modal');
    if (!modal) {

        return;
    }


    modal.style.display = 'none';
}

function openRenewSubscriptionModal() {

    
    // Close the current modify subscription modal
    closeModifySubscriptionModal();
    
    // Open the renew subscription modal
    const renewModal = document.getElementById('renew-subscription-modal');
    if (!renewModal) {

        alert('حدث خطأ في فتح نموذج تجديد الاشتراك');
        return;
    }


    renewModal.style.display = 'block';
}

function saveSubscriptionModification() {

    
    // Get form data
    const serviceType = document.getElementById('service-type')?.value || 'خدمة الأسانيد القانونيه';
    const subscriptionDuration = document.getElementById('subscription-duration')?.value || 'سنة';
    


    // Create subscription object
    const subscriptionData = {
        serviceType,
        subscriptionDuration,
        lastModified: new Date().toISOString()
    };



    // Save to localStorage
    try {
        localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));
        
        // Show success message

        alert('تم تحديث الاشتراك بنجاح');
        
        // Open renew subscription modal
        openRenewSubscriptionModal();
    } catch (error) {

        alert('حدث خطأ أثناء حفظ التعديلات. يرجى المحاولة مرة أخرى.');
    }
}

function closeRenewSubscriptionModal() {

    
    const modal = document.getElementById('renew-subscription-modal');
    if (!modal) {

        return;
    }


    modal.style.display = 'none';
}

function saveRenewSubscription() {

    
    // Get form data
    const userType = document.getElementById('user-type').value;
    const fullName = document.getElementById('full-name').value;
    const subscriptionPeriod = document.getElementById('subscription-period').value;
    const legalSupport = document.getElementById('legal-support').checked;
    

        userType, 
        fullName, 
        subscriptionPeriod, 
        legalSupport 
    });
    
    // Validate form
    if (!userType || !fullName || !subscriptionPeriod) {

        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // Create renewal object
    const renewalData = {
        userType,
        fullName,
        subscriptionPeriod,
        legalSupport,
        renewalDate: new Date().toISOString()
    };



    // Save to localStorage
    try {
        localStorage.setItem('userSubscriptionRenewal', JSON.stringify(renewalData));
        
        // Show success message

        alert('تم تجديد الاشتراك بنجاح');
        
        // Close the modal
        closeRenewSubscriptionModal();
    } catch (error) {

        alert('حدث خطأ أثناء تجديد الاشتراك. يرجى المحاولة مرة أخرى.');
    }
}

// Expose functions to global window object
window.openModifySubscriptionModal = openModifySubscriptionModal;
window.closeModifySubscriptionModal = closeModifySubscriptionModal;
window.saveSubscriptionModification = saveSubscriptionModification;
window.openRenewSubscriptionModal = openRenewSubscriptionModal;
window.closeRenewSubscriptionModal = closeRenewSubscriptionModal;
window.saveRenewSubscription = saveRenewSubscription;

// Add event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    
    // Close modal when clicking outside
    const modal = document.getElementById('modify-subscription-modal');
    if (modal) {

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                window.closeModifySubscriptionModal();
            }
        });
    } else {

    }
}); 