// JobMaster AI 2.0 — Gemini API integration. API key is intentionally memory-only.
(()=>{
 const $=id=>document.getElementById(id);
 const form=$('aiForm'); if(!form)return;
 let busy=false;
 const taskPrompts={
  cv:'Review and rewrite the CV content for clarity, impact, ATS readability and truthful achievement statements. Do not invent employers, qualifications, dates, metrics or skills. Identify missing information separately.',
  match:'Compare the CV with the job description. Give a transparent match assessment, matching evidence, missing or weak keywords, gaps, and specific truthful edits. Do not claim to know an employer ATS score.',
  letter:'Write a tailored, professional cover letter using only the facts supplied. Do not fabricate experience, company facts or achievements. Use a suitable local business tone.',
  interview:'Act as an experienced recruiter for the target role. Generate likely interview questions, strong answer structures grounded in the supplied experience, technical topics to revise, and questions the candidate can ask.',
  career:'Create a practical 90-day career development plan with skills, learning activities, portfolio evidence, milestones and measurable outcomes. Prioritize realistic actions.'
 };
 function status(msg,kind=''){const el=$('aiStatus');el.textContent=msg;el.className='ai-status '+kind;}
 form.addEventListener('submit',async e=>{
  e.preventDefault(); if(busy)return;
  const key=$('aiApiKey').value.trim(),task=$('aiTask').value,lang=$('aiLanguage').value,cv=$('aiCv').value.trim(),job=$('aiJob').value.trim(),extra=$('aiExtra').value.trim();
  if(!key){status('Enter your Gemini API key first.','error');return;}
  if(!cv&&!job&&!extra){status('Add your CV, experience, job description or instructions first.','error');return;}
  const prompt=`You are JobMaster AI, a careful multilingual career coach. Respond entirely in ${lang}. Be specific, practical and well structured. Never invent candidate facts, qualifications, employment history, achievements, metrics or job requirements. Clearly label assumptions and missing information.\n\nTASK: ${taskPrompts[task]}\n\nCANDIDATE CV / EXPERIENCE:\n${cv||'[Not provided]'}\n\nTARGET JOB / ROLE:\n${job||'[Not provided]'}\n\nADDITIONAL INSTRUCTIONS:\n${extra||'[None]'}\n\nProvide an actionable result with headings and bullet points. Preserve technical terminology where appropriate.`;
  busy=true;$('aiSubmit').disabled=true;$('aiSubmit').textContent='Generating…';status('Connecting to Gemini. Please wait…','loading');$('aiResult').value='';
  try{
   const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='+encodeURIComponent(key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.35,maxOutputTokens:4096}})});
   const data=await response.json();
   if(!response.ok){const message=data?.error?.message||('HTTP '+response.status);throw new Error(message)}
   const result=(data.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('\n').trim();
   if(!result)throw new Error('The model returned no text. Try a shorter input or another request.');
   $('aiResult').value=result;status('AI response generated successfully. Review all suggestions before using them in an application.');
  }catch(err){status('AI request failed: '+(err.message||'Unknown error')+'. Check your API key, internet connection, model availability and Google AI Studio quota.','error')}
  finally{busy=false;$('aiSubmit').disabled=false;$('aiSubmit').textContent='✦ Generate with Gemini'}
 });
 $('aiCopy').addEventListener('click',async()=>{const v=$('aiResult').value;if(!v){status('Nothing to copy.');return}try{await navigator.clipboard.writeText(v);status('Copied to clipboard.')}catch{$('aiResult').select();document.execCommand('copy');status('Copied to clipboard.')}});
 $('aiClear').addEventListener('click',()=>{$('aiResult').value='';status('Output cleared.')});
})();
