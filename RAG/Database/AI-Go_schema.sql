CREATE DATABASE AI_Go;
USE AI_Go;

-- 1) Category
CREATE TABLE Category (
  category_id   INT AUTO_INCREMENT PRIMARY KEY COMMENT '상황 유형 고유 번호',
  category_name VARCHAR(100) UNIQUE COMMENT '신호 준수, 속도 제한, 차선 규칙, 보행자 보호, 긴급차량 대응'
) COMMENT='문제 상황 유형별 카테고리';

-- 2) User
CREATE TABLE User (
  user_id       INT AUTO_INCREMENT PRIMARY KEY COMMENT '사용자 고유 번호',
  name          VARCHAR(50) COMMENT '이름',
  phone         VARCHAR(20) UNIQUE COMMENT '전화번호',
  email         VARCHAR(100) UNIQUE COMMENT '이메일(로그인 아이디)',
  password_hash VARCHAR(255) COMMENT '비밀번호 해시',
  birth_date    DATE COMMENT '생년월일',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '가입일'
) COMMENT='사용자';

-- 3) Video

CREATE TABLE Video (
  video_id    INT AUTO_INCREMENT PRIMARY KEY COMMENT '영상 고유 번호',
  video_url   VARCHAR(255) COMMENT '영상 경로/url',
  difficulty  TINYINT COMMENT '난이도 (1=초급, 2=중급, 3=고급)',
  description TEXT COMMENT '영상 설명 텍스트',
  category_id INT COMMENT '상황 유형 고유 번호',
  CONSTRAINT chk_video_difficulty CHECK (difficulty BETWEEN 1 AND 3),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
) COMMENT='영상';

-- 4) Quiz
CREATE TABLE Quiz (
  quiz_id      INT AUTO_INCREMENT PRIMARY KEY COMMENT '퀴즈 고유 번호',
  question     TEXT COMMENT '문제 내용',
  choices      JSON COMMENT '["선지1","선지2","선지3","선지4"]',
  answer_no    TINYINT COMMENT '정답 번호',
  explanations JSON COMMENT '["해설1","해설2","해설3","해설4"]',
  video_id     INT COMMENT '영상 고유 번호',
  category_id  INT COMMENT '상황 유형 고유 번호',
  CONSTRAINT chk_quiz_answer_no CHECK (answer_no BETWEEN 1 AND 4),
  FOREIGN KEY (video_id) REFERENCES Video(video_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
) COMMENT='퀴즈';

-- 5) History
CREATE TABLE History (
  history_id         INT AUTO_INCREMENT PRIMARY KEY COMMENT '기록 고유 번호',
  is_correct         BOOLEAN COMMENT '정답 여부',
  answered_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '풀이 시각',
  time_spent_seconds INT COMMENT '소요시간(초)',
  user_id            INT COMMENT '사용자 고유 번호',
  quiz_id            INT COMMENT '퀴즈 고유 번호',
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (quiz_id) REFERENCES Quiz(quiz_id)
) COMMENT='사용기록';

-- 6) Wrong Note
CREATE TABLE Wrong_Note (
  user_id  INT COMMENT '사용자 고유 번호',
  quiz_id  INT COMMENT '퀴즈 고유 번호',
  wrong_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '오답 등록 시각',
  PRIMARY KEY (user_id, quiz_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (quiz_id) REFERENCES Quiz(quiz_id)
) COMMENT='오답노트';
