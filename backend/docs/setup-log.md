# Setup & Troubleshooting Log

Teamflow API 개발 과정에서의 **환경 설정, 기술 선택, 트러블슈팅 기록**을 정리한 문서입니다.

본 문서는 단순 설치 가이드가 아니라,
**실제 프로젝트 진행 중 발생한 문제와 그에 대한 판단 과정**을 남기는 것을 목표로 합니다.

---

## 1. 프로젝트 초기 목표

- 중견기업 지원용 포트폴리오
- 실무에서 사용하는 기술 스택 기반
- 단순 CRUD가 아닌 **도메인 설계 + 문제 해결 과정**을 보여주는 프로젝트

---

## 2. 개발 환경

- **OS**: macOS (Apple Silicon)
- **Node.js**: v20.19.6 (`nvm` 사용)
- **PostgreSQL**: 15.x (Homebrew)
- **ORM**: Prisma

---

## 3. Node / Prisma 버전 이슈

### 문제

- Prisma 최신 버전 설치 시 Node 버전 요구사항으로 설치 오류 발생

### 해결

- `nvm`을 사용해 Node 버전을 명확히 고정

```bash
nvm install 20.19.6
nvm use 20.19.6
```

---

## 4. Prisma 7 + migrate 문제

### 시도한 구성

- `prisma.config.ts` 사용
- `schema.prisma`에서 `DATABASE_URL` 제거
- 환경변수 기반 연결 설정

### 발생한 문제

- `prisma migrate dev` 실행 시

```text
Error: The datasource.url property is required in your Prisma config file
```

- 공식 문서 가이드를 따랐음에도 migrate가 정상 동작하지 않음
- config / env 조합에 따라 동일 에러 반복 발생

### 판단

- Prisma 7은 구조적으로 설정 복잡도가 높고
- migrate 안정성이 아직 충분하지 않다고 판단

---

## 5. Prisma 6 선택 이유 (결정 기록)

### 최종 선택

- **Prisma v6.x (안정 버전)** 사용

### 이유

- 실무에서 가장 많이 사용되는 버전
- 문서 및 레퍼런스 풍부
- migrate / env 설정이 단순
- 포트폴리오 목적에 더 적합

> 기술적으로 새로운 버전보다 **안정성과 설명 가능성**을 우선함

---

## 6. 최종 Prisma 설정 (Prisma 6)

### `.env`

```env
DATABASE_URL="postgresql://yujin:password@localhost:5432/teamflow"
```

### `schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

## 7. Database Schema Design

![ERD](erd.png)

### Design Decisions

- **User – Team** 관계는 N:M 구조로, 중간 테이블 `TeamMember`를 사용
- **WeeklyReport**는 `User`와 `Team`에 종속되어 팀 단위 보고 흐름을 표현
- **Todo**는 개인 단위 작업이면서 보고서와 연결 가능
- **Todo Hierarchy**를 위해 Self-relation 구조를 채택

---

## 8. 데이터베이스 설계 포인트

### 주요 도메인

- User
- Team
- TeamMember (N:M 관계)
- WeeklyReport
- Todo

---

## 8. Todo Self-relation 설계

### 요구사항

- Todo가 Sub-task 구조를 가질 수 있어야 함

### 설계

```prisma
parentId String?
parent   Todo?  @relation("TodoHierarchy", fields: [parentId], references: [id])
children Todo[] @relation("TodoHierarchy")
```

### 포인트

- Self-relation에는 반드시 relation name 명시
- FK는 한쪽(parent)에만 정의

---

## 9. 관계 설계 원칙

- 모든 relation은 양방향으로 명시
- 실제 비즈니스 흐름 기준으로 도메인 분리
- Role 기반(User) 권한 확장 고려

---

## 10. 회고

- ORM 설정 과정에서도 **기술 선택과 판단 근거가 중요함**을 체감
- 단순히 "최신"이 아닌
  **프로젝트 목적에 맞는 안정적인 선택**의 중요성 확인

---

## 11. 다음 단계

- Prisma Client 기반 CRUD 구현
- WeeklyReport API 개발
- AI 요약 기능 연동
- Todo 자동 생성 로직 구현

---

✍️ Author: Yujin Kim
