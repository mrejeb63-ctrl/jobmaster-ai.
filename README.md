# JobMaster AI — Version 1.2

A free, installable, offline-first Progressive Web App (PWA) for career preparation. It is designed for English, French, Arabic (RTL) and German.

## Features
- CV builder with live preview and Classic / Modern / Minimal templates
- Print-to-PDF for CV and cover letter (choose Save as PDF in the browser print dialog)
- Cover letter first-draft generator
- CV/job-description keyword comparison with a transparent heuristic score (not a certified ATS score)
- Career assistant prompt builder for use with ChatGPT or Gemini; no paid AI API is embedded
- General, behavioral and technical interview question bank and answer frameworks
- Checklist-based interview answer review (not an assessment of professional competence)
- International job search links for Tunisia, France, Germany and Austria; searches open third-party job platforms and do not scrape or guarantee vacancies
- Job application tracker
- JSON backup and restore for CV, job records, language and practice count
- English, French, Arabic and German interface
- Local browser storage; no account or server required
- Updated service worker cache and network-first refresh for app shell files

## Run on a computer
1. Extract the ZIP.
2. Open a terminal in the `jobmaster-ai` folder.
3. Run `python -m http.server 8000`.
4. Open `http://localhost:8000` in Chrome or Edge.

## Publish/update with GitHub Pages
1. Extract this ZIP.
2. Open the existing GitHub repository `jobmaster-ai`.
3. Choose **Add file → Upload files**.
4. Upload every file inside the `jobmaster-ai` folder to the repository root, replacing old versions.
5. Commit the changes to the `main` branch.
6. Keep Settings → Pages set to **Deploy from a branch**, branch `main`, folder `/ (root)`.
7. Wait for the deployment to finish.
8. On Android, open the website in Chrome, refresh it, and relaunch the installed PWA. If an old version remains, uninstall the home-screen app and reinstall it from the updated HTTPS website.

## Privacy and limitations
- CVs, job applications and practice reviews are stored in local browser storage on that device. They are not uploaded to a server by this app.
- Use Home → Data backup to download a JSON backup before changing devices or clearing browser data. The backup contains personal information; keep it private.
- CV matching is a basic keyword overlap indicator, not a real ATS simulation or guarantee of selection.
- Career assistant buttons generate prompts. Copy them into ChatGPT or Gemini; there is no embedded AI model or paid API.
- Job search opens external websites. Availability, account requirements, country access and listings are controlled by those providers.
- PDF export uses browser printing. Select **Save as PDF**.
- This is a PWA, not a native APK. GitHub Pages hosting is free for a public repository, but Google Play publishing is a separate process and may involve fees.

## Files
- `index.html` — app screens and forms
- `styles.css` — main interface
- `enhancements.css` — version 1.2 additional interface styles
- `app.js` — original app logic
- `enhancements.js` — CV analyzer, prompt helper, job search, interview review and backup/restore
- `manifest.webmanifest` — install metadata
- `sw.js` — offline cache and update strategy
- `icon.svg` — app icon
