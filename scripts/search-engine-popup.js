document.addEventListener('DOMContentLoaded', function() {
    // Create the search engine popup overlay if it doesn't exist
    let searchEngineOverlay = document.getElementById('searchEngineOverlay');
    
    if (!searchEngineOverlay) {
        // Create overlay
        searchEngineOverlay = document.createElement('div');
        searchEngineOverlay.id = 'searchEngineOverlay';
        searchEngineOverlay.className = 'search-engine-overlay';
        
        // Create popup container
        const searchEnginePopup = document.createElement('div');
        searchEnginePopup.className = 'search-engine-popup';
        
        // Add content to popup
        searchEnginePopup.innerHTML = `
            <div class="search-engine-header">
                <h2>محرك البحث</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="search-engine-content">
                <div class="search-type-selector">
                    <button class="search-type-btn active" data-type="judgments">البحث في الأحكام</button>
                    <button class="search-type-btn" data-type="regulations">البحث في الأنظمة</button>
                </div>
                <div class="search-input-container">
                    <input type="text" class="search-engine-input" placeholder="ابحث في الأحكام والأنظمة...">
                    <button class="search-btn">بحث</button>
                </div>
                <div class="advanced-search">
                    <div class="filter-group">
                        <label>نوع الحكم:</label>
                        <select class="judgment-type">
                            <option value="">الكل</option>
                            <option value="criminal">جنائي</option>
                            <option value="civil">مدني</option>
                            <option value="commercial">تجاري</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>المحكمة:</label>
                        <select class="court-type">
                            <option value="">الكل</option>
                            <option value="supreme">المحكمة العليا</option>
                            <option value="appeals">محكمة الاستئناف</option>
                            <option value="first">المحكمة الابتدائية</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>التاريخ:</label>
                        <div class="date-range">
                            <input type="date" class="date-from">
                            <span>إلى</span>
                            <input type="date" class="date-to">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add popup to overlay
        searchEngineOverlay.appendChild(searchEnginePopup);
        
        // Add overlay to body
        document.body.appendChild(searchEngineOverlay);
        
        // Handle close button click
        const closeBtn = searchEnginePopup.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            closeSearchEngine();
        });
        
        // Handle overlay click
        searchEngineOverlay.addEventListener('click', function(e) {
            if (e.target === searchEngineOverlay) {
                closeSearchEngine();
            }
        });
        
        // Handle search type buttons
        const searchTypeBtns = searchEnginePopup.querySelectorAll('.search-type-btn');
        searchTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                searchTypeBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update input placeholder based on search type
                const input = searchEnginePopup.querySelector('.search-engine-input');
                if (this.dataset.type === 'judgments') {
                    input.placeholder = 'ابحث في الأحكام...';
                } else {
                    input.placeholder = 'ابحث في الأنظمة...';
                }
            });
        });
        
        // Handle search button click
        const searchBtn = searchEnginePopup.querySelector('.search-btn');
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        // Handle enter key in search input
        const searchInput = searchEnginePopup.querySelector('.search-engine-input');
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Function to show search engine popup
    function showSearchEngine() {
        searchEngineOverlay.style.display = 'flex';
        setTimeout(() => {
            searchEngineOverlay.querySelector('.search-engine-popup').classList.add('active');
            searchEngineOverlay.querySelector('.search-engine-input').focus();
        }, 10);
    }
    
    // Function to close search engine popup
    function closeSearchEngine() {
        const popup = searchEngineOverlay.querySelector('.search-engine-popup');
        popup.classList.remove('active');
        setTimeout(() => {
            searchEngineOverlay.style.display = 'none';
        }, 300);
    }
    
    // Function to perform search
    function performSearch() {
        const searchType = document.querySelector('.search-type-btn.active').dataset.type;
        const searchQuery = document.querySelector('.search-engine-input').value.trim();
        const judgmentType = document.querySelector('.judgment-type').value;
        const courtType = document.querySelector('.court-type').value;
        const dateFrom = document.querySelector('.date-from').value;
        const dateTo = document.querySelector('.date-to').value;
        
        if (searchQuery) {
            // Build query string
            const params = new URLSearchParams({
                q: searchQuery,
                type: searchType,
                judgment: judgmentType,
                court: courtType,
                from: dateFrom,
                to: dateTo
            });
            
            // Redirect to search results page
            window.location.href = `pages/general-search-engine.html?${params.toString()}`;
        }
    }
    
    // Add click event to all search engine links
    const searchEngineLinks = document.querySelectorAll('a[href*="general-search-engine.html"]');
    searchEngineLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSearchEngine();
        });
    });
}); 