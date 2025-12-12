# Hemaraj Muthalagan — Portfolio Website

Live site: https://hemkiyo.github.io/hemaraj-portfolio/

A fast, mobile-friendly personal portfolio website built with **HTML, CSS, and JavaScript** (no frameworks).
Designed to meet **UK graduate/junior** hiring expectations: clean layout, honest skill level, and scalable structure.

---

## What this site includes

- Multi-page website:
  - Home
  - About
  - Skills
  - Projects (data-driven)
  - Education
  - Experience
  - Contact
- Reusable layout components:
  - Shared header and footer injected on every page
- Data-driven content:
  - `data/site.json` (personal details + links)
  - `data/projects.json` (project list + case study content)
- Basic UI features:
  - Responsive layout
  - Light/Dark mode toggle
  - Search/filter for projects
  - Accessible structure (skip link, semantic sections)

---

## Tech stack

- HTML5 (semantic structure)
- CSS3 (responsive layout, clean components)
- JavaScript (dynamic rendering, data loading)
- JSON (content source of truth)

---

## Folder structure

```text
hemaraj-portfolio/
├─ components/
│  ├─ header.html
│  └─ footer.html
├─ css/
│  └─ styles.css
├─ data/
│  ├─ site.json
│  └─ projects.json
├─ js/
│  ├─ layout.js
│  ├─ main.js
│  ├─ projects.js
│  ├─ project-details.js
│  └─ sw.js
├─ index.html
├─ about.html
├─ skills.html
├─ projects.html
├─ project.html
├─ education.html
├─ experience.html
└─ contact.html

