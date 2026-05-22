---
sidebar_position: 1
displayed_sidebar: "documentDocSidebar"
title: "CSS Token 작업방법"
---


# 디자인 토큰 작업 가이드

:::info 이 가이드는 이런 상황에서 읽어보세요
* 색상, 그림자, 폰트 등 **디자인 토큰 값을 수정**해야 할 때
* SI 프로젝트에 **브랜드 색상을 적용(override)**해야 할 때
* 토큰을 수정하고 **화면에 반영**하는 방법을 모를 때
* 퍼블리싱 작업 후 **Storybook으로 팀에 공유**하고 싶을 때
:::

---

## 토큰 구조 이해하기 (먼저 읽어보세요)
---

디자인 토큰은 **2계층**으로 관리됩니다.

```
primitive (원시값)          semantic (의미값)
─────────────────          ──────────────────
color.brand.500 = #465fff  →  color.primary = {color.brand.500}   ← 라이트
                           →  color.primary = {color.brand.400}   ← 다크
```

* **primitive** — 실제 hex, px 값. `src/design-tokens/primitive/*.json`에서 관리
* **semantic** — primitive를 참조해 "primary", "success" 같은 의미를 부여. `src/design-tokens/semantic/light.json`, `dark.json`에서 관리

**내가 손대는 파일은 JSON 뿐입니다.** 나머지 CSS는 자동생성됩니다.

```
src/design-tokens/
├── primitive/
│   ├── color.json        ← 색상 raw 값
│   ├── typography.json   ← 폰트·브레이크포인트 raw 값
│   ├── shadow.json       ← 그림자 raw 값
│   └── spacing.json      ← z-index raw 값
└── semantic/
    ├── light.json        ← 라이트 모드 의미값
    └── dark.json         ← 다크 모드 의미값
```

:::info ⚠ 직접 편집 금지 파일
아래 파일은 빌드 시 자동 덮어씌워집니다. 직접 수정해도 의미가 없습니다.
* `src/assets/styles/tokens/primitive.css`
* `src/assets/styles/tokens/theme-light.css`
* `src/assets/styles/tokens/theme-dark.css`
* `src/design-tokens/types.ts`
:::

---

## 토큰 값 수정하기
---

예시: **brand 색상의 500 값을 `#465fff` → `#3355ee`로 바꿔야 한다면**

**1단계.** `src/design-tokens/primitive/color.json` 파일을 엽니다.

```json showLineNumbers
{
  "color": {
    "brand": {
      ...
      // highlight-start
      "500": { "$value": "#3355ee", "$type": "color" },
      // highlight-end
      ...
    }
  }
}
```

**2단계.** 저장 후 터미널에서 빌드합니다.

```sh
npm run build:tokens
```

**3단계.** 브라우저 DevTools 콘솔에서 확인합니다.

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-brand-500')
// 결과: #3355ee
```

:star: **`npm run dev`를 실행 중이라면** 빌드가 자동으로 선행됩니다. 별도로 `build:tokens`를 실행할 필요 없습니다.

---

## 새 토큰 추가하기
---

### 색상 팔레트 추가

예시: **테마 전용 색상 `theme-green`을 추가해야 한다면**

`src/design-tokens/primitive/color.json`에 항목을 추가합니다.

```json showLineNumbers
{
  "color": {
    ...
    // highlight-start
    "theme-green": {
      "400": { "$value": "#4ade80", "$type": "color" },
      "500": { "$value": "#22c55e", "$type": "color" }
    }
    // highlight-end
  }
}
```

빌드 후 Tailwind 클래스와 CSS var로 바로 사용할 수 있습니다.

```html
<!-- Tailwind 클래스 -->
<div class="bg-theme-green-500 text-white">...</div>

<!-- CSS var -->
<style>
  .my-element { background-color: var(--color-theme-green-500); }
