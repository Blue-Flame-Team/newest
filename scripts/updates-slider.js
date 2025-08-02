document.addEventListener('DOMContentLoaded', function() {
    // عناصر سلايدر التحديثات
    const slider = document.getElementById('updatesSlider');
    if (!slider) return;

    const container = slider.querySelector('.slider-container');
    const cards = Array.from(document.querySelectorAll('.update-card'));
    const dotsContainer = document.getElementById('sliderDots');
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    const nextBtn = document.getElementById('sliderNext');
    const prevBtn = document.getElementById('sliderPrev');

    // إعادة ضبط العرض الأصلي
    cards.forEach(card => {
        card.style.display = 'block';
    });

    let currentPage = 0;
    // تثبيت عدد البطاقات في كل صفحة على 2 كما طلب المستخدم
    const cardsPerPage = 2;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // التأكد من أن عدد النقاط يتوافق مع عدد الصفحات
    // أولا إزالة جميع النقاط الحالية
    while (dotsContainer.firstChild) {
        dotsContainer.removeChild(dotsContainer.firstChild);
    }
    
    // إضافة النقاط بناءً على عدد الصفحات
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            goToPage(i);
        });
        dotsContainer.appendChild(dot);
    }

    // تحديث مرجع النقاط بعد إعادة إنشائها
    const updatedDots = Array.from(dotsContainer.querySelectorAll('.dot'));

    // تحديث عرض السلايدر بناءً على الصفحة الحالية
    function updateSlider() {
        // إخفاء جميع البطاقات أولًا
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // عرض البطاقتين للصفحة الحالية فقط
        const startIndex = currentPage * cardsPerPage;
        for (let i = startIndex; i < startIndex + cardsPerPage && i < cards.length; i++) {
            cards[i].style.display = 'block';
        }

        // تحديث النقاط النشطة
        updatedDots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // الانتقال للصفحة السابقة
    function goToPreviousPage() {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    }

    // الانتقال للصفحة التالية
    function goToNextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSlider();
        }
    }

    // الانتقال لصفحة محددة
    function goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < totalPages) {
            currentPage = pageIndex;
            updateSlider();
        }
    }

    // ربط الأزرار بالوظائف
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPreviousPage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextPage);
    }

    // تهيئة السلايدر
    updateSlider();
});
