---
sidebar_position: 1
displayed_sidebar: 'apiDocSidebar'
title: '⋮ useApiData'
---

# useApiData
`useApiData` 훅은 **Client Component** 훅으로, **TanStack Query(React Query)** 에 캐시된 데이터를 읽어와서 데이터만 활용하기 위한 용도의 함수입니다.
* `useApi` 훅을 이용하여 사전에 특정 URL에 해당하는 캐시된 데이터가 있다면 `useApiData` 훅을 통해 데이터를 가져와서 사용할 수 있습니다.


![useApiData 동작 흐름도](./useapidata-flow-diagram.svg)








## 사용 예제
---
* [실제 동작 예제 보기: https://react-app-scaffold.vercel.app/example/library-api/hooks/use-api-data](https://react-app-scaffold.vercel.app/example/library-api/hooks/use-api-data)
```tsx
'use client';

import { JSX } from 'react';
// highlight-start
import { useApiData } from '@hooks/api';
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
  // useApiData('/posts')를 통해 캐시된 데이터를 가져옵니다.
  // highlight-start
  const { data: postsData } = useApiData<IPost[]>('/posts');
  // highlight-end
  return (
    <div>
      {JSON.stringify(postsData || [], null, 2) || 'No data'}
    </div>
  );
}
```










## 사용법
---
* `useApiData` 훅을 import 합니다.
  ```tsx
  import { useApiData } from '@hooks/api';
  ```
* **Client Component** 함수 최상위에서 `useApiData` 훅을 호출합니다.
  - **Client Component**가 렌더링될 때 `useApiData` 훅 함수는 **TanStack Query 캐시**에 저장된 데이터를 가져옵니다.
  - **IPost** 타입을 제네릭으로 전달하여 반환값의 타입을 정의합니다. (업무 폴더 내부의 _types 폴더에 선언된 타입 사용)
  ```tsx
  export default function SamplePage(): JSX.Element {
    // useApiData 훅을 사용하여 캐시된 데이터를 가져옵니다.
    // highlight-start
    const { data: postsData } = useApiData<IPost[]>('/posts');
    // highlight-end
    return (
      <div>
        {JSON.stringify(postsData || [], null, 2) || 'No data'}
      </div>
    );
  }
  ```
* `useApiData` 훅의 반환값은 **TanStack Query** 의 `useQuery` 훅의 반환값과 내용, 사용법이 동일합니다. 단, `useApiData` 훅은 **TanStack Query 캐시**에 저장된 데이터를 가져오는 용도로 사용되므로, 반환값에서 `data` 외의 값은 사용하지 않습니다.
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
  
  function useApiData<T>(
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
`useApiData` 훅은 **TanStack Query**의 `UseQueryResult<T, Error>` 객체를 반환합니다. 주요 속성은 다음과 같습니다:

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