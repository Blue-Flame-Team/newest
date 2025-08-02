// ملف شريط التنقل الموحد - وظائف التكبير والتصغير فقط
document.addEventListener('DOMContentLoaded', function() {
    // 1. وظائف القائمة المتنقلة
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    
    // دالة إغلاق القائمة المتنقلة
    function closeMenu() {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('show');
        if (mobileSideMenu) mobileSideMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // فتح/إغلاق القائمة المتنقلة
    if (hamburgerMenu && mobileMenuOverlay && mobileSideMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenuOverlay.classList.add('show');
            mobileSideMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // إغلاق القائمة عند النقر على الخلفية
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }
    
    // 2. القوائم المنسدلة للموبايل
    const aboutToggle = document.getElementById('about-toggle');
    const aboutSubmenu = document.getElementById('about-submenu');
    
    if (aboutToggle && aboutSubmenu) {
        aboutToggle.addEventListener('click', function(e) {
            e.preventDefault();
            aboutSubmenu.classList.toggle('open');
            this.classList.toggle('active');
        });
    }
    
    const policiesToggle = document.getElementById('policies-toggle');
    const policiesSubmenu = document.getElementById('policies-submenu');
    
    if (policiesToggle && policiesSubmenu) {
        policiesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            policiesSubmenu.classList.toggle('open');
            this.classList.toggle('active');
        });
    }
    
    // 3. القوائم المنسدلة للكمبيوتر
    const dropdownItems = document.querySelectorAll('.dropdown');
    
    dropdownItems.forEach(function(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu) {
            dropdown.addEventListener('mouseenter', function() {
                menu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                menu.style.display = 'none';
            });
        }
    });
}); 