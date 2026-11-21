const $ = selector => document.querySelector(selector);
const storageKey = 'aiyuga-admin-projects';
const listFields = ['technologies', 'skillsDemonstrated', 'tags'];
const required = ['name', 'description', 'category', 'status'];
const standardStages = ['Prototype', 'Research Prototype', 'In Progress', 'Planned', 'Live'];
const form = $('#project');
let projects = [];
let editing = null;
let snapshot;
let dirty = false;

function notice(message) { $('#notice').textContent = message; }
function theme(value) {
  document.documentElement.dataset.theme = value;
  $('.theme').textContent = value === 'light' ? '☾' : '☼';
  $('.theme').setAttribute('aria-label', value === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}
let initialTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try { initialTheme = localStorage.getItem('aiyuga-theme') || initialTheme; } catch {}
theme(initialTheme);
$('.theme').onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  theme(next);
  try { localStorage.setItem('aiyuga-theme', next); } catch {}
};

function validate(data) {
  if (!Array.isArray(data)) throw Error('Expected a JSON list of projects.');
  data.forEach((item, i) => {
    if (!item || required.some(key => typeof item[key] !== 'string' || !item[key].trim()))
      throw Error('Project ' + (i + 1) + ' needs a name, description, category and status.');
    for (const field of form.elements) {
      if (!field.name || item[field.name] == null) continue;
      const val = item[field.name];
      const valid = listFields.includes(field.name) ? Array.isArray(val) && val.every(x => typeof x === 'string') : typeof val === 'string';
      if (!valid) throw Error('Check ' + field.name + ' in project ' + (i + 1) + '.');
    }
  });
  return data;
}

function closeEditor() {
  form.reset(); $('#editor').hidden = true; editing = null; dirty = false;
}
function canDiscard() { return !dirty || confirm('Discard unsaved form changes?'); }
function openEditor(index) {
  if (!canDiscard()) return;
  closeEditor();
  editing = index;
  const item = projects[index] || {};
  for (const field of form.elements) {
    if (field.name) field.value = Array.isArray(item[field.name]) ? item[field.name].join(', ') : item[field.name] ?? '';
  }
  $('#editor-title').textContent = index === null ? 'Add project' : 'Edit project';
  $('#editor').hidden = false;
  form.elements.namedItem('name').focus();
}
function write(next, message) {
  try {
    if (localStorage.getItem(storageKey) !== snapshot) throw Error('The catalog changed in another tab. Lock and reopen to load the latest draft.');
    const serialized = JSON.stringify(validate(next));
    localStorage.setItem(storageKey, serialized);
    snapshot = serialized;
    projects = next;
    closeEditor(); render(); notice(message);
  } catch (error) { notice(error.message); }
}
function button(label, fn) {
  const node = document.createElement('button');
  node.textContent = label; node.onclick = fn;
  return node;
}
function render() {
  const stages = [...new Set(projects.map(p => p.status))].sort();
  const filter = $('#filter'), previous = filter.value;
  filter.replaceChildren(new Option('All statuses', ''), ...stages.map(s => new Option(s,s)));
  filter.value = stages.includes(previous) ? previous : '';
  $('#stages').replaceChildren(...[...new Set([...standardStages,...stages])].map(s => new Option(s,s)));
  const query = $('#search').value.trim().toLowerCase();
  const list = $('#list'); list.replaceChildren();
  projects.forEach((p, index) => {
    const terms = [p.name,p.category,...(p.technologies || [])].join(' ').toLowerCase();
    if ((filter.value && filter.value !== p.status) || !terms.includes(query)) return;
    const row = document.createElement('article'); row.className = 'row';
    const title = document.createElement('h3'); title.textContent = p.name;
    const meta = document.createElement('p'); meta.textContent = p.category + ' · ' + p.status;
    const info = document.createElement('div'); info.append(title, meta);
    const actions = document.createElement('div'); actions.className = 'actions';
    actions.append(button('Edit', () => openEditor(index)), button('Delete', () => {
      if (canDiscard() && confirm('Delete “' + p.name + '” from your draft?')) write(projects.filter((_,i) => i !== index), 'Project deleted from draft.');
    }));
    row.append(info, actions); list.append(row);
  });
  $('#count').textContent = list.children.length + ' of ' + projects.length + ' projects' + (list.children.length ? '' : ' · No matching projects');
}
$('#unlock').onsubmit = async event => {
  event.preventDefault();
  if ($('#unlock input').value !== 'ssss') return notice('Incorrect password.');
  try {
    snapshot = localStorage.getItem(storageKey);
    if (snapshot !== null) projects = validate(JSON.parse(snapshot));
    else {
      const response = await fetch('projects.json');
      if (!response.ok) throw Error('Could not load the project catalog.');
      projects = validate(await response.json());
    }
    render(); $('#login').hidden = true; $('#workspace').hidden = false; $('#unlock').reset(); notice('');
  } catch (error) { notice('Unable to open the catalog. ' + error.message); }
};
$('#lock').onclick = () => {
  if (!canDiscard()) return;
  closeEditor(); $('#workspace').hidden = true; $('#login').hidden = false; notice('Workspace locked.');
};
$('#add').onclick = () => openEditor(null);
$('#cancel').onclick = () => { if (canDiscard()) closeEditor(); };
form.oninput = () => { dirty = true; };
form.onsubmit = event => {
  event.preventDefault();
  const item = {...projects[editing]};
  for (const [key,value] of new FormData(form)) item[key] = listFields.includes(key) ? value.split(',').map(x => x.trim()).filter(Boolean) : value.trim();
  const next = [...projects];
  if (editing === null) next.unshift(item); else next[editing] = item;
  write(next, 'Project saved to your browser draft.');
};
$('#filter').onchange = render; $('#search').oninput = render;
$('#import').onclick = () => $('#file').click();
$('#file').onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const next = validate(JSON.parse(await file.text()));
    if (canDiscard() && confirm('Replace your draft with ' + next.length + ' imported projects?')) write(next, 'Catalog imported.');
  } catch (error) { notice('Import failed. ' + error.message); }
  event.target.value = '';
};
$('#export').onclick = () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(projects, null, 2)], {type:'application/json'}));
  const a = document.createElement('a'); a.href = url; a.download = 'projects.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
