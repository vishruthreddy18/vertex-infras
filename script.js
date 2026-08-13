document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll + hamburger ──────────────────────
  const nav = document.getElementById('navbar');
  const isHome = window.location.pathname.split('/').pop().replace('.html', '') === 'index'
    || window.location.pathname.endsWith('/');

  if (!isHome) nav.classList.add('scrolled');
  window.addEventListener('scroll', () => {
    if (isHome) nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'))
  );

  // ── Scroll-to-top button ────────────────────────
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
  }, { passive: true });

  // ── Reveal on scroll ────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Stat counter animation ──────────────────────
  const statsBar = document.getElementById('stats');
  if (statsBar) {
    let counted = false;
    new IntersectionObserver(entries => {
      if (counted || !entries[0].isIntersecting) return;
      counted = true;
      document.querySelectorAll('.stat-num[data-count]').forEach(el => {
        const target = +el.dataset.count, start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / 2000, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + '+';
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 }).observe(statsBar);
  }

  // ── Project filter (projects page) ──────────────
  const filterBtns = document.querySelectorAll('.proj-filter');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        let featuredVisible = 0, pastVisible = 0;

        document.querySelectorAll('#projects-grid .project-card').forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          if (show) featuredVisible++;
        });
        document.querySelectorAll('#past-grid .past-card').forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          if (show) pastVisible++;
        });

        const featuredSection = document.getElementById('featured-section');
        const pastSection = document.getElementById('past-section');
        if (featuredSection) featuredSection.style.display = featuredVisible ? '' : 'none';
        if (pastSection) pastSection.style.display = pastVisible ? '' : 'none';
      });
    });
  }

  // ── Showcase scroll animations (home page) ──────
  const showcaseSections = document.querySelectorAll('.showcase-section');
  if (showcaseSections.length) {
    const dotsContainer = document.getElementById('showcaseDots');
    const allDots = document.querySelectorAll('.showcase-dot');

    const scObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.sc-reveal').forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 150);
          });
        }
      });
    }, { threshold: 0.25 });

    showcaseSections.forEach(section => {
      section.querySelectorAll('.sc-reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      scObserver.observe(section);
    });

    const updateDots = () => {
      const scrollY = window.scrollY;
      const first = showcaseSections[0];
      const last = showcaseSections[showcaseSections.length - 1];
      if (!first) return;
      const inRange = scrollY >= first.offsetTop - 200 &&
                      scrollY <= last.offsetTop + last.offsetHeight;
      dotsContainer.classList.toggle('hidden', !inRange);
      showcaseSections.forEach((section, i) => {
        const top = section.offsetTop - window.innerHeight * 0.4;
        const bottom = section.offsetTop + section.offsetHeight - window.innerHeight * 0.4;
        if (scrollY >= top && scrollY < bottom) {
          allDots.forEach(d => d.classList.remove('active'));
          allDots[i]?.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', updateDots, { passive: true });
    updateDots();

    allDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const i = +dot.dataset.dot;
        showcaseSections[i]?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    window.addEventListener('scroll', () => {
      showcaseSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / window.innerHeight;
        const bg = section.querySelector('.showcase-bg');
        if (bg && Math.abs(progress) < 2) {
          bg.style.transform = `translateY(${progress * 60}px) scale(1.05)`;
        }
      });
    }, { passive: true });
  }

  // ── Hero parallax (home page) ───────────────────
  if (isHome) {
    const heroContent = document.querySelector('.hero-content');
    const heroGrid = document.querySelector('.hero-grid-lines');
    window.addEventListener('scroll', () => {
      const y = window.scrollY, h = window.innerHeight;
      if (y < h) {
        const p = y / h;
        if (heroContent) { heroContent.style.transform = `translateY(${y * 0.3}px)`; heroContent.style.opacity = 1 - p * 1.2; }
        if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ── Gallery lightbox (project detail pages) ─────
  const galleryItems = document.querySelectorAll('.pd-gallery-item');
  if (galleryItems.length) {
    const urls = Array.from(galleryItems).map(item => {
      const match = item.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    });

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous photo">&#8249;</button>
      <img class="lightbox-img" alt="">
      <button class="lightbox-nav lightbox-next" aria-label="Next photo">&#8250;</button>
    `;
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    if (urls.filter(Boolean).length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
    let currentIndex = 0;

    const showImage = (i) => {
      currentIndex = (i + urls.length) % urls.length;
      lightboxImg.src = urls[currentIndex];
    };
    const openLightbox = (i) => {
      showImage(i);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    galleryItems.forEach((item, i) => {
      if (!urls[i]) return;
      item.classList.add('pd-gallery-clickable');
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', 'View larger image');
      item.addEventListener('click', () => openLightbox(i));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
    });

    prevBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); showImage(currentIndex + 1); });
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft' && urls.length > 1) showImage(currentIndex - 1);
      else if (e.key === 'ArrowRight' && urls.length > 1) showImage(currentIndex + 1);
    });
  }

  // ── Contact form ────────────────────────────────
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      if (!name || !email || !msg) { alert('Please fill in at least your name, email, and project details.'); return; }
      const subject = encodeURIComponent('Property Enquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + document.getElementById('phone').value + '\nService: ' + document.getElementById('service').value + '\n\nMessage:\n' + msg
      );
      window.location.href = 'mailto:hello@vertexinfras.com?subject=' + subject + '&body=' + body;
      submitBtn.textContent = 'Redirecting to Mail\u2026';
      setTimeout(() => submitBtn.textContent = 'Send Enquiry', 3000);
    });
  }

});