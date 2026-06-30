/* =========================================================
   PORTFOLIO — main.js
   Apple + Linear + Framer 스타일 / 과도한 네온 금지
   GSAP 3.12 사용 (CDN으로 로드)
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   1. Cursor Orb  (마우스를 지연하며 부드럽게 추적)
   --------------------------------------------------------- */
(function initCursorOrb() {
  const orb = document.querySelector('.cursor-orb');
  if (!orb) return;

  let orbX = window.innerWidth / 2;
  let orbY = window.innerHeight / 2;
  let mouseX = orbX;
  let mouseY = orbY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function tick() {
    orbX += (mouseX - orbX) * 0.07;
    orbY += (mouseY - orbY) * 0.07;
    gsap.set(orb, { x: orbX, y: orbY });
    requestAnimationFrame(tick);
  })();
})();

/* ---------------------------------------------------------
   2. Floating Blobs  (천천히 부유하는 배경 요소)
   --------------------------------------------------------- */
[
  ['.hero-blob-1',  80,  50,  16,  9.0, 0.0],
  ['.hero-blob-2', -65, -45, -13, 11.5, 1.6],
  ['.hero-blob-3',  45,  65,   9,  7.5, 0.9],
].forEach(([sel, x, y, rot, dur, delay]) => {
  const el = document.querySelector(sel);
  if (!el) return;
  gsap.to(el, {
    x, y, rotation: rot,
    duration: dur,
    delay,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
});

/* ---------------------------------------------------------
   3. Hero Text Reveal  (GSAP stagger — 글자 단위)
   --------------------------------------------------------- */
(function initHeroReveal() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  /* 글자 분리 */
  const raw = heroName.textContent.trim();
  heroName.innerHTML = '';

  const chars = [...raw].map((ch) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.display = 'inline-block';
    heroName.appendChild(s);
    return s;
  });

  /* 타임라인 — 자연스럽고 절제된 속도 */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .from('.hero-bar--top', {
      y: -18, opacity: 0, duration: 0.55,
    })
    .from(chars, {
      y: 48, opacity: 0,
      duration: 0.75, stagger: 0.03,
    }, '-=0.15')
    .from('.hero-tagline', {
      y: 20, opacity: 0, duration: 0.6,
    }, '-=0.45')
    .from('.hero-keyword', {
      y: 14, opacity: 0, duration: 0.45,
      stagger: 0.07,
    }, '-=0.35')
    .from('.hero-bar--bottom .hero-links', {
      y: 14, opacity: 0, duration: 0.5,
    }, '-=0.35')
    .from('.hero-bar--bottom .stat-card', {
      y: 14, opacity: 0, duration: 0.45,
      stagger: 0.09,
    }, '-=0.4');
})();

/* ---------------------------------------------------------
   5. Section Fade-up  (기존 CSS + IntersectionObserver 유지)
   --------------------------------------------------------- */
const navLinks     = document.querySelectorAll('.nav a');
const sections     = document.querySelectorAll('.section');
const snapContainer = document.getElementById('snapContainer');

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
  /* 모바일 링크도 동기화 */
  document.querySelectorAll('.mobile-nav-list a').forEach((link) => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

/* 모바일(768px 이하)에서는 스냅 컨테이너 대신 뷰포트를 root로 사용 */
const isMobileView = () => window.innerWidth <= 768;
const observerRoot = isMobileView() ? null : snapContainer;

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      if (id === 'hero') {
        navLinks.forEach((l) => l.classList.remove('active'));
      } else {
        setActiveNav(id);
      }

      /* 섹션 진입 시 GSAP로 fade-up 요소 입장 */
      entry.target.querySelectorAll('.fade-up').forEach((el) => {
        if (el.classList.contains('visible')) return;
        el.classList.add('visible');
        gsap.from(el, {
          y: 16, opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all',
        });
      });
    });
  },
  { root: observerRoot, threshold: 0.08 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* Hero 내부 fade-up 잔존 요소 guard */
const heroFadeEl = document.querySelector('#hero .fade-up');
if (heroFadeEl) heroFadeEl.classList.add('visible');

/* ---------------------------------------------------------
   6. 메뉴 클릭 Smooth Scroll (데스크톱 nav)
   --------------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});

/* ---------------------------------------------------------
   6-b. 모바일 햄버거 메뉴
   --------------------------------------------------------- */
(function initMobileNav() {
  const hamburger    = document.querySelector('.hamburger');
  const mobileNav    = document.querySelector('.mobile-nav');
  const backdrop     = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-list a');

  if (!hamburger) return;

  function openNav() {
    hamburger.classList.add('is-open');
    mobileNav.classList.add('is-open');
    backdrop.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? closeNav() : openNav();
  });

  backdrop.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* 모바일 링크 클릭 → 메뉴 닫고 해당 섹션으로 이동 */
  mobileLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeNav();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 360);
      }
    });
  });

  /* active 상태 모바일 링크에도 동기화 */
  const origSetActive = setActiveNav;
  window.__setActiveMobile = function (sectionId) {
    mobileLinks.forEach((l) => {
      l.classList.toggle('active', l.dataset.section === sectionId);
    });
  };
})();

/* ---------------------------------------------------------
   7. 슬라이더
   --------------------------------------------------------- */
function initSlider(wrapper) {
  const track     = wrapper.querySelector('.slider-track');
  const slides    = track.querySelectorAll('.slide');
  const prevBtn   = wrapper.querySelector('.slider-prev');
  const nextBtn   = wrapper.querySelector('.slider-next');
  const indicator = wrapper.closest('.slider-section').querySelector('.slider-indicator');
  const currentEl = indicator.querySelector('.current');
  const totalEl   = indicator.querySelector('.total');
  let current = 0;
  const total = slides.length;

  totalEl.textContent = String(total).padStart(2, '0');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    currentEl.textContent = String(current + 1).padStart(2, '0');

    /* 슬라이드 전환 시 GSAP 미세 페이드 */
    gsap.from(slides[current], {
      opacity: 0.5, duration: 0.45, ease: 'power2.out',
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
}

document.querySelectorAll('[data-slider]').forEach(initSlider);

/* ---------------------------------------------------------
   8. 그래픽 모달
   --------------------------------------------------------- */
const modal      = document.getElementById('graphicModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.graphic-item').forEach((item) => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent  = item.dataset.desc;

    /* GSAP로 모달 등장 */
    modal.classList.add('open');
    gsap.fromTo(
      modal.querySelector('.modal-content'),
      { y: 24, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  });
});

function closeModal() {
  gsap.to(modal.querySelector('.modal-content'), {
    y: 16, opacity: 0, duration: 0.28, ease: 'power2.in',
    onComplete: () => modal.classList.remove('open'),
  });
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
