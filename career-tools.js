// JobMaster AI 2.1 — local ATS checklist and external job-board search.
(()=>{
 const $=id=>document.getElementById(id);
 const cv=$('atsCvText'),job=$('atsJobText'),result=$('atsResult');
 if(!cv||!job||!result)return;
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const words=s=>(s.toLowerCase().match(/[a-zÀ-ÿ0-9+#.-]+/g)||[]);
 const unique=a=>[...new Set(a)];
 function analyze(){
  const text=cv.value.trim(),desc=job.value.trim();
  if(text.length<80){result.textContent='Please paste at least a short CV (80 characters or more) before analysis.';return;}
  const lower=text.toLowerCase(),w=words(text),checks=[];
  const add=(label,ok,points,detail)=>checks.push({label,ok,points,detail});
  add('Contact information',/(\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b|\+?\d[\d\s().-]{7,}\d)/i.test(text),10,'Include a professional email address and phone number.');
  add('Professional summary',/(professional summary|profile|summary|profil professionnel|résumé professionnel|über mich|profil)/i.test(text),10,'Add a short profile aligned with your target role.');
  add('Work experience',/(experience|employment|work history|expérience|berufserfahrung)/i.test(text),15,'Use a clearly named Experience section with roles, employers and dates.');
  add('Education',/(education|formation|academic|éducation|ausbildung|studium)/i.test(text),10,'Include qualifications, institution and relevant dates.');
  add('Skills / technical skills',/(skills|competencies|compétences|kenntnisse|technical skills)/i.test(text),10,'Add a dedicated skills section with relevant technical keywords.');
  add('Measurable achievements',/(\b\d+\s?%|\b\d+(?:[.,]\d+)?\s?(?:pcs|units|hours|days|years|€|tnd|eur)\b|increased|reduced|improved|achieved|réduit|amélioré|steigerte)/i.test(text),15,'Quantify real results: productivity, quality, cost, delivery or project scope.');
  add('Readable length',w.length>=180&&w.length<=1100,10,'Aim for roughly 180–1,100 words; keep content relevant and concise.');
  add('Action verbs',/(managed|led|implemented|developed|validated|optimized|analyzed|coordinated|improved|réalisé|piloté|développé|validé|optimisé|analysé|eingeführt|optimiert)/i.test(text),10,'Start achievement bullets with clear action verbs.');
  add('Standard section structure',/(experience|education|skills|compétences|formation|berufserfahrung)/i.test(text),10,'Use conventional headings and a simple, single-column layout.');
  const score=checks.reduce((n,c)=>n+(c.ok?c.points:0),0);
  let match=null;
  if(desc){const stop=new Set('the and for with from that this your you are our will have has job role work experience years ability skills'.split(' '));const terms=unique(words(desc).filter(x=>x.length>=4&&!stop.has(x)));const cvWords=new Set(w);const matched=terms.filter(x=>cvWords.has(x));const missing=terms.filter(x=>!cvWords.has(x)).slice(0,18);match={pct:terms.length?Math.round(matched.length/terms.length*100):0,matched:matched.slice(0,18),missing};}
  const label=score>=85?'Strong structure':score>=65?'Good foundation':'Needs improvement';
  result.innerHTML=`<div class="jm-score"><strong>${score}/100</strong><span>${label}</span></div><div class="jm-two"><div><b>Checklist</b><ul>${checks.map(c=>`<li class="${c.ok?'jm-good':'jm-missing'}">${c.ok?'✓':'○'} ${esc(c.label)} <small>(${c.ok?c.points:0}/${c.points})</small></li>`).join('')}</ul></div><div><b>Recommended actions</b><ul>${checks.filter(c=>!c.ok).map(c=>`<li>${esc(c.detail)}</li>`).join('')||'<li class="jm-good">Your basic CV structure looks strong. Tailor keywords for each role.</li>'}</ul></div></div>${match?`<div class="jm-divider"></div><b>Job keyword coverage: ${match.pct}%</b><p><b>Found:</b> ${esc(match.matched.join(', ')||'No clear matches')}</p><p><b>Consider adding if accurate:</b> ${esc(match.missing.join(', ')||'No major missing terms detected')}</p>`:''}<p class="jm-muted">This is a heuristic checklist, not a guaranteed ATS pass/fail result. Keyword matches are exact-word estimates and do not understand every synonym.</p>`;
 }
 $('atsAnalyzeBtn').addEventListener('click',analyze);
 $('atsUseCvBtn').addEventListener('click',()=>{const ids=['fullName','jobTitle','email','phone','location','summary','position','company','period','experienceLocation','achievements','education','languages','skills'];const labels=['Name','Title','Email','Phone','Location','Summary','Position','Company','Period','Experience location','Achievements','Education','Languages','Skills'];const parts=ids.map((id,i)=>{const el=$(id);return el&&el.value.trim()?labels[i]+':\n'+el.value.trim():''}).filter(Boolean);if(!parts.length){result.textContent='Complete and save your CV Builder fields first.';return;}cv.value=parts.join('\n\n');result.textContent='CV Builder information loaded. Select Analyze my CV to calculate your checklist score.';});
 $('atsClearBtn').addEventListener('click',()=>{cv.value='';job.value='';result.textContent='Your CV score and recommendations will appear here.';});
 function searchJobs(remote){const role=$('finderRole').value.trim(),loc=remote?'remote':$('finderLocation').value.trim();if(!role){$('jobFinderLinks').textContent='Enter a job title or keyword first.';return;}const q=encodeURIComponent(role+' '+loc);const r=encodeURIComponent(role);const l=encodeURIComponent(loc);const links=[['LinkedIn','https://www.linkedin.com/jobs/search/?keywords='+r+'&location='+l],['Indeed','https://www.indeed.com/jobs?q='+r+'&l='+l],['Google Jobs','https://www.google.com/search?q='+q+'&ibp=htl;jobs'],['Tanitjobs','https://www.tanitjobs.com/?s='+r+'&post_type=job'],['Keejob','https://www.keejob.com/offres-emploi/?keywords='+r],['EURES','https://eures.europa.eu/job-search_en'],['Make it in Germany','https://www.make-it-in-germany.com/en/working-in-germany/job-listings']];$('jobFinderLinks').innerHTML=links.map(([name,url])=>`<a class="jm-link" href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('');}
 $('findJobsBtn').addEventListener('click',()=>searchJobs(false));$('findRemoteBtn').addEventListener('click',()=>searchJobs(true));
})();
