# JobMaster AI 2.2 — Complete Career Toolkit

## Included features
- **CV Builder:** personal details, professional summary, experience, education, skills, live preview, Classic/Modern/Minimal templates and browser PDF export.
- **Cover Letter Generator:** creates a first draft from the target role, employer and candidate fit notes.
- **Interview Coach:** behavioral and technical question sets, answer notes and STAR framework; practice sessions are counted.
- **Job Tracker:** save applications, company, location, status, date and job link; delete entries; filter by keyword and status.
- **Gemini AI Assistant:** CV improvement, CV/job matching, cover letters, interview preparation and career development plans; response languages English, French, Arabic and German.
- **ATS CV Analyzer:** local 100-point structural checklist, improvement suggestions and approximate job-description keyword coverage. It is not an employer ATS score.
- **Job Finder:** search links for LinkedIn, Indeed, Google Jobs, Tanitjobs, Keejob, EURES and Make it in Germany; remote search supported.
- **Career performance dashboard:** CV completeness estimate, active applications, interview rate, offers and practice sessions.
- **Backup / restore:** export all `jm_` app data to a JSON file and import it on this or another browser/device.
- **PWA/offline shell:** installable on Android and desktop; static app screens work offline after first successful load. Gemini and external job boards require internet.
- **Languages:** English, French, Arabic and German interface support for the existing translated interface; some newly added tool labels remain English.

## Deploy to GitHub Pages
1. Download and extract `JobMaster_AI_2.2.zip`.
2. Open the `jobmaster-ai` folder.
3. In your GitHub repository choose **Add file → Upload files**.
4. Upload all files inside `jobmaster-ai` to the repository root, replacing existing files. Include `dashboard.js`.
5. Commit to `main`; keep Pages configured for `main` and `/(root)`.
6. Wait for deployment. Refresh the website. For an installed PWA, close and reopen it. If the old version remains, uninstall the home-screen shortcut, reopen the website and reinstall.

## Gemini API key and privacy
The Gemini assistant sends the CV/job text and API key from the browser directly to Google when Generate is pressed. The key is not saved in app local storage, but browser-side keys are inspectable and are not safe for a public multi-user service. Never hardcode a key in source code or GitHub, and do not use an employer key. For public/commercial launch, use a protected backend with authentication, server-side secret storage, quotas and abuse protection. Anonymize CVs and review Google's current terms and data-use settings. Free access, model availability and quotas can change.

Create a personal test key at https://aistudio.google.com/app/apikey. The current model is configured in `ai-assistant.js`; update it if Google changes model availability.

## Data and limitations
CV and tracker information are stored in this browser's local storage. Export a backup before clearing browser data or changing devices. The ATS score is a heuristic, the keyword comparison is approximate, and the Job Finder opens external job-board pages rather than scraping or guaranteeing live vacancies. PDF export uses the browser print dialog (choose Save as PDF).
