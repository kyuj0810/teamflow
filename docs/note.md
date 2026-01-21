NOTE

1️⃣.Global Error Middleware 정리

- Global Error Middleware(전역 에러 처리)란? 컨트롤러/서비스에서 던진 모든 에러를 한 곳에서 처리하는 "중앙 관제소"

* 전역 미들웨어 없을 때 문제점

1. 컨트롤러마다 try/catch
2. 에러 응답 형식 제각각
3. 유지보수 지옥

- 전역 에러 미들웨어 있으면

1. throw만 하면 끝

- Expree Error Middleware 기본 구조

* Express에서 에러 미들웨어는 인자가 4개
* (err, req, res, next) -> 4개면 에러 미들웨어, 3개면 일반 미들웨어

2️⃣. STATUS CODE 정리
| API | 추천 Status | 이유 |
| ------------- | ----------- | ------------------- |
| Create | 201 | 새 리소스 생성 |
| Get | 200 | 데이터 있음 |
| Update | 200 | 변경 결과 바로 사용 |
| Delete (Soft) | 204 | 결과 필요 없음 |
| Restore | 200 or 204 | 정책 선택 |
