document.addEventListener('DOMContentLoaded', function() {
    const partnersLogos = document.querySelector('.partners-logos');
    const logosSlider = document.querySelector('.logos-slider');
    
    if (!partnersLogos || !logosSlider) return;
    
    // Variables for touch/mouse scrolling
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    
    // Mouse events for desktop
    // partnersLogos.addEventListener('mousedown', startDrag);
    // partnersLogos.addEventListener('mousemove', drag);
    // partnersLogos.addEventListener('mouseup', endDrag);
    // partnersLogos.addEventListener('mouseleave', endDrag);
    
    // // Touch events for mobile
    // partnersLogos.addEventListener('touchstart', startDrag, { passive: false });
    // partnersLogos.addEventListener('touchmove', drag, { passive: false });
    // partnersLogos.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isScrolling = true;
        partnersLogos.style.cursor = 'grabbing';
        
        // Get initial position
        startX = (e.type === 'touchstart') ? e.touches[0].pageX : e.pageX;
        scrollLeft = partnersLogos.scrollLeft;
        
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isScrolling) return;
        
        e.preventDefault();
        
        // Get current position
        const currentX = (e.type === 'touchmove') ? e.touches[0].pageX : e.pageX;
        const walk = (startX - currentX) * 2; // Scroll speed multiplier
        
        partnersLogos.scrollLeft = scrollLeft + walk;
    }
    
    function endDrag() {
        isScrolling = false;
        partnersLogos.style.cursor = 'grab';
    }
    
    // Auto-scroll functionality for mobile (circular)
    let autoScrollInterval;
    function autoScrollCircular() {
        if (window.innerWidth <= 768) {
            const maxScroll = partnersLogos.scrollWidth - partnersLogos.clientWidth;
            const currentScroll = partnersLogos.scrollLeft;
            const snapWidth = 90 + 24; // logo width + gap
            if (currentScroll >= maxScroll - 10) {
                partnersLogos.scrollTo({ left: 0, behavior: 'auto' });
            } else {
                partnersLogos.scrollBy({ left: snapWidth, behavior: 'smooth' });
            }
        }
    }
    function startAutoScroll() {
        if (window.innerWidth <= 768 && !autoScrollInterval) {
            autoScrollInterval = setInterval(autoScrollCircular, 2200);
        }
    }
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    // أوقف الحركة عند تمرير المستخدم باليد
    // partnersLogos.addEventListener('touchstart', stopAutoScroll);
    // partnersLogos.addEventListener('mousedown', stopAutoScroll);
    // // أعد تشغيلها عند انتهاء التمرير
    // partnersLogos.addEventListener('touchend', startAutoScroll);
    // partnersLogos.addEventListener('mouseup', startAutoScroll);
    // شغل الحركة التلقائية عند التحميل
    if (window.innerWidth <= 768) {
        startAutoScroll();
    }
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    });
    
    // Smooth scroll when clicking on logos
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            // Optional: Add click interaction
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}); 