// app/views/mypage/mypage.js
import { store } from '../../js/store.js';

export async function render() {
  // CSS와 HTML을 직접 반환
  const css = `
  .mypage{width:360px;min-height:100dvh;display:flex;flex-direction:column;font-family:"Pretendard","Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;--bg:#f6f8fb;--card:#fff;--line:#e6e8ee;--text:#0f172a;--muted:#66748c;--blue:#2563ff;--blue-700:#1f54f0;--blue-050:#eef4ff;--green:#10b981;--green-050:#ecfdf5;--rose:#ef4444;--rose-050:#fff1f2;--shadow:0 8px 28px rgba(15,23,42,.06);--radius:18px;--focus:0 0 0 3px rgba(37,99,255,.18);color:var(--text);background:var(--bg)}
  .mypage .topbar{position:sticky;top:0;z-index:10;background:#fff;border-bottom:1px solid var(--line);padding:16px;display:flex;align-items:center;justify-content:space-between}
  .mypage .topbar .menu-btn{width:24px;height:24px;border:none;background:none;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center}
  .mypage .topbar .menu-btn svg{width:20px;height:20px;stroke:var(--text);stroke-width:2}
  .mypage .topbar .brand{font-weight:900;font-size:18px;color:var(--blue)}
  .mypage .topbar .chip{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--line);border-radius:20px;background:var(--card);cursor:pointer;transition:all .2s}
  .mypage .topbar .chip:hover{transform:translateY(-1px);box-shadow:var(--shadow)}
  .mypage .topbar .chip .avatar{width:24px;height:24px;border-radius:999px;background:var(--blue);color:#fff;display:grid;place-items:center;font-size:12px;font-weight:900}
  .mypage .topbar .chip .name{font-weight:700;color:var(--text)}
  .mypage .hero{padding:20px 16px 18px;background:linear-gradient(160deg,#1261ff 0%, #3f57ff 38%, #5a3df8 72%, #7e31f3 100%);color:#fff;position:relative;overflow:hidden;box-shadow:0 14px 30px rgba(54,80,255,.25)}
  .mypage .hero .top{display:flex;gap:12px;align-items:center}
  .mypage .avatar{width:64px;height:64px;border-radius:999px;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.55);display:grid;place-items:center;font-size:28px}
  .mypage .who .name{font-weight:900;font-size:20px}
  .mypage .who .meta{display:flex;align-items:center;gap:8px;color:#e7ecff;font-size:12px;margin-top:6px}
  .mypage .who .meta svg{opacity:.9}
  .mypage .stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
  .mypage .stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:16px;text-align:center}
  .mypage .stat .badge{font-size:24px;margin-bottom:8px;display:block}
  .mypage .stat .num{font-weight:900;font-size:18px;margin-bottom:4px}
  .mypage .stat .cap{font-size:11px;opacity:.9}
  .mypage .section{padding:16px}
  .mypage .sec-title{display:flex;align-items:center;gap:8px;font-weight:900;font-size:16px;margin-bottom:16px;color:var(--text)}
  .mypage .item{display:flex;align-items:center;gap:12px;padding:16px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-bottom:8px;cursor:pointer;transition:all .2s}
  .mypage .item:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
  .mypage .i-left{font-size:20px}
  .mypage .i-title{font-weight:700;margin-bottom:4px}
  .mypage .i-sub{font-size:13px;color:var(--muted)}
  .mypage .chev{margin-left:auto;opacity:.5}
  .mypage .logout-wrap{margin-top:24px}
  .mypage .logout{width:100%;padding:16px;border:1px solid var(--rose);border-radius:16px;background:var(--rose);color:#fff;font-weight:900;font-size:16px;cursor:pointer;transition:all .2s}
  .mypage .logout:hover{background:var(--rose-700);transform:translateY(-2px)}
  .mypage .overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);display:none;z-index:1000}
  .mypage .overlay.show{display:flex;align-items:center;justify-content:center}
  .mypage .dialog{background:var(--card);border-radius:20px;padding:24px;text-align:center;max-width:300px;width:90%}
  .mypage .dicon{width:46px;height:46px;border-radius:999px;background:#ffeeef;border:1px solid #ffd9dc;color:#d33;display:grid;place-items:center;margin:0 auto 10px}
  .mypage .dialog h3{margin:4px 0 6px}
  .mypage .dialog p{margin:0 0 12px;color:#6b7a93}
  .mypage .btns{display:flex;gap:10px;margin-top:16px}
  .mypage .btn{flex:1;padding:12px;border-radius:12px;border:1px solid var(--line);background:#f3f5f8;font-weight:900;cursor:pointer}
  .mypage .btn-danger{border-color:#ef4444;background:#ef4444;color:#fff}
  `;

  return `
  <section class="mypage">
    <style>${css}</style>

    <!-- 헤더 -->
    <header class="topbar">
      <button id="openDrawer" class="menu-btn" aria-label="메뉴 열기">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div class="brand">AI-Go</div>
      <div class="chip" onclick="location.hash='#/mypage'">
        <div class="avatar">김</div>
        <span class="name">김운전</span>
      </div>
    </header>

    <!-- 프로필 섹션 -->
    <header class="hero" role="banner">
      <div class="top">
        <div class="avatar">👤</div>
        <div class="who">
          <div class="name">김운전</div>
          <div class="meta">
            <span>1@email.com</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <div class="meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>가입일: 2025-09-13</span>
          </div>
        </div>
      </div>

      <!-- 통계 카드 -->
      <div class="stats" aria-label="요약 통계">
        <div class="stat">
          <span class="badge">🏆</span>
          <div class="num" id="quizCount">47</div>
          <div class="cap">완료한 퀴즈</div>
        </div>
        <div class="stat">
          <span class="badge">🎯</span>
          <div class="num" id="accuracy">89%</div>
          <div class="cap">정답률</div>
        </div>
        <div class="stat">
          <span class="badge">📈</span>
          <div class="num" id="streakDays">12일</div>
          <div class="cap">연속 학습</div>
        </div>
        <div class="stat">
          <span class="badge">⏰</span>
          <div class="num" id="studyHours">24시간</div>
          <div class="cap">총 학습시간</div>
        </div>
      </div>
    </header>

    <main class="section">
      <div class="sec-title">⚙ 설정 및 관리</div>
      <button type="button" class="item">
        <span class="i-left">✏️</span>
        <div>
          <div class="i-title">프로필 수정</div>
          <div class="i-sub">개인정보 및 프로필 사진 변경</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <button type="button" class="item">
        <span class="i-left">🔔</span>
        <div>
          <div class="i-title">알림 설정</div>
          <div class="i-sub">학습 알림 및 푸시 알림 관리</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <button type="button" class="item">
        <span class="i-left">🛡️</span>
        <div>
          <div class="i-title">개인정보 보호</div>
          <div class="i-sub">비밀번호 변경 및 보안 설정</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <button type="button" class="item">
        <span class="i-left">📖</span>
        <div>
          <div class="i-title">학습 기록</div>
          <div class="i-sub">상세한 학습 이력 및 성과 확인</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <button type="button" class="item">
        <span class="i-left">❓</span>
        <div>
          <div class="i-title">도움말 및 지원</div>
          <div class="i-sub">자주 묻는 질문 및 고객 지원</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <button type="button" class="item">
        <span class="i-left">⚙️</span>
        <div>
          <div class="i-title">앱 설정</div>
          <div class="i-sub">테마, 언어 및 기타 앱 설정</div>
        </div>
        <span class="chev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
      <div class="logout-wrap">
        <button id="logoutBtn" class="logout" type="button">↪ 로그아웃</button>
      </div>
    </main>

    <!-- 로그아웃 팝업 -->
    <div id="logoutModal" class="overlay" role="dialog" aria-modal="true" aria-labelledby="dlgTitle" aria-describedby="dlgDesc">
      <div class="dialog">
        <div class="dicon">↪</div>
        <h3 id="dlgTitle">로그아웃</h3>
        <p id="dlgDesc">정말로 로그아웃 하시겠습니까?</p>
        <div class="btns">
          <button id="cancelBtn" class="btn" type="button">취소</button>
          <button id="confirmBtn" class="btn btn-danger" type="button">로그아웃</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function mount(root) {
  // root는 라우터가 넘겨준 컨테이너; 이 안에 방금 반환한 마크업이 들어가 있음
  const $ = (sel, sc = root) => sc.querySelector(sel);

  // 사용자 정보와 통계 데이터 가져오기
  const user = store.get()?.user ?? { name: '김운전', email: '1@email.com' };
  const stats = store.get()?.stats ?? { quizzes: 47, accuracy: 89, streakDays: 12, studyHours: 24 };

  // 헤더 사용자 정보 업데이트
  const headerAvatarEl = $('.topbar .chip .avatar');
  const headerNameEl = $('.topbar .chip .name');
  
  if (headerAvatarEl) headerAvatarEl.textContent = (user.name || '유').trim().charAt(0) || '👤';
  if (headerNameEl) headerNameEl.textContent = user.name || '사용자';

  // 프로필 섹션 사용자 정보 업데이트
  const nameEl = $('.who .name');
  const emailEl = $('.who .meta span');
  const avatarEl = $('.avatar');
  
  if (nameEl) nameEl.textContent = user.name || '사용자';
  if (emailEl) emailEl.textContent = user.email || '1@email.com';
  if (avatarEl) avatarEl.textContent = (user.name || '유').trim().charAt(0) || '👤';

  // 통계 정보 업데이트
  const quizCountEl = $('#quizCount');
  const accuracyEl = $('#accuracy');
  const streakDaysEl = $('#streakDays');
  const studyHoursEl = $('#studyHours');

  if (quizCountEl) quizCountEl.textContent = stats.quizzes;
  if (accuracyEl) accuracyEl.textContent = stats.accuracy + '%';
  if (streakDaysEl) streakDaysEl.textContent = stats.streakDays + '일';
  if (studyHoursEl) studyHoursEl.textContent = stats.studyHours + '시간';

  // 햄버거 버튼 이벤트 리스너
  const menuBtn = $('#openDrawer');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      if (window.openDrawer) {
        window.openDrawer();
      }
    });
  }

  // 로그아웃 모달 기능
  const modal = $('#logoutModal');
  const openBtn = $('#logoutBtn');
  const cancelBtn = $('#cancelBtn');
  const confirmBtn = $('#confirmBtn');

  console.log('Modal elements:', { modal, openBtn, cancelBtn, confirmBtn }); // 디버깅용

  const openModal = () => {
    console.log('Opening modal...'); // 디버깅용
    if (modal) {
      modal.classList.add('show');
      console.log('Modal opened, classes:', modal.className); // 디버깅용
      // 모달이 열릴 때 확인 버튼에 포커스
      setTimeout(() => confirmBtn?.focus(), 100);
    } else {
      console.error('Modal element not found!'); // 디버깅용
    }
  };
  
  const closeModal = () => {
    console.log('Closing modal...'); // 디버깅용
    if (modal) {
      modal.classList.remove('show');
      console.log('Modal closed, classes:', modal.className); // 디버깅용
      // 모달이 닫힐 때 로그아웃 버튼에 포커스 복원
      openBtn?.focus();
    }
  };

  // 로그아웃 버튼 클릭 시 모달 열기
  if (openBtn) {
    console.log('Adding click listener to logout button'); // 디버깅용
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Logout button clicked!'); // 디버깅용
      openModal();
    });
  } else {
    console.error('Logout button not found!'); // 디버깅용
  }

  // 취소 버튼 클릭 시 모달 닫기
  if (cancelBtn) {
    console.log('Adding click listener to cancel button'); // 디버깅용
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Cancel button clicked!'); // 디버깅용
      closeModal();
    });
  } else {
    console.error('Cancel button not found!'); // 디버깅용
  }

  // 모달 외부 클릭 시 닫기
  if (modal) {
    console.log('Adding click listener to modal overlay'); // 디버깅용
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        console.log('Modal overlay clicked!'); // 디버깅용
        closeModal();
      }
    });
  } else {
    console.error('Modal overlay not found!'); // 디버깅용
  }

  // 확인 버튼 클릭 시 로그아웃 처리
  if (confirmBtn) {
    console.log('Adding click listener to confirm button'); // 디버깅용
    confirmBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Confirm button clicked!'); // 디버깅용
      try {
        // 사용자 상태 초기화
        store.update(s => ({ ...s, user: null }));
        
        // 로그인 화면으로 이동
        location.hash = '#/';
        closeModal();
      } catch (err) {
        console.error('로그아웃 실패:', err);
        // 에러가 있어도 로그인 화면으로 이동
        location.hash = '#/';
        closeModal();
      }
    });
  } else {
    console.error('Confirm button not found!'); // 디버깅용
  }

  // ESC 키로 모달 닫기
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      console.log('ESC key pressed!'); // 디버깅용
      closeModal();
    }
  };
  window.addEventListener('keydown', handleKeydown);

  // 이벤트 리스너 정리 함수 반환
  return () => {
    if (menuBtn) {
      menuBtn.removeEventListener('click', () => {});
    }
    if (openBtn) {
      openBtn.removeEventListener('click', openModal);
    }
    if (cancelBtn) {
      cancelBtn.removeEventListener('click', closeModal);
    }
    if (modal) {
      modal.removeEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    if (confirmBtn) {
      confirmBtn.removeEventListener('click', () => {});
    }
    window.removeEventListener('keydown', handleKeydown);
  };
}
