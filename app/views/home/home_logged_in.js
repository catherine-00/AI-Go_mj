// app/views/home/home_logged_in.js
import { api }  from '../../js/api.js';
import { store } from '../../js/store.js';

/** HTML 파일을 읽어 <style>을 head에 주입하고 .app 영역만 반환 */
async function loadViewHtml(filePath, styleId = 'home-logged-style') {
  const html = await (await fetch(filePath, { cache: 'no-cache' })).text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // <style> 주입(한 번만)
  const style = doc.querySelector('style');
  if (style) {
    let s = document.getElementById(styleId);
    if (!s) {
      s = document.createElement('style');
      s.id = styleId;
      document.head.appendChild(s);
    }
    s.textContent = style.textContent;
  }

  const root = doc.querySelector('.app') || doc.body;
  return root.outerHTML;
}

export async function render() {
  // index.html 기준 경로
  return await loadViewHtml('./views/home/home_logged_in.html');
}

export async function mount(root) {
  const $  = (s, sc = root) => sc.querySelector(s);
  const $$ = (s, sc = root) => Array.from(sc.querySelectorAll(s));

  // 1) 햄버거 버튼 → 드로어 열기 호환(버튼에 id 없으면 추가)
  const menuBtn = $('.topbar .btn-icon');
  if (menuBtn && !menuBtn.id) menuBtn.id = 'openDrawer'; // drawer.js가 이 id를 바라보는 경우 호환됨

  // 2) 사용자 이름 클릭 시 마이페이지로 이동
  const userChip = $('.chip');
  const goToMypage = () => {
    location.hash = '#/mypage';
  };
  if (userChip) {
    userChip.style.cursor = 'pointer';
    userChip.addEventListener('click', goToMypage);
  }

  // 3) 사용자명/아바타 채우기 (store 기준)
  const user = store.get()?.user ?? { name: '김운전', email: '' };
  const avatar = $('.chip .avatar');
  const nameChip = $('.chip span:last-child');
  const nameInHello = $('.hello .name');

  if (avatar) avatar.textContent = (user.name || '유저').trim().charAt(0) || '유';
  if (nameChip) nameChip.textContent = user.name || '사용자';
  if (nameInHello) nameInHello.textContent = user.name || '사용자';

  // 3) 대시보드 데이터 (API 있으면 사용, 없으면 HTML에 있는 기본값으로)
  let data = {
    completed: 47,
    accuracy: 89,
    streakDays: 12,
    totalHours: 24,
    weekly: { goal: 0.75, days: [true, true, true, true, true, false, false], todayIndex: 4 },
  };
  try {
    if (typeof api.dashboard === 'function') {
      const res = await api.dashboard();
      // res의 속성이 일부만 와도 안전하게 병합
      data = {
        ...data,
        ...res,
        weekly: { ...data.weekly, ...(res?.weekly || {}) },
      };
    }
  } catch (_) { /* 폴백 사용 */ }

  // 4) 카드 값 채우기
  // grid의 각 카드에서 숫자 span은 .value > span:last-child
  const cards = $$('.grid .card');
  const setNum = (el, v) => el && (el.textContent = v);

  setNum(cards?.[0]?.querySelector('.value span:last-child'), `${data.completed}`);
  setNum(cards?.[1]?.querySelector('.value span:last-child'), `${data.accuracy}%`);
  setNum(cards?.[2]?.querySelector('.value span:last-child'), `${data.streakDays}일`);
  setNum(cards?.[3]?.querySelector('.value span:last-child'), `${data.totalHours}시간`);

  // 5) 이번 주 학습(게이지/요일)
  const goalPct = Math.max(0, Math.min(100, Math.round((data.weekly.goal || 0) * 100)));
  const goalStrong = $('.week-top strong');
  const bar = $('.week-card .bar > i');
  if (goalStrong) goalStrong.textContent = `${goalPct}%`;
  if (bar) bar.style.width = `${goalPct}%`;

  const dots = $$('.weekday .dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('done', 'today');
    if (data.weekly.days?.[i]) dot.classList.add('done');
    if (i === data.weekly.todayIndex) dot.classList.add('today');
  });

  // 6) 빠른 실행 타일 라우팅
  const [tileQuiz, tileWrong, tileAnalytics] = $$('.list .tile');
  const to = (hash) => (e) => { e.preventDefault(); location.hash = hash; };

  tileQuiz?.addEventListener('click', to('#/quiz'));
  tileWrong?.addEventListener('click', to('#/wrong'));
  tileAnalytics?.addEventListener('click', to('#/analytics'));

  // 7) 빠른 실행 타일의 href 속성도 설정
  if (tileQuiz) tileQuiz.href = '#/quiz';
  if (tileWrong) tileWrong.href = '#/wrong';
  if (tileAnalytics) tileAnalytics.href = '#/analytics';

  // 언마운트 시 이벤트 정리
  return () => {
    tileQuiz?.removeEventListener('click', to('#/quiz'));
    tileWrong?.removeEventListener('click', to('#/wrong'));
    tileAnalytics?.removeEventListener('click', to('#/analytics'));
    
    // 사용자 이름 클릭 이벤트 정리
    if (userChip) {
      userChip.removeEventListener('click', goToMypage);
    }
  };
}
