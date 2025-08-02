// /**
//  * سكريبت زر الملف الشخصي المستقل
//  * يعمل بشكل مستقل عن جميع السكربتات الأخرى
//  */

// (function() {
//     'use strict';
    
    
//     let profileButton = null;
//     let profileModal = null;
//     let isInitialized = false;
    
//     // دالة اختبار للتأكد من أن السكريبت يعمل
//     function testScript() {
        
//         const testButton = document.querySelector('.profile-icon-btn');
//         if (testButton) {
            
//             // إظهار الزر للاختبار
//             testButton.style.display = 'block';
//             testButton.style.border = '2px solid red';
//             testButton.title = 'زر الملف الشخصي - جاهز للاختبار';
            
//             return true;
//         } else {

//             return false;
//         }
//     }
    
//     /**
//      * تهيئة النظام
//      */
//     function init() {
//         if (isInitialized) {
//             return;
//         }
        
        
//         // اختبار أولي
//         testScript();
        
//         // البحث عن العناصر
//         findElements();
        
//         // ربط الأحداث
//         bindEvents();
        
//         // التحقق من حالة تسجيل الدخول
//         checkLoginStatus();
        
//         isInitialized = true;
//     }
    
//     /**
//      * البحث عن العناصر المطلوبة
//      */
//     function findElements() {
        
//         // البحث عن زر الملف الشخصي
//         profileButton = document.querySelector('.profile-icon-btn');
//         if (!profileButton) {

            
//             // محاولة البحث بطرق أخرى
//             profileButton = document.querySelector('[class*="profile"]');
//             if (profileButton) {
//             }
//         } else {
//         }
//     }
    
//     /**
//      * ربط الأحداث
//      */
//     function bindEvents() {
//         if (!profileButton) {

//             return;
//         }
        
        
//         // إزالة أي أحداث سابقة
//         const newButton = profileButton.cloneNode(true);
//         profileButton.parentNode.replaceChild(newButton, profileButton);
//         profileButton = newButton;
        
//         // ربط حدث النقر
//         profileButton.addEventListener('click', handleProfileClick, true);
        
//         // ربط حدث hover للاختبار
//         profileButton.addEventListener('mouseenter', function() {
//         });
        
//         // منع التداخل مع سكربتات أخرى
//         profileButton.setAttribute('data-profile-isolated', 'true');
        
//     }
    
//     /**
//      * معالج حدث النقر على زر الملف الشخصي
//      */
//     function handleProfileClick(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         e.stopImmediatePropagation();
        
        
//         // التحقق من حالة تسجيل الدخول
//         const isLoggedIn = isUserLoggedIn();
        
//         if (!isLoggedIn) {

            
//             // للاختبار: السماح بفتح النافذة مع تحذير
//             const allowTest = confirm('أنت غير مسجل دخول.\nهل تريد فتح النافذة للاختبار؟\n\n(سيتم إنشاء بيانات وهمية)');
            
//             if (allowTest) {
//                 // إنشاء بيانات وهمية للاختبار
//                 localStorage.setItem('currentUser', JSON.stringify({
//                     username: 'test-user',
//                     name: 'مستخدم اختبار',
//                     isLoggedIn: true
//                 }));
//             } else {
//                 return false;
//             }
//         }
        
//         // فتح نافذة الملف الشخصي
//         try {
//             showProfileModal();
//         } catch (error) {

//             alert('حدث خطأ في فتح نافذة الملف الشخصي');
//         }
        
//         return false;
//     }
    
//     /**
//      * إظهار نافذة الملف الشخصي
//      */
//     function showProfileModal() {
        
//         // تحديد النافذة إذا لم تكن محددة مسبقاً
//         if (!profileModal) {
//             profileModal = document.getElementById('user-dashboard-modal');
            
//             // إذا لم توجد النافذة، نحاول تحميلها
//             if (!profileModal) {
//                 loadProfileModal();
//                 return;
//             } else {
//             }
//         }
        
//         try {
//             // إخفاء جميع النوافذ الأخرى
//             hideAllModals();
            
//             // إظهار النافذة
//             profileModal.style.display = 'flex';
//             profileModal.style.alignItems = 'center';
//             profileModal.style.justifyContent = 'center';
//             profileModal.style.position = 'fixed';
//             profileModal.style.zIndex = '99999';
//             profileModal.style.left = '0';
//             profileModal.style.top = '0';
//             profileModal.style.width = '100%';
//             profileModal.style.height = '100%';
//             profileModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
//             profileModal.classList.add('show');
            
//             // منع التمرير في الخلفية
//             document.body.style.overflow = 'hidden';
            
            
//             // تحديث محتوى النافذة
//             updateModalContent();
            
//             // ربط أحداث النافذة
//             bindModalEvents();
            
            
//         } catch (error) {

//             alert('حدث خطأ في فتح نافذة الملف الشخصي');
//         }
//     }
    
//     /**
//      * تحميل نافذة الملف الشخصي
//      */
//     function loadProfileModal() {
        
