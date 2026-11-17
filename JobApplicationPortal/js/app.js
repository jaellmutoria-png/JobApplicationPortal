(function(){
'use strict';

/* ---------- data ---------- */
var JOBS=[
{id:'j1',title:'Senior Backend Engineer',company:'Savanna Fintech',city:'Nairobi',area:'Westlands',type:'Full-time',level:'Senior',cat:'Technology',mode:'Hybrid',min:380000,max:520000,posted:2,closes:21,
 skills:['Python','PostgreSQL','APIs','Payments'],
 summary:'Build and run the payment services behind a merchant wallet used across East Africa. You will own reliability from design through on-call.',
 duties:['Design and ship services that process mobile money and card transactions','Review code and mentor two mid-level engineers','Improve latency and uptime on the settlement pipeline','Join a weekly on-call rotation with a recovery day after each shift'],
 needs:['6 or more years building backend systems in production','Strong SQL and experience with message queues','Clear written English for design documents','Experience with ledgers or payments is a plus'],
 perks:['Medical cover for you and four dependants','KES 120,000 yearly learning budget','Two remote days each week']},
{id:'j2',title:'Customer Support Associate',company:'Savanna Fintech',city:'Nairobi',area:'CBD',type:'Full-time',level:'Entry',cat:'Customer Service',mode:'On-site',min:55000,max:75000,posted:1,closes:12,
 skills:['Swahili','English','Empathy','Ticketing'],
 summary:'Help merchants and shoppers solve payment problems over chat and phone. You will be the first person customers hear from when something goes wrong.',
 duties:['Resolve customer tickets within the agreed response time','Escalate failed-payment cases to the operations team with full notes','Update the help centre when you spot a recurring question','Work one weekend shift in four'],
 needs:['Diploma or certificate in any field','Fluent Swahili and English, spoken and written','Calm manner with upset customers','No prior support experience needed, training is paid'],
 perks:['Two weeks of paid training','Medical cover','Transport allowance']},
{id:'j3',title:'Registered Nurse, Outpatient',company:'Lakeshore Health Partners',city:'Kisumu',area:'Milimani',type:'Full-time',level:'Mid',cat:'Healthcare',mode:'On-site',min:90000,max:130000,posted:5,closes:16,
 skills:['Triage','Patient care','Records','NCK licence'],
 summary:'Run the outpatient clinic floor with a small team of clinical officers and nurses, from triage to follow-up visits.',
 duties:['Triage walk-in patients and prepare them for consultation','Administer treatments and vaccinations under clinic protocols','Keep accurate patient records','Counsel patients on follow-up care'],
 needs:['Diploma or degree in nursing','Valid Nursing Council of Kenya licence','2 or more years in a clinic or hospital','Comfortable working a rotating weekday schedule'],
 perks:['Medical cover','Annual licence renewal paid','Housing allowance']},
{id:'j4',title:'Front Office Supervisor',company:'Baobab Coast Hotels',city:'Mombasa',area:'Nyali',type:'Full-time',level:'Mid',cat:'Hospitality',mode:'On-site',min:70000,max:95000,posted:3,closes:9,
 skills:['Guest relations','Reservations','Team lead','Shift planning'],
 summary:'Lead the reception, concierge and bell teams at a 120-room beachfront hotel through busy holiday seasons.',
 duties:['Plan daily shifts for a team of eight','Handle VIP arrivals and guest complaints','Reconcile the front desk ledger at close of shift','Train new receptionists on the booking system'],
 needs:['3 or more years in a hotel front office','Diploma in hospitality or similar','Confident with property management software','Willing to work weekends and public holidays'],
 perks:['Staff meals on duty','Service charge share','Free shuttle from town']},
{id:'j5',title:'Logistics Coordinator',company:'Rift Freight and Cold Chain',city:'Nakuru',area:'Industrial Area',type:'Full-time',level:'Mid',cat:'Logistics',mode:'On-site',min:85000,max:115000,posted:6,closes:24,
 skills:['Dispatch','Route planning','Excel','Cold chain'],
 summary:'Keep refrigerated trucks moving on time between Nakuru, Nairobi and the coast, and keep customers informed at every stop.',
 duties:['Assign drivers and vehicles to daily routes','Track temperatures and delivery windows','Resolve delays with customers before they escalate','Report weekly on-time delivery figures'],
 needs:['Diploma in supply chain or logistics','2 or more years in dispatch or fleet operations','Good Excel skills','Clear phone manner'],
 perks:['Medical cover','Performance bonus each quarter','Pension scheme']},
{id:'j6',title:'Data Analyst',company:'Kilimani Analytics',city:'Remote',area:'Kenya',type:'Contract',level:'Mid',cat:'Technology',mode:'Remote',min:200000,max:260000,posted:4,closes:14,
 skills:['SQL','Dashboards','Statistics','Python'],
 summary:'Six-month contract to build reporting for a retail client with 40 shops. You will turn till data into weekly decisions for store managers.',
 duties:['Clean and combine sales and stock data from several systems','Build a weekly dashboard for store managers','Run simple forecasts for fast-moving products','Present findings to the client every Friday'],
 needs:['3 or more years analysing business data','Strong SQL, working knowledge of Python or R','Experience with a dashboard tool','Reliable internet and availability during Nairobi working hours'],
 perks:['Fully remote','Possible extension after six months','Monthly invoicing, paid within 14 days']},
{id:'j7',title:'Accountant',company:'Highland Schools Trust',city:'Nyeri',area:'Town',type:'Full-time',level:'Mid',cat:'Finance',mode:'On-site',min:80000,max:110000,posted:8,closes:19,
 skills:['CPA','Fee collection','Payroll','Budgeting'],
 summary:'Manage the books for four schools: fee collection, payroll, supplier payments and termly budgets.',
 duties:['Reconcile fee payments and follow up balances with parents','Run monthly payroll for about 150 staff','Prepare termly budgets with each head teacher','Support the annual audit'],
 needs:['CPA (K) section 4 or higher','3 or more years of accounting experience','Experience with accounting software','Integrity and attention to detail'],
 perks:['Medical cover','School fee discount for dependants','Retirement benefits']},
{id:'j8',title:'Marketing Intern',company:'Kilimani Analytics',city:'Nairobi',area:'Kilimani',type:'Internship',level:'Entry',cat:'Marketing',mode:'On-site',min:25000,max:25000,posted:1,closes:28,
 skills:['Social media','Writing','Canva','Research'],
 summary:'A three-month internship supporting the marketing lead with content, newsletters and event follow-up.',
 duties:['Draft social posts and a monthly newsletter','Research competitors and summarise findings','Help organise two client events','Track campaign results in a shared sheet'],
 needs:['Recent graduate or final-year student in marketing, communications or similar','Strong writing in English','Comfortable learning new tools quickly','Available 5 days a week for three months'],
 perks:['Monthly stipend and lunch allowance','Mentor from the marketing team','Reference letter on completion']},
{id:'j9',title:'Mathematics and Physics Teacher',company:'Highland Schools Trust',city:'Eldoret',area:'Town',type:'Full-time',level:'Mid',cat:'Education',mode:'On-site',min:60000,max:85000,posted:9,closes:30,
 skills:['KCSE','Lesson planning','Mentoring','TSC'],
 summary:'Teach Forms 1 to 4 at a day and boarding secondary school with strong KCSE results and a growing science club.',
 duties:['Teach 24 lessons a week across Forms 1 to 4','Prepare students for KCSE examinations','Run the science club once a week','Mark and report progress each term'],
 needs:['Bachelor of Education in Mathematics and Physics','TSC registration','2 or more years of classroom experience','Willingness to join boarding duty in rotation'],
 perks:['On-campus housing option','Medical cover','Paid professional development days']},
{id:'j10',title:'Warehouse Associate',company:'Rift Freight and Cold Chain',city:'Nakuru',area:'Industrial Area',type:'Part-time',level:'Entry',cat:'Logistics',mode:'On-site',min:30000,max:40000,posted:2,closes:10,
 skills:['Loading','Stock counts','Forklift','Safety'],
 summary:'Part-time shifts loading and unloading trucks and counting stock in a temperature-controlled warehouse.',
 duties:['Load and unload pallets safely','Scan stock in and out of the system','Help with weekly stock counts','Follow cold room safety rules'],
 needs:['KCSE certificate','Able to lift 20 kg repeatedly','Forklift licence is a plus','Available for four shifts a week including one weekend day'],
 perks:['Thermal work gear provided','Overtime paid at 1.5 times','Path to full-time roles']},
{id:'j11',title:'Product Designer',company:'Savanna Fintech',city:'Remote',area:'Kenya',type:'Full-time',level:'Mid',cat:'Technology',mode:'Remote',min:220000,max:300000,posted:7,closes:20,
 skills:['Figma','Research','Mobile UI','Prototyping'],
 summary:'Design the merchant app used by small shop owners on low-cost Android phones, from research to shipped screens.',
 duties:['Interview shop owners and turn findings into designs','Design and prototype mobile flows in Figma','Work with engineers through build and release','Maintain the shared component library'],
 needs:['3 or more years designing mobile products','A portfolio with shipped work','Experience designing for low-end devices','Clear written and spoken English'],
 perks:['Remote with two team meetups a year','Equipment allowance','Medical cover']},
{id:'j12',title:'Head Chef',company:'Baobab Coast Hotels',city:'Diani',area:'Beach Road',type:'Full-time',level:'Senior',cat:'Hospitality',mode:'On-site',min:150000,max:210000,posted:11,closes:17,
 skills:['Menu design','Seafood','Kitchen management','Food safety'],
 summary:'Lead a kitchen of 14 serving three restaurants and banquets, with a menu built around fresh coastal produce.',
 duties:['Design seasonal menus and control food cost','Manage rosters, ordering and supplier relationships','Keep the kitchen to HACCP standards','Train and develop sous chefs'],
 needs:['8 or more years in professional kitchens, 3 as head or sous chef','Strong seafood and Swahili coast cooking','Proven food cost control','Culinary diploma preferred'],
 perks:['Live-in accommodation option','Service charge share','Staff meals']},
{id:'j13',title:'Security Operations Analyst',company:'Savanna Fintech',city:'Nairobi',area:'Westlands',type:'Full-time',level:'Mid',cat:'Technology',mode:'Hybrid',min:250000,max:340000,posted:3,closes:23,
 skills:['SIEM','Incident response','Log analysis','Networking'],
 summary:'Watch, triage and investigate security alerts across a payments platform, and help the team get faster at containing incidents.',
 duties:['Monitor alerts in the SIEM and triage by severity','Investigate suspicious activity and write incident reports','Tune detection rules to cut false alarms','Run quarterly phishing exercises'],
 needs:['2 or more years in a security operations or IT security role','Working knowledge of networking and common attack techniques','Experience reading logs','A security certification is a plus'],
 perks:['Certification exam fees paid','Medical cover','Rotating shift allowance']}
];

var STAGES=[
 {k:'submitted',label:'Submitted'},
 {k:'review',label:'In review'},
 {k:'interview',label:'Interview'},
 {k:'offer',label:'Offer'}
];
var STATUS_LABEL={submitted:'Submitted',review:'In review',interview:'Interview',offer:'Offer',rejected:'Not selected'};

/* ---------- helpers ---------- */
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n,l){n=String(n);while(n.length<l)n='0'+n;return n}
function initials(name){var p=name.split(/\s+/).filter(function(w){return /^[A-Za-z]/.test(w)});return (p[0]?p[0][0]:'')+(p[1]?p[1][0]:'')}
function kfmt(n){return n>=1000?(Math.round(n/100)/10).toString().replace(/\.0$/,'')+'k':String(n)}
function pay(j){return j.min===j.max?'KES '+kfmt(j.min)+' / month':'KES '+kfmt(j.min)+' to '+kfmt(j.max)+' / month'}
function place(j){return j.mode==='Remote'?'Remote, Kenya':j.area+', '+j.city}
function postedLabel(n){return n===0?'Posted today':n===1?'Posted yesterday':'Posted '+n+' days ago'}
function closesLabel(n){return n<=0?'Closes today':n===1?'Closes tomorrow':'Closes in '+n+' days'}
function fmtDate(iso){try{return new Date(iso).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}catch(e){return ''}}
function byId(id){for(var i=0;i<JOBS.length;i++)if(JOBS[i].id===id)return JOBS[i];return null}
function isNarrow(){return window.matchMedia('(max-width:1023px)').matches}
function keys(o){return Object.keys(o).filter(function(k){return o[k]})}

var I=function(p,fill){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="'+(fill||'none')+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'};
var ICON={
 mark:function(on){return I('<path d="M6 3h12v18l-6-4-6 4z"/>',on?'currentColor':'none')},
 back:I('<path d="M15 18l-6-6 6-6"/>')
};

/* ---------- storage ---------- */
var store={
 get:function(k,def){try{var v=localStorage.getItem('jap.'+k);return v==null?def:JSON.parse(v)}catch(e){return def}},
 set:function(k,v){try{localStorage.setItem('jap.'+k,JSON.stringify(v))}catch(e){}}
};
function daysAgoISO(n){return new Date(Date.now()-n*86400000).toISOString()}
var apps=store.get('apps',null);
if(!apps){
  apps=[
   {ref:'APP-2026-0001',jobId:'j7',title:'Accountant',company:'Highland Schools Trust',place:'Town, Nyeri',name:'Example Applicant',email:'example@example.com',phone:'0712 000 000',city:'Nyeri',role:'Assistant accountant',years:'3 to 5 years',salary:95000,notice:'1 month',cv:{name:'example-cv.pdf',size:182000},cover:'This is an example application so you can see how the tracker works. Remove it any time.',link:'',status:'interview',appliedAt:daysAgoISO(12),updatedAt:daysAgoISO(3),example:true},
   {ref:'APP-2026-0002',jobId:'j8',title:'Marketing Intern',company:'Kilimani Analytics',place:'Kilimani, Nairobi',name:'Example Applicant',email:'example@example.com',phone:'0712 000 000',city:'Nairobi',role:'Student',years:'Less than 1 year',salary:'',notice:'Available immediately',cv:{name:'example-cv.pdf',size:182000},cover:'',link:'',status:'review',appliedAt:daysAgoISO(5),updatedAt:daysAgoISO(5),example:true}
  ];
  store.set('apps',apps);
}
var saved=store.get('saved',[]);
var profile=store.get('profile',{});
var seq=store.get('seq',2);

function appFor(id){for(var i=0;i<apps.length;i++)if(apps[i].jobId===id)return apps[i];return null}
function isSaved(id){return saved.indexOf(id)>-1}

/* ---------- state ---------- */
var f={q:'',loc:'',cats:{},types:{},levels:{},modes:{},sort:'new'};
var selected=null, lastFocus=null, apFilter='all', confirmRef=null;
var step=1, draftFile=null, applyJob=null, submitted=false;

/* ---------- filtering ---------- */
function matches(j){
  var q=f.q.trim().toLowerCase();
  if(q){
    var hay=[j.title,j.company,j.cat,j.city,j.area,j.type].concat(j.skills).join(' ').toLowerCase();
    var toks=q.split(/\s+/);
    for(var i=0;i<toks.length;i++)if(hay.indexOf(toks[i])<0)return false;
  }
  if(f.loc&&j.city!==f.loc)return false;
  var c=keys(f.cats);if(c.length&&c.indexOf(j.cat)<0)return false;
  var t=keys(f.types);if(t.length&&t.indexOf(j.type)<0)return false;
  var l=keys(f.levels);if(l.length&&l.indexOf(j.level)<0)return false;
  var m=keys(f.modes);if(m.length&&m.indexOf(j.mode)<0)return false;
  return true;
}
function sorter(a,b){
  if(f.sort==='close')return a.closes-b.closes;
  if(f.sort==='pay')return b.max-a.max||b.min-a.min;
  return a.posted-b.posted;
}

/* ---------- job cards ---------- */
function cardHTML(j,showSelected){
  var app=appFor(j.id), on=isSaved(j.id);
  return '<li class="job-card" data-selected="'+(showSelected&&selected===j.id)+'">'+
   '<div class="card-top"><div class="mono" aria-hidden="true">'+esc(initials(j.company))+'</div>'+
   '<div class="card-title"><h3 style="font-size:inherit"><button class="job-link" type="button" data-action="open-job" data-id="'+j.id+'">'+esc(j.title)+'</button></h3>'+
   '<p class="co">'+esc(j.company)+'</p></div>'+
   '<button class="save-btn" type="button" data-action="toggle-save" data-id="'+j.id+'" aria-pressed="'+on+'" aria-label="'+(on?'Remove '+esc(j.title)+' from saved':'Save '+esc(j.title))+'">'+ICON.mark(on)+'</button></div>'+
   '<div class="tags"><span class="tag">'+esc(place(j))+'</span><span class="tag">'+esc(j.type)+'</span><span class="tag">'+esc(j.mode)+'</span></div>'+
   '<div class="card-foot"><span class="pay">'+esc(pay(j))+'</span>'+
   (app?'<span class="badge st-'+app.status+'">Applied: '+STATUS_LABEL[app.status]+'</span>':'<span>'+esc(closesLabel(j.closes))+'</span>')+'</div>'+
   '</li>';
}

function renderJobs(){
  var list=JOBS.filter(matches).sort(sorter);
  $('resultCount').textContent=list.length+(list.length===1?' open role':' open roles');
  $('jobList').innerHTML=list.map(function(j){return cardHTML(j,true)}).join('');
  $('emptyJobs').hidden=list.length>0;
  var ids=list.map(function(j){return j.id});
  if(selected&&ids.indexOf(selected)<0){selected=null;closeSheet()}
  if(!selected&&list.length&&!isNarrow())selected=list[0].id;
  renderDetail();
  var n=keys(f.cats).length+keys(f.types).length+keys(f.levels).length+keys(f.modes).length;
  $('filterCount').textContent=n?'('+n+')':'';
  var chips=document.querySelectorAll('#catChips .chip');
  for(var i=0;i<chips.length;i++)chips[i].setAttribute('aria-pressed',String(!!f.cats[chips[i].dataset.cat]));
}

function renderDetail(){
  var el=$('detail'), j=selected?byId(selected):null;
  if(!j){
    el.innerHTML='<button class="back-btn" type="button" data-action="close-detail">'+ICON.back+'<span>All jobs</span></button><div class="empty" style="border:0"><h3>Select a role</h3><p>Pick a job from the list to read the full description and apply.</p></div>';
    return;
  }
  var app=appFor(j.id), on=isSaved(j.id);
  function ul(a){return '<ul class="bul">'+a.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'}
  el.innerHTML=
   '<button class="back-btn" type="button" data-action="close-detail">'+ICON.back+'<span>All jobs</span></button>'+
   '<div class="detail-head"><div class="mono" aria-hidden="true">'+esc(initials(j.company))+'</div><div style="min-width:0"><h2>'+esc(j.title)+'</h2><p class="co">'+esc(j.company)+' &middot; '+esc(place(j))+'</p></div></div>'+
   '<dl class="facts">'+
    '<div><dt>Pay</dt><dd>'+esc(pay(j))+'</dd></div>'+
    '<div><dt>Type</dt><dd>'+esc(j.type)+'</dd></div>'+
    '<div><dt>Level</dt><dd>'+esc(j.level)+'</dd></div>'+
    '<div><dt>Work mode</dt><dd>'+esc(j.mode)+'</dd></div>'+
    '<div><dt>Deadline</dt><dd>'+esc(closesLabel(j.closes))+'</dd></div>'+
    '<div><dt>Posted</dt><dd>'+esc(postedLabel(j.posted).replace('Posted ',''))+'</dd></div>'+
   '</dl>'+
   '<div class="actions">'+
    (app?'<a class="btn ghost" href="#applications">Applied: '+STATUS_LABEL[app.status]+'. View status</a>':'<button class="btn primary" type="button" data-action="apply" data-id="'+j.id+'">Apply now</button>')+
    '<button class="btn ghost" type="button" data-action="toggle-save" data-id="'+j.id+'" aria-pressed="'+on+'">'+ICON.mark(on)+'<span>'+(on?'Saved':'Save for later')+'</span></button>'+
   '</div>'+
   '<h3>About the role</h3><p class="body">'+esc(j.summary)+'</p>'+
   '<h3>What you will do</h3>'+ul(j.duties)+
   '<h3>What we look for</h3>'+ul(j.needs)+
   '<h3>What you get</h3>'+ul(j.perks)+
   '<h3>Skills</h3><div class="tags">'+j.skills.map(function(s){return '<span class="tag">'+esc(s)+'</span>'}).join('')+'</div>'+
   '<h3>How hiring works</h3><ol class="process">'+
    '<li><div><b>Application review</b><span>The hiring team reads every CV after the deadline.</span></div></li>'+
    '<li><div><b>Phone screen</b><span>A short call about your experience and availability.</span></div></li>'+
    '<li><div><b>Interview</b><span>Meet the team, in person or on video.</span></div></li>'+
    '<li><div><b>Offer</b><span>You receive a written offer and a start date.</span></div></li>'+
   '</ol>';
}

function renderSaved(){
  var list=JOBS.filter(function(j){return isSaved(j.id)});
  $('savedList').innerHTML=list.map(function(j){return cardHTML(j,false)}).join('');
  $('emptySaved').hidden=list.length>0;
  $('savedList').hidden=list.length===0;
}

/* ---------- applications ---------- */
function stageIndex(s){for(var i=0;i<STAGES.length;i++)if(STAGES[i].k===s)return i;return -1}
function appHTML(a){
  var idx=stageIndex(a.status);
  var pipe=a.status==='rejected'
    ?'<p><span class="badge st-rejected">Not selected</span></p>'
    :'<ol class="pipeline" aria-label="Progress">'+STAGES.map(function(s,i){
        var st=i<idx?'done':i===idx?'current':'todo';
        return '<li data-state="'+st+'"'+(st==='current'?' aria-current="step"':'')+'>'+s.label+'</li>';
      }).join('')+'</ol>';
  var opts=Object.keys(STATUS_LABEL).map(function(k){return '<option value="'+k+'"'+(k===a.status?' selected':'')+'>'+STATUS_LABEL[k]+'</option>'}).join('');
  var removing=confirmRef===a.ref;
  return '<article class="app-card">'+
   '<div class="app-top"><div style="min-width:0"><h3>'+esc(a.title)+'</h3><p class="co">'+esc(a.company)+' &middot; '+esc(a.place)+'</p></div>'+
   '<div class="tags">'+(a.example?'<span class="badge st-example">Example</span>':'')+'<span class="badge st-'+a.status+'">'+STATUS_LABEL[a.status]+'</span></div></div>'+
   '<p class="refline">Reference '+esc(a.ref)+' &middot; Applied '+esc(fmtDate(a.appliedAt))+' &middot; Updated '+esc(fmtDate(a.updatedAt))+'</p>'+
   pipe+
   '<div class="app-actions">'+
    '<label>Status <select data-action="set-status" data-ref="'+esc(a.ref)+'" aria-label="Status for '+esc(a.title)+'">'+opts+'</select></label>'+
    (byId(a.jobId)?'<button class="btn ghost sm" type="button" data-action="view-job" data-id="'+a.jobId+'">View job</button>':'')+
    (removing
      ?'<button class="btn ghost sm danger" type="button" data-action="remove-confirm" data-ref="'+esc(a.ref)+'">Confirm remove</button><button class="btn ghost sm" type="button" data-action="remove-cancel">Keep</button>'
      :'<button class="btn ghost sm" type="button" data-action="remove-ask" data-ref="'+esc(a.ref)+'">Remove</button>')+
   '</div>'+
   '<details class="more"><summary>Application details</summary><dl>'+
    '<div><dt>Applicant</dt><dd>'+esc(a.name)+'</dd></div>'+
    '<div><dt>Contact</dt><dd>'+esc(a.email)+'<br>'+esc(a.phone)+'</dd></div>'+
    '<div><dt>Current role</dt><dd>'+esc(a.role)+' ('+esc(a.years)+')</dd></div>'+
    '<div><dt>Expected pay</dt><dd>'+(a.salary?'KES '+Number(a.salary).toLocaleString('en-US')+' / month':'Not given')+'</dd></div>'+
    '<div><dt>Notice period</dt><dd>'+esc(a.notice)+'</dd></div>'+
    '<div><dt>CV</dt><dd>'+esc(a.cv?a.cv.name:'')+(a.cv?' ('+Math.max(1,Math.round(a.cv.size/1024))+' KB)':'')+'</dd></div>'+
    (a.link?'<div><dt>Link</dt><dd><a href="'+esc(a.link)+'" target="_blank" rel="noopener noreferrer">'+esc(a.link)+'</a></dd></div>':'')+
    (a.cover?'<div class="cover"><dt>Cover letter</dt><dd>'+esc(a.cover)+'</dd></div>':'')+
   '</dl></details>'+
  '</article>';
}
function renderApps(){
  var bar=[{k:'all',label:'All'}].concat(STAGES).concat([{k:'rejected',label:'Not selected'}]);
  $('stageBar').innerHTML=bar.map(function(s){
    var n=s.k==='all'?apps.length:apps.filter(function(a){return a.status===s.k}).length;
    return '<button class="sbtn" type="button" data-action="stage-filter" data-stage="'+s.k+'" aria-pressed="'+(apFilter===s.k)+'">'+s.label+' <span class="count">'+n+'</span></button>';
  }).join('');
  $('stageBar').hidden=apps.length===0;
  var list=apps.filter(function(a){return apFilter==='all'||a.status===apFilter}).sort(function(a,b){return b.appliedAt<a.appliedAt?-1:1});
  $('appList').innerHTML=list.map(appHTML).join('');
  $('emptyApps').hidden=apps.length>0;
  if(apps.length&&!list.length)$('appList').innerHTML='<div class="empty"><h3>Nothing at this stage</h3><p>None of your applications are marked '+esc(apFilter==='rejected'?'Not selected':STATUS_LABEL[apFilter])+' right now.</p></div>';
}
function counts(){
  $('savedCount').textContent=saved.length;
  $('appCount').textContent=apps.length;
}

/* ---------- routing ---------- */
function route(){
  var h=(location.hash||'').replace('#','');
  if(['jobs','saved','applications'].indexOf(h)<0)h='jobs';
  ['jobs','saved','applications'].forEach(function(v){
    $('view-'+v).hidden=v!==h;
    var t=$('tab-'+v);
    if(v===h)t.setAttribute('aria-current','page');else t.removeAttribute('aria-current');
  });
  $('hero').hidden=h!=='jobs';
  if(h!=='jobs')closeSheet();
  if(h==='saved')renderSaved();
  if(h==='applications')renderApps();
  counts();
}

/* ---------- detail sheet (phones) ---------- */
function openSheet(){
  var d=$('detail');d.dataset.open='true';d.scrollTop=0;
  document.body.style.overflow='hidden';
  var b=d.querySelector('.back-btn');if(b&&isNarrow())b.focus();
}
function closeSheet(){
  var d=$('detail');if(d.dataset.open==='true'){d.dataset.open='false';document.body.style.overflow=''}
}
function openJob(id){
  selected=id;
  if(location.hash!=='#jobs'&&location.hash!==''){location.hash='jobs'}
  route();renderJobs();
  $('detail').scrollTop=0;
  if(isNarrow())openSheet();
}

/* ---------- toast ---------- */
var toastT;
function toast(msg){
  var t=$('toast');t.textContent=msg;t.hidden=false;
  clearTimeout(toastT);toastT=setTimeout(function(){t.hidden=true},2600);
}

/* ---------- apply flow ---------- */
function setErr(id,msg){
  var e=$('e'+id),inp=$('f'+id);
  if(e){e.textContent=msg||'';e.hidden=!msg}
  if(inp)inp.setAttribute('aria-invalid',msg?'true':'false');
}
function validate(n){
  var ok=true,first=null;
  function bad(id,msg){setErr(id,msg);if(!first)first=$('f'+id);ok=false}
  if(n===1){
    var name=$('fName').value.trim();
    if(name.length<2)bad('Name','Enter your full name.');else setErr('Name','');
    var email=$('fEmail').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))bad('Email','Enter a valid email, like name@example.com.');else setErr('Email','');
    var ph=$('fPhone').value.replace(/[\s\-()]/g,'');
    if(!/^(?:\+?254|0)?[17]\d{8}$/.test(ph))bad('Phone','Enter a Kenyan mobile number, like 0712 345 678.');else setErr('Phone','');
    if($('fCity').value.trim().length<2)bad('City','Enter your town or city.');else setErr('City','');
  }
  if(n===2){
    if($('fRole').value.trim().length<2)bad('Role','Enter your current job title, or Student.');else setErr('Role','');
    if(!$('fYears').value)bad('Years','Choose your years of experience.');else setErr('Years','');
    var s=$('fSalary').value;
    if(s!==''&&(isNaN(Number(s))||Number(s)<0))bad('Salary','Enter a positive amount in KES.');else setErr('Salary','');
    if(!draftFile)bad('CV','Attach your CV as a PDF or Word file.');
    else if(draftFile.size>5*1024*1024)bad('CV','This file is over 5 MB. Choose a smaller file.');
    else if(!/\.(pdf|docx?|PDF|DOCX?)$/.test(draftFile.name))bad('CV','Use a PDF or Word file.');
    else setErr('CV','');
    var l=$('fLink').value.trim();
    if(l&&!/^https?:\/\/\S+\.\S+/.test(l))bad('Link','Enter a full link that starts with https://');else setErr('Link','');
  }
  if(n===3){
    if(!$('fConsent').checked){setErr('Consent','Tick the box to confirm before submitting.');first=$('fConsent');ok=false}else setErr('Consent','');
  }
  if(first)first.focus();
  return ok;
}
function showStep(n){
  step=n;
  var secs=document.querySelectorAll('#applyForm [data-step]');
  for(var i=0;i<secs.length;i++)secs[i].hidden=Number(secs[i].dataset.step)!==n;
  $('applyDone').hidden=true;
  var lis=$('steps').children;
  for(var k=0;k<lis.length;k++){
    lis[k].removeAttribute('aria-current');lis[k].removeAttribute('data-state');
    if(k+1<n)lis[k].dataset.state='done';
    if(k+1===n)lis[k].setAttribute('aria-current','step');
  }
  $('btnBack').textContent=n===1?'Cancel':'Back';
  $('btnNext').textContent=n===3?'Submit application':'Continue';
  if(n===3)buildReview();
  var firstInput=document.querySelector('#applyForm [data-step="'+n+'"] input, #applyForm [data-step="'+n+'"] select');
  if(firstInput)firstInput.focus();
  $('applyForm').scrollTop=0;
}
function buildReview(){
  var v=function(id){return $(id).value.trim()};
  var rows=[
   ['Applying for',applyJob.title+', '+applyJob.company],
   ['Name',v('fName')],['Email',v('fEmail')],['Phone',v('fPhone')],['Town or city',v('fCity')],
   ['Current role',v('fRole')+' ('+$('fYears').value+')'],
   ['Expected pay',v('fSalary')?'KES '+Number(v('fSalary')).toLocaleString('en-US')+' / month':'Not given'],
   ['Notice period',$('fNotice').value],
   ['CV',draftFile?draftFile.name:''],
   ['Cover letter',v('fCover')?v('fCover').slice(0,140)+(v('fCover').length>140?'...':''):'None'],
   ['Link',v('fLink')||'None']
  ];
  $('review').innerHTML=rows.map(function(r){return '<div><dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd></div>'}).join('');
}
function openApply(id){
  var j=byId(id);if(!j||appFor(id))return;
  applyJob=j;lastFocus=document.activeElement;submitted=false;draftFile=null;
  $('applyForm').reset();
  ['Name','Email','Phone','City','Role','Years','Salary','CV','Link','Consent'].forEach(function(k){setErr(k,'')});
  $('fName').value=profile.name||'';$('fEmail').value=profile.email||'';$('fPhone').value=profile.phone||'';$('fCity').value=profile.city||'';
  $('coverCount').textContent='0 / 1200';
  $('applyCompany').textContent=j.company+' · '+place(j);
  $('applyTitle').textContent='Apply for '+j.title;
  $('applyFoot').hidden=false;
  $('applyModal').hidden=false;
  document.body.style.overflow='hidden';
  showStep(1);
}
function closeApply(){
  $('applyModal').hidden=true;
  document.body.style.overflow=(isNarrow()&&$('detail').dataset.open==='true')?'hidden':'';
  if(lastFocus&&document.contains(lastFocus))lastFocus.focus();
}
function nextStep(){
  if(submitted)return;
  if(!validate(step))return;
  if(step<3){showStep(step+1);return}
  submit();
}
function submit(){
  var v=function(id){return $(id).value.trim()};
  seq+=1;store.set('seq',seq);
  var rec={
   ref:'APP-'+new Date().getFullYear()+'-'+pad(seq,4),jobId:applyJob.id,title:applyJob.title,company:applyJob.company,place:place(applyJob),
   name:v('fName'),email:v('fEmail'),phone:v('fPhone'),city:v('fCity'),role:v('fRole'),years:$('fYears').value,
   salary:v('fSalary'),notice:$('fNotice').value,cv:{name:draftFile.name,size:draftFile.size},cover:v('fCover'),link:v('fLink'),
   status:'submitted',appliedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),example:false
  };
  apps.unshift(rec);store.set('apps',apps);
  profile={name:rec.name,email:rec.email,phone:rec.phone,city:rec.city};store.set('profile',profile);
  submitted=true;
  var secs=document.querySelectorAll('#applyForm [data-step]');
  for(var i=0;i<secs.length;i++)secs[i].hidden=true;
  $('steps').querySelectorAll('li').forEach(function(li){li.dataset.state='done';li.removeAttribute('aria-current')});
  $('doneRef').textContent=rec.ref;
  $('doneText').textContent='Your application for '+rec.title+' at '+rec.company+' is saved on this device. Keep the reference number and update its status as you hear back.';
  $('applyDone').hidden=false;$('applyFoot').hidden=true;
  counts();renderJobs();if(!$('view-applications').hidden)renderApps();
  var b=$('applyDone').querySelector('button');if(b)b.focus();
}

