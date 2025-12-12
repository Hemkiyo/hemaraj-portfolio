(async function () {
  const mount = document.getElementById("projectDetail");
  if (!mount) return;

  // Read project id from URL (?id=...)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Load projects data
  const res = await fetch("data/projects.json");
  const projects = await res.json();

  // Find the matching project
  const project = projects.find(p => p.id === id);

  if (!project) {
    mount.innerHTML = "<p class='small'>Project not found.</p>";
    return;
  }

  document.title = `${project.title} | Hemaraj Muthalagan`;

  mount.innerHTML = `
    <article class="card">
      <div class="kicker">Case Study</div>
      <h1>${project.title}</h1>
      <p class="small"><strong>Level:</strong> ${project.level}</p>

      <h2>Problem</h2>
      <p class="small">${project.problem}</p>

      <h2>Solution</h2>
      <p class="small">${project.solution}</p>

      <h2>Technologies Used</h2>
      <p class="small">${project.tech.join(", ")}</p>

      <h2>Key Highlights</h2>
      <ul class="list">
        ${project.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <div class="actions">
        <a class="btn primary" href="projects.html">Back to Projects</a>
        <a class="btn" href="${project.github}" target="_blank">GitHub</a>
      </div>
    </article>
  `;
})();
