---
sidebar_position: 2
displayed_sidebar: "assetsDocSidebar"
title: "⋮ Server + ReactHookForm + Zod ☑️"
---

# Form 전송 (Server Component + React Hook Form + Zod + shadcn/ui)

**Server Component**에서, 자식 컴포넌트로 폼 부분만 **Client Component**로 분리된 하이브리드 패턴으로 사용한 방식입니다.
  - `react-hook-form`과 `Zod`를 활용하여 복잡한 폼 유효성 검사를 구현하고, `shadcn/ui` Form 컴포넌트로 UI를 구성한 예제입니다.

:::info <span class="admonition-title">이 패턴의</span> 핵심.
* **타입 안전성** : Zod 스키마에서 TypeScript 타입 자동 생성
* **클라이언트 검증** : react-hook-form + Zod로 실시간 유효성 검사
* **서버 검증** : Server Action에서 동일한 Zod 스키마로 재검증 (보안)
* **shadcn/ui 통합** : Form 컴포넌트로 일관된 UI/UX 제공
* **에러 처리** : 서버 측 에러를 클라이언트 폼에 자동 반영
:::

* 라이브러리 설치
  ```bash
  npm install react-hook-form zod @hookform/resolvers
  ```

* 작업중...