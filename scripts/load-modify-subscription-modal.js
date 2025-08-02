document.addEventListener('DOMContentLoaded', function() {

    
    // Check if the container exists
    const modalContainer = document.getElementById('modify-subscription-modal-container');
    if (!modalContainer) {

        return;
    }

    // Fetch the modify subscription modal HTML
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/pages/') ? '../include/modify-subscription-modal.html' : 'include/modify-subscription-modal.html';
    fetch(basePath)
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {

            
            // Insert the modal HTML into the container
            modalContainer.innerHTML = html;

            
            // Manually add event listeners after inserting HTML
            const modal = document.getElementById('modify-subscription-modal');
            if (modal) {

                
                // Close button event listener
                const closeButton = modal.querySelector('.close-modal-btn');
                if (closeButton) {

                    closeButton.addEventListener('click', window.closeModifySubscriptionModal);
                } else {

                }

                // Close modal when clicking outside
                modal.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        window.closeModifySubscriptionModal();
                    }
                });
            } else {

            }
        })
        .catch(error => {

            
            // Create a fallback modal or show an error message
            modalContainer.innerHTML = `
                <div id="modify-subscription-modal" class="modal" dir="rtl">
                    <div class="modal-content">
                        <p style="color: red;">حدث خطأ في تحميل نموذج تعديل الاشتراك. يرجى المحاولة مرة أخرى.</p>
                        <p>تفاصيل الخطأ: ${error.message}</p>
                    </div>
                </div>
            `;
        });
}); 