import { store } from '../../js/store.js';

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-go-quiz]');
  if (!btn) return;

  const level = btn.dataset.level || '초급';
  // 선택 난이도 저장
  const prev = store.get() || {};
  store.set({ ...prev, quiz: { ...(prev.quiz||{}), initialLevel: level } });

  // SPA 라우팅 (사용 중인 라우터에 맞게 변경)
  location.hash = '#/quiz'; // 또는 router.push('/quiz')
});


/** 모듈 기준으로 quiz.html을 읽어 <style> 주입 + .app + #modal 반환 */
async function loadViewHtml(styleId = 'quiz-style') {
  const fileUrl = new URL('./quiz.html', import.meta.url); // ✅ 경로 안전
  const html = await (await fetch(fileUrl, { cache: 'no-cache' })).text();
  const doc  = new DOMParser().parseFromString(html, 'text/html');

  const style = doc.querySelector('style');
  if (style) {
    let s = document.getElementById(styleId);
    if (!s) { s = document.createElement('style'); s.id = styleId; document.head.appendChild(s); }
    s.textContent = style.textContent;
  }
  const app   = doc.querySelector('.app') || doc.body;
  const modal = doc.querySelector('#modal');
  return app.outerHTML + (modal ? modal.outerHTML : '');
}

export async function render() {
  return await loadViewHtml();
}

