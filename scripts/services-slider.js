document.addEventListener('DOMContentLoaded', function() {
    // Services Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Services Slider
    const serviceCards = document.querySelectorAll('.service-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.services-slider .dot');
    
    let activeIndex = 0;
    
    // Function to update active card
    function updateActiveCard(index) {
        // Make sure service cards exist
        if (serviceCards && serviceCards.length > 0) {
            // Remove active class from all cards
            serviceCards.forEach(card => card.classList.remove('active'));
            // Add active class to selected card
            serviceCards[index].classList.add('active');
        }
        
        // Update dots only if they exist
        if (dots && dots.length > 0 && index < dots.length) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
        
        // Scroll to active card (smooth scroll effect)
        const cardsContainer = document.querySelector('.services-cards');
        if (cardsContainer) {
            const cardWidth = serviceCards[0].offsetWidth + 20; // 20px is the gap
            cardsContainer.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    }
    
    // Set initial active card only if service cards exist
    if (serviceCards && serviceCards.length > 0 && dots && dots.length > 0) {
        updateActiveCard(activeIndex);
    }
    
    // Previous arrow click
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            activeIndex = (activeIndex === 0) ? serviceCards.length - 1 : activeIndex - 1;
            updateActiveCard(activeIndex);
        });
    }
    
    // Next arrow click
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            activeIndex = (activeIndex === serviceCards.length - 1) ? 0 : activeIndex + 1;
            updateActiveCard(activeIndex);
        });
    }
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            activeIndex = index;
            updateActiveCard(activeIndex);
        });
    });
    
    // Make cards clickable
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            activeIndex = index;
            updateActiveCard(activeIndex);
        });
    });
    
    // Auto slide every 5 seconds (optional)
    /* 
    if (serviceCards && serviceCards.length > 0) {
        setInterval(function() {
            activeIndex = (activeIndex === serviceCards.length - 1) ? 0 : activeIndex + 1;
            updateActiveCard(activeIndex);
        }, 5000);
    }
    */
});
