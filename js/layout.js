/* =========================================================
   layout.js
   Purpose:
   1) Inject shared header/footer into every page
   2) Load /data/site.json (single source of truth)
   3) Wire header/footer links (CV, email, GitHub, LinkedIn)
   ========================================================= */

(async function () {
  async function loadText(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.text();
  }

  async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.json();
  }

  // Inject header + footer HTML into placeholders
  const headerMount = document.querySelector("[data-header]");
  const footerMount = document.querySelector("[data-footer]");

  if (headerMount) headerMount.innerHTML = await loadText("components/header.html");
  if (footerMount) footerMount.innerHTML = await loadText("components/footer.html");

  // Load profile data
  const site = await loadJSON("data/site.json");

  // Wire dynamic profile info into header/footer
  const siteName = document.getElementById("siteName");
  if (siteName) siteName.textContent = site.name;

  const footerName = document.getElementById("footerName");
  if (footerName) footerName.textContent = site.name;

  const cvLink = document.getElementById("cvLink");
  const footerCv = document.getElementById("footerCv");
  if (cvLink) cvLink.href = site.cvPath;
  if (footerCv) footerCv.href = site.cvPath;

  const emailLink = document.getElementById("emailLink");
  if (emailLink) emailLink.href = `mailto:${site.email}`;

  const githubLink = document.getElementById("githubLink");
  if (githubLink) githubLink.href = site.github;

  const linkedinLink = document.getElementById("linkedinLink");
  if (linkedinLink) linkedinLink.href = site.linkedin;

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
// Contact page details (only runs if the elements exist)
const contactEmail = document.getElementById("contactEmail");
if (contactEmail) {
  contactEmail.textContent = site.email;
  contactEmail.href = `mailto:${site.email}`;
}

const contactGitHub = document.getElementById("contactGitHub");
if (contactGitHub) {
  contactGitHub.textContent = site.github.replace("https://", "").replace("http://", "");
  contactGitHub.href = site.github;
}

const contactLinkedIn = document.getElementById("contactLinkedIn");
if (contactLinkedIn) {
  contactLinkedIn.textContent = site.linkedin.replace("https://", "").replace("http://", "");
  contactLinkedIn.href = site.linkedin;
}
})();
