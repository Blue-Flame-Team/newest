// Icons Functionality for both Mobile and Desktop devices
document.addEventListener('DOMContentLoaded', function() {
    // ---- وظائف الموبايل ----
    // Fix for the search button in mobile
    const mobileSearchBtn = document.querySelector('.logo .mobile-icons .search-btn:not(.zoom-in-btn):not(.zoom-out-btn)');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.search-popup').classList.add('active');
                    document.querySelector('.search-popup-input').focus();
                }, 10);
            } else {
                // If search popup doesn't exist yet, initialize it
                initializeSearchPopup();
            }
        });
    }
    
    // Add search button functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchPopup = document.querySelector('.search-popup');
            const searchPopupOverlay = document.querySelector('.search-popup-overlay');
            
            if (searchPopup && searchPopupOverlay) {
                // Toggle active class
                searchPopupOverlay.classList.toggle('active');
                searchPopup.classList.toggle('active');
                
                // Position popup relative to search button
                const btnRect = this.getBoundingClientRect();
                searchPopupOverlay.style.position = 'absolute';
                searchPopupOverlay.style.top = `${btnRect.bottom}px`;
                searchPopupOverlay.style.left = `${btnRect.left}px`;
                
                const searchInput = searchPopup.querySelector('.search-popup-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });

        // Close popup when clicking outside
        document.addEventListener('click', function(e) {
            const searchPopup = document.querySelector('.search-popup');
            const searchPopupOverlay = document.querySelector('.search-popup-overlay');
            const searchBtn = document.querySelector('.search-btn');
            
            if (searchPopup && searchPopupOverlay && 
                !searchPopup.contains(e.target) && 
                !searchBtn.contains(e.target)) {
                searchPopupOverlay.classList.remove('active');
                searchPopup.classList.remove('active');
            }
        });
    }
    
    // ---- وظائف سطح المكتب ----
    // Add support for desktop search button
    const desktopSearchBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(1)');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchPopupOverlay = document.getElementById('searchPopupOverlay');
            if (searchPopupOverlay) {
                searchPopupOverlay.style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.search-popup').classList.add('active');
                    document.querySelector('.search-popup-input').focus();
                }, 10);
            } else {
                // If search popup doesn't exist yet, initialize it
                initializeSearchPopup();
            }
        });
    }
    
    // Add support for desktop settings button
    const desktopSettingsBtn = document.querySelector('.main-icons-group .icon-btn:nth-child(4)');
    const desktopSettingsMenu = document.querySelector('.main-icons-group .settings-menu');
    
    if (desktopSettingsBtn && desktopSettingsMenu) {
        // Initialize event listeners for desktop settings menu
        initializeSettingsMenuListeners(desktopSettingsMenu);
        
        desktopSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            desktopSettingsMenu.classList.toggle('show');
            
            // Close contrast submenu if open
            const contrastSubmenu = desktopSettingsMenu.querySelector('.contrast-submenu');
            if (contrastSubmenu) {
                contrastSubmenu.classList.remove('show');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopSettingsBtn.contains(e.target) && !desktopSettingsMenu.contains(e.target)) {
                desktopSettingsMenu.classList.remove('show');
            }
        });
    }
    
    // ---- وظائف الزوم لتكبير وتصغير النصوص ----
    
    // تهيئة المتغيرات والقيم الافتراضية
    let textSize = 100;
    const minSize = 70;
    const maxSize = 200;
    const sizeStep = 10;
    
    // استرجاع الحجم المحفوظ من التخزين المحلي
    if (localStorage.getItem('textSize')) {
        textSize = parseInt(localStorage.getItem('textSize'));
        setTextSize(textSize);
    }
    
    // وظيفة لتعيين حجم النص
    function setTextSize(size) {
        textSize = size;
        localStorage.setItem('textSize', size);
        
        // تعيين قيمة متغير CSS للاستخدام في التنسيقات
        document.documentElement.style.setProperty('--text-size', size + '%');
        
        // إضافة سمة data-font-size إلى عنصر body لتطبيق التنسيقات بشكل أفضل
        document.body.setAttribute('data-font-size', size);
        
        // إنشاء أو تحديث عنصر النمط
        let styleElement = document.getElementById('text-size-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'text-size-style';
            document.head.appendChild(styleElement);
        }
        
        // إضافة قواعد CSS محسنة لتحجيم جميع النصوص بشكل متناسق
        styleElement.textContent = `
            body {
                font-size: ${size}% !important;
            }
            
            /* تطبيق حجم الخط على العناصر المختلفة مع مراعاة التناسب */
            p, span, a, li, td, th, input, button, label, div, h1, h2, h3, h4, h5, h6 {
                font-size: inherit;
            }
            
            /* تحسين القراءة للنصوص الكبيرة */
            body[data-font-size="${size}"] p, 
            body[data-font-size="${size}"] .card-desc {
                line-height: 1.5;
            }
        `;
        
        // إضافة تأثير بصري لتنبيه المستخدم بالتغيير
        addVisualFeedback();

    }
    
    // إضافة تأثير بصري عند تغيير حجم الخط
    function addVisualFeedback() {
        // إضافة فئة للإشارة إلى أن حجم الخط قد تغير
        document.body.classList.add('font-size-changed');
        
        // إزالة الفئة بعد انتهاء التأثير
        setTimeout(function() {
            document.body.classList.remove('font-size-changed');
        }, 300);
    }
    
    // للعثور على أزرار الزوم
    const zoomInBtns = document.querySelectorAll('.zoom-in-btn');
    const zoomOutBtns = document.querySelectorAll('.zoom-out-btn');
    
    // إذا كانت وظيفة changeFontSize موجودة بالفعل (معرفة في النافذة)
    if (typeof window.changeFontSize === 'function') {
        
        // لا نقوم بأي إجراء هنا لأن الأزرار تم تعيينها مع وظيفة onclick
    } else {
        
        // تعريف وظيفة تغيير حجم الخط للنافذة
        window.changeFontSize = function(change) {
            if (change > 0 && textSize < maxSize) {
                setTextSize(textSize + sizeStep);
            } else if (change < 0 && textSize > minSize) {
                setTextSize(textSize - sizeStep);
            }
        };
        
        // لا نقوم باستبدال الأزرار بل نضيف فقط خاصية onclick للأزرار التي لا تملكها
        zoomInBtns.forEach(function(btn) {
            if (!btn.hasAttribute('onclick')) {
                btn.setAttribute('onclick', 'changeFontSize(10)');
            }
        });
        
        zoomOutBtns.forEach(function(btn) {
            if (!btn.hasAttribute('onclick')) {
                btn.setAttribute('onclick', 'changeFontSize(-10)');
            }
        });
    }
    
    // إنشاء أزرار الزوم إذا لم تكن موجودة
    if (zoomInBtns.length === 0 || zoomOutBtns.length === 0) {
        const mainIconsGroup = document.querySelector('.main-icons-group');
        if (mainIconsGroup) {
            // إنشاء حاوية الزوم
            const zoomGroup = document.createElement('div');
            zoomGroup.className = 'zoom-group';
            zoomGroup.style.display = 'flex';
            
            // إنشاء زر التكبير
            const zoomInBtn = document.createElement('button');
            zoomInBtn.className = 'icon-btn zoom-in-btn';
            zoomInBtn.title = 'تكبير النصوص';
            const zoomInImg = document.createElement('img');
            zoomInImg.src = 'assets/icons/search-zoom-in.png';
            zoomInImg.alt = 'تكبير';
            zoomInBtn.appendChild(zoomInImg);
            zoomGroup.appendChild(zoomInBtn);
            
            // إضافة حدث التكبير
            zoomInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (textSize < maxSize) {
                    setTextSize(textSize + sizeStep);
                }
            });
            
            // إنشاء زر التصغير
            const zoomOutBtn = document.createElement('button');
            zoomOutBtn.className = 'icon-btn zoom-out-btn';
            zoomOutBtn.title = 'تصغير النصوص';
            const zoomOutImg = document.createElement('img');
            zoomOutImg.src = 'assets/icons/search-zoom-out.png';
            zoomOutImg.alt = 'تصغير';
            zoomOutBtn.appendChild(zoomOutImg);
            zoomGroup.appendChild(zoomOutBtn);
            
            // إضافة حدث التصغير
            zoomOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (textSize > minSize) {
                    setTextSize(textSize - sizeStep);
                }
            });
            
            // إضافة مجموعة الزوم إلى الصفحة
            if (mainIconsGroup.parentNode) {
                mainIconsGroup.parentNode.insertBefore(zoomGroup, mainIconsGroup);
            }
        }
    }


    // Fix for the settings button in mobile
    const mobileSettingsBtn = document.querySelector('.logo .mobile-icons .settings-toggle-btn');
    const settingsMenu = document.querySelector('.settings-menu');
    
    if (mobileSettingsBtn && settingsMenu) {
        // Clone the settings menu for mobile if it doesn't exist yet
        let mobileSettingsMenu = document.querySelector('.mobile-settings-menu');
        if (!mobileSettingsMenu) {
            mobileSettingsMenu = settingsMenu.cloneNode(true);
            mobileSettingsMenu.classList.add('mobile-settings-menu');
            document.body.appendChild(mobileSettingsMenu);
            
            // Update event listeners for cloned menu
            initializeSettingsMenuListeners(mobileSettingsMenu);
        }
        
        mobileSettingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            mobileSettingsMenu.classList.toggle('show');
            mobileSettingsBtn.classList.toggle('active');
            
            // Close contrast submenu if open
            const contrastSubmenu = mobileSettingsMenu.querySelector('.contrast-submenu');
            if (contrastSubmenu) {
                contrastSubmenu.classList.remove('show');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileSettingsBtn.contains(e.target) && !mobileSettingsMenu.contains(e.target)) {
                mobileSettingsMenu.classList.remove('show');
                mobileSettingsBtn.classList.remove('active');
            }
        });
    }
    
    // Initialize event listeners for settings menu options
    function initializeSettingsMenuListeners(menu) {
        // Handle contrast option
        const contrastOption = menu.querySelector('.contrast-option');
        const contrastSubmenu = menu.querySelector('.contrast-submenu');
        
        if (contrastOption && contrastSubmenu) {
            contrastOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                contrastSubmenu.classList.toggle('show');
            });
        }
        
        // Handle light contrast option
        const contrastLight = menu.querySelector('.contrast-light');
        if (contrastLight) {
            contrastLight.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                document.documentElement.style.setProperty('--primary-color', '#17a891');
                document.documentElement.style.setProperty('--secondary-color', '#24516c');
                menu.classList.remove('show');
                contrastSubmenu.classList.remove('show');
            });
        }
        
        // Handle dark contrast option
        const contrastDark = menu.querySelector('.contrast-dark');
        if (contrastDark) {
            contrastDark.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                document.documentElement.style.setProperty('--primary-color', '#000000');
                document.documentElement.style.setProperty('--secondary-color', '#000000');
                menu.classList.remove('show');
                contrastSubmenu.classList.remove('show');
            });
        }
        
        // Handle stats option
        const statsOption = menu.querySelector('.stats-option');
        if (statsOption) {
            statsOption.addEventListener('click', function(e) {
                e.preventDefault();
                // Determine if we're on the home page or a subpage
                const isHomePage = window.location.pathname === '/' || 
                               window.location.pathname === '/index.html' || 
                               window.location.pathname.endsWith('/index.html') ||
                               window.location.pathname === '';
                               
                if (isHomePage) {
                    window.location.href = 'pages/analytics.html';
                } else {
                    window.location.href = '../pages/analytics.html';
                }
            });
        }
        
        // Handle logout option
        const logoutOption = menu.querySelector('.logout-option');
        if (logoutOption) {
            logoutOption.addEventListener('click', function(e) {
                e.preventDefault();
                alert('تم تسجيل الخروج بنجاح');
                menu.classList.remove('show');
            });
        }
    }

    // Initialize search popup if it doesn't exist
    function initializeSearchPopup() {
        // Create the overlay
        const searchPopupOverlay = document.createElement('div');
        searchPopupOverlay.id = 'searchPopupOverlay';
        searchPopupOverlay.className = 'search-popup-overlay';
        
        // Create the search popup container
        const searchPopup = document.createElement('div');
        searchPopup.className = 'search-popup';
        
        // Create a container for the buttons
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

        // Show the popup
        searchPopupOverlay.style.display = 'flex';
        setTimeout(() => {
            searchPopup.classList.add('active');
            searchInput.focus();
        }, 10);

        // Add event listeners
        // Close popup when clicking on overlay
        searchPopupOverlay.addEventListener('click', function(e) {
            if (e.target === searchPopupOverlay) {
                searchPopup.classList.remove('active');
                setTimeout(() => {
                    searchPopupOverlay.style.display = 'none';
                }, 300);
            }
        });
        
        // Handle search form submission
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Handle engine button click
        engineBtn.addEventListener('click', function() {
            window.location.href = 'pages/general-search-engine.html';
        });
        
        // Handle input field enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Search function
    function performSearch() {
        const searchQuery = document.querySelector('.search-popup-input').value.trim();
        if (searchQuery) {
            // Implement actual search functionality here
            // For now, just close the popup
            closePopup();
        }
    }
    
    // Close popup function
    function closePopup() {
        const searchPopup = document.querySelector('.search-popup');
        const searchPopupOverlay = document.getElementById('searchPopupOverlay');
        
        if (searchPopup && searchPopupOverlay) {
            searchPopup.classList.remove('active');
            setTimeout(() => {
                searchPopupOverlay.style.display = 'none';
            }, 300);
        }
    }

    // Mobile Call Icon Functionality - Link to Contact Section
    const mobileCallIcons = document.querySelectorAll('.mobile-icons .icon-btn img[src*="call"], .mobile-icons .icon-btn img[alt*="اتصال"]');
    mobileCallIcons.forEach(icon => {
        const button = icon.closest('.icon-btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Check if we're on a subpage or main page
                const isSubpage = window.location.pathname.includes('/pages/');
                if (isSubpage) {
                    // Navigate to main page contact section
                    window.location.href = '../index.html#contact';
                } else {
                    // Scroll to contact section on same page
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Fallback: navigate to main page
                        window.location.href = '#contact';
                    }
                }
            });
        }
    });

    // Support Icon Functionality - Link to Contact Section
    const supportIcons = document.querySelectorAll('.support-icon-fixed, .support-icon-fixed img');
    supportIcons.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function(e) {
            e.preventDefault();
            // Check if we're on a subpage or main page
            const isSubpage = window.location.pathname.includes('/pages/');
            if (isSubpage) {
                // Navigate to main page contact section
                window.location.href = '../index.html#contact';
            } else {
                // Scroll to contact section on same page
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Fallback: navigate to main page
                    window.location.href = '#contact';
                }
            }
        });
    });

    // Desktop Call Icon Functionality - Link to Contact Section
    const desktopCallIcons = document.querySelectorAll('.main-icons-group .icon-btn img[src*="call"], .main-icons-group .icon-btn img[alt*="اتصال"]');
    desktopCallIcons.forEach(icon => {
        const button = icon.closest('.icon-btn');
        if (button && !button.onclick) { // Only add if no onclick already exists
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Check if we're on a subpage or main page
                const isSubpage = window.location.pathname.includes('/pages/');
                if (isSubpage) {
                    // Navigate to main page contact section
                    window.location.href = '../index.html#contact';
                } else {
                    // Scroll to contact section on same page
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Fallback: navigate to main page
                        window.location.href = '#contact';
                    }
                }
            });
        }
    });
});
