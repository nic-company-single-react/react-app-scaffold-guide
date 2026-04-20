---
sidebar_position: 1
displayed_sidebar: 'apiDocSidebar'
title: '⋮ useApi'
---

# useApi
`useApi`훅은 **Client Component** 훅으로, **TanStack Query(React Query)** 기반으로 구축된 **REST API 호출용** 함수입니다.

* **useApi** 훅은 내부적으로 **axios** 또는 **fetch**를 활용하여 **GET, POST** HTTP 메서드를 사용하여 데이터를 조회합니다.
  * 데이터를 조회할 때만 **useApi** 훅을 사용하고, 데이터를 업데이트할 때는 **useApiMutation** 훅을 사용합니다.
* **TanStack Query(React Query)** 의 자동 캐싱, 로딩/에러 상태 관리, 백그라운드 재검증, refetch 등 강력한 데이터 페칭 기능을 제공하고, **TypeScript 제네릭**을 통해 API 응답 데이터의 타입 안정성을 보장합니다.
* **Client Component**에서 사용하는 REST API 호출용 훅 이므로 **호출 도메인이 다르면 CORS 이슈**가 발생할 수 있으며, Component가 모두 렌더링된 후 API 요청이 발생하므로 **SEO 최적화**에 부적합합니다.



![useApi 동작 흐름도](./useapi-flow-diagram.svg)







