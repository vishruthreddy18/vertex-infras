// ═══════════════════════════════════════════════
//  VERTEX INFRAS — Site Data
//  Edit this file to update all website content.
//  No need to touch any HTML or script.js.
// ═══════════════════════════════════════════════

const SITE = {

  // ── BRAND ─────────────────────────────────────
  name: 'Vertex Infras',
  fullName: 'Vertex Infras',
  tagline: 'Towards Finest Engineering',
  email: 'hello@vertexinfras.com',
  projectsEmail: 'projects@vertexinfras.com',
  phone: ['+91 22 4567 8900', '+91 98765 43210'],
  address: '123 Infrastructure Lane, Bandra West<br>Mumbai, Maharashtra 400050',
  social: {
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },

  // ── NAVIGATION ────────────────────────────────
  nav: [
    { text: 'Home',         href: 'index.html' },
    { text: 'About',        href: 'about.html' },
    { text: 'Projects',     href: 'projects.html' },
    { text: 'Testimonials', href: 'testimonials.html' },
    { text: 'Contact',      href: 'contact.html' },
  ],

  // ── PAGE BANNERS (inner pages) ────────────────
  banners: {
    about:        { title: 'About Us',      sub: 'Precision engineering, lasting impact' },
    projects:     { title: 'Our Projects',   sub: 'A portfolio of landmark infrastructure' },
    testimonials: { title: 'Testimonials',   sub: 'Trusted by industry leaders across India' },
    contact:      { title: 'Contact Us',     sub: 'Find your dream home, apartment, or villa — we\'re here to help' },
  },

  // ── HERO (home only) ─────────────────────────
  hero: {
    heading: 'Shaping Skylines,<br>Building <em>Legacy</em>',
    sub: 'We engineer the foundations of progress — structures that inspire, infrastructure that endures, and communities that thrive.',
    ctaPrimary: { text: 'Explore Projects', href: 'projects.html' },
    ctaSecondary: { text: 'Our Story', href: 'about.html' },
  },

  // ── STATS ─────────────────────────────────────
  stats: [
    { value: 150, label: 'Projects Delivered' },
    { value: 12,  label: 'Years of Excellence' },
  ],

  // ── FEATURED PROJECTS (home page showcase) ────
  // Apple-style full-bleed sections on the home page.
  // To add a new one, copy any object and edit.
  // Uncomment `image` when you have real photos.
  featured: [
    {
      title: 'Metro River Bridge',
      subtitle: '1.2 km cable-stayed landmark',
      tag: 'Now Complete',
      badge: 'Ready to Move-In',
      desc: 'Connecting two major urban districts with a dual carriageway, designed to carry 80,000 vehicles daily.',
      stat1: { value: '1.2 km', label: 'Total Span' },
      stat2: { value: '₹240 Cr', label: 'Project Value' },
      stat3: { value: '2024', label: 'Completed' },
      bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 40%, #1e1e1e 100%)',
      // image: 'images/bridge-hero.jpg',
      cta: { text: 'View Project', href: 'projects.html' },
    },
    {
      title: 'Green Valley Township',
      subtitle: 'Where nature meets modern living',
      tag: 'Booking Open',
      badge: 'Selling Fast',
      desc: 'An eco-friendly integrated township with solar-powered amenities, smart water management, and lush green landscapes.',
      stat1: { value: '120', label: 'Acres' },
      stat2: { value: '1,200+', label: 'Homes' },
      stat3: { value: 'Pune', label: 'Location' },
      bg: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a20 40%, #1e1e1e 100%)',
      // image: 'images/township-hero.jpg',
      cta: { text: 'Explore Township', href: 'projects.html' },
    },
    {
      title: 'Skyline Residences',
      subtitle: 'Luxury redefined at every floor',
      tag: 'Coming Soon',
      badge: 'Pre-Launch',
      desc: 'Twin 40-story towers with panoramic city views, infinity pool, and world-class amenities in the heart of Mumbai.',
      stat1: { value: '40', label: 'Storeys' },
      stat2: { value: '2 & 3 BHK', label: 'Configurations' },
      stat3: { value: '2026', label: 'Possession' },
      bg: 'linear-gradient(135deg, #1a1a1a 0%, #2a2528 40%, #1e1e1e 100%)',
      // image: 'images/skyline-hero.jpg',
      cta: { text: 'Register Interest', href: 'contact.html' },
    },
  ],

  // ── ABOUT ─────────────────────────────────────
  about: {
    tag: 'Who We Are',
    heading: 'Precision Engineering,<br>Lasting Impact',
    paragraphs: [
      'Vertex Infras is a premier civil engineering consultancy committed to shaping India\'s infrastructure landscape. We bring together deep technical expertise, innovative design thinking, and an unwavering commitment to quality.',
      'From concept to completion, our multidisciplinary team delivers solutions across structural, geotechnical, transportation, and environmental engineering — projects that communities depend on for generations.',
    ],
    badgeNum: '12+',
    badgeLabel: 'Years',
    values: [
      { icon: 'check',  title: 'Quality Assurance', desc: 'ISO-certified processes at every stage' },
      { icon: 'layers', title: 'BIM Integrated',    desc: 'Advanced 3D modeling & planning' },
      { icon: 'team',   title: 'Expert Team',       desc: '50+ licensed professional engineers' },
      { icon: 'shield', title: 'Safety First',      desc: 'Zero-incident commitment on every site' },
    ],
    // Team members — add photo paths when ready
    team: [
      {
        name: 'Muheeb Ahmed',
        role: 'Founder & Managing Director',
        // photo: 'images/team/muheeb.jpg',
        bio: 'Over 25 years of experience in real estate development across South India.',
      },
      {
        name: 'Priya Sharma',
        role: 'Chief Architect',
        // photo: 'images/team/priya.jpg',
        bio: 'Award-winning architect specializing in sustainable residential design.',
      },
      {
        name: 'Rajiv Menon',
        role: 'Head of Engineering',
        // photo: 'images/team/rajiv.jpg',
        bio: 'Structural engineering expert with 18+ years in high-rise construction.',
      },
      {
        name: 'Deepa Nair',
        role: 'VP, Sales & Marketing',
        // photo: 'images/team/deepa.jpg',
        bio: 'Driving customer relationships and community engagement since 2010.',
      },
    ],
    // Past/completed projects shown in a separate section below
    pastProjects: [
      {
        title: 'Vertex Venezia', location: 'East Bangalore',
        type: '2 BHK Apartments', status: 'Delivered', year: 2020,
        // image: 'images/past/venezia.jpg',
      },
      {
        title: 'Vertex Fairmount', location: 'South Bangalore',
        type: '2 & 3 BHK Apartments', status: 'Delivered', year: 2019,
        // image: 'images/past/fairmount.jpg',
      },
      {
        title: 'Vertex Wellington', location: 'Gunjur, Bangalore',
        type: '2 & 3 BHK Apartments', status: 'Delivered', year: 2022,
        // image: 'images/past/wellington.jpg',
      },
    ],
  },

  // ── PROJECTS (projects page) ──────────────────
  // Full list shown on projects.html.
  // To add a project: copy any object and edit.
  // `bg` is a CSS class for the card gradient (proj-1 … proj-6).
  // `image` (optional): path to a real photo.
  projects: {
    tag: 'Portfolio',
    heading: 'Featured Projects',
    desc: 'A selection of landmark projects that reflect our engineering precision and commitment to excellence.',
    items: [
      {
        tag: 'Infrastructure', title: 'Metro River Bridge', bg: 'proj-1',
        desc: 'A 1.2 km cable-stayed bridge with dual carriageway connecting two major urban districts.',
        location: 'Mumbai', year: 2024, stat: '₹240 Cr',
        // image: 'images/bridge.jpg',
      },
      {
        tag: 'Township', title: 'Green Valley Integrated Township', bg: 'proj-2',
        desc: 'Eco-friendly township with smart water management and solar-powered community facilities.',
        location: 'Pune', year: 2023, stat: '120 Acres',
      },
      {
        tag: 'Highway', title: 'NH-48 Expressway Expansion', bg: 'proj-3',
        desc: '6-lane expressway with flyovers, underpasses, and modern toll infrastructure.',
        location: 'Gujarat', year: 2023, stat: '85 km',
      },
      {
        tag: 'Water', title: 'City Water Treatment Plant', bg: 'proj-4',
        desc: '50 MLD capacity water treatment facility serving 200,000+ residents.',
        location: 'Bangalore', year: 2022, stat: '50 MLD',
      },
      {
        tag: 'Institutional', title: 'Government Office Complex', bg: 'proj-5',
        desc: '5-story earthquake-resistant complex with IGBC green building certification.',
        location: 'Delhi', year: 2024, stat: '₹180 Cr',
      },
      {
        tag: 'Industrial', title: 'Industrial Corridor Development', bg: 'proj-6',
        desc: '200-acre industrial corridor with road network and complete utility infrastructure.',
        location: 'Hyderabad', year: 2024, stat: '200 Acres',
      },
    ],
    // Past/completed projects shown in a separate grid
    pastProjects: [
      {
        title: 'Vertex Venezia', location: 'East Bangalore',
        type: '2 BHK Apartments', status: 'Delivered', year: 2020,
        // image: 'images/past/venezia.jpg',
      },
      {
        title: 'Vertex Fairmount', location: 'South Bangalore',
        type: '2 & 3 BHK Apartments', status: 'Delivered', year: 2019,
        // image: 'images/past/fairmount.jpg',
      },
      {
        title: 'Vertex Wellington', location: 'Gunjur, Bangalore',
        type: '2 & 3 BHK Apartments', status: 'Delivered', year: 2022,
        // image: 'images/past/wellington.jpg',
      },
    ],
  },

  // ── TESTIMONIALS ──────────────────────────────
  testimonials: {
    tag: 'Client Voices',
    heading: 'Trusted by Industry Leaders',
    desc: 'Our reputation is built on consistently exceeding expectations through transparent communication and engineering excellence.',
    items: [
      {
        text: 'Vertex Infras delivered our bridge project ahead of schedule with exceptional structural quality. Their attention to detail and proactive communication gave us complete confidence throughout.',
        name: 'Rajesh Patel', role: 'Director, Metro Transport Authority', stars: 5,
      },
      {
        text: 'Working with Vertex on our township project was seamless. Their sustainable engineering approach and world-class project management make them our go-to partner for large-scale developments.',
        name: 'Anita Sharma', role: 'CEO, GreenBuild Developers', stars: 5,
      },
      {
        text: 'The highway expansion was executed flawlessly. Vertex\'s engineering team handled complex geotechnical challenges with remarkable expertise. They turned our vision into a road that transforms the region.',
        name: 'Vikram Kulkarni', role: 'Chief Engineer, NHAI Western Division', stars: 5,
      },
    ],
  },

  // ── CONTACT ───────────────────────────────────
  contact: {
    tag: 'Get In Touch',
    heading: 'Your Dream Home<br>Awaits',
    desc: 'Whether you\'re looking for a premium apartment, an independent villa, or a plot in our upcoming townships — our team is ready to guide you every step of the way.',
    services: [
      'Premium Apartments',
      'Independent Villas',
      'Plots & Layouts',
      'Township Living',
      'Commercial Spaces',
      'Other Enquiry',
    ],
  },

  // ── FOOTER ────────────────────────────────────
  footer: {
    desc: 'Engineering India\'s infrastructure future with precision, innovation, and an unwavering commitment to excellence.',
    columns: [
      { title: 'Company', links: [
        { text: 'About Us',  href: 'about.html' },
        { text: 'Projects',  href: 'projects.html' },
        { text: 'Careers',   href: '#' },
        { text: 'News',      href: '#' },
      ]},
      { title: 'Services', links: [
        { text: 'Structural Design',    href: '#' },
        { text: 'Highway Engineering',  href: '#' },
        { text: 'Water & Environment',  href: '#' },
        { text: 'Project Management',   href: '#' },
      ]},
      { title: 'Connect', links: [
        { text: 'Contact Us', href: 'contact.html' },
        { text: 'LinkedIn',   href: '#' },
        { text: 'Twitter',    href: '#' },
        { text: 'Instagram',  href: '#' },
      ]},
    ],
  },
};