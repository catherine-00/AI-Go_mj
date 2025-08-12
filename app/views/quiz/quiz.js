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

  // 햄버거 버튼 → 드로어 연동
  const menuBtn = $('.topbar .btn-ic');
  if (menuBtn && menuBtn.id === 'openDrawer') {
    // 햄버거 버튼이 이미 설정되어 있음
  }

  // 뷰 노드
  const views = {
    level : $('#view-level'),
    video : $('#view-video'),
    quiz  : $('#view-quiz'),
    result: $('#view-result'),
  };
  const modal = $('#modal');

  // 현재 화면 상태
  let currentView = 'level';
  let currentLevel = '초급';
  let currentQuestion = 0;
  let selectedAnswer = null;
  let answers = [];
  let startTime = 0;
  let timerInterval = null;

  // 데모 문제 (난이도별로 다른 문제 제공)
  const questionsByLevel = {
    '초급': [
      {
        id: 1,
        text: '안전한 차간 간격을 위한 올바른 순서는?',
        options: [
          '방향지시등 → 룸미러 확인 → 사각지대 확인 → 차선 변경',
          '사각지대 확인 → 방향지시등 → 룸미러 확인 → 차선 변경',
          '룸미러 확인 → 방향지시등 → 사각지대 확인 → 차선 변경',
          '방향지시등 → 룸미러 확인 → 차선 변경',
        ],
        answer: 2,
        tag: '차선 변경',
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
        answer: 1,
        tag: '교차로 통행',
        explain: '좌회전 시에는 반드시 방향지시등을 켠 후, 주변 안전을 확인하고 천천히 좌회전해야 합니다.'
      }
    ],
    '중급': [
      {
        id: 1,
        text: '고속도로에서 안전한 주행을 위한 올바른 행동은?',
        options: [
          '최고속도로 주행하여 빠르게 이동',
          '적정 속도를 유지하며 주변을 주시',
          '차선 변경을 자주 하며 주행',
          '휴대폰을 사용하며 주행',
        ],
        answer: 1,
        tag: '고속도로 주행',
        explain: '고속도로에서는 적정 속도를 유지하고 주변을 주시하며 안전하게 주행해야 합니다.'
      },
      {
        id: 2,
        text: '야간 주행 시 안전을 위한 올바른 조치는?',
        options: [
          '전조등을 끄고 주행',
          '상향등을 계속 켜고 주행',
          '상향등과 하향등을 적절히 사용',
          '조명 없이 주행',
        ],
        answer: 2,
        tag: '야간 주행',
        explain: '야간 주행 시에는 상향등과 하향등을 적절히 사용하여 전방을 밝게 비추고 대향차량과의 안전을 확보해야 합니다.'
      },
      {
        id: 3,
        text: '빗길 주행 시 주의사항으로 올바른 것은?',
        options: [
          '속도를 높여 빠르게 이동',
          '차간 간격을 좁게 유지',
          '속도를 낮추고 차간 간격을 넓게',
          '급제동을 자주 사용',
        ],
        answer: 2,
        tag: '빗길 주행',
        explain: '빗길 주행 시에는 노면이 미끄러우므로 속도를 낮추고 차간 간격을 넓게 유지해야 합니다.'
      }
    ],
    '고급': [
      {
        id: 1,
        text: '복잡한 교차로에서 우회전 시 가장 안전한 방법은?',
        options: [
          '신호를 무시하고 빠르게 우회전',
          '신호를 확인하고 주변 안전을 점검한 후 우회전',
          '경음기를 울리며 우회전',
          '다른 차량을 밀어내며 우회전',
        ],
        answer: 1,
        tag: '복잡한 교차로',
        explain: '복잡한 교차로에서는 신호를 정확히 확인하고 주변 안전을 점검한 후 천천히 우회전해야 합니다.'
      },
      {
        id: 2,
        text: '긴급 상황에서의 올바른 대처 순서는?',
        options: [
          '경음기 → 방향지시등 → 제동',
          '제동 → 방향지시등 → 경음기',
          '방향지시등 → 제동 → 경음기',
          '경음기 → 제동 → 방향지시등',
        ],
        answer: 1,
        tag: '긴급 상황',
        explain: '긴급 상황에서는 먼저 제동을 걸고, 방향지시등으로 의도를 표시한 후, 필요시 경음기를 사용해야 합니다.'
      },
      {
        id: 3,
        text: '고속도로에서 차량 고장 시 올바른 대처는?',
        options: [
          '차량을 그대로 두고 도보로 이동',
          '비상등을 켜고 안전한 곳으로 이동',
          '차량을 도로 중앙에 주차',
          '다른 차량을 막고 정차',
        ],
        answer: 1,
        tag: '고속도로 고장',
        explain: '고속도로에서 차량 고장 시에는 비상등을 켜고 가능한 한 안전한 곳으로 이동한 후 도움을 요청해야 합니다.'
      },
      {
        id: 4,
        text: '주차 시 가장 안전한 방법은?',
        options: [
          '후진 주차로 한 번에 주차',
          '전진 주차로 여러 번 시도',
          '후진 주차로 천천히 정확하게',
          '다른 차량을 밀어내며 주차',
        ],
        answer: 2,
        tag: '안전한 주차',
        explain: '후진 주차는 시야가 제한적이므로 천천히 정확하게 주차해야 하며, 필요시 여러 번 시도하는 것이 안전합니다.'
      }
    ]
  };

  // 현재 문제 목록
  let currentQuestions = questionsByLevel[currentLevel];

  // 화면 전환 함수
  const showView = (viewName) => {
    // 기존 애니메이션 클래스 제거
    Object.values(views).forEach(v => {
      if (v) {
        v.classList.remove('fade-in', 'fade-out');
      }
    });

    if (viewName === 'level') {
      // 난이도 선택 화면으로
      Object.values(views).forEach(v => {
        if (v) v.style.display = 'none';
      });
      views.level.style.display = 'block';
      views.level.classList.add('fade-in');
      currentView = 'level';
      updatePageTitle('운전면허 퀴즈');
      updateBackButton();
    } else if (viewName === 'video') {
      // 영상 화면으로
      views.level.classList.add('fade-out');
      setTimeout(() => {
        views.level.style.display = 'none';
        views.video.style.display = 'block';
        views.video.classList.add('fade-in');
        currentView = 'video';
        updatePageTitle(`${currentLevel} 퀴즈`);
        updateBackButton();
        updateVideoInfo();
      }, 300);
    } else if (viewName === 'quiz') {
      // 문제 풀이 화면으로
      views.video.classList.add('fade-out');
      setTimeout(() => {
        views.video.style.display = 'none';
        views.quiz.style.display = 'block';
        views.quiz.classList.add('fade-in');
        currentView = 'quiz';
        updatePageTitle(`${currentLevel} 문제 ${currentQuestion + 1}`);
        updateBackButton();
        renderQuestion();
        startTimer();
      }, 300);
    } else if (viewName === 'result') {
      // 결과 화면으로
      views.quiz.classList.add('fade-out');
      setTimeout(() => {
        views.quiz.style.display = 'none';
        views.result.style.display = 'block';
        views.result.classList.add('fade-in');
        currentView = 'result';
        updatePageTitle('퀴즈 결과');
        updateBackButton();
        showResult();
      }, 300);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // 페이지 제목 업데이트
  const updatePageTitle = (title) => {
    const pageTitle = $('#pageTitle');
    if (pageTitle) pageTitle.textContent = title;
  };

  // 뒤로가기 버튼 업데이트
  const updateBackButton = () => {
    const backButton = $('#openDrawer');
    if (!backButton) return;

    if (currentView === 'level') {
      // 난이도 선택 화면에서는 햄버거 버튼으로 표시
      backButton.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      `;
      backButton.setAttribute('aria-label', '메뉴 열기');
      backButton.setAttribute('title', '메뉴 열기');
      backButton.onclick = null; // 기본 드로어 동작 사용
    } else if (currentView === 'video') {
      // 영상 화면에서는 뒤로가기 버튼으로
      backButton.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      `;
      backButton.setAttribute('aria-label', '뒤로가기');
      backButton.setAttribute('title', '뒤로가기');
      backButton.onclick = () => showView('level');
    } else if (currentView === 'quiz') {
      // 문제 풀이 화면에서는 뒤로가기 버튼으로
      backButton.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      `;
      backButton.setAttribute('aria-label', '뒤로가기');
      backButton.setAttribute('title', '뒤로가기');
      backButton.onclick = () => showView('video');
    } else if (currentView === 'result') {
      // 결과 화면에서는 뒤로가기 버튼으로
      backButton.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      `;
      backButton.setAttribute('aria-label', '뒤로가기');
      backButton.setAttribute('title', '뒤로가기');
      backButton.onclick = () => showView('level');
    }
  };

  // 영상 화면 정보 업데이트
  const updateVideoInfo = () => {
    $('#qTotal').textContent = currentQuestions.length;
    $('#qCurrent').textContent = currentQuestion + 1;
    $('#qLevel').textContent = currentLevel;
  };

  // 문제 렌더링
  const renderQuestion = () => {
    const question = currentQuestions[currentQuestion];
    if (!question) return;

    $('#questionText').textContent = question.text;
    const optionsContainer = $('#options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.className = 'option';
      optionButton.innerHTML = `
        <span class="num">${index + 1}</span>
        <span class="text">${option}</span>
      `;
      
      optionButton.addEventListener('click', () => {
        // 기존 선택 해제
        $$('.option', optionsContainer).forEach(opt => opt.classList.remove('selected'));
        // 현재 선택
        optionButton.classList.add('selected');
        selectedAnswer = index;
        $('#btnNext').disabled = false;
      });
      
      optionsContainer.appendChild(optionButton);
    });

    selectedAnswer = null;
    $('#btnNext').disabled = true;
  };

  // 진행률 업데이트
  const updateProgress = () => {
    const progress = Math.round(((currentQuestion + 1) / currentQuestions.length) * 100);
    $('#progressBar').style.width = `${progress}%`;
    $('#progressText').textContent = `${progress}%`;
  };

  // 타이머 시작
  const startTimer = () => {
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      $('#timer').textContent = elapsed.toFixed(1);
    }, 100);
  };

  // 타이머 정지
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  // 결과 표시
  const showResult = () => {
    stopTimer();
    
    const totalQuestions = currentQuestions.length;
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === currentQuestions[index].answer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const elapsedTime = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    $('#scoreNum').textContent = `${score}점`;
    $('#totalQ').textContent = totalQuestions;
    $('#correctQ').textContent = correctAnswers;
    $('#statTime').textContent = `${minutes}분 ${seconds}초`;
    
    // 오답 노트 생성
    const wrongAnswersContainer = $('#wrongWrap');
    wrongAnswersContainer.innerHTML = '';
    
    answers.forEach((answer, index) => {
      const question = currentQuestions[index];
      if (answer === question.answer) return; // 정답은 제외
      
      const wrongCard = document.createElement('div');
      wrongCard.className = 'wrong-card';
      wrongCard.innerHTML = `
        <div class="head">
          ✖ 문제 ${index + 1}
          <span class="tag">${question.tag}</span>
        </div>
        <div style="margin:8px 0 6px">${question.text}</div>
        <div style="color:#c0392b;font-weight:800">✘ 내 답안:</div>
        <div style="margin:2px 0 8px">${typeof answer === 'number' ? question.options[answer] : '-'}</div>
        <div style="color:#0b9b6b;font-weight:800">✔ 정답:</div>
        <div>${question.options[question.answer]}</div>
        <div class="explanation">${question.explain}</div>
      `;
      
      wrongAnswersContainer.appendChild(wrongCard);
    });
  };

  // ===== 이벤트 리스너 =====
  
  // 난이도 선택
  const onLevelClick = (e) => {
    const pill = e.target.closest('.pill[data-level]');
    if (!pill || currentView !== 'level') return;
    
    currentLevel = pill.dataset.level;
    currentQuestions = questionsByLevel[currentLevel];
    currentQuestion = 0;
    answers = [];
    selectedAnswer = null;
    
    showView('video');
  };

  // 문제 보기 버튼
  const onToQuestion = (e) => {
    if (e.target.id !== 'toQuestion' || currentView !== 'video') return;
    showView('quiz');
  };

  // 뒤로가기 버튼들
  const onBackToLevel = (e) => {
    if (e.target.id !== 'backToLevel' || currentView !== 'video') return;
    showView('level');
  };

  const onBackToVideo = (e) => {
    if (e.target.id !== 'backToVideo' || currentView !== 'quiz') return;
    showView('video');
  };

  // 다음 문제
  const onNext = (e) => {
    if (e.target.id !== 'btnNext' || currentView !== 'quiz') return;
    
    if (selectedAnswer === null) return;
    
    answers[currentQuestion] = selectedAnswer;
    currentQuestion++;
    
    if (currentQuestion >= currentQuestions.length) {
      // 모든 문제 완료
      showView('result');
    } else {
      // 다음 문제로
      updateProgress();
      updatePageTitle(`${currentLevel} 문제 ${currentQuestion + 1}`);
      renderQuestion();
    }
  };

  // 다시 도전
  const onRetry = (e) => {
    if (e.target.id !== 'btnRetry' || currentView !== 'result') return;
    
    // 상태 초기화
    currentQuestion = 0;
    answers = [];
    selectedAnswer = null;
    startTime = 0;
    stopTimer();
    
    showView('level');
  };

  // 영상 재생 (데모용)
  const onPlayVideo = (e) => {
    if (e.target.id !== 'playVideo') return;
    
    // 실제 구현에서는 영상 재생 로직
    alert('영상이 재생됩니다. (데모)');
  };

  // 이벤트 리스너 등록
  root.addEventListener('click', onLevelClick);
  root.addEventListener('click', onToQuestion);
  root.addEventListener('click', onBackToLevel);
  root.addEventListener('click', onBackToVideo);
  root.addEventListener('click', onNext);
  root.addEventListener('click', onRetry);
  root.addEventListener('click', onPlayVideo);

  // 초기화
  showView('level');

  // 언마운트 시 정리
  return () => {
    root.removeEventListener('click', onLevelClick);
    root.removeEventListener('click', onToQuestion);
    root.removeEventListener('click', onBackToLevel);
    root.removeEventListener('click', onBackToVideo);
    root.removeEventListener('click', onNext);
    root.removeEventListener('click', onRetry);
    root.removeEventListener('click', onPlayVideo);
    
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };
}
