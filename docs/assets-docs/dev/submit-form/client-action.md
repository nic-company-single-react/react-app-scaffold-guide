---
sidebar_position: 2
displayed_sidebar: "assetsDocSidebar"
title: "⋮ Client + Action ☑️"
---

# Form 전송 (Client Component + Server Action)


**Client Component**에서 FormData를 **Server Action**으로 전달하고, **Server Action**에서는 FormData를 파싱하여 REST API를 호출하는 방식입니다.

:::info <span class="admonition-title">Client Component -> Server Action으로 Form</span> 전송의 다양한 방법
**프로젝트 성격, 페이지 구현 상황에 따라 적절한 방법을 선택하여 사용합니다.**
- **useActionState + useFormStatus** : Next.js 권장방식. 로딩상태, 에러처리 가능. submit버튼 컴포넌트로 분리.
- **useActionState만 사용** : submit버튼 컴포넌트로 분리하지 않은 경우 사용.
- **useState + useTransition** : 복잡한 로직이 필요한 경우 사용. 좀 더 세밀한 제어가능. action이 아닌 onSubmit으로 폼 제출 처리 해야함.
- **useState + 직접처리(onSubmit)** : useTransition을 사용하지 않고 onSubmit으로 비동기 함수 구현.
- **useState + form action직접 전달** : form action에 비동기 함수를 직접 바인딩 후 Server Action으로 전달. 코드가 간결하지만 로딩 상태 등 제어가 제한적일 수 있음. 간단한 폼일경우에 사용하는것이 좋음.
- **react-hook-form + Server Action** : 복잡한 폼 유효성 검사 가능. react-hook-form라이브러리 설치 필요.
:::



