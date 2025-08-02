// Test script to verify all contact links are working properly
document.addEventListener('DOMContentLoaded', function() {

    
    // Test 1: Check if contact section exists
    const contactSection = document.getElementById('contact');
    if (contactSection) {

    } else {

    }
    
    // Test 2: Check search engine button functionality
    const searchEngineButtons = document.querySelectorAll('.search-popup-button.engine');

    
    // Test 3: Check mobile call icons
    const mobileCallIcons = document.querySelectorAll('.mobile-icons .icon-btn img[src*="call"], .mobile-icons .icon-btn img[alt*="اتصال"]');

    
    // Test 4: Check desktop call icons
    const desktopCallIcons = document.querySelectorAll('.main-icons-group .icon-btn img[src*="call"], .main-icons-group .icon-btn img[alt*="اتصال"]');

    
    // Test 5: Check support icons
    const supportIcons = document.querySelectorAll('.support-icon-fixed, .support-icon-fixed img');

    
    // Test 6: Check if support icons have cursor pointer
    supportIcons.forEach((icon, index) => {
        const computedStyle = window.getComputedStyle(icon);
        if (computedStyle.cursor === 'pointer') {

        } else {

        }
    });
    
    // Test 7: Verify page type detection
    const isSubpage = window.location.pathname.includes('/pages/');

    

});

// Function to manually test contact navigation
function testContactNavigation() {

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });

    } else {

    }
}

// Export test function for manual testing
window.testContactNavigation = testContactNavigation; 