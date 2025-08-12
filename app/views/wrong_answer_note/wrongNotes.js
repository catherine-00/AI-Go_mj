// app/views/wrong_answer_note/wrongNotes.js

// 스타일 + 마크업 그대로 반환
export function render() {
  return /* html */ `
  <style>
    :root{
      --bg:#f6f8fb; --card:#fff; --line:#e6e8ee; --text:#0f172a; --muted:#66748c;
      --blue:#2563ff; --blue-700:#1f54f0; --blue-050:#eef4ff;
      --green:#10b981; --green-50:#ecfdf5; --green-200:#b9ecd9;
      --amber:#f59e0b; --amber-50:#fff7e6;
      --rose:#ef4444; --rose-50:#fff2f2; --rose-200:#ffc9cf;
      --shadow:0 8px 28px rgba(15,23,42,.06);
      --radius:18px; --focus:0 0 0 3px rgba(37,99,255,.18);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    .app{width:360px; min-height:100dvh; display:flex; flex-direction:column; margin:0 auto}

    /* ===== Topbar ===== */
    .topbar{position:sticky; top:0; z-index:5; background:#fff; border-bottom:1px solid var(--line);
      padding:12px 12px; display:flex; align-items:center; justify-content:space-between}
    .row{display:flex; align-items:center; gap:10px}
    .btn-ic{width:36px;height:36px;border-radius:12px;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer}
    .title{display:flex; align-items:center; gap:8px; font-weight:900}
    .title .book{width:28px;height:28px;border-radius:9px;border:1px solid #d8e4ff;background:#eef4ff;display:grid;place-items:center;color:#e23a3a}
    .chip-user{display:flex; align-items:center; gap:8px; border:1px solid var(--line); padding:6px 10px; border-radius:999px; background:#fff}
    .chip-user .dot{width:22px;height:22px;border-radius:999px;background:#1e6bff;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:800}

    .page{padding:14px}

    /* ===== Header panel ===== */
    .panel{background:var(--card); border:1px solid var(--line); border-radius:22px; box-shadow:var(--shadow); padding:16px}
    .panel-head{display:flex; align-items:center; justify-content:space-between}
    .panel .left{display:flex; align-items:center; gap:10px}
    .round{width:30px;height:30px;border-radius:999px;display:grid;place-items:center;border:1px solid #ffd3d6;background:#fff5f6;color:#e23a3a;font-weight:900}
    .total{color:#8b97ad}
    .total b{color:#e23a3a}

    .search{display:flex; align-items:center; gap:10px; margin-top:12px}
    .search .inp{flex:1; display:flex; align-items:center; gap:8px; border:1px solid var(--line); border-radius:14px; padding:10px 12px; background:#fff}
    .search input{border:none; outline:none; width:100%; font-size:14px}
    .filter{margin-top:10px; display:flex}
    .filter button{flex:1; border:1px solid var(--line); background:#fff; border-radius:12px; padding:10px; font-weight:800; color:#52607a}

    /* ===== List ===== */
    .list{display:flex; flex-direction:column; gap:12px; margin-top:12px}
    .item{background:#fff; border:1px solid var(--line); border-radius:16px; padding:12px; box-shadow:var(--shadow); cursor:pointer}
    .item-top{display:flex; align-items:center; justify-content:space-between; color:#8693aa; font-size:12px}
    .badge{display:inline-flex; align-items:center; gap:6px; padding:4px 8px; border-radius:999px; background:#ffecec; color:#d84c55; font-weight:900}
    .item-ask{margin:8px 0 10px}
    .chip{display:inline-flex; padding:4px 8px; border-radius:999px; background:#f1f4fb; color:#66748c; font-weight:800; font-size:12px}
    .wrong-flag{display:inline-flex; align-items:center; gap:6px; color:#e23a3a; font-weight:800}

    /* ===== Detail ===== */
    .video{height:170px; background:#111; border:1px solid #1f2835; border-radius:16px}
    .sec{margin-top:12px}
    .qbox{border:1px solid var(--line); background:#fff; border-radius:16px; padding:14px}
    .qbox .qtitle{display:flex; align-items:center; justify-content:space-between; font-weight:900; margin-bottom:8px}
    .opt{display:flex; align-items:center; gap:10px; padding:12px; border:1px solid var(--line); border-radius:14px; background:#fff}
    .opt + .opt{margin-top:10px}
    .num{width:28px;height:28px;border-radius:999px;display:grid;place-items:center;border:1px solid var(--line); background:#f5f7fb; color:#738099; font-weight:800}

    .opt.correct{border-color:#7bdab8; background:var(--green-50)}
    .opt.correct .num{border-color:#9fe6cf; background:#e7fff6; color:#0b9b6b}
    .opt.wrong{border-color:#ffb7bf; background:var(--rose-50)}
    .opt.wrong .num{border-color:#ffc4cc; background:#fff0f2; color:#d9484c}

    .actions{display:flex; gap:12px; margin-top:12px}
    .half{flex:1}
    .btn-primary{width:100%; border:none; border-radius:14px; padding:14px 16px; background:linear-gradient(90deg,var(--blue),var(--blue-700)); color:#fff; font-weight:900; box-shadow:0 10px 24px rgba(37,99,255,.25); cursor:pointer}
    .btn-ghost{width:100%; border:1px solid #c7cedd; border-radius:14px; padding:14px 16px; background:#f1f3f6; color:#3c4253; font-weight:900; cursor:pointer}

    .explain{border-radius:16px; padding:14px; margin-top:12px}
    .explain.bad{border:1px solid var(--rose-200); background:#fff7f8; color:#a13136}
    .explain.good{border:1px solid var(--green-200); background:#f0fdf7; color:#0e7d5a}
    .law{margin-top:10px; border:1px solid #dbe6ff; background:#f5f8ff; border-radius:12px; padding:10px}
    .law a{color:#2b67ff; text-decoration:none; font-weight:900}

    /* 추천 유사 문제 */
    .rec{margin-top:12px}
    .rec h3{margin:6px 0 8px; font-size:15px}
    .pill{display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px; border-radius:14px; border:1px solid var(--line); background:#fff}
    .pill + .pill{margin-top:10px}
    .pill .name{font-weight:900}
    .pill .desc{font-size:12px; color:#6b7a93; margin-top:2px}
    .pill .chev{width:28px;height:28px;border-radius:999px;border:1px solid var(--line);display:grid;place-items:center;background:#fff}
    .pill.green{background:var(--green-50); border-color:#d7f5ea}
    .pill.amber{background:var(--amber-50); border-color:#ffedc2}
    .pill.rose{background:var(--rose-50); border-color:#ffcfd6}

    .backbar{position:sticky; bottom:0; background:var(--bg); padding:16px 0 4px}
    .backbar .btn-ghost{background:#fff}

    a:focus, button:focus, .pill:focus, .opt:focus{outline:var(--focus)}
  </style>

  <div class="app">
    <!-- topbar -->
    <header class="topbar">
      <div class="row">
        <button id="openDrawer" class="btn-ic" aria-label="메뉴" data-open-drawer>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <div class="title">
          <span class="book">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e23a3a" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h8"/></svg>
          </span>
          오답노트
        </div>
      </div>
      <div class="chip-user"><span class="dot">김</span> 김운전</div>
    </header>

    <!-- ===== View: List ===== -->
    <section id="view-list" class="page">
      <div class="panel">
        <div class="panel-head">
          <div class="left">
            <span class="round">✖</span>
            <div>
              <div style="font-weight:900">오답노트</div>
              <div style="color:#8b97ad">틀린 문제를 다시 학습하세요</div>
            </div>
          </div>
          <div class="total">총 오답 수 <b id="totalWrong">0</b></div>
        </div>

        <div class="search">
          <div class="inp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7b879b" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3-3"></path></svg>
            <input id="search" placeholder="문제 검색..." />
          </div>
        </div>

        <div class="filter">
          <button id="filterAll">전체</button>
        </div>
      </div>

      <div id="listWrap" class="list"></div>
    </section>

    <!-- ===== View: Detail ===== -->
    <section id="view-detail" class="page" hidden>
      <div class="panel">
        <div class="panel-head">
          <div class="left">
            <span class="round">✖</span>
            <div>
              <div style="font-weight:900">오답노트</div>
              <div style="color:#8b97ad">틀린 문제를 다시 학습하세요</div>
            </div>
          </div>
          <div class="total">총 오답 수 <b id="totalWrong2">0</b></div>
        </div>

        <div class="sec video"></div>

        <div class="sec qbox">
          <div class="qtitle">
            <div>문제 <span id="dNo"></span> <span id="dWrongBadge" class="badge" style="margin-left:6px">오답</span></div>
          </div>
          <div id="dAsk" style="margin-bottom:10px"></div>
          <div id="dOpts"></div>
        </div>

        <div id="explainWrap"></div>

        <div class="actions">
          <button id="retryBtn" class="btn-primary half">↻ 다시 풀기</button>
          <button id="saveBtn" class="btn-ghost half">□ 저장 문제</button>
        </div>

        <div class="rec">
          <h3>AI 추천 유사 문제</h3>
          <button class="pill green">
            <div><div class="name">쉬움</div><div class="desc">스쿨존에서 어린이가 뛰어나올 때 대처 방법은?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
          <button class="pill amber">
            <div><div class="name">보통</div><div class="desc">고속도로에서 차선을 변경할 때 주의 사항은?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
          <button class="pill rose">
            <div><div class="name">어려움</div><div class="desc">빗길에서 미끄러질 수 있는 상황에서 브레이크 조작법?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
        </div>

        <div class="backbar">
          <button id="backToList" class="btn-ghost">목록으로 돌아가기</button>
        </div>
      </div>
    </section>
  </div>
  `;
}

