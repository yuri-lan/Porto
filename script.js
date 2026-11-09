/* ===== TEMA GELAP/TERANG ===== */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const year = document.getElementById("year");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.setAttribute("aria-checked", "true");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.setAttribute("aria-checked", String(isDark));
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ===== TAHUN FOOTER ===== */
year.textContent = new Date().getFullYear();

/* ===== HAMBURGER MENU (HP) ===== */
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });

  // Tutup menu kalau link diklik
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Buka menu");
    });
  });

  // Tutup menu kalau klik di luar
  document.addEventListener("click", (e) => {
    if (
      primaryNav.classList.contains("open") &&
      !primaryNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      primaryNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===== TYPING EFFECT NAMA ===== */
const typingEl = document.querySelector(".typing");
if (typingEl) {
  const fullText = typingEl.dataset.text || typingEl.textContent;
  typingEl.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";
  typingEl.after(cursor);

  let i = 0;
  function type() {
    if (i < fullText.length) {
      typingEl.textContent += fullText[i];
      i++;
      setTimeout(type, 120);
    }
  }
  setTimeout(type, 800);
}

/* ===== REVEAL ON SCROLL ===== */
const revealTargets = document.querySelectorAll(
  ".section, .section > p, .cards, .card, .contact"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

revealTargets.forEach((el) => observer.observe(el));

/* ===== NAVBAR SHRINK ON SCROLL ===== */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

/* ===== CURSOR SPARKLE (desktop only) ===== */
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (!isTouchDevice) {
  let lastSparkle = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkle < 60) return;
    lastSparkle = now;

    const s = document.createElement("div");
    s.className = "cursor-sparkle";
    s.style.left = e.clientX - 5 + "px";
    s.style.top = e.clientY - 5 + "px";
    document.body.appendChild(s);

    setTimeout(() => s.remove(), 700);
  });
}

/* ===== CARD STAGGER ANIMATION ===== */
document.querySelectorAll(".cards").forEach((group) => {
  const cards = group.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
  });
});