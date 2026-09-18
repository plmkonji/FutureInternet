const viewport = document.querySelector('#browserViewport');
const addressBar = document.querySelector('#addressBar');
const addressForm = document.querySelector('#addressForm');
const tabTitle = document.querySelector('#tabTitle');
const backButton = document.querySelector('#backButton');
const forwardButton = document.querySelector('#forwardButton');
const refreshButton = document.querySelector('#refreshButton');
const toast = document.querySelector('#toast');

const state = {
  route: 'home',
  history: ['home'],
  historyIndex: 0,
  clues: JSON.parse(localStorage.getItem('nova-clues') || '[]')
};

const routeMeta = {
  home: ['New pulse', 'nova://new-pulse'],
  pulse: ['Pulse — Independent News', 'https://pulse.world'],
  orbit: ['Orbit — Humanity, connected', 'https://orbit.social'],
  shop: ['Morrow — Things from tomorrow', 'https://morrow.market'],
  archive: ['Memory Archive', 'archive://public-vault']
};

const sites = [
  { route: 'pulse', icon: 'P', title: 'Pulse', subtitle: 'Independent news from Earth, Luna & Mars', color: '#6ce5e8' },
  { route: 'orbit', icon: 'O', title: 'Orbit', subtitle: '8.4 billion people. One shared signal.', color: '#8b7cff' },
  { route: 'shop', icon: 'M', title: 'Morrow', subtitle: 'Products delivered before you want them', color: '#ffbd6e' },
  { route: 'archive', icon: 'A', title: 'Memory Archive', subtitle: 'Revisit authenticated human memories', color: '#ff6eb4' }
];

const news = [
  {
    id: 'moon-vote', kicker: 'Lunar Republic',
    title: 'The Moon votes for independence in a decision Earth refuses to recognize',
    summary: 'Turnout reached 94% across six lunar settlements. Earth Council officials called the referendum “symbolic and legally void.”',
    body: 'For the first time, humans born away from Earth have voted to form a sovereign nation. Crowds gathered beneath the glass canopy of Armstrong City as the final result arrived at 03:14 UTC. Trade routes remain open, but Earth has paused all helium-3 contracts pending negotiations.'
  },
  {
    id: 'last-glacier', kicker: 'Climate',
    title: 'The last unmanaged glacier has entered preservation status',
    summary: 'The Antarctic Climate Authority says autonomous cooling arrays can hold the ice for at least another century.',
    body: 'The designation ends the era of naturally stable glaciers. Every major ice mass is now actively cooled, shielded, or rebuilt using atmospheric water capture. Critics say the word “preserved” disguises a planetary life-support system with no off switch.'
  },
  {
    id: 'quiet-hour', kicker: 'Technology',
    title: 'Global neural network schedules first mandatory “quiet hour”',
    summary: 'At 18:00 UTC, consumer implants will disconnect for sixty minutes in the largest digital silence experiment ever attempted.',
    body: 'The Quiet Mind Coalition petitioned for the pause after a leaked report linked always-on neural assistance to memory blending. NOVA Systems denies that its network can modify autobiographical memory without consent.'
  }
];

function pageShell(brand, mark, color, meta, content) {
  return `<article class="page site-page" style="--brand:${color}">
    <header class="site-nav">
      <div class="brand"><span class="brand-mark">${mark}</span>${brand}</div>
      <div class="nav-meta">${meta}</div>
    </header>
    ${content}
  </article>`;
}

function renderHome() {
  return `<section class="page home-page">
    <header class="home-header">
      <div class="eyebrow">Quantum browser · Public build 32.8</div>
      <h1 class="nova-logo">NOVA</h1>
      <p class="home-subtitle">The human internet, beautifully reconstructed.</p>
    </header>
    <form class="search-form" id="homeSearch">
      <span aria-hidden="true">⌕</span>
      <input aria-label="Search the 2057 internet" placeholder="Search Earth, Luna and the public archive…" autocomplete="off">
      <button>SEARCH</button>
    </form>
    <div class="site-grid">
      ${sites.map(site => `<button class="site-card" data-route="${site.route}" style="--card-color:${site.color}">
        <span class="site-icon">${site.icon}</span>
        <h3>${site.title}</h3><p>${site.subtitle}</p>
      </button>`).join('')}
    </div>
    <div class="date-line">Thursday, September 18, 2057 · Portland Megaregion · 17°C</div>
  </section>`;
}

function renderPulse() {
  return pageShell('PULSE', 'P', '#6ce5e8', '18 SEP 2057 · LIVE', `<div class="content-wrap">
    <section class="hero"><div class="eyebrow">The morning signal</div><h1>The future arrived.<br>It has demands.</h1><p>Independent reporting from Earth, Luna, and the settlements beyond. Human-written. AI-verified. No memory targeting.</p></section>
    <div class="section-label">Top signal</div>
    <section class="story-grid">
      <article class="story large" data-article="${news[0].id}"><div class="story-kicker">${news[0].kicker}</div><h2>${news[0].title}</h2><p>${news[0].summary}</p><div class="story-meta">8 MIN READ · UPDATED 4 MIN AGO</div></article>
      ${news.slice(1).map(item => `<article class="story" data-article="${item.id}"><div class="story-kicker">${item.kicker}</div><h3>${item.title}</h3><p>${item.summary}</p><div class="story-meta">5 MIN READ</div></article>`).join('')}
    </section>
  </div>`);
}

