// Mobile Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Comprehensive search button selection
    const searchButtons = document.querySelectorAll(
        '.mobile-icons .search-btn, ' +
        '.logo .mobile-icons .search-btn, ' +
        '.main-icons-group .search-btn, ' +
        '.top-icons .search-btn, ' +
        '.search-btn'
    );
    
    // Debugging: Log number of search buttons found
    
    
    // Create search popup overlay
    function createSearchPopupOverlay() {
        const existingOverlay = document.getElementById('mobileSearchPopupOverlay');
        if (existingOverlay) return existingOverlay;
        
        // Create the overlay
        const mobileSearchPopupOverlay = document.createElement('div');
        mobileSearchPopupOverlay.id = 'mobileSearchPopupOverlay';
        mobileSearchPopupOverlay.className = 'search-popup-overlay mobile-search-overlay';
        
        // Create the search popup container
        const mobileSearchPopup = document.createElement('div');
        mobileSearchPopup.className = 'search-popup mobile-search-popup';
        
        // Create a container for the buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'search-buttons-container';
        mobileSearchPopup.appendChild(buttonsContainer);
        
        // Create the input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        mobileSearchPopup.appendChild(searchInput);
        
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
        
        // Add the popup to the overlay
        mobileSearchPopupOverlay.appendChild(mobileSearchPopup);
        
        // Add the overlay to the body
        document.body.appendChild(mobileSearchPopupOverlay);
        
        return mobileSearchPopupOverlay;
    }
    
    // Ensure search popup overlay exists
    const mobileSearchPopupOverlay = createSearchPopupOverlay();
    
    // Toggle mobile search popup
    searchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            
            e.preventDefault();
            e.stopPropagation();
            
            // Show the overlay
            mobileSearchPopupOverlay.style.display = 'flex';
            
            // Add active class with a slight delay for transition
            setTimeout(() => {
                mobileSearchPopupOverlay.classList.add('active');
                const searchInput = document.querySelector('.mobile-search-popup .search-popup-input');
                if (searchInput) searchInput.focus();
            }, 10);
        });
    });
    
    // Close popup when clicking on overlay
    mobileSearchPopupOverlay.addEventListener('click', function(e) {
        if (e.target === mobileSearchPopupOverlay) {
            closePopup();
        }
    });
    
    // Handle search button click
    const searchButton = document.querySelector('.mobile-search-popup .search-popup-button.search');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Handle engine button click
    const engineButton = document.querySelector('.mobile-search-popup .search-popup-button.engine');
    if (engineButton) {
        engineButton.addEventListener('click', function() {
            window.location.href = 'pages/general-search-engine.html';
        });
    }
    
    // Handle input field enter key
    const searchInput = document.querySelector('.mobile-search-popup .search-popup-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Search function
    function performSearch() {
        const searchQuery = document.querySelector('.mobile-search-popup .search-popup-input').value.trim();
        if (searchQuery) {
            // Redirect to search engine with query
            window.location.href = `pages/general-search-engine.html?q=${encodeURIComponent(searchQuery)}`;
        }
    }
    
    // Close popup function
    function closePopup() {
        const mobileSearchPopupOverlay = document.getElementById('mobileSearchPopupOverlay');
        if (mobileSearchPopupOverlay) {
            mobileSearchPopupOverlay.classList.remove('active');
            setTimeout(() => {
                mobileSearchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    // Fallback: If no search buttons found, log a warning
    if (searchButtons.length === 0) {

    }
}); 