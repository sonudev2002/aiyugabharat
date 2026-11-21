const select = (selector) => document.querySelector(selector);

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function initTheme() {
  const root = document.documentElement;
  const button = select('.theme');
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    button.textContent = dark ? '☼' : '☾';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  let initial = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try { initial = localStorage.getItem('aiyuga-theme') || initial; } catch {}
  apply(initial);
  button.onclick = () => {
    apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
    try { localStorage.setItem('aiyuga-theme', root.dataset.theme); } catch {}
  };
}

function link(text, href) {
  const anchor = element('a', text, 'text-link');
  anchor.href = href;
  return anchor;
}

function publicLink(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:') return url.href;
  } catch {}
  return '';
}

function projectCard(project) {
  const card = element('article', '', 'card');
  card.append(element('p', project.category, 'category'), element('h4', project.name),
    element('p', project.description));
  const links = element('div', '', 'links');
  for (const [key, label] of [['demoUrl','Open prototype ↗'],['githubUrl','Source code'],['caseStudyUrl','Case study'],['youtubeUrl','Watch demo']]) {
    const href = publicLink(project[key]);
    if (href) links.append(link(label, href));
  }
  card.append(links);
  return card;
}

function renderProjects(projects) {
  const groups = new Map();
  const priority = ['Prototypes','In development','Planned'];
  for (const project of projects) {
    const status = project.status || 'Other';
    const group = /prototype/i.test(status) ? 'Prototypes' : status === 'In Progress' ? 'In development' : status;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(project);
  }
  const categories = [...new Set([...priority.filter(key => groups.has(key)), ...groups.keys()])];
  function show(filter) {
    const gallery = select('#gallery');
    gallery.replaceChildren();
    let count = 0;
    for (const category of categories) {
      if (filter !== 'All' && category !== filter && filter !== 'Try online') continue;
      let entries = groups.get(category);
      if (filter === 'Try online') entries = entries.filter(p => publicLink(p.demoUrl));
      if (!entries.length) continue;
      count += entries.length;
      const group = element('section', '', 'group');
      const cards = element('div', '', 'cards');
      cards.append(...entries.map(projectCard));
      group.append(element('h3', category), cards);
      gallery.append(group);
    }
    select('#results').textContent = count + ' projects shown.';
    if (!count) gallery.append(element('p', 'No projects available.'));
    for (const button of select('#filters').children) {
      button.setAttribute('aria-pressed', String(button.textContent === filter));
    }
  }
  for (const filter of ['All', 'Try online', ...categories]) {
    const button = element('button', filter);
    button.onclick = () => show(filter);
    select('#filters').append(button);
  }
  show('All');
}

function renderTeam(team) {
  for (const member of team) {
    const card = element('article');
    card.append(element('h3', member.name), element('p', member.specialization));
    const links = element('div', '', 'links');
    links.append(link('Email', 'mailto:' + member.email));
    for (const [field, label] of [['github','GitHub'],['linkedin','LinkedIn'],['resumeUrl','Résumé']]) {
      const url = publicLink(member[field]);
      if (url) links.append(link(label, url));
    }
    card.append(links);
    select('#team').append(card);
  }
}

async function loadCatalog(file, render, destination) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error();
    render(await response.json());
  } catch {
    select(destination).append(element('p', 'This section could not load. Please refresh to try again.'));
  }
}

function initInquiry() {
  const form = select('#inquiry');
  const button = form.querySelector('button');
  const status = select('#delivery');
  // Set the verified team's Formspree URL as the form action to enable direct submission.
  const endpoint = form.getAttribute('action');
  form.hidden = false;
  if (endpoint) {
    button.textContent = 'Send inquiry';
    status.textContent = '';
  }
  form.onsubmit = async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    const data = new FormData(form);
    if (!endpoint) {
      const body = data.get('message') + '\n\nFrom: ' + data.get('name') + ' <' + data.get('email') + '>';
      window.location.href = 'mailto:aiyugabharat@aiyugabharat.com?subject=' +
        encodeURIComponent(data.get('interest')) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Send the draft from your email app. You can also use the email address beside this form.';
      return;
    }
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const response = await fetch(endpoint, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
      const receipt = await response.json();
      if (!response.ok || receipt.ok !== true) throw new Error();
      status.textContent = 'Your inquiry was accepted for delivery.';
      form.reset();
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your message is still here. Try again or email the team directly.';
    } finally {
      button.disabled = false;
    }
  };
}

initTheme();
initInquiry();
loadCatalog('projects.json', renderProjects, '#gallery');
loadCatalog('team.json', renderTeam, '#team');
