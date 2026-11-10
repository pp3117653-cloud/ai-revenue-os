const REPO = 'pp3117653-cloud/ai-revenue-os';
const roles = [
 ['GA-01','Market and Offer Scout','Google-1 · research + offer'],['GA-02','Pipeline Scout','Google-2 · prospects'],['GA-03','Audience and Editorial Desk','Google-3 · research + writing'],['MN-01','Automation and Demo Builder','Manus-1 · automation + coded video'],['MN-02','Client Success Desk','Manus-2 · delivery'],['MN-03','Product Workshop','Manus-3 · products'],['MN-04','Distribution Analyst','Manus-4 · analytics'],['MM-01','Thumbnail and Visual QA','MiniMax-1 · visuals']
].map(([id,name,model])=>({id,name,model}));
const legacyRoleMap = {'B2B-01':'GA-01','B2B-02':'GA-01','B2B-03':'MN-01','B2B-04':'MN-01','B2B-05':'GA-02','B2B-06':'MN-02','CONTENT-01':'GA-03','CONTENT-02':'GA-03','CONTENT-03':'MN-01','CONTENT-04':'MM-01','CONTENT-05':'MN-03','CONTENT-06':'MN-04'};
const savedTasks = JSON.parse(localStorage.getItem('aiRevenueTasks') || '[]');
const tasks = savedTasks.map(task => ({...task, owner: legacyRoleMap[task.owner] || task.owner}));
if (JSON.stringify(tasks) !== JSON.stringify(savedTasks)) localStorage.setItem('aiRevenueTasks', JSON.stringify(tasks));
const demoTasks = [
 {id:'D1-GA-01',title:'Research candidate B2B ICPs and validate offer hypotheses',owner:'GA-01',status:'open',day:1,approval:false},
 {id:'D1-GA-03',title:'Research audience questions and draft a sourced content theme',owner:'GA-03',status:'review',day:1,approval:false},
 {id:'D10-GA-02',title:'Draft personalized outreach for CEO review',owner:'GA-02',status:'blocked',day:10,approval:true}
];
const allTasks = [...demoTasks, ...tasks];
const $ = s => document.querySelector(s);
function role(id){return roles.find(r=>r.id===id) || {id,name:id,model:'Unassigned'};}
function initials(name){return name.split(' ').map(x=>x[0]).join('').slice(0,2)}
function renderRoster(){
 $('#roleCount').textContent=roles.length;
 $('#roster').innerHTML=roles.map(r=>`<div class="role" data-role="${r.id}"><span class="avatar">${initials(r.name)}</span><div><strong>${r.name}</strong><small>${r.id} · ${r.model}</small></div></div>`).join('');
 document.querySelectorAll('.role').forEach(el=>el.addEventListener('click',()=>{document.querySelectorAll('.role').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderTasks(el.dataset.role)}));
 $('#taskOwner').innerHTML=roles.map(r=>`<option value="${r.id}">${r.id} — ${r.name}</option>`).join('');
}
function renderTasks(owner='all'){
 const filter=$('#statusFilter').value;
 const shown=allTasks.filter(t=>(owner==='all'||t.owner===owner)&&(filter==='all'||t.status===filter));
 $('#taskList').innerHTML=shown.length?shown.map(t=>{const r=role(t.owner);return `<article class="task"><div class="task-top"><span class="task-title">${t.title}</span><span class="tag ${t.status}">${t.status}</span></div><div class="task-meta"><span>${t.id}</span><span>Day ${t.day}</span><span>${r.name}</span>${t.approval?'<span>CEO approval</span>':''}</div><div class="task-actions"><a class="secondary mini" target="_blank" rel="noreferrer" href="https://github.com/${REPO}/issues">Open issue board</a></div></article>`}).join(''):'<p class="muted">No tasks match this view.</p>';
}
function renderMetrics(){
 $('#openMetric').textContent=allTasks.filter(t=>['open','review','blocked'].includes(t.status)).length;
 $('#approvalMetric').textContent=allTasks.filter(t=>t.approval&&t.status!=='accepted').length;
 $('#cashMetric').textContent='₹'+(localStorage.getItem('cashCollected')||'0');
 $('#pipelineMetric').textContent='₹'+(localStorage.getItem('pipelineValue')||'0');
}
function renderMilestones(){
 $('#milestones').innerHTML=[['D1–D10','Foundation','Choose ICP, offer, and operating rules.'],['D11–D30','First demand','Run demos, audits, and product pre-sale.'],['D31–D60','Cash + repeatability','Deliver, collect, and harden the system.']].map(x=>`<div class="milestone"><strong>${x[0]} · ${x[1]}</strong><small>${x[2]}</small></div>`).join('');
}
$('#statusFilter').addEventListener('change',()=>renderTasks());
$('#newTaskBtn').addEventListener('click',()=>$('#taskDialog').showModal());
$('#createIssueBtn').addEventListener('click',(e)=>{
 e.preventDefault();
 const owner=$('#taskOwner').value,title=$('#taskTitle').value.trim(),body=$('#taskBody').value.trim(),approval=$('#approvalRequired').checked;
 if(!title||!body)return;
 const r=role(owner);const issueBody=`## Assigned operator\n${r.id} — ${r.name}\n\n## Definition of done\n${body}\n\n## Controls\n- Account/model lane: ${r.model}\n- Approval required: ${approval?'YES — CEO review before external action':'No external side effect requested'}\n- Max retries: 2\n- Report evidence in the repository before marking accepted.`;
 const url=`https://github.com/${REPO}/issues/new?title=${encodeURIComponent(`[${owner}] ${title}`)}&body=${encodeURIComponent(issueBody)}&labels=${encodeURIComponent('task')}`;
 const saved={id:`MANUAL-${Date.now()}`,title,owner,status:'open',day:Number($('#dayNumber').textContent),approval};tasks.push(saved);localStorage.setItem('aiRevenueTasks',JSON.stringify(tasks));window.open(url,'_blank');$('#taskDialog').close();renderTasks();renderMetrics();
});
$('#repoLink').href=`https://github.com/${REPO}`;
renderRoster();renderTasks();renderMetrics();renderMilestones();