export async function mount(root) {
  const $  = (s, sc = root) => sc.querySelector(s);
  const $$ = (s, sc = root) => Array.from(sc.querySelectorAll(s));

  // 유저칩
  const user = store.get()?.user ?? { name: '김운전' };
  const chipDot  = $('.chip-user .dot');
  const chipWrap = $('.chip-user');
  if (chipDot) chipDot.textContent = (user.name || '유저').trim().charAt(0) || '유';
  if (chipWrap) { const t = chipWrap.childNodes[1]; if (t) t.textContent = ` ${user.name || '사용자'}`; }

  // 햄버거 → 드로어 연동
  const menuBtn = $('.topbar .btn-ic');
  if (menuBtn && !menuBtn.id) menuBtn.id = 'openDrawer';

  // 뷰 노드
  const views = {
    level : $('#view-level'),
    video : $('#view-video'),
    quiz  : $('#view-quiz'),
    result: $('#view-result'),
  };
  const modal = $('#modal');



  

  // 화면 토글(속성 기반으로 확실히)
  const show = (key) => {
    Object.values(views).forEach(v => v?.setAttribute('hidden',''));
    views[key]?.removeAttribute('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // 데모 문제
  const questions = [
    {
      id: 1,
      text: '안전한 차간 간격을 위한 올바른 순서는?',
      options: [
        '방향지시등 → 룸미러 확인 → 사각지대 확인 → 차선 변경',
        '사각지대 확인 → 방향지시등 → 룸미러 확인 → 차선 변경',
        '룸미러 확인 → 방향지시등 → 사각지대 확인 → 차선 변경',
        '방향지시등 → 룸미러 확인 → 차선 변경',
      ],
      answer: 2, tag: '차선 변경',
      explain: '차선 변경 시에는 먼저 룸미러로 후방을 확인하고, 방향지시등을 켠 후, 사각지대를 확인한 다음 안전하게 차선을 변경해야 합니다.'
    },
    {
      id: 2,
      text: '교차로에서 좌회전 시 올바른 순서는?',
      options: [
        '방향지시등 → 룸미러 확인 → 좌회전',
        '방향지시등 → 안전확인 → 좌회전',
        '안전확인 → 방향지시등 → 좌회전',
        '좌회전 → 방향지시등',
      ],
      answer: 1, tag: '교차로 통행',
      explain: '좌회전 시에는 반드시 방향지시등을 켠 후, 주변 안전을 확인하고 천천히 좌회전해야 합니다.'
    }
  ];

  // 상태
  let level = '초급';
  let current = 0;
  let picked = null;
  let answers = [];
  let startedAt = 0;





  

  // 진행바/번호 갱신
  const updateProgress = () => {
    const pct = Math.round((current / questions.length) * 100);
    $('#progressBar') .style.width = pct + '%';
    $('#progressText').textContent = pct + '%';
    $('#progressBar2').style.width = pct + '%';
    $('#progressText2').textContent = pct + '%';
    $('#qNoA').textContent = current + 1;
    $('#qNoB').textContent = current + 1;
    $('#qNoC').textContent = current + 1;
    $('#qNoD').textContent = current + 1;
  };

  // 보기 렌더
  const renderQuestion = () => {
    const q = questions[current];
    $('#questionText').textContent = q.text;
    const wrap = $('#options'); wrap.innerHTML = '';
    q.options.forEach((t, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.innerHTML = `<span class="num">${i+1}</span><span>${t}</span>`;
      btn.addEventListener('click', () => {
        $$('.opt', wrap).forEach(o=>o.classList.remove('active'));
        btn.classList.add('active');
        picked = i;
        $('#btnNext').disabled = false;
      });
      wrap.appendChild(btn);
    });
    picked = null;
    $('#btnNext').disabled = true;
  };

  // ===== 이벤트 위임으로 안정 바인딩 =====
  // 난이도 선택: #view-level 안에서 .pill 클릭 감지



  const onLevelClick = (e) => {
    const btn = e.target.closest('.pill[data-level]');
    if (!btn || !views.level || views.level.hasAttribute('hidden')) return;
    level = btn.dataset.level;
    $('#badgeLevel').textContent  = level;
    $('#badgeLevel2').textContent = level;
    current = 0; answers = [];
    updateProgress();
    show('video');
    startedAt = Date.now();
    tickTimer(true);
  };
  root.addEventListener('click', onLevelClick);

  // 영상 → 문제
  const onToQuestion = (e) => {
    const btn = e.target.closest('#btnToQuestion');
    if (!btn) return;
    renderQuestion();
    updateProgress();
    show('quiz');
  };
  root.addEventListener('click', onToQuestion);

  // 문제 → 영상
  const onBackVideo = (e) => {
    const btn = e.target.closest('#btnBackVideo');
    if (!btn) return;
    show('video');
  };
  root.addEventListener('click', onBackVideo);

  // 다음/완료
  const onNext = (e) => {
    const btn = e.target.closest('#btnNext');
    if (!btn) return;
    answers[current] = picked;
    current++;
    if (current >= questions.length) {
      $('#toResult').focus();
      modal.classList.add('show');
    } else {
      updateProgress();
      $('#qTotal').textContent  = questions.length;
      $('#qTotal2').textContent = questions.length;
      show('video');
    }
  };
  root.addEventListener('click', onNext);

  // 결과로
  const onToResult = (e) => {
    const btn = e.target.closest('#toResult');
    if (!btn) return;

    modal.classList.remove('show');
    const spent   = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    const correct = questions.reduce((acc,q,i)=>acc + (q.answer === (answers[i] ?? -1) ? 1 : 0), 0);
    const wrong   = questions.length - correct;
    const score   = Math.round((correct / questions.length)*100);

    $('#scoreNum').textContent    = `${score}점`;
    $('#totalQ').textContent      = questions.length;
    $('#correctQ').textContent    = correct;
    $('#statCorrect').textContent = correct;
    $('#statWrong').textContent   = wrong;
    $('#statTime').textContent    = `${Math.floor(spent/60)}분 ${spent%60}초`;

    const wrap = $('#wrongWrap'); wrap.innerHTML = '';
    questions.forEach((q,i)=>{
      const pick = answers[i]; if (pick === q.answer) return;
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `
        <div class="head">✖ 문제 ${i+1}<span class="tag">${q.tag}</span></div>
        <div style="margin:8px 0 6px">${q.text}</div>
        <div style="color:#c0392b;font-weight:800">✘ 내 답안:</div>
        <div style="margin:2px 0 8px">${typeof pick==='number'? q.options[pick] : '-'}</div>
        <div style="color:#0b9b6b;font-weight:800">✔ 정답:</div>
        <div>${q.options[q.answer]}</div>
        <div class="box" style="margin-top:10px"><div style="font-weight:800;margin-bottom:4px">해설</div>${q.explain}</div>
      `;
      wrap.appendChild(card);
      const gap=document.createElement('div'); gap.style.height='10px'; wrap.appendChild(gap);
    });

    show('result');
  };
  root.addEventListener('click', onToResult);

  // 다시 도전
  const onRetry = (e) => {
    const btn = e.target.closest('#btnRetry');
    if (!btn) return;
    current = 0; answers = []; startedAt = 0;
    $('#qTotal').textContent  = questions.length;
    $('#qTotal2').textContent = questions.length;
    updateProgress();
    show('level');
  };
  root.addEventListener('click', onRetry);

  // 초기화
  $('#qTotal').textContent  = questions.length;
  $('#qTotal2').textContent = questions.length;
  updateProgress();

  // 타이머(문제 화면에서만)
  let timerId=null, t=0;
  function tickTimer(reset=false){
    if (reset){ clearInterval(timerId); t=0; $('#timer').textContent=t.toFixed(1); }
    clearInterval(timerId);
    timerId = setInterval(()=>{ t+=0.1; $('#timer').textContent=t.toFixed(1); },100);
  }
  const obs = new MutationObserver(()=>{
    if (!views.quiz.hasAttribute('hidden')) tickTimer(false);
    else clearInterval(timerId);
  });
  obs.observe(views.quiz, { attributes:true, attributeFilter:['hidden'] });

  // 언마운트(정리)
  return () => {
    root.removeEventListener('click', onLevelClick);
    root.removeEventListener('click', onToQuestion);
    root.removeEventListener('click', onBackVideo);
    root.removeEventListener('click', onNext);
    root.removeEventListener('click', onToResult);
    root.removeEventListener('click', onRetry);
    obs.disconnect();
    clearInterval(timerId);
  };
}
