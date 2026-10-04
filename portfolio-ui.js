(() => {
const $=s=>document.querySelector(s), P=window.PORTFOLIO, papers=window.PUBLICATIONS;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const en=()=>document.documentElement.lang==='en';
const bi=(zh,english)=>en()?english:zh, txt=v=>typeof v==='object'?v?.[en()?'en':'zh']:v;
const url=file=>file+(en()?'?lang=en':'');
const paper=id=>papers.find(p=>p.id===id);
const verified=()=>window.PORTFOLIO_VERIFIED||{papers:[],news:[]};
const detail=id=>verified().papers.find(p=>p.id===id);
const link=(href,label)=>`<a href="${esc(href)}">${esc(label)}</a>`;
const external=(href,label)=>`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
const paperLink=id=>link(url(detail(id)?`paper-${id}.html`:'publications.html')+(detail(id)?'':`#paper-${id}`),paper(id).title);
function role(p){return p.roleZh?bi(p.roleZh,p.roleEn):bi('合作作者','Co-author');}
function currentRoute(){
 const match=location.pathname.match(/paper-(\d+)\.html$/);
 if(match)return 'paper';
 const name=location.pathname.split('/').pop().replace('.html','');
 return ['research','publications','projects','teaching','service','about','cv'].includes(name)?name:'home';
}
function applyRoute(){
 let route=currentRoute();
 const target=document.getElementById(location.hash.slice(1));
 if(target?.closest('section[data-page]') && route==='home')route=target.closest('section').dataset.page;
 document.body.dataset.page=route;
 for(const section of document.querySelectorAll('.main-content>section[data-page]'))section.hidden=section.dataset.page!==route;
 const titles={home:bi('学术研究主页','Academic Homepage'),research:bi('研究议程','Research'),publications:bi('论文','Publications'),projects:bi('项目','Projects'),teaching:bi('教学','Teaching'),service:bi('学术服务','Academic Service'),about:bi('更多','More'),cv:bi('学术简历','Academic CV'),paper:bi('研究详情','Research Detail')};
 document.title=bi('钟益华','Yihua Zhong')+' | '+titles[route];
 for(const a of document.querySelectorAll('.main-nav>a:not(#language)')){
  const active=a.getAttribute('href').split('?')[0].split('#')[0]===(route==='home'?'index.html':route==='paper'?'publications.html':route+'.html');
  if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 }
 const first=document.querySelector('.main-content>section:not([hidden]) h2[id]');
 if(first)$('.skip-link').href='#'+first.id;
}
function render(){
 $('#intro-text').innerHTML=P.about.map(p=>`<p>${esc(txt(p))}</p>`).join('');
 $('#research-agenda').textContent=txt(P.agenda);
 $('#research-directions').innerHTML=P.directions.map((r,i)=>`<article class="research-direction"><span class="direction-number">0${i+1}</span><div><h3>${esc(txt(r.title))}</h3><p class="research-question">${esc(txt(r.question))}</p><p>${esc(txt(r.body))}</p><h4>${bi('相关研究','Related Research')}</h4><ul>${r.papers.map(id=>`<li>${paperLink(id)}</li>`).join('')}</ul></div></article>`).join('');
 $('#research-vision').innerHTML=P.vision.map(v=>`<article class="portfolio-text-block"><h3>${esc(txt(v.title))}</h3><p>${esc(txt(v.body))}</p></article>`).join('');
 $('#selected-research').innerHTML=[1,3,5].map(id=>{const p=paper(id),d=detail(id);return `<article class="selected-study"><a href="${url(`paper-${id}.html`)}"><img src="${p.image}" alt="${esc(p.figureCaption)}" loading="lazy"></a><div><span class="venue-badge">${esc(p.badge)}</span><h3>${link(url(`paper-${id}.html`),p.title)}</h3><p>${esc(txt(d?.question)||'')}</p><span class="author-note">${esc(role(p))}</span><p>${link(url(`paper-${id}.html`),bi('了解问题、方法与发现 →','Explore the question, approach & findings →'))}</p></div></article>`}).join('');
 $('#news-list').innerHTML=verified().news.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(n=>`<li><time datetime="${n.date}">${n.date.replaceAll('-','.')}</time><div>${external(n.source,bi('论文正式发表：','Published: ')+(paper(n.id)?.title||n.title))}</div></li>`).join('')+`<li><time datetime="2026-07">2026.07</time><div>${bi('完成华东师范大学《人工智能教育》课程助教工作。','Completed my teaching assistantship for Artificial Intelligence in Education at ECNU.')}</div></li>`;
 // Dates use publisher publication histories, never made-up acceptance events.
 const newsItems=[...$('#news-list').children];newsItems.sort((a,b)=>b.querySelector('time').dateTime.localeCompare(a.querySelector('time').dateTime));$('#news-list').replaceChildren(...newsItems);
 $('#teaching-philosophy').textContent=txt(P.teachingPhilosophy);
 $('#teaching-courses').innerHTML=P.courses.map(c=>`<article class="portfolio-text-block"><h3>${esc(txt(c.level))}</h3><p>${esc(txt(c.items))}</p></article>`).join('');
 for(const [i,project] of [...document.querySelectorAll('.project-item')].entries()){
  const existing=project.querySelector('.project-research-links');if(existing)existing.remove();
  const details=document.createElement('details');details.className='project-research-links';
  details.innerHTML=`<summary>${bi('研究主题与同主题论文','Research focus & thematically related papers')}</summary><p>${bi('研究职责：','Research responsibility: ')}${esc(txt(window.LATEST_PROFILE.projects[i].responsibility))}</p><ul>${P.projectThemes[i].map(id=>`<li>${paperLink(id)}</li>`).join('')}</ul><small>${bi('按研究主题关联；不表示这些论文均由该项目资助。','Linked by research theme; this does not assert project funding for these papers.')}</small>`;
  project.querySelector('div').append(details);
 }
 for(const article of document.querySelectorAll('.publication-item')){
  article.id='paper-'+article.dataset.paperId;
  const id=Number(article.dataset.paperId),links=article.querySelector('.publication-links');
  if(detail(id)&&!links.querySelector('.detail-link'))links.insertAdjacentHTML('beforeend',`<a class="detail-link" href="${url(`paper-${id}.html`)}">${bi('研究详情 →','Research detail →')}</a>`);
 }
 const id=Number(location.pathname.match(/paper-(\d+)\.html$/)?.[1]);
 if(id&&detail(id))renderDetail(id);
 for(const a of document.querySelectorAll('.main-nav>a:not(#language),.sidebar-cv,.site-title')){
  const href=a.getAttribute('href');if(!href)return;
  const [path,hash]=href.split('#');a.href=path.split('?')[0]+(en()?'?lang=en':'')+(hash?'#'+hash:'');
 }
 applyRoute();
}
function renderDetail(id){
 const p=paper(id),d=detail(id);
 const parts=[['question','研究问题','Research Question'],['approach','研究方法','Our Approach'],['study','研究设计','Study'],['findings','主要发现','Main Findings']];
 $('#paper-detail').innerHTML=`<a class="detail-back" href="${url('publications.html')}">← ${bi('全部论文','All publications')}</a><p class="publication-meta"><span class="venue-badge">${esc(p.badge)}</span> ${p.year}</p><h2 id="paper-detail-title" class="detail-title">${esc(p.title)}</h2><p class="detail-authors">${esc(p.authors)}</p><p class="publication-venue">${esc(p.publication)}</p><figure class="detail-figure"><img src="${p.image}" alt="${esc(p.figureCaption)}"><figcaption>${external(p.figureSource,p.figureCredit)}</figcaption></figure>${d.relatedPaperId?`<p class="section-note">${bi('本篇为中文多智能体论文的英文译文，采用同一研究数据。','This is the English translation of the Chinese multi-agent article, reporting the same study.')} ${paperLink(d.relatedPaperId)}</p>`:''}${parts.map(([key,zh,en])=>`<section class="portfolio-text-block"><h3>${bi(zh,en)}</h3><p>${esc(txt(d[key]))}</p></section>`).join('')}<section class="portfolio-text-block"><h3>${bi('本人角色','My Role')}</h3><p>${esc(role(p))} · ${bi('作者名单及排序见正式论文。','Author list and order are provided in the published paper.')}</p></section><section class="portfolio-text-block"><h3>${bi('公开资源','Resources')}</h3><div class="resource-links">${external(p.url,bi('出版页面 ↗','Publisher page ↗'))}${external('https://doi.org/'+p.doi,'DOI ↗')}${p.pdfUrl?external(p.pdfUrl,bi('全文 PDF ↓','Full-text PDF ↓')):''}${p.code?external(p.code,'Code ↗'):''}</div></section>`;
}
document.addEventListener('site-language-change',render);
window.addEventListener('hashchange',applyRoute);
render();
})();
