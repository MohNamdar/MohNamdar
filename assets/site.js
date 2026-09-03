
(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  const links = [...document.querySelectorAll(".nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const activate = () => {
    const pos = window.scrollY + 150;
    let current = "";
    sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  };
  addEventListener("scroll", activate, {passive:true});
  activate();

  const revealItems = document.querySelectorAll(".reveal:not(.visible)");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }
})();

const sections = [
  ...document.querySelectorAll("main section[id]")
];

const navLinks = [
  ...document.querySelectorAll(".nav a")
];

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (a, b) =>
          b.intersectionRatio - a.intersectionRatio
      );

    if (visibleSections.length) {
      setActiveNav(visibleSections[0].target.id);
    }
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0, 0.15, 0.3, 0.5, 0.75]
  }
);

sections.forEach((section) => {
  navObserver.observe(section);
});