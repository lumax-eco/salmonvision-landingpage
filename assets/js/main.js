// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', toggleMenu);
}

// Close menu when a link is clicked
if (mobileMenuLinks) {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '#!') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Sticky nav on scroll
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Species guide lightbox
(function () {
    let currentIndex = -1;
    let currentItems = [];

    function ensureLightbox() {
        let overlay = document.querySelector('.sv-lightbox-overlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'sv-lightbox-overlay';
        overlay.innerHTML = `
            <div class="sv-lightbox-modal" role="dialog" aria-modal="true" aria-label="Image preview">
                <div class="sv-lightbox-toolbar">
                    <div class="sv-lightbox-title" id="svLightboxTitle"></div>
                    <button type="button" class="sv-lightbox-close" aria-label="Close">×</button>
                </div>
                <div class="sv-lightbox-body">
                    <button type="button" class="sv-lightbox-nav sv-lightbox-prev" aria-label="Previous image">‹</button>
                    <img id="svLightboxImage" alt="" />
                    <button type="button" class="sv-lightbox-nav sv-lightbox-next" aria-label="Next image">›</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        return overlay;
    }

    function setNavState(overlay) {
        const prevBtn = overlay.querySelector('.sv-lightbox-prev');
        const nextBtn = overlay.querySelector('.sv-lightbox-next');

        if (prevBtn) prevBtn.disabled = currentIndex <= 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= currentItems.length - 1;
    }

    function renderCurrent() {
        const overlay = ensureLightbox();
        const link = currentItems[currentIndex];
        if (!link) return;

        const href = link.getAttribute('href');
        const caption = link.getAttribute('data-caption') || link.textContent.trim();

        const img = overlay.querySelector('#svLightboxImage');
        const title = overlay.querySelector('#svLightboxTitle');

        img.src = href;
        img.alt = caption || '';
        title.textContent = caption || '';
        setNavState(overlay);
    }

    function openLightboxFromLink(link) {
        const overlay = ensureLightbox();
        const closeBtn = overlay.querySelector('.sv-lightbox-close');

        currentItems = Array.from(document.querySelectorAll('a.sv-lightbox'));
        currentIndex = Math.max(0, currentItems.indexOf(link));
        renderCurrent();

        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function goPrev() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderCurrent();
        }
    }

    function goNext() {
        if (currentIndex < currentItems.length - 1) {
            currentIndex += 1;
            renderCurrent();
        }
    }

    function closeLightbox() {
        const overlay = document.querySelector('.sv-lightbox-overlay');
        if (!overlay) return;

        const img = overlay.querySelector('#svLightboxImage');
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        if (img) img.src = '';

        currentIndex = -1;
        currentItems = [];
    }

    document.addEventListener('click', function (e) {
        const link = e.target && e.target.closest ? e.target.closest('a.sv-lightbox') : null;
        if (!link) return;

        e.preventDefault();
        openLightboxFromLink(link);
    });

    document.addEventListener('click', function (e) {
        const overlay = document.querySelector('.sv-lightbox-overlay');
        if (!overlay || !overlay.classList.contains('is-open')) return;

        if (e.target === overlay) {
            closeLightbox();
        }

        const closeBtn = e.target && e.target.closest ? e.target.closest('.sv-lightbox-close') : null;
        if (closeBtn) {
            closeLightbox();
        }

        const prevBtn = e.target && e.target.closest ? e.target.closest('.sv-lightbox-prev') : null;
        if (prevBtn) {
            goPrev();
        }

        const nextBtn = e.target && e.target.closest ? e.target.closest('.sv-lightbox-next') : null;
        if (nextBtn) {
            goNext();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
})();
