(() => {
  const $ = selector => document.querySelector(selector);
  const text = (zh, en) => document.documentElement.lang === 'en' ? en : zh;
  let data = null, state = window.SITE_CONFIG.visitorEndpoint ? 'loading' : 'unconfigured';
  const region = code => {
    try { return new Intl.DisplayNames([document.documentElement.lang], {type:'region'}).of(code.toUpperCase()); }
    catch { return code; }
  };
  function renderVisitors() {
    const map = $('#visitor-map');
    map.setAttribute('viewBox', window.WORLD_MAP.viewBox);
    map.setAttribute('aria-label', text('网站访客世界分布地图', 'World map of website visitors'));
    const countries = new Map((data?.countries || []).map(c => [c.code.toLowerCase(), c]));
    const max = Math.max(1, ...(data?.countries || []).map(c => c.visits));
    map.replaceChildren(...window.WORLD_MAP.locations.map(country => {
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      const visits = countries.get(country.id)?.visits;
      path.setAttribute('d', country.path);
      path.setAttribute('class', 'country-shape' + (visits ? ' has-visits' : ''));
      if (visits) path.style.opacity = String(0.3 + 0.7 * visits / max);
      const title = document.createElementNS('http://www.w3.org/2000/svg','title');
      title.textContent = region(country.id) + (visits ? text(`：${visits} 次访问`, `: ${visits} visits`) : '');
      path.append(title); return path;
    }));
    $('#visit-total').textContent = data?.totalVisits ?? '—';
    $('#visit-unique').textContent = data?.uniqueVisitors ?? '—';
    $('#visit-countries').textContent = data?.countries.length ?? '—';
    $('#recent-visitors').replaceChildren(...(data?.recentVisitors || []).slice(0,6).map(visitor => {
      const li = document.createElement('li'), id = document.createElement('span'), country = document.createElement('span');
      id.className = 'visitor-id'; id.textContent = text('访客 ', 'Visitor ') + visitor.id.slice(0,8);
      country.textContent = visitor.country ? region(visitor.country) : text('未知地区', 'Unknown region');
      li.append(id,country); return li;
    }));
    $('#visitor-status').textContent = state === 'unconfigured' ? text('访客统计尚未启用。', 'Visitor statistics are not enabled yet.') : state === 'error' ? text('访客统计暂时不可用，请稍后重试。', 'Visitor statistics are temporarily unavailable.') : state === 'loading' ? text('正在读取访客数据……', 'Loading visitor data…') : !data?.recentVisitors.length ? text('暂无访客记录。', 'No visitor records yet.') : '';
    $('#back-to-top').setAttribute('aria-label', text('返回顶部', 'Back to top'));
    $('#back-to-top').title = text('返回顶部', 'Back to top');
  }
  async function loadVisitors() {
    const endpoint = window.SITE_CONFIG.visitorEndpoint;
    if (!endpoint) return;
    try {
      let id;
      try { id = localStorage.getItem('zyh-visitor-id'); } catch {}
      if (!id || !/^[a-f0-9]{32}$/.test(id)) {
        id = Array.from(crypto.getRandomValues(new Uint8Array(16)), n => n.toString(16).padStart(2,'0')).join('');
        try { localStorage.setItem('zyh-visitor-id',id); } catch {}
      }
      const post = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitorId:id}),signal:AbortSignal.timeout(10000)});
      if (!post.ok) throw new Error('Visitor registration failed');
      const response = await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(10000)});
      if (!response.ok) throw new Error('Visitor statistics unavailable');
      data = await response.json();
      if (!Number.isFinite(data.totalVisits) || !Number.isFinite(data.uniqueVisitors) || !Array.isArray(data.countries) || !Array.isArray(data.recentVisitors)) throw new Error('Invalid statistics');
      state = 'ready';
    } catch { data = null; state = 'error'; }
    renderVisitors();
  }
  const rocket = $('#back-to-top');
  const updateRocket = () => { rocket.hidden = window.scrollY < 360; };
  window.addEventListener('scroll',updateRocket,{passive:true});
  rocket.addEventListener('click',() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    rocket.classList.add('is-launching');
    window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});
    window.setTimeout(() => rocket.classList.remove('is-launching'),700);
  });
  document.addEventListener('site-language-change',renderVisitors);
  renderVisitors(); updateRocket(); loadVisitors();
})();
