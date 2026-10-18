/**
 * PORTOFOLIO INTERACTIVE LOGIC - MUHAMAD RAMDANI NOVFITRA FAJRIN
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. TYPING EFFECT IN HERO SECTION
    // ----------------------------------------------------------------------
    const typingText = document.getElementById('typingText');
    const roles = [
        "Menengah dalam Frontend Developer",
        "Menengah dalam Product Designer (UI/UX)",
        "Mahir dalam Microsoft Office Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 500;
        }

        setTimeout(typeEffect, currentSpeed);
    }
    typeEffect();

    // ----------------------------------------------------------------------
    // 2. THEME SWITCHER (DARK / LIGHT MODE)
    // ----------------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            showToast(`Tema berhasil diubah ke mode ${newTheme === 'dark' ? 'Gelap 🌙' : 'Terang ☀️'}`);
        });
    }

    // ----------------------------------------------------------------------
    // 3. NAVBAR SCROLL & MOBILE MENU
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            backToTop?.classList.add('visible');
        } else {
            navbar?.classList.remove('scrolled');
            backToTop?.classList.remove('visible');
        }

        // Highlight active nav section
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // 4. SKILLS CATEGORY FILTERING
    // ----------------------------------------------------------------------
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. PROJECTS CATEGORY FILTERING
    // ----------------------------------------------------------------------
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                const categories = cardCategory.split(' ');
                if (filter === 'all' || cardCategory === filter || categories.includes(filter)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. SCROLL REVEAL OBSERVER
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 7. STATS COUNTER ANIMATION
    // ----------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsSection = document.querySelector('.about-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                    let count = 0;
                    const duration = 1500;
                    const step = Math.ceil(target / (duration / 30));

                    const counterTimer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            stat.textContent = target;
                            clearInterval(counterTimer);
                        } else {
                            stat.textContent = count;
                        }
                    }, 30);
                });
                counted = true;
            }
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ----------------------------------------------------------------------
    // 8. MODAL HANDLER FOR PROJECT DETAILS
    // ----------------------------------------------------------------------
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.modal-close');

    function closeModal() {
        modalBackdrop?.classList.remove('active');
        modals.forEach(m => m.classList.remove('active'));
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal && modalBackdrop) {
                modalBackdrop.classList.add('active');
                targetModal.classList.add('active');
            }
        });
    });

    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ----------------------------------------------------------------------
    // 9. CONTACT FORM HANDLING
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const subject = document.getElementById('messageSubject').value;

            showToast(`Terima kasih ${name}! Pesan Anda ("${subject}") telah dikirim. ✨`);

            contactForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 10. TOAST NOTIFICATION UTILITY
    // ----------------------------------------------------------------------
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${message}</span>`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
