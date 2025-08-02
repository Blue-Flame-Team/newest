// Search Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements - support both desktop and mobile search buttons
    const searchButtons = document.querySelectorAll('.main-icons-group .search-btn, .mobile-icons .search-btn');
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
        
        // Create the input field - hidden in initial design to match image
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-popup-input';
        searchInput.placeholder = 'ابحث في الاحكام و الانظمه ...';
        // searchInput.style.display = 'none'; // Hide input initially to match design
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
    
    // Toggle search popup when search button is clicked
    searchButtons.forEach(searchBtn => {
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.search-popup').classList.add('active');
                    document.querySelector('.search-popup-input').focus();
                }, 10);
            });
        }
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
    
    // Search function (to be implemented based on project requirements)
    function performSearch() {
        const searchQuery = document.querySelector('.search-popup-input').value.trim();
        if (searchQuery) {
            // Redirect to search engine with query
            window.location.href = `pages/general-search-engine.html?q=${encodeURIComponent(searchQuery)}`;
        } else {
            // If no query, just go to search engine
            window.location.href = 'pages/general-search-engine.html';
        }
    }
    
    // Engine search function redirects to general-search-engine.html
    function performEngineSearch() {
        window.location.href = 'pages/general-search-engine.html';
    }
    
    // Close popup function
    function closePopup() {
        document.querySelector('.search-popup').classList.remove('active');
        setTimeout(() => {
            searchPopupOverlay.style.display = 'none';
        }, 300);
    }
});
