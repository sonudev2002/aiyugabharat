const state = {
  projects: [],
  team: [],
  filters: { search: "", category: "all", tech: "all", sort: "featured" },
};

const techStack = {
  Programming: ["C++", "Python", "JavaScript"],
  Backend: ["Django", "FastAPI", "Flask"],
  Databases: ["PostgreSQL", "MySQL", "Redis"],
  DevOps: ["Docker", "Git", "Linux"],
  "Data Science": ["Pandas", "NumPy", "scikit-learn"],
  "AI/ML": ["TensorFlow", "PyTorch", "LLMs", "RAG", "Vector Databases"],
  Cloud: ["Render", "GitHub Pages"],
};

const faqs = [
  ["What services does Aiyuga Bharat provide?", "We provide web development, AI/ML solutions, data analytics, automation, API development, enterprise software, training, and mentoring."],
  ["Which technologies do you work with?", "Our stack includes Python, JavaScript, C++, Django, FastAPI, Flask, PostgreSQL, MySQL, Redis, Docker, Pandas, NumPy, scikit-learn, TensorFlow, PyTorch, LLMs, RAG, and vector databases."],
  ["Are you available for freelance engagements?", "Yes. We are open to freelance projects, consulting, product prototypes, dashboards, backend APIs, and automation systems."],
  ["Do you provide training or mentoring?", "Yes. We can support project-based learning, AI workshops, software engineering mentoring, and data science training."],
  ["How can I request a project demo?", "Use the project card buttons or contact form to request demos, case studies, or walkthroughs."],
  ["Can recruiters contact individual team members?", "Yes. Each founding team card includes resume, LinkedIn, GitHub, email, and contact links."],
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("aiyuga-theme", theme);
}

function initTheme() {
  setTheme(localStorage.getItem("aiyuga-theme") || "dark");
  $("[data-theme-toggle]").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

function initNavigation() {
  const header = $("[data-header]");
  const nav = $("[data-nav]");
  const toggle = $("[data-nav-toggle]");
  const backToTop = $("[data-back-to-top]");

  const sync = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((link) => link.addEventListener("click", () => nav.classList.remove("is-open")));
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initTyping() {
  const node = $("[data-typing]");
  const words = ["AI products", "Django platforms", "FastAPI systems", "data dashboards", "ML workflows", "career-ready portfolios"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  setInterval(() => {
    const word = words[wordIndex];
    node.textContent = word.slice(0, charIndex);
    if (!deleting && charIndex < word.length) charIndex += 1;
    else if (deleting && charIndex > 0) charIndex -= 1;
    else {
      deleting = !deleting;
      if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    }
  }, 90);
}

function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => observer.observe(el));
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const target = Number(entry.target.dataset.counter || 0);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(timer);
        }
        entry.target.textContent = value;
      }, 32);
    });
  });
  $$("[data-counter]").forEach((el) => observer.observe(el));
}