function renderOrbit() {
  const posts = [
    ['LM', 'Lena Mori', '@lena.mori · Luna', 'I voted in my first election today. My grandmother left Earth in 2029. She cried when the result came in. 🌘', '12.8k signals · 4.1k echoes'],
    ['GR', 'GoldenRetrievers', '@dogs.earth', 'Study confirms dogs still understand roughly 80% of what humans say and selectively ignore the rest.', '88.2k signals · 22k echoes'],
    ['??', 'deleted_user_7281', '@signal-lost', 'Does anyone else remember Portland having two moons last Tuesday? My memory log says the file never existed.', '3 signals · 0 echoes']
  ];
  return pageShell('ORBIT', 'O', '#8b7cff', 'GLOBAL FEED · 8.4B ONLINE', `<div class="content-wrap feed-layout">
    <section>
      <div class="composer"><div class="avatar">NA</div><button data-action="compose">Share a thought across worlds…</button></div>
      ${posts.map((p, i) => `<article class="post" ${i === 2 ? 'data-clue="ghost-post"' : ''}><div class="post-head"><div class="avatar">${p[0]}</div><div><div class="post-name">${p[1]}</div><div class="post-handle">${p[2]}</div></div></div><div class="post-body">${p[3]}</div>${i === 1 ? '<div class="post-visual">LIVE CAMERA · BLAZE PARK, PORTLAND</div>' : ''}<div class="post-actions">♡ ${p[4]} <span>⋯</span></div></article>`).join('')}
    </section>
    <aside class="feed-sidebar"><div class="panel"><div class="section-label" style="margin-top:0">Trending now</div>${['#LunaDecides', 'Quiet Hour', 'Portland Sky Event', 'Analog Cameras', 'Memory Rights'].map((trend, i) => `<div class="trend"><small>${i + 1} · Earthwide</small><strong>${trend}</strong></div>`).join('')}</div></aside>
  </div>`);
}

function renderShop() {
  const products = [
    ['☁️', 'Personal Weather Cloud', '₡ 2,480', 'linear-gradient(145deg,#4b79a1,#283e51)'],
    ['🪴', 'Lunar Moss Desk Habitat', '₡ 184', 'linear-gradient(145deg,#183b2c,#101d18)'],
    ['◉', 'Dream Recorder Mini', '₡ 899', 'linear-gradient(145deg,#4b326d,#171126)'],
    ['🧥', 'Climate-Adaptive Jacket', '₡ 320', 'linear-gradient(145deg,#554532,#201b16)'],
    ['🐕', 'Canine Mood Subtitle Collar', '₡ 129', 'linear-gradient(145deg,#674457,#24151e)'],
    ['⌛', 'One Extra Hour™', '₡ 9,999', 'linear-gradient(145deg,#265d63,#0d2023)']
  ];
  return pageShell('MORROW', 'M', '#ffbd6e', 'DELIVERY: 14 MINUTES AGO', `<div class="content-wrap">
    <section class="hero"><div class="eyebrow">Predictive marketplace</div><h1>Things from tomorrow,<br>delivered yesterday.</h1><p>Every purchase is carbon-negative, ethically synthesized, and anticipated from your recent thoughts.</p></section>
    <div class="section-label">Recommended before you asked</div>
    <section class="product-grid">${products.map((p, i) => `<article class="product"><div class="product-art" style="--product-bg:${p[3]}"><span>${p[0]}</span></div><div class="product-info"><h3>${p[1]}</h3><div class="product-row"><span class="price">${p[2]}</span><button class="buy-button" data-product="${i}">Acquire</button></div></div></article>`).join('')}</section>
  </div>`);
}

function renderArchive() {
  const memories = [
    ['2026', 'The old internet', 'Public reconstruction · 94% confidence', false],
    ['2032', 'The week nobody slept', 'Public health archive · restricted', true],
    ['2041', 'First rain on Mars', 'Collective memory · 2.1M contributors', false],
    ['2048', 'Portland sky event', 'Record expunged by NOVA Systems', true],
    ['2053', 'The final smartphone', 'Museum capture · interactive', false],
    ['2057', 'Today', 'This memory is still being written', false]
  ];
  return pageShell('MEMORY ARCHIVE', 'A', '#ff6eb4', `${state.clues.length}/3 ANOMALIES FOUND`, `<div class="content-wrap">
    <section class="hero"><div class="eyebrow">Authenticated remembrance</div><h1>History, exactly<br>as someone remembers it.</h1><p>Browse consensually donated human memories. Emotional detail is preserved. Faces may be reconstructed.</p></section>
    <div class="section-label">Public collection</div>
    <section class="archive-grid">${memories.map((m, i) => `<article class="memory ${m[3] ? 'locked' : ''}"><span class="memory-year">${m[0]}</span><div><h3>${m[1]}</h3><p>${m[2]}</p><button class="action-button" data-memory="${i}" data-locked="${m[3]}">${m[3] ? 'Request access' : 'Remember'}</button></div></article>`).join('')}</section>
  </div>`);
}

