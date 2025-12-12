/* =========================================================
   projects.js
   Purpose:
   - Load projects from data/projects.json
   - Render project cards automatically
   - Provide search + filter for recruiter-friendly scanning
   - Link to case study page: project.html?id=...
   ========================================================= */

(async function () {
  const grid = document.getElementById("projectGrid");
  const q = document.getElementById("q");
  const filterButtons = document.querySelectorAll("[data-filter]");
  if (!grid) return;

  // Load project data (JSON database)
  const res = await fetch("data/projects.json");
  const projects = await res.json();

  let activeFilter = "All";
  let query = "";

  function matches(p) {
    // Combine fields into one searchable string
    const hay = [
      p.title,
      p.level,
      (p.tags || []).join(" "),
      (p.tech || []).join(" "),
      p.problem,
      p.solution
    ].join(" ").toLowerCase();

    const okQuery = hay.includes(query.toLowerCase());
    const okFilter = activeFilter === "All" || hay.includes(activeFilter.toLowerCase());
    return okQuery && okFilter;
  }

  function card(p) {
    return `
      <article class="card" style="box-shadow:none;">
        <h2 style="margin-bottom:8px;">${p.title}</h2>

        <p class="small"><strong>Problem:</strong> ${p.problem}</p>
        <p class="small"><strong>Solution:</strong> ${p.solution}</p>
        <p class="small"><strong>Tech:</strong> ${(p.tech || []).join(", ")}</p>

        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn primary" href="project.html?id=${encodeURIComponent(p.id)}">View Case Study</a>
          <a class="btn" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
        </div>

        <div style="margin-top:10px;">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function render() {
    const list = projects.filter(matches);
    grid.innerHTML = list.length
      ? list.map(card).join("")
      : `<div class="card"><p class="small">No projects match your search/filter.</p></div>`;
  }

  // Search input
  q?.addEventListener("input", (e) => {
    query = e.target.value || "";
    render();
  });

  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "All";
      render();
    });
  });

  render();
})();
(async function () {
  const grid = document.getElementById("projectsGrid");
  const search = document.getElementById("searchInput");

  if (!grid) return;

  const res = await fetch("data/projects.json");
  const projects = await res.json();

  function render(list) {
    grid.innerHTML = list.map(p => `
      <article class="card">
        <h2>${p.title}</h2>
        <p class="small">${p.summary}</p>
        <p class="small"><strong>Tech:</strong> ${p.tech.join(", ")}</p>
        <div class="actions">
          <a class="btn primary" href="project.html?id=${p.id}">View Case Study</a>
          <a class="btn" href="${p.github}" target="_blank">GitHub</a>
        </div>
      </article>
    `).join("");
  }

  render(projects);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    render(
      projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tech.join(" ").toLowerCase().includes(q)
      )
    );
  });
})();
