---
sidebar_position: 2
displayed_sidebar: "documentDocSidebar"
title: "데이터 업데이트하기"
---

# 데이터 업데이트하기

:::info 작업 내용
* **클라이언트 환경용 useApiMutation()** 함수를 사용하여 서버 데이터를 업데이트하는 방법을 설명합니다.
* **서버 환경용 serverApi()** 함수를 사용하여 서버 데이터를 업데이트하는 방법을 설명합니다.
:::

:::tip <span class="admonition-title">Server, Client환경</span>에 대하여
* **Next.js**는 풀스택 프레임워크로, React 개발 시 **SSR**과 **CSR**을 각각 **Server Component**와 **Client Component**로 구분하여 개발할 수 있습니다.
* **Server Component**는 서버에서 실행되는 컴포넌트로, **CSR**과 달리 브라우저에서 실행되지 않습니다. 따라서 데이터를 업데이트할 때 `serverApi()` 함수를 사용하여 **서버에서 데이터를 업데이트**합니다. `serverApi()` 함수는 내부적으로 **fetch**를 통해 데이터를 업데이트하고 결과를 반환합니다.
* **Client Component**는 클라이언트에서 실행되는 컴포넌트로, **브라우저에서 실행**됩니다. 따라서 데이터를 업데이트할 때 `useApiMutation()` 함수를 사용하여 **클라이언트에서 데이터를 업데이트**하기 위한 API호출을 합니다. `useApiMutation()` 함수는 내부적으로 **Axios**를 통해 **REST API**를 호출하고 결과를 반환합니다. 또한 **TanStack Query(React Query)** 를 통해 데이터를 캐싱하고 관리합니다.   또한 브라우저에서 호출하는 훅 함수 이므로 **REST API 호출 도메인이 다르면** **CORS 이슈**가 발생할 수 있으며, Component가 모두 렌더링된 후 API 요청이 발생하므로 **SEO**(검색엔지노출) 최적화에 부적합합니다.
:::

:::tip 데이터 조회, 업데이트 방법의 차이
* **useApi()** 함수는 **클라이언트 환경**에서 `GET, POST` method 타입으로 **데이터를 조회** 용도로만 활용하고, 그 외 `POST, PUT, PATCH, DELETE` method 타입으로 서버의 **데이터를 변경, 업데이트하는 용도**로 사용할 때는 **useApiMutation()** 함수를 사용해야 합니다. 이와 같이 데이터 조회, 업데이트 방법의 차이가 있는것은 **TanStack Query(React Query)** 의 특성을 그대로 반영한 것입니다.
* **serverApi()** 함수는 **서버 환경**에서 `GET, POST, PUT, PATCH, DELETE` method 타입으로 **데이터를 조회, 업데이트** 모두 사용할 수 있습니다.
:::






## 클라이언트 환경에서 <span class="text-blue-normal">데이터 업데이트</span> 방법
---
🔗 [**useApiMutation()** API 문서 바로가기](../../assets-api/global-function/hooks/use-api-mutation)

클라이언트 환경 즉 브라우저에서 실행되는 화면 컴포넌트에서 **데이터를 업데이트**하는 방법이기 때문에 `useApiMutation()` 함수를 사용합니다.

### 기본 사용법
* Client Component의 함수 본문(최 상단)에 `useApiMutation()` 훅 코드를 추가합니다.
* form 요소의 버튼을 누르면 useApiMutation 함수 인스턴스의 **mutate** 메서드를 호출하여 서버 상태 데이터를 변경합니다.
```tsx showLineNumbers
// src/app/(domains)/account/(pages)/main/page.tsx

'use client';

import { JSX, useState } from 'react';
// highlight-start
import { useApiMutation } from '@hooks/api';
// highlight-end
// IPost. response 타입을 _types 폴더에 선언하고 사용합니다.
import type { IPost } from '@/app/(domains)/account/_types';

// 페이지 컴포넌트의 Props 타입 정의
export interface IAccountMainProps {
  // test?: string;
}

// 페이지 컴포넌트 함수 (계좌메인)
export default function AccountMain({}: IAccountMainProps): JSX.Element {
  // 업데이트 API 호출을 위한 useApiMutation() 훅 설정
  // highlight-start
  const createPostMutation = useApiMutation<IPost, { title: string; content: string }>('/api/posts', {
    method: 'POST',
    // 업데이트 요청 상황을 다음과 같이 onSuccess, onError 콜백 함수를 사용하여 처리할 수 있습니다.
    mutationOptions: {
      onSuccess: (data) => {
        console.log('Post created successfully!', data);
        // 캐시 무효화(선택적)
        createPostMutation.invalidateQueries('/api/posts');
      },
      onError: (error) => {
        console.error('Error creating post:', error);
      },
    },
  });
  // highlight-end

  // 입력 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 버튼 클릭 핸들러
  const handleMutate = () => {
    // 데이터 업데이트 요청(mutate)
    // highlight-start
    createPostMutation.mutate({
      title,
      content,
    });
    // highlight-end
  };

  // 버튼 클릭 시 데이터 업데이트
  return (
    <div className="max-h-152 overflow-auto p-4 space-y-3">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button
          onClick={handleMutate}
          disabled={createPostMutation.isPending || !title || !content}
          className="w-full"
        >
          {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
        </Button>
        {createPostMutation.isSuccess && (
          <div className="text-sm text-green-600 dark:text-green-400">✓ Post created successfully!</div>
        )}
        {createPostMutation.isError && (
          <div className="text-sm text-red-600 dark:text-red-400">✗ Error: {createPostMutation.error?.message}</div>
        )}
        {createPostMutation.data && (
          <div className="text-xs bg-neutral-50 dark:bg-neutral-900 p-2 rounded">
            <pre>{JSON.stringify(createPostMutation.data, null, 2)}</pre>
          </div>
        )}
      </div>
  );
}
```






## 서버 환경에서 <span class="text-blue-normal">데이터 업데이트</span> 방법
---
🔗 [**serverApi()** API 문서 바로가기](../../assets-api/global-function/common/server-api)

서버에서 실행되는 화면 컴포넌트에서 **데이터를 업데이트**하는 방법이기 때문에 `serverApi()` 함수를 사용합니다. 데이터 조회 방법과 크게 차이가 없습니다.

### 기본 사용법
* Server Component의 함수 본문(최 상단)에 `serverApi()` 함수 코드를 추가합니다.
```tsx showLineNumbers
// src/app/(domains)/account/(pages)/main/page.tsx

import { JSX } from 'react';
// highlight-start
import { serverApi } from '@fetch/api';
// highlight-end

export default async function createPost(formData: FormData): Promise<JSX.Element> {
  const title = formData.get('title');
  const content = formData.get('content');
  // highlight-start
  const post = await serverApi<IPost>(
    '/api/posts',
    {
      method: 'POST',
      body: { title, content },
    },
  );
  // highlight-end
  
}
```