---
sidebar_position: 2
displayed_sidebar: "assetsDocSidebar"
title: "개발구조및규칙"
---

# 개발구조및규칙


## Folder Structure
---
:::tip DDD(<span class="admonition-title">Domain Driven Design</span>)
* Frontend영역 개발의 기본 폴더 구조는 <span class="text-blue-normal">DDD(Domain Driven Design)</span> 설계 방법론을 따릅니다.  
* **DDD**에서 말하는 Domain은 **비지니스 Domain**입니다. 즉 유사한 업무의 집합으로 구성하여, 애플리케이션의 모듈간의 의존성을 최소화하고, 비지니스 응집성을 최대화 합니다.
* 업무가 복잡한 대형 프로젝트에 적합한 구조입니다.
* `domains`폴더에 각각 업무(**domain**)별로 분리되어 영향도와 의존성이 적고 확장성이 용이해서 유지보수가 쉽습니다.
* 각 업무 담당 개발자는 자신이 맡은 업무 영역에서만 코딩 작업을 진행하며, 서로 다른 업무간에 충돌 가능성이 적어집니다.
* 부득이하게 자신의 업무 외 상위 업무나 공통 업무에 접근 해야하는 상황이라면 Frontend공통 개발자와 상의하여 **shared**를 통해 공유 하거나 app공통 객체를 통해 소통합니다.
:::



### react-app-scaffold 전체 폴더 구조
```sh
react-app-scaffold
├── @types                # TypeScript 전역 타입 정의 (.d.ts 파일)
├── public                # 정적 파일 (이미지, 폰트 등, / 경로로 접근)
├── src
│   ├── app               # Next.js App Router 핵심 폴더
│   │   ├── (domains)     # 프로젝트 업무(domain) 그룹 (URL에 영향 없는 Route Group 폴더)
│   │   │   ├── example   # example 도메인 업무
│   │   │   ├── main      # main 도메인 업무
│   │   │   └── ...       # 도메인 업무를 계속 추가할 수 있음
│   │   ├── favicon.ico   # 사이트 파비콘
│   │   └── layout.tsx    # 루트 레이아웃 컴포넌트(html, body 태그 필수)
│   ├── assets            # 정적 리소스 관리
│   │   └── styles        # 스타일 파일
│   │       └── app.css   # 전역 CSS
│   ├── core              # 프로젝트 핵심 공통 코어 로직(업무 개발자는 작업하지 않는 공간)
│   │   ├── components    # 공통 컴포넌트
│   │   │   └── ...
│   │   └── types         # 공통 비즈니스 로직 타입 정의
│   └── shared            # 전역 공유 코드
│       ├── components    # 전역 공유 공통 컴포넌트
│       │   ├── ui        # 공통 UI 컴포넌트 (Button, Input 등)
│       │   └── ...
│       └── constants     # 전역 상수 (API 엔드포인트, 설정값 등)
├── tsconfig.json         # TypeScript 컴파일러 설정
├── eslint.config.mjs     # ESLint 린팅 규칙
├── next.config.ts        # Next.js 프레임워크 설정
├── tailwind.config.ts    # Tailwind CSS 설정
├── postcss.config.mjs    # PostCSS 설정
├── package.json          # 의존성 및 스크립트 관리
├── prettier.config.js    # 코드 포매팅 규칙
└── ...                   # 기타 파일
```

* &#8251; 업무 개발자가 작업할 공간은 `src` 폴더입니다. 그 외 폴더 및 파일들은 설정파일 이므로 `src` 폴더 구조에 대해서만 설명합니다.

