# Aiyuga Bharat Website

Aiyuga Bharat is an MSME-registered technology company and innovation platform. This repository contains a production-ready static website for GitHub Pages and keeps the Django source code intact for future full-platform deployment on Render.

Live website:

```text
https://aiyugabharat.com
```

Future Render platform placeholder:

```text
https://your-render-url.onrender.com
```

## Overview

The website is designed to work as:

- A company website
- A technical portfolio
- A project showcase platform
- A career and job-readiness platform
- A freelance and consulting lead-generation platform

It highlights Aiyuga Bharat, the founding team, technical projects, resumes, services, contact details, and project demos.

## Features

- Fully static GitHub Pages deployment
- No build step required
- Vanilla HTML, CSS, and JavaScript
- Responsive startup-style design
- Light and dark mode with localStorage persistence
- Sticky navigation and mobile menu
- Typing effect
- Animated counters
- Scroll-triggered reveal animations
- Back-to-top button
- Dynamic project rendering from `projects.json`
- Project search, category filter, technology filter, and sorting
- Dynamic founding team and resume sections from `team.json`
- FAQ accordion
- Contact form validation
- Newsletter form validation
- Frontend-only admin panel
- JSON import/export for project management
- SEO meta tags, Open Graph tags, Twitter card tags, JSON-LD schema, robots.txt, and sitemap.xml

## File Structure

```text
aiyugabharat/
|-- index.html
|-- style.css
|-- script.js
|-- projects.json
|-- team.json
|-- admin.html
|-- admin.css
|-- admin.js
|-- robots.txt
|-- sitemap.xml
|-- CNAME
|-- README.md
|-- manage.py
|-- requirements.txt
|-- aiyugabharat/
|-- home/
`-- venv/
```

## Local Development

The GitHub Pages website is static. You can open `index.html` directly in a browser, but using a local server is better because the site loads JSON files.

From the repository root:

```powershell
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500/
```

Admin panel:

```text
http://127.0.0.1:5500/admin.html
```

Default admin password placeholder:

```text
change-this-password
```

Change it in `admin.js` before using the admin panel seriously.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. Go to `Pages`.
5. Set source to `Deploy from a branch`.
6. Select branch `main`.
7. Select folder `/ root`.
8. Save.

Because `index.html` is in the repository root, GitHub Pages will display the website instead of rendering `README.md`.

The custom domain is controlled by:

```text
CNAME
```

## Admin Panel Usage

The admin panel is frontend-only. It does not write directly to GitHub.

Use it to:

- Add a project
- Edit a project
- Delete a project
- Save project data to browser localStorage
- Export project data as JSON
- Import project JSON

Recommended workflow:

1. Open `admin.html`.
2. Enter the password placeholder.
3. Add or edit projects.
4. Click `Export JSON`.
5. Replace the repository `projects.json` file with the exported file.
6. Commit and push the updated JSON.

## Updating Project Data

Project cards are generated from:

```text
projects.json
```

Each project includes:

- Name
- Description
- Objective
- Technologies
- Experience level
- Engineering complexity
- Business objective
- Real-world impact
- Skills demonstrated
- Category
- Status
- Tags
- Live demo URL
- GitHub repository URL
- YouTube or demo request URL
- Case study or resume URL

## Updating Team Data

Team cards, resume cards, and detailed team profiles are generated from:

```text
team.json
```

Update resume, LinkedIn, GitHub, and email placeholders there.

## Django Notes

GitHub Pages cannot run Django. The Django application remains in the repository for future backend or full-platform deployment.

Run Django locally with:

```powershell
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

## Commit And Push

```powershell
git add index.html style.css script.js projects.json team.json admin.html admin.css admin.js README.md robots.txt sitemap.xml
git commit -m "Build production static company website"
git push
```

## Important Notes

- Keep all paths relative.
- Keep `index.html` in the repository root.
- Do not use frameworks or build tools for the GitHub Pages version.
- Deploy Django separately to Render.
- Replace placeholder links with real resume, LinkedIn, GitHub, demo, and Render URLs.
- Keep secrets out of Git.
