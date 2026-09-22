(() => {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  const savedTheme = localStorage.getItem('paolo-theme');
  if (savedTheme) root.dataset.theme = savedTheme;

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('paolo-theme', next);
  });

  menuToggle?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.paper-head').forEach(button => {
    button.addEventListener('click', () => {
      const paper = button.closest('.paper');
      const isOpen = paper.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.11, rootMargin: '0px 0px -30px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.getElementById('year').textContent = new Date().getFullYear();

  // Subtle procedural "molecular cloud" field: particles drift in a coherent flow,
  // giving the page motion without relying on stock astronomy imagery.
  const canvas = document.getElementById('cloud-canvas');
  const ctx = canvas?.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || !ctx || reducedMotion) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(110, Math.max(48, Math.floor((width * height) / 16000)));
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.4,
      speed: 0.08 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
      type: i % 3,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    const dark = root.dataset.theme !== 'light';

    particles.forEach((p, i) => {
      const flow = Math.sin((p.y / Math.max(height, 1)) * 5 + t * 0.00015 + p.phase);
      p.x += p.speed * (0.55 + flow * 0.55);
      p.y += Math.cos((p.x / Math.max(width, 1)) * 3 + p.phase) * 0.035;
      if (p.x > width + 20) p.x = -20;
      if (p.y > height + 20) p.y = -20;
      if (p.y < -20) p.y = height + 20;

      const alpha = 0.12 + (Math.sin(t * 0.001 + p.phase) + 1) * 0.045;
      const colors = dark
        ? [`rgba(143,255,210,${alpha})`, `rgba(121,184,255,${alpha})`, `rgba(246,210,124,${alpha * .72})`]
        : [`rgba(0,111,80,${alpha * .66})`, `rgba(23,105,169,${alpha * .58})`, `rgba(154,100,18,${alpha * .46})`];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = colors[p.type];
      ctx.fill();

      if (i % 7 === 0) {
        const next = particles[(i + 11) % particles.length];
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = dark ? `rgba(143,255,210,${0.025 * (1 - dist / 140)})` : `rgba(0,70,52,${0.018 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
})();