</style>
```

### 시맨틱 토큰 추가 (라이트/다크 대응)

예시: **새 semantic 토큰 `color.info`를 추가해야 한다면**

`src/design-tokens/semantic/light.json`에 추가합니다.
```json showLineNumbers
{
  "color": {
    ...
    // highlight-start
    "info": { "$value": "{color.blue-light.500}", "$type": "color" }
    // highlight-end
  }
}
```

`src/design-tokens/semantic/dark.json`에도 다크 대응값을 추가합니다.
```json showLineNumbers
{
  "color": {
    ...
    // highlight-start
    "info": { "$value": "{color.blue-light.400}", "$type": "color" }
    // highlight-end
  }
}
```

빌드하면 `:root { --color-info: #... }` 와 `.dark { --color-info: #... }` 가 자동으로 생성됩니다.

---

## SI 프로젝트에 브랜드 색상 적용하기
---

스캐폴드에는 기본 테마(`theme-default.css`)가 있습니다.
SI 프로젝트 투입 시 **별도 테마 파일을 만들어 override**합니다. 기본 파일은 건드리지 않습니다.

**1단계.** `src/assets/styles/themes/theme-example-project.css` 파일을 복사하여 프로젝트 이름으로 파일을 만듭니다.

```sh
# 예시: 프로젝트명이 "acme"인 경우
src/assets/styles/themes/theme-acme.css
```

**2단계.** `theme-acme.css` 파일에 브랜드 색상을 override합니다.

```css showLineNumbers
/* theme-acme.css — acme 프로젝트 브랜드 override */

:root {
  --primary: var(--color-brand-500);          /* 토큰에서 가져오기 */
  --primary-foreground: var(--color-white);
  --ring: var(--color-brand-500);
}

.dark {
  --primary: var(--color-brand-400);
}
```

**3단계.** `src/assets/styles/app.css`에서 해당 파일의 주석을 해제합니다.

```css showLineNumbers
/* 3. Theme */
@import './themes/theme-default.css';
// highlight-start
@import './themes/theme-acme.css';   /* ← 주석 해제 */
// highlight-end
```

:::info 팁
* `--primary`, `--background` 등 shadcn 시맨틱 변수는 `theme-default.css`에 전체 목록이 있습니다.
* 바꾸고 싶은 항목만 `theme-acme.css`에 작성하면 됩니다. 나머지는 기본값을 그대로 사용합니다.
* 디자인 토큰 CSS var(`--color-brand-500` 등)는 Storybook `Getting Started/Design Tokens`에서 전체 목록을 확인하세요.
:::

---

## 화면에서 토큰 사용하기
---

빌드된 토큰은 **Tailwind 클래스**와 **CSS 변수** 두 가지 방식으로 사용할 수 있습니다.

### Tailwind 클래스로 사용하기 (권장)

토큰 이름의 `--` 접두사를 제거하고 케밥케이스로 사용합니다.

```tsx showLineNumbers
/* 색상 */
<div class="bg-brand-500">          {/* --color-brand-500 */}
<div class="text-success-600">      {/* --color-success-600 */}

/* 그림자 */
<div class="shadow-theme-md">       {/* --shadow-theme-md */}

/* 폰트 */
<div class="font-outfit">           {/* --font-outfit */}
```

### CSS 변수로 직접 사용하기

```css showLineNumbers
.my-card {
  background-color: var(--color-brand-500);
  box-shadow: var(--shadow-theme-md);
  color: var(--color-primary);   /* semantic 토큰 — 다크모드 자동 대응 */
}
```

:::info 다크모드 대응이 필요한 경우
* `--color-brand-500` 처럼 primitive 토큰은 다크모드에서도 값이 고정됩니다.
* `--color-primary` 처럼 semantic 토큰은 `.dark` 클래스가 붙으면 자동으로 값이 바뀝니다.
* **다크모드 대응이 필요한 색상은 semantic 토큰을 사용하세요.**
:::

### 현재 사용 가능한 토큰 확인하기

```sh
npm run storybook
```

Storybook을 실행하면 `Getting Started/Design Tokens` 에서 색상·타이포·그림자 전체 목록을 확인할 수 있습니다.

---

## 퍼블리싱 컴포넌트 작업하기
---

`src/publishing/`은 퍼블리셔가 디자인 토큰을 활용해 React 컴포넌트를 만드는 **작업 공간**입니다.
작업이 완료되면 개발자가 `src/domains/` 또는 `src/shared/`로 가져갑니다.

### 컴포넌트 파일 만들기

`src/publishing/components/` 아래에 폴더와 파일을 만듭니다.

```sh
src/publishing/
└── components/
    └── my-card/                    ← 작업할 컴포넌트 이름으로 폴더 생성
        ├── MyCard.tsx
        └── MyCard.stories.tsx
```

**`MyCard.tsx`** — Tailwind 유틸리티 클래스와 `cn()`을 사용해 작성합니다.

```tsx showLineNumbers
import { cn } from '@/lib/utils';

interface IMyCardProps {
  title: string;
  variant?: 'default' | 'primary';
}

export default function MyCard({ title, variant = 'default' }: IMyCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4 shadow-theme-md',
        variant === 'primary' && 'bg-brand-500 text-white',
        variant === 'default' && 'bg-white text-gray-900',
      )}
    >
      <h3 className="text-theme-xl font-semibold">{title}</h3>
    </div>
  );
}
```

:::info 작업 규칙
* raw CSS 파일(`.css`)을 새로 만들지 않습니다. Tailwind 유틸 클래스 + `cn()`을 사용합니다.
* import 경로는 `@/` alias를 사용합니다. (예: `@/lib/utils`, `@/assets/styles/...`)
* React Router에 등록하지 않습니다. 팀 공유는 Storybook으로 합니다.
:::

### Storybook 스토리 작성하기

**`MyCard.stories.tsx`** — 스토리를 작성하면 팀원이 Storybook에서 바로 확인할 수 있습니다.

```tsx showLineNumbers
import type { Meta, StoryObj } from '@storybook/react';
import MyCard from './MyCard';

const meta: Meta<typeof MyCard> = {
  title: 'Publishing/MyCard',
  component: MyCard,
};

export default meta;
type Story = StoryObj<typeof MyCard>;

export const Default: Story = {
  args: { title: '기본 카드' },
};

export const Primary: Story = {
  args: { title: '주요 카드', variant: 'primary' },
};
```

```sh
# 작성 후 Storybook에서 확인
npm run storybook
```

---

## 전체 작업 흐름 요약
---

```
토큰 수정이 필요한 경우
  └─ src/design-tokens/primitive/*.json  또는  semantic/light.json, dark.json 수정
  └─ npm run build:tokens  (또는 npm run dev 실행 중이면 자동 빌드)
  └─ 브라우저·Storybook에서 확인

SI 프로젝트 브랜드 적용
  └─ src/assets/styles/themes/theme-[project].css 생성
  └─ app.css에서 해당 파일 @import 주석 해제
  └─ 브라우저에서 색상 확인

퍼블리싱 컴포넌트 작업
  └─ src/publishing/components/[name]/ 폴더 생성
  └─ [Name].tsx 컴포넌트 작성 (Tailwind + cn())
  └─ [Name].stories.tsx 스토리 작성
  └─ npm run storybook 으로 팀 공유
  └─ 핸드오프 완료 → 개발자가 src/domains/ 또는 src/shared/로 이동
```
