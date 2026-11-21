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

## Public website

The homepage features AutoEval with a screenshot of its public sign-in page. The project gallery reads project statuses from `projects.json`. Its **Try online** filter shows entries with a public demo URL. Leave unknown URLs empty. Founder contact links come from `team.json`.

### Contact delivery

Without a delivery service, the inquiry form opens a prefilled email draft. The visitor sends it from their email app. A direct email link is also available.

To enable in-page delivery, set the verified team Formspree endpoint as the `action` attribute on the form with `id="inquiry"` in `index.html`. The form posts the inquiry, checks for an affirmative provider receipt, and retains the text on failure. Before publishing, submit a test inquiry and confirm arrival in the team inbox.

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
6. Select the configured publishing branch (the repository default is `master`).
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
