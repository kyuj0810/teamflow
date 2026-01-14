26.01.10

- 서버, DB연결, 유저 생성 api 만들어봄!

  26.01.11
  🔹 백엔드

- User API 완성도 올리기
- 에러 처리
- Validation

  26.01.14
  ✅ 기본 CRUD
  [o] Create User
  [ ]Get User (단건)
  [ ]Get Users (목록)
  [o]Update User
  [ ]Delete User (soft delete 추천)

1️⃣ Custom Error 클래스 (BadRequestError, NotFoundError) [o]
2️⃣ Global Error Middleware 정리

- Global Error Middleware(전역 에러 처리)란? 컨트롤러/서비스에서 던진 모든 에러를 한 곳에서 처리하는 "중앙 관제소"

* 전역 미들웨어 없을 때 문제점
1. 컨트롤러마다 try/catch
2. 에러 응답 형식 제각각
3. 유지보수 지옥
* 전역 에러 미들웨어 있으면
1. thro만 하면 끝 
* Expree Error Middleware 기본 구조
- Express에서 에러 미들웨어는 인자가 4개 
- (err, req, res, next) -> 4개면 에러 미들웨어, 3개면 일반 미들웨어

3️⃣ Response format 통일
4️⃣ Pagination (GET /users?page=1&limit=10)
5️⃣ Auth (JWT)
