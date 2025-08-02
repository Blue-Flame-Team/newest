(function() {
    
    function checkLoginStatus() {
        try {
            const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
            let isUserLoggedIn = false;
            const currentUserData = localStorage.getItem('currentUser');
            if (currentUserData) {
                const userData = JSON.parse(currentUserData);
                isUserLoggedIn = userData && (userData.isLoggedIn === true || userData.name);
            }
            return isLoggedInFlag || isUserLoggedIn;
        } catch (e) {
            return false;
        }
    }
    
    function forceShowProfileIcons() {
        const desktopBtn = document.querySelector('.profile-icon-btn');
        const mobileBtn = document.querySelector('#mobile-profile-btn');
        
        if (desktopBtn) {
            desktopBtn.classList.add('show');
            desktopBtn.style.setProperty('display', 'block', 'important');
            desktopBtn.style.setProperty('visibility', 'visible', 'important');
            desktopBtn.style.setProperty('opacity', '1', 'important');
            desktopBtn.style.setProperty('pointer-events', 'auto', 'important');
            desktopBtn.style.setProperty('position', 'relative', 'important');
            desktopBtn.style.setProperty('left', 'auto', 'important');
        }
        
        if (mobileBtn) {
            mobileBtn.classList.add('show');
            mobileBtn.style.setProperty('display', 'block', 'important');
            mobileBtn.style.setProperty('visibility', 'visible', 'important');
            mobileBtn.style.setProperty('opacity', '1', 'important');
            mobileBtn.style.setProperty('pointer-events', 'auto', 'important');
            mobileBtn.style.setProperty('position', 'relative', 'important');
            mobileBtn.style.setProperty('left', 'auto', 'important');
        }
    }
    
    function updateUI() {
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            forceShowProfileIcons();
        }
    }
    
    function init() {
        setTimeout(updateUI, 500);
        setInterval(updateUI, 5000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
