// /js/views/signup.js
import { api } from '../../js/api.js';

const STYLE = `
.sg .wrap{padding:14px}
.sg .panel{background:#fff;border:1px solid var(--line,#e6e8ee);border-radius:20px;box-shadow:0 8px 28px rgba(15,23,42,.06);padding:16px}
.sg h1{margin:6px 0 6px;font-size:22px;font-weight:900}
.sg .sub{color:#6b7a93;font-size:13px;line-height:1.6;margin-bottom:12px}
.sg .field + .field{margin-top:14px}
.sg .label{display:flex;align-items:center;gap:8px;font-weight:800;margin:6px 2px 6px;color:#22324d}
.sg .input{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line,#e6e8ee);border-radius:14px;padding:12px 12px}
.sg .input input{border:none;outline:none;width:100%;font-size:14px;background:transparent;color:var(--text,#0f172a)}
.sg .input:focus-within{box-shadow:0 0 0 3px rgba(36,107,255,.18);border-color:#cfe0ff}
.sg .hint{font-size:12px;color:#8a97aa;margin-top:6px}
.sg .split{display:flex;gap:10px;align-items:center}
.sg .split .cell{flex:1}
.sg .split .cell.small{flex:0 0 68px}
.sg .split .cell.mid{flex:0 0 86px}
.sg .split .sep{color:#bec6d6}
.sg .with-right{position:relative}
.sg .with-right .eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:10px;border:1px solid var(--line,#e6e8ee);background:#fff;display:grid;place-items:center;cursor:pointer}
.sg .btn-primary{width:100%;margin-top:16px;border:none;border-radius:14px;padding:14px 16px;background:linear-gradient(90deg,#246bff,#1e5af2);color:#fff;font-weight:900;font-size:16px;box-shadow:0 10px 24px rgba(36,107,255,.25);cursor:pointer}
.sg .terms{margin-top:12px;text-align:center;color:#8d97a9;font-size:12px}
.sg .terms a{color:#3a63ff;text-decoration:none;font-weight:800}
.sg .overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;place-items:center;z-index:30}
.sg .overlay.show{display:grid}
.sg .dialog{width:320px;background:#fff;border:1px solid var(--line,#e6e8ee);border-radius:16px;box-shadow:0 8px 28px rgba(15,23,42,.06);padding:16px;text-align:center}
.sg .dialog .msg{color:#5a6a85;font-weight:700;margin:10px 0 14px}
.sg .dialog .ok{display:block;width:100%;border:none;border-radius:12px;padding:12px 16px;background:linear-gradient(90deg,#246bff,#1e5af2);color:#fff;font-weight:900;cursor:pointer}
`;

function ensureStyle(){
  if (!document.getElementById('signup-css')){
    const s = document.createElement('style');
    s.id = 'signup-css';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }
}

export async function render(){
  ensureStyle();
  return `
  <section class="sg">
    <div class="wrap">
      <section class="panel" aria-label="회원가입 양식">
        <h1>계정 만들기</h1>
        <p class="sub">아이-고 회원이 되어 더 많은 기능을 이용하세요</p>

        <form id="sg-form" novalidate>
          <div class="field">
            <div class="label"><span class="ic">👤</span> 이름</div>
            <label class="input"><input id="sg-name" type="text" placeholder="이름을 입력하세요." autocomplete="name" required></label>
          </div>

          <div class="field">
            <div class="label"><span class="ic">📞</span> 전화번호</div>
            <div class="split">
              <div class="cell small"><label class="input"><input id="sg-ph1" inputmode="numeric" maxlength="3" placeholder="010"></label></div>
              <span class="sep">-</span>
              <div class="cell mid"><label class="input"><input id="sg-ph2" inputmode="numeric" maxlength="4" placeholder="0000"></label></div>
              <span class="sep">-</span>
              <div class="cell mid"><label class="input"><input id="sg-ph3" inputmode="numeric" maxlength="4" placeholder="0000"></label></div>
            </div>
          </div>

          <div class="field">
            <div class="label"><span class="ic">✉️</span> 이메일</div>
            <div class="split">
              <div class="cell"><label class="input"><input id="sg-emailId" type="text" placeholder="admin" autocomplete="email"></label></div>
              <span class="sep">@</span>
              <div class="cell"><label class="input"><input id="sg-emailDomain" type="text" placeholder="email.com"></label></div>
            </div>
          </div>

          <div class="field">
            <div class="label"><span class="ic">📅</span> 생년월일</div>
            <div class="split">
              <div class="cell mid"><label class="input"><input id="sg-yy" inputmode="numeric" maxlength="4" placeholder="0000"></label></div>
              <span class="sep">년</span>
              <div class="cell small"><label class="input"><input id="sg-mm" inputmode="numeric" maxlength="2" placeholder="00"></label></div>
              <span class="sep">월</span>
              <div class="cell small"><label class="input"><input id="sg-dd" inputmode="numeric" maxlength="2" placeholder="00"></label></div>
              <span class="sep">일</span>
            </div>
          </div>

          <div class="field">
            <div class="label"><span class="ic">🔒</span> 비밀번호 <span class="hint">(8자 이상)</span></div>
            <div class="with-right">
              <label class="input"><input id="sg-pw" type="password" placeholder="비밀번호를 입력하세요." minlength="8" required></label>
              <button class="eye" type="button" aria-label="비밀번호 보기" data-toggle="#sg-pw">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <div class="field">
            <div class="label"><span class="ic">🔒</span> 비밀번호 확인</div>
            <div class="with-right">
              <label class="input"><input id="sg-pw2" type="password" placeholder="비밀번호를 다시 입력하세요." minlength="8" required></label>
              <button class="eye" type="button" aria-label="비밀번호 보기" data-toggle="#sg-pw2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-primary">회원가입</button>
          <div class="terms">회원가입을 진행하면 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.</div>
        </form>
      </section>
    </div>

    <div id="sg-modal" class="overlay" role="dialog" aria-modal="true">
      <div class="dialog">
        <div id="sg-msg" class="msg">모든 정보를 입력해주세요</div>
        <button id="sg-ok" class="ok" type="button">확인</button>
      </div>
    </div>
  </section>`;
}

