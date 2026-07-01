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

  const roles = ['UX/UI Designer', 'Web Publisher', 'Interaction Designer'];
  let idx = 0;

  setInterval(() => {
    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.18,
      ease: 'power2.in',
      onComplete() {
        idx = (idx + 1) % roles.length;
        el.textContent = roles[idx];
        gsap.fromTo(el,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out', clearProps: 'y' }
        );
      },
    });
  }, 2600);
})();

/* ---------------------------------------------------------
   5. Sticky Note 드래그 인터랙션
   --------------------------------------------------------- */
(function initStickyNoteDrag() {
  const note = document.querySelector('.sticky-note');
  if (!note) return;

  const EDGE_MARGIN = 48; // 화면 밖으로 완전히 벗어나지 않도록 최소한 남겨둘 여백

  let dragging = false;
  let dragRect = null;
  let startX = 0;
  let startY = 0;
  let startOffsetX = 0;
  let startOffsetY = 0;
  let offsetX = 0;
  let offsetY = 0;

  note.addEventListener('pointerdown', (e) => {
    dragging = true;
    note.setPointerCapture(e.pointerId);

    startX = e.clientX;
    startY = e.clientY;
    startOffsetX = offsetX;
    startOffsetY = offsetY;
    dragRect = note.getBoundingClientRect();

    note.classList.add('is-dragging');
    gsap.to(note, { scale: 1.03, rotate: -1.5, duration: 0.25, ease: 'power2.out' });
  });

  note.addEventListener('pointermove', (e) => {
    if (!dragging) return;

    const deltaXMax = (window.innerWidth - EDGE_MARGIN) - dragRect.left;
    const deltaXMin = EDGE_MARGIN - dragRect.right;
    const deltaYMax = (window.innerHeight - EDGE_MARGIN) - dragRect.top;
    const deltaYMin = EDGE_MARGIN - dragRect.bottom;

    const deltaX = Math.min(Math.max(e.clientX - startX, deltaXMin), deltaXMax);
    const deltaY = Math.min(Math.max(e.clientY - startY, deltaYMin), deltaYMax);

    offsetX = startOffsetX + deltaX;
    offsetY = startOffsetY + deltaY;

    gsap.set(note, { x: offsetX, y: offsetY });
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    note.classList.remove('is-dragging');
    note.releasePointerCapture(e.pointerId);

    gsap.to(note, { scale: 1, rotate: 0, duration: 0.5, ease: 'power3.out' });
  }

  note.addEventListener('pointerup', endDrag);
  note.addEventListener('pointercancel', endDrag);
})();

/* ---------------------------------------------------------
   6. Desktop 폴더 아이콘 클릭 → 해당 섹션으로 이동
   --------------------------------------------------------- */
document.querySelectorAll('.desktop-icon').forEach((icon) => {
  icon.addEventListener('click', () => {
    const target = document.getElementById(icon.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------------------------------------------------
   7. Section Fade-up + 메뉴바 active 상태
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
   8. 메뉴바 / Apple 로고 클릭 Smooth Scroll
   --------------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return; // 다른 페이지 링크는 기본 이동 동작 유지
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target   = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.nav-submenu-item').forEach((item) => {
  item.addEventListener('click', (e) => {
    const href = item.getAttribute('href');
    if (!href || !href.startsWith('#')) return; // 다른 페이지 링크는 기본 이동 동작 유지
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target   = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.menubar-apple').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return; // 다른 페이지 링크는 기본 이동 동작 유지
    e.preventDefault();
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------------------------------------------------------
   9. 슬라이더
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
   10. 그래픽 디테일 페이지 — 작업물 이미지 스크롤 리빌
   --------------------------------------------------------- */
(function initDetailReveal() {
  const target = document.querySelector('.detail-reveal');
  if (!target) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealObserver.observe(target);
})();

/* ---------------------------------------------------------
   11. 그래픽 디테일 페이지 — Back 버튼 (뒤로가기로 즉시 복귀)
   --------------------------------------------------------- */
(function initDetailBack() {
  const backLink = document.querySelector('.detail-back');
  if (!backLink) return;

  backLink.addEventListener('click', (e) => {
    const href = backLink.getAttribute('href') || '';
    const targetId = href.split('#')[1];
    if (targetId) sessionStorage.setItem('scrollToSection', targetId);

    const cameFromSamePage =
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;

    // 브라우저 캐시(bfcache)에서 즉시 복원되도록 실제 뒤로가기를 우선 사용.
    // 참조 페이지가 없거나(직접 접속) 히스토리가 없으면 링크로 정상 이동.
    if (cameFromSamePage && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
  });
})();

/* ---------------------------------------------------------
   12. 뒤로가기로 돌아왔을 때 해당 섹션으로 즉시 이동
   --------------------------------------------------------- */
(function initRestoreScrollOnBack() {
  function restore() {
    const targetId = sessionStorage.getItem('scrollToSection');
    if (!targetId) return;
    sessionStorage.removeItem('scrollToSection');

    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'instant', block: 'start' });

    // 이미지 로딩 중 스크롤을 옮기면 fade-up 트랜지션이 중간에 걸릴 수 있어 직접 확정 처리.
    target.querySelectorAll('.fade-up').forEach((el) => {
      el.classList.add('visible');
      el.style.opacity = '';
      el.style.transform = '';
    });
  }

  // 이미지가 아직 로딩 중일 때 스크롤을 옮기면 레이아웃이 흔들릴 수 있으므로
  // 문서가 완전히 로드된 뒤(load) 실행한다.
  if (document.readyState === 'complete') {
    restore();
  } else {
    window.addEventListener('load', restore);
  }

  // bfcache로 복원된 경우 load 이벤트가 다시 발생하지 않으므로 별도 처리.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) restore();
  });
})();
