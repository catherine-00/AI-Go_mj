const LS_KEY = 'ai_go_state_v1';
const listeners = new Set();

const initial = {
  user: null, // 로그인하지 않은 상태로 초기화
  stats: { quizzes:47, accuracy:89, streakDays:12, studyHours:24 },
  // 퀴즈/오답노트 등 필요한 전역 상태 추가
};

let state = (()=> {
  try { return {...initial, ...(JSON.parse(localStorage.getItem(LS_KEY))||{})}; }
  catch { return initial; }
})();

const notify = () => {
  listeners.forEach(fn => fn(state));
  
  // 상단바 사용자 정보 업데이트 - 항상 숨김 (home_logged_in.html의 상단바 사용)
  const mainTopbar = document.getElementById('mainTopbar');
  if (mainTopbar) {
    mainTopbar.style.display = 'none';
  }
};

export const store = {
  get: () => state,
  set: (patch) => { state = {...state, ...patch}; localStorage.setItem(LS_KEY, JSON.stringify(state)); notify(); },
  update: (fn) => { state = fn(state); localStorage.setItem(LS_KEY, JSON.stringify(state)); notify(); },
  subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
};
