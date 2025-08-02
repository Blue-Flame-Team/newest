document.addEventListener('DOMContentLoaded', function() {
    // عناصر السلايدر الأساسية
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // التحقق من وجود الصور
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            // التحقق من أن الصورة قابلة للتحميل
            img.onerror = function() {

            };
        }
    });

    // متغير لتخزين الشريحة السابقة
    let prevSlideIndex = 0;

    // انتقال للشريحة المحددة بالاتجاه الصحيح (RTL)
    function showSlide(n, direction = 'right') {
        // تخزين الشريحة الحالية قبل التغيير
        prevSlideIndex = currentSlide;

        // التأكد من أن الرقم ضمن حدود عدد الشرائح
        if (n >= slideCount) { currentSlide = 0; }
        if (n < 0) { currentSlide = slideCount - 1; }
        
        // إزالة جميع القوائم النشطة وتأثيرات الانتقال
        slides.forEach((slide) => {
            slide.classList.remove('active', 'slide-right', 'slide-left');
            // إزالة معالجي الأحداث للانتقال
            slide.removeEventListener('animationend', onAnimationEnd);
        });

        // معالج انتهاء الانتقال
        function onAnimationEnd() {
            // إزالة الشرائح غير النشطة بعد اكتمال الانتقال
            slides.forEach((s, i) => {
                if (i !== currentSlide) {
                    s.style.display = 'none';
                    s.classList.remove('slide-right', 'slide-left');
                }
            });
            // إزالة معالج الحدث
            slides[currentSlide].removeEventListener('animationend', onAnimationEnd);
        }

        // إضافة معالج لحدث انتهاء الانتقال
        // slides[currentSlide].addEventListener('animationend', onAnimationEnd);
        
        // إظهار وتنشيط الشريحة الحالية مع تأثير الانتقال المناسب
        slides[currentSlide].style.display = 'block';
        slides[currentSlide].classList.add('active');

        // في لغة RTL، الاتجاهات معكوسة: الشريحة التالية تأتي من اليسار، والسابقة من اليمين
        // لذلك نقوم بعكس الاتجاه للتناسب مع RTL
        if (direction === 'right') {
            slides[currentSlide].classList.add('slide-right'); // للشريحة التالية
        } else {
            slides[currentSlide].classList.add('slide-left'); // للشريحة السابقة
        }
        
        // تحديث النقاط
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // وظائف التنقل بين الشرائح - مضبوطة لوضع RTL
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide, 'right');
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide, 'left');
    }
    
    // إضافة مستمعي الأحداث للأزرار والنقاط
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            pauseSlideShow(); // إيقاف العرض التلقائي مؤقتاً
            nextSlide();
            setTimeout(resumeSlideShow, 10000); // استئناف العرض التلقائي بعد 10 ثوانٍ
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            pauseSlideShow(); // إيقاف العرض التلقائي مؤقتاً
            prevSlide();
            setTimeout(resumeSlideShow, 10000); // استئناف العرض التلقائي بعد 10 ثوانٍ
        });
    }
    
    // إضافة المستمعات للنقاط
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            pauseSlideShow(); // إيقاف العرض التلقائي مؤقتاً
            
            // تحديد الاتجاه بناءً على فهرس النقر مع مراعاة RTL
            const direction = index > currentSlide ? 'right' : 'left';
            currentSlide = index;
            showSlide(currentSlide, direction);
            
            setTimeout(resumeSlideShow, 10000); // استئناف العرض التلقائي بعد 10 ثوانٍ
        });
    });
    
    // بدء السلايدر التلقائي
    let slideInterval = setInterval(nextSlide, 6000); // تغيير الشريحة كل 6 ثوانٍ
    
    // وظائف إيقاف وإعادة تشغيل العرض التلقائي
    function pauseSlideShow() {
        clearInterval(slideInterval);
    }
    
    function resumeSlideShow() {
        clearInterval(slideInterval); // تأكد من عدم وجود أكثر من مؤقت
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    // إيقاف السلايدر مؤقتًا عند تفاعل المستخدم
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseover', pauseSlideShow);
        sliderContainer.addEventListener('mouseout', resumeSlideShow);
        
        // إضافة دعم للشاشات اللمسية
        // sliderContainer.addEventListener('touchstart', pauseSlideShow);
        // sliderContainer.addEventListener('touchend', resumeSlideShow);
    }
    
    // بدء عرض الشريحة الأولى
    showSlide(currentSlide);
});
