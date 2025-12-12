/* =========================================================
   projects.js
   Purpose:
   - Load projects from data/projects.json
   - Render recruiter-friendly project cards
   - Provide search + filter
   - Link to detailed case study page
   ========================================================= */

(async function () {
  const grid = document.getElementById("projectGrid");
  const searchInput = document.getElementById("q");
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (!grid) return;

  // Load project data
  const res = await fetch("data/projects.json");
  const projects = await res.json();

  let activeFilter = "All";
  let query = "";

  // Check if project matches search + filter
  function matches(project) {
    const searchableText = [
      project.title,
      project.level,
      project.summary,
      project.situation,
      project.task,
      (project.action || []).join(" "),
      project.result,
      (project.tech || []).join(" "),
      (project.tags || []).join(" ")
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = searchableText.includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      searchableText.includes(activeFilter.toLowerCase());

    return matchesQuery && matchesFilter;
  }

  // Build one project card (STAR format)
  function createCard(project) {
    return `
      <article class="card">
        <h2>${project.title}</h2>
        <p class="small">${project.summary}</p>

        <p><strong>Situation:</strong> ${project.situation}</p>
        <p><strong>Task:</strong> ${project.task}</p>

        <ul>
          ${(project.action || [])
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>

        <p><strong>Result:</strong> ${project.result}</p>

        <p class="small">
          <strong>Tech:</strong> ${(project.tech || []).join(", ")}
        </p>

        <div class="actions">
          <a class="btn primary" href="project.html?id=${encodeURIComponent(
            project.id
          )}">
            View Case Study
          </a>
          <a
            class="btn"
            href="${project.github}"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>

        <div class="tags">
          ${(project.tags || [])
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </article>
    `;
  }

  // Render projects
  function render() {
    const visibleProjects = projects.filter(matches);

    grid.innerHTML = visibleProjects.length
      ? visibleProjects.map(createCard).join("")
      : `
        <div class="card">
          <p class="small">No projects match your search or filter.</p>
        </div>
      `;
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      query = e.target.value || "";
      render();
    });
  }

  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "All";
      render();
    });
  });

  // Initial render
  render();
})();
