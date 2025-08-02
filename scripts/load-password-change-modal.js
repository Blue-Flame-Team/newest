// Global function to show password change modal
window.showPasswordChangeModal = function() {
    const passwordChangeModal = document.getElementById('password-change-modal');

    if (passwordChangeModal) {
        passwordChangeModal.style.display = 'block';

    } else {

    }
};

// Global function to close password modal
window.closePasswordModal = function() {
    const passwordChangeModal = document.getElementById('password-change-modal');
    if (passwordChangeModal) {
        passwordChangeModal.style.display = 'none';
    }
};

// Global function to handle password submit
window.handlePasswordSubmit = function(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (newPassword !== confirmPassword) {
        alert('كلمات المرور الجديدة غير متطابقة');
        return;
    }

    // Here you would typically send the password change request to the server
    // For now, we'll just show a success message
    alert('تم تغيير كلمة المرور بنجاح');
    
    // Clear form fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // Close the modal
    window.closePasswordModal();
};

document.addEventListener('DOMContentLoaded', function() {
    const passwordChangeModal = document.getElementById('password-change-modal');

    // Ensure modal is hidden by default
    if (passwordChangeModal) {
        passwordChangeModal.style.display = 'none';

        // Close modal when clicking outside the modal content
        passwordChangeModal.addEventListener('click', function(event) {
            if (event.target === passwordChangeModal) {
                window.closePasswordModal();
            }
        });
    }
}); 