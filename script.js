const state = {
  projects: [],
  team: [],
  filters: {
    search: "",
    category: "all",
    tech: "all",
    sort: "featured",
  },
};

const techStack = {
  Programming: ["C++", "Python", "JavaScript"],
  Backend: ["Django", "FastAPI", "Flask"],
  Databases: ["PostgreSQL", "MySQL", "Redis"],
  DevOps: ["Docker", "Git", "Linux"],
  "Data Science": ["Pandas", "NumPy", "Scikit-learn"],
  "AI/ML": ["TensorFlow", "PyTorch", "LLMs", "RAG", "Vector Databases"],
  Cloud: ["Render", "GitHub Pages"],
};

const faqs = [
  [
    "What does Aiyuga Bharat build?",
    "We build AI-powered software systems, backend platforms, automation tools, dashboards, APIs, and modern web applications."
  ],

  [
    "Which technologies do you work with?",
    "Our stack includes Python, JavaScript, C++, Django, FastAPI, Flask, PostgreSQL, MySQL, Redis, Docker, TensorFlow, PyTorch, LLMs, RAG, and cloud technologies."
  ],

  [
    "Do you build AI-based solutions?",
    "Yes. We work on machine learning systems, intelligent automation, retrieval-augmented generation systems, analytics platforms, and scalable AI applications."
  ],

  [
    "Can businesses request demos or collaborations?",
    "Yes. Businesses and organizations can contact us for demonstrations, technical discussions, partnerships, and collaborations."
  ],
];

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("aiyuga-theme", theme);
}

function initTheme() {

    setTheme(localStorage.getItem("aiyuga-theme") || "dark");

    const themeButton = $("[data-theme-toggle]");

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {
        setTheme(
            document.documentElement.dataset.theme === "dark"
                ? "light"
                : "dark"
        );
    });
}

function initNavigation() {
  const header = $("[data-header]");
  const nav = $("[data-nav]");
  const toggle = $("[data-nav-toggle]");
  const backToTop = $("[data-back-to-top]");
  if (!header || !nav || !toggle || !backToTop)
        return;
  const sync = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 16
    );

    backToTop.classList.toggle(
      "is-visible",
      window.scrollY > 600
    );
  };

  sync();

  window.addEventListener("scroll", sync, {
    passive: true,
  });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );
  });

  $$("a", nav).forEach((link) =>
    link.addEventListener("click", () =>
      nav.classList.remove("is-open")
    )
  );

  backToTop.addEventListener("click", () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  );
}

function initTyping() {
  const node = $("[data-typing]");

  const words = [
    "AI platforms",
    "backend systems",
    "FastAPI applications",
    "machine learning workflows",
    "automation tools",
    "scalable digital products",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  setInterval(() => {
    const word = words[wordIndex];

    node.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex += 1;
    }

    else if (deleting && charIndex > 0) {
      charIndex -= 1;
    }

    else {
      deleting = !deleting;

      if (!deleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
  }, 90);
}

function initRevealAnimations() {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  $$(".reveal").forEach((el) =>
    observer.observe(el)
  );
}

function initCounters() {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (
          !entry.isIntersecting ||
          entry.target.dataset.done
        ) {
          return;
        }

        entry.target.dataset.done = "true";

        const target = Number(
          entry.target.dataset.counter || 0
        );

        let value = 0;

        const step = Math.max(
          1,
          Math.ceil(target / 40)
        );

        const timer = setInterval(() => {

          value += step;

          if (value >= target) {
            value = target;
            clearInterval(timer);
          }

          entry.target.textContent = value;

        }, 32);

      });
    }
  );

  $$("[data-counter]").forEach((el) =>
    observer.observe(el)
  );
}

