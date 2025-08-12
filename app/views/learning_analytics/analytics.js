// app/views/learning_analytics/analytics.js
import { store } from '../../js/store.js';

export async function render() {
  // CSS와 HTML을 직접 반환
  const css = `
  .ago-analytics{width:360px;min-height:100dvh;display:flex;flex-direction:column;font-family:"Pretendard","Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;--bg:#f6f8fb;--card:#fff;--line:#e6e8ee;--text:#0f172a;--muted:#66748c;--blue:#2563ff;--blue-700:#1f54f0;--blue-050:#eef4ff;--green:#10b981;--green-050:#ecfdf5;--rose:#ef4444;--rose-050:#fff1f2;--shadow:0 8px 28px rgba(15,23,42,.06);--radius:18px;--focus:0 0 0 3px rgba(37,99,255,.18);color:var(--text);background:var(--bg)}
  .ago-analytics .topbar{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid var(--line);padding:12px;display:flex;align-items:center;justify-content:space-between}
  .ago-analytics .row{display:flex;align-items:center;gap:10px}
  .ago-analytics .btn-ic{width:36px;height:36px;border-radius:12px;border:1px solid var(--line);background:#fff;display:grid;place-items:center}
  .ago-analytics .title{display:flex;align-items:center;gap:8px;font-weight:900}
  .ago-analytics .title .badge{width:28px;height:28px;border-radius:9px;border:1px solid #d8e4ff;background:#eef4ff;display:grid;place-items:center;color:#6f4ef6}
  .ago-analytics .chip-user{display:flex;align-items:center;gap:8px;border:1px solid var(--line);padding:6px 10px;border-radius:999px;background:#fff}
  .ago-analytics .chip-user .dot{width:22px;height:22px;border-radius:999px;background:#1e6bff;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:800}
  .ago-analytics .page{padding:14px}
  .ago-analytics h1{margin:6px 0 4px;font-size:20px}
  .ago-analytics .sub{color:var(--muted);font-size:13px;margin-bottom:10px}
  .ago-analytics .card{background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow);padding:16px}
  .ago-analytics .stat{display:flex;align-items:center;gap:10px;padding:14px;border:1px solid var(--line);border-radius:16px;background:#fff}
  .ago-analytics .stat + .stat{margin-top:10px}
  .ago-analytics .ic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;border:1px solid var(--line)}
  .ago-analytics .ic.blue{color:#1f55ff;background:#eef4ff;border-color:#dce7ff}
  .ago-analytics .ic.green{color:#0b9b6b;background:#ecfdf5;border-color:#c4f1df}
  .ago-analytics .ic.rose{color:#d9484c;background:#fff1f2;border-color:#ffd7dc}
  .ago-analytics .stat .name{color:#6b7a93;font-size:12px}
  .ago-analytics .stat .num{font-weight:900;font-size:22px}
  .ago-analytics .week li{display:flex;align-items:center;gap:10px;padding:8px 0}
  .ago-analytics .week .d{width:20px;color:#54607a}
  .ago-analytics .stack{flex:1;height:14px;border-radius:999px;background:#eef1f6;position:relative;overflow:hidden}
  .ago-analytics .stack .good{position:absolute;left:0;top:0;height:100%;background:#1ac587}
  .ago-analytics .stack .bad{position:absolute;top:0;height:100%;right:0;background:#f88a95}
  .ago-analytics .week .total{width:46px;text-align:right;font-size:12px;color:#6b7a93}
  .ago-analytics .cat .row{display:flex;align-items:center;justify-content:space-between}
  .ago-analytics .cat .label{display:flex;align-items:center;gap:6px}
  .ago-analytics .cat .trend.up{color:#0b9b6b}
  .ago-analytics .cat .trend.down{color:#d9484c}
  .ago-analytics .pill{font-size:12px;padding:4px 8px;border-radius:999px;background:#e7f0ff;color:#295bff;font-weight:900}
  .ago-analytics .bar{margin-top:6px;height:8px;background:#eef1f6;border-radius:999px;overflow:hidden}
  .ago-analytics .bar > i{display:block;height:100%;width:0;background:#2b67ff}
  .ago-analytics .feed .hint{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-weight:900}
  .ago-analytics .bubble{border:1px solid #dbe6ff;background:#f4f8ff;color:#4b5a74;border-radius:12px;padding:12px;line-height:1.6}
  .ago-analytics .btn-primary{width:100%;border:none;border-radius:14px;padding:14px 16px;margin:16px 0 24px;background:linear-gradient(90deg,var(--blue),var(--blue-700));color:#fff;font-weight:900;font-size:16px;box-shadow:0 10px 24px rgba(37,99,255,.25);display:flex;justify-content:center;align-items:center;gap:10px}
  `;

  return `
  <section class="ago-analytics">
    <style>${css}</style>

    <!-- topbar -->
    <header class="topbar">
      <div class="row">
        <button class="btn-ic" id="openDrawer" aria-label="메뉴">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <div class="title">
          <span class="badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6f4ef6" stroke-width="2">
              <path d="M3 3v18M3 12h18M12 3v18"/>
            </svg>
          </span>
          학습 분석
        </div>
      </div>
      <div class="chip-user" style="cursor: pointer;">
        <span class="dot">김</span> 김운전
      </div>
    </header>

    <main class="page">
      <h1>학습 분석</h1>
      <div class="sub">나의 학습 현황을 확인해보세요.</div>

      <!-- 요약 카드들 -->
      <section class="card" aria-label="요약">
        <div class="stat">
          <span class="ic blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h8"/></svg>
          </span>
          <div style="flex:1">
            <div class="name">총 푼 문제 수</div>
            <div class="num" id="sumTotal">127</div>
          </div>
        </div>

        <div class="stat">
          <span class="ic green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
          <div style="flex:1">
            <div class="name">정답률</div>
            <div class="num" id="acc">84%</div>
          </div>
        </div>

        <div class="stat">
          <span class="ic rose">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
          <div style="flex:1">
            <div class="name">오답률</div>
            <div class="num" id="err">16%</div>
          </div>
        </div>
      </section>

      <!-- 주간 학습 현황 -->
      <section class="card" style="margin-top:12px" aria-label="주간 학습 현황">
        <div style="display:flex;align-items:center;gap:8px;font-weight:900;margin-bottom:6px">
          <span class="ic" style="background:#eef4ff;border-color:#dce7ff;color:#295bff">📊</span> 주간 학습 현황
        </div>
        <ul class="week" id="weekList" style="list-style:none;margin:0;padding:0"></ul>
      </section>

      <!-- 카테고리별 성과 -->
      <section class="card cat" style="margin-top:12px" aria-label="카테고리별 성과">
        <div style="display:flex;align-items:center;gap:8px;font-weight:900;margin-bottom:8px">
          <span class="ic" style="background:#f5f3ff;border-color:#e6e1ff;color:#6f4ef6">📈</span> 카테고리별 성과
        </div>

        <div class="row">
          <div class="label">교통법규 <span class="trend up">↑</span></div>
          <div><span class="muted">45문제</span> <span class="pill">92%</span></div>
        </div>
        <div class="bar"><i style="width:92%"></i></div>

        <div class="row" style="margin-top:10px">
          <div class="label">안전운전 <span class="trend up">↑</span></div>
          <div><span class="muted">38문제</span> <span class="pill">88%</span></div>
        </div>
        <div class="bar"><i style="width:88%"></i></div>

        <div class="row" style="margin-top:10px">
          <div class="label">도로표지 <span class="trend down">↓</span></div>
          <div><span class="muted">32문제</span> <span class="pill">76%</span></div>
        </div>
        <div class="bar"><i style="width:76%"></i></div>

        <div class="row" style="margin-top:10px">
          <div class="label">응급처치 <span class="trend up">↑</span></div>
          <div><span class="muted">12문제</span> <span class="pill">82%</span></div>
        </div>
        <div class="bar"><i style="width:82%"></i></div>
      </section>

      <!-- 맞춤형 피드백 -->
      <section class="card feed" style="margin-top:12px" aria-label="맞춤형 피드백">
        <div class="hint">🎯 맞춤형 피드백</div>
        <div class="bubble">
          교차로 상황에서의 판단력이 향상되었습니다. <br/>
          신호 위반 관련 문제에서 높은 정답률이 보이고 있으며, 차선 변경 시 안전 확인에 대한 추가 학습을 권장합니다.
        </div>
      </section>

      <button class="btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h8M8 15h6"/></svg>
        약점 보완 문제 풀기
      </button>
    </main>
  </section>`;
}

