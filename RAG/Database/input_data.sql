-- 데이터베이스 선택
USE AI_Go;

-- 1) 문제 상황 유형별 카테고리
SELECT * FROM Category;

-- 2) 사용자 정보
SELECT * FROM User;

-- 3) 영상 정보
SELECT * FROM Video;

-- 4) 퀴즈 정보
SELECT * FROM Quiz;

-- 5) 사용자 풀이 기록
SELECT * FROM History;

-- 6) 오답노트
SELECT * FROM Wrong_Note;


-----------------------------------------------------

-- Video 테이블 구성
    
-- video_id 네이밍 규칙: 앞에 알파벳(난이도별) + 번호
-- 초급 → B (Beginner)
-- 중급 → I (Intermediate)
-- 고급 → A (Advanced)


INSERT INTO Video (
    video_id,
    video_url,
    difficulty,
    description,
    category_id
) VALUES (
    '01',
    NULL,
    1,
    '이 동영상은 여러 개의 신호등과 차량이 있는 도시 거리를 보여줍니다. ego 차량은 교차로를 통과하면서 흰색 밴을 따라가고 있습니다.

이벤트 :
1. ego 차량이 교차로에 진입하며 앞서 가는 흰색 밴을 따르고 있습니다.
2. 교차로의 직진 신호등은 빨간색입니다.
3. 전방 신호등의 좌회전 신호는 녹색으로, 흰색 밴과 ego 차량 모두 좌회전하여 교차로를 통과합니다.',
    NULL
);