//         fetch('include/user-dashboard-modal.html')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('فشل في تحميل النافذة');
//                 }
//                 return response.text();
//             })
//             .then(html => {
//                 // إضافة النافذة للصفحة
//                 document.body.insertAdjacentHTML('beforeend', html);
//                 profileModal = document.getElementById('user-dashboard-modal');
                
                
//                 // فتح النافذة الآن
//                 showProfileModal();
//             })
//             .catch(error => {

//                 // إنشاء نافذة بسيطة كبديل
//                 createFallbackModal();
//             });
//     }
    
//     /**
//      * إنشاء نافذة بديلة بسيطة
//      */
//     function createFallbackModal() {
//         const modalHTML = \`
//             <div id="user-dashboard-modal" class="modal" style="display: none;">
//                 <div class="modal-content" style="
//                     background: white;
//                     margin: 50px auto;
//                     padding: 20px;
//                     width: 90%;
//                     max-width: 500px;
//                     border-radius: 10px;
//                     position: relative;
//                     text-align: center;
//                     font-family: 'Droid Arabic Kufi', Arial, sans-serif;
//                 ">
//                     <span class="close-modal" style="
//                         position: absolute;
//                         right: 15px;
//                         top: 10px;
//                         font-size: 28px;
//                         font-weight: bold;
//                         cursor: pointer;
//                         color: #aaa;
//                     ">&times;</span>
                    
//                     <h2 style="color: #00a19a; margin-bottom: 20px;">مرحبا <span class="user-name"></span></h2>
                    
//                     <div class="dashboard-buttons" style="display: flex; flex-direction: column; gap: 15px;">
//                         <button class="dashboard-btn" onclick="alert('طلب خدمة الأسانيد')" style="
//                             padding: 15px;
//                             background: #f8f9fa;
//                             border: 1px solid #e0e0e0;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-family: 'Droid Arabic Kufi', Arial, sans-serif;
//                             font-size: 16px;
//                             text-align: right;
//                         ">
//                             <span>طلب خدمة الأسانيد</span>
//                         </button>
                        
//                         <button class="dashboard-btn" onclick="alert('عدل بياناتك')" style="
//                             padding: 15px;
//                             background: #f8f9fa;
//                             border: 1px solid #e0e0e0;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-family: 'Droid Arabic Kufi', Arial, sans-serif;
//                             font-size: 16px;
//                             text-align: right;
//                         ">
//                             <span>عدل بياناتك</span>
//                         </button>
                        
//                         <button class="dashboard-btn" onclick="alert('خدمة العملاء')" style="
//                             padding: 15px;
//                             background: #f8f9fa;
//                             border: 1px solid #e0e0e0;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-family: 'Droid Arabic Kufi', Arial, sans-serif;
//                             font-size: 16px;
//                             text-align: right;
//                         ">
//                             <span>خدمة العملاء</span>
//                         </button>
                        
//                         <button class="logout-btn" style="
//                             padding: 15px;
//                             background: #dc3545;
//                             color: white;
//                             border: none;
//                             border-radius: 8px;
//                             cursor: pointer;
//                             font-family: 'Droid Arabic Kufi', Arial, sans-serif;
//                             font-size: 16px;
//                         ">
//                             <span>تسجيل الخروج</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         \`;
        
//         document.body.insertAdjacentHTML('beforeend', modalHTML);
//         profileModal = document.getElementById('user-dashboard-modal');
        
        
//         // فتح النافذة الآن
//         showProfileModal();
//     }
    
//     /**
//      * تحديث محتوى النافذة
//      */
//     function updateModalContent() {
//         try {
//             if (!profileModal) {
//                 createFallbackModal();
//             }
            
//             // تحديث اسم المستخدم
//             const userNameElement = profileModal.querySelector('.user-name');
//             if (userNameElement) {
//                 const userData = getCurrentUserData();
//                 userNameElement.textContent = (userData && userData.name) ? userData.name : 'المستخدم';
//             }
//         } catch (error) {

//         }
//     }
    
//     /**
//      * ربط أحداث النافذة
//      */
//     function bindModalEvents() {
//         if (!profileModal) return;
        
//         // زر الإغلاق
//         const closeBtn = profileModal.querySelector('.close-modal');
//         if (closeBtn && !closeBtn.hasAttribute('data-profile-bound')) {
//             closeBtn.addEventListener('click', hideProfileModal);
//             closeBtn.setAttribute('data-profile-bound', 'true');
//         }
        
//         // النقر خارج النافذة
//         profileModal.addEventListener('click', function(e) {
//             if (e.target === profileModal) {
//                 hideProfileModal();
//             }
//         });
        
//         // زر تسجيل الخروج
//         const logoutBtn = profileModal.querySelector('.logout-btn');
//         if (logoutBtn && !logoutBtn.hasAttribute('data-profile-bound')) {
//             logoutBtn.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
//                     logout();
//                 }
//             });
//             logoutBtn.setAttribute('data-profile-bound', 'true');
//         }
        
//         // إغلاق بمفتاح Escape
//         document.addEventListener('keydown', function(e) {
//             if (e.key === 'Escape' && profileModal.style.display === 'block') {
//                 hideProfileModal();
//             }
//         });
//     }
    
