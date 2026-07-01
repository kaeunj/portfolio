/* =========================================================
   PORTFOLIO — main.js  (macOS Desktop 컨셉)
   GSAP 3.12 사용 (CDN)
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   1. Cursor Orb
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
    orbX += (mouseX - orbX) * 0.1;
    orbY += (mouseY - orbY) * 0.1;
    gsap.set(orb, { x: orbX, y: orbY });
    requestAnimationFrame(tick);
  })();
})();

/* ---------------------------------------------------------
   2. macOS 메뉴바 실시간 시계
   --------------------------------------------------------- */
(function initClock() {
  const el = document.getElementById('menuClock');
  if (!el) return;

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  function update() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date  = now.getDate();
    const day   = days[now.getDay()];
    const h     = String(now.getHours()).padStart(2, '0');
    const m     = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${month}월 ${date}일 (${day}) ${h}:${m}`;
  }

  update();
  setInterval(update, 1000);
})();

/* ---------------------------------------------------------
   3. Desktop 등장 애니메이션
   --------------------------------------------------------- */
(function initDesktopReveal() {
  const name = document.querySelector('.desktop-name');
  if (!name) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .from('.menubar', { y: -20, opacity: 0, duration: 0.55 })
    .from(name, { y: 32, opacity: 0, duration: 0.8 }, '-=0.2')
    .from('.desktop-role', { y: 16, opacity: 0, duration: 0.6 }, '-=0.45')
    .from('.sticky-note', { x: -28, opacity: 0, duration: 0.65 }, '-=0.5')
    .from('.desktop-icons .desktop-icon', {
      x: 28, opacity: 0,
      stagger: 0.09,
      duration: 0.5,
      clearProps: 'x,opacity',
    }, '-=0.55')
    .from('.dock', { y: 24, opacity: 0, duration: 0.6 }, '-=0.5');
})();

/* ---------------------------------------------------------
   4. Role 텍스트 자동 전환 (Apple 스타일 fade)
   --------------------------------------------------------- */
(function initRoleCycle() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const roles = ['UX/UI Designer', 'Web Publisher', 'Interaction Designer', 'Creative Thinker'];
  let idx = 0;

  setInterval(() => {
    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.28,
      ease: 'power2.in',
      onComplete() {
        idx = (idx + 1) % roles.length;
        el.textContent = roles[idx];
        gsap.fromTo(el,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'y' }
        );
      },
    });
  }, 2600);
})();

/* ---------------------------------------------------------
   5. Desktop 폴더 아이콘 클릭 → 해당 섹션으로 이동
   --------------------------------------------------------- */
document.querySelectorAll('.desktop-icon').forEach((icon) => {
  icon.addEventListener('click', () => {
    const target = document.getElementById(icon.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------------------------------------------------
   6. Section Fade-up + 메뉴바 active 상태
   --------------------------------------------------------- */
const navLinks      = document.querySelectorAll('.menubar-nav-item');
const sections      = document.querySelectorAll('.section');
const snapContainer = document.getElementById('snapContainer');

const PROJECT_SECTIONS = new Set(['uiux', 'web', 'graphic']);

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const ds = link.dataset.section;
    const isActive =
      (ds === 'about'    && sectionId === 'profile') ||
      (ds === 'projects' && PROJECT_SECTIONS.has(sectionId)) ||
      (ds === 'footer'   && sectionId === 'footer');
    link.classList.toggle('active', isActive);
  });
}

const isMobileView  = () => window.innerWidth <= 768;
const observerRoot  = isMobileView() ? null : snapContainer;

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

const heroFadeEl = document.querySelector('#hero .fade-up');
if (heroFadeEl) heroFadeEl.classList.add('visible');

/* ---------------------------------------------------------
   7. 메뉴바 / Apple 로고 클릭 Smooth Scroll
   --------------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (!href) return;
    const targetId = href.replace('#', '');
    const target   = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.nav-submenu-item').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const href = item.getAttribute('href');
    if (!href) return;
    const targetId = href.replace('#', '');
    const target   = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.menubar-apple').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------------------------------------------------
   8. 슬라이더
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
    gsap.from(slides[current], {
      opacity: 0.5, duration: 0.45, ease: 'power2.out',
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
}

document.querySelectorAll('[data-slider]').forEach(initSlider);

/* ---------------------------------------------------------
   9. 그래픽 모달
   --------------------------------------------------------- */
const modal      = document.getElementById('graphicModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.graphic-item').forEach((item) => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent  = item.dataset.desc;
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
