// JobMaster AI 2.2 — career dashboard, job filters and portable backup.
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const get=k=>{try{return JSON.parse(localStorage.getItem('jm_'+k))}catch{return null}};
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const toast=msg=>{const el=$('toast');if(el){el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2500)}};
 function addDashboard(){
  const home=$('page-home'); if(!home||$('jmCareerDashboard'))return;
  const panel=document.createElement('section');panel.id='jmCareerDashboard';panel.className='panel jm-extra jm-dashboard';
  panel.innerHTML=`<div class="jm-dash-head"><div><p class="eyebrow">CAREER INTELLIGENCE</p><h3>Career performance dashboard</h3><p class="jm-muted">A live summary calculated from information saved on this device.</p></div><div class="jm-actions"><button type="button" class="btn btn-ghost" id="jmExport">Export backup</button><button type="button" class="btn btn-ghost" id="jmImportTrigger">Import backup</button><input type="file" id="jmImportFile" accept="application/json,.json" hidden></div></div><div class="jm-kpi-grid"><div class="jm-kpi"><span>CV completeness</span><strong id="jmCvScore">0%</strong><small>Based on completed CV fields</small></div><div class="jm-kpi"><span>Active applications</span><strong id="jmActive">0</strong><small>Applied + interview</small></div><div class="jm-kpi"><span>Interview rate</span><strong id="jmInterviewRate">0%</strong><small>Interviews / applications</small></div><div class="jm-kpi"><span>Offers received</span><strong id="jmOffers">0</strong><small>Tracked offers</small></div></div><div class="jm-dash-foot"><span id="jmPracticeCount">0 interview practice sessions</span><span id="jmDashUpdated">Updated just now</span></div>`;
  const bottom=home.querySelector('.bottom-grid'); if(bottom)bottom.after(panel);else home.append(panel);
  $('jmExport').addEventListener('click',exportBackup);$('jmImportTrigger').addEventListener('click',()=>$('jmImportFile').click());$('jmImportFile').addEventListener('change',importBackup);
 }
 function refresh(){
  const cv=get('cv')||{},jobs=Array.isArray(get('jobs'))?get('jobs'):[],sessions=Number(get('sessions'))||0;
  const fields=['fullName','jobTitle','email','phone','location','summary','position','company','period','achievements','education','skills','languages'];
  const score=Math.round(fields.filter(k=>String(cv[k]||'').trim()).length/fields.length*100);
  const interviews=jobs.filter(j=>j.status==='Interview').length,offers=jobs.filter(j=>j.status==='Offer').length,active=jobs.filter(j=>['Applied','Interview'].includes(j.status)).length;
  const rate=jobs.length?Math.round(interviews/jobs.length*100):0;
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  set('jmCvScore',score+'%');set('jmActive',active);set('jmInterviewRate',rate+'%');set('jmOffers',offers);set('jmPracticeCount',sessions+' interview practice sessions');set('jmDashUpdated','Updated '+new Date().toLocaleTimeString());
 }
 function exportBackup(){
  const data={app:'JobMaster AI',version:'2.2',exportedAt:new Date().toISOString(),data:{}};
  for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('jm_')){try{data.data[k]=JSON.parse(localStorage.getItem(k))}catch{data.data[k]=localStorage.getItem(k)}}}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='JobMaster_AI_backup_'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Backup exported');
 }
 function importBackup(e){
  const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);if(!parsed||parsed.app!=='JobMaster AI'||!parsed.data||typeof parsed.data!=='object')throw new Error('Invalid JobMaster AI backup');if(!confirm('Import this backup? Existing JobMaster AI data on this device will be replaced for keys included in the backup.'))return;Object.entries(parsed.data).forEach(([k,v])=>{if(k.startsWith('jm_'))localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))});toast('Backup imported. Reloading…');setTimeout(()=>location.reload(),700)}catch(err){alert('Could not import backup: '+err.message)}finally{e.target.value=''}};reader.readAsText(file);
 }
 function addJobFilters(){
  const list=$('jobList');if(!list||$('jmJobFilters'))return;
  const bar=document.createElement('div');bar.id='jmJobFilters';bar.className='jm-job-filters';bar.innerHTML=`<input id="jmJobSearch" type="search" placeholder="Search role, company or country…" aria-label="Search applications"><select id="jmJobStatus" aria-label="Filter by status"><option value="all">All statuses</option><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option></select><span id="jmJobCount" class="jm-muted"></span>`;
  list.before(bar);$('jmJobSearch').addEventListener('input',filterJobs);$('jmJobStatus').addEventListener('change',filterJobs);const observer=new MutationObserver(filterJobs);observer.observe(list,{childList:true,subtree:true});
 }
 function filterJobs(){const q=($('jmJobSearch')?.value||'').toLowerCase(),status=$('jmJobStatus')?.value||'all';let visible=0,total=0;document.querySelectorAll('#jobList .job-row').forEach(row=>{total++;const txt=row.textContent.toLowerCase(),st=row.querySelector('.status')?.textContent||'';const show=txt.includes(q)&&(status==='all'||st===status);row.hidden=!show;if(show)visible++});const count=$('jmJobCount');if(count)count.textContent=`Showing ${visible} of ${total}`}
 addDashboard();addJobFilters();refresh();
 document.addEventListener('click',e=>{if(e.target.closest('[data-page="home"],[data-go="home"]'))setTimeout(refresh,50)});
 window.addEventListener('storage',refresh);setInterval(refresh,3000);
})();
