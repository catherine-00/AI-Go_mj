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

----------------------------------------------------------------------------

# Git-hub 명령어 정리

-- 새 브랜치 생성

```
git branch rag
```

-- 현재 브랜치 확인

```
git branch
```

-- 브랜치로 이동

```
git checkout 브랜치이름
```

## 푸시 과정

-- 특정 폴더를 올리고 싶을 때

```
git add 폴더이름/
git commit -m "메시지"
git push origin 브랜치 이름
```

-- 특정 파일만

```
git add 파일이름
git commit -m "메시지"
git push origin 브랜치 이름
```

-- git add 기본 사용법

```bash
-- 모든 변경사항 스테이징(현재 디렉토리)
git add .

-- 전체 변경사항(루트 기준, 디렉토리 경로에 상관없이)
git add -A

-- 현재 폴더
git add 폴더이름/

-- 특정 파일
git add 파일이름

-- 여러 개 지정
git add 폴더이름/ 파일1 파일2

-- 변경된 부분만 선택해서 추가
git add -p

```

## 브랜치로 이동 후 pull

1. 현재 브랜치로 이동 후 pull

```bash
git switch 브랜치이름     # 또는 git checkout 브랜치이름
git pull origin 브랜치이름
```

2. 브랜치 이동 없이 바로 pull

```bash
git fetch origin 브랜치이름 # 원격 저장소의 최신 이력을 로컬로 가져오되 자동 적용은 안됨.
git merge origin/브랜치이름 # 두 브랜치의 변경 이력을 합침(현재에 변경사항을 적용)
```

3. 단축 명령어
```bash
git pull origin 브랜치이름
```