## 사용 예제
---
* [실제 동작 예제 보기: https://react-app-scaffold.vercel.app/example/library-api/hooks/use-api](https://react-app-scaffold.vercel.app/example/library-api/hooks/use-api)
```tsx
'use client';

import { JSX } from 'react';
// highlight-start
import { useApi } from '@hooks/api';
// highlight-end
// 내부 API - Posts(업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
}

// 페이지 컴포넌트의 Props 타입 정의
export interface ISamplePageProps {
  // test?: string;
}

// 페이지 컴포넌트 함수
export default function SamplePage({}: ISamplePageProps): JSX.Element {
  // 내부 API 호출(/posts)
  // highlight-start
  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = useApi<IPost[]>('/posts');
  // highlight-end
  return (
    <div>
      {
        postsLoading
          ? 'Loading...'
          : postsError
            ? 'Error: ' + JSON.stringify(postsError)
            : JSON.stringify(postsData || [], null, 2) || 'No data'
      }
    </div>
  );
}
```









## 사용법
---
* `useApi` 훅을 import 합니다.
  ```tsx
  import { useApi } from '@hooks/api';
  ```
* **Client Component** 함수 최상위에서 **useApi** 훅을 호출합니다.
  - **Client Component**가 렌더링될 때 `useApi`가 자동으로 API 요청을 수행합니다.
  - **IPost** 타입을 제네릭으로 전달하여 반환값의 타입을 정의합니다. (업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
  ```tsx
  export default function SamplePage(): JSX.Element {
    // useApi 훅을 호출하여 API 요청을 수행합니다.
    // highlight-start
    const {
      data: postsData,
      error: postsError,
      isLoading: postsLoading,
    } = useApi<IPost[]>('/posts');
    // highlight-end
    return (
      <div>
        {
          postsLoading
            ? 'Loading...'
            : postsError
              ? 'Error: ' + JSON.stringify(postsError)
              : JSON.stringify(postsData || [], null, 2) || 'No data'
        }
      </div>
    );
  }
  ```
* `useApi` 훅의 반환값은 **TanStack Query** 의 `useQuery` 훅의 반환값과 내용, 사용법이 동일합니다.
  - [TanStack Query - useQuery 반환값 참조](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
  ```tsx
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPending,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    isEnabled,
    promise,
    refetch,
    status,
  } = useQuery(
    {
      queryKey,
      queryFn,
      gcTime,
      enabled,
      networkMode,
      initialData,
      initialDataUpdatedAt,
      meta,
      notifyOnChangeProps,
      placeholderData,
      queryKeyHashFn,
      refetchInterval,
      refetchIntervalInBackground,
      refetchOnMount,
      refetchOnReconnect,
      refetchOnWindowFocus,
      retry,
      retryOnMount,
      retryDelay,
      select,
      staleTime,
      structuralSharing,
      subscribed,
      throwOnError,
    },
    queryClient,
  )
  ```

* `useApi`를 사용하면, 내부적으로 **TanStack Query 캐시**에 저장 및 관리됩니다. `useQuery`함수의 반환 데이터와 각종 상태값(로딩, 에러, 성공 등)을 동일한 **URL**(`queryKey`)로 여러 컴포넌트에서 효율적으로 공유하거나 재사용할 수 있고, 네트워크 요청 최적화 및 캐싱, 상태 동기화가 자동으로 처리됩니다.












## API 참조
---
### 타입
  ```typescript
  import { type UseQueryResult } from '@tanstack/react-query';
  
  export interface IUseApiOptions<T> {
    /** HTTP Method (기본값: 'GET') */
    method?: THttpMethod;
    /** Query parameters (주로 GET 요청 시 사용) */
    params?: QueryParams;
    /** Request body (POST/PUT/PATCH/DELETE 요청 시 사용) */
    body?: Record<string, any>;
    /** Custom headers */
    headers?: Record<string, string>;
    /** React Query options (queryKey와 queryFn은 내부에서 자동 생성됨) */
    queryOptions?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>;
    /** Request timeout */
    timeout?: number;
    /** API Call Type (기본값: 'client') */
    apiCallType?: 'client' | 'server';
  }
  
  function useApi<T>(
    endpoint: string, 
    options?: IUseApiOptions<T>
  ): UseQueryResult<NoInfer<T>, Error>;
  ```

### 매개변수

  | Parameter  | Type                 | 필수 | 기본값  | 설명                        |
  | :--------- | :------------------- | :--- | :------ | :------------------------- |
  | endpoint   | string               | 필수 | -       | API 엔드포인트 URL (예: '/api/posts', '/users/1') 또는 'http'로 시작하는 전체 외부 URL   |
  | options    | IUseApiOptions\<T\>  | 선택 | -       | API 호출 옵션 객체 (아래 참조)   |

  **options(IUseApiOptions) 객체 속성**

  | Property       | Type                          | 필수 | 기본값     | 설명                        |
  | :------------- | :---------------------------- | :--- | :--------- | :------------------------- |
  | method         | THttpMethod                   | 선택 | 'GET'      | HTTP 메서드 ('GET', 'POST') 조회용 API 호출 시 사용   |
  | params         | QueryParams                   | 선택 | undefined  | URL 쿼리 파라미터 객체 (GET 요청 시 주로 사용)   |
  | body           | Record\<string, any\>         | 선택 | undefined  | 요청 본문 데이터 (POST 요청 시 사용)   |
  | headers        | Record\<string, string\>      | 선택 | undefined  | 커스텀 HTTP 헤더   |
  | queryOptions   | Omit\<UseQueryOptions\<T, Error, T\>, 'queryKey' \| 'queryFn'\> | 선택 | undefined  | React Query 옵션 (enabled, staleTime, gcTime, refetchInterval 등)   |
  | timeout        | number                        | 선택 | undefined  | 요청 타임아웃 (밀리초)   |
  | apiCallType    | 'client' \| 'server'          | 선택 | 'client'   | API 호출 타입(사용하지 않음. 내부적으로 자동 설정)   |

#### ◉ 반환값  
`useApi` 훅은 **TanStack Query**의 `UseQueryResult<T, Error>` 객체를 반환합니다. 주요 속성은 다음과 같습니다:

  | 속성               | Type                   | 설명                        |
  | :----------------- | :--------------------- | :------------------------- |
  | data               | T \| undefined         | API 응답 데이터 (성공 시)   |
  | error              | Error \| null          | 에러 객체 (실패 시)   |
  | isLoading          | boolean                | 최초 로딩 중 여부   |
  | isFetching         | boolean                | 데이터 페칭 중 여부 (백그라운드 리페치 포함)   |
  | isSuccess          | boolean                | 요청 성공 여부   |
  | isError            | boolean                | 요청 실패 여부   |
  | refetch            | \(\) => Promise\<UseQueryResult\> | 수동으로 데이터 다시 가져오기   |
  | status             | 'pending' \| 'error' \| 'success' | 요청 상태   |
  | fetchStatus        | 'fetching' \| 'paused' \| 'idle' | 페칭 상태   |

  :::info <span class="admonition-title">TanStack Query UseQueryResult</span>.
  * 전체 반환값 속성은 [TanStack Query - useQuery 공식 문서](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)를 참조하세요.
  * `data`, `error`, `isLoading`, `isFetching`, `isSuccess`, `isError`, `refetch` 등의 속성을 통해 API 호출 상태와 결과를 관리할 수 있습니다.
  :::

* **사용 예시**
  ```tsx
  // 기본 사용
  const { data, error, isLoading } = useApi<IPost[]>('/posts');

  // 쿼리 파라미터 사용
  const { data } = useApi<IUser>('/users/1', {
    params: { include: 'profile' }
  });

  // POST 메서드 사용 (조회 시에만 useApi 사용)
  const { data } = useApi<IPost>('/posts', {
    method: 'POST',
    body: { title: '제목', content: '내용' }
  });

  // React Query 옵션 사용
  const { data, refetch } = useApi<IPost[]>('/posts', {
    queryOptions: {
      enabled: true,           // 자동 실행 여부
      staleTime: 5000,         // 5초 동안 데이터를 신선한 상태로 유지
      gcTime: 300000,          // 5분 후 캐시에서 제거
      refetchOnWindowFocus: true, // 윈도우 포커스 시 재요청
      refetchInterval: 10000,  // 10초마다 자동 재요청
    }
  });
  ```
