// app/js/app.js
import { createRouter } from './router.js';
import { store } from './store.js';
import { mountDrawer } from '../views/sidebar/drawer.js';

// 전역 드로어 1회 주입
mountDrawer();

const routes = {
  '#/'         : () => import('../views/home/login.js'),
  '#/login'    : () => import('../views/home/login.js'),
  '#/home'     : () => import('../views/home/home_logged_in.js'),
  '#/signup'   : () => import('../views/sign_up/sign_up.js'),
  '#/quiz'     : () => import('../views/quiz/quiz.js'),
  '#/wrong'    : () => import('../views/wrong_answer_note/wrongNotes.js'),
  '#/analytics': () => import('../views/learning_analytics/analytics.js'),
  '#/mypage'   : () => import('../views/mypage/mypage.js'),
  '#/404'      : async () => ({ render: async () => '<div style="padding:16px">페이지가 없습니다.</div>' }),
};




createRouter(routes, {
  onAfter: (path) => {
    console.debug('navigated:', path, store.get().user);
    
    // 상단바 표시/숨김 처리 - store에서 자동으로 처리됨
    // store.notify()가 호출되어 사용자 상태에 따라 상단바가 표시/숨김됨
  },
});