export function mount(root){
  // root는 라우터가 넘겨준 컨테이너; 이 안에 방금 반환한 마크업이 들어가 있음
  const $ = (sel, sc = root) => sc.querySelector(sel);

  // 사용자 정보 업데이트
  const user = store.get()?.user ?? { name: '김운전', email: '' };
  const userChip = $('.chip-user');
  const userDot = $('.chip-user .dot');
  const userName = $('.chip-user span:last-child');
  
  if (userChip && userDot && userName) {
    userDot.textContent = (user.name || '유').charAt(0);
    userName.textContent = user.name || '사용자';
  }

  // 사용자 이름 클릭 시 마이페이지로 이동
  if (userChip) {
    userChip.addEventListener('click', () => {
      location.hash = '#/mypage';
    });
  }

  // 햄버거 버튼 클릭 시 사이드바 열기
  const openDrawerBtn = $('#openDrawer');
  if (openDrawerBtn) {
    openDrawerBtn.addEventListener('click', () => {
      // drawer.js에서 정의된 openDrawer 함수 호출
      if (window.openDrawer) {
        window.openDrawer();
      }
    });
  }

  const weekly = [
    {d:'월', good:12, bad:3},
    {d:'화', good:15, bad:2},
    {d:'수', good:18, bad:4},
    {d:'목', good:14, bad:1},
    {d:'금', good:20, bad:3},
    {d:'토', good:16, bad:2},
    {d:'일', good:22, bad:1},
  ];

  const list = $('#weekList');
  if (list){
    list.innerHTML = '';
    weekly.forEach(({d,good,bad})=>{
      const total = good + bad;
      const goodPct = total ? (good/total*100) : 0;
      const badPct  = total ? (bad/total*100)  : 0;
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="d">${d}</span>
        <div class="stack" aria-label="${d} 요일 진행">
          <div class="good" style="width:${goodPct}%"></div>
          <div class="bad" style="width:${badPct}%;"></div>
        </div>
        <span class="total">${total}문제</span>
      `;
      list.appendChild(li);
    });
  }

  // 이벤트 리스너 정리 함수 반환
  return () => {
    if (userChip) {
      userChip.removeEventListener('click', () => {});
    }
    if (openDrawerBtn) {
      openDrawerBtn.removeEventListener('click', () => {});
    }
  };
}
