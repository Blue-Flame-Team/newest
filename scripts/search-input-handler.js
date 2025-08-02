document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        // Prevent default behavior and show popup when clicking the input
        input.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the search popup overlay
            let searchPopupOverlay = document.getElementById('searchPopupOverlay');
            
            if (searchPopupOverlay) {
                // Update placeholder text
                const popupInput = searchPopupOverlay.querySelector('.search-popup-input');
                if (popupInput) {
                    popupInput.placeholder = this.placeholder;
                }
                
                // Show popup
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    searchPopupOverlay.querySelector('.search-popup').classList.add('active');
                    searchPopupOverlay.querySelector('.search-popup-input').focus();
                }, 10);
            }
        });
        
        // Prevent typing in the original input
        input.addEventListener('keydown', function(e) {
            e.preventDefault();
            
            // Show popup on any key press
            let searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    const popupInput = searchPopupOverlay.querySelector('.search-popup-input');
                    searchPopupOverlay.querySelector('.search-popup').classList.add('active');
                    if (popupInput) {
                        popupInput.focus();
                        // If it's a printable character, add it to the popup input
                        if (e.key.length === 1) {
                            popupInput.value = e.key;
                        }
                    }
                }, 10);
            }
        });
    });
    
    // Add click event to search icons
    const searchIcons = document.querySelectorAll('.search-icon');
    searchIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the associated input's placeholder
            const input = this.parentElement.querySelector('.search-input');
            const placeholder = input ? input.placeholder : '';
            
            // Get the search popup overlay
            let searchPopupOverlay = document.getElementById('searchPopupOverlay');
            
            if (searchPopupOverlay) {
                // Update placeholder text
                const popupInput = searchPopupOverlay.querySelector('.search-popup-input');
                if (popupInput && placeholder) {
                    popupInput.placeholder = placeholder;
                }
                
                // Show popup
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    searchPopupOverlay.querySelector('.search-popup').classList.add('active');
                    searchPopupOverlay.querySelector('.search-popup-input').focus();
                }, 10);
            }
        });
    });
}); 