function renderSearch(query) {
  const safe = escapeHtml(query);
  return `<section class="page empty-state"><div><div class="eyebrow">NOVA SEARCH · 0.003 SEC</div><h1>“${safe}”</h1><p>7.2 billion results were summarized into one answer.<br>Unfortunately, that answer has been classified.</p><button class="action-button" data-route="home" style="margin-top:20px">Return home</button></div></section>`;
}

const renderers = { home: renderHome, pulse: renderPulse, orbit: renderOrbit, shop: renderShop, archive: renderArchive };

function navigate(route, addHistory = true) {
  if (!renderers[route]) route = 'home';
  state.route = route;
  if (addHistory) {
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(route);
    state.historyIndex++;
  }
  viewport.innerHTML = renderers[route]();
  viewport.scrollTop = 0;
  const [title, address] = routeMeta[route];
  tabTitle.textContent = title;
  addressBar.value = address;
  backButton.disabled = state.historyIndex === 0;
  forwardButton.disabled = state.historyIndex >= state.history.length - 1;
  document.querySelectorAll('.dock button').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
}

function showArticle(id) {
  const article = news.find(item => item.id === id);
  if (!article) return;
  const isClue = id === 'quiet-hour';
  viewport.insertAdjacentHTML('beforeend', `<div class="article-overlay"><article class="article-modal"><div class="modal-top"><div class="story-kicker">${article.kicker} · Pulse</div><button class="close-modal" aria-label="Close">×</button></div><h2>${article.title}</h2><p>${article.body}</p><p>Public responses have been temporarily disabled while the authenticity network verifies this report.</p>${isClue ? '<div class="clue-box">ANOMALY DETECTED // The article timestamp is 18:01 UTC — one minute after the network was supposedly disconnected.</div>' : ''}</article></div>`);
  if (isClue) discoverClue('timestamp');
}

function discoverClue(clue) {
  if (state.clues.includes(clue)) return;
  state.clues.push(clue);
  localStorage.setItem('nova-clues', JSON.stringify(state.clues));
  showToast(`Anomaly ${state.clues.length}/3 saved to Memory Archive`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}

document.addEventListener('click', event => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) return navigate(routeButton.dataset.route);

  const story = event.target.closest('[data-article]');
  if (story) return showArticle(story.dataset.article);

  if (event.target.closest('.close-modal') || (event.target.classList.contains('article-overlay'))) {
    document.querySelector('.article-overlay')?.remove();
    return;
  }

  const buy = event.target.closest('[data-product]');
  if (buy) {
    showToast(Number(buy.dataset.product) === 5 ? 'Temporal commerce license required' : 'Order predicted. Delivery already in progress.');
    if (Number(buy.dataset.product) === 5) discoverClue('extra-hour');
  }

  const memory = event.target.closest('[data-memory]');
  if (memory) {
    if (memory.dataset.locked === 'true') {
      showToast('Access denied: this memory has no authorized owner');
      if (memory.dataset.memory === '3') discoverClue('portland-event');
    } else showToast('Memory stream unavailable in this browser build');
  }

  if (event.target.closest('[data-clue="ghost-post"]')) discoverClue('ghost-post');
  if (event.target.closest('[data-action="compose"]')) showToast('Posting disabled during global Quiet Hour');
});

addressForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = addressBar.value.trim();
  const known = Object.entries(routeMeta).find(([, meta]) => meta[1] === query || query.toLowerCase().includes(meta[0].toLowerCase()));
  if (known) navigate(known[0]);
  else {
    viewport.innerHTML = renderSearch(query || 'the future');
    tabTitle.textContent = `Search: ${query}`;
  }
});

viewport.addEventListener('submit', event => {
  if (event.target.id !== 'homeSearch') return;
  event.preventDefault();
  const query = event.target.querySelector('input').value.trim();
  if (!query) return;
  viewport.innerHTML = renderSearch(query);
  addressBar.value = `nova://search?q=${encodeURIComponent(query)}`;
  tabTitle.textContent = `Search: ${query}`;
});

backButton.addEventListener('click', () => {
  if (state.historyIndex === 0) return;
  state.historyIndex--;
  navigate(state.history[state.historyIndex], false);
});

forwardButton.addEventListener('click', () => {
  if (state.historyIndex >= state.history.length - 1) return;
  state.historyIndex++;
  navigate(state.history[state.historyIndex], false);
});

refreshButton.addEventListener('click', () => {
  viewport.classList.remove('refreshing');
  void viewport.offsetWidth;
  navigate(state.route, false);
});

document.querySelector('#identityButton').addEventListener('click', () => showToast('Identity verified: Nick A. · Earth resident'));
document.querySelector('.new-tab').addEventListener('click', () => navigate('home'));

navigate('home', false);
