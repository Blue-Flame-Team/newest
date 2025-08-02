(function() {
    'use strict';

    console.log('✅ تم تحميل load-edit-profile-modal.js بنجاح');

    function loadEditProfileHTML() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            // تحديد المسار بناءً على موقع الصفحة الحالية
            const currentPath = window.location.pathname;
            const basePath = currentPath.includes('/pages/') ? '../include/edit-profile-modal.html' : 'include/edit-profile-modal.html';
            
            xhr.open('GET', basePath, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = xhr.responseText;
                    document.body.appendChild(tempDiv.firstElementChild);
                    resolve();
                } else {
                    reject(new Error('فشل تحميل نافذة تعديل الملف الشخصي'));
                }
            };
            xhr.onerror = () => reject(new Error('خطأ في الاتصال أثناء تحميل النافذة'));
            xhr.send();
        });
    }

    function setupEditProfileButtons() {
        // تضمين كل من زر سطح المكتب والموبايل
        const desktopButton = document.querySelector('.profile-btn');
        const mobileButton = document.querySelector('#mobile-profile-btn');
        
        if (desktopButton) {
            desktopButton.addEventListener('click', (event) => {
                event.preventDefault();
                showEditProfileModal();  // تم تغيير من openProfileModal()
            });
        }
        
        // تغيير لاستخدام نافذة البروفايل الرئيسية على الموبايل
        if (mobileButton) {
            mobileButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleProfileMenu();  // تغيير من showEditProfileModal() إلى toggleProfileMenu()
            });
        }
        
        if (!desktopButton && !mobileButton) {
            console.error('❌ لم يتم العثور على أي زر لتعديل الملف الشخصي');
        }
    }

    function openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            document.body.style.overflow = 'hidden';
            
            console.log('✅ تم فتح نافذة تعديل الملف الشخصي');
            
            // استرجاع البيانات المحفوظة
            const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            
            // تعبئة الحقول مع التحقق من وجود العناصر
            const fieldsMapping = {
                'userType': savedUser.userType || '',
                'editEmail': savedUser.email || '',
                'city': savedUser.city || '',
                'detailedAddress': savedUser.detailedAddress || '',
                'editPhone': savedUser.phone || '',
                'mobilePhone': savedUser.mobilePhone || '',
                'fax': savedUser.fax || '',
                'poBox': savedUser.poBox || '',
                'postalCode': savedUser.postalCode || ''
            };

            Object.keys(fieldsMapping).forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.value = fieldsMapping[fieldId];
                } else {
                    console.warn(`العنصر ${fieldId} غير موجود`);
                }
            });
        } else {
            console.error('❌ نافذة تعديل الملف الشخصي غير موجودة');
        }
    }

    function closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function handleEditProfile(event) {
        event.preventDefault();
        
        const userData = {
            userType: document.getElementById('userType').value,
            email: document.getElementById('editEmail').value,
            city: document.getElementById('city').value,
            detailedAddress: document.getElementById('detailedAddress').value,
            phone: document.getElementById('editPhone').value,
            fax: document.getElementById('fax').value,
            mailBox: document.getElementById('mailBox').value,
            postalCode: document.getElementById('postalCode').value
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        closeEditProfileModal();
        alert('تم حفظ البيانات بنجاح');
    }

    function openChangePasswordModal() {
        // يمكنك إضافة منطق فتح نافذة تغيير كلمة المرور هنا
        alert('سيتم إضافة نافذة تغيير كلمة المرور قريباً');
    }

    // تحميل النافذة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        loadEditProfileHTML()
            .then(() => {
                setupEditProfileButtons();
                
                // ربط دوال النموذج
                const editProfileForm = document.querySelector('#edit-profile-modal form');
                if (editProfileForm) {
                    editProfileForm.addEventListener('submit', handleEditProfile);
                }

                // ربط زر تغيير كلمة المرور
                const changePasswordButton = document.querySelector('#edit-profile-modal button[onclick="openChangePasswordModal()"]');
                if (changePasswordButton) {
                    changePasswordButton.addEventListener('click', openChangePasswordModal);
                }

                // **إضافة أحداث الإغلاق بعد التحميل الكامل**
                const closeBtn = document.getElementById('closeEditProfileModal');
                const modal = document.getElementById('edit-profile-modal');
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', function(event) {
                        event.stopPropagation();
                        window.hideEditProfileModal();
                    });
                }

                if (modal) {
                    modal.addEventListener('click', function(event) {
                        if (event.target === modal) {
                            window.hideEditProfileModal();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('❌ خطأ في تحميل نافذة تعديل الملف الشخصي:', error);
            });

        const editProfileModal = document.getElementById('edit-profile-modal');
        const closeEditProfileModal = document.getElementById('closeEditProfileModal');
        const saveEditProfileBtn = document.getElementById('saveEditProfile');

        // Function to show edit profile modal
        window.showEditProfileModal = function() {
            const editProfileModal = document.getElementById('edit-profile-modal');
            if (editProfileModal) {
                // إظهار النافذة مع flexbox للتوسيط
                editProfileModal.style.display = 'flex';
                editProfileModal.style.alignItems = 'center';
                editProfileModal.style.justifyContent = 'center';
                
                // منع التمرير في الخلفية
                document.body.style.overflow = 'hidden';
                
                // Load existing user data from localStorage
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                
                // Populate form fields
                const fields = {
                    'userType': userData.userType || '',
                    'editEmail': userData.email || '',
                    'city': userData.city || '',
                    'detailedAddress': userData.detailedAddress || '',
                    'editPhone': userData.phone || '',
                    'mobilePhone': userData.mobilePhone || '',
                    'fax': userData.fax || '',
                    'poBox': userData.poBox || '',
                    'postalCode': userData.postalCode || ''
                };
                
                Object.keys(fields).forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = fields[fieldId];
                    }
                });
            }
        };

        // Function to hide edit profile modal
        window.hideEditProfileModal = function() {
            const editProfileModal = document.getElementById('edit-profile-modal');
            if (editProfileModal) {
                editProfileModal.style.display = 'none';
                // إعادة تفعيل التمرير في الخلفية
                document.body.style.overflow = 'auto';
            }
        };

        // Close modal when close button is clicked
        if (closeEditProfileModal) {
            closeEditProfileModal.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent event bubbling
                window.hideEditProfileModal();
            });
        }

        // Close modal when clicking outside the modal content
        if (editProfileModal) {
            editProfileModal.addEventListener('click', function(event) {
                // Check if the click is directly on the modal overlay
                if (event.target === editProfileModal) {
                    window.hideEditProfileModal();
                }
            });
        }

        // Save profile changes
        if (saveEditProfileBtn) {
            saveEditProfileBtn.addEventListener('click', function() {
                // Collect form data
                const userData = {
                    userType: document.getElementById('userType').value,
                    email: document.getElementById('editEmail').value,
                    city: document.getElementById('city').value,
                    detailedAddress: document.getElementById('detailedAddress').value,
                    phone: document.getElementById('editPhone').value,
                    mobilePhone: document.getElementById('mobilePhone').value,
                    fax: document.getElementById('fax').value,
                    poBox: document.getElementById('poBox').value,
                    postalCode: document.getElementById('postalCode').value
                };

                // Basic validation
                if (!userData.email || !userData.mobilePhone) {
                    alert('يرجى إدخال البريد الإلكتروني ورقم الجوال');
                    return;
                }

                // Save to localStorage
                localStorage.setItem('userData', JSON.stringify(userData));

                // Optional: Send data to server (you would implement this part)
                // sendUserDataToServer(userData);

                // Close modal and show success message
                window.hideEditProfileModal();
                alert('تم حفظ البيانات بنجاح');
            });
        }

        // Optional: Add event listener for password change button
        const changePasswordBtn = document.getElementById('changePasswordBtn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', function() {
                // Implement password change modal logic here
                window.showPasswordChangeModal && window.showPasswordChangeModal();
            });
        }
    });

    // تعريف الدوال عالمياً للوصول من خارج النطاق
    // window.showEditProfileModal = showEditProfileModal;
    window.openEditProfileModal = openEditProfileModal;
    window.closeEditProfileModal = closeEditProfileModal;
    window.openChangePasswordModal = openChangePasswordModal;

    // Include password change modal functionality
    const passwordChangeScript = document.createElement('script');
    passwordChangeScript.src = 'scripts/load-password-change-modal.js';
    document.head.appendChild(passwordChangeScript);
})();