:::info 설명
* <span class="text-green-bold">app</span>폴더는 Next.js App Router 핵심 폴더입니다.
* <span class="text-green-bold">assets</span>폴더는 모든 정적 파일들(font, image, css파일 등)을 모아놓은 폴더입니다.
* <span class="text-green-bold">core</span>폴더는 프로젝트 핵심 공통 코어 로직 폴더입니다. 공통개발자 이 외 업무개발자는 작업하지 않는 공간입니다.
* <span class="text-green-bold">shared</span>폴더는 전역 공유 코드 폴더입니다. 상황에 따라 수정이 발생할 수 있고, 업무개발자 및 퍼블리셔와 함께 작업할 수 있는 공통 컴포넌트, 공통 상수, 레이아웃 등이 위치합니다.
* <span class="text-green-bold">app/(domains)</span>폴더(그룹폴더)에는 각 domain 업무들(example, main, 계좌(account), ...)이 있고, 그 하위에는 일률적으로 <span class="text-blue-normal">**_action, _hooks, _styles, _components, _common, (pages), api, _types**</span>폴더를 가질 수 있습니다. 각 개별 폴더는 업무 상황에 따라 생성하여 사용합니다. 사용하지 않는 폴더는 없어도 상관없습니다.  
  - <span class="text-blue-normal">_action</span> : server action을 모아놓은 폴더.
  - <span class="text-blue-normal">_hooks</span> : 해당 업무에서 사용하는 커스텀 훅을 모아놓은 폴더.
  - <span class="text-blue-normal">_styles</span> : 해당 업무에서 사용하는 스타일 파일을 모아놓은 폴더.
  <!-- - <span class="text-blue-normal">_api</span> : 미완료(어떻게 사용될지 고민중) -->
  - <span class="text-blue-normal">_components</span> : 업무 화면에서 사용하는 컴포넌트들을 모아놓은 폴더.
  - <span class="text-blue-normal">_common</span> : 해당 업무에서 사용하는 javascript 공통함수나 공통적인 요소의 모듈을 모아놓은 폴더.
  - <span class="text-blue-normal">(pages)</span> : 해당 도메인 업무의 페이지 컴포넌트 폴더. `(pages)` 그룹 폴더로 그룹화 한 이유는, 해당 업무의 모든 화면을 하나의 폴더로 관리하고 URL에 영향을 미치지 않게 하기 위함입니다.
  - <span class="text-blue-normal">api</span> : 해당 업무에서 사용하는 route handler를 모아놓은 폴더.
  - <span class="text-blue-normal">_types</span> : 해당 업무에서 사용하는 모든 type을 정리하는 폴더.
:::







## Code Convention
---
많은 개발자들의 협업으로 인하여 개발자 개개인 마다 코딩 스타일이 달라 유지보수가 어려워지고 코드의 품질이 떨어질 수 있습니다.
그래서 다음과 같은 <span class="text-blue-normal">코딩 스타일</span>을 정의하여 따르도록 합니다.


### Folder convention(<span class="text-blue-normal">폴더명</span>)
* 모든 폴더명은 **kebab-case**로 생성합니다.
* **camelCase**보다 가독성이 좋고 node_modules의 모든 프로젝트들도 **kebab-case**를 사용하므로 그대로 따르기로 합니다.
```sh
# 폴더명 적용 예시
 src
 ├── app    
 ├── assets  
 ├── core              
 │   ├── components    
 │   │   └── ui-components      # 폴더명 kebab-case
 │   └── types         
 └── shared            
     ├── components
     │    ├─ header-left        # 폴더명 kebab-case
     │    │  └─DefaultLeft.tsx
     │    ├─ header-right       # 폴더명 kebab-case
     │    └─ header-center      # 폴더명 kebab-case    
     └── constants     
         └── nav-utils          # 폴더명 kebab-case
             └── nav-utils.ts
```


### File convention (<span class="text-blue-normal">파일명</span>)
* <span class="text-blue-normal">*.tsx</span>파일, 모든 컴포넌트 파일명은 **PascalCase**로 만듭니다.
* HTML 엘리먼트와의 차별성과 충돌 방지 차원.
* 되도록이면 **컴포넌트 명**은 두 단어가 합쳐진 **합성어를 사용**합니다.
```sh
# 컴포넌트 *.tsx 파일명 예시
TodoItem.tsx
```
* <span class="text-blue-normal">*.ts, *.js, *.scss, *.css</span> 등 일반 파일명은 **kebab-case**로 만듭니다.
```sh
todo-system.ts
todo-style.css
```




