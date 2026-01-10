1️⃣ 기본 폴더 구조
src/
├── app.ts # 서버 시작점
├── server.ts # listen 담당
├── lib/
│ └── prisma.ts # PrismaClient 인스턴스
├── routes/
│ └── user.route.ts
├── controllers/
│ └── user.controller.ts
├── services/
│ └── user.service.ts
└── types/
└── user.ts

2️⃣ prisma.ts (DB 연결 담당)
📁 src/lib/prisma.ts

📌 역할

- DB 연결 전담
- 다른 파일에서 DB 쓰고 싶으면 전부 여기서 import

3️⃣ routes (URL 정의만 함)
📁 src/routes/user.route.ts
