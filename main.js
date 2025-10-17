// ===== Year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle
const htmlEl = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌙' : '🌞';
  localStorage.setItem('theme', theme);
}

// Initialize theme
(() => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeBtn.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// ===== Mobile drawer
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');

menuBtn.addEventListener('click', () => drawer.classList.toggle('open'));
drawer.addEventListener('click', (e) => {
  if (e.target === drawer) drawer.classList.remove('open');
});

// ===== Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      drawer.classList.remove('open');
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 60,
        behavior: 'smooth',
      });
    }
  });
});

// ===== ScrollSpy
const spyLinks = Array.from(document.querySelectorAll('[data-spy]'));
const sections = spyLinks.map((l) =>
  document.querySelector(l.getAttribute('href'))
);
const opts = { rootMargin: '-50% 0px -45% 0px', threshold: 0 };

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    spyLinks.forEach((a) => {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.toggle('active', entry.isIntersecting);
      }
    });
  });
}, opts);

sections.forEach((sec) => sec && obs.observe(sec));

// ===== Hero text swap - Improved smooth animation
const swapText = document.getElementById('swapText');
const labels = ['Thanh Duy', 'Front-end Developer'];
let idx = 0;
let isAnimating = false;

function animateTextSwap() {
  if (isAnimating) return;
  isAnimating = true;

  // Fade out
  swapText.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  swapText.style.opacity = '0';
  swapText.style.transform = 'translateX(-8px)';

  setTimeout(() => {
    idx = (idx + 1) % labels.length;
    swapText.textContent = labels[idx];
    swapText.style.transform = 'translateX(8px)';

    // Fade in
    requestAnimationFrame(() => {
      swapText.style.opacity = '1';
      swapText.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }, 400);
}

// Start the animation loop
setInterval(animateTextSwap, 3000);

// === Tilt on scroll for Career avatar ===
const careerTilt = document.querySelector('.career .tilt-target');
if (careerTilt) {
  const tiltObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        careerTilt.classList.toggle('is-in', entry.isIntersecting);
      });
    },
    { rootMargin: '-20% 0px -20% 0px', threshold: 0 }
  );
  tiltObs.observe(careerTilt);
}
