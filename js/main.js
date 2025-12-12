/* =========================================================
   main.js
   Responsibilities:
   1) Theme toggle (light/dark) + save preference
   2) Mobile nav toggle
   3) Set active nav link (aria-current) based on page
   4) Email quick action: copy email (works even with injected header)
   5) Register service worker (optional)
   ========================================================= */

(function () {
  // ---------- Theme Toggle ----------
  const root = document.documentElement;
  const THEME_KEY = "hemaraj_theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    // NOTE: header is injected, so the theme button might not exist immediately.
    const themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeBtn.textContent = theme === "dark" ? "Dark mode: On" : "Dark mode: Off";
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  applyTheme(getPreferredTheme());

  // ---------- Global click handler (IMPORTANT) ----------
  // We use one click listener on the document because header/footer are injected.
  document.addEventListener("click", async (e) => {
    // 1) Theme toggle (works even if injected later)
    const themeBtn = e.target.closest("[data-theme-toggle]");
    if (themeBtn) {
      const current = root.getAttribute("data-theme") || getPreferredTheme();
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      return;
    }

    // 2) Mobile nav toggle (works even if injected later)
    const menuBtn = e.target.closest("[data-menu-toggle]");
    if (menuBtn) {
      const navLinks = document.querySelector("[data-nav-links]");
      if (navLinks) {
        const isOpen = navLinks.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
      return;
    }

    // 3) Email button: copy email (Brave-safe)
    const emailBtn = e.target.closest("#emailLink");
    if (emailBtn) {
      const email = "hemhsp91@gmail.com";

      try {
        await navigator.clipboard.writeText(email);

        const old = emailBtn.textContent;
        emailBtn.textContent = "Copied ✓";
        setTimeout(() => {
          emailBtn.textContent = old || "Email";
        }, 2000);
      } catch (err) {
        // Fallback if clipboard is blocked
        window.prompt("Copy this email:", email);
      }
      return;
    }
  });

  // ---------- Active link ----------
  // Run after DOM is ready (header might be injected shortly after).
  function setActiveNavLink() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // Try now + again shortly (covers injected header timing)
  setActiveNavLink();
  setTimeout(setActiveNavLink, 300);

  // ---------- Service worker (advanced) ----------
  // IMPORTANT: your sw.js is inside /js/sw.js, so we must register that path.
  // Works on HTTPS (GitHub Pages) and on Live Server (localhost).
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("js/sw.js").catch(() => {});
  }
})();
