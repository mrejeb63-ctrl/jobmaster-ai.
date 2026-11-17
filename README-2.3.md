# JobMaster AI 2.3 upgrade

Add `jobmaster-2.3.js` and `jobmaster-2.3.css` to the existing 2.2 project.

In index.html, add before `</head>`:
`<link rel="stylesheet" href="jobmaster-2.3.css?v=2.3">`

Before `</body>`, after dashboard.js:
`<script src="./jobmaster-2.3.js?v=2.3" defer></script>`

For in-browser PDF/DOCX import, add PDF.js and Mammoth from trusted/self-hosted copies and expose `pdfjsLib` and `mammoth`. TXT import works without them.

Replace existing `ai-assistant.js` with the supplied 2.3 version. For a public release, deploy `server.mjs` behind HTTPS with `GEMINI_API_KEY` stored only server-side. The UI can still accept a session-only personal key for local testing.

Update visible version strings and cache key to 2.3, and add the two new 2.3 assets to the service-worker ASSETS list.

New features: CV import framework, smart job matching, contextual interview answer review, latest-match and average-interview dashboard KPIs, and optional backend AI proxy.
