const headerBackdrop = document.querySelector('.site-header__backdrop');
const hero = document.querySelector('.hero');

if (headerBackdrop && hero) {
  const updateHeaderBackdrop = () => {
    const threshold = hero.offsetHeight - 96;
    headerBackdrop.classList.toggle('is-visible', window.scrollY > threshold);
  };
  window.addEventListener('scroll', updateHeaderBackdrop, { passive: true });
  window.addEventListener('resize', updateHeaderBackdrop);
  updateHeaderBackdrop();
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Scroll-triggered entry animation. Groups (grids/rows of cards) get their
// direct children auto-tagged .reveal with an incremental transition-delay
// for a staggered cascade; standalone blocks just fade up on their own.
document.querySelectorAll('.reveal-group').forEach((group) => {
  Array.from(group.children).forEach((child, index) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${Math.min(index, 6) * 90}ms`;
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

document.querySelectorAll('.email-capture').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      input.value = '';
      input.placeholder = "Thanks! We'll be in touch.";
    }
  });
});
