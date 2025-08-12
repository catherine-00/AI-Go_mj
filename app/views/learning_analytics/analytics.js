// app/views/learning_analytics/analytics.js
import { store } from '../../js/store.js';

export async function render() {
  // CSS와 HTML을 직접 반환
  const css = `
  :root{
    --bg:#f6f8fb; --card:#fff; --line:#e6e8ee; --text:#0f172a; --muted:#66748c;
    --blue:#2563ff; --blue-700:#1f54f0; --blue-050:#eef4ff;
    --green:#10b981; --green-050:#ecfdf5;
    --rose:#ef4444; --rose-050:#fff1f2;
    --shadow:0 8px 28px rgba(15,23,42,.06);
    --radius:18px; --focus:0 0 0 3px rgba(37,99,255,.18);
    
    /* 모바일 웹 표준 여백 시스템 */
    --container-padding: 16px;
    --section-gap: 24px;
    --card-gap: 16px;
    --border-radius: 16px;
    --button-height: 48px;
    --icon-size: 24px;
  }
  
  *{box-sizing:border-box}
  
  html,body{
    height:100%;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body{
    background:var(--bg); 
    color:var(--text);
    font-family:"Pretendard","Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  }
  
  .ago-analytics{
    width: 100%;
    min-height: 100vh; 
    display:flex; 
    flex-direction:column;
    max-width: 100vw;
    overflow-x: hidden;
    color:var(--text);
    background:var(--bg);
  }

  /* topbar */
  .ago-analytics .topbar{
    position:sticky; 
    top:0; 
    z-index:5; 
    background:#fff; 
    border-bottom:1px solid var(--line);
    padding: 16px var(--container-padding); 
    display:flex; 
    align-items:center; 
    justify-content:space-between;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    width: 100%;
    box-sizing: border-box;
    gap: 16px;
    min-height: 60px;
    flex-wrap: wrap;
  }
  
  .ago-analytics .row{
    display:flex; 
    align-items:center; 
    gap:10px;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    min-height: 38px;
    flex-shrink: 1;
  }
  
  .ago-analytics .btn-ic{
    width: 40px;
    height: 40px;
    border-radius:12px;
    border:1px solid var(--line);
    background:#fff;
    display:grid;
    place-items:center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    min-width: 40px;
    cursor: pointer;
  }
  
  .ago-analytics .btn-ic:hover {
    background: var(--bg);
    border-color: var(--blue);
    transform: translateY(-1px);
  }
  
  .ago-analytics .title{
    display:flex; 
    align-items:center; 
    gap:8px; 
    font-weight:900;
    font-size: 18px;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 26px;
    flex-shrink: 1;
  }
  
  .ago-analytics .title .badge{
    width: 28px;
    height: 28px;
    border-radius:9px;
    border:1px solid #d8e4ff;
    background:#eef4ff;
    display:grid;
    place-items:center;
    color:#6f4ef6;
    flex-shrink: 0;
    min-width: 28px;
  }
  
  .ago-analytics .chip-user{
    display:flex; 
    align-items:center; 
    gap:8px; 
    border:1px solid var(--line); 
    padding:8px 12px; 
    border-radius:999px; 
    background:#fff;
    transition: all 0.2s ease;
    cursor: pointer;
    flex-shrink: 0;
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    font-size: 14px;
    min-height: 36px;
    max-width: 200px;
  }
  
  .ago-analytics .chip-user:hover {
    background: var(--bg);
    transform: translateY(-1px);
  }
  
  .ago-analytics .chip-user .dot{
    width: 22px;
    height: 22px;
    border-radius:999px;
    background:#1e6bff;
    color:#fff;
    display:grid;
    place-items:center;
    font-size:12px;
    font-weight:800;
    flex-shrink: 0;
    min-width: 22px;
  }

  .ago-analytics .page{
    padding: var(--section-gap) var(--container-padding);
    display: flex;
    flex-direction: column;
    gap: var(--section-gap);
    width: 100%;
    box-sizing: border-box;
    min-height: calc(100vh - 60px);
  }
  
  .ago-analytics h1{
    margin:6px 0 4px; 
    font-size:20px;
    font-weight: 800;
    width: 100%;
    min-height: 28px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .sub{
    color:var(--muted); 
    font-size:13px; 
    margin-bottom:10px;
    line-height: 1.4;
    width: 100%;
    min-height: 20px;
    display: flex;
    align-items: center;
  }

  /* cards */
  .ago-analytics .card{
    background:var(--card); 
    border:1px solid var(--line); 
    border-radius:22px; 
    box-shadow:var(--shadow); 
    padding: 24px;
    transition: all 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .ago-analytics .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(15,23,42,0.1);
  }
  
  .ago-analytics .stat{
    display:flex; 
    align-items:center; 
    gap:10px; 
    padding:16px; 
    border:1px solid var(--line); 
    border-radius:16px; 
    background:#fff;
    transition: all 0.2s ease;
    margin-bottom: 8px;
    width: 100%;
    box-sizing: border-box;
    min-height: 80px;
    flex-shrink: 0;
  }
  
  .ago-analytics .stat:last-child {
    margin-bottom: 0;
  }
  
  .ago-analytics .stat:hover {
    border-color: var(--blue);
    background: var(--blue-050);
    transform: translateY(-1px);
  }
  
  .ago-analytics .ic{
    width: 36px;
    height: 36px;
    border-radius:10px;
    display:grid;
    place-items:center;
    border:1px solid var(--line);
    flex-shrink: 0;
    min-width: 36px;
    min-height: 36px;
  }
  
  .ago-analytics .ic.blue{
    color:#1f55ff; 
    background:#eef4ff; 
    border-color:#dce7ff
  }
  
  .ago-analytics .ic.green{
    color:#0b9b6b; 
    background:#ecfdf5; 
    border-color:#c4f1df
  }
  
  .ago-analytics .ic.rose{
    color:#d9484c; 
    background:#fff1f2; 
    border-color:#ffd7dc
  }
  
  .ago-analytics .stat .name{
    color:#6b7a93; 
    font-size:12px;
    font-weight: 600;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 20px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .stat .num{
    font-weight:900; 
    font-size:22px;
    color: var(--text);
    flex-shrink: 0;
    min-height: 28px;
    display: flex;
    align-items: center;
  }

  /* weekly */
  .ago-analytics .week li{
    display:flex; 
    align-items:center; 
    gap:10px; 
    padding:12px 0;
    border-bottom: 1px solid var(--bg);
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
    flex-shrink: 0;
  }
  
  .ago-analytics .week li:last-child {
    border-bottom: none;
  }
  
  .ago-analytics .week .d{
    width: 20px; 
    color:#54607a;
    font-weight: 600;
    flex-shrink: 0;
    min-width: 20px;
    min-height: 20px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .stack{
    flex:1; 
    height:14px; 
    border-radius:999px; 
    background:#eef1f6; 
    position:relative; 
    overflow:hidden;
    min-width: 0;
    min-height: 14px;
  }
  
  .ago-analytics .stack .good{
    position:absolute; 
    left:0; 
    top:0; 
    height:100%; 
    background:#1ac587;
    transition: width 0.3s ease;
  }
  
  .ago-analytics .stack .bad{
    position:absolute; 
    top:0; 
    height:100%; 
    right:0; 
    background:#f88a95;
    transition: width 0.3s ease;
  }
  
  .ago-analytics .week .total{
    width: 46px; 
    text-align:right; 
    font-size:12px; 
    color:#6b7a93;
    flex-shrink: 0;
    min-width: 46px;
    min-height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  /* category */
  .ago-analytics .cat .row{
    display:flex; 
    align-items:center; 
    justify-content:space-between;
    margin-bottom: 8px;
    width: 100%;
    gap: 16px;
    min-height: 32px;
    flex-shrink: 0;
  }
  
  .ago-analytics .cat .label{
    display:flex; 
    align-items:center; 
    gap:6px;
    font-weight: 600;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 24px;
    flex-shrink: 1;
  }
  
  .ago-analytics .cat .trend.up{
    color:#0b9b6b;
    font-weight: 800;
    flex-shrink: 0;
    min-width: 16px;
    min-height: 24px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .cat .trend.down{
    color:#d9484c;
    font-weight: 800;
    flex-shrink: 0;
    min-width: 16px;
    min-height: 24px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .pill{
    font-size:12px; 
    padding:4px 8px; 
    border-radius:999px; 
    background:#e7f0ff; 
    color:#295bff; 
    font-weight:900;
    flex-shrink: 0;
    min-width: 40px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }
  
  .ago-analytics .bar{
    margin-top:6px; 
    height:8px; 
    background:#eef1f6; 
    border-radius:999px; 
    overflow:hidden;
    margin-bottom: 16px;
    width: 100%;
    min-height: 8px;
  }
  
  .ago-analytics .bar > i{
    display:block; 
    height:100%; 
    width:0; 
    background:#2b67ff;
    transition: width 0.3s ease;
  }

  /* feedback */
  .ago-analytics .feed .hint{
    display:flex; 
    align-items:center; 
    gap:8px; 
    margin-bottom:12px; 
    font-weight:900;
    font-size: 16px;
    width: 100%;
    min-height: 24px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .bubble{
    border:1px solid #dbe6ff; 
    background:#f4f8ff; 
    color:#4b5a74; 
    border-radius:12px; 
    padding:16px; 
    line-height:1.6;
    transition: all 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    min-height: 80px;
    display: flex;
    align-items: center;
  }
  
  .ago-analytics .bubble:hover {
    background: #eef4ff;
    border-color: var(--blue);
    transform: translateY(-1px);
  }

  .ago-analytics .btn-primary{
    width:100%; 
    border:none; 
    border-radius:14px; 
    padding:16px; 
    margin:16px 0 24px;
    background:linear-gradient(90deg,var(--blue),var(--blue-700)); 
    color:#fff; 
    font-weight:900; 
    font-size:16px;
    box-shadow:0 10px 24px rgba(37,99,255,.25); 
    display:flex; 
    justify-content:center; 
    align-items:center; 
    gap:10px;
    transition: all 0.2s ease;
    cursor: pointer;
    height: var(--button-height);
    box-sizing: border-box;
    min-height: 48px;
  }
  
  .ago-analytics .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(37,99,255,.35);
  }

  .ago-analytics a:focus, .ago-analytics button:focus{
    outline:var(--focus)
  }

  /* ===== 반응형 디자인 ===== */
  @media (max-width: 480px) {
    :root {
      --container-padding: 16px;
      --section-gap: 20px;
      --card-gap: 12px;
      --border-radius: 16px;
      --button-height: 48px;
      --icon-size: 24px;
    }
    
    .ago-analytics .page {
      padding: 20px 16px;
      gap: 20px;
    }
    
    .ago-analytics .topbar {
      padding: 16px 16px;
      gap: 12px;
      flex-direction: column;
      align-items: stretch;
    }
    
    .ago-analytics .row {
      justify-content: center;
      flex-shrink: 0;
    }
    
    .ago-analytics .chip-user {
      align-self: center;
      max-width: none;
    }
    
    .ago-analytics .title {
      font-size: 16px;
      gap: 6px;
    }
    
    .ago-analytics .title .badge {
      width: 24px;
      height: 24px;
    }
    
    .ago-analytics .chip-user {
      padding: 6px 10px;
      font-size: 13px;
    }
    
    .ago-analytics .chip-user .dot {
      width: 20px;
      height: 20px;
      font-size: 11px;
    }
    
    .ago-analytics .btn-ic {
      width: 36px;
      height: 36px;
    }
    
    .ago-analytics .card {
      padding: 20px;
    }
    
    .ago-analytics .stat {
      padding: 14px;
    }
    
    .ago-analytics .ic {
      width: 32px;
      height: 32px;
    }
    
    .ago-analytics .btn-primary {
      padding: 14px;
      margin: 12px 0 20px;
    }
    
    /* 모바일 터치 최적화 */
    .ago-analytics .btn-ic, .ago-analytics .stat, .ago-analytics .btn-primary {
      min-height: 44px; /* 터치 최소 크기 */
    }
    
    /* 모바일에서 더 나은 간격 */
    .ago-analytics .stat {
      margin-bottom: 6px;
    }
    
    .ago-analytics .stat .name {
      font-size: 11px;
    }
    
    .ago-analytics .stat .num {
      font-size: 18px;
    }
    
    .ago-analytics .ic {
      width: 30px;
      height: 30px;
    }
    
    /* 모바일에서 제목 크기 조정 */
    .ago-analytics h1 {
      font-size: 18px;
      margin: 4px 0 2px;
    }
    
    .ago-analytics .sub {
      font-size: 12px;
      margin-bottom: 8px;
    }
    
    /* 모바일에서 주간 차트 최적화 */
    .ago-analytics .week li {
      padding: 10px 0;
    }
    
    .ago-analytics .week .d {
      font-size: 11px;
      width: 18px;
    }
    
    .ago-analytics .week .total {
      font-size: 11px;
      width: 40px;
    }
    
    /* 모바일에서 카테고리 차트 최적화 */
    .ago-analytics .cat .row {
      margin-bottom: 6px;
    }
    
    .ago-analytics .cat .label {
      font-size: 13px;
    }
    
    .ago-analytics .pill {
      font-size: 11px;
      padding: 3px 6px;
    }
    
    .ago-analytics .bar {
      height: 6px;
      margin-bottom: 12px;
    }
    
    /* 모바일에서 피드백 최적화 */
    .ago-analytics .feed .hint {
      font-size: 14px;
      margin-bottom: 10px;
    }
    
    .ago-analytics .bubble {
      padding: 14px;
      font-size: 13px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    :root {
      --container-padding: 12px;
      --section-gap: 24px;
      --card-gap: 16px;
      --border-radius: 18px;
      --button-height: 52px;
      --icon-size: 26px;
    }
    
    .ago-analytics .page {
      padding: 24px 12px;
      gap: 24px;
    }
    
    .ago-analytics .topbar {
      padding: 16px 12px;
    }
    
    .ago-analytics .btn-ic {
      width: 42px;
      height: 42px;
    }
    
    .ago-analytics .card {
      padding: 20px;
    }
    
    .ago-analytics .stat {
      padding: 16px;
    }
    
    .ago-analytics .ic {
      width: 38px;
      height: 38px;
    }
    
    .ago-analytics .btn-primary {
      padding: 16px;
      margin: 18px 0 24px;
    }
    
    /* 태블릿 터치 최적화 */
    .ago-analytics .btn-ic, .ago-analytics .stat, .ago-analytics .btn-primary {
      min-height: 48px;
    }
    
    /* 태블릿에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .title {
      font-size: 18px;
      gap: 8px;
    }
    
    .ago-analytics .title .badge {
      width: 28px;
      height: 28px;
    }
    
    .ago-analytics .chip-user {
      padding: 8px 14px;
      font-size: 14px;
      max-width: 180px;
    }
    
    .ago-analytics .chip-user .dot {
      width: 24px;
      height: 24px;
      font-size: 13px;
    }
    
    /* 태블릿에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .row {
      flex-shrink: 1;
    }
    
    .ago-analytics .title {
      flex-shrink: 1;
    }
    
    .ago-analytics .topbar {
      gap: 20px;
    }
  }

  @media (min-width: 769px) {
    :root {
      --container-padding: 8px;
      --section-gap: 24px;
      --card-gap: 16px;
      --border-radius: 18px;
      --button-height: 52px;
      --icon-size: 26px;
    }
    
    .ago-analytics .page {
      padding: 24px 8px;
      gap: 24px;
    }
    
    .ago-analytics .topbar {
      padding: 16px 8px;
    }
    
    .ago-analytics .btn-ic {
      width: 42px;
      height: 42px;
    }
    
    .ago-analytics .card {
      padding: 20px;
    }
    
    .ago-analytics .stat {
      padding: 16px;
    }
    
    .ago-analytics .ic {
      width: 38px;
      height: 38px;
    }
    
    .ago-analytics .btn-primary {
      padding: 16px;
      margin: 18px 0 24px;
    }
    
    /* 데스크탑에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .title {
      font-size: 20px;
      gap: 10px;
    }
    
    .ago-analytics .title .badge {
      width: 32px;
      height: 32px;
    }
    
    .ago-analytics .chip-user {
      padding: 10px 16px;
      font-size: 15px;
      max-width: 200px;
    }
    
    .ago-analytics .chip-user .dot {
      width: 26px;
      height: 26px;
      font-size: 14px;
    }
    
    /* 데스크탑에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .row {
      flex-shrink: 1;
    }
    
    .ago-analytics .title {
      flex-shrink: 1;
    }
    
    .ago-analytics .topbar {
      gap: 24px;
    }
  }
  
  /* ===== 매우 큰 화면 최적화 ===== */
  @media (min-width: 1200px) {
    .ago-analytics {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .ago-analytics .topbar {
      padding: 20px 16px;
    }
    
    .ago-analytics .page {
      padding: 32px 16px;
      gap: 32px;
    }
    
    .ago-analytics .card {
      padding: 28px;
    }
    
    /* 매우 큰 화면에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .title {
      font-size: 22px;
      gap: 12px;
    }
    
    .ago-analytics .title .badge {
      width: 36px;
      height: 36px;
    }
    
    .ago-analytics .chip-user {
      padding: 12px 20px;
      font-size: 16px;
      max-width: 220px;
    }
    
    .ago-analytics .chip-user .dot {
      width: 28px;
      height: 28px;
      font-size: 15px;
    }
    
    /* 매우 큰 화면에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
    .ago-analytics .topbar {
      gap: 28px;
    }
  }
  
  /* ===== 모바일 터치 최적화 ===== */
  @media (hover: none) and (pointer: coarse) {
    /* 터치 디바이스에서 호버 효과 제거 */
    .ago-analytics .btn-ic:hover, .ago-analytics .stat:hover, .ago-analytics .card:hover, .ago-analytics .bubble:hover {
      transform: none;
      box-shadow: var(--shadow);
    }
    
    /* 터치 디바이스에서 활성 상태 스타일 */
    .ago-analytics .btn-ic:active, .ago-analytics .stat:active, .ago-analytics .card:active, .ago-analytics .bubble:active {
      transform: scale(0.98);
      opacity: 0.8;
    }
    
    /* 터치 디바이스에서 포커스 스타일 강화 */
    .ago-analytics .btn-ic:focus, .ago-analytics .stat:focus, .ago-analytics .card:focus, .ago-analytics .bubble:focus {
      outline: 2px solid var(--blue);
      outline-offset: 2px;
    }
  }
  
  /* ===== 세로 모드 최적화 ===== */
  @media (orientation: portrait) and (max-width: 480px) {
    .ago-analytics .topbar {
      padding: 12px 16px;
    }
    
    .ago-analytics .title {
      font-size: 16px;
    }
    
    .ago-analytics .title .badge {
      width: 24px;
      height: 24px;
    }
    
    .ago-analytics .chip-user {
      padding: 6px 10px;
      font-size: 13px;
    }
    
    .ago-analytics .chip-user .dot {
      width: 20px;
      height: 20px;
      font-size: 11px;
    }
    
    .ago-analytics .stat {
      padding: 12px;
    }
    
    .ago-analytics .ic {
      width: 28px;
      height: 28px;
    }
  }
  
  /* ===== 가로 모드 최적화 ===== */
  @media (orientation: landscape) and (max-height: 500px) {
    .ago-analytics .topbar {
      padding: 8px var(--container-padding);
    }
    
    .ago-analytics .page {
      padding: 16px var(--container-padding);
      gap: 16px;
    }
    
    .ago-analytics .card {
      padding: 16px;
    }
    
    .ago-analytics .stat {
      padding: 12px;
      margin-bottom: 6px;
    }
    
    .ago-analytics h1 {
      margin: 2px 0 1px;
      font-size: 18px;
    }
    
    .ago-analytics .sub {
      margin-bottom: 6px;
      font-size: 12px;
    }
  }
  
  /* ===== 작은 화면에서의 그리드 최적화 ===== */
  @media (max-width: 360px) {
    .ago-analytics .page {
      padding: 16px 12px;
      gap: 16px;
    }
    
    .ago-analytics .topbar {
      padding: 12px 12px;
    }
    
    .ago-analytics .card {
      padding: 16px;
    }
    
    .ago-analytics .stat {
      padding: 12px;
    }
    
    .ago-analytics .btn-primary {
      padding: 12px;
      margin: 10px 0 16px;
    }
    
    /* 매우 작은 화면에서 아이콘 크기 조정 */
    .ago-analytics .ic {
      width: 28px;
      height: 28px;
    }
    
    .ago-analytics .btn-ic {
      width: 32px;
      height: 32px;
    }
  }
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