function renderTechStack() {

  const grid = $("[data-tech-grid]");

  grid.innerHTML = Object.entries(techStack)
    .map(
      ([category, items]) => `
      <article class="tech-category reveal">
        <h3>${category}</h3>

        <ul>
          ${items
            .map((item) => `<li>${item}</li>`)
            .join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function renderTeam() {

  const founderGrid =
    $("[data-founder-cards]");

  if (!founderGrid) return;

  founderGrid.innerHTML = state.team
    .map(
      (member) => `
      <article class="team-card reveal">

        <div class="photo-placeholder">
          ${member.initials}
        </div>

        <h3>${member.name}</h3>

        <p>
          <strong>${member.role}</strong>
        </p>

        <p>${member.summary}</p>

        <div class="tag-list">
          ${member.skills
            .map(
              (skill) => `<span>${skill}</span>`
            )
            .join("")}
        </div>

        <div class="card-actions">

          <a href="${member.linkedin}"
             target="_blank"
             rel="noopener">
             LinkedIn
          </a>

          <a href="${member.github}"
             target="_blank"
             rel="noopener">
             GitHub
          </a>

          <a href="mailto:${member.email}">
             Contact
          </a>

        </div>

      </article>
    `
    )
    .join("");
}

function getFilteredProjects() {

  const search =
    state.filters.search.toLowerCase();

  let projects = state.projects.filter(
    (project) => {

      const searchable = [
        project.name,
        project.description,
        project.category,
        project.status,
        ...project.technologies,
        ...project.tags,
        ...project.skillsDemonstrated,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchable.includes(search);

      const matchesCategory =
        state.filters.category === "all" ||
        project.category ===
          state.filters.category;

      const matchesTech =
        state.filters.tech === "all" ||
        project.technologies.includes(
          state.filters.tech
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTech
      );
    }
  );

  if (state.filters.sort === "name") {
    projects.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (
    state.filters.sort === "complexity"
  ) {
    projects.sort((a, b) =>
      b.engineeringComplexity.localeCompare(
        a.engineeringComplexity
      )
    );
  }

  if (state.filters.sort === "status") {
    projects.sort((a, b) =>
      a.status.localeCompare(b.status)
    );
  }

  return projects;
}

function renderProjectFilters() {

    const categoryFilter = $("[data-category-filter]");
    const techFilter = $("[data-tech-filter]");

    if (!categoryFilter || !techFilter) {
        return;
    }

    const categories = [
        ...new Set(state.projects.map(p => p.category))
    ].sort();

    const techs = [
        ...new Set(state.projects.flatMap(p => p.technologies))
    ].sort();

    categoryFilter.innerHTML =
        '<option value="all">All Categories</option>' +
        categories.map(item =>
            `<option value="${item}">${item}</option>`
        ).join("");

    techFilter.innerHTML =
        '<option value="all">All Technologies</option>' +
        techs.map(item =>
            `<option value="${item}">${item}</option>`
        ).join("");
}

function renderProjects() {

    const projects = getFilteredProjects();

    // Optional project counter
    const projectCount = $("[data-project-count]");

    if (projectCount) {
        projectCount.textContent =
            `${projects.length} project${projects.length === 1 ? "" : "s"} found`;
    }

    // Ensure the projects grid exists
    const projectsGrid = $("[data-projects-grid]");

    if (!projectsGrid) {
        console.error("Projects grid not found.");
        return;
    }

    projectsGrid.innerHTML = projects
        .map(project => `
            <article class="project-card reveal">

                <div class="badge-row">
                    <span class="badge cyan">
                        ${project.category}
                    </span>

                    <span class="badge gold">
                        ${project.status}
                    </span>
                </div>

                <h3>${project.name}</h3>

                <p>${project.description}</p>

                <div class="project-meta">
                    <span>
                        <strong>Level:</strong>
                        ${project.experienceLevel}
                    </span>

                    <span>
                        <strong>Complexity:</strong>
                        ${project.engineeringComplexity}
                    </span>
                </div>

                <p>
                    <strong>Objective:</strong>
                    ${project.objective}
                </p>

                <p>
                    <strong>Impact:</strong>
                    ${project.realWorldImpact}
                </p>

                <div class="tag-list">
                    ${project.technologies
                        .map(tech => `<span>${tech}</span>`)
                        .join("")}
                </div>

                <div class="card-actions">

                    <a href="${project.demoUrl}"
                       target="_blank"
                       rel="noopener">
                        Live Demo
                    </a>

                    <a href="${project.githubUrl}"
                       target="_blank"
                       rel="noopener">
                        Source Code
                    </a>

                    <a href="${project.caseStudyUrl}"
                       target="_blank"
                       rel="noopener">
                        Case Study
                    </a>

                </div>

            </article>
        `)
        .join("");

    initRevealAnimations();
}

function initProjectControls() {

    const search = $("[data-search]");
    const category = $("[data-category-filter]");
    const tech = $("[data-tech-filter]");
    const sort = $("[data-sort]");

    if (search) {
        search.addEventListener("input", e => {
            state.filters.search = e.target.value;
            renderProjects();
        });
    }

    if (category) {
        category.addEventListener("change", e => {
            state.filters.category = e.target.value;
            renderProjects();
        });
    }

    if (tech) {
        tech.addEventListener("change", e => {
            state.filters.tech = e.target.value;
            renderProjects();
        });
    }

    if (sort) {
        sort.addEventListener("change", e => {
            state.filters.sort = e.target.value;
            renderProjects();
        });
    }
}
function initFaq() {

  const faqList =
    $("[data-faq-list]");

  if (!faqList) return;

  faqList.innerHTML = faqs
    .map(
      ([question, answer], index) => `
      <article class="faq-item reveal ${
        index === 0 ? "is-open" : ""
      }">

        <button class="faq-question"
                type="button">
          ${question}
        </button>

        <div class="faq-answer">
          ${answer}
        </div>

      </article>
    `
    )
    .join("");

  $$(".faq-question").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () =>
          button
            .closest(".faq-item")
            .classList.toggle("is-open")
      );
    }
  );
}

function initForms() {

  const contact =
    $("[data-contact-form]");

  const newsletter =
    $("[data-newsletter-form]");

  if (contact) {

    contact.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const status =
          $("[data-contact-status]");

        if (!contact.checkValidity()) {

          status.textContent =
            "Please complete all required fields.";

          status.style.color =
            "var(--danger)";

          contact.reportValidity();

          return;
        }

        status.style.color =
          "var(--green)";

        status.textContent =
          "Message submitted successfully.";

        contact.reset();
      }
    );
  }

  if (newsletter) {

    newsletter.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const input =
          $("input", newsletter);

        const status =
          $("[data-newsletter-status]");

        if (!input.checkValidity()) {

          status.textContent =
            "Please enter a valid email.";

          status.style.color =
            "var(--danger)";

          return;
        }

        status.style.color =
          "var(--green)";

        status.textContent =
          "Subscribed successfully.";

        newsletter.reset();
      }
    );
  }
}

async function loadData() {

    try {

        const projectsResponse = await fetch("projects.json");

        if (!projectsResponse.ok)
            throw new Error("projects.json not found");

        state.projects = await projectsResponse.json();

    } catch (err) {

        console.error(err);

        state.projects = [];

    }

    try {

        const teamResponse = await fetch("team.json");

        if (teamResponse.ok)
            state.team = await teamResponse.json();

    }

    catch(err){

        console.warn("team.json missing");

        state.team = [];

    }
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

  // Initialize filters only if the controls exist
  if (
    $("[data-search]") ||
    $("[data-category-filter]") ||
    $("[data-tech-filter]") ||
    $("[data-sort]")
  ) {
    initProjectControls();
  }

  initRevealAnimations();

  const year = $("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const loader = $("[data-loader]");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("is-hidden");
    }, 350);
  }
}

init().catch((error) => {

  console.error(error);

  const loader = $("[data-loader]");
  if (loader) {
    loader.classList.add("is-hidden");
  }
});
