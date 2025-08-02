// Unified Search Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs
    const searchInputs = document.querySelectorAll('.search-input');
    let searchPopupOverlay = document.getElementById('searchPopupOverlay');
    
    // Create search popup if it doesn't exist
    if (!searchPopupOverlay) {
        // Create the overlay
        searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // Create the search popup container
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // Create a container for the buttons that will be positioned on the left
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        searchPopup.appendChild(buttonsContainer);
        
        // Create the input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        searchPopup.appendChild(searchInput);
        
        // Add the popup to the overlay
        searchPopupOverlay.appendChild(searchPopup);
        
        // Add the overlay to the body
        document.body.appendChild(searchPopupOverlay);
        
        // Create the search button (green button)
        const searchButton = document.createElement('button');
        searchButton.className = 'search-popup-button search';
        searchButton.textContent = 'بحث';
        buttonsContainer.appendChild(searchButton);
        
        // Create the engine button (orange button)
        const engineBtn = document.createElement('button');
        engineBtn.className = 'search-popup-button engine';
        engineBtn.textContent = 'محرك البحث';
        buttonsContainer.appendChild(engineBtn);
    }
    
    // Add click event to all search inputs
    searchInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            e.preventDefault();
            // Get the placeholder from the clicked input
            const placeholder = this.placeholder;
            // Update the popup input placeholder
            document.querySelector('.search-popup-input').placeholder = placeholder;
            // Show popup
            searchPopupOverlay.style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.search-popup').classList.add('active');
                document.querySelector('.search-popup-input').focus();
            }, 10);
        });
    });
    
    // Close popup when clicking on overlay
    searchPopupOverlay.addEventListener('click', function(e) {
        if (e.target === searchPopupOverlay) {
            document.querySelector('.search-popup').classList.remove('active');
            setTimeout(() => {
                searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    });
    
    // Handle search form submission
    document.querySelector('.search-popup-button.search').addEventListener('click', function() {
        performSearch();
    });
    
    // Handle engine button click
    document.querySelector('.search-popup-button.engine').addEventListener('click', function() {
        window.location.href = 'pages/general-search-engine.html';
    });
    
    // Handle input field enter key
    document.querySelector('.search-popup-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Search function
    function performSearch() {
        const searchQuery = document.querySelector('.search-popup-input').value.trim();
        if (searchQuery) {
            // Get the current page URL
            const currentPage = window.location.pathname;
            
            // Determine which search functionality to use based on the current page
            if (currentPage.includes('valid-regulations')) {
                // Search within current file
                searchInCurrentFile(searchQuery);
            } else if (currentPage.includes('our-services')) {
                // Search for services
                searchServices(searchQuery);
            } else {
                // Default search in judgments and regulations
                window.location.href = 'pages/general-search-engine.html?q=' + encodeURIComponent(searchQuery);
            }
            
            // Close popup
            closePopup();
        }
    }
    
    // Function to search within current file
    function searchInCurrentFile(query) {
        // Implement file-specific search here
    }
    
    // Function to search services
    function searchServices(query) {
        // Implement services search here
    }
    
    // Close popup function
    function closePopup() {
        document.querySelector('.search-popup').classList.remove('active');
        setTimeout(() => {
            searchPopupOverlay.style.display = 'none';
        }, 300);
    }
}); 