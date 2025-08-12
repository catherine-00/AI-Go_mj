// app/views/wrong_answer_note/wrongNotes.js

// 스타일 + 마크업 그대로 반환
export function render() {
  return /* html */ `
  <style>
    :root{
      --bg:#f6f8fb; --card:#fff; --line:#e6e8ee; --text:#0f172a; --muted:#66748c;
      --blue:#2563ff; --blue-700:#1f54f0; --blue-050:#eef4ff;
      --green:#10b981; --green-50:#ecfdf5; --green-200:#b9ecd9;
      --amber:#f59e0b; --amber-50:#fff7e6;
      --rose:#ef4444; --rose-50:#fff2f2; --rose-200:#ffc9cf;
      --shadow:0 8px 28px rgba(15,23,42,.06);
      --radius:18px; --focus:0 0 0 3px rgba(37,99,255,.18);
      
      /* 모바일 웹 표준 여백 시스템 */
      --container-padding: 12px;
      --section-gap: 20px;
      --card-gap: 14px;
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
    .app{
      width: 100%;
      min-height: 100vh; 
      display:flex; 
      flex-direction:column;
      max-width: 100vw;
      overflow-x: hidden;
    }

    /* ===== Topbar ===== */
    .topbar{
      position:sticky; 
      top:0; 
      z-index:5; 
      background:#fff; 
      border-bottom:1px solid var(--line);
      padding: 14px var(--container-padding); 
      display:flex; 
      align-items:center; 
      justify-content:space-between;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      width: 100%;
      box-sizing: border-box;
      gap: 14px;
      min-height: 60px;
      flex-wrap: wrap;
    }
    
    .row{
      display:flex; 
      align-items:center; 
      gap:10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      min-height: 38px;
      flex-shrink: 1;
    }
    
    .btn-ic{
      width: 38px;
      height: 38px;
      border-radius:12px;
      border:1px solid var(--line);
      background:#fff;
      display:grid;
      place-items:center;
      transition: all 0.2s ease;
      flex-shrink: 0;
      min-width: 38px;
    }
    
    .btn-ic:hover {
      background: var(--bg);
      border-color: var(--blue);
      transform: translateY(-1px);
    }
    
    .title{
      display:flex; 
      align-items:center; 
      gap:8px; 
      font-weight:900;
      font-size: 17px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-height: 26px;
      flex-shrink: 1;
    }
    
    .title .book{
      width: 26px;
      height: 26px;
      border-radius:9px;
      border:1px solid #d8e4ff;
      background:#eef4ff;
      display:grid;
      place-items:center;
      color:#e23a3a;
      flex-shrink: 0;
      min-width: 26px;
    }
    
    .chip-user{
      display:flex; 
      align-items:center; 
      gap:8px; 
      border:1px solid var(--line); 
      padding:6px 10px; 
      border-radius:999px; 
      background:#fff;
      transition: all 0.2s ease;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      min-width: 0;
      overflow: hidden;
      font-size: 13px;
      min-height: 32px;
      max-width: 200px;
    }
    
    .chip-user:hover {
      background: var(--bg);
      transform: translateY(-1px);
    }
    
    .chip-user .dot{
      width: 20px;
      height: 20px;
      border-radius:999px;
      background:#1e6bff;
      color:#fff;
      display:grid;
      place-items:center;
      font-size:11px;
      font-weight:800;
      flex-shrink: 0;
      min-width: 20px;
    }

    .page{
      padding: var(--section-gap) var(--container-padding);
      display: flex;
      flex-direction: column;
      gap: var(--section-gap);
      width: 100%;
      box-sizing: border-box;
      min-height: calc(100vh - 60px);
      transition: all 0.3s ease-in-out;
    }
    
    /* 화면 전환 애니메이션 */
    #view-list, #view-detail {
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
    
    #view-list.fade-out {
      opacity: 0;
      transform: translateY(-20px);
    }
    
    #view-detail.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    /* ===== Header panel ===== */
    .panel{
      background:var(--card); 
      border:1px solid var(--line); 
      border-radius:22px; 
      box-shadow:var(--shadow); 
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .panel-head{
      display:flex; 
      align-items:center; 
      justify-content:space-between;
      width: 100%;
      gap: 16px;
      min-height: 40px;
      flex-wrap: wrap;
    }
    
    .panel .left{
      display:flex; 
      align-items:center; 
      gap:10px;
      flex: 1;
      min-width: 0;
      min-height: 28px;
      flex-shrink: 1;
    }
    
    .round{
      width: 28px;
      height: 28px;
      border-radius:999px;
      display:grid;
      place-items:center;
      border:1px solid #ffd3d6;
      background:#fff5f6;
      color:#e23a3a;
      font-weight:900;
      flex-shrink: 0;
      min-width: 28px;
    }
    
    .total{
      color:#8b97ad;
      font-size: 13px;
      flex-shrink: 0;
      white-space: nowrap;
      min-height: 28px;
      display: flex;
      align-items: center;
    }
    
    .total b{
      color:#e23a3a
    }

    .search{
      display:flex; 
      align-items:center; 
      gap:10px; 
      margin-top:16px;
      width: 100%;
      min-height: 44px;
      flex-wrap: wrap;
    }
    
    .search .inp{
      flex:1; 
      display:flex; 
      align-items:center; 
      gap:8px; 
      border:1px solid var(--line); 
      border-radius:14px; 
      padding:10px 14px; 
      background:#fff;
      transition: all 0.2s ease;
      min-width: 0;
      min-height: 44px;
      display: flex;
      align-items: center;
      flex-shrink: 1;
    }
    
    .search .inp:focus-within {
      border-color: var(--blue);
      box-shadow: var(--focus);
      transform: translateY(-1px);
    }
    
    .search input{
      border:none; 
      outline:none; 
      width:100%; 
      font-size:14px;
      min-width: 0;
      min-height: 24px;
    }
    
    .filter{
      margin-top:12px; 
      display:flex;
      gap: 8px;
      width: 100%;
      min-height: 44px;
      flex-wrap: wrap;
    }
    
    .filter button{
      flex:1; 
      border:1px solid var(--line); 
      background:#fff; 
      border-radius:12px; 
      padding:10px; 
      font-weight:800; 
      color:#52607a;
      transition: all 0.2s ease;
      cursor: pointer;
      min-width: 0;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 1;
      min-width: 120px;
    }
    
    .filter button:hover {
      background: var(--bg);
      border-color: var(--blue);
      transform: translateY(-1px);
    }

    /* ===== List ===== */
    .list{
      display:flex; 
      flex-direction:column; 
      gap:12px; 
      margin-top:16px;
      width: 100%;
      min-height: 200px;
      flex-wrap: wrap;
    }
    
    .item{
      background:#fff; 
      border:1px solid var(--line); 
      border-radius:16px; 
      padding:14px; 
      box-shadow:var(--shadow); 
      cursor:pointer;
      transition: all 0.2s ease;
      width: 100%;
      box-sizing: border-box;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
    }
    
    .item:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(15,23,42,0.1);
    }
    
    .item-top{
      display:flex; 
      align-items:center; 
      justify-content:space-between; 
      color:#8693aa; 
      font-size:12px;
      width: 100%;
      gap: 8px;
      min-height: 20px;
    }
    
    .badge{
      display:inline-flex; 
      align-items:center; 
      gap:6px; 
      padding:4px 8px; 
      border-radius:999px; 
      background:#ffecec; 
      color:#d84c55; 
      font-weight:900;
      flex-shrink: 0;
      min-height: 20px;
      align-items: center;
    }
    
    .item-ask{
      margin:8px 0 10px;
      font-size: 14px;
      line-height: 1.4;
      width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      min-height: 40px;
      display: flex;
      align-items: center;
    }
    
    .chip{
      display:inline-flex; 
      padding:4px 8px; 
      border-radius:999px; 
      background:#f1f4fb; 
      color:#66748c; 
      font-weight:800; 
      font-size:12px;
      flex-shrink: 0;
      min-height: 20px;
      align-items: center;
    }
    
    .wrong-flag{
      display:inline-flex; 
      align-items:center; 
      gap:6px; 
      color:#e23a3a; 
      font-weight:800;
      flex-shrink: 0;
      white-space: nowrap;
      min-height: 20px;
    }

    /* ===== Detail ===== */
    
    /* 문제 정보 헤더 */
    .problem-header {
      margin-bottom: 20px;
      padding: 16px;
      background: var(--blue-050);
      border: 1px solid var(--blue-200);
      border-radius: 16px;
    }
    
    .problem-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    
    .problem-number {
      font-size: 18px;
      font-weight: 900;
      color: var(--text);
    }
    
    .problem-category {
      font-size: 14px;
      color: var(--muted);
      font-weight: 500;
    }
    
    /* 비디오 섹션 */
    .video{
      height:200px; 
      background: linear-gradient(135deg, #1e293b, #334155);
      border:1px solid #475569; 
      border-radius:16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 14px;
      min-height: 200px;
      position: relative;
      overflow: hidden;
    }
    
    .video-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-align: center;
    }
    
    .video-placeholder svg {
      opacity: 0.7;
    }
    
    .video-desc {
      font-size: 12px;
      opacity: 0.8;
      line-height: 1.4;
    }
    
    /* 문제 설명 */
    .problem-desc {
      background: var(--green-50);
      border: 1px solid var(--green-200);
      border-radius: 16px;
      padding: 20px;
    }
    
    .problem-desc h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 800;
      color: var(--green-700);
    }
    
    .desc-text {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text);
    }
    
    .sec{
      margin-top:16px;
      min-height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .qbox{
      border:1px solid var(--line); 
      background:#fff; 
      border-radius:16px; 
      padding:20px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .qbox .qtitle{
      margin-bottom: 20px;
      width: 100%;
    }
    
    .qbox .qtitle h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 800;
      color: var(--text);
    }
    
    .question-text {
      font-size: 16px;
      line-height: 1.6;
      color: var(--text);
      font-weight: 600;
    }
    
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .opt{
      display:flex; 
      align-items:center; 
      gap:10px; 
      padding:16px; 
      border:1px solid var(--line); 
      border-radius:14px; 
      background:#fff;
      transition: all 0.2s ease;
      cursor: pointer;
      margin-bottom: 8px;
      min-height: 60px;
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    
    .opt:hover {
      border-color: var(--blue);
      background: var(--blue-050);
      transform: translateY(-1px);
    }
    
    .num{
      width: 28px;
      height: 28px;
      border-radius:999px;
      display:grid;
      place-items:center;
      border:1px solid var(--line); 
      background:#f5f7fb; 
      color:#738099; 
      font-weight:800;
      flex-shrink: 0;
      min-width: 28px;
      min-height: 28px;
    }

    .opt.correct{
      border-color:#7bdab8; 
      background:var(--green-50);
      min-height: 60px;
    }
    
    .opt.correct .num{
      border-color:#9fe6cf; 
      background:#e7fff6; 
      color:#0b9b6b;
      min-height: 28px;
    }
    
    .opt.wrong{
      border-color:#ffb7bf; 
      background:var(--rose-50);
      min-height: 60px;
    }
    
    .opt.wrong .num{
      border-color:#ffc4cc; 
      background:#fff0f2; 
      color:#d9484c;
      min-height: 28px;
    }

    .actions{
      display:flex; 
      gap:12px; 
      margin-top:16px;
      min-height: 60px;
      align-items: center;
    }
    
    .half{
      flex:1;
      min-height: 48px;
    }
    
    .btn-primary{
      width:100%; 
      border:none; 
      border-radius:14px; 
      padding:16px; 
      background:linear-gradient(90deg,var(--blue),var(--blue-700)); 
      color:#fff; 
      font-weight:900; 
      box-shadow:0 10px 24px rgba(37,99,255,.25);
      transition: all 0.2s ease;
      cursor: pointer;
      height: var(--button-height);
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 32px rgba(37,99,255,.35);
    }
    
    .btn-ghost{
      width:100%; 
      border:1px solid #c7cedd; 
      border-radius:14px; 
      padding:16px; 
      background:#f1f3f6; 
      color:#3c4253; 
      font-weight:900;
      transition: all 0.2s ease;
      cursor: pointer;
      height: var(--button-height);
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn-ghost:hover {
      background: #e9ecef;
      transform: translateY(-1px);
    }

    .explain-section {
      margin-top: 24px;
    }
    
    .explain{
      border-radius:16px; 
      padding:20px; 
      margin-top:16px;
      line-height: 1.6;
      min-height: 120px;
      box-shadow: var(--shadow);
    }
    
    .explain.bad{
      border:1px solid var(--rose-200); 
      background:#fff7f8; 
      color:#a13136;
      min-height: 100px;
    }
    
    .explain.good{
      border:1px solid var(--green-200); 
      background:#f0fdf7; 
      color:#0e7d5a;
      min-height: 100px;
    }
    
    .law{
      margin-top:12px; 
      border:1px solid #dbe6ff; 
      background:#f5f8ff; 
      border-radius:12px; 
      padding:12px;
      min-height: 60px;
    }
    
    .law a{
      color:#2b67ff; 
      text-decoration:none; 
      font-weight:900;
      transition: color 0.2s ease;
      min-height: 20px;
      display: flex;
      align-items: center;
    }
    
    .law a:hover {
      color: var(--blue-700);
    }

    /* 추천 유사 문제 */
    .rec{
      margin-top:16px;
      min-height: 100px;
    }
    
    .rec h3{
      margin:8px 0 12px; 
      font-size:16px;
      font-weight: 800;
      min-height: 24px;
      display: flex;
      align-items: center;
    }
    
    .pill{
      display:flex; 
      align-items:center; 
      justify-content:space-between; 
      gap:10px; 
      padding:16px; 
      border-radius:14px; 
      border:1px solid var(--line); 
      background:#fff;
      transition: all 0.2s ease;
      cursor: pointer;
      margin-bottom: 8px;
      min-height: 80px;
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    
    .pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15,23,42,0.1);
    }
    
    .pill .name{
      font-weight:900;
      font-size: 14px;
      min-height: 20px;
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      flex-shrink: 1;
    }
    
    .pill .desc{
      font-size:12px; 
      color:#6b7a93; 
      margin-top:4px;
      line-height: 1.4;
      min-height: 40px;
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      flex-shrink: 1;
    }
    
    .pill .chev{
      width: 28px;
      height: 28px;
      border-radius:999px;
      border:1px solid var(--line);
      display:grid;
      place-items:center;
      background:#fff;
      flex-shrink: 0;
      min-width: 28px;
      min-height: 28px;
    }
    
    .pill.green{
      background:var(--green-50); 
      border-color:#d7f5ea;
      min-height: 80px;
    }
    
    .pill.amber{
      background:var(--amber-50); 
      border-color:#ffedc2;
      min-height: 80px;
    }
    
    .pill.rose{
      background:var(--rose-50); 
      border-color:#ffcfd6;
      min-height: 80px;
    }

    .backbar{
      position:sticky; 
      bottom:0; 
      background:var(--bg); 
      padding:16px 0 4px;
      margin-top: auto;
      min-height: 60px;
      display: flex;
      align-items: center;
    }
    
    .backbar .btn-ghost{
      background:#fff;
      width: 100%;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a:focus, button:focus, .pill:focus, .opt:focus{
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
      
      .page {
        padding: 20px 16px;
        gap: 20px;
      }
      
      .topbar {
        padding: 16px 16px;
        gap: 12px;
        flex-direction: column;
        align-items: stretch;
      }
      
      .row {
        justify-content: center;
        flex-shrink: 0;
      }
      
      .chip-user {
        align-self: center;
        max-width: none;
      }
      
      .title {
        font-size: 16px;
        gap: 6px;
      }
      
      .title .book {
        width: 24px;
        height: 24px;
      }
      
      .chip-user {
        padding: 6px 10px;
        font-size: 13px;
      }
      
      .chip-user .dot {
        width: 20px;
        height: 20px;
        font-size: 11px;
      }
      
      .btn-ic {
        width: 36px;
        height: 36px;
      }
      
      .panel {
        padding: 20px;
      }
      
      .search .inp {
        padding: 10px 14px;
      }
      
      .search {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search .inp {
        flex-shrink: 0;
      }
      
      .filter button {
        padding: 10px;
      }
      
      .filter {
        flex-direction: column;
        align-items: stretch;
      }
      
      .filter button {
        flex-shrink: 0;
        min-width: auto;
      }
      
      .item {
        padding: 14px;
      }
      
      .list {
        flex-direction: column;
        align-items: stretch;
      }
      
      .item {
        flex-shrink: 0;
      }
      
      .qbox {
        padding: 16px;
      }
      
      .qbox {
        flex-direction: column;
        align-items: stretch;
      }
      
      .qbox .qtitle {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      
      .opt {
        padding: 14px;
      }
      
      .opt {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        text-align: center;
      }
      
      .btn-primary, .btn-ghost {
        padding: 14px;
      }
      
      .pill {
        padding: 14px;
      }
      
      .pill {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        text-align: center;
      }
      
      .pill .name,
      .pill .desc {
        justify-content: center;
        text-align: center;
      }
      
      .pill .chev {
        align-self: center;
      }
      
      /* 모바일 터치 최적화 */
      .btn-ic, .filter button, .item, .opt, .pill {
        min-height: 44px;
      }
      
      .search .inp {
        min-height: 44px;
      }
      
      /* 모바일에서 더 나은 간격 */
      .filter {
        gap: 6px;
      }
      
      .filter button {
        font-size: 13px;
      }
      
      .item-ask {
        font-size: 13px;
        line-height: 1.5;
      }
      
      .chip {
        font-size: 11px;
        padding: 3px 6px;
      }
      
      .badge {
        font-size: 11px;
        padding: 3px 6px;
      }
      
      /* 모바일에서 비디오 높이 조정 */
      .video {
        height: 160px;
      }
      
      .video-placeholder {
        gap: 8px;
      }
      
      .video-placeholder svg {
        width: 36px;
        height: 36px;
      }
      
      .video-desc {
        font-size: 11px;
      }
      
      /* 모바일에서 문제 헤더 조정 */
      .problem-header {
        padding: 12px;
        margin-bottom: 16px;
      }
      
      .problem-info {
        gap: 8px;
        margin-bottom: 6px;
      }
      
      .problem-number {
        font-size: 16px;
      }
      
      .problem-category {
        font-size: 13px;
      }
      
      /* 모바일에서 문제 설명 조정 */
      .problem-desc {
        padding: 16px;
      }
      
      .problem-desc h3 {
        font-size: 15px;
        margin-bottom: 10px;
      }
      
      .desc-text {
        font-size: 13px;
      }
      
      /* 모바일에서 문제 질문 조정 */
      .qbox .qtitle h3 {
        font-size: 16px;
        margin-bottom: 10px;
      }
      
      .question-text {
        font-size: 14px;
      }
      
      /* 모바일에서 버튼 그룹 간격 조정 */
      .actions {
        gap: 8px;
      }
      
      /* 모바일에서 설명 텍스트 크기 조정 */
      .explain {
        font-size: 13px;
        padding: 14px;
      }
      
      .law {
        font-size: 12px;
        padding: 10px;
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
      
      .page {
        padding: 24px 12px;
        gap: 24px;
      }
      
      .topbar {
        padding: 16px 12px;
      }
      
      .btn-ic {
        width: 42px;
        height: 42px;
      }
      
      .panel {
        padding: 20px;
      }
      
      .search .inp {
        padding: 12px 16px;
      }
      
      .filter button {
        padding: 12px;
      }
      
      .item {
        padding: 16px;
      }
      
      .qbox {
        padding: 20px;
      }
      
      .opt {
        padding: 16px;
      }
      
      .btn-primary, .btn-ghost {
        padding: 16px;
      }
      
      .pill {
        padding: 16px;
      }
      
      /* 태블릿 터치 최적화 */
      .btn-ic, .filter button, .item, .opt, .pill {
        min-height: 48px;
      }
      
      /* 태블릿에서 새로운 UI 요소 조정 */
      .video {
        height: 180px;
      }
      
      .problem-header {
        padding: 18px;
        margin-bottom: 18px;
      }
      
      .problem-number {
        font-size: 17px;
      }
      
      .problem-category {
        font-size: 14px;
      }
      
      .problem-desc {
        padding: 18px;
      }
      
      .problem-desc h3 {
        font-size: 16px;
      }
      
      .desc-text {
        font-size: 14px;
      }
      
      .qbox .qtitle h3 {
        font-size: 17px;
      }
      
      .question-text {
        font-size: 15px;
      }
      
      .search .inp {
        min-height: 48px;
      }
      
      /* 태블릿에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .title {
        font-size: 18px;
        gap: 8px;
      }
      
      .title .book {
        width: 28px;
        height: 28px;
      }
      
      .chip-user {
        padding: 8px 14px;
        font-size: 14px;
        max-width: 180px;
      }
      
      .chip-user .dot {
        width: 24px;
        height: 24px;
        font-size: 13px;
      }
      
      /* 태블릿에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
      .panel-head .left {
        gap: 10px;
      }
      
      .round {
        width: 30px;
        height: 30px;
        font-size: 14px;
      }
      
      .total {
        font-size: 14px;
      }
      
      .row {
        flex-shrink: 1;
      }
      
      .title {
        flex-shrink: 1;
      }
      
      .panel-head {
        gap: 20px;
      }
      
      .panel .left {
        flex-shrink: 1;
      }
      
      .search {
        gap: 12px;
      }
      
      .search .inp {
        flex-shrink: 1;
      }
      
      .filter {
        gap: 10px;
      }
      
      .filter button {
        flex-shrink: 1;
        min-width: 140px;
      }
      
      .list {
        gap: 16px;
      }
      
      .item {
        flex-shrink: 0;
      }
      
      .qbox {
        gap: 20px;
      }
      
      .qbox .qtitle {
        gap: 10px;
      }
      
      .opt {
        gap: 12px;
      }
      
      .pill {
        gap: 12px;
      }
      
      .pill .name,
      .pill .desc {
        flex-shrink: 1;
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
      
      .page {
        padding: 24px 8px;
        gap: 24px;
      }
      
      .topbar {
        padding: 16px 8px;
      }
      
      .btn-ic {
        width: 42px;
        height: 42px;
      }
      
      .panel {
        padding: 20px;
      }
      
      .search .inp {
        padding: 12px 16px;
      }
      
      .filter button {
        padding: 12px;
      }
      
      .item {
        padding: 16px;
      }
      
      .qbox {
        padding: 20px;
      }
      
      .opt {
        padding: 16px;
      }
      
      .btn-primary, .btn-ghost {
        padding: 16px;
      }
      
      .pill {
        padding: 16px;
      }
      
      /* 데스크탑에서 새로운 UI 요소 조정 */
      .video {
        height: 220px;
      }
      
      .problem-header {
        padding: 20px;
        margin-bottom: 20px;
      }
      
      .problem-number {
        font-size: 18px;
      }
      
      .problem-category {
        font-size: 15px;
      }
      
      .problem-desc {
        padding: 20px;
      }
      
      .problem-desc h3 {
        font-size: 17px;
      }
      
      .desc-text {
        font-size: 15px;
      }
      
      .qbox .qtitle h3 {
        font-size: 18px;
      }
      
      .question-text {
        font-size: 16px;
      }
      
      /* 데스크탑에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .title {
        font-size: 20px;
        gap: 10px;
      }
      
      .title .book {
        width: 32px;
        height: 32px;
      }
      
      .chip-user {
        padding: 10px 16px;
        font-size: 15px;
        max-width: 200px;
      }
      
      .chip-user .dot {
        width: 26px;
        height: 26px;
        font-size: 14px;
      }
      
      /* 데스크탑에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
      .panel-head .left {
        gap: 12px;
      }
      
      .round {
        width: 34px;
        height: 34px;
        font-size: 16px;
      }
      
      .total {
        font-size: 16px;
      }
      
      .search .inp {
        min-height: 52px;
      }
      
      .filter button {
        min-height: 52px;
        font-size: 15px;
      }
      
      .item {
        min-height: 52px;
      }
      
      .qbox {
        min-height: 52px;
      }
      
      .opt {
        min-height: 52px;
      }
      
      .row {
        flex-shrink: 1;
      }
      
      .title {
        flex-shrink: 1;
      }
      
      .panel-head {
        gap: 24px;
      }
      
      .panel .left {
        flex-shrink: 1;
      }
      
      .search {
        gap: 16px;
      }
      
      .search .inp {
        flex-shrink: 1;
      }
      
      .filter {
        gap: 12px;
      }
      
      .filter button {
        flex-shrink: 1;
        min-width: 160px;
      }
      
      .list {
        gap: 20px;
      }
      
      .item {
        flex-shrink: 0;
      }
      
      .qbox {
        gap: 24px;
      }
      
      .qbox .qtitle {
        gap: 12px;
      }
      
      .opt {
        gap: 16px;
      }
      
      .pill {
        gap: 16px;
      }
      
      .pill .name,
      .pill .desc {
        flex-shrink: 1;
      }
    }

    /* ===== 매우 큰 화면 최적화 ===== */
    @media (min-width: 1200px) {
      .app {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .topbar {
        padding: 20px 16px;
      }
      
      .page {
        padding: 32px 16px;
        gap: 32px;
      }
      
      .panel {
        padding: 28px;
      }
      
      /* 매우 큰 화면에서 새로운 UI 요소 조정 */
      .video {
        height: 240px;
      }
      
      .problem-header {
        padding: 24px;
        margin-bottom: 24px;
      }
      
      .problem-number {
        font-size: 20px;
      }
      
      .problem-category {
        font-size: 16px;
      }
      
      .problem-desc {
        padding: 24px;
      }
      
      .problem-desc h3 {
        font-size: 18px;
      }
      
      .desc-text {
        font-size: 16px;
      }
      
      .qbox .qtitle h3 {
        font-size: 20px;
      }
      
      .question-text {
        font-size: 18px;
      }
      
      /* 매우 큰 화면에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .title {
        font-size: 22px;
        gap: 12px;
      }
      
      .title .book {
        width: 36px;
        height: 36px;
      }
      
      .chip-user {
        padding: 12px 20px;
        font-size: 16px;
        max-width: 220px;
      }
      
      .chip-user .dot {
        width: 28px;
        height: 28px;
        font-size: 15px;
      }
      
      /* 매우 큰 화면에서 패널 내부 요소들이 화면 너비에 맞게 확장되도록 */
      .panel-head .left {
        gap: 14px;
      }
      
      .round {
        width: 38px;
        height: 38px;
        font-size: 18px;
      }
      
      .total {
        font-size: 18px;
      }
      
      .search .inp {
        min-height: 56px;
      }
      
      .filter button {
        min-height: 56px;
        font-size: 16px;
      }
      
      .item {
        min-height: 56px;
      }
      
      .qbox {
        min-height: 56px;
      }
      
      .opt {
        min-height: 56px;
      }
      
      .row {
        flex-shrink: 1;
      }
      
      .title {
        flex-shrink: 1;
      }
      
      .panel-head {
        gap: 28px;
      }
      
      .panel .left {
        flex-shrink: 1;
      }
      
      .search {
        gap: 20px;
      }
      
      .search .inp {
        flex-shrink: 1;
      }
      
      .filter {
        gap: 16px;
      }
      
      .filter button {
        flex-shrink: 1;
        min-width: 180px;
      }
      
      .list {
        gap: 24px;
      }
      
      .item {
        flex-shrink: 0;
      }
      
      .qbox {
        gap: 28px;
      }
      
      .qbox .qtitle {
        gap: 16px;
      }
      
      .opt {
        gap: 20px;
      }
      
      .pill {
        gap: 20px;
      }
      
      .pill .name,
      .pill .desc {
        flex-shrink: 1;
      }
    }
  </style>

  <div class="app">
    <!-- topbar -->
    <header class="topbar">
      <div class="row">
        <button id="openDrawer" class="btn-ic" aria-label="메뉴" data-open-drawer>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <div class="title">
          <span class="book">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e23a3a" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h8"/></svg>
          </span>
          오답노트
        </div>
      </div>
      <div class="chip-user"><span class="dot">김</span> 김운전</div>
    </header>

    <!-- ===== View: List ===== -->
    <section id="view-list" class="page">
      <div class="panel">
        <div class="panel-head">
          <div class="left">
            <span class="round">✖</span>
            <div>
              <div style="font-weight:900">오답노트</div>
              <div style="color:#8b97ad">틀린 문제를 다시 학습하세요</div>
            </div>
          </div>
          <div class="total">총 오답 수 <b id="totalWrong">0</b></div>
        </div>

        <div class="search">
          <div class="inp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7b879b" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3-3"></path></svg>
            <input id="search" placeholder="문제 검색..." />
          </div>
        </div>

        <div class="filter">
          <button id="filterAll">전체</button>
        </div>
      </div>

      <div id="listWrap" class="list"></div>
    </section>

    <!-- ===== View: Detail ===== -->
    <section id="view-detail" class="page" hidden>
      <div class="panel">
        <div class="panel-head">
          <div class="left">
            <span class="round">✖</span>
            <div>
              <div style="font-weight:900">오답노트</div>
              <div style="color:#8b97ad">틀린 문제를 다시 학습하세요</div>
            </div>
          </div>
          <div class="total">총 오답 수 <b id="totalWrong2">0</b></div>
        </div>

        <!-- 문제 정보 헤더 -->
        <div class="problem-header">
          <div class="problem-info">
            <span class="problem-number">문제 <span id="dNo"></span></span>
            <span id="dWrongBadge" class="badge">오답</span>
          </div>
          <div class="problem-category" id="dCategory"></div>
        </div>

        <!-- 비디오 섹션 -->
        <div class="sec video">
          <div class="video-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
            <div>문제 관련 영상</div>
            <div class="video-desc">실제 문제 상황을 보여주는 영상이 여기에 표시됩니다</div>
          </div>
        </div>

        <!-- 문제 설명 -->
        <div class="sec problem-desc">
          <h3>상황 설명</h3>
          <div id="dDesc" class="desc-text"></div>
        </div>

        <!-- 문제 질문 -->
        <div class="sec qbox">
          <div class="qtitle">
            <h3>문제</h3>
            <div id="dAsk" class="question-text"></div>
          </div>
          <div id="dOpts" class="options-container"></div>
        </div>

        <div id="explainWrap"></div>

        <div class="actions">
          <button id="retryBtn" class="btn-primary half">↻ 다시 풀기</button>
          <button id="saveBtn" class="btn-ghost half">□ 저장 문제</button>
        </div>

        <div class="rec">
          <h3>AI 추천 유사 문제</h3>
          <button class="pill green">
            <div><div class="name">쉬움</div><div class="desc">스쿨존에서 어린이가 뛰어나올 때 대처 방법은?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
          <button class="pill amber">
            <div><div class="name">보통</div><div class="desc">고속도로에서 차선을 변경할 때 주의 사항은?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
          <button class="pill rose">
            <div><div class="name">어려움</div><div class="desc">빗길에서 미끄러질 수 있는 상황에서 브레이크 조작법?</div></div>
            <span class="chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
          </button>
        </div>

        <!-- 뒤로가기 버튼 -->
        <div class="backbar">
          <button id="backToList" class="btn-ghost">← 목록으로 돌아가기</button>
        </div>
      </div>
    </section>
  </div>
  `;
}

