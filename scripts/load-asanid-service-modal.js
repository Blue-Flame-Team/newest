document.addEventListener('DOMContentLoaded', function() {
    const asanidServiceModal = document.getElementById('asanid-service-modal');
    const closeAsanidModal = document.getElementById('closeAsanidModal');
    const submitAsanidForm = document.getElementById('submitAsanidForm');
    
    // Ensure modal is hidden by default
    if (asanidServiceModal) {
        asanidServiceModal.style.display = 'none';
    }

    // Function to show Asanid service modal
    function showAsanidServiceModal() {

        
        // إذا لم يكن المودال موجودًا، حاول تحميله
        if (!asanidServiceModal) {
            loadAsanidServiceHTML()
                .then(() => {
                    const modal = document.getElementById('asanid-service-modal');
                    if (modal) {
                        modal.style.display = 'block';

                    } else {

                    }
                })
                .catch(error => {

                });
        } else {
            asanidServiceModal.style.display = 'block';

        }
    }

    // Make the function globally accessible
    window.showAsanidServiceModal = showAsanidServiceModal;

    // Function to hide Asanid service modal
    function hideAsanidServiceModal() {
        if (asanidServiceModal) {
            asanidServiceModal.style.display = 'none';
        }
    }

    // Find and attach event listeners to all potential trigger buttons
    function attachModalTriggers() {
        // Function to find elements by text content
        function findElementsByText(text) {
            const allElements = document.querySelectorAll('a, span, button, .profile-btn');
            return Array.from(allElements).filter(el => 
                el.textContent.trim() === text || 
                el.textContent.trim().includes(text)
            );
        }

        const triggerText = 'طلب خدمة الأساند';
        const triggers = findElementsByText(triggerText);

        let triggersFound = 0;

        triggers.forEach(trigger => {

            trigger.addEventListener('click', function(event) {
                event.preventDefault();

                showAsanidServiceModal();
            });
            triggersFound++;
        });


    }

    // Attach modal triggers
    attachModalTriggers();

    // Close modal when close button is clicked
    if (closeAsanidModal) {
        closeAsanidModal.addEventListener('click', function(event) {
            event.stopPropagation();
            hideAsanidServiceModal();
        });
    }

    // Close modal when clicking outside the modal content
    if (asanidServiceModal) {
        asanidServiceModal.addEventListener('click', function(event) {
            if (event.target === asanidServiceModal) {
                hideAsanidServiceModal();
            }
        });
    }

    // Handle form submission
    if (submitAsanidForm) {
        submitAsanidForm.addEventListener('click', function() {
            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value
            };

            // Basic validation
            if (!formData.fullName || !formData.email || !formData.phone || !formData.subject) {
                alert('يرجى ملء جميع الحقول');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // Clear form
            document.getElementById('fullName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('subject').value = '';

            // Close modal and show success message
            hideAsanidServiceModal();
            alert('تم إرسال طلبك بنجاح. سنقوم بالتواصل معك قريبًا.');
        });
    }

    // Fallback: Add custom contains method if not available
    if (!Element.prototype.contains) {
        Element.prototype.contains = function(selector) {
            return this.textContent.trim() === selector.replace(':contains(', '').replace(')', '').replace(/\s/g, '');
        };
    }

    function loadAsanidServiceHTML() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            // تحديد المسار بناءً على موقع الصفحة الحالية
            const currentPath = window.location.pathname;
            const basePath = currentPath.includes('/pages/') ? '../include/asanid-service-modal.html' : 'include/asanid-service-modal.html';
            
            xhr.open('GET', basePath, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = xhr.responseText;
                    document.body.appendChild(tempDiv.firstElementChild);
                    resolve();
                } else {
                    reject(new Error('فشل تحميل نافذة الأسانيد'));
                }
            };
            xhr.onerror = () => reject(new Error('خطأ في الاتصال أثناء تحميل النافذة'));
            xhr.send();
        });
    }
});