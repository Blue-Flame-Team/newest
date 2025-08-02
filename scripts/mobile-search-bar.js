// Mobile Search Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile search popup
    const mobileSearchPopup = document.createElement('div');
    mobileSearchPopup.className = 'search-popup mobile-search-popup active';
    mobileSearchPopup.innerHTML = `
        <div class="search-buttons-container">
            <button class="search-popup-button search">بحث</button>
            <button class="search-popup-button engine">محرك البحث</button>
        </div>
        <input type="text" class="search-popup-input" placeholder="ابحث في الاحكام و الانظمه ...">
    `;

    // Create overlay
    const searchPopupOverlay = document.createElement('div');
    searchPopupOverlay.id = 'mobileSearchPopupOverlay';
    searchPopupOverlay.className = 'search-popup-overlay mobile-search-overlay';
    searchPopupOverlay.appendChild(mobileSearchPopup);

    // Append to body
    document.body.appendChild(searchPopupOverlay);

    // Get elements
    const searchInput = mobileSearchPopup.querySelector('.search-popup-input');
    const searchButton = mobileSearchPopup.querySelector('.search-popup-button.search');
    const engineButton = mobileSearchPopup.querySelector('.search-popup-button.engine');

    // Search functionality
    function performSearch() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            // Redirect to general search engine
            window.location.href = 'pages/general-search-engine.html?q=' + encodeURIComponent(searchQuery);
        }
    }

    // Event listeners
    searchButton.addEventListener('click', performSearch);
    engineButton.addEventListener('click', function() {
        window.location.href = 'pages/general-search-engine.html';
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Toggle mobile search popup visibility
    const searchToggleBtn = document.querySelector('.search-btn');
    if (searchToggleBtn) {
        searchToggleBtn.addEventListener('click', function() {
            searchPopupOverlay.classList.toggle('active');
            if (searchPopupOverlay.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Close popup when clicking outside
    searchPopupOverlay.addEventListener('click', function(e) {
        if (e.target === searchPopupOverlay) {
            searchPopupOverlay.classList.remove('active');
        }
    });
}); 