(() => {
  'use strict';
  const profile = window.LATEST_PROFILE, config = window.SITE_CONFIG, papers = window.PUBLICATIONS;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh', filter = 'all';
  const bi = (zh,en) => lang === 'zh' ? zh : en;
  const txt = field => typeof field === 'object' ? field[lang] : field;
  const external = (url,label,cls='') => `<a href="${esc(url)}"${cls ? ` class="${cls}"` : ''} target="_blank" rel="noopener noreferrer">${label}</a>`;
  const paths = {
    location:'M12 1a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
    email:'M2 4h20v16H2V4zm0 2 10 7L22 6v-2L12 11 2 4v2z',
    scholar:'M12 3 1 8l11 5 9-4.1V16h2V8L12 3zm-6 9v5c4 3 8 3 12 0v-5l-6 2.7L6 12z',
    github:'M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.7 8c-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2a4.7 4.7 0 0 1 1.2 3.3c0 4.7-2.8 5.7-5.5 6 .5.4.8 1.1.8 2.2v3.8c0 .3.2.7.8.6A12 12 0 0 0 12 .5z',
    orcid:'M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-4 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 9h2v10H7V9zm4 0h3a5 5 0 0 1 0 10h-3V9zm2 2v6h1a3 3 0 0 0 0-6h-1z',
    researchGate:'M3 2h17v20H3V2zm4 4v13h2v-5h1l3 5h2l-3-6c4-2 2-7-1-7H7zm2 2h2c2 0 2 4 0 4H9V8zm6-4v2h2v1h-2v2h4V7h-2V6h2V4h-4z'
  };
  const icon = (name,extra='') => `<svg class="contact-icon ${extra}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${paths[name]}"/></svg>`;
  function renderContacts() {
    const links = config.links;
    $('#contact-list').innerHTML = `<div class="contact-location">${icon('location')}${bi('上海，中国','Shanghai, China')}</div><button type="button" id="copy-email" aria-label="${bi('复制邮箱','Copy email address')}">${icon('email')}<span>${esc(config.email)}</span></button>` +
      [['researchGate','ResearchGate'],['github','GitHub'],['googleScholar','Google Scholar'],['orcid','ORCID']].filter(([key])=>links[key]).map(([key,label])=>external(links[key],icon(key==='googleScholar'?'scholar':key,key==='googleScholar'?'scholar-mark':'')+label)).join('');
    $('#copy-email').addEventListener('click',async () => {
      try { await navigator.clipboard.writeText(config.email); $('#copy-email span').textContent=bi('邮箱已复制','Email copied'); setTimeout(()=>{const el=$('#copy-email span');if(el)el.textContent=config.email},1600); }
      catch { location.href=`mailto:${config.email}`; }
    });
    const card=$('#scholar-card'), metrics=config.scholar;
    card.hidden=!(links.googleScholar && metrics && ['citedby','hindex','i10index'].every(key=>Number.isFinite(metrics[key])));
    if(!card.hidden){card.href=links.googleScholar;for(const key of ['citedby','hindex','i10index'])$(`#${key}`).textContent=metrics[key];$('#scholar-update').textContent=bi('统计日期','As of')+' · '+metrics.updated;}
  }
  function renderAbout() {
    const bios = lang==='zh' ? [
      '我是钟益华，现为华东师范大学上海智能教育研究院智能教育专业博士研究生，师从黄昌勤教授。此前于浙江师范大学获得教育技术学硕士学位，于江西师范大学获得软件工程学士学位。主要从事生成式 AI 教育应用、智能体支持学习、个性化学习与学习分析研究，累计发表学术论文与会议成果 9 篇。',
      `担任 ${profile.services.journals.join('、')} 等期刊审稿人，累计审稿时长超过 200 小时；为中国人工智能学会（CAAI）会员。`,
      '欢迎关注我的研究工作。如果您对相关研究方向感兴趣，期待与您交流，并探索进一步合作的可能。'
    ] : [
      'I am Yihua Zhong, a Ph.D. student in Intelligent Education at the Shanghai Institute of AI for Education, East China Normal University, supervised by Prof. Changqin Huang. I received my master’s degree in Educational Technology from Zhejiang Normal University and my bachelor’s degree in Software Engineering from Jiangxi Normal University. My research focuses on generative AI in education, agent-supported learning, personalized learning, and learning analytics. I have published nine journal and conference papers.',
      `I serve as a reviewer for ${profile.services.journals.join(', ')}, with more than 200 hours of peer review. I am a member of the Chinese Association for Artificial Intelligence (CAAI).`,
      'Thank you for your interest in my research. I welcome academic discussions and opportunities for collaboration in these areas.'
    ];
    $('#intro-text').innerHTML=bios.map(text=>`<p>${esc(text)}</p>`).join('');
    $('#research-interests').innerHTML=(lang==='zh'?['生成式 AI 教育应用','智能体支持学习','个性化学习','学习分析']:['Generative AI in Education','Agent-Supported Learning','Personalized Learning','Learning Analytics']).map(s=>`<span>${esc(s)}</span>`).join('');
  }
  function renderEducation() {
    const schools=config.schools;
    $('#education-list').innerHTML=profile.education.map((e,i)=>`<article class="education-item">${external(schools[i].url,`<img src="${esc(schools[i].logo)}" alt="${esc(txt(e.school))} ${bi('校徽','logo')}" width="43" height="43">`,'school-logo-link')}<div class="education-time">${esc(e.period.replace('–',' — '))}${i===0?`<br><span class="expected">${bi('预计毕业','Expected completion')}</span>`:''}</div><div class="education-body"><h3>${external(schools[i].url,esc(txt(e.school)))}</h3><p>${esc(txt(e.college)+' · ')}${esc(txt(e.degree))}</p>${e.laboratory?`<p class="education-note">${esc(txt(e.laboratory))}</p>`:''}<p class="education-note">${e.advisor[lang]?`<span>${e.advisorUrl?external(e.advisorUrl,esc(txt(e.advisor))):esc(txt(e.advisor))}</span>`:''}<span>${bi(schools[i].cityZh,schools[i].cityEn)}</span></p></div></article>`).join('');
  }
  const highlight=text=>esc(text).replace(/Yihua Zhong|Zhong Y\b|钟益华/g,'<span class="author-self">$&</span>');
  function renderPapers() {
    const groups=[['en-journal','英文期刊论文','English Journal Articles'],['zh-journal','中文期刊论文','Chinese Journal Articles'],['conference','学术会议论文','Conference Papers']];
    $('#publication-groups').innerHTML=groups.filter(([key])=>filter==='all'||(filter==='journal'?key!=='conference':key==='conference')).map(([key,zh,en])=>{
      const group=papers.filter(p=>p.group===key).sort((a,b)=>b.year-a.year||a.order-b.order);
      return `<div class="publication-group"><h3 class="publication-group-title">${bi(zh,en)} <span>${group.length}</span></h3><div class="publication-list">${group.map(p=>`<article class="publication-item ${p.image?'with-image':''}" data-paper-id="${p.id}">${p.image?`<figure class="paper-figure"><button class="figure-button" type="button" data-figure="${p.id}" aria-label="${esc(bi('查看论文原图：','View original figure: ')+p.title)}"><img class="publication-image" src="${esc(p.image)}" alt="${esc(p.figureCaption)}" loading="lazy" width="122" height="78" style="object-fit:contain"></button><figcaption>${external(p.figureSource,esc(p.figureShort))}</figcaption></figure>`:''}<div class="publication-main"><div class="publication-meta"><span class="venue-badge">${esc(p.badge)}</span><time>${p.year}</time></div><h4>${esc(lang==='en'&&p.titleEn?p.titleEn:p.title)}</h4><p class="publication-authors">${highlight(p.authors)}${p.roleZh?` <span class="author-note">${bi(p.roleZh,p.roleEn)}</span>`:''}</p><p class="publication-venue">${esc(p.publication)}</p><div class="publication-links">${p.url?external(p.url,bi('网页 ↗','Web ↗')):''}${p.pdfUrl?external(p.pdfUrl,bi('下载 ↓','PDF ↓')):''}${p.code?external(p.code,bi('代码 ↗','Code ↗')):''}</div></div></article>`).join('')}</div></div>`;
    }).join('');
    document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>showFigure(button.dataset.figure)));
  }
  function showFigure(id) {
    const p=papers.find(p=>String(p.id)===id),dialog=$('#figure-dialog'); if(!p||!p.image)return;
    $('#figure-full').src=p.image;$('#figure-full').alt=p.figureCaption;$('#figure-title').textContent=p.figureCaption;
    $('#figure-credit').innerHTML=external(p.figureSource,esc(p.figureCredit));dialog.showModal();
  }
  function renderOther() {
    const patents=profile.patents.filter(p=>p.id.startsWith('CN')), software=profile.patents.filter(p=>!p.id.startsWith('CN'));
    const block=(title,items)=>`<div class="output-block"><h3>${title}</h3><ol>${items.map(p=>`<li><strong>${esc(txt(p.title))}</strong><span>${esc(p.id)} · <b>${esc(txt(p.role))}</b> · ${esc(txt(p.status))}</span></li>`).join('')}</ol></div>`;
    const books=`<div class="output-block"><h3>${bi('图书','Books')}</h3><ol>${profile.books.map(book=>`<li><strong>${esc(txt(book.title))}</strong><span>${highlight(txt(book.author))}${bi(" 等", " et al.")}（${esc(txt(book.role))}） · ${esc(txt(book.publisher))} · ${book.year}</span><span>ISBN: ${esc(book.isbn)}</span>${external(book.url,bi('查看图书 ↗','View book ↗'))}</li>`).join('')}</ol></div>`;
    $('#output-columns').innerHTML=books+block(bi('发明专利','Invention Patents'),patents)+block(bi('软件著作权','Software Copyright'),software);
    $('#project-list').innerHTML=profile.projects.map((p,i)=>`<article class="project-item"><span>${i+1}.</span><div><h3>${esc(txt(p.title))}</h3><p>${esc(txt(p.funder))} · ${esc(txt(p.role))}</p><p class="responsibility">${esc(txt(p.responsibility))}</p></div></article>`).join('');
    const awards=profile.honors.flatMap(h=>h.years.split('、').map(year=>({...h,year:Number(year)}))).sort((a,b)=>b.year-a.year);
    $('#honor-list').innerHTML=awards.map(h=>`<div><time>${h.year}</time><p>${esc(txt(h.school))} ${esc(txt(h.title))}</p></div>`).join('');
    $('#experience-list').innerHTML=profile.teaching.map(t=>`<article><time>${esc(t.period.replace('–',' — '))}</time><div><h3>${esc(txt(t.school))}</h3><p>${esc(bi('《','')+txt(t.course)+bi('》',''))} · ${esc(txt(t.role))}</p><p>${esc(txt(t.description))}</p></div></article>`).join('');
    $('#service-content').innerHTML=`<h3>${bi('期刊审稿人','Journal Reviewer')}</h3><ul>${profile.services.journals.map(j=>{const m=profile.services.journalMetrics[j];return `<li>${esc(j)} <span class="journal-impact">(${external(m.source,`Impact Factor: ${m.value.toFixed(1)}, ${m.year}`)})</span></li>`;}).join('')}</ul><p>${esc(txt(profile.services.reviewing))} · ${esc(txt(profile.services.membership))}</p>`;
    $('#skills-list').innerHTML=profile.skills.map(s=>`<div><h3>${esc(txt(s.category))}</h3><p>${s.items.map(i=>esc(txt(i))).join(bi('、',', '))}</p></div>`).join('');
  }
  function render() {
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=bi('钟益华｜个人学术主页','Yihua Zhong | Academic Homepage');
    document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[lang]);
    $('#site-title').textContent=$('#profile-name').textContent=bi('钟益华','Yihua Zhong');
    $('#language span').textContent=bi('English','中文');$('#language').href=lang==='zh'?'?lang=en':'?lang=zh';
    $('#language').setAttribute('aria-label',bi('切换到英文主页','Switch to Chinese homepage'));
    $('.portrait').src=config.portraits[lang];
    $('.portrait').alt=bi('钟益华的毕业照','Portrait of Yihua Zhong');
    renderContacts();renderAbout();renderEducation();renderPapers();renderOther();
    document.dispatchEvent(new Event('site-language-change'));
  }
  $('#language').addEventListener('click',event=>{event.preventDefault();lang=lang==='zh'?'en':'zh';const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);render()});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('is-active',b===button);b.setAttribute('aria-pressed',String(b===button))});renderPapers()}));
  $('.menu-button').addEventListener('click',()=>{const isOpen=$('.main-nav').classList.toggle('is-open');$('.menu-button').setAttribute('aria-expanded',String(isOpen));$('.menu-button').setAttribute('aria-label',isOpen?bi('关闭导航','Close navigation'):bi('打开导航','Open navigation'))});
  document.querySelectorAll('.main-nav>a:not(.language-switch)').forEach(a=>a.addEventListener('click',()=>{$('.main-nav').classList.remove('is-open');$('.menu-button').setAttribute('aria-expanded','false')}));
  $('.figure-close').addEventListener('click',()=>$('#figure-dialog').close());
  $('#figure-dialog').addEventListener('click',event=>{if(event.target===$('#figure-dialog'))$('#figure-dialog').close()});
  render();
})();
