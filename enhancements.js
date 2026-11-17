/* JobMaster AI 1.2 - practical offline-first career tools */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem('jm_' + key)) ?? fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem('jm_' + key, JSON.stringify(value));
  const lang = () => $('languageSelect')?.value || 'en';
  const words = {
    en: {
      analyzer:'CV match analyzer', jobDesc:'Paste the job description', analyze:'Analyze my CV', score:'Match score', matched:'Matched keywords', missing:'Suggested keywords to review', scoreNote:'This is a guidance score based on text and keywords, not a real ATS certification.', assistant:'Career assistant prompts', promptHint:'Choose a task to prepare a tailored prompt using your CV.', optimize:'Optimize my CV', interviewPrompt:'Prepare for this job interview', copyPrompt:'Copy prompt', jobSearch:'International job search', searchHint:'Choose a country and enter a role or skill. Searches open the original job platforms in a new tab.', country:'Country', keywords:'Job title or keywords', searchJobs:'Search jobs', interviewReview:'Answer practice review', reviewHint:'Write your answer, then get a checklist-based review. Your text stays on this device.', review:'Review my answer', strengths:'What is present', improve:'What to improve', backup:'Your data backup', exportData:'Download backup', importData:'Restore backup', importLabel:'Choose backup JSON', backupNote:'Backup includes CV details, tracked applications, language and practice count. Keep this file private.', printLetter:'Print / save letter as PDF', noAnswer:'Write an answer first.', copied:'Copied to clipboard.', saved:'Saved on this device.', chooseFile:'Select a JSON backup file first.', restored:'Backup restored. Reloading…', badBackup:'This file is not a valid JobMaster AI backup.', roleRequired:'Enter a job title or keywords.', cvRequired:'Add some CV information before analysis.', promptReady:'Prompt prepared. Copy it into ChatGPT or Gemini for AI assistance.', openSite:'Search platform', anet:'ANETI (Tunisia)', eures:'EURES (Europe)', linkedin:'LinkedIn Jobs', indeed:'Indeed', stepstone:'StepStone', france:'France', germany:'Germany', austria:'Austria', tunisia:'Tunisia', answerLong:'Add a specific example and measurable result where possible.', answerSTAR:'Use STAR: Situation, Task, Action, Result.', answerEvidence:'Support claims with concrete evidence or numbers.', answerRelevant:'Connect your answer directly to the target role.'
    },
    fr: {
      analyzer:'Analyse de correspondance du CV', jobDesc:'Collez la description du poste', analyze:'Analyser mon CV', score:'Score de correspondance', matched:'Mots-clés présents', missing:'Mots-clés à examiner', scoreNote:'Score indicatif basé sur le texte et les mots-clés, sans certification ATS.', assistant:'Prompts assistant carrière', promptHint:'Choisissez une tâche pour créer un prompt adapté à votre CV.', optimize:'Optimiser mon CV', interviewPrompt:'Préparer cet entretien', copyPrompt:'Copier le prompt', jobSearch:'Recherche internationale', searchHint:'Choisissez un pays et saisissez un poste ou des compétences. Les recherches ouvrent les plateformes originales.', country:'Pays', keywords:'Poste ou mots-clés', searchJobs:'Rechercher des emplois', interviewReview:'Évaluation de réponse', reviewHint:'Rédigez votre réponse puis obtenez une évaluation par checklist. Le texte reste sur cet appareil.', review:'Évaluer ma réponse', strengths:'Éléments présents', improve:'Axes d’amélioration', backup:'Sauvegarde des données', exportData:'Télécharger la sauvegarde', importData:'Restaurer la sauvegarde', importLabel:'Choisir un fichier JSON', backupNote:'La sauvegarde contient le CV, les candidatures, la langue et les sessions. Gardez ce fichier privé.', printLetter:'Imprimer / enregistrer en PDF', noAnswer:'Rédigez d’abord une réponse.', copied:'Copié dans le presse-papiers.', saved:'Enregistré sur cet appareil.', chooseFile:'Sélectionnez un fichier JSON.', restored:'Sauvegarde restaurée. Rechargement…', badBackup:'Fichier de sauvegarde JobMaster AI invalide.', roleRequired:'Saisissez un poste ou des mots-clés.', cvRequired:'Ajoutez des informations au CV avant l’analyse.', promptReady:'Prompt prêt. Copiez-le dans ChatGPT ou Gemini.', openSite:'Rechercher', anet:'ANETI (Tunisie)', eures:'EURES (Europe)', linkedin:'LinkedIn Emplois', indeed:'Indeed', stepstone:'StepStone', france:'France', germany:'Allemagne', austria:'Autriche', tunisia:'Tunisie', answerLong:'Ajoutez un exemple précis et un résultat mesurable.', answerSTAR:'Utilisez STAR : Situation, Tâche, Action, Résultat.', answerEvidence:'Appuyez vos affirmations par des faits ou des chiffres.', answerRelevant:'Reliez directement votre réponse au poste visé.'
    },
    ar: {
      analyzer:'تحليل توافق السيرة الذاتية', jobDesc:'الصق وصف الوظيفة', analyze:'حلّل سيرتي الذاتية', score:'نسبة التوافق', matched:'الكلمات الموجودة', missing:'كلمات يُنصح بمراجعتها', scoreNote:'هذه نتيجة إرشادية تعتمد على النص والكلمات المفتاحية وليست شهادة ATS فعلية.', assistant:'مساعد المسار المهني', promptHint:'اختر مهمة لإنشاء تعليمات مخصصة اعتماداً على سيرتك الذاتية.', optimize:'تحسين سيرتي الذاتية', interviewPrompt:'التحضير لمقابلة هذه الوظيفة', copyPrompt:'نسخ التعليمات', jobSearch:'البحث عن وظائف دولية', searchHint:'اختر البلد وأدخل المسمى أو المهارات. ستفتح نتائج البحث على مواقع التوظيف الأصلية.', country:'البلد', keywords:'المسمى الوظيفي أو الكلمات المفتاحية', searchJobs:'ابحث عن وظائف', interviewReview:'تقييم إجابة المقابلة', reviewHint:'اكتب إجابتك ثم احصل على مراجعة بقائمة تحقق. تبقى إجابتك على هذا الجهاز.', review:'قيّم إجابتي', strengths:'العناصر الموجودة', improve:'ما يجب تحسينه', backup:'نسخة احتياطية لبياناتك', exportData:'تنزيل النسخة الاحتياطية', importData:'استعادة النسخة', importLabel:'اختر ملف JSON', backupNote:'تتضمن النسخة السيرة الذاتية والطلبات واللغة وعدد جلسات التدريب. احتفظ بالملف بشكل خاص.', printLetter:'طباعة / حفظ الرسالة PDF', noAnswer:'اكتب إجابة أولاً.', copied:'تم النسخ.', saved:'تم الحفظ على الجهاز.', chooseFile:'اختر ملف JSON أولاً.', restored:'تمت الاستعادة. جارٍ إعادة التحميل…', badBackup:'ملف النسخة الاحتياطية غير صالح.', roleRequired:'أدخل المسمى الوظيفي أو الكلمات المفتاحية.', cvRequired:'أضف معلومات إلى السيرة الذاتية قبل التحليل.', promptReady:'التعليمات جاهزة. انسخها إلى ChatGPT أو Gemini.', openSite:'ابحث', anet:'ANETI تونس', eures:'EURES أوروبا', linkedin:'وظائف LinkedIn', indeed:'Indeed', stepstone:'StepStone', france:'فرنسا', germany:'ألمانيا', austria:'النمسا', tunisia:'تونس', answerLong:'أضف مثالاً محدداً ونتيجة قابلة للقياس.', answerSTAR:'استخدم STAR: الموقف، المهمة، الإجراء، النتيجة.', answerEvidence:'ادعم كلامك بأدلة أو أرقام واضحة.', answerRelevant:'اربط إجابتك مباشرة بالوظيفة المطلوبة.'
    },
    de: {
      analyzer:'CV-Match-Analyse', jobDesc:'Stellenbeschreibung einfügen', analyze:'Lebenslauf analysieren', score:'Übereinstimmung', matched:'Gefundene Schlüsselwörter', missing:'Zu prüfende Schlüsselwörter', scoreNote:'Orientierungswert auf Basis von Text und Schlüsselwörtern, keine ATS-Zertifizierung.', assistant:'Karriere-Assistent', promptHint:'Wählen Sie eine Aufgabe für einen auf Ihren Lebenslauf zugeschnittenen Prompt.', optimize:'Lebenslauf optimieren', interviewPrompt:'Auf dieses Vorstellungsgespräch vorbereiten', copyPrompt:'Prompt kopieren', jobSearch:'Internationale Jobsuche', searchHint:'Land auswählen und Position oder Fähigkeiten eingeben. Die Suche öffnet die Original-Jobportale.', country:'Land', keywords:'Stellenbezeichnung oder Schlüsselwörter', searchJobs:'Jobs suchen', interviewReview:'Antwort-Feedback', reviewHint:'Schreiben Sie Ihre Antwort und lassen Sie sie anhand einer Checkliste prüfen. Der Text bleibt auf diesem Gerät.', review:'Antwort prüfen', strengths:'Vorhandene Elemente', improve:'Verbesserungsvorschläge', backup:'Datensicherung', exportData:'Backup herunterladen', importData:'Backup wiederherstellen', importLabel:'JSON-Backup auswählen', backupNote:'Das Backup enthält Lebenslauf, Bewerbungen, Sprache und Übungssitzungen. Datei privat aufbewahren.', printLetter:'Drucken / als PDF speichern', noAnswer:'Bitte zuerst eine Antwort schreiben.', copied:'In Zwischenablage kopiert.', saved:'Auf diesem Gerät gespeichert.', chooseFile:'Bitte zuerst eine JSON-Datei auswählen.', restored:'Backup wiederhergestellt. Seite wird neu geladen…', badBackup:'Ungültige JobMaster-AI-Backup-Datei.', roleRequired:'Bitte Stellenbezeichnung oder Schlüsselwörter eingeben.', cvRequired:'Vor der Analyse Lebenslaufdaten eingeben.', promptReady:'Prompt erstellt. In ChatGPT oder Gemini kopieren.', openSite:'Suchen', anet:'ANETI (Tunesien)', eures:'EURES (Europa)', linkedin:'LinkedIn Jobs', indeed:'Indeed', stepstone:'StepStone', france:'Frankreich', germany:'Deutschland', austria:'Österreich', tunisia:'Tunesien', answerLong:'Fügen Sie ein konkretes Beispiel und ein messbares Ergebnis hinzu.', answerSTAR:'Nutzen Sie STAR: Situation, Aufgabe, Aktion, Ergebnis.', answerEvidence:'Belegen Sie Aussagen mit konkreten Fakten oder Zahlen.', answerRelevant:'Beziehen Sie Ihre Antwort direkt auf die Zielposition.'
    }
  };
  const tr = key => words[lang()]?.[key] || words.en[key] || key;
  const panel = (title, body) => `<section class="panel jm-extra"><h3>${title}</h3>${body}</section>`;
  const cvLayout = document.querySelector('.cv-layout');
  if (cvLayout) cvLayout.insertAdjacentHTML('afterend', panel(tr('analyzer'), `
    <p class="jm-muted">${tr('scoreNote')}</p>
    <label class="jm-label">${tr('jobDesc')}<textarea id="jmJobDescription" rows="5" placeholder="${tr('jobDesc')}"></textarea></label>
    <button class="btn btn-primary" id="jmAnalyze">${tr('analyze')}</button><div id="jmAnalysis" class="jm-result" aria-live="polite"></div>
    <div class="jm-divider"></div><h3>${tr('assistant')}</h3><p class="jm-muted">${tr('promptHint')}</p>
    <div class="jm-actions"><button class="btn btn-dark" id="jmOptimize">${tr('optimize')}</button><button class="btn btn-ghost" id="jmInterviewPrompt">${tr('interviewPrompt')}</button></div><textarea id="jmPromptOutput" rows="6" placeholder="${tr('promptReady')}"></textarea><button class="btn btn-ghost" id="jmCopyPrompt">${tr('copyPrompt')}</button>
  `));
  const interviewLayout = document.querySelector('.interview-layout');
  if (interviewLayout) interviewLayout.insertAdjacentHTML('afterend', panel(tr('interviewReview'), `
    <p class="jm-muted">${tr('reviewHint')}</p><textarea id="jmAnswerReview" rows="5" placeholder="${tr('answerLong')}"></textarea><button class="btn btn-primary" id="jmReviewAnswer">${tr('review')}</button><div id="jmAnswerFeedback" class="jm-result" aria-live="polite"></div>
  `));
  const jobsPage = $('page-jobs');
  if (jobsPage) jobsPage.insertAdjacentHTML('beforeend', panel(tr('jobSearch'), `
    <p class="jm-muted">${tr('searchHint')}</p><div class="jm-grid"><label class="jm-label">${tr('country')}<select id="jmCountry"><option value="Tunisia">${tr('tunisia')}</option><option value="France">${tr('france')}</option><option value="Germany">${tr('germany')}</option><option value="Austria">${tr('austria')}</option></select></label><label class="jm-label">${tr('keywords')}<input id="jmKeywords" placeholder="Product technician, quality, NPI"></label></div><button class="btn btn-primary" id="jmSearchJobs">${tr('searchJobs')}</button><div id="jmJobLinks" class="jm-links"></div>
  `));
  const home = $('page-home');
  if (home) home.insertAdjacentHTML('beforeend', panel(tr('backup'), `
    <p class="jm-muted">${tr('backupNote')}</p><div class="jm-actions"><button class="btn btn-dark" id="jmExport">${tr('exportData')}</button><button class="btn btn-ghost" id="jmImportBtn">${tr('importData')}</button><input id="jmImportFile" type="file" accept="application/json,.json" class="hidden"></div>
  `));
  const letterToolbar = document.querySelector('#page-letter .output-panel .panel-title');
  if (letterToolbar) letterToolbar.insertAdjacentHTML('beforeend', `<button id="jmPrintLetter" class="btn btn-ghost">${tr('printLetter')}</button>`);
  function notify(message) { const el = $('toast'); if (el) { el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); } else alert(message); }
  function cvText() { const ids = ['fullName','jobTitle','email','phone','location','summary','position','company','period','experienceLocation','achievements','education','languages','skills']; return ids.map(id => $(id)?.value || '').join(' '); }
  function safe(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  $('jmAnalyze')?.addEventListener('click', () => {
    const cv = cvText().toLowerCase(), desc = ($('jmJobDescription').value || '').toLowerCase();
    if (cv.trim().length < 20) return notify(tr('cvRequired'));
    if (desc.trim().length < 10) return notify(tr('roleRequired'));
    const stop = new Set('the and for with from that this will your you our are was has have der die das und für mit von eine ein the to a an in on at as is be or of au aux des les une un pour dans avec est sont du de la le et en el los las y para por con'.split(/\s+/));
    const terms = [...new Set((desc.match(/[\p{L}\p{N}+#.-]{3,}/gu) || []).map(x=>x.toLowerCase()).filter(x=>!stop.has(x)))].slice(0,100);
    const matched = terms.filter(x=>cv.includes(x)); const missing = terms.filter(x=>!cv.includes(x)); const score = Math.round(matched.length / Math.max(terms.length,1) * 100);
    $('jmAnalysis').innerHTML = `<div class="jm-score"><strong>${score}%</strong><span>${tr('score')}</span></div><div class="jm-two"><div><b>${tr('matched')} (${matched.length})</b><p>${matched.length ? matched.map(safe).join(' · ') : '—'}</p></div><div><b>${tr('missing')} (${missing.length})</b><p>${missing.slice(0,25).map(safe).join(' · ') || '—'}</p></div></div><p class="jm-muted">${tr('scoreNote')}</p>`;
  });
  function makePrompt(kind) {
    const cv = cvText().trim(), job = $('jmJobDescription')?.value.trim() || '';
    const base = kind === 'cv'
      ? `Act as a professional CV editor. Improve the following CV for clarity, measurable achievements and ATS-readable wording. Do not invent qualifications, employers, dates or results. Identify gaps and ask questions instead of making facts up. Return an improved version and a list of changes.\n\nCV:\n${cv || '[Paste CV details]'}\n\nTarget job description:\n${job || '[Paste job description]'}`
      : `Act as an interview coach. Prepare 10 role-specific interview questions and strong answer structures using only the candidate's real experience. Do not invent facts. Include technical, behavioral and motivation questions.\n\nCandidate CV:\n${cv || '[Paste CV details]'}\n\nJob description:\n${job || '[Paste job description]'}`;
    $('jmPromptOutput').value = base; notify(tr('promptReady'));
  }
  $('jmOptimize')?.addEventListener('click', () => makePrompt('cv'));
  $('jmInterviewPrompt')?.addEventListener('click', () => makePrompt('interview'));
  $('jmCopyPrompt')?.addEventListener('click', async () => { const el = $('jmPromptOutput'); if (!el.value) return notify(tr('promptReady')); try { await navigator.clipboard.writeText(el.value); } catch { el.select(); document.execCommand('copy'); } notify(tr('copied')); });
  $('jmReviewAnswer')?.addEventListener('click', () => {
    const a = $('jmAnswerReview').value.trim(); if (!a) return notify(tr('noAnswer'));
    const checks = [ [a.length > 100, tr('answerLong')], [/situation|context|when|during|situation|contexte|الموقف|situation/i.test(a), tr('answerSTAR')], [/result|improv|increased|reduced|saved|achieved|résultat|amélior|نتيجة|ergebnis/i.test(a), tr('answerEvidence')], [/job|role|position|company|poste|rôle|وظيفة|stelle/i.test(a), tr('answerRelevant')] ];
    const good = checks.filter(x=>x[0]).length;
    $('jmAnswerFeedback').innerHTML = `<div class="jm-score"><strong>${Math.round(good/checks.length*100)}%</strong><span>${tr('strengths')}</span></div><ul>${checks.map(([ok,msg])=>`<li class="${ok?'jm-good':'jm-missing'}">${ok?'✓':'•'} ${safe(msg)}</li>`).join('')}</ul><p class="jm-muted">This is a writing checklist, not an assessment of your professional competence.</p>`;
    const saved = read('practiceReviews',[]); saved.unshift({date:new Date().toISOString(),answer:a,score:Math.round(good/checks.length*100)}); write('practiceReviews',saved.slice(0,30));
  });
  const jobSources = {
    Tunisia: [['anet','https://www.aneti.tn/'],['linkedin','https://www.linkedin.com/jobs/search/?keywords='],['indeed','https://tn.indeed.com/jobs?q=']],
    France: [['france','https://fr.indeed.com/jobs?q='],['linkedin','https://www.linkedin.com/jobs/search/?keywords='],['eures','https://eures.europa.eu/index_en']],
    Germany: [['stepstone','https://www.stepstone.de/jobs/'],['linkedin','https://www.linkedin.com/jobs/search/?keywords='],['eures','https://eures.europa.eu/index_en']],
    Austria: [['stepstone','https://www.stepstone.at/jobs/'],['linkedin','https://www.linkedin.com/jobs/search/?keywords='],['eures','https://eures.europa.eu/index_en']]
  };
  $('jmSearchJobs')?.addEventListener('click', () => {
    const q = $('jmKeywords').value.trim(); if (!q) return notify(tr('roleRequired'));
    const country = $('jmCountry').value;
    const links = jobSources[country].map(([label,base]) => {
      const url = label === 'stepstone' ? base + encodeURIComponent(q) : (base.endsWith('=') ? base + encodeURIComponent(q) : base);
      return `<a class="jm-link" href="${url}" target="_blank" rel="noopener noreferrer">${tr(label)} ↗</a>`;
    });
    $('jmJobLinks').innerHTML = links.join('');
  });
  $('jmExport')?.addEventListener('click', () => {
    const payload = { product:'JobMaster AI', version:'1.2', exportedAt:new Date().toISOString(), data:{} };
    ['cv','jobs','lang','sessions','practiceReviews'].forEach(k=>payload.data[k]=read(k,k==='jobs'||k==='practiceReviews'?[]:k==='cv'?{}:0));
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='jobmaster-ai-backup.json'; a.click(); URL.revokeObjectURL(url); notify(tr('saved'));
  });
  $('jmImportBtn')?.addEventListener('click', () => $('jmImportFile').click());
  $('jmImportFile')?.addEventListener('change', async e => {
    const file=e.target.files?.[0]; if(!file) return;
    try { const obj=JSON.parse(await file.text()); if(obj.product!=='JobMaster AI'||!obj.data||typeof obj.data!=='object') throw new Error('invalid'); ['cv','jobs','lang','sessions','practiceReviews'].forEach(k=>{if(k in obj.data)write(k,obj.data[k])}); notify(tr('restored')); setTimeout(()=>location.reload(),900); }
    catch { notify(tr('badBackup')); }
  });
  $('jmPrintLetter')?.addEventListener('click', () => {
    const text=$('letterOutput')?.value.trim(); if(!text) return notify(tr('noAnswer'));
    const w=window.open('','_blank'); if(!w) return notify('Allow pop-ups to print the letter.');
    w.document.write(`<!doctype html><html lang="${lang()}"><meta charset="utf-8"><title>Cover letter</title><style>body{font:12pt Arial,sans-serif;line-height:1.6;max-width:800px;margin:40px auto;white-space:pre-wrap}</style><body>${safe(text)}</body></html>`); w.document.close(); w.focus(); setTimeout(()=>w.print(),300);
  });
  // Update the added panels in place; do not reload or discard unsaved form entries.
  $('languageSelect')?.addEventListener('change', () => {
    const setText = (selector, key) => { const el=document.querySelector(selector); if(el) el.textContent=tr(key); };
    const cvPanels=document.querySelectorAll('#page-cv .jm-extra');
    if(cvPanels[0]) { const h=cvPanels[0].querySelector('h3'); if(h) h.textContent=tr('analyzer'); const p=cvPanels[0].querySelector('.jm-muted'); if(p) p.textContent=tr('scoreNote'); const lab=cvPanels[0].querySelector('.jm-label'); if(lab) lab.childNodes[0].textContent=tr('jobDesc')+' '; }
    if(cvPanels[1]) { const h=cvPanels[1].querySelector('h3'); if(h) h.textContent=tr('assistant'); const p=cvPanels[1].querySelector('.jm-muted'); if(p) p.textContent=tr('promptHint'); }
    const ip=document.querySelector('#page-interview .jm-extra'); if(ip) { const h=ip.querySelector('h3'); if(h) h.textContent=tr('interviewReview'); const p=ip.querySelector('.jm-muted'); if(p) p.textContent=tr('reviewHint'); }
    const jp=document.querySelector('#page-jobs .jm-extra'); if(jp) { const h=jp.querySelector('h3'); if(h) h.textContent=tr('jobSearch'); const p=jp.querySelector('.jm-muted'); if(p) p.textContent=tr('searchHint'); const labs=jp.querySelectorAll('.jm-label'); if(labs[0]) labs[0].childNodes[0].textContent=tr('country')+' '; if(labs[1]) labs[1].childNodes[0].textContent=tr('keywords')+' '; const opts=$('jmCountry').options; [ ['Tunisia','tunisia'],['France','france'],['Germany','germany'],['Austria','austria'] ].forEach(([v,k],i)=>{const o=[...opts].find(x=>x.value===v);if(o)o.textContent=tr(k)}); }
    const hp=document.querySelector('#page-home .jm-extra'); if(hp) { const h=hp.querySelector('h3'); if(h) h.textContent=tr('backup'); const p=hp.querySelector('.jm-muted'); if(p) p.textContent=tr('backupNote'); }
    setText('#jmAnalyze','analyze'); setText('#jmOptimize','optimize'); setText('#jmInterviewPrompt','interviewPrompt'); setText('#jmCopyPrompt','copyPrompt'); setText('#jmReviewAnswer','review'); setText('#jmSearchJobs','searchJobs'); setText('#jmExport','exportData'); setText('#jmImportBtn','importData'); setText('#jmPrintLetter','printLetter');
  });
})();
