Next.js로 전환 시 폴더 구조 예시

```sh
ntec-nextjs-assets/
├── public/                                    # 정적 자산 (변경 없음)
│   ├── logo.ico
│
├── src/
│   ├── app/                                   # ✨ Next.js App Router (새로 구성)
│   │   ├── layout.tsx                         # 루트 레이아웃
│   │   ├── page.tsx                           # 홈 페이지 (/)
│   │   ├── globals.css                        # 전역 스타일
│   │   ├── not-found.tsx                      # 404 페이지
│   │   │
│   │   ├── (main)/                            # ✨ 라우트 그룹 - 메인
│   │   │   ├── layout.tsx                     # 메인 레이아웃
│   │   │   └── page.tsx                       # /main
│   │   │
│   │   ├── (example)/                         # ✨ 라우트 그룹 - 예제
│   │   │   ├── layout.tsx                     # 예제 레이아웃
│   │   │   ├── component-list/                # 컴포넌트 예제
│   │   │   │   ├── page.tsx                   # /component-list
│   │   │   │   ├── accordion/
│   │   │   │   │   └── page.tsx               # /component-list/accordion
│   │   │   │   ├── alert/
│   │   │   │   │   └── page.tsx               # /component-list/alert
│   │   │   │   ├── badge/
│   │   │   │   │   └── page.tsx               # /component-list/badge
│   │   │   │   ├── button/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── checkbox/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── dialog/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── icon/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── select/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── spinner/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── table/
│   │   │   │       └── page.tsx
│   │   │   ├── api-list/                      # API 예제
│   │   │   │   ├── page.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── router-ex/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── routers/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── ui/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── utils/
│   │   │   │       └── page.tsx
│   │   │   └── specific-list/                 # 특정 예제
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                               # ✨ API Routes
│   │       ├── example/
│   │       │   └── route.ts
│   │       └── [...catchall]/
│   │           └── route.ts
│   │
│   ├── components/                            # UI 컴포넌트 (구조 유지)
│   │   ├── ui/                                # 커스텀 UI 컴포넌트
│   │   │   ├── accordion/
│   │   │   │   ├── AccordionContent.tsx
│   │   │   │   ├── AccordionContext.tsx
│   │   │   │   ├── AccordionDefault.tsx
│   │   │   │   ├── AccordionItem.tsx
│   │   │   │   └── AccordionTrigger.tsx
│   │   │   ├── alert/
│   │   │   │   ├── AlertDefault.tsx
│   │   │   │   ├── AlertDescription.tsx
│   │   │   │   └── AlertTitle.tsx
│   │   │   ├── badge/
│   │   │   │   └── BadgeDefault.tsx
│   │   │   ├── button/
│   │   │   │   └── ButtonDefault.tsx
│   │   │   ├── dialog/
│   │   │   │   ├── dialog-service-new.tsx
│   │   │   │   └── dialog-service.tsx
│   │   │   ├── icon/
│   │   │   │   ├── IconDefault.tsx
│   │   │   │   └── registry-icon.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── shadcn/                            # shadcn/ui 컴포넌트
│   │   │   ├── ui/
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   └── ...
│   │   │   ├── lib/
│   │   │   │   └── utils.ts
│   │   │   └── hooks/
│   │   │       └── use-mobile.ts
│   │   │
│   │   └── layouts/                           # 레이아웃 컴포넌트
│   │       ├── LayoutHeader.tsx
│   │       ├── LayoutFooter.tsx
│   │       ├── LayoutASide.tsx
│   │       ├── LayoutLnb.tsx
│   │       └── LayoutError.tsx
│   │
│   ├── lib/                                   # 유틸리티 및 공통 로직
│   │   ├── api/
│   │   │   └── api-client.ts
│   │   ├── utils/
│   │   │   ├── app-utils.ts
│   │   │   ├── date-utils.ts
│   │   │   ├── format-utils.ts
│   │   │   └── string-utils.ts
│   │   └── constants/
│   │       └── nav-data.ts
│   │
│   ├── hooks/                                 # 커스텀 훅
│   │   ├── components/
│   │   │   └── use-ui.ts
│   │   ├── layout/
│   │   │   └── use-headings.ts
│   │   └── store/
│   │       └── use-store.ts
│   │
│   ├── store/                                 # Redux Store
│   │   ├── store-redux-slice.ts
│   │   ├── store-redux.ts
│   │   └── store-request-config.ts
│   │
│   ├── types/                                 # TypeScript 타입
│   │   ├── common/
│   │   │   ├── app-api-types.ts
│   │   │   ├── app-common-types.ts
│   │   │   └── app-utils-types.ts
│   │   ├── components/
│   │   │   └── app-ui-types.ts
│   │   └── store/
│   │       └── app-store-types.ts
│   │
│   ├── providers/                             # Context Providers
│   │   ├── AppProvider.tsx                    # Redux, Theme 등
│   │   └── LayoutASideProvider.tsx
│   │
│   └── styles/                                # 스타일
│       └── app.css
│
├── .env.local                                 # 환경 변수
├── .gitignore
├── next.config.js                             # ✨ Next.js 설정
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json                            # shadcn/ui 설정
└── README.md
```