// app/views/home/login.js
import { api } from '../../js/api.js';
import { store } from '../../js/store.js';

/** HTML 파일을 로드해 <style>을 head에 주입하고 .app 영역만 반환 */
async function loadViewHtml(filePath, styleId = 'login-style') {
  const html = await (await fetch(filePath, { cache: 'no-cache' })).text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // <style> 주입(중복 방지)
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
  return await loadViewHtml('./views/home/login.html');
}

export async function mount(root) {
  const $  = (s, sc = root) => sc.querySelector(s);

  // --- 요소 참조
  const form        = $('.form');
  const emailInput  = form?.querySelector('input[type="email"]');
  const pwInput     = form?.querySelector('input[type="password"]');
  const pwToggleBtn = form?.querySelector('label[aria-label="비밀번호"] button');
  const rememberChk = form?.querySelector('.remember input');
  const signupLink  = $('.signup a');
  const ctaBtn      = $('.cta .cta-btn');
  const loginLink   = $('.link-login'); // 우상단
  const menuBtn     = $('.topbar .btn-icon');

  // 드로어와 연동(있다면)
  if (menuBtn && !menuBtn.id) menuBtn.id = 'openDrawer';

  // 마지막 이메일 기억
  const lastEmail = localStorage.getItem('ai_go_last_email');
  if (lastEmail && emailInput) emailInput.value = lastEmail;

  // --- 핸들러
  const onTogglePw = () => {
    if (!pwInput) return;
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    pwInput.focus();
  };

  const go = (hash) => (e) => { e.preventDefault(); location.hash = hash; };
  const toSignup = go('#/signup');
  const toLogin  = go('#/login');

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput?.value.trim() || '';
    const password = pwInput?.value || '';

    try {
      const res = await api.login({ email, password });
      store.update((s) => ({ ...s, user: res.user }));

      // remember 체크 시 토큰/이메일 저장(토큰은 api 응답에 따라 선택)
      localStorage.setItem('ai_go_last_email', email);
      if (rememberChk?.checked && res?.token) {
        localStorage.setItem('ai_go_token', res.token);
      }

      location.hash = '#/home';
    } catch (err) {
      // TODO: figma 팝업으로 교체 가능
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.warn('login failed:', err);
    }
  };

  // --- 이벤트 연결
  pwToggleBtn?.addEventListener('click', onTogglePw);
  form?.addEventListener('submit', onSubmit);
  signupLink?.addEventListener('click', toSignup);
  ctaBtn?.addEventListener('click', toSignup);
  loginLink?.addEventListener('click', toLogin);

  // 언마운트 시 정리
  return () => {
    pwToggleBtn?.removeEventListener('click', onTogglePw);
    form?.removeEventListener('submit', onSubmit);
    signupLink?.removeEventListener('click', toSignup);
    ctaBtn?.removeEventListener('click', toSignup);
    loginLink?.removeEventListener('click', toLogin);
  };
}