export function mount(root){
  const $  = (s,sc=root)=>sc.querySelector(s);
  const $$ = (s,sc=root)=>Array.from(sc.querySelectorAll(s));

  // 숫자만 + 자동 이동
  const onlyDigits = (e)=>{ e.target.value = e.target.value.replace(/\D+/g,''); };
  const autoMove = (e)=>{
    const t=e.target, max=t.getAttribute('maxlength');
    if(max && t.value.length>=+max){
      const group=t.closest('.split')?.querySelectorAll('input'); if(!group) return;
      const arr=[...group]; const i=arr.indexOf(t); if(i>-1 && arr[i+1]) arr[i+1].focus();
    }
  };
  $$('#sg-ph1,#sg-ph2,#sg-ph3,#sg-yy,#sg-mm,#sg-dd').forEach(i=>{
    i.addEventListener('input', onlyDigits);
    i.addEventListener('input', autoMove);
  });

  // 비밀번호 보기
  const eyes = $$('.eye');
  const onEye = (btn)=>()=>{
    const target = $(btn.dataset.toggle);
    if(target){ target.type = target.type === 'password' ? 'text' : 'password'; target.focus(); }
  };
  const eyeHandlers = eyes.map(btn => { const fn=onEye(btn); btn.addEventListener('click', fn); return [btn,fn]; });

  // 모달
  const modal = $('#sg-modal'); const msg = $('#sg-msg'); const ok = $('#sg-ok');
  let afterOk = null;
  const openModal = (m, next=null)=>{ msg.textContent=m; modal.classList.add('show'); afterOk=next; ok.focus(); };
  const closeModal = ()=>{ modal.classList.remove('show'); afterOk=null; };
  const onOk = ()=>{ closeModal(); if(afterOk) afterOk(); };
  ok.addEventListener('click', onOk);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  const onEsc = (e)=>{ if(e.key==='Escape' && modal.classList.contains('show')) closeModal(); };
  window.addEventListener('keydown', onEsc);

  // 제출
  const form = $('#sg-form');
  const onSubmit = async (e)=>{
    e.preventDefault();
    const name = $('#sg-name').value.trim();
    const ph1=$('#sg-ph1').value.trim(), ph2=$('#sg-ph2').value.trim(), ph3=$('#sg-ph3').value.trim();
    const emailId=$('#sg-emailId').value.trim(), emailDomain=$('#sg-emailDomain').value.trim();
    const yy=$('#sg-yy').value.trim(), mm=$('#sg-mm').value.trim(), dd=$('#sg-dd').value.trim();
    const pw=$('#sg-pw').value, pw2=$('#sg-pw2').value;

    if(!name||!ph1||!ph2||!ph3||!emailId||!emailDomain||!yy||!mm||!dd||!pw||!pw2)
      return openModal('모든 정보를 입력해주세요');

    const email = `${emailId}@${emailDomain}`;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailOk) return openModal('이메일/비밀번호를 다시 확인해주세요.');

    if(ph1.length!==3 || ph2.length!==4 || ph3.length!==4)
      return openModal('전화번호를 다시 확인해주세요.');

    const y=+yy,m=+mm,d=+dd; const dateOk = y>=1900 && y<=2100 && m>=1 && m<=12 && d>=1 && d<=31;
    if(!dateOk) return openModal('생년월일을 다시 확인해주세요.');

    if(pw.length<8) return openModal('비밀번호는 8자 이상이어야 합니다.');
    if(pw!==pw2)   return openModal('비밀번호가 일치하지 않습니다.');

    const payload = { name, email, phone:`${ph1}-${ph2}-${ph3}`, birth:`${yy}-${mm}-${dd}` };
    try{
      if (typeof api.signup === 'function') {
        await api.signup({ ...payload, password: pw });
      } else {
        await new Promise(r=>setTimeout(r,400)); // mock
      }
      openModal('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.', ()=>{ 
        location.hash = '#/'; 
      });
    }catch(err){
      console.error(err);
      openModal('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  form.addEventListener('submit', onSubmit);

  // 언마운트 클린업
  return ()=> {
    form?.removeEventListener('submit', onSubmit);
    eyeHandlers.forEach(([btn,fn])=>btn.removeEventListener('click', fn));
    ok.removeEventListener('click', onOk);
    window.removeEventListener('keydown', onEsc);
  };
}
