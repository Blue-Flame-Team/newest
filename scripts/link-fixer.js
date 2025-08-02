/**
 * link-fixer.js - Script para conectar todos los enlaces y botones del sitio web
 * 
 * Este script revisa y corrige los enlaces del sitio web para asegurar
 * que todos los botones y enlaces estén correctamente conectados.
 */

(function() {
    'use strict';
    
    // Estructura del sitio web con rutas correctas
    const siteStructure = {
        home: 'index.html',
        aboutSite: 'pages/about-site.html',
        aboutNetwork: 'pages/about-site.html', // Si no existe, usamos la página más cercana
        privacyPolicy: 'pages/privacy-policy.html',
        terms: 'pages/terms.html',
        journal: 'pages/jornal-profile-view.html',
        asanidService: 'pages/asanid-service.html',
        faq: 'pages/faq.html',
        subscribe: 'pages/subscribe.html',
        services: 'pages/our-services.html',
        cabinetMeeting: 'pages/cabinet-meeting.html',
        councilSessions: 'pages/council-sessions.html',
        analytics: 'pages/analytics.html',
        judgments: 'pages/judgments-display.html',
        validRegulations: 'pages/valid-regulations.html',
        search: 'http://127.0.0.1:5504/pages/general-search-engine.html',
        contact: '#contact-section' // Sección en la página de inicio
    };
    
    // Función para convertir rutas relativas a absolutas
    function getAbsolutePath(relativePath) {
        // Determinar si estamos en la página principal o en una subpágina
        const isSubpage = window.location.pathname.includes('/pages/');
        
        // Si es una ruta que comienza con 'pages/' y estamos en la página principal
        if (relativePath.startsWith('pages/') && !isSubpage) {
            return relativePath;
        }
        
        // Si es una ruta que NO comienza con 'pages/' y estamos en una subpágina
        if (!relativePath.startsWith('pages/') && isSubpage) {
            return '../' + relativePath;
        }
        
        // Si estamos en una subpágina y queremos enlazar a otra subpágina
        if (isSubpage && relativePath.startsWith('pages/')) {
            return '../' + relativePath;
        }
        
        return relativePath;
    }
    
    // Función para arreglar los enlaces que son "#" o "javascript:void(0);"
    function fixEmptyLinks() {
        // Arreglar los enlaces que son "#" o "javascript:void(0);"
        const emptyLinks = document.querySelectorAll('a[href=""], a[href="#"], a:not([href])');
        
        emptyLinks.forEach(link => {
            const text = link.textContent.trim();
            let targetHref = 'index.html';
            
            // Determinar qué tipo de enlace es basado en su texto o clases
            if (text.includes('هل نسيت كلمة السر')) {
                targetHref = '#login-modal';
            } else if (text.includes('تسجيل الدخول')) {
                targetHref = '#login-modal';
            } else if (text.includes('الرئيسية')) return siteStructure.home;
            if (text.includes('عن الموقع')) return siteStructure.aboutSite;
            if (text.includes('عن الشبكة')) return siteStructure.aboutNetwork;
            if (text.includes('سياسة الخصوصية')) return siteStructure.privacyPolicy;
            if (text.includes('الشروط') || text.includes('الأحكام')) return siteStructure.terms;
            if (text.includes('أم القرى') || text.includes('جريدة')) return siteStructure.journal;
            if (text.includes('الأسانيد')) return siteStructure.asanidService;
            if (text.includes('الأسئلة') || text.includes('الشائعة')) return siteStructure.faq;
            if (text.includes('اشترك') || text.includes('الاشتراك')) return siteStructure.subscribe;
            if (text.includes('خدماتنا') || text.includes('الخدمات')) return siteStructure.services;
            if (text.includes('مجلس الوزراء')) return siteStructure.cabinetMeeting;
            if (text.includes('جلسات مجلس')) return siteStructure.councilSessions;
            if (text.includes('احصائيات') || text.includes('الإحصائيات')) return siteStructure.analytics;
            if (text.includes('الأحكام القضائية')) return siteStructure.judgments;
            if (text.includes('الأنظمة النافذة')) return siteStructure.validRegulations;
            if (text.includes('بحث') || text.includes('البحث')) return siteStructure.search;
            if (text.includes('تواصل') || text.includes('اتصل')) return siteStructure.contact;
            
            // Por clases o IDs
            if (Array.from(link.classList).some(c => c.includes('subscribe'))) return siteStructure.subscribe;
            if (Array.from(link.classList).some(c => c.includes('login'))) return '#login-modal';
            if (Array.from(link.classList).some(c => c.includes('search'))) return siteStructure.search;
            if (Array.from(link.classList).some(c => c.includes('contact'))) return siteStructure.contact;
            if (Array.from(link.classList).some(c => c.includes('faq'))) return siteStructure.faq;
            
            // Si es parte de un menú o sección específica
            const parentElement = link.parentElement;
            if (parentElement) {
                if (parentElement.classList.contains('about-submenu')) {
                    return text.includes('الموقع') ? siteStructure.aboutSite : siteStructure.aboutNetwork;
                }
                if (parentElement.classList.contains('policies-submenu')) {
                    return text.includes('الخصوصية') ? siteStructure.privacyPolicy : siteStructure.terms;
                }
            }
            
            // Por defecto, enlazar a la página de inicio
            targetHref = siteStructure.home;
            
            link.href = getAbsolutePath(targetHref);
        });
    }
    
    // Función para arreglar los enlaces del footer
    function fixFooterLinks() {
        const footerLinks = document.querySelectorAll('footer a, .footer a, .main-footer a, .footer-column a');
        
        footerLinks.forEach(link => {
            // Si el enlace es vacío o javascript:void(0), arreglarlo
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === 'javascript:void(0);' || link.getAttribute('href') === '') {
                let newHref = determineCorrectLink(link);
                if (newHref) {
                    link.href = getAbsolutePath(newHref);
                }
            }
        });
    }
    
    // Función para arreglar los enlaces en las tarjetas y secciones principales
    function fixCardLinks() {
        // Enlaces en las tarjetas de servicios, actualizaciones, etc.
        const cardLinks = document.querySelectorAll('.card a, .service-card a, .update-card a, .more-btn, .all-news-link');
        
        cardLinks.forEach(link => {
            // Si el enlace es vacío o javascript:void(0), arreglarlo
            if (link.getAttribute('href') === '#' || link.getAttribute('href') === 'javascript:void(0);' || link.getAttribute('href') === '') {
                // Para enlaces en tarjetas, determinar el tipo de tarjeta
                let newHref = '';
                
                // Si es una tarjeta de servicio
                if (link.closest('.service-card')) {
                    newHref = siteStructure.services;
                } 
                // Si es una tarjeta de actualización
                else if (link.closest('.update-card')) {
                    newHref = siteStructure.news || siteStructure.home;
                }
                // Si es un botón "más" o "ver todo"
                else if (link.classList.contains('more-btn') || link.classList.contains('all-news-link')) {
                    // Determinar por su contexto
                    const parentSection = link.closest('section');
                    if (parentSection) {
                        if (parentSection.classList.contains('services-section')) {
                            newHref = siteStructure.services;
                        } else if (parentSection.classList.contains('latest-updates-section')) {
                            newHref = siteStructure.news || siteStructure.home;
                        }
                    }
                } else {
                    newHref = determineCorrectLink(link);
                }
                
                if (newHref) {
                    link.href = getAbsolutePath(newHref);
                }
            }
        });
    }
    
    // Ejecutar todas las funciones de corrección
    fixEmptyLinks();
    fixFooterLinks();
    fixCardLinks();
    
})();
