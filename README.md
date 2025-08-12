# 파일 구조
```bash
README.md
app/
  index.html
  js/
    api.js
    app.js
    router.js
    store.js
  views/
    home/
      home_logged_in.html
      home_logged_in.js
      login.html
      login.js
    learning_analytics/
      analytics.js
      learning_analytics.html
    mypage/
      mypage.html
      mypage.js
    quiz/
      quiz.html
      quiz.js
    sidebar/
      drawer.js
      sidebar.html
    sign_up/
      sign_up.html
      sign_up.js
    wrong_answer_note/
      wrong_notes.html
      wrongNotes.js 
```

# 서버 실행해보기

```bash
cd app
python -m http.server 5500 --bind 127.0.0.1
```