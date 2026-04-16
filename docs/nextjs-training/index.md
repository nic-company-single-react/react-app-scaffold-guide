---
sidebar_position: 1
displayed_sidebar: "nextjsTrainingSidebar"
title: "training 시작하기"
---

# training 시작하기


Next.js 환경을 기반으로 만들어진 **redsky-next-assets** 프로젝트 사용을 위한 실전 트레이닝을 진행합니다.

본 트레이닝 과정은 **Next.js** 의 개발 방법, 패턴 등을 실습합니다.
모든 과정은 **Next.js 공식문서**를 기반한 내용이며, **redsky-next-assets**를 이용하여 실제 프로젝트를 진행할 수 있도록 최소한의 트레이닝 과정을 진행합니다.  
[Next.js 공식문서 : https://nextjs.org/docs](https://nextjs.org/docs)


---

> **참고:** Training 예시 자료는 **redsky-next-assets** 프로젝트 sample 사이트에서 확인 가능합니다.  
> 자세한 실습 화면, 코드, 구조는 [샘플 페이지 : https://redsky-next-assets.vercel.app/main](https://redsky-next-assets.vercel.app/main)를 확인해 보세요.


:::info 실습용 <span class="admonition-title">Next.js 프로젝트 Git</span> 저장소
* 다음 위치의 Git 저장소를 클론하여 실습할 수 있습니다. (실습용 프로젝트는 실제 **redsky-next-assets**프로젝트와 동일한 구조로 구성되어 있으나 실무 프로젝트에서는 사용하지 않는 실습용 프로젝트 입니다.)  
  - [redsky-next-assets-training : https://github.com/redsky0212/redsky-next-assets-training](https://github.com/redsky0212/redsky-next-assets-training )
* 실습 Git 저장소 클론 및 PC설치 과정 간략하게 정리.
  - (1) PC에 작업할 폴더를 생성 `mkdir -p ~/projects/frontend-next`
  - (2) 생성한 폴더로 이동 `cd ~/projects/frontend-next`
  - (3) 생성한 폴더에서 Git 저장소 클론 `git clone git@github.com:redsky-project/redsky-next-assets-training.git`
  - (4) 클론된 저장소로 이동 `cd redsky-next-assets-training`
  - (5) 프로젝트 설치 `npm install`
  - (6) 프로젝트 실행 `npm run dev`
  - (7) 프로젝트 실행 브라우저에서 확인 `http://localhost:5173` (로컬 서버 Port는 다를 수 있습니다.)
* **&#8251; 실행 과정에 문제가 있다면 프로젝트 담당자에게 문의하세요.**
:::
:::tip <span class="admonition-title">Next.js</span> 프로젝트 버전
* **redsky-next-assets** 프로젝트는 **<span class="text-color-red">Next.js 16.0.10</span>** 및 **<span class="text-color-red">React 19.2.0</span>** 환경을 기반으로 개발되었습니다.
:::

---
## Next.js 란?
---
* **Next.js**는 **풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크**입니다.
* 사용자 인터페이스를 구축할 때는 React 컴포넌트를 사용하고, 그 외의 추가적인 기능과 최적화 설정은 Next.js가 제공합니다.




## 사전 권장 지식
---
* [`JavaScript`: https://developer.mozilla.org/ko/docs/Web/JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
* [`HTML`: https://developer.mozilla.org/ko/docs/Web/HTML](https://developer.mozilla.org/ko/docs/Web/HTML)
* [`CSS`: https://developer.mozilla.org/ko/docs/Web/CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [`React`: https://react.dev/](https://react.dev/)
* [`TypeScript`: https://www.typescriptlang.org/](https://www.typescriptlang.org/)






## 실습 업무(domain) 폴더 위치
---
* Git 저장소에서 클론 받은 프로젝트를 열어보면 다음과 같은 폴더 구조를 확인할 수 있습니다.
* 실습용 업무(domain) 폴더는 **`src/app/(domains)/training`** 업무폴더입니다.
  - 실습 시 모든 작업은 **`src/app/(domains)/training`** 에서 진행합니다.
```sh
redsky-next-assets-training
├── @types
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prettier.config.js
├── public
├── src
│   ├── app
│   │   ├── (domains)
│   │   │   ├── main
// highlight-start
│   │   │   ├── training
// highlight-end
│   │   │   └── ...
│   │   ├── favicon.ico
│   │   └── layout.tsx
│   ├── assets
│   │   ├── images
│   │   ├── styles
│   │   └── ...
│   ├── core
│   │   ├── common
│   │   ├── components
│   │   ├── hooks
│   │   └── types
│   └── shared
│       ├── components
│       ├── constants
│       └── ...
└── tsconfig.json

```