---
sidebar_position: 1
displayed_sidebar: "taskDocSidebar"
title: "Redux-Toolkit 초기세팅정리"
---

# Redux Toolkit 초기 세팅 정리

:::info <span class="admonition-title">Redux Toolkit</span>이란?
* **Redux**는 **React**애플리케이션의 상태 관리 라이브러리 입니다.
* **Redux Toolkit**은 **Redux**를 더 쉽게 사용할 수 있도록 만든 공식 패키지입니다.
  * **Redux Toolkit**은 **Redux**의 복잡성을 줄이면서 장점은 유지하는 현대적인 접근 방식을 제공합니다.
  * 하지만 여전히 복잡하다는 의견이 많습니다.
:::

:::info <span class="admonition-title">Redux Toolkit</span> 대신 사용할 수 있는 다른 라이브러리.
* **React Context API** - React 내장 기능으로, 간단한 상태 관리에 적합합니다.
* **Zustand** - 간결한 API로 인기 있는 최신 상태 관리 라이브러리입니다.
* **Recoil** - Facebook에서 개발한 라이브러리로 atom 기반 접근 방식을 사용합니다.
* **Jotai** - Recoil에 영감을 받았지만 더 가볍고 간단한 API를 제공합니다.
* **MobX** - 반응형 프로그래밍 패러다임을 사용하는 강력한 상태 관리 솔루션입니다.
* **XState** - 상태 머신 기반의 접근법으로 복잡한 상태 관리에 적합합니다.
* **SWR** - 서버 상태 관리에 특화된 라이브러리로, 캐싱과 데이터 동기화 기능이 뛰어납니다.
* **TanStack Query(React Query)** - 서버 상태 관리에 특화된 라이브러리로, 캐싱과 데이터 동기화 기능이 뛰어납니다. (**React** 라는 이름을 버리고 다양한 애플리케이션(Vue, React, Svelte, Angular)에서 사용할 수 있는 의미의 이름으로 바꿈).
* **Valtio** - Proxy 기반의 상태 관리 라이브러리로 직관적인 API를 제공합니다.
* **Apollo Client** - GraphQL을 사용하는 경우, 클라이언트 상태 관리 기능도 제공합니다.
:::






## Redux, Redux-Toolkit 설치
---
```sh
#redux-toolkit 설치
npm install @reduxjs/toolkit

#redux 설치 (react와 연결 시켜주는 역할)
npm install react-redux

# Typescript를 위한 설치
npm install -D @types/react-redux
```
* **REST API** 통신을 위한 `axios`설치
```sh
npm i axios
```






## Provider를 이용하여 애플리케이션 루트에 store 연결
---
`AppProvider.tsx` 파일에 `<Provider>`를 이용하여 **store**를 연결합니다.
```tsx
// Redux Store 연결을 위한 import ------------------
// highlight-start
import { Provider } from 'react-redux';
import reduxStore from '@/app/store/store-redux';
// highlight-end

//... 기타 코드

interface IAppProviderProps {
  children: any;
}

const AppProvider: IComponent<IAppProviderProps> = ({ children }): JSX.Element => {
  
  //... 기타 코드

  return (
    // highlight-start
    <Provider store={reduxStore}>
    // highlight-end
      <LayoutASideProvider>{children}</LayoutASideProvider>
    </Provider>
  );
};

export default AppProvider;
```
* 아직 `/src/app/store/store-redux.ts` 파일이 없으므로 생성합니다.
* `/src/app/store/store-redux.ts`파일에 **store**를 생성하기 위한 초기 코드를 작성합니다.
* `/src/app/store/store-redux.ts` 파일은 **store** 생성하는 코드 외에도 **redux store**관련 여러 코드를 작성할 것입니다.
```ts
import { configureStore, combineReducers, type Reducer } from '@reduxjs/toolkit';
import generatedStore from '@/shared/store/app-store-redux';

//... 기타 코드

// 전역 redux store 생성 --------------------------
export const reduxStore = configureStore({
	reducer: generatedStore(),
});

export default reduxStore;
```
:::info <span class="admonition-title">generatedStore()</span> 함수
* `generatedStore` 함수는 업무(domain)마다 생성해서 가지고 있는 store를 모아서 각각의 **store slice**를 생성해주는 **helper**함수입니다.
* `generatedStore` 함수를 `/src/shared/..` 폴더 아래 생성한 이유는 각 업무(domain)마다 생성한 **store**를 각각 채워 넣을 수 있는(수정할 여지가 있는) 요소가 있기 때문에 **shared**폴더에 생성하였습니다. 
:::

* `/src/shared/store/app-store-redux.ts` 파일의 내용은 다음과 같습니다.
```ts
import { setReducer } from '@/app/store/store-redux';

// 각 업무(domain) store를 가져와서
import exampleStore from '@/domains/example/store';

// APP Root store ------------------------
const appRootReducer = (): any => {
  return setReducer({
    appRootStore: {
      appRootStateEx: { actionType: 'appRootStore/appRootStateEx' },
      appRouteMeta: { actionType: 'appRootStore/appRouteMeta' },
      appMenuList: { actionType: 'appRootStore/appMenuList' },
      appLayout: { actionType: 'appRootStore/appLayout' },
    },
    // 가져온 업무 store를 아래쪽에 추가합니다.
    exampleStore,
  });
};

export default () => {
  return appRootReducer();
};

```
:::info 설명
* `/sr/app/store/store-redux.ts` 파일은 store관련 코어 코드모드 들어있는 파일입니다. `setReducer` 함수도 해당 파일에 구현되어 있습니다. 구체적은 내용은 코드를 직접 확인합니다.
:::