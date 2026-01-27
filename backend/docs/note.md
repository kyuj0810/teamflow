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

⚠️ 모든 데이터 삭제
npx prisma migrate reset

3️⃣. Bearer

1. Bearer란 무엇인가?

- Bearer Token은
  👉 “이 토큰을 가진 사람(Bearer)은 권한이 있다” 는 의미의 인증 방식이다.
  이건 OAuth 2.0 표준 (RFC 6750) 에 명시되어 있다.

2. 왜 하필 Authorization 헤더인가?
   HTTP 표준에서

Authorization 헤더 = 인증 정보 전달용

서버는 이 헤더만 보고 인증 처리 가능

그래서 JWT, OAuth, API Key 등 모든 인증 방식의 기본 위치다.

3. Bearer를 쓰는 이유

3.1 표준이기 때문

- Postman
- 브라우저
- API Gateway
- Load Balancer
- Cloud 서비스
  --> 전부 Authorization: Bearer 를 기본으로 지원

  3.2 토큰 타입을 명확히 구분 가능
  Authorization: Bearer xxx
  Authorization: Basic xxx
  Authorization: Digest xxx
  --> 서버가 토큰 종류를 바로 판별

  3.3 Stateless 인증에 최적화
  Bearer Token은:
  세션 저장 ❌, 쿠키 ❌, 서버 메모리 ❌ 👉 JWT와 궁합이 최고

  3.4 JWT와 Beareer의 관계
  JWT = 토큰 형식, Bearer = 전달 방식
  즉 JWT를 Bearere 방식으로 Authorization 헤더에 담아 전달

  3.5 서버에서는 어떻게 처리하나?
  (예시) auth.middleware.ts

  3.6 그럼 Bearer 말고 다른 방법도 있나?
  | 방식 | 설명 | 사용처 |
  | ------------- | -------------- | ----------------- |
  | Bearer | 표준 | REST API (대부분) |
  | Cookie | 세션 기반 | 웹 SSR |
  | Custom Header | `X-Auth-Token` | 내부 API |
  | Query Param | `?token=` | ❌ 비추천 |
  👉 공개 API / 모바일 / SPA → Bearer가 정답
