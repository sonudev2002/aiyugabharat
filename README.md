# Aiyuga Bharat

Aiyuga Bharat is an AI-powered platform for education, innovation, and digital transformation. The project is designed in two parts:

- A React-powered static landing page that runs on GitHub Pages.
- A Django application that can later be deployed as the full platform on Render.

Live website:

```text
https://aiyugabharat.com
```

Future full platform URL:

```text
https://your-render-url.onrender.com
```

## Project Purpose

The goal of Aiyuga Bharat is to create a professional AI-focused platform for learners, educators, founders, institutions, and organizations. The platform will support AI education, innovation programs, digital transformation, and practical technology adoption.

The current GitHub Pages website acts as the public landing page. The Django codebase is kept in the same repository so the full web application can be developed and deployed separately.

## How The Project Works

GitHub Pages can only host static files such as HTML, CSS, and JavaScript. It cannot run Python or Django.

Because of that, this repository uses:

- `index.html` for the public GitHub Pages homepage.
- `assets/css/style.css` for landing page styling.
- `assets/js/script.js` for the React landing page components and UI behavior.
- Django files for the future full application.

When someone opens `https://aiyugabharat.com`, GitHub Pages loads the root `index.html` file.

## Features

- Modern responsive landing page
- Smooth scrolling navigation
- Mobile-friendly menu
- Hero section with strong startup-style branding
- About section
- Features section
- Technology stack section
- Contact section
- Placeholder button for the future Render-hosted Django platform
- Django project structure already included for backend development

## Technology Stack

Frontend landing page:

- HTML5
- CSS3
- JavaScript
- React
- GitHub Pages

Backend application:

- Python
- Django
- SQLite for local development
- Render planned for deployment

Version control and hosting:

- Git
- GitHub
- GitHub Pages

## Folder Structure

```text
aiyugabharat/
|-- index.html
|-- README.md
|-- requirements.txt
|-- manage.py
|-- CNAME
|-- assets/
|   |-- css/
|   |   `-- style.css
|   `-- js/
|       `-- script.js
|-- aiyugabharat/
|   |-- __init__.py
|   |-- asgi.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
`-- home/
    |-- templates/
    |-- static/
    |-- views.py
    |-- urls.py
    `-- models.py
```

## Important Files

`index.html`

The static homepage used by GitHub Pages. This is the page visitors see at `https://aiyugabharat.com`.

`assets/css/style.css`

All styling for the static landing page.

`assets/js/script.js`

React component code for the static landing page. It also controls the responsive navigation menu, header scroll effect, and dynamic footer year.

`manage.py`

Django command-line entry point. Use this for running the Django application locally.

`requirements.txt`

Python dependencies required by the Django project.

`CNAME`

Custom domain configuration for GitHub Pages.

## Local Setup For Django

Use these steps when you want to run the Django application on your computer.

### 1. Open The Project Folder

```powershell
cd D:\ayb
```

### 2. Activate The Virtual Environment

If the virtual environment already exists:

```powershell
.\venv\Scripts\activate
```

If you need to create a new virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\activate
```

### 3. Install Requirements

```powershell
python -m pip install -r requirements.txt
```

### 4. Apply Database Migrations

```powershell
python manage.py migrate
```

### 5. Run The Django Server

```powershell
python manage.py runserver
```

Open this URL in your browser:

```text
http://127.0.0.1:8000/
```

## Local Preview For GitHub Pages

The GitHub Pages landing page is static. You can preview it by opening this file directly in your browser:

```text
index.html
```

You can also use a simple local server from the project root:

```powershell
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500/
```

The landing page uses React from a CDN in `index.html`, so there is no frontend build step required for the current GitHub Pages version.

## GitHub Pages Deployment

GitHub Pages should be configured like this:

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

The required root file is:

```text
index.html
```

Because `index.html` exists in the repository root, GitHub Pages will show the landing page instead of rendering `README.md`.

## Render Deployment Plan

The static landing page contains a button named:

```text
Launch Full Platform
```

For now, it points to this placeholder:

```text
https://your-render-url.onrender.com
```

After deploying the Django application to Render, replace the placeholder URL in `index.html` with the real Render URL.

Search for:

```text
https://your-render-url.onrender.com
```

Then replace it with your actual deployment URL.

## Common Git Commands

Check changed files:

```powershell
git status
```

Add changed files:

```powershell
git add .
```

Commit changes:

```powershell
git commit -m "Update project"
```

Push changes to GitHub:

```powershell
git push
```

## Recommended Commit For README Update

After editing this README, use:

```powershell
git add README.md
git commit -m "Improve project README"
git push
```

## Development Notes

- Keep `index.html` in the repository root for GitHub Pages.
- Keep static landing page CSS inside `assets/css/`.
- Keep static landing page React JavaScript inside `assets/js/`.
- Do not expect GitHub Pages to run Django.
- Deploy Django separately on Render or another Python hosting service.
- Keep secret keys and environment variables out of Git.
- Do not commit `venv/`, local database files, cache files, or logs.

## Current Status

- Static landing page: ready for GitHub Pages
- Custom domain: configured through `CNAME`
- Django project: ready for local development
- Full platform deployment: planned for Render

## License

No license has been added yet. Add a license before using this project for public collaboration or open-source distribution.
