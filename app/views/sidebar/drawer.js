// app/views/sidebar/drawer.js
import { store } from '../../js/store.js';

/** sidebar.html을 읽어서 <style>을 head에 주입하고,
 *  #overlay / #drawer 노드를 DOM에 1회만 추가 */
async function ensureDrawerInjected(filePath = './views/sidebar/sidebar.html', styleId = 'drawer-style') {
  // 이미 주입돼 있으면 스킵
  const hasOverlay = document.getElementById('overlay');
  const hasDrawer  = document.getElementById('drawer');
  if (hasOverlay && hasDrawer) return { overlay: hasOverlay, drawer: hasDrawer };

  const html = await (await fetch(filePath, { cache: 'no-cache' })).text();
  const doc  = new DOMParser().parseFromString(html, 'text/html');

  // 스타일 주입 (중복 방지)
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

  // 원본 HTML에서 overlay / drawer만 꺼내서 body에 붙임
  const overlay = doc.getElementById('overlay');
  const drawer  = doc.getElementById('drawer');

  if (!overlay || !drawer) {
    throw new Error('sidebar.html에 #overlay 또는 #drawer가 없습니다.');
  }

  // 페이지에 이미 동일 id가 있으면 제거 후 교체
  document.getElementById('overlay')?.remove();
  document.getElementById('drawer')?.remove();

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  return { overlay, drawer };
}

/** 라우트 → 네비게이션 매핑 */
function currentPath() {
  const h = (location.hash || '').replace(/^#/, '');
  if (!h || h === '/') return '/';
  // #/login도 홈으로 처리 (로그인 화면)
  if (h === '/login') return '/';
  return h;
}

function setActive(drawer) {
  drawer.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const path = currentPath();
  const map = {
    '/':          '[data-route="home"]',
    '/home':      '[data-route="home"]',
    '/quiz':      '[data-route="quiz"]',
    '/wrong':     '[data-route="wrong"]',
    '/analytics': '[data-route="analytics"]',
  };
  const sel = map[path] || map['/'];
  const a = drawer.querySelector(sel);
  if (a) a.classList.add('active');
}

/** 포커스 트랩 */
function trapKeydownFactory(drawer, onClose) {
  const focusableSel = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  return function onKeydown(e) {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key !== 'Tab') return;
    const items = drawer.querySelectorAll(focusableSel);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  };
}

/** 로그인 필요 팝업 표시 */
function showLoginRequiredPopup() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 16px;
    max-width: 300px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  `;
  
  content.innerHTML = `
    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1f2a44;">로그인이 필요합니다</h3>
    <p style="margin: 0 0 24px 0; color: #666; font-size: 14px;">이 기능을 사용하려면 로그인이 필요합니다.</p>
    <button id="confirmBtn" style="
      background: #246bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      font-size: 14px;
    ">확인</button>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // 확인 버튼 클릭 시 로그인 화면으로 이동
  const confirmBtn = content.querySelector('#confirmBtn');
  confirmBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
    location.hash = '#/';
  });
  
  // 모달 외부 클릭 시에도 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      location.hash = '#/';
    }
  });
}

/** 사용자 정보 업데이트 */
function updateUserInfo(drawer) {
  const user = store.get()?.user;
  const profileEl = drawer.querySelector('#userProfile');
  const loginRequiredEl = drawer.querySelector('#loginRequired');
  
  if (profileEl && loginRequiredEl) {
    if (user) {
      // 로그인된 상태: 사용자 정보 표시, 로그인 필요 메시지 숨김
      profileEl.style.display = 'flex';
      loginRequiredEl.style.display = 'none';
      
      const nameEl = drawer.querySelector('.who .name');
      const mailEl = drawer.querySelector('.who .mail');
      const avatar = drawer.querySelector('.avatar');
      
      if (nameEl) nameEl.textContent = user.name || '사용자';
      if (mailEl) mailEl.textContent = user.email || 'email@example.com';
      if (avatar) avatar.textContent = (user.name || '유저').trim().charAt(0) || '유';
    } else {
      // 로그인하지 않은 상태: 사용자 정보 숨김, 로그인 필요 메시지 표시
      profileEl.style.display = 'none';
      loginRequiredEl.style.display = 'block';
    }
  }
}

/** 외부에서 한 번만 호출하면 전역 드로어가 작동 */
export async function mountDrawer() {
  const { overlay, drawer } = await ensureDrawerInjected();

  // 초기 사용자 정보 설정
  updateUserInfo(drawer);

  // 상태/도구
  let lastFocused = null;
  const closeBtn = drawer.querySelector('#closeDrawerBtn');

  const onKeydown = trapKeydownFactory(drawer, closeDrawer);

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add('open');
    overlay.classList.add('show');
    drawer.removeAttribute('aria-hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // 사이드바가 열릴 때마다 사용자 정보 업데이트
    updateUserInfo(drawer);
    
    setActive(drawer);
    // 접근성: 첫 포커스
    setTimeout(() => closeBtn?.focus(), 10);
    window.addEventListener('keydown', onKeydown);
  }

  // 전역으로 노출 (다른 파일에서 호출할 수 있도록)
  window.openDrawer = openDrawer;

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  // 오버레이/닫기 버튼
  overlay.addEventListener('click', closeDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  // ▶︎ "열기" 트리거: id 들 + aria-label 기반 버튼도 지원
  const openMatch = (t) =>
    t.closest('#openDrawer') || t.closest('#openDrawerBtn') || t.closest('.btn-icon[aria-label="메뉴"]');

  const onDocClick = (e) => {
    const btn = openMatch(e.target);
    if (btn) {
      e.preventDefault();
      openDrawer();
    }
  };
  document.addEventListener('click', onDocClick);

  // 뷰가 바뀔 때 버튼이 새로 생길 수 있으니, 해시 변동 시 active 동기화
  const onHash = () => setActive(drawer);
  window.addEventListener('hashchange', onHash);
  setActive(drawer);

  // 네비 클릭 → 닫고 active 반영 (라우팅은 해시가 처리)
  drawer.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', (e) => {
      const route = a.getAttribute('data-route');
      const user = store.get()?.user;
      
      // 홈은 항상 접근 가능
      if (route === 'home') {
        closeDrawer();
        return;
      }
      
      // 로그인이 필요한 카테고리들
      if (['quiz', 'wrong', 'analytics'].includes(route)) {
        if (!user) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          // href 속성 임시 제거하여 이동 방지
          const originalHref = a.getAttribute('href');
          a.removeAttribute('href');
          
          closeDrawer();
          showLoginRequiredPopup();
          
          // 팝업이 닫힌 후 href 복원
          setTimeout(() => {
            if (originalHref) {
              a.setAttribute('href', originalHref);
            }
          }, 100);
          
          return;
        }
      }
      
      closeDrawer();
    });
  });

  // store 변경 시 사용자 정보 업데이트
  store.subscribe(() => {
    updateUserInfo(drawer);
  });

  // 로그인 버튼 클릭 이벤트 추가
  const loginBtn = drawer.querySelector('.login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      closeDrawer();
      location.hash = '#/';
    });
  }

  // 정리 함수가 필요하면 여기서 반환할 수도 있음
  // (지금은 앱 전역으로 계속 쓰니 반환 생략)
}
