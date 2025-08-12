// app/views/mypage/mypage.js
import { store } from '../../js/store.js';

export async function render() {
  // CSS와 HTML을 직접 반환
  const css = `
    /* ===== CSS 변수 시스템 ===== */
    :root {
      --bg: #f6f8fb;
      --card: #fff;
      --line: #e6e8ee;
      --text: #0f172a;
      --muted: #66748c;
      --blue: #2563ff;
      --blue-700: #1f54f0;
      --blue-050: #eef4ff;
      --green: #10b981;
      --green-050: #ecfdf5;
      --rose: #ef4444;
      --rose-050: #fff1f2;
      --shadow: 0 8px 28px rgba(15,23,42,.06);
      --radius: 18px;
      --focus: 0 0 0 3px rgba(37,99,255,.18);
      
      /* 모바일 웹 표준 여백 시스템 */
      --container-padding: 16px;
      --section-gap: 24px;
      --card-gap: 16px;
      --border-radius: 16px;
      --button-height: 48px;
      --icon-size: 24px;
    }
    
    * {
      box-sizing: border-box;
    }
    
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      background: var(--bg);
      color: var(--text);
      font-family: "Pretendard", "Noto Sans KR", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    }
    
    /* ===== 메인 컨테이너 ===== */
    .mypage {
      width: 100%;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      font-family: "Pretendard", "Noto Sans KR", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      max-width: 100vw;
      overflow-x: hidden;
    }
    
    /* ===== 상단 헤더 ===== */
    .mypage .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: #fff;
      border-bottom: 1px solid var(--line);
      padding: 16px var(--container-padding);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      min-height: 64px;
      gap: 12px;
    }
    
    .mypage .topbar .menu-btn {
      width: 24px;
      height: 24px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      min-width: 24px;
      min-height: 24px;
    }
    
    .mypage .topbar .menu-btn svg {
      width: 20px;
      height: 20px;
      stroke: var(--text);
      stroke-width: 2;
      flex-shrink: 0;
    }
    
    .mypage .topbar .brand {
      font-weight: 900;
      font-size: 18px;
      color: var(--blue);
      flex-shrink: 0;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .mypage .topbar .brand .logo-img {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      min-width: 32px;
      min-height: 32px;
      object-fit: contain;
    }
    
    .mypage .topbar .brand .brand-text {
      color: var(--blue);
      font-weight: 900;
      font-size: 18px;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .mypage .topbar .chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: var(--card);
      cursor: pointer;
      transition: all .2s;
      flex-shrink: 0;
      min-width: 0;
      overflow: hidden;
      min-height: 40px;
    }
    
    .mypage .topbar .chip:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow);
    }
    
    .mypage .topbar .chip .avatar {
      width: 24px;
      height: 24px;
      border-radius: 999px;
      background: var(--blue);
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 12px;
      font-weight: 900;
      flex-shrink: 0;
      min-width: 24px;
      min-height: 24px;
    }
    
    .mypage .topbar .chip .name {
      font-weight: 700;
      color: var(--text);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-height: 20px;
      display: flex;
      align-items: center;
    }
    
    /* ===== 프로필 헤더 ===== */
    .mypage .hero {
      padding: 20px var(--container-padding) 18px;
      background: linear-gradient(160deg, #1261ff 0%, #3f57ff 38%, #5a3df8 72%, #7e31f3 100%);
      color: #fff;
      position: relative;
      overflow: hidden;
      box-shadow: 0 14px 30px rgba(54,80,255,.25);
      width: 100%;
      box-sizing: border-box;
    }
    
    .mypage .hero .top {
      display: flex;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 64px;
      flex-wrap: wrap;
    }
    
    .mypage .avatar {
      width: 64px;
      height: 64px;
      border-radius: 999px;
      background: rgba(255,255,255,.15);
      border: 2px solid rgba(255,255,255,.55);
      display: grid;
      place-items: center;
      font-size: 28px;
      flex-shrink: 0;
      min-width: 64px;
      min-height: 64px;
    }
    
    .mypage .who {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .mypage .who .name {
      font-weight: 900;
      font-size: 20px;
      min-height: 28px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .mypage .who .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e7ecff;
      font-size: 12px;
      margin-top: 6px;
      min-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .mypage .who .meta svg {
      opacity: .9;
      flex-shrink: 0;
      min-width: 12px;
      min-height: 12px;
    }
    
    .mypage .who .meta span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* ===== 통계 카드 ===== */
    .mypage .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .mypage .stat {
      background: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      transition: all 0.2s ease;
    }
    
    .mypage .stat:hover {
      background: rgba(255,255,255,.15);
      transform: translateY(-2px);
    }
    
    .mypage .stat .badge {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
      min-height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mypage .stat .num {
      font-weight: 900;
      font-size: 18px;
      margin-bottom: 4px;
      min-height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mypage .stat .cap {
      font-size: 11px;
      opacity: .9;
      min-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 1.2;
    }
    
    /* ===== 메인 섹션 ===== */
    .mypage .section {
      padding: var(--section-gap) var(--container-padding);
      display: flex;
      flex-direction: column;
      gap: var(--section-gap);
      width: 100%;
      box-sizing: border-box;
    }
    
    .mypage .sec-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 900;
      font-size: 16px;
      margin-bottom: 16px;
      color: var(--text);
      min-height: 24px;
      display: flex;
      align-items: center;
    }
    
    .mypage .item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: var(--card);
      margin-bottom: 8px;
      cursor: pointer;
      transition: all .2s;
      width: 100%;
      box-sizing: border-box;
      min-height: 80px;
      flex-shrink: 0;
      border: none;
      text-align: left;
    }
    
    .mypage .item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow);
      border-color: var(--blue);
    }
    
    .mypage .i-left {
      font-size: 20px;
      flex-shrink: 0;
      min-width: 20px;
      min-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mypage .item > div:nth-child(2) {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .mypage .i-title {
      font-weight: 700;
      margin-bottom: 4px;
      min-height: 20px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .mypage .i-sub {
      font-size: 13px;
      color: var(--muted);
      min-height: 18px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.3;
    }
    
    .mypage .chev {
      margin-left: auto;
      opacity: .5;
      flex-shrink: 0;
      min-width: 16px;
      min-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* ===== 로그아웃 ===== */
    .mypage .logout-wrap {
      margin-top: 24px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .mypage .logout {
      width: 100%;
      padding: 16px;
      border: 1px solid var(--rose);
      border-radius: 16px;
      background: var(--rose);
      color: #fff;
      font-weight: 900;
      font-size: 16px;
      cursor: pointer;
      transition: all .2s;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    
    .mypage .logout:hover {
      background: var(--rose-700);
      transform: translateY(-2px);
    }
    
    /* ===== 모달 ===== */
    .mypage .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      display: none;
      z-index: 1000;
      place-items: center;
    }
    
    .mypage .overlay.show {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mypage .dialog {
      background: var(--card);
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      max-width: 300px;
      width: 90%;
      box-sizing: border-box;
    }
    
    .mypage .dicon {
      width: 46px;
      height: 46px;
      border-radius: 999px;
      background: #ffeeef;
      border: 1px solid #ffd9dc;
      color: #d33;
      display: grid;
      place-items: center;
      margin: 0 auto 10px;
      flex-shrink: 0;
      min-width: 46px;
      min-height: 46px;
    }
    
    .mypage .dialog h3 {
      margin: 4px 0 6px;
      min-height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mypage .dialog p {
      margin: 0 0 12px;
      color: #6b7a93;
      min-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.4;
    }
    
    .mypage .btns {
      display: flex;
      gap: 10px;
      margin-top: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .mypage .btn {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: #f3f5f8;
      font-weight: 900;
      cursor: pointer;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    
    .mypage .btn-danger {
      border-color: #ef4444;
      background: #ef4444;
      color: #fff;
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
      
      .mypage .topbar {
        padding: 16px 16px;
        min-height: 56px;
        gap: 10px;
      }
      
      .mypage .hero {
        padding: 20px 16px 18px;
      }
      
      .mypage .section {
        padding: 20px 16px;
        gap: 20px;
      }
      
      .mypage .avatar {
        width: 56px;
        height: 56px;
        font-size: 24px;
        min-width: 56px;
        min-height: 56px;
      }
      
      .mypage .who .name {
        font-size: 18px;
        min-height: 24px;
      }
      
      .mypage .stats {
        gap: 8px;
        grid-template-columns: 1fr 1fr;
      }
      
      .mypage .stat {
        padding: 14px;
        min-height: 90px;
      }
      
      .mypage .item {
        padding: 14px;
        min-height: 70px;
      }
      
      .mypage .logout {
        padding: 14px;
      }
      
      /* 모바일에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .mypage .hero .top {
        gap: 10px;
        min-height: 56px;
      }
      
      .mypage .who {
        min-width: 0;
        overflow: hidden;
      }
      
      .mypage .who .name {
        font-size: 16px;
        min-height: 24px;
      }
      
      .mypage .who .meta {
        font-size: 11px;
        min-height: 18px;
      }
      
      /* 모바일에서 통계 카드 최적화 */
      .mypage .stat .badge {
        font-size: 20px;
        min-height: 20px;
      }
      
      .mypage .stat .num {
        font-size: 16px;
        min-height: 20px;
      }
      
      .mypage .stat .cap {
        font-size: 10px;
        min-height: 14px;
      }
      
      /* 모바일에서 메뉴 아이템 최적화 */
      .mypage .i-left {
        font-size: 18px;
        min-width: 18px;
        min-height: 18px;
      }
      
      .mypage .i-title {
        font-size: 15px;
        min-height: 18px;
      }
      
      .mypage .i-sub {
        font-size: 12px;
        min-height: 16px;
      }
      
      .mypage .chev {
        min-width: 14px;
        min-height: 14px;
      }
      
      /* 모바일 터치 최적화 */
      .mypage .item, .mypage .logout, .mypage .stat {
        min-height: 44px; /* 터치 최소 크기 */
      }
      
      /* 모바일에서 상단 헤더 최적화 */
      .mypage .topbar .brand .logo-img {
        width: 28px;
        height: 28px;
        min-width: 28px;
        min-height: 28px;
      }
      
      .mypage .topbar .brand .brand-text {
        font-size: 16px;
      }
      
      .mypage .topbar .chip {
        padding: 6px 10px;
        min-height: 36px;
      }
      
      .mypage .topbar .chip .avatar {
        width: 20px;
        height: 20px;
        font-size: 10px;
        min-width: 20px;
        min-height: 20px;
      }
      
      .mypage .topbar .chip .name {
        font-size: 13px;
        min-height: 18px;
      }
    }

    @media (min-width: 481px) and (max-width: 768px) {
      :root {
        --container-padding: 20px;
        --section-gap: 28px;
        --card-gap: 18px;
        --border-radius: 18px;
        --button-height: 52px;
        --icon-size: 26px;
      }
      
      .mypage .topbar {
        padding: 20px 20px;
        min-height: 68px;
        gap: 14px;
      }
      
      .mypage .topbar .brand .logo-img {
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
      }
      
      .mypage .hero {
        padding: 24px 20px 20px;
      }
      
      .mypage .section {
        padding: 28px 20px;
        gap: 28px;
      }
      
      .mypage .avatar {
        width: 68px;
        height: 68px;
        font-size: 30px;
        min-width: 68px;
        min-height: 68px;
      }
      
      .mypage .who .name {
        font-size: 19px;
      }
      
      .mypage .stats {
        gap: 14px;
      }
      
      .mypage .stat {
        padding: 18px;
        min-height: 110px;
      }
      
      .mypage .item {
        padding: 18px;
        min-height: 85px;
      }
      
      .mypage .logout {
        padding: 18px;
      }
      
      /* 태블릿에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .mypage .hero .top {
        gap: 14px;
        min-height: 68px;
      }
      
      .mypage .who .name {
        font-size: 19px;
        min-height: 26px;
      }
      
      .mypage .who .meta {
        font-size: 12px;
        min-height: 20px;
      }
      
      /* 태블릿에서 통계 카드 최적화 */
      .mypage .stat .badge {
        font-size: 22px;
        min-height: 22px;
      }
      
      .mypage .stat .num {
        font-size: 17px;
        min-height: 21px;
      }
      
      .mypage .stat .cap {
        font-size: 11px;
        min-height: 16px;
      }
      
      /* 태블릿에서 메뉴 아이템 최적화 */
      .mypage .i-left {
        font-size: 19px;
        min-width: 19px;
        min-height: 19px;
      }
      
      .mypage .i-title {
        font-size: 15px;
        min-height: 19px;
      }
      
      .mypage .i-sub {
        font-size: 13px;
        min-height: 18px;
      }
      
      .mypage .chev {
        min-width: 15px;
        min-height: 15px;
      }
    }

    @media (min-width: 769px) {
      :root {
        --container-padding: 24px;
        --section-gap: 32px;
        --card-gap: 20px;
        --border-radius: 20px;
        --button-height: 56px;
        --icon-size: 28px;
      }
      
      .mypage .topbar {
        padding: 24px 24px;
        min-height: 72px;
        gap: 16px;
      }
      
      .mypage .topbar .brand .logo-img {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
      }
      
      .mypage .hero {
        padding: 28px 24px 24px;
      }
      
      .mypage .section {
        padding: 32px 24px;
        gap: 32px;
      }
      
      .mypage .avatar {
        width: 72px;
        height: 72px;
        font-size: 32px;
        min-width: 72px;
        min-height: 72px;
      }
      
      .mypage .who .name {
        font-size: 20px;
      }
      
      .mypage .stats {
        gap: 16px;
      }
      
      .mypage .stat {
        padding: 20px;
        min-height: 120px;
      }
      
      .mypage .item {
        padding: 20px;
        min-height: 90px;
      }
      
      .mypage .logout {
        padding: 20px;
      }
      
      /* 데스크탑에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .mypage .hero .top {
        gap: 16px;
        min-height: 72px;
      }
      
      .mypage .who .name {
        font-size: 20px;
        min-height: 28px;
      }
      
      .mypage .who .meta {
        font-size: 13px;
        min-height: 22px;
      }
      
      /* 데스크탑에서 통계 카드 최적화 */
      .mypage .stat .badge {
        font-size: 24px;
        min-height: 24px;
      }
      
      .mypage .stat .num {
        font-size: 18px;
        min-height: 22px;
      }
      
      .mypage .stat .cap {
        font-size: 11px;
        min-height: 16px;
      }
      
      /* 데스크탑에서 메뉴 아이템 최적화 */
      .mypage .i-left {
        font-size: 20px;
        min-width: 20px;
        min-height: 20px;
      }
      
      .mypage .i-title {
        font-size: 16px;
        min-height: 20px;
      }
      
      .mypage .i-sub {
        font-size: 13px;
        min-height: 18px;
      }
      
      .mypage .chev {
        min-width: 16px;
        min-height: 16px;
      }
    }
    
    /* ===== 매우 큰 화면 최적화 ===== */
    @media (min-width: 1200px) {
      .mypage {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .mypage .topbar {
        padding: 28px 28px;
        min-height: 80px;
        gap: 20px;
      }
      
      .mypage .topbar .brand .logo-img {
        width: 36px;
        height: 36px;
        min-width: 36px;
        min-height: 36px;
      }
      
      .mypage .hero {
        padding: 32px 28px 28px;
      }
      
      .mypage .section {
        padding: 40px 28px;
        gap: 40px;
      }
      
      .mypage .avatar {
        width: 80px;
        height: 80px;
        font-size: 36px;
        min-width: 80px;
        min-height: 80px;
      }
      
      .mypage .who .name {
        font-size: 22px;
        min-height: 30px;
      }
      
      .mypage .who .meta {
        font-size: 14px;
        min-height: 24px;
      }
      
      .mypage .stats {
        gap: 20px;
      }
      
      .mypage .stat {
        padding: 24px;
        min-height: 130px;
      }
      
      .mypage .item {
        padding: 24px;
        min-height: 100px;
      }
      
      .mypage .logout {
        padding: 24px;
      }
      
      /* 매우 큰 화면에서 헤더 요소들이 화면 너비에 맞게 확장되도록 */
      .mypage .hero .top {
        gap: 20px;
        min-height: 80px;
      }
      
      /* 매우 큰 화면에서 통계 카드 최적화 */
      .mypage .stat .badge {
        font-size: 26px;
        min-height: 26px;
      }
      
      .mypage .stat .num {
        font-size: 20px;
        min-height: 24px;
      }
      
      .mypage .stat .cap {
        font-size: 12px;
        min-height: 18px;
      }
      
      /* 매우 큰 화면에서 메뉴 아이템 최적화 */
      .mypage .i-left {
        font-size: 22px;
        min-width: 22px;
        min-height: 22px;
      }
      
      .mypage .i-title {
        font-size: 17px;
        min-height: 22px;
      }
      
      .mypage .i-sub {
        font-size: 14px;
        min-height: 20px;
      }
      
      .mypage .chev {
        min-width: 18px;
        min-height: 18px;
      }
    }
    
    /* ===== 모바일 터치 최적화 ===== */
    @media (hover: none) and (pointer: coarse) {
      /* 터치 디바이스에서 호버 효과 제거 */
      .mypage .item:hover, .mypage .stat:hover, .mypage .logout:hover {
        transform: none;
        box-shadow: var(--shadow);
      }
      
      /* 터치 디바이스에서 활성 상태 스타일 */
      .mypage .item:active, .mypage .stat:active, .mypage .logout:active {
        transform: scale(0.98);
        opacity: 0.8;
      }
      
      /* 터치 디바이스에서 포커스 스타일 강화 */
      .mypage .item:focus, .mypage .stat:focus, .mypage .logout:focus {
        outline: 2px solid var(--blue);
        outline-offset: 2px;
      }
    }
    
    /* ===== 세로 모드 최적화 ===== */
    @media (orientation: portrait) and (max-width: 480px) {
      .mypage .topbar {
        padding: 16px 16px;
        min-height: 56px;
      }
      
      .mypage .hero {
        padding: 16px 16px 14px;
      }
      
      .mypage .section {
        padding: 16px 16px;
        gap: 16px;
      }
      
      .mypage .avatar {
        width: 48px;
        height: 48px;
        font-size: 20px;
        min-width: 48px;
        min-height: 48px;
      }
      
      .mypage .who .name {
        font-size: 16px;
      }
      
      .mypage .stats {
        gap: 6px;
      }
      
      .mypage .stat {
        padding: 12px;
        min-height: 80px;
      }
      
      .mypage .item {
        padding: 12px;
        min-height: 60px;
      }
      
      .mypage .logout {
        padding: 12px;
      }
    }
    
    /* ===== 가로 모드 최적화 ===== */
    @media (orientation: landscape) and (max-height: 500px) {
      .mypage .topbar {
        padding: 16px var(--container-padding);
        min-height: 56px;
      }
      
      .mypage .hero {
        padding: 16px var(--container-padding) 12px;
      }
      
      .mypage .section {
        padding: 20px var(--container-padding);
        gap: 20px;
      }
      
      .mypage .avatar {
        width: 56px;
        height: 56px;
        font-size: 24px;
        min-width: 56px;
        min-height: 56px;
      }
      
      .mypage .who .name {
        font-size: 18px;
        min-height: 24px;
      }
      
      .mypage .who .meta {
        font-size: 11px;
        min-height: 18px;
      }
      
      .mypage .stats {
        gap: 10px;
        margin-top: 12px;
      }
      
      .mypage .stat {
        padding: 14px;
        min-height: 90px;
      }
      
      .mypage .item {
        padding: 14px;
        min-height: 70px;
        margin-bottom: 6px;
      }
      
      .mypage .logout {
        padding: 14px;
      }
    }
    
    /* ===== 작은 화면에서의 그리드 최적화 ===== */
    @media (max-width: 360px) {
      .mypage .topbar {
        padding: 16px 12px;
        min-height: 48px;
      }
      
      .mypage .hero {
        padding: 16px 12px 14px;
      }
      
      .mypage .section {
        padding: 16px 12px;
        gap: 16px;
      }
      
      .mypage .avatar {
        width: 48px;
        height: 48px;
        font-size: 20px;
        min-width: 48px;
        min-height: 48px;
      }
      
      .mypage .who .name {
        font-size: 16px;
      }
      
      .mypage .stats {
        gap: 6px;
      }
      
      .mypage .stat {
        padding: 12px;
        min-height: 80px;
      }
      
      .mypage .item {
        padding: 12px;
        min-height: 60px;
      }
      
      .mypage .logout {
        padding: 12px;
      }
      
      /* 매우 작은 화면에서 아이콘 크기 조정 */
      .mypage .i-left {
        font-size: 18px;
        min-width: 18px;
        min-height: 18px;
      }
      
      .mypage .chev {
        min-width: 14px;
        min-height: 14px;
      }
      
      /* 매우 작은 화면에서 상단 헤더 최적화 */
      .mypage .topbar .brand .logo-img {
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
      }
      
      .mypage .topbar .brand .brand-text {
        font-size: 14px;
      }
      
      .mypage .topbar .chip {
        padding: 4px 8px;
        min-height: 32px;
      }
      
      .mypage .topbar .chip .avatar {
        width: 18px;
        height: 18px;
        font-size: 9px;
        min-width: 18px;
        min-height: 18px;
      }
      
      .mypage .topbar .chip .name {
        font-size: 12px;
        min-height: 16px;
      }
    }
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
      <div class="brand">
        <img src="img/ai-go-logo.png" alt="아이-고" class="logo-img">
        <span class="brand-text">아이-고</span>
      </div>
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
