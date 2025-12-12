/* =========================================================
   project-details.js
   Purpose:
   - Read project id from URL: project.html?id=...
   - Load data from data/projects.json
   - Render a recruiter-friendly STAR case study
   ========================================================= */

(async function () {
  const root = document.getElementById("projectDetail");
  if (!root) return;

  // 1) Read id from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // 2) Load projects
  let projects = [];
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error("Failed to load projects.json");
    projects = await res.json();
  } catch (err) {
    root.innerHTML = `
      <div class="card">
        <h1>Project not available</h1>
        <p class="small">We couldn’t load the projects data. Please try again.</p>
        <div class="actions">
          <a class="btn primary" href="projects.html">Back to Projects</a>
        </div>
      </div>
    `;
    return;
  }

  // 3) Find project by id
  const project = projects.find((p) => p.id === id);

  if (!id || !project) {
    root.innerHTML = `
      <div class="card">
        <h1>Project not found</h1>
        <p class="small">
          The link may be incorrect, or the project id is missing.
        </p>
        <div class="actions">
          <a class="btn primary" href="projects.html">Back to Projects</a>
        </div>
      </div>
    `;
    return;
  }

  // 4) Render STAR case study
  root.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <div class="kicker">Case Study</div>
          <h1>${project.title}</h1>
          <p class="small">${project.summary || ""}</p>

          <div class="tags" style="margin-top:10px;">
            ${(project.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
          </div>

          <div class="actions" style="margin-top:14px;">
            <a class="btn primary" href="projects.html">Back to Projects</a>
            <a class="btn" href="${project.github}" target="_blank" rel="noopener">View on GitHub</a>
          </div>
        </div>

        <div class="grid-2" style="margin-top:16px;">
          <article class="card">
            <h2>Situation</h2>
            <p>${project.situation || "—"}</p>
          </article>

          <article class="card">
            <h2>Task</h2>
            <p>${project.task || "—"}</p>
          </article>
        </div>

        <article class="card" style="margin-top:16px;">
          <h2>Actions</h2>
          <ul>
            ${(project.action || []).map(a => `<li>${a}</li>`).join("")}
          </ul>
        </article>

        <article class="card" style="margin-top:16px;">
          <h2>Result</h2>
          <p>${project.result || "—"}</p>
        </article>

        <article class="card" style="margin-top:16px;">
  <h2>Result</h2>
  <p>${project.result || "—"}</p>
</article>

<article class="card" style="margin-top:16px;">
  <h2>What I Learned</h2>
  <ul>
    ${(project.learnings || [])
      .map(l => `<li>${l}</li>`)
      .join("")}
  </ul>
</article>

  `;
})();