export function mount(root) {
  const qs  = (s, sc = root) => sc.querySelector(s);
  const qsa = (s, sc = root) => Array.from(sc.querySelectorAll(s));

  // ===== Mock data (원본 그대로) =====
  const wrongs = [
    {
      id: 15, date: '2024-01-10', tag: '신호 위반',
      ask: '교차로에서 신호위반으로 갑시다. 신호를 위반했을 때 벌점은?',
      options: ['앞차를 추월하여 빠르게 교차로를 통과한다', '안전거리를 유지하여 정차한 앞차에 정차한다', '좌측으로 우회 앞차에게 신호를 보낸다', '클락션으로 앞차 속도 통과한다'],
      answer: 1,
      desc: '교차로에 신호등이 있습니다. 신호등의 불빛은 빨간불로 바뀌었고, 앞차가 급정거했습니다.'
    },
    {
      id: 23, date: '2024-01-08', tag: '차선 변경',
      ask: '편도 2차로 도로에서 주행 중입니다. 앞 차량이 우회전 신호를 켜고 있을 때 행동은?',
      options: ['즉시 추월한다', '속도를 줄이고 앞 차량의 진로를 배려한다', '클락션을 울리며 진행한다', '차선을 바꾸어 가속한다'],
      answer: 1,
      desc: '좌측 차로는 원활하나 우측에서 차량이 감속하며 우회전을 준비합니다.'
    },
    {
      id: 8, date: '2024-01-15', tag: '추월',
      ask: '중앙선이 있는 도로에서 주행 중입니다. 앞차가 아예 도로를 막아서고 있습니다.',
      options: ['중앙선을 넘어 추월한다', '안전거리를 유지하고 정차한다', '경음기를 울리며 추월 시도', '상향등을 켠다'],
      answer: 1,
      desc: '중앙선이 있어 추월이 금지된 상황입니다. 앞차는 정체로 멈춰 있습니다.'
    }
  ];

  // ===== State =====
  let current = null; // 현재 상세 아이템
  let picked  = null;
  const saved = new Set(JSON.parse(localStorage.getItem('ai_go_saved_wrong') || '[]'));

  // ===== Views =====
  const vList   = qs('#view-list');
  const vDetail = qs('#view-detail');

  function show(view) {
    // 기존 애니메이션 클래스 제거
    vList.classList.remove('fade-in', 'fade-out');
    vDetail.classList.remove('fade-in', 'fade-out');
    
    if (view === 'list') {
      // 문제 목록 화면으로 전환
      vDetail.style.display = 'none';
      setTimeout(() => {
        vList.style.display = 'block';
        vList.classList.add('fade-in');
        document.title = '오답노트 - 문제 목록';
      }, 50);
    } else if (view === 'detail') {
      // 문제 풀이 화면으로 전환
      vList.classList.add('fade-out');
      setTimeout(() => {
        vList.style.display = 'none';
        vDetail.style.display = 'block';
        vDetail.classList.add('fade-in');
        document.title = '오답노트 - 문제 풀이';
      }, 300);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ===== List render =====
  function renderList(items) {
    qs('#totalWrong').textContent = wrongs.length; // 원본과 동일(필터 수가 아님)
    const wrap = qs('#listWrap');
    wrap.innerHTML = '';
    items.forEach(row => {
      const el = document.createElement('article');
      el.className = 'item';
      el.innerHTML = `
        <div class="item-top">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="badge">문제 ${row.id}</span>
            <span>${row.date}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fa0b5" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </div>
        <div class="item-ask">${row.ask}</div>
        <div style="display:flex;align-items:center; justify-content:space-between">
          <span class="chip">${row.tag}</span>
          <span class="wrong-flag">✖ 오답</span>
        </div>
      `;
      el.addEventListener('click', () => openDetail(row));
      wrap.appendChild(el);
    });
  }

  // ===== Detail render =====
  function openDetail(row) {
    current = row;
    picked  = null;
    qs('#totalWrong2').textContent = wrongs.length;
    qs('#dNo').textContent  = row.id;
    qs('#dAsk').textContent = row.ask;
    qs('#dDesc').textContent = row.desc;
    qs('#dCategory').textContent = row.tag;
    qs('#explainWrap').innerHTML = '';
    renderOptions(row);
    updateSaveButton();
    show('detail');
  }

  function renderOptions(row) {
    const box = qs('#dOpts');
    box.innerHTML = '';
    row.options.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.innerHTML = `<span class="num">${i + 1}</span><span>${t}</span>`;
      b.addEventListener('click', () => {
        picked = i;
        // 초기화
        qsa('.opt', box).forEach(el => el.classList.remove('correct', 'wrong'));
        if (picked === row.answer) {
          b.classList.add('correct');
          showExplain(true, row);
        } else {
          b.classList.add('wrong');
          // 정답 강조
          const corr = box.children[row.answer];
          if (corr) corr.classList.add('correct');
          showExplain(false, row);
        }
      });
      box.appendChild(b);
    });
  }

  function showExplain(ok, row) {
    const w = qs('#explainWrap');
    const cls   = ok ? 'good' : 'bad';
    const title = ok ? '✅ 정답입니다!' : '❌ 오답입니다!';
    w.innerHTML = `
      <div class="explain ${cls}">
        <div style="font-weight:900;margin-bottom:6px">${title}</div>
        <div style="line-height:1.6">${detailText(row)}</div>
        <div class="law">
          <div style="font-weight:800; margin-bottom:4px">관련 법규</div>
          <a href="#" aria-label="도로교통법 제19조 (차로의 변경)">도로교통법 제19조 (차로의 변경)</a>
        </div>
      </div>
    `;
  }

  function detailText(row) {
    if (row.tag === '차선 변경') {
      return '차선 변경 시에는 먼저 룸미러를 통해 뒤차와의 거리를 확인하고, 방향지시등을 켠 후, 사각지대 확인을 다음 안전하게 차선을 변경해야 합니다.';
    }
    if (row.tag === '신호 위반') {
      return '신호 위반 상황에서는 속도를 줄이고 안전거리를 유지한 채 정차해야 하며, 신호가 바뀐 후 교차로를 통과해야 합니다.';
    }
    return row.desc;
  }

  // 저장 문제
  const saveBtn = qs('#saveBtn');
  function updateSaveButton() {
    if (!current) return;
    const isSaved = saved.has(current.id);
    saveBtn.textContent = isSaved ? '■ 저장 해제' : '□ 저장 문제';
  }
  const onSave = () => {
    if (!current) return;
    if (saved.has(current.id)) saved.delete(current.id);
    else saved.add(current.id);
    localStorage.setItem('ai_go_saved_wrong', JSON.stringify(Array.from(saved)));
    updateSaveButton();
  };
  saveBtn.addEventListener('click', onSave);

  // 다시 풀기
  const onRetry = () => {
    if (!current) return;
    qs('#explainWrap').innerHTML = '';
    renderOptions(current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  qs('#retryBtn').addEventListener('click', onRetry);

  // 뒤로 가기
  const onBack = () => {
    // 문제 풀이 상태 초기화
    current = null;
    picked = null;
    qs('#explainWrap').innerHTML = '';
    show('list');
  };
  qs('#backToList').addEventListener('click', onBack);

  // 검색
  const search = qs('#search');
  const onSearch = () => {
    const q = search.value.trim();
    const filtered = q ? wrongs.filter(r => r.ask.includes(q) || r.tag.includes(q)) : wrongs;
    renderList(filtered);
  };
  search.addEventListener('input', onSearch);

  // AI 추천 문제 클릭 이벤트
  qsa('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const difficulty = pill.dataset.difficulty;
      const name = pill.querySelector('.name').textContent;
      const desc = pill.querySelector('.desc').textContent;
      
      // 여기에 AI 추천 문제로 이동하는 로직을 추가할 수 있습니다
      console.log(`AI 추천 문제: ${difficulty} - ${name}: ${desc}`);
      
      // 예시: 새로운 문제 생성 또는 기존 문제로 이동
      alert(`${name} 난이도의 문제로 이동합니다: ${desc}`);
    });
  });

  // 초기 상태 설정
  vDetail.style.display = 'none';
  vList.style.display = 'block';
  
  // 초기 렌더
  renderList(wrongs);
  show('list');

  // 언마운트 정리 함수
  return () => {
    saveBtn.removeEventListener('click', onSave);
    qs('#retryBtn')?.removeEventListener('click', onRetry);
    qs('#backToList')?.removeEventListener('click', onBack);
    search?.removeEventListener('input', onSearch);
  };
}