### Function Names(<span class="text-blue-normal">함수명</span>)
* 함수명은 **camelCase**로 만듭니다.
```ts
// ✅ 좋음
function fetchUserData() { }
async function getUserById(id: string) { }
const handleSubmit = () => { }
const calculateTotal = (items: Item[]) => { }

// ❌ 나쁨
function FetchUserData() { }
function get_user_by_id() { }
```
* 동사로 시작
```ts
// ✅ 좋음
function createUser() { }
function validateEmail() { }
function handleClick() { }
function fetchProducts() { }
function isAuthenticated() { }
function hasPermission() { }

// ❌ 나쁨
function user() { }
function email() { }
function click() { }
```
* 이벤트 핸들러 함수명은 **handle** 또는 **on** 접두사를 붙입니다.
```ts
// ✅ 좋음
function handleClick() { }
function handleSubmit() { }
function handleInputChange() { }
function onUserLogin() { }

// ❌ 나쁨
function click() { }
function submit() { }
function change() { }
```





### Variable Names(<span class="text-blue-normal">변수명</span>)
* 변수명은 **camelCase**로 만듭니다.
```ts
// ✅ 좋음
const userName = 'John';
const isLoading = false;
const productList = [];
let currentPage = 1;

// ❌ 나쁨
const UserName = 'John';
const is_loading = false;
const PRODUCTLIST = [];
```
* 상수는 **UPPER_SNAKE_CASE**로 만듭니다.
```ts
// ✅ 좋음
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 10;

// 설정 객체는 camelCase
const config = {
  maxRetryCount: 3,
  apiBaseUrl: 'https://api.example.com'
};
```
* Boolean 변수는 **is, has, can, should** 접두사를 붙입니다.
```ts
// ✅ 좋음
const isLoading = false;
const hasError = true;
const canEdit = false;
const shouldUpdate = true;

// ❌ 나쁨
const loading = false;
const error = true;
const edit = false;
```







### TypeScript convention
* Frontend개발 시  **Typescript**를 사용하므로 관련 convention을 정의합니다.
* **Interface**명은 관례적으로 앞에 '**I**'를 붙이고 **PascalCase**로 만듭니다.
```js
// TypeScript의 Interface명
interface ITodoList {
  id: number;
  content: string;
  completed: boolean;
}
```
* **type, enum**명은 앞에 '**T, E**'을 붙이고 **PascalCase**로 만듭니다.
```js
// TypeScript의 Enum명
enum EDirection {
  Up = 1,
  Down,
  Left,
  Right,
}
// Type명
type TPerson = {
  name: string;
  age: number;
}
```


### Router convention
* **react-app-scaffold** 프로젝트는 **Next.js App Router**를 사용하므로, `src/app` 폴더 내부에 생성되는 폴더명이 URL에 영향을 미치게 됩니다. 따라서 폴더명은 모두 소문자 단일 이름으로 만들거나 두 단어 합성어이면 **kebab-case**로 만듭니다.
  - 예를 들어 페이지 경로가 `src/app/(domains)/account/(pages)/main/page.tsx` 이라면, 실제 브라우저 주소창에는 `localhost:5174/account/main` 로 표시됩니다.
  - 예를 들어 페이지 경로가 `src/app/(domains)/account-biz/(pages)/main-index/page.tsx` 이라면, 실제 브라우저 주소창에는 `localhost:5174/account-biz/main-index` 로 표시됩니다.

```sh
src
├── app
│   ├── (domains)
│   │   ├── example
│   │   ├── main
│   │   └── account                 # account 업무 폴더 (한단어 폴더명)
│   │       ├── (pages)             # 그룹 폴더(URL에 영향이 없는 Route Group 폴더)
│   │       │   ├── main-index      # 계좌메인화면(가정)(kebab-case 형태의 폴더명)
│   │       │   │   ├── page.tsx    # 페이지 컴포넌트
│   │       │   │   └── ...         
│   │       │   └── usage-history   # 계좌이용내역화면(가정)(kebab-case 형태의 폴더명)
│   │       │       ├── page.tsx    # 페이지 컴포넌트
│   │       │       └── ...         
│   │       ├── _action             # URL에 영향이 없는 private 폴더
│   │       └── ...
```
