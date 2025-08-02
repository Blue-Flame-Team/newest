// Function to open the renew subscription modal
function openRenewSubscriptionModal() {

    const modal = document.getElementById('renew-subscription-modal');

    
    if (modal) {

        
        // Ensure modal is fully visible and on top
        modal.classList.add('show');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.style.position = 'fixed';
        modal.style.zIndex = '99999999';
        

    } else {

    }
}

// Function to close the renew subscription modal
function closeRenewSubscriptionModal() {

    const modal = document.getElementById('renew-subscription-modal');
    
    if (modal) {

        
        // Hide modal
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        

    } else {

    }
}

// Function to save renew subscription details
function saveRenewSubscription() {
    // Validate form inputs
    const userType = document.getElementById('user-type').value;
    const fullName = document.getElementById('full-name').value;
    const subscriptionPeriod = document.getElementById('subscription-period').value;
    const legalSupport = document.getElementById('legal-support').checked;

    // Basic validation
    if (!userType || !fullName || !subscriptionPeriod) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // Prepare data object
    const subscriptionData = {
        userType,
        fullName,
        subscriptionPeriod,
        legalSupport
    };

    // Here you would typically send data to server


    // Close the modal
    closeRenewSubscriptionModal();
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('renew-subscription-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeRenewSubscriptionModal();
            }
        });
    }
}); 