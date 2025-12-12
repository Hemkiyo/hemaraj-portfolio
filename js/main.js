/* =========================================================
   main.js
   Responsibilities:
   1) Theme toggle (light/dark) + save preference
   2) Mobile nav toggle
   3) Set active nav link (aria-current) based on page
   4) Register service worker (optional but "advanced")
   ========================================================= */

(function () {
  // ---------- Theme Toggle ----------
  const root = document.documentElement;
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const THEME_KEY = "hemaraj_theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeBtn.textContent = theme === "dark" ? "Dark mode: On" : "Dark mode: Off";
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || initialTheme;
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  // ---------- Mobile Nav Toggle ----------
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- Active link ----------
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // ---------- Service worker (advanced) ----------
  // Works on Live Server + Netlify + GitHub Pages (HTTPS).
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
