# Aiyuga Bharat

Aiyuga Bharat is an AI-powered platform for education, innovation, and digital transformation. The repository contains two delivery layers:

- A static GitHub Pages landing page in the repository root.
- A Django application that will later be deployed as the full platform on Render.

## Live URLs

- GitHub Pages: `https://aiyugabharat.com`
- Render full platform: `https://your-render-url.onrender.com`

## Local Setup

Create or activate a Python virtual environment, then install dependencies:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

Apply database migrations:

```powershell
.\venv\Scripts\python.exe manage.py migrate
```

Run the Django development server:

```powershell
.\venv\Scripts\python.exe manage.py runserver
```

Open `http://127.0.0.1:8000/`.

## GitHub Pages

GitHub Pages should be configured to serve from the repository root. The static landing page files are:

- `index.html`
- `style.css`
- `script.js`

These files work directly on GitHub Pages because all paths are relative.

## Project Structure

- `index.html` - static landing page for GitHub Pages
- `style.css` - landing page styles
- `script.js` - landing page navigation and UI behavior
- `aiyugabharat/` - Django project settings and root URLs
- `home/` - Django homepage app, template, and static assets
- `requirements.txt` - Python dependencies