//     /**
//      * إخفاء نافذة الملف الشخصي
//      */
//     function hideProfileModal() {
//         if (!profileModal) return;
        
//         profileModal.style.display = 'none';
//         profileModal.classList.remove('show');
//         document.body.style.overflow = '';
        
//     }
    
//     /**
//      * إخفاء جميع النوافذ
//      */
//     function hideAllModals() {
//         const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
//         allModals.forEach(modal => {
//             if (modal.style) {
//                 modal.style.display = 'none';
//                 modal.classList.remove('show');
//             }
//         });
//         document.body.style.overflow = '';
//     }
    
//     /**
//      * التحقق من حالة تسجيل الدخول
//      */
//     function isUserLoggedIn() {
//         // التحقق من localStorage
//         const userData = localStorage.getItem('currentUser');
//         if (userData) {
//             try {
//                 const user = JSON.parse(userData);
//                 return user && user.isLoggedIn === true;
//             } catch (e) {
//                 return false;
//             }
//         }
        
//         // التحقق من AuthSystem إذا كان متوفراً
//         if (typeof AuthSystem !== 'undefined' && AuthSystem.isLoggedIn) {
//             return AuthSystem.isLoggedIn();
//         }
        
//         return false;
//     }
    
//     /**
//      * الحصول على بيانات المستخدم الحالي
//      */
//     function getCurrentUserData() {
//         // من localStorage
//         const userData = localStorage.getItem('currentUser');
//         if (userData) {
//             try {
//                 return JSON.parse(userData);
//             } catch (e) {
//                 // تجاهل الأخطاء
//             }
//         }
        
//         // من AuthSystem إذا كان متوفراً
//         if (typeof AuthSystem !== 'undefined' && AuthSystem.getCurrentUser) {
//             return AuthSystem.getCurrentUser();
//         }
        
//         return null;
//     }
    
//     /**
//      * تسجيل الخروج
//      */
//     function logout() {
        
//         // مسح localStorage
//         localStorage.removeItem('currentUser');
//         localStorage.removeItem('userLoggedIn');
//         localStorage.removeItem('userLoginTime');
        
//         // إخفاء زر الملف الشخصي
//         showProfileButton(false);
        
//         // إخفاء النافذة
//         hideProfileModal();
        
//         // إظهار أزرار تسجيل الدخول
//         const loginBtns = document.querySelectorAll('.login-btn');
//         loginBtns.forEach(btn => {
//             btn.style.display = 'block';
//         });
        
//         // استدعاء logout من AuthSystem إذا كان متوفراً
//         if (typeof AuthSystem !== 'undefined' && AuthSystem.logout) {
//             AuthSystem.logout();
//         }
        
//     }
    
//     /**
//      * التحقق من حالة تسجيل الدخول وإظهار/إخفاء الزر
//      */
//     function checkLoginStatus() {
//         const isLoggedIn = isUserLoggedIn();
//         showProfileButton(isLoggedIn);
        
//     }
    
//     /**
//      * إظهار أو إخفاء زر الملف الشخصي
//      */
//     function showProfileButton(show) {
//         if (!profileButton) return;
        
//         profileButton.style.display = show ? 'block' : 'none';
        
//         if (show) {
//         } else {
//         }
//     }
    
//     /**
//      * مراقب للتغييرات في حالة تسجيل الدخول
//      */
//     function watchLoginStatus() {
//         // مراقبة تغييرات localStorage
//         setInterval(checkLoginStatus, 1000);
        
//         // مراقبة تغييرات في DOM
//         const observer = new MutationObserver(function() {
//             // إعادة تهيئة إذا اختفى الزر
//             if (!document.querySelector('.profile-icon-btn[data-profile-isolated]')) {
//                 setTimeout(init, 100);
//             }
//         });
        
//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     }
    
//     // التهيئة عند تحميل DOM
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', init);
//     } else {
//         init();
//     }
    
//     // بدء مراقبة حالة تسجيل الدخول
//     setTimeout(watchLoginStatus, 1000);
    
//     // إتاحة الوظائف عالمياً للاختبار
//     window.ProfileButtonManager = {
//         init: init,
//         showModal: showProfileModal,
//         hideModal: hideProfileModal,
//         checkLogin: checkLoginStatus,
//         showButton: showProfileButton,
//         test: testScript,
//         forceShowModal: function() {
//             // إنشاء بيانات مستخدم وهمية للاختبار
//             localStorage.setItem('currentUser', JSON.stringify({
//                 username: 'test',
//                 name: 'مستخدم اختبار',
//                 isLoggedIn: true
//             }));
//             showProfileModal();
//         },
//         makeButtonVisible: function() {
//             const btn = document.querySelector('.profile-icon-btn');
//             if (btn) {
//                 btn.style.display = 'block';
//                 btn.style.border = '3px solid green';
//                 btn.style.borderRadius = '5px';
//                 return true;
//             }
//             return false;
//         },
//         simulateLogin: function() {
//             localStorage.setItem('currentUser', JSON.stringify({
//                 username: 'test',
//                 name: 'المستخدم التجريبي',
//                 isLoggedIn: true
//             }));
//             checkLoginStatus();
//         }
//     };
    
    
// })(); 