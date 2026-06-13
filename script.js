/* ============================================
   Tanisha's Portfolio — JavaScript
   Features: Typing Animation, Dark/Light Theme,
   Scroll Reveal, Mobile Menu, Back-to-Top,
   Active Nav Links, Skill Bar Animation,
   Contact Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. TYPING ANIMATION
  // ============================================
  const typedTextEl = document.getElementById('typed-text');
  const cursorEl    = document.getElementById('cursor');
  const textArray   = [
    'Full Stack Developer',
    'Front-End Developer',
    'UI/UX Enthusiast',
    'Creative Problem Solver',
    'Freelance Web Developer'
  ];
  let textIndex    = 0;   // which string we're on
  let charIndex    = 0;   // which char within the string
  let isDeleting   = false;
  const typeSpeed  = 80;
  const deleteSpeed = 40;
  const pauseEnd   = 1800; // pause after full string
  const pauseStart = 400;  // pause before deleting

  function type() {
    const current = textArray[textIndex];

    if (!isDeleting) {
      // Typing forward
      typedTextEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Finished typing — pause then delete
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    } else {
      // Deleting backward
      typedTextEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, pauseStart);
        return;
      }
      setTimeout(type, deleteSpeed);
    }
  }

  // Kick off the typing animation
  setTimeout(type, 500);


  // ============================================
  // 2. DARK / LIGHT THEME TOGGLE
  // ============================================
  const html = document.documentElement;
  const desktopToggle = document.getElementById('desktop-theme-toggle');
  const mobileToggle  = document.getElementById('mobile-theme-toggle');

  // Load saved theme, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcons(next);
  }

  function updateThemeIcons(theme) {
    const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    const remove = theme === 'dark' ? 'fa-moon' : 'fa-sun';

    [desktopToggle, mobileToggle].forEach(btn => {
      if (!btn) return;
      const i = btn.querySelector('i');
      i.classList.remove('fa-sun', 'fa-moon');
      i.classList.add(icon);
    });
  }

  desktopToggle?.addEventListener('click', toggleTheme);
  mobileToggle?.addEventListener('click', toggleTheme);


  // ============================================
  // 3. MOBILE HAMBURGER MENU
  // ============================================
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks   = navMenu?.querySelectorAll('a');

  function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay?.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  navLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // ============================================
  // 4. ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections     = document.querySelectorAll('section[id]');
  const allNavLinks  = document.querySelectorAll('.nav-menu a');

  function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);


  // ============================================
  // 5. SCROLL REVEAL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ============================================
  // 6. SKILL BAR ANIMATION
  // ============================================
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => skillObserver.observe(bar));


  // ============================================
  // 7. BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ============================================
  // 8. NAVBAR SHADOW ON SCROLL
  // ============================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
    } else {
      navbar.style.boxShadow = 'var(--nav-shadow)';
    }
  });


  // ============================================
  // 9. CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      return;
    }

    // Simulate form submission (replace with actual API call)
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');

    // Reset after 4 seconds
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = '';
      formSuccess.classList.remove('show');
    }, 4000);
  });


  // ============================================
  // 10. SMOOTH SCROLL POLYFILL (for older Safari)
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