export function mount(root) {
  const qs  = (s, sc = root) => sc.querySelector(s);
  const qsa = (s, sc = root) => Array.from(sc.querySelectorAll(s));

  // ===== Mock data (원본 그대로) =====
  const wrongs = [
    {
      id: 15, date: '2024-01-10', tag: '신호 위반',
      ask: '교차로에서 신호위반으로 갑시다. 신호를 위반했을 때 벌점은?',
      options: ['앞차를 추월하여 빠르게 교차로를 통과한다', '안전거리를 유지하여 정차한 앞차에 정차한다', '좌측으로 우회 앞차에게 신호를 보낸다', '클락션으로 앞차 속도 통과한다'],
      answer: 1,
      desc: '교차로에 신호등이 있습니다. 신호등의 불빛은 빨간불로 바뀌었고, 앞차가 급정거했습니다.'
    },
    {
      id: 23, date: '2024-01-08', tag: '차선 변경',
      ask: '편도 2차로 도로에서 주행 중입니다. 앞 차량이 우회전 신호를 켜고 있을 때 행동은?',
      options: ['즉시 추월한다', '속도를 줄이고 앞 차량의 진로를 배려한다', '클락션을 울리며 진행한다', '차선을 바꾸어 가속한다'],
      answer: 1,
      desc: '좌측 차로는 원활하나 우측에서 차량이 감속하며 우회전을 준비합니다.'
    },
    {
      id: 8, date: '2024-01-15', tag: '추월',
      ask: '중앙선이 있는 도로에서 주행 중입니다. 앞차가 아예 도로를 막아서고 있습니다.',
      options: ['중앙선을 넘어 추월한다', '안전거리를 유지하고 정차한다', '경음기를 울리며 추월 시도', '상향등을 켠다'],
      answer: 1,
      desc: '중앙선이 있어 추월이 금지된 상황입니다. 앞차는 정체로 멈춰 있습니다.'
    }
  ];

  // ===== State =====
  let current = null; // 현재 상세 아이템
  let picked  = null;
  const saved = new Set(JSON.parse(localStorage.getItem('ai_go_saved_wrong') || '[]'));

  // ===== Views =====
  const vList   = qs('#view-list');
  const vDetail = qs('#view-detail');

  function show(view) {
    vList.hidden   = view !== 'list';
    vDetail.hidden = view !== 'detail';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ===== List render =====
  function renderList(items) {
    qs('#totalWrong').textContent = wrongs.length; // 원본과 동일(필터 수가 아님)
    const wrap = qs('#listWrap');
    wrap.innerHTML = '';
    items.forEach(row => {
      const el = document.createElement('article');
      el.className = 'item';
      el.innerHTML = `
        <div class="item-top">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="badge">문제 ${row.id}</span>
            <span>${row.date}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fa0b5" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </div>
        <div class="item-ask">${row.ask}</div>
        <div style="display:flex;align-items:center; justify-content:space-between">
          <span class="chip">${row.tag}</span>
          <span class="wrong-flag">✖ 오답</span>
        </div>
      `;
      el.addEventListener('click', () => openDetail(row));
      wrap.appendChild(el);
    });
  }

  // ===== Detail render =====
  function openDetail(row) {
    current = row;
    picked  = null;
    qs('#totalWrong2').textContent = wrongs.length;
    qs('#dNo').textContent  = row.id;
    qs('#dAsk').textContent = row.ask;
    qs('#explainWrap').innerHTML = '';
    renderOptions(row);
    updateSaveButton();
    show('detail');
  }

  function renderOptions(row) {
    const box = qs('#dOpts');
    box.innerHTML = '';
    row.options.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.innerHTML = `<span class="num">${i + 1}</span><span>${t}</span>`;
      b.addEventListener('click', () => {
        picked = i;
        // 초기화
        qsa('.opt', box).forEach(el => el.classList.remove('correct', 'wrong'));
        if (picked === row.answer) {
          b.classList.add('correct');
          showExplain(true, row);
        } else {
          b.classList.add('wrong');
          // 정답 강조
          const corr = box.children[row.answer];
          if (corr) corr.classList.add('correct');
          showExplain(false, row);
        }
      });
      box.appendChild(b);
    });
  }

  function showExplain(ok, row) {
    const w = qs('#explainWrap');
    const cls   = ok ? 'good' : 'bad';
    const title = ok ? '✅ 정답입니다!' : '❌ 오답입니다!';
    w.innerHTML = `
      <div class="explain ${cls}">
        <div style="font-weight:900;margin-bottom:6px">${title}</div>
        <div style="line-height:1.6">${detailText(row)}</div>
        <div class="law">
          <div style="font-weight:800; margin-bottom:4px">관련 법규</div>
          <a href="#" aria-label="도로교통법 제19조 (차로의 변경)">도로교통법 제19조 (차로의 변경)</a>
        </div>
      </div>
    `;
  }

  function detailText(row) {
    if (row.tag === '차선 변경') {
      return '차선 변경 시에는 먼저 룸미러를 통해 뒤차와의 거리를 확인하고, 방향지시등을 켠 후, 사각지대 확인을 다음 안전하게 차선을 변경해야 합니다.';
    }
    if (row.tag === '신호 위반') {
      return '신호 위반 상황에서는 속도를 줄이고 안전거리를 유지한 채 정차해야 하며, 신호가 바뀐 후 교차로를 통과해야 합니다.';
    }
    return row.desc;
  }

  // 저장 문제
  const saveBtn = qs('#saveBtn');
  function updateSaveButton() {
    if (!current) return;
    const isSaved = saved.has(current.id);
    saveBtn.textContent = isSaved ? '■ 저장 해제' : '□ 저장 문제';
  }
  const onSave = () => {
    if (!current) return;
    if (saved.has(current.id)) saved.delete(current.id);
    else saved.add(current.id);
    localStorage.setItem('ai_go_saved_wrong', JSON.stringify(Array.from(saved)));
    updateSaveButton();
  };
  saveBtn.addEventListener('click', onSave);

  // 다시 풀기
  const onRetry = () => {
    if (!current) return;
    qs('#explainWrap').innerHTML = '';
    renderOptions(current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  qs('#retryBtn').addEventListener('click', onRetry);

  // 뒤로 가기
  const onBack = () => show('list');
  qs('#backToList').addEventListener('click', onBack);

  // 검색
  const search = qs('#search');
  const onSearch = () => {
    const q = search.value.trim();
    const filtered = q ? wrongs.filter(r => r.ask.includes(q) || r.tag.includes(q)) : wrongs;
    renderList(filtered);
  };
  search.addEventListener('input', onSearch);

  // 초기 렌더
  renderList(wrongs);
  show('list');

  // 언마운트 정리 함수
  return () => {
    saveBtn.removeEventListener('click', onSave);
    qs('#retryBtn')?.removeEventListener('click', onRetry);
    qs('#backToList')?.removeEventListener('click', onBack);
    search?.removeEventListener('input', onSearch);
  };
}
