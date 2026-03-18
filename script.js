// ═══════════════════════════════════════════════
//  VERTEX INFRAS — Renderer + Interactions
//  Reads from SITE object in data.js.
//  Auto-detects which page it's on and renders
//  only the relevant sections.
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── DETECT CURRENT PAGE ───────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const PAGE = path.replace('.html', '') || 'index';

  // ── ICON LIBRARY ──────────────────────────────
  const ICONS = {
    check:    '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>',
    layers:   '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    team:     '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    shield:   '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    pin:      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    phone:    '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
    mail:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    arrow:    '<path d="M5 12h14M12 5l7 7-7 7"/>',
    star:     '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    linkedin: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>',
    twitter:  '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>',
    instagram:'<rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5"/>',
  };

  const icon = (name) => `<svg viewBox="0 0 24 24">${ICONS[name]}</svg>`;
  const stars = (n) => Array(n).fill(icon('star')).join('');
  const initials = (name) => name.split(' ').map(w => w[0]).join('');
  const delay = (i) => i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : '';

  // Helper: only render if container exists on this page
  const into = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };


  // ═══ SHARED: NAV + FOOTER (every page) ════════

  const renderNav = () => {
    const links = SITE.nav.map(l => {
      const file = l.href.replace('.html', '');
      const active = (file === PAGE || (file === 'index' && PAGE === 'index')) ? ' class="active"' : '';
      return `<li><a href="${l.href}"${active}>${l.text}</a></li>`;
    }).join('');
    into('navbar', `
      <a href="index.html" class="logo">${SITE.name}</a>
      <ul class="nav-links" id="navLinks">${links}</ul>
      <a href="contact.html" class="nav-cta">Enquire Now</a>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>`);
  };

  const renderFooter = () => {
    const f = SITE.footer;
    const cols = f.columns.map(col => `
      <div class="footer-col">
        <h4>${col.title}</h4>
        <ul>${col.links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('')}</ul>
      </div>`).join('');
    const socialMap = { linkedin: 'linkedin', twitter: 'twitter', instagram: 'instagram' };
    const socialLinks = Object.entries(SITE.social).map(([key, href]) =>
      `<a href="${href}" aria-label="${key}">${icon(socialMap[key])}</a>`).join('');
    into('footer', `
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">${SITE.name}</a>
          <p>${f.desc}</p>
        </div>
        ${cols}
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">&copy; ${new Date().getFullYear()} ${SITE.fullName}. All rights reserved.</span>
        <div class="social-links">${socialLinks}</div>
      </div>`);
  };

  // ── SCROLL TO TOP BUTTON (all pages) ──────────
  const renderScrollTop = () => {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const halfPage = window.innerHeight * 0.5;
      btn.classList.toggle('visible', window.scrollY > halfPage);
    }, { passive: true });
  };


  // ═══ PAGE BANNER (inner pages) ════════════════

  const renderBanner = () => {
    const data = SITE.banners[PAGE];
    if (!data) return;
    into('page-banner', `
      <div class="banner-content">
        <span class="hero-tag">${SITE.tagline}</span>
        <h1>${data.title}</h1>
        <p class="banner-sub">${data.sub}</p>
      </div>`);
  };


  // ═══ SECTION RENDERERS ════════════════════════

  const renderHero = () => {
    const h = SITE.hero;
    into('hero', `
      <div class="hero-bg"></div>
      <div class="hero-grid-lines"></div>
      <div class="hero-content">
        <span class="hero-tag">${SITE.tagline}</span>
        <h1>${h.heading}</h1>
        <p class="hero-sub">${h.sub}</p>
        <div class="hero-actions">
          <a href="${h.ctaPrimary.href}" class="btn-gold">${h.ctaPrimary.text}</a>
          <a href="${h.ctaSecondary.href}" class="btn-ghost">${h.ctaSecondary.text}</a>
        </div>
      </div>`);
  };

  const renderStats = () => {
    into('stats', SITE.stats.map((s, i) => `
      <div class="stat-item reveal${delay(i)}">
        <div class="stat-num" data-count="${s.value}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join(''));
  };

  const renderAbout = () => {
    const a = SITE.about;
    const paras = a.paragraphs.map((p, i) =>
      `<p class="section-desc reveal${delay(i + 1)}" ${i ? 'style="margin-top:1rem"' : ''}>${p}</p>`).join('');
    const values = a.values.map(v => `
      <div class="value-item">
        <div class="value-icon">${icon(v.icon)}</div>
        <h4>${v.title}</h4><p>${v.desc}</p>
      </div>`).join('');
    into('about', `
      <div class="container"><div class="about-layout">
        <div class="about-visual reveal">
          <div class="about-img-main">
            <div class="about-badge">
              <div class="num">${a.badgeNum}</div>
              <div class="label">${a.badgeLabel}</div>
            </div>
          </div>
        </div>
        <div class="about-text">
          <div class="section-intro reveal">
            <span class="section-tag">${a.tag}</span>
            <h2 class="section-title">${a.heading}</h2>
            <div class="section-line"></div>
          </div>
          ${paras}
          <div class="about-values reveal${delay(a.paragraphs.length + 1)}">${values}</div>
        </div>
      </div></div>
      ${a.team ? `
      <div class="container" style="margin-top:6rem">
        <div class="section-intro center reveal">
          <span class="section-tag">Our Leadership</span>
          <h2 class="section-title">The Team Behind the Vision</h2>
          <div class="section-line"></div>
        </div>
        <div class="team-grid">
          ${a.team.map((member, i) => `
          <div class="team-card reveal${delay(i)}">
            <div class="team-photo">
              ${member.photo
                ? `<img src="${member.photo}" alt="${member.name}" loading="lazy">`
                : `<div class="team-placeholder"><span>${initials(member.name)}</span></div>`}
            </div>
            <h3 class="team-name">${member.name}</h3>
            <p class="team-role">${member.role}</p>
            <p class="team-bio">${member.bio}</p>
          </div>`).join('')}
        </div>
      </div>` : ''}
    `);
  };

  const renderProjects = () => {
    const p = SITE.projects;

    const buildCards = (filter) => {
      const filtered = filter === 'all' ? p.items : p.items.filter(proj => proj.category === filter);
      if (!filtered.length) return `<p class="no-results">No projects found in this category.</p>`;
      return filtered.map((proj, i) => {
        const img = proj.image ? `<img src="${proj.image}" alt="${proj.title}" loading="lazy">` : '';
        return `
        <a href="project-detail.html?id=${proj.id}" class="project-card reveal${delay(i % 3)}" data-category="${proj.category}">
          <div class="card-bg ${proj.bg}">${img}</div>
          <div class="overlay"></div>
          <div class="card-content">
            <div class="card-tag">${proj.tag}</div>
            <h3>${proj.title}</h3>
            <p class="card-desc">${proj.desc}</p>
            <div class="card-meta">
              <span>${proj.location}</span><span>${proj.year}</span><span>${proj.stat}</span>
            </div>
            <div class="card-arrow">View Details ${icon('arrow')}</div>
          </div>
        </a>`;
      }).join('');
    };

    const buildPastCards = (filter) => {
      if (!p.pastProjects || !p.pastProjects.length) return '';
      const filtered = filter === 'all' ? p.pastProjects : p.pastProjects.filter(proj => proj.category === filter);
      if (!filtered.length) return `<p class="no-results">No past projects found in this category.</p>`;
      return filtered.map((proj, i) => `
        <a href="project-detail.html?id=${proj.id}" class="past-card reveal${delay(i % 3)}">
          <div class="past-thumb">
            ${proj.image
              ? `<img src="${proj.image}" alt="${proj.title}" loading="lazy">`
              : `<div class="past-placeholder"><span>${proj.title.charAt(0)}</span></div>`}
            <div class="past-status">${proj.status}</div>
          </div>
          <div class="past-info">
            <h3>${proj.title}</h3>
            <p>${proj.type} &middot; ${proj.location}</p>
            <span class="past-year">${proj.year}</span>
          </div>
        </a>`).join('');
    };

    const cards = buildCards('all');
    const pastHtml = p.pastProjects && p.pastProjects.length ? `
      <div class="container-wide" style="margin-top:6rem">
        <div class="section-intro reveal">
          <span class="section-tag">Completed</span>
          <h2 class="section-title">Past Projects</h2>
          <div class="section-line"></div>
        </div>
        <div class="past-grid" id="past-grid">${buildPastCards('all')}</div>
      </div>` : '';

    into('projects', `
      <div class="container-wide">
        <div class="projects-header">
          <div class="section-intro reveal">
            <span class="section-tag">${p.tag}</span>
            <h2 class="section-title">${p.heading}</h2>
            <div class="section-line"></div>
            <p class="section-desc">${p.desc}</p>
          </div>
        </div>
        <div class="proj-filters">
          <button class="proj-filter active" data-filter="all">All</button>
          <button class="proj-filter" data-filter="apartments">Apartments</button>
          <button class="proj-filter" data-filter="villas">Villas</button>
          <button class="proj-filter" data-filter="other">Other Projects</button>
        </div>
        <div class="projects-grid" id="projects-grid">${cards}</div>
      </div>
      ${pastHtml}`);

    document.querySelectorAll('.proj-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        const grid = document.getElementById('projects-grid');
        grid.innerHTML = buildCards(filter);
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

        const pastGrid = document.getElementById('past-grid');
        if (pastGrid) {
          pastGrid.innerHTML = buildPastCards(filter);
          pastGrid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        }
      });
    });
  };

  const renderTestimonials = () => {
    const t = SITE.testimonials;
    const cards = t.items.map((item, i) => `
      <div class="test-card reveal${delay(i)}">
        <div class="test-quote">&ldquo;</div>
        <div class="test-stars">${stars(item.stars)}</div>
        <p class="test-text">${item.text}</p>
        <div class="test-author">
          <div class="test-avatar">${initials(item.name)}</div>
          <div>
            <div class="test-name">${item.name}</div>
            <div class="test-role">${item.role}</div>
          </div>
        </div>
      </div>`).join('');
    into('testimonials', `
      <div class="container">
        <div class="section-intro center reveal">
          <span class="section-tag">${t.tag}</span>
          <h2 class="section-title">${t.heading}</h2>
          <div class="section-line"></div>
          <p class="section-desc">${t.desc}</p>
        </div>
        <div class="testimonials-track">${cards}</div>
      </div>`);
  };

  const renderContact = () => {
    const c = SITE.contact;
    const options = c.services.map(s => `<option>${s}</option>`).join('');
    const rows = [
      { icon: 'pin',   title: 'Visit Us', text: SITE.address },
      { icon: 'phone', title: 'Call Us',   text: SITE.phone.join('<br>') },
      { icon: 'mail',  title: 'Email Us',  text: `${SITE.email}<br>${SITE.projectsEmail}` },
    ].map(r => `
      <div class="contact-row">
        <div class="contact-row-icon">${icon(r.icon)}</div>
        <div><h4>${r.title}</h4><p>${r.text}</p></div>
      </div>`).join('');
    into('contact', `
      <div class="container"><div class="contact-layout">
        <div class="contact-left">
          <div class="section-intro reveal">
            <span class="section-tag">${c.tag}</span>
            <h2 class="section-title">${c.heading}</h2>
            <div class="section-line"></div>
            <p class="section-desc">${c.desc}</p>
          </div>
          <div class="contact-details reveal reveal-delay-1">${rows}</div>
        </div>
        <div class="contact-form reveal reveal-delay-2">
          <div class="form-row">
            <div class="form-group"><label for="name">Full Name</label><input type="text" id="name" placeholder="John Doe"></div>
            <div class="form-group"><label for="email">Email Address</label><input type="email" id="email" placeholder="john@company.com"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label for="phone">Phone Number</label><input type="tel" id="phone" placeholder="+91 98765 43210"></div>
            <div class="form-group"><label for="service">Service Required</label><select id="service"><option value="">Select a service</option>${options}</select></div>
          </div>
          <div class="form-group"><label for="message">Project Details</label><textarea id="message" placeholder="Tell us what you're looking for — preferred location, budget, type of property, or any questions you have..."></textarea></div>
          <button type="button" class="btn-submit" id="submitBtn">Send Enquiry</button>
        </div>
      </div></div>`);
  };


  const renderShowcase = () => {
    const items = SITE.featured;
    if (!items || !document.getElementById('showcase')) return;

    // Build showcase sections
    const sections = items.map((item, i) => {
      const bgContent = item.image
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
        : `<div class="gradient-bg" style="background:${item.bg}"></div>`;

      const visual = item.image
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
        : `<div class="placeholder-art">
            <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="30" width="60" height="100" rx="2" fill="white"/>
              <rect x="110" y="10" width="60" height="120" rx="2" fill="white"/>
              <rect x="35" y="40" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="55" y="40" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="35" y="60" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="55" y="60" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="115" y="20" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="135" y="20" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="115" y="40" width="14" height="10" rx="1" fill="currentColor"/>
              <rect x="135" y="40" width="14" height="10" rx="1" fill="currentColor"/>
            </svg>
           </div>`;

      return `
      <div class="showcase-section" data-showcase="${i}">
        <div class="showcase-bg">${bgContent}</div>
        <div class="showcase-grain"></div>
        <div class="showcase-content">
          <div class="showcase-text">
            ${item.badge ? `<div class="showcase-badge">${item.badge}</div>` : ''}
            <div class="showcase-tag">${item.tag}</div>
            <p class="showcase-subtitle">${item.subtitle}</p>
            <h2 class="showcase-title sc-reveal">${item.title}</h2>
            <p class="showcase-desc sc-reveal sc-delay-1">${item.desc}</p>
            <div class="showcase-stats sc-reveal sc-delay-2">
              <div><div class="showcase-stat-num">${item.stat1.value}</div><div class="showcase-stat-label">${item.stat1.label}</div></div>
              <div><div class="showcase-stat-num">${item.stat2.value}</div><div class="showcase-stat-label">${item.stat2.label}</div></div>
              <div><div class="showcase-stat-num">${item.stat3.value}</div><div class="showcase-stat-label">${item.stat3.label}</div></div>
            </div>
            <a href="${item.cta.href}" class="showcase-cta sc-reveal sc-delay-3">
              ${item.cta.text}
              ${icon('arrow')}
            </a>
          </div>
          <div class="showcase-visual sc-reveal sc-delay-2">
            <div class="showcase-visual-frame">${visual}</div>
          </div>
        </div>
      </div>
      ${i < items.length - 1 ? '<div class="showcase-divider"></div>' : ''}`;
    }).join('');

    // Dot navigation
    const dots = items.map((_, i) =>
      `<div class="showcase-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></div>`
    ).join('');

    into('showcase', `
      ${sections}
      <div class="showcase-dots" id="showcaseDots">${dots}</div>
    `);

    // ── Showcase scroll animations ────────────────
    const showcaseSections = document.querySelectorAll('.showcase-section');
    const dotsContainer = document.getElementById('showcaseDots');
    const allDots = document.querySelectorAll('.showcase-dot');

    // Reveal elements inside each showcase section
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

    // Dot navigation — highlight active + show/hide
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

    // Click dot to scroll
    allDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const i = +dot.dataset.dot;
        showcaseSections[i]?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Parallax on showcase backgrounds
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
  };

  const renderProjectDetail = () => {
    const el = document.getElementById('project-detail');
    if (!el) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const allProjects = [...SITE.projects.items, ...SITE.projects.pastProjects];
    const proj = allProjects.find(p => p.id === id);
    if (!proj) { el.innerHTML = `<div class="container" style="padding:8rem 2rem;text-align:center"><h2>Project not found.</h2><a href="projects.html" class="btn-gold" style="margin-top:2rem;display:inline-block">Back to Projects</a></div>`; return; }
    document.title = `${proj.title} | Vertex Infras`;

    const highlightItems = (proj.highlights || []).map(h => `<li class="pd-highlight-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${h}</li>`).join('');
    const amenityItems = (proj.amenities || []).map(a => `<div class="pd-amenity">${a}</div>`).join('');
    const floorPlanItems = (proj.floorPlans || []).map(f => `
      <div class="pd-floor-card">
        <div class="pd-floor-placeholder"><span>${f.label}</span></div>
        <div class="pd-floor-info"><strong>${f.label}</strong><span>${f.size}</span></div>
      </div>`).join('');

    el.innerHTML = `
      <div class="pd-hero ${proj.bg}">
        <div class="pd-hero-overlay"></div>
        <div class="pd-hero-content">
          <a href="projects.html" class="pd-back">← Back to Projects</a>
          <div class="pd-hero-tag">${proj.tag}</div>
          <h1>${proj.title}</h1>
          <p class="pd-hero-loc">${proj.location} &nbsp;·&nbsp; ${proj.year}</p>
          <span class="pd-status">${proj.status}</span>
        </div>
      </div>

      <div class="pd-body">
        <div class="pd-main">

          <section class="pd-section reveal">
            <h2 class="pd-section-title">Overview</h2>
            <p class="pd-desc">${proj.fullDesc}</p>
            <div class="pd-specs">
              <div class="pd-spec"><span class="pd-spec-label">Units</span><span class="pd-spec-val">${proj.specs.units}</span></div>
              <div class="pd-spec"><span class="pd-spec-label">Sizes</span><span class="pd-spec-val">${proj.specs.sizes}</span></div>
              <div class="pd-spec"><span class="pd-spec-label">Possession</span><span class="pd-spec-val">${proj.specs.possession}</span></div>
            </div>
          </section>

          <section class="pd-section reveal">
            <h2 class="pd-section-title">Gallery</h2>
            <div class="pd-gallery">
              ${[1,2,3,4].map(n => `<div class="pd-gallery-item ${proj.bg}" style="opacity:${0.5 + n*0.1}"><span>Image ${n}</span></div>`).join('')}
            </div>
            <p class="pd-gallery-note">Add images to the <code>images/</code> folder and update the project data to display real photos.</p>
          </section>

          ${highlightItems ? `
          <section class="pd-section reveal">
            <h2 class="pd-section-title">Highlights</h2>
            <ul class="pd-highlights">${highlightItems}</ul>
          </section>` : ''}

          ${amenityItems ? `
          <section class="pd-section reveal">
            <h2 class="pd-section-title">Amenities</h2>
            <div class="pd-amenities">${amenityItems}</div>
          </section>` : ''}

          ${floorPlanItems ? `
          <section class="pd-section reveal">
            <h2 class="pd-section-title">Floor Plans</h2>
            <div class="pd-floor-plans">${floorPlanItems}</div>
            <p class="pd-gallery-note">Upload actual floor plan images to replace the placeholders above.</p>
          </section>` : ''}

        </div>

        <aside class="pd-sidebar">
          <div class="pd-enquire-card reveal">
            <h3>Interested in this project?</h3>
            <p>Get in touch with our team for pricing, availability, and a site visit.</p>
            <a href="contact.html" class="btn-gold" style="display:block;text-align:center;margin-bottom:1rem">Enquire Now</a>
            ${proj.brochure && proj.brochure !== '#' ? `<a href="${proj.brochure}" class="btn-ghost" style="display:block;text-align:center" download>Download Brochure</a>` : `<button class="btn-ghost" style="width:100%;cursor:not-allowed;opacity:0.5" disabled>Brochure Coming Soon</button>`}
            <div class="pd-contact-line"><a href="tel:${SITE.phone[0]}">${SITE.phone[0]}</a></div>
            <div class="pd-contact-line"><a href="mailto:${SITE.projectsEmail}">${SITE.projectsEmail}</a></div>
          </div>
        </aside>
      </div>`;
  };

  // ═══ RENDER ═══════════════════════════════════
  // Nav + footer on every page
  renderNav();
  renderFooter();
  renderScrollTop();

  // Page-specific sections — only runs if the
  // container exists on the current page's HTML
  renderBanner();
  renderHero();
  renderStats();
  renderShowcase();
  renderAbout();
  renderProjects();
  renderTestimonials();
  renderContact();
  renderProjectDetail();


  // ═══ INTERACTIONS ═════════════════════════════

  // ── Navbar scroll ──────────────────────────────
  const nav = document.getElementById('navbar');
  const isHome = PAGE === 'index';
  // Inner pages start scrolled (dark banner, not full hero)
  if (!isHome) nav.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    if (isHome) nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Mobile menu ────────────────────────────────
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'))
  );

  // ── Scroll reveal ──────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Counter animation (if stats bar exists) ───
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

  // ── Contact form (if on contact page) ─────────
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      if (!name || !email || !msg) { alert('Please fill in at least your name, email, and project details.'); return; }
      const subject = encodeURIComponent(`Property Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${document.getElementById('phone').value}\nService: ${document.getElementById('service').value}\n\nMessage:\n${msg}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      submitBtn.textContent = 'Redirecting to Mail…';
      setTimeout(() => submitBtn.textContent = 'Send Enquiry', 3000);
    });
  }

  // ── Hero parallax (home only) ──────────────────
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

});