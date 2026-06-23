const PASSWORD = "ssss";
const STORAGE_KEY = "aiyuga-admin-projects";
let projects = [];

const $ = (selector, parent = document) => parent.querySelector(selector);

function csv(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

async function loadInitialProjects() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    projects = JSON.parse(saved);
    return;
  }
  const response = await fetch("projects.json");
  projects = await response.json();
  persist();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects, null, 2));
}

function renderProjects() {
  $("[data-admin-projects]").innerHTML = projects.map((project, index) => `
    <article class="admin-project">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p><strong>${project.category}</strong> | ${project.status}</p>
      <button type="button" data-edit="${index}">Edit</button>
      <button class="danger" type="button" data-delete="${index}">Delete</button>
    </article>
  `).join("");

  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => fillForm(projects[Number(button.dataset.edit)], Number(button.dataset.edit)));
  });
  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      projects.splice(Number(button.dataset.delete), 1);
      persist();
      renderProjects();
    });
  });
}

function fillForm(project, index) {
  const form = $("[data-project-form]");
  form.id.value = String(index);
  Object.entries(project).forEach(([key, value]) => {
    if (!form.elements[key]) return;
    form.elements[key].value = Array.isArray(value) ? value.join(", ") : value;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getFormProject(form) {
  return {
    name: form.name.value.trim(),
    description: form.description.value.trim(),
    objective: form.objective.value.trim(),
    technologies: csv(form.technologies.value),
    experienceLevel: form.experienceLevel.value.trim(),
    engineeringComplexity: form.engineeringComplexity.value.trim(),
    businessObjective: form.businessObjective.value.trim(),
    realWorldImpact: form.realWorldImpact.value.trim(),
    skillsDemonstrated: csv(form.skillsDemonstrated.value),
    category: form.category.value.trim(),
    demoUrl: form.demoUrl.value.trim(),
    githubUrl: form.githubUrl.value.trim(),
    youtubeUrl: form.youtubeUrl.value.trim(),
    caseStudyUrl: form.caseStudyUrl.value.trim(),
    status: form.status.value.trim(),
    tags: csv(form.tags.value),
  };
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "projects.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function initAdmin() {
  const loginForm = $("[data-login-form]");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (loginForm.querySelector("input").value !== PASSWORD) {
      $("[data-login-status]").textContent = "Incorrect password placeholder.";
      return;
    }
    $("[data-login-panel]").classList.add("hidden");
    $("[data-admin-app]").classList.remove("hidden");
    await loadInitialProjects();
    renderProjects();
  });

  const form = $("[data-project-form]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const project = getFormProject(form);
    const index = form.id.value === "" ? -1 : Number(form.id.value);
    if (index >= 0) projects[index] = project;
    else projects.unshift(project);
    persist();
    form.reset();
    form.id.value = "";
    renderProjects();
  });

  $("[data-reset-form]").addEventListener("click", () => {
    form.reset();
    form.id.value = "";
  });
  $("[data-export-json]").addEventListener("click", downloadJson);
  $("[data-import-json]").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    projects = JSON.parse(await file.text());
    persist();
    renderProjects();
  });
}

initAdmin();
