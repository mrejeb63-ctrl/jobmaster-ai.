# JobMaster AI 2.0

## What's new
- Gemini-powered AI Career Assistant for CV improvement, job matching, cover letters, interview preparation and career plans.
- English, French, Arabic and German output selection.
- API key is held in page memory only; it is not stored in localStorage or committed to GitHub.
- Existing CV builder, PDF printing, tracker, backup/restore and offline PWA remain.

## Important API key security
This is a personal testing integration, not a safe public multi-user deployment. The browser sends requests directly to Google Gemini and the key can be inspected by the device owner or in browser developer tools. Never publish a key in source code, GitHub, screenshots or share it with users. For a public commercial service, implement a backend proxy with authentication, rate limits, abuse protection and server-side secret storage. CV content is sent to Google when Generate is pressed; use anonymized test data and review Google's current terms and data-use policy.

## Set up Gemini
1. Open https://aistudio.google.com/app/apikey and sign in.
2. Create an API key in Google AI Studio.
3. In JobMaster AI, open AI Assistant and paste the key into the session-only field.
4. Select a task and response language, add CV/experience and optionally a job description, then select Generate with Gemini.
5. Clear the key by refreshing or closing the page. The app does not persist it.

Gemini API free-tier availability, supported models and quotas can change and vary by account/region. Check https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/gemini-api/docs/rate-limits. This build uses `gemini-2.5-flash`; if Google retires or restricts it for your project, update the model name in `ai-assistant.js` to a currently available text model in your AI Studio project.

## Deploy to GitHub Pages
1. Extract the ZIP. Open the `jobmaster-ai` folder.
2. In your GitHub repository choose Add file -> Upload files.
3. Upload all files inside `jobmaster-ai` to the repository root, replacing old files. Ensure `ai-assistant.js` is uploaded.
4. Commit changes to `main`. Keep Settings -> Pages set to `main` and `/ (root)`.
5. Wait for deployment, then open the site in Chrome and refresh.
6. If installed as a PWA, close and reopen it. The service worker cache is bumped to `jobmaster-ai-v2-0`. If old files remain, uninstall the home-screen shortcut and reopen the HTTPS site before reinstalling.

## Local test
Serve the folder over HTTP/HTTPS (not `file://`). For example, from the folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## Privacy
Existing CV and job tracker data remain in browser local storage on the device. AI inputs are sent to Google's Gemini API only when the user submits a request. Avoid sensitive personal data. This is not a production-ready secure SaaS backend.
