document.addEventListener('DOMContentLoaded', function() {

    
    // Function to load the renew subscription modal
    function loadRenewSubscriptionModal() {

        
        // Check if modal already exists
        const existingModal = document.getElementById('renew-subscription-modal');
        if (existingModal) {

            return;
        }
        
        // Fetch the modal HTML from the external file
        const currentPath = window.location.pathname;
        const basePath = currentPath.includes('/pages/') ? '../include/renew-subscription-modal.html' : 'include/renew-subscription-modal.html';
        fetch(basePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Create a temporary div to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Find the modal in the loaded HTML
                const modal = tempDiv.querySelector('#renew-subscription-modal');
                
                if (modal) {
                    // Append the modal to the body
                    document.body.appendChild(modal);

                } else {

                }
            })
            .catch(error => {

            });
    }

    // Load the modal when the page loads
    loadRenewSubscriptionModal();

    // Add a global function to open the modal for testing
    window.testOpenRenewSubscriptionModal = function() {

        const modal = document.getElementById('renew-subscription-modal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.position = 'fixed';
            modal.style.zIndex = '99999999';
        } else {

        }
    };
}); 