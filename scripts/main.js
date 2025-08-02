// Main JavaScript File

// Suppress specific DOM input warnings
(function() {




        const args = Array.from(arguments);
        if (!args.some(arg => 
            typeof arg === 'string' && 
            (arg.includes('[DOM] Input elements should have autocomplete') || 
             arg.includes('Password field is not contained in a form'))
        )) {

        }
    };


        const args = Array.from(arguments);
        if (!args.some(arg => 
            typeof arg === 'string' && 
            (arg.includes('[DOM] Input elements should have autocomplete') || 
             arg.includes('Password field is not contained in a form'))
        )) {

        }
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // توجيه الروابط المخفية للمستخدمين
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const dropdown = this.nextElementSibling;
            if (dropdown) {
                e.preventDefault();
                dropdown.classList.toggle('show');
                
                // إغلاق القوائم الأخرى المفتوحة
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        const otherDropdown = otherLink.nextElementSibling;
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                        }
                    }
                });
            }
        });
    });
    
    // إغلاق القوائم المنسدلة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-link') && !e.target.closest('.dropdown-menu')) {
            const openMenus = document.querySelectorAll('.dropdown-menu.show');
            openMenus.forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
    
    // تفعيل ميزة البحث
    const searchBtns = document.querySelectorAll('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    
    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (searchOverlay) {
                searchOverlay.classList.add('active');
                // تمكين التركيز على حقل البحث
                const searchInput = searchOverlay.querySelector('input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    });
    
    // إغلاق البحث
    if (searchOverlay) {
        const closeSearch = searchOverlay.querySelector('.close-search');
        if (closeSearch) {
            closeSearch.addEventListener('click', function() {
                searchOverlay.classList.remove('active');
            });
        }
    }
});
