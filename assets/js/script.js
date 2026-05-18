const { createElement: h, useEffect, useState } = React;

const platformUrl = "https://your-render-url.onrender.com";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

const insights = [
  ["Education", "Personalized learning paths"],
  ["Innovation", "Founder-ready AI workflows"],
  ["Transformation", "Digital adoption for teams"],
  ["Bharat", "India-focused problem solving"],
];

const features = [
  {
    title: "AI Learning Paths",
    body: "Structured modules for students, educators, and working professionals moving from fundamentals to applied AI.",
  },
  {
    title: "Innovation Labs",
    body: "Project-based tracks for building prototypes, validating ideas, and turning local problems into useful products.",
  },
  {
    title: "Digital Transformation",
    body: "Frameworks for teams to adopt AI tools, automate workflows, and improve decision-making with confidence.",
  },
  {
    title: "Responsible AI",
    body: "Practical guidance around safety, transparency, privacy, and human-centered use of emerging technologies.",
  },
];

const stackItems = ["HTML5", "CSS3", "JavaScript", "React", "Django", "Python", "Render", "GitHub Pages"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncHeader = () => setIsScrolled(window.scrollY > 16);

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    return () => window.removeEventListener("scroll", syncHeader);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return h(
    "header",
    { className: `site-header${isScrolled ? " is-scrolled" : ""}` },
    h(
      "a",
      { className: "brand", href: "#home", "aria-label": "Aiyuga Bharat home", onClick: closeMenu },
      h("span", { className: "brand-mark" }, "AB"),
      h("span", null, "Aiyuga Bharat")
    ),
    h(
      "button",
      {
        className: "nav-toggle",
        type: "button",
        "aria-label": "Toggle navigation",
        "aria-expanded": String(isOpen),
        onClick: () => setIsOpen((current) => !current),
      },
      h("span"),
      h("span"),
      h("span")
    ),
    h(
      "nav",
      { className: `nav-links${isOpen ? " is-open" : ""}`, "aria-label": "Primary navigation" },
      navItems.map((item) =>
        h("a", { key: item.href, href: item.href, onClick: closeMenu }, item.label)
      )
    )
  );
}

function Hero() {
  return h(
    "section",
    { className: "hero", id: "home" },
    h(
      "div",
      { className: "hero-bg", "aria-hidden": "true" },
      h("span", { className: "mesh mesh-one" }),
      h("span", { className: "mesh mesh-two" }),
      h("span", { className: "orbit orbit-one" }),
      h("span", { className: "orbit orbit-two" })
    ),
    h(
      "div",
      { className: "hero-content" },
      h("p", { className: "eyebrow" }, "AI for learning, builders, and digital growth"),
      h("h1", null, "Aiyuga Bharat"),
      h("p", { className: "subtitle" }, "AI-Powered Platform for Education, Innovation, and Digital Transformation"),
      h(
        "p",
        { className: "hero-copy" },
        "A professional ecosystem for learners, educators, founders, and institutions to explore practical AI, build real-world solutions, and prepare for the next era of digital capability."
      ),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { className: "btn btn-primary", href: platformUrl }, "Launch Full Platform"),
        h("a", { className: "btn btn-secondary", href: "#about" }, "Explore Mission")
      )
    ),
    h(
      "div",
      { className: "hero-panel", "aria-label": "Aiyuga Bharat platform highlights" },
      h(
        "div",
        { className: "signal-card signal-card-main" },
        h("span", { className: "status-dot" }),
        h("p", null, "AI Learning Hub"),
        h("strong", null, "Active roadmap")
      ),
      h(
        "div",
        { className: "insight-grid" },
        insights.map(([title, body]) =>
          h("div", { key: title }, h("strong", null, title), h("span", null, body))
        )
      )
    )
  );
}

function About() {
  return h(
    "section",
    { className: "section about", id: "about" },
    h(
      "div",
      { className: "section-heading" },
      h("p", { className: "section-kicker" }, "About"),
      h("h2", null, "Designed to make AI useful, responsible, and accessible.")
    ),
    h(
      "p",
      null,
      "Aiyuga Bharat brings modern AI education and practical innovation into one platform. It is built for people and organizations that want more than theory: guided learning, applied projects, and digital transformation workflows that can scale across campuses, startups, and professional teams."
    )
  );
}

function Features() {
  return h(
    "section",
    { className: "section features", id: "features" },
    h(
      "div",
      { className: "section-heading centered" },
      h("p", { className: "section-kicker" }, "Features"),
      h("h2", null, "A focused platform for learning and building with AI.")
    ),
    h(
      "div",
      { className: "feature-grid" },
      features.map((feature, index) =>
        h(
          "article",
          { className: "feature-card", key: feature.title },
          h("span", { className: "feature-icon" }, String(index + 1).padStart(2, "0")),
          h("h3", null, feature.title),
          h("p", null, feature.body)
        )
      )
    )
  );
}

function Technology() {
  return h(
    "section",
    { className: "section stack", id: "technology" },
    h(
      "div",
      { className: "section-heading" },
      h("p", { className: "section-kicker" }, "Technology Stack"),
      h("h2", null, "Built with a clear path from static launch to full platform deployment.")
    ),
    h("div", { className: "stack-list" }, stackItems.map((item) => h("span", { key: item }, item)))
  );
}

function Contact() {
  return h(
    "section",
    { className: "section contact", id: "contact" },
    h(
      "div",
      null,
      h("p", { className: "section-kicker" }, "Contact"),
      h("h2", null, "Partner with Aiyuga Bharat to bring AI capability to your community or organization.")
    ),
    h(
      "div",
      { className: "contact-actions" },
      h("a", { className: "btn btn-primary", href: "mailto:hello@aiyugabharat.com" }, "hello@aiyugabharat.com"),
      h("a", { className: "btn btn-dark", href: platformUrl }, "Launch Full Platform")
    )
  );
}

function Footer() {
  return h(
    "footer",
    { className: "site-footer" },
    h("p", null, `\u00A9 ${new Date().getFullYear()} Aiyuga Bharat. All rights reserved.`),
    h("a", { href: "#home" }, "Back to top")
  );
}

function App() {
  return h(
    React.Fragment,
    null,
    h(Header),
    h("main", null, h(Hero), h(About), h(Features), h(Technology), h(Contact)),
    h(Footer)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