* [실제 동작 예제 보기: https://react-app-scaffold.vercel.app/example/docs-examples/client-form](https://react-app-scaffold.vercel.app/example/docs-examples/client-form)



## Form 전송 (useState + Server Action 방식)
---
**useState** 상태값과 **Server Action 직접 바인딩** 방식을 사용한 방법입니다.
```tsx
// ========================================================
// SamplePage.tsx
// ========================================================
'use client';

import { useState } from 'react';
import { todosAction } from './todosAction'; // Server Action

export default function SamplePage() {
  // highlight-start
  // 로딩상태, 결과값 상태값 선언
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  // highlight-end

  // form action에 전달할 wrapper 함수
  const handleFormAction = async (formData: FormData) => {
    setLoading(true); // 로딩상태 시작

    try {
      // highlight-start
      // Server Action 바로 호출
      const response = await todosAction(formData);
      // highlight-end
      console.log('response:::', response);
      setResult(response);
      setTimeout(() => setLoading(false), 100);
    } catch (error) {
      console.error('error:::', error);
      setTimeout(() => setLoading(false), 100);
    }
  };

  return (
    <div>
      {/* 폼 제출 action 핸들러 바인딩 */}
      // highlight-start
      <form action={handleFormAction}>
        // highlight-end
        <input name="id" defaultValue="1" />
        <input name="title" defaultValue="제목 1" />
        <textarea name="content" defaultValue="내용 1" />
        <button type="submit">{loading ? '전송 중...' : 'POST 요청 보내기'}</button>
      </form>
      {/* 폼 제출 결과 표시 부분 */}
      <pre>
        {result && result?.success ? (
          (() => {
            try {
              return JSON.stringify(result, null, 2);
            } catch {
              return <span className="text-neutral-400">결과 없음</span>;
            }
          })()
        ) : (
          <span className="text-neutral-400">결과 없음</span>
        )}
      </pre>
    </div>
  );
}
```






## Form 전송 (useState + onSubmit 방식)
---
**Client Component**에서 **useState** 상태값과 **onSubmit** 이벤트 핸들러를 사용한 방법입니다.  
React, Next.js에서 제공하는 **useActionState**, **useFormStatus** 등의 기능을 사용하지 않고 직접 구현하면 '로딩상태', '폼 유효성 검사' 등을 직접 구현해야 합니다.
:::tip <span class="admonition-title">action속성 사용 방식과 onSubmit</span> 이벤트 핸들러 사용 방식의 차이
* **action 속성 사용** : JavaScript 비활성화 시에도 동작(Progressive Enhancement), 브라우저 제공 기본동작 활용.  
* **onSubmit 이벤트 사용** : JavaScript 필수, 브라우저 기본동작 무시. 제출 전/후 Client 추가 로직 실행 가능.
:::

```tsx
// ========================================================
// SamplePage.tsx
// useState + onSubmit 방식
// ========================================================
'use client';

import { useState } from 'react';
// highlight-start
import { todosAction } from './todosAction'; // Server Action
// highlight-end

function SamplePage() {
  // highlight-start
  // 로딩상태, 결과값, 에러 상태값 선언
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // highlight-end

  // form의 onSubmit 이벤트 처리 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 무시

    setLoading(true);
    setError(null);

    try {
      // FormData 직접 생성
      const formData = new FormData(e.currentTarget);

      // Server Action 직접 호출 (formData만 전달)
      // highlight-start
      const response = await todosAction(formData);
      // highlight-end
      console.log('response:::', response);
      setResult(response);
      setLoading(false)
    } catch (error) {
      console.error('error:::', error);
      setError('폼 제출 중 오류가 발생했습니다.');
      setLoading(false)
    }
  };

  return (
    <div>
      {/* onSubmit 이벤트 핸들러 바인딩 */}
      // highlight-start
      <form onSubmit={handleSubmit}>
        // highlight-end
        <input name="id" defaultValue="1" />
        <input name="title" defaultValue="제목 1" />
        <textarea name="content" defaultValue="내용 1" />
        <button type="submit" disabled={loading}>{loading ? '전송 중...' : 'POST 요청 보내기'}</button>
      </form>
      {/* 폼 제출 결과 표시 부분 */}
      <pre>
        {result && result?.success ? (
          (() => {
            try {
              return JSON.stringify(result, null, 2);
            } catch {
              return <span className="text-neutral-400">결과 없음</span>;
            }
          })()
        ) : (
          <span className="text-neutral-400">결과 없음</span>
        )}
      </pre>
    </div>
  );
}

// ========================================================
// todosAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/api';

export async function todosAction(formData: FormData) {
  // FormData를 파싱하여 값을 추출합니다.
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const id = formData.get('id') as string;

  // FormData를 추출하는 방법으로 Object.fromEntries() 함수를 사용할 수도 있습니다.
  // const formDataObject = Object.fromEntries(formData.entries());
  // console.log('formDataObject:::', formDataObject);

  // serverApi 호출
  // formData를 직접 전달하면 serverApi가 자동으로 Content-Type: multipart/form-data를 설정합니다.
  const res = await serverApi<any>('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  });

  // api 호출 결과 성공 처리
  if (res.data) {
    // 성공 응답
    return { success: true, message: '할일이 추가되었습니다.', data: res.data };
  }
}
```








## Form 전송 (useActionState 사용 방식)
---
**useActionState(Server Action의 결과를 상태로 관리하는 핵심 훅)**를 사용하여 Form 제출 처리하는 방법입니다.
:::tip <span class="admonition-title">useActionState</span> 장점
* **자동 상태 관리** : Server Action 결과가 자동으로 state에 저장
* **isPending 제공** : 로딩 상태를 별도로 관리할 필요 없음
* **에러 처리 간편** : 반환값으로 에러 전달
:::
```tsx
// ========================================================
// SamplePage.tsx
// useActionState 사용 방식
// ========================================================
'use client';

import { useActionState } from 'react';
// highlight-start
import { postsAction } from './postsAction'; // Server Action
// highlight-end
 
export default function SamplePage() {
  // ✅ useActionState로 Server Action 결과 자동 관리
  // highlight-start
  const [state, formAction, isPending] = useActionState(
    postsAction,
    null // 초기 상태 값
  );
  // highlight-end
  return (
    <div>
      {/* form action 핸들러 바인딩 */}
      // highlight-start
      <form action={formAction}>
        // highlight-end
        <input name="id" defaultValue="1" />
        <input name="title" placeholder="제목" />
        <textarea name="body" placeholder="내용" />
        
        {/* isPending으로 로딩 상태 표시 */}
        <button type="submit" disabled={isPending}>
          {isPending ? '전송 중...' : 'POST 요청 보내기'}
        </button>
      </form>

      {/* ✅ state로 결과 자동 표시 */}
      {state?.success && (
        <div className="success">
          <h3>{state.message}</h3>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}

      {state?.success === false && (
        <div className="error">{state.message}</div>
      )}
    </div>
  );
}
 
 
// ========================================================
// postsAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/api';

// ✅ 첫 번째 매개변수는 이전 상태 (필수!)
export async function postsAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const id = formData.get('id') as string;

  try {
    const res = await serverApi<any>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }
    );

    if (res.data) {
      // ✅ 반환된 객체가 자동으로 state가 됨
      return {
        success: true,
        data: res.data,
        message: '게시글이 작성되었습니다.',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('API Error:', err);
    return {
      success: false,
      message: '폼 제출 중 오류가 발생했습니다.',
      error: err.message,
    };
  }

  return {
    success: false,
    message: '폼이 제출되지 않았습니다.',
    data: null,
  };
}
```








## Form 전송 (useActionState + [useActionStatus] + useFormStatus 사용 방식)
---
**useFormStatus**(폼의 제출 상태를 추적하는 훅 (자식 컴포넌트에서 사용))를 **useActionState**과 함께 사용하여 Form 제출 처리를 구현한 방식입니다.  
  - 만약 `<form>` 요소의 자식 컴포넌트가 있다면 **useActionStatus** 훅을 함께 사용할 수도 있습니다.

:::tip <span class="admonition-title">useFormStatus</span> 특징
* ⚠️ 반드시 `<form>` 내부의 **자식 컴포넌트에서만 사용** 가능
* 반환값 : `{ pending: boolean, data: FormData, method: string, action: () => void }`
  * **pending** : 폼 제출 중인지 여부
  * **data** : FormData 객체
  * **method** : HTTP 메서드 (post, get 등)
  * **action** : 실행 중인 action 함수
:::
:::tip <span class="admonition-title">useFormState</span>와 <span class="admonition-title">useFormStatus</span>의 차이점
* **useFormState** : Server Action의 결과를 상태로 관리 (에러, 성공 메시지 등)
* **useFormStatus** : 폼의 제출 상태를 추적하는 훅 (로딩상태 등)(Form 요소 자식 컴포넌트에서 사용)
* **핵심 차이점 비교** :

| 구분 |	useFormState |	useFormStatus |
| :--- | :--- | :--- |
| 사용 위치 |	Form 컴포넌트 자체 |	Form의 자식 컴포넌트만 |
| 주요 목적 |	Server Action 결과 관리 |	제출 중 상태 확인 |
| 반환값 |	`[state, formAction]` |	`{ pending, data, method, action }` |
| 데이터 |	Server Action의 return 값 |	제출 중인 FormData |

:::
```tsx
'use client';

import { useFormStatus } from 'react-dom';

// ✅ 별도의 Submit 버튼 컴포넌트 (Form 요소 자식 컴포넌트)
function SubmitButton() {
  // highlight-start
  const { pending, data, method, action } = useFormStatus();
  // highlight-end
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <span className="spinner" />
          전송 중...
        </>
      ) : (
        'POST 요청 보내기'
      )}
    </button>
  );
}

// 메인 컴포넌트
export default function ClientFormPage() {
  // highlight-start
  const [state, formAction] = useActionState(postsAction, null);
  // highlight-end

  return (
    // highlight-start
    <form action={formAction}>
    // highlight-end
      <input name="title" placeholder="제목" />
      <textarea name="body" placeholder="내용" />
      
      {/* ✅ 자식 컴포넌트에서 useFormStatus 사용 */}
      <SubmitButton />
    </form>
  );
}
 
 
// ========================================================
// postsAction.ts (Server Action)
// ========================================================
'use server';

import { serverApi } from '@fetch/api';

// ✅ 첫 번째 매개변수는 이전 상태 (필수!)
export async function postsAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const id = formData.get('id') as string;

  try {
    const res = await serverApi<any>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }
    );

    if (res.data) {
      // ✅ 반환된 객체가 자동으로 state가 됨
      return {
        success: true,
        data: res.data,
        message: '게시글이 작성되었습니다.',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('API Error:', err);
    return {
      success: false,
      message: '폼 제출 중 오류가 발생했습니다.',
      error: err.message,
    };
  }

  return {
    success: false,
    message: '폼이 제출되지 않았습니다.',
    data: null,
  };
}
```






## Form 전송 (useOptimistic 사용 방식)
---
**useOptimistic**(낙관적 업데이트를 위한 훅)를 사용하여 Form 제출 처리하는 방법입니다.

:::tip <span class="admonition-title">useOptimistic</span>의 장점
* **즉각적인 UI 피드백** : 서버 응답을 기다리지 않음
* **자동 롤백** : 실패 시 이전 상태로 복원
* **더 나은 UX** : 앱이 더 빠르게 느껴짐
:::

```tsx
'use client';

import { useOptimistic } from 'react';
import { useActionState } from 'react';
import { addPostAction } from './postsAction';

export default function PostList({ initialPosts }) {
  const [state, formAction] = useActionState(addPostAction, null);

  // ✅ 낙관적 업데이트 훅
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    initialPosts,
    (currentPosts, newPost) => [...currentPosts, newPost]
  );

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    // ✅ 즉시 UI 업데이트 (서버 응답 전)
    addOptimisticPost({
      id: 'temp-' + Date.now(),
      title,
      body,
      isPending: true, // 임시 표시
    });

    // 실제 Server Action 실행
    await formAction(formData);
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" placeholder="제목" />
        <textarea name="body" placeholder="내용" />
        <button type="submit">추가</button>
      </form>

      {/* ✅ 낙관적으로 업데이트된 목록 표시 */}
      <ul>
        {optimisticPosts.map((post) => (
          <li key={post.id} className={post.isPending ? 'opacity-50' : ''}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.isPending && <span>전송 중...</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```






## Form 전송 (useTransition 사용 방식)
---
**useTransition**(비동기 작업의 pending 상태를 추적)을 사용하여 Form 제출 처리를 구현한 방식입니다.  

:::tip <span class="admonition-title">useTransition</span> 장점
* **비동기 상태 관리의 단순화** : isPending 상태를 자동으로 제공해서 로딩 상태를 별도로 관리할 필요가 없습니다. useState로 loading 상태를 직접 관리하는 것보다 훨씬 간결합니다.
* **UI 응답성 유지** : transition으로 표시된 업데이트는 긴급하지 않은 것으로 처리되어, 사용자 입력 같은 더 중요한 업데이트에 우선순위를 양보합니다. 덕분에 무거운 작업 중에도 UI가 멈추지 않고 반응성을 유지합니다.
* **Server Actions와의 완벽한 통합** : Server Actions와 함께 사용하면 form 제출이 매우 깔끔해집니다. 클라이언트-서버 통신을 추상화해서 코드가 단순해집니다.
:::

```tsx
'use client'

// highlight-start
import { useState, useTransition } from 'react';
import { postsAction } from './postsAction'; // Server Action
// highlight-end

export default function SamplePage() {
  // highlight-start
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  // highlight-end

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // 비동기 작업 먼저 실행
      const response = await postsAction(formData);
      
      // ✅ 상태 업데이트만 startTransition으로 감싸기
      // highlight-start
      startTransition(() => {
        if (response.success) {
          setResult(response.data);
        } else {
          setError(response.message);
        }
      });
      // highlight-end
    } catch (err) {
      startTransition(() => {
        setError('오류 발생');
      });
    }
  };

  return (
    <div>
      // highlight-start
      <form onSubmit={handleSubmit}>
      // highlight-end
        <input name="title" disabled={isPending} />
        <textarea name="body" disabled={isPending} />
        
        {/* ✅ isPending으로 로딩 상태 표시 */}
        <button type="submit" disabled={isPending}>
          {isPending ? '전송 중...' : '제출'}
        </button>
      </form>

      {result && <div>성공: {JSON.stringify(result)}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```