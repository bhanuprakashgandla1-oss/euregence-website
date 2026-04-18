const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".fade-in, .slide-up")
  .forEach((el) => revealObserver.observe(el));

const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".slide").forEach((el) => slideObserver.observe(el));