function renderTechStack() {
  const grid = $("[data-tech-grid]");
  grid.innerHTML = Object.entries(techStack).map(([category, items]) => `
    <article class="tech-category reveal">
      <h3>${category}</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderTeam() {
  const founderGrid = $("[data-founder-cards]");
  const resumeGrid = $("[data-resume-grid]");
  const detailsGrid = $("[data-team-details]");

  founderGrid.innerHTML = state.team.map((member) => `
    <article class="team-card reveal">
      <div class="photo-placeholder">${member.initials}</div>
      <h3>${member.name}</h3>
      <p><strong>${member.role}</strong></p>
      <p>${member.summary}</p>
      <div class="badge-row">
        <span class="badge open">Open to Work</span>
        <span class="badge gold">Freelance</span>
        ${member.internship ? '<span class="badge cyan">Seeking Internship</span>' : ""}
      </div>
      <div class="tag-list">${member.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
      <div class="card-actions">
        <a href="${member.resumeUrl}" target="_blank" rel="noopener">Resume</a>
        <a href="${member.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${member.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="mailto:${member.email}">Contact</a>
      </div>
      <p>${member.email}</p>
    </article>
  `).join("");

  resumeGrid.innerHTML = state.team.map((member) => `
    <article class="resume-card reveal">
      <h3>${member.name}</h3>
      <p><strong>Target roles:</strong> ${member.targetRoles.join(", ")}</p>
      <p><strong>Key skills:</strong> ${member.skills.slice(0, 6).join(", ")}</p>
      <a class="button primary" href="${member.resumeUrl}" target="_blank" rel="noopener">View Resume</a>
    </article>
  `).join("");

  detailsGrid.innerHTML = state.team.map((member) => `
    <article class="detail-card reveal">
      <h3>${member.name}</h3>
      <p>${member.bio}</p>
      <p><strong>Career goals:</strong> ${member.careerGoals}</p>
      <p><strong>Availability:</strong> ${member.availability}</p>
      <div class="tag-list">${member.stack.map((skill) => `<span>${skill}</span>`).join("")}</div>
    </article>
  `).join("");
}

function getFilteredProjects() {
  const search = state.filters.search.toLowerCase();
  let projects = state.projects.filter((project) => {
    const searchable = [project.name, project.description, project.category, project.status, ...project.technologies, ...project.tags, ...project.skillsDemonstrated].join(" ").toLowerCase();
    const matchesSearch = !search || searchable.includes(search);
    const matchesCategory = state.filters.category === "all" || project.category === state.filters.category;
    const matchesTech = state.filters.tech === "all" || project.technologies.includes(state.filters.tech);
    return matchesSearch && matchesCategory && matchesTech;
  });

  if (state.filters.sort === "name") projects.sort((a, b) => a.name.localeCompare(b.name));
  if (state.filters.sort === "complexity") projects.sort((a, b) => b.engineeringComplexity.localeCompare(a.engineeringComplexity));
  if (state.filters.sort === "status") projects.sort((a, b) => a.status.localeCompare(b.status));
  return projects;
}

function renderProjectFilters() {
  const categories = [...new Set(state.projects.map((p) => p.category))].sort();
  const techs = [...new Set(state.projects.flatMap((p) => p.technologies))].sort();
  $("[data-category-filter]").innerHTML = '<option value="all">All Categories</option>' + categories.map((item) => `<option value="${item}">${item}</option>`).join("");
  $("[data-tech-filter]").innerHTML = '<option value="all">All Technologies</option>' + techs.map((item) => `<option value="${item}">${item}</option>`).join("");
}

function renderProjects() {
  const projects = getFilteredProjects();
  $("[data-project-count]").textContent = `${projects.length} project${projects.length === 1 ? "" : "s"} found`;
  $("[data-projects-grid]").innerHTML = projects.map((project) => `
    <article class="project-card reveal">
      <div class="badge-row"><span class="badge cyan">${project.category}</span><span class="badge gold">${project.status}</span></div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-meta">
        <span><strong>Level:</strong> ${project.experienceLevel}</span>
        <span><strong>Complexity:</strong> ${project.engineeringComplexity}</span>
      </div>
      <p><strong>Objective:</strong> ${project.objective}</p>
      <p><strong>Business objective:</strong> ${project.businessObjective}</p>
      <p><strong>Impact:</strong> ${project.realWorldImpact}</p>
      <div class="tag-list">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="card-actions">
        <a href="${project.demoUrl}" target="_blank" rel="noopener">Live Demo</a>
        <a href="${project.youtubeUrl}" target="_blank" rel="noopener">Request Demo</a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener">Source Code</a>
        <a href="${project.caseStudyUrl}" target="_blank" rel="noopener">View Case Study</a>
      </div>
    </article>
  `).join("");
  initRevealAnimations();
}

function initProjectControls() {
  $("[data-search]").addEventListener("input", (event) => {
    state.filters.search = event.target.value;
    renderProjects();
  });
  $("[data-category-filter]").addEventListener("change", (event) => {
    state.filters.category = event.target.value;
    renderProjects();
  });
  $("[data-tech-filter]").addEventListener("change", (event) => {
    state.filters.tech = event.target.value;
    renderProjects();
  });
  $("[data-sort]").addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    renderProjects();
  });
}

function initFaq() {
  $("[data-faq-list]").innerHTML = faqs.map(([question, answer], index) => `
    <article class="faq-item reveal ${index === 0 ? "is-open" : ""}">
      <button class="faq-question" type="button">${question}</button>
      <div class="faq-answer">${answer}</div>
    </article>
  `).join("");
  $$(".faq-question").forEach((button) => {
    button.addEventListener("click", () => button.closest(".faq-item").classList.toggle("is-open"));
  });
}

function initForms() {
  const contact = $("[data-contact-form]");
  const newsletter = $("[data-newsletter-form]");

  contact.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = $("[data-contact-status]");
    if (!contact.checkValidity()) {
      status.textContent = "Please complete all fields with valid information.";
      status.style.color = "var(--danger)";
      contact.reportValidity();
      return;
    }
    status.style.color = "var(--green)";
    status.textContent = "Thanks. Your message is ready to be sent through the configured backend soon.";
    contact.reset();
  });

  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("input", newsletter);
    const status = $("[data-newsletter-status]");
    if (!input.checkValidity()) {
      status.textContent = "Please enter a valid email address.";
      status.style.color = "var(--danger)";
      return;
    }
    status.style.color = "var(--green)";
    status.textContent = "Subscribed locally. Backend integration can be added later.";
    newsletter.reset();
  });
}

async function loadData() {
  const [projectsResponse, teamResponse] = await Promise.all([
    fetch("projects.json"),
    fetch("team.json"),
  ]);
  state.projects = await projectsResponse.json();
  state.team = await teamResponse.json();
}

async function init() {
  initTheme();
  initNavigation();
  initTyping();
  initCounters();
  renderTechStack();
  initFaq();
  initForms();
  await loadData();
  renderTeam();
  renderProjectFilters();
  renderProjects();
  initRevealAnimations();
  $("[data-year]").textContent = new Date().getFullYear();
  setTimeout(() => $("[data-loader]").classList.add("is-hidden"), 350);
}

init().catch((error) => {
  console.error(error);
  $("[data-loader]").classList.add("is-hidden");
});
