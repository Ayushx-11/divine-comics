/* Divine Comics — interactions */

(() => {
  // Hero load-in
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-loaded'));

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Hide nav on scroll-down, show on scroll-up (cinema-style)
  let lastY = 0;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking || !nav) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > 120 && y > lastY) nav.classList.add('is-hidden');
      else nav.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    });
  }, { passive: true });

  // Hero parallax
  const heroImg = document.querySelector('.hero__media img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let p = false;
    window.addEventListener('scroll', () => {
      if (p) return;
      p = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        heroImg.style.transform = `scale(${1 + y * 0.00018}) translateY(${y * 0.18}px)`;
        p = false;
      });
    }, { passive: true });
  }
})();

// Subscribe (client-side only, no backend)
function handleSubscribe(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const input = document.getElementById('email');
  if (note && input && input.value) {
    note.textContent = `Thanks — we'll be in touch at ${input.value}.`;
    input.value = '';
  }
  return false;
}
