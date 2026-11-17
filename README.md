# JobMaster AI 2.1

## What's new in 2.1
- Local ATS CV Analyzer with a transparent 100-point checklist, recommendations and optional job-description keyword coverage.
- Job Finder shortcuts for LinkedIn, Indeed, Google Jobs, Tanitjobs, Keejob, EURES and Make it in Germany. Search results open on the external job-board websites.
- Career tools work without an AI key. CV analysis runs locally in the browser; job search opens external websites.
- Preserves the 2.0 Gemini AI Assistant, CV Builder, PDF print/export, cover letter, interview coach, job tracker, local storage and offline PWA.

## Important notes
The ATS score is a heuristic CV-structure checklist, not an employer ATS score or a guarantee of selection. Keyword coverage uses simple word matching and may miss synonyms. Review every recommendation and include only skills and experience that are true.

The Job Finder does not scrape or guarantee current vacancies; it opens external job-board search pages. Some boards may change their URLs or require sign-in.

## Gemini API key safety
The 2.0 AI Assistant remains a personal testing integration. The browser sends requests directly to Google Gemini and the key can be inspected in browser developer tools. Never put a key in source code, GitHub, screenshots or a shared device. For a public multi-user or commercial launch, use a protected backend proxy with authentication, rate limits, abuse protection and server-side secret storage. CV content is sent to Google when Generate is pressed; anonymize test data and review Google's current terms and data-use policy.

Create a key at https://aistudio.google.com/app/apikey. Free-tier access, model availability and quotas depend on account, region and Google's current policies. The current model is configured in `ai-assistant.js` as `gemini-2.5-flash`; change it if Google no longer supports it for your project.

## Deploy to GitHub Pages
1. Extract the ZIP and open the `jobmaster-ai` folder.
2. In your GitHub repository choose **Add file → Upload files**.
3. Upload every file inside `jobmaster-ai` to the repository root, replacing existing files. Ensure `career-tools.js` is included.
4. Commit to `main`; keep Pages set to `main` and `/(root)`.
5. Wait for deployment, then refresh the website. If installed as a PWA, close and reopen it. The service-worker cache is now `jobmaster-ai-v2-1`. If the old version remains, uninstall the home-screen shortcut, reopen the website and reinstall.

## Local test
Serve the folder through HTTP/HTTPS (not `file://`). For example: `python -m http.server 8000`.

## Privacy
CV and job-tracker data remain in browser local storage on this device. The ATS Analyzer processes pasted CV text locally and does not send it to a server. AI Assistant inputs are sent to Google only when you submit a Gemini request. Job Finder searches are performed on external websites. Avoid sensitive personal data. This is not a production-ready secure SaaS backend.