/* ---------- events ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-action]');if(!t||t.tagName==='SELECT')return;
  var a=t.dataset.action,id=t.dataset.id;
  if(a==='open-job')openJob(id);
  else if(a==='close-detail')closeSheet();
  else if(a==='toggle-save'){
    var i=saved.indexOf(id);
    if(i>-1){saved.splice(i,1);toast('Removed from saved')}else{saved.push(id);toast('Saved for later')}
    store.set('saved',saved);counts();renderJobs();if(!$('view-saved').hidden)renderSaved();
  }
  else if(a==='apply')openApply(id);
  else if(a==='clear-filters'){
    f.q='';f.loc='';f.cats={};f.types={};f.levels={};f.modes={};
    $('q').value='';$('loc').value='';
    document.querySelectorAll('#filters input[type=checkbox]').forEach(function(c){c.checked=false});
    renderJobs();
  }
  else if(a==='chip-cat'){f.cats[t.dataset.cat]=!f.cats[t.dataset.cat];renderJobs()}
  else if(a==='stage-filter'){apFilter=t.dataset.stage;renderApps()}
  else if(a==='remove-ask'){confirmRef=t.dataset.ref;renderApps()}
  else if(a==='remove-cancel'){confirmRef=null;renderApps()}
  else if(a==='remove-confirm'){
    apps=apps.filter(function(x){return x.ref!==t.dataset.ref});confirmRef=null;
    store.set('apps',apps);counts();renderApps();renderJobs();toast('Application removed');
  }
  else if(a==='view-job')openJob(id);
  else if(a==='modal-close')closeApply();
  else if(a==='step-back'){if(step===1)closeApply();else showStep(step-1)}
  else if(a==='step-next')nextStep();
  else if(a==='go-apps'){closeApply();location.hash='applications'}
});
document.addEventListener('change',function(e){
  var t=e.target;
  if(t.dataset&&t.dataset.action==='set-status'){
    for(var i=0;i<apps.length;i++)if(apps[i].ref===t.dataset.ref){apps[i].status=t.value;apps[i].updatedAt=new Date().toISOString()}
    store.set('apps',apps);renderApps();renderJobs();toast('Status updated');return;
  }
  if(t.dataset&&t.dataset.group){f[t.dataset.group][t.value]=t.checked;renderJobs();return}
  if(t.id==='loc'){f.loc=t.value;renderJobs()}
  if(t.id==='sort'){f.sort=t.value;renderJobs()}
  if(t.id==='fCV'){draftFile=t.files&&t.files[0]?t.files[0]:null;setErr('CV','')}
});
$('q').addEventListener('input',function(e){f.q=e.target.value;renderJobs()});
$('searchForm').addEventListener('submit',function(e){e.preventDefault();var l=$('jobList');l.scrollIntoView({behavior:'smooth',block:'start'})});
$('applyForm').addEventListener('submit',function(e){e.preventDefault();nextStep()});
$('fCover').addEventListener('input',function(e){$('coverCount').textContent=e.target.value.length+' / 1200'});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  if(!$('applyModal').hidden)closeApply();
  else if($('detail').dataset.open==='true')closeSheet();
});
window.addEventListener('hashchange',route);

/* filters panel: open on desktop, collapsible on phones */
var mq=window.matchMedia('(min-width:1024px)');
function syncFilters(){var d=$('filters');if(mq.matches)d.open=true;else if(!d.dataset.touched)d.open=false}
$('filters').addEventListener('toggle',function(){if(!mq.matches)$('filters').dataset.touched='1'});
if(mq.addEventListener)mq.addEventListener('change',function(){syncFilters();renderJobs()});

/* ---------- init ---------- */
(function init(){
  var cities=[];JOBS.forEach(function(j){if(cities.indexOf(j.city)<0)cities.push(j.city)});
  cities.sort();
  $('loc').innerHTML='<option value="">All locations</option>'+cities.map(function(c){return '<option value="'+esc(c)+'">'+esc(c)+'</option>'}).join('');
  var cats=[];JOBS.forEach(function(j){if(cats.indexOf(j.cat)<0)cats.push(j.cat)});
  $('catChips').innerHTML=cats.map(function(c){return '<button class="chip" type="button" data-action="chip-cat" data-cat="'+esc(c)+'" aria-pressed="false">'+esc(c)+'</button>'}).join('');
  $('heroLede').textContent=JOBS.length+' open roles across '+(cities.length-1)+' towns and remote. Save the ones you like and track every application from one place.';
  syncFilters();
  route();
  renderJobs();
})();
})();
