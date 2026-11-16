# JobMaster AI — Android-friendly MVP 1.0

A free, installable Progressive Web App for building a CV, drafting a cover letter, practicing interviews and tracking job applications. The first version uses browser storage and does not send CV information to a server.

## Features
- English, French, Arabic (RTL layout) and German interface
- CV editor with live preview and Classic / Modern / Minimal templates
- Print-to-PDF export (choose Save as PDF in the browser print dialog)
- Cover letter first-draft generator
- General, behavioral and technical interview question bank with answer frameworks
- Job application tracker with status, date and optional link
- Local device storage and offline cache

## Run on a computer
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run a local static server, for example `python -m http.server 8000`.
4. Open `http://localhost:8000` in Chrome or Edge.

A local server is needed for service-worker offline support. You can still open `index.html` directly for a basic preview, but install/offline features require HTTP(S).

## Install on Android
1. Host this folder on an HTTPS static host (GitHub Pages is a free option) or serve it over HTTPS from your computer.
2. Open the HTTPS site in Chrome on Android.
3. Open the browser menu and choose **Install app** or **Add to Home screen**.
4. Launch JobMaster AI from the home screen. Open it once online so the offline cache is populated.

## GitHub Pages deployment (free)
1. Create a GitHub account and a new public repository, e.g. `jobmaster-ai`.
2. Upload all files in this folder to the repository root.
3. In repository Settings → Pages, select Deploy from a branch, choose `main` and `/ (root)`, then Save.
4. Wait for the published HTTPS URL, open it on Android Chrome and install it.

## Notes and limitations
- This is a working MVP, not a native APK. It installs and runs as an app-like PWA on Android.
- CVs and job records are stored in the browser's local storage on that device. Clearing browser site data can erase them. Export/backup is not yet included.
- Cover letters and interview frameworks are template-based in this free version. There is no integrated AI model or live job-feed API.
- PDF export uses the browser's print dialog. Select **Save as PDF**.
- Before public release, add a privacy policy, test on multiple Android devices, and consider encrypted backup, data export/import, accessibility and security review.
- The Google Fonts import is an optional online enhancement; the app's system-font fallback works offline.

## Project files
- `index.html` — app screens and forms
- `styles.css` — responsive interface and print styles
- `app.js` — language, CV preview, local data, letter, interview and tracker logic
- `manifest.webmanifest` — install metadata
- `sw.js` — offline cache
- `icon.svg` — app icon
