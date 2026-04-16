---
sidebar_position: 1
displayed_sidebar: "assetsDocSidebar"
title: "페이지 이동하기"
---

# 페이지 이동하기

:::info 작업 내용
* 페이지 이동을 위한 `$router` 전역 객체의 **push()**, **replace()**, **back()** 메서드를 사용하여 페이지 이동을 합니다. 
* **서버환경**에서 **push()**, **replace()** 메서드 사용 방법.
* **클라이언트환경**에서 **push()**, **replace()**, **back()** 메서드 사용 방법.
:::





## 페이지 이동 함수 특징
---
* **`$router.push(라우터url, [옵션])`**
  - **서버환경**, **클라이언트환경** 모두 사용할 수 있고, 페이지 이동 후 **브라우저 히스토리 스택**에 추가됩니다.
  - [$router.push() API 문서 바로가기](../../assets-api/global-object/$router/router-push)
* **`$router.replace(라우터url, [옵션])`**
  - **서버환경**, **클라이언트환경** 모두 사용할 수 있고, 페이지 이동 후 **브라우저 히스토리 스택**의 이전 페이지를 덮어씌웁니다.
  - [$router.replace() API 문서 바로가기](../../assets-api/global-object/$router/router-replace)
* **`$router.back()`**
  - **클라이언트환경**에서만 사용할 수 있고, **브라우저 히스토리 스택**에서 이전 페이지로 이동합니다.
  - **서버환경**에서는 동작하지 않습니다.
  - [$router.back() API 문서 바로가기](../../assets-api/global-object/$router/router-back)







## 페이지 이동 예제
* 다음과 같은 **account** 업무 폴더 구조가 있다고 가정합니다.
```sh
src
├── app
│   ├── (domains)
│   │   ├── ...
// highlight-start
│   │   └── account # account 업무 폴더
│   │       ├── (pages)       
│   │       │   ├── main            # 계좌메인화면
│   │       │   │   ├── page.tsx    
│   │       │   │   └── ...         
│   │       │   └── usage-history   # 계좌이용내역화면
│   │       │       ├── page.tsx    
│   │       │       └── ...         
│   │       ├── _action       
│   │       ├── _hooks         
│   │       ├── _styles         
│   │       ├── _common       
│   │       ├── _components   
│   │       │   └── List.tsx        
│   │       ├── api           
│   │       └── _types        
// highlight-end
│   └── ...    
└── ...
```

* **계좌메인화면(main)** 페이지에서 **계좌이용내역화면(usage-history)** 페이지로 이동하는 작업을 진행해 봅니다.
```tsx showLineNumbers
'use client';

import { $router } from '@router';
import { Button } from '@components/ui';

export default function AccountMain() {
  return (
    <div>
      <h1>계좌메인화면</h1>
      // highlight-start
      <Button onClick={() => $router.push('/account/usage-history')}>
        계좌이용내역화면으로 이동
      </Button>
      // highlight-end
    </div>
  );
}
```
![페이지 이동 결과](../assets/dev/router-push-account-example01.svg)

:::info <span class="admonition-title"> 설</span>명
* `$router.push()` 메서드는 **계좌메인화면(main)** 페이지에서 **계좌이용내역화면(usage-history)** 페이지로 이동할 때 **브라우저 히스토리 스택**에 추가 하면서 이동합니다.
  ```tsx
  // 이동 후 히스토리 스택
  [ '/account/main', '/account/usage-history' ]
  ```
* 만약 페이지 이동하면서 **브라우저 히스토리 스택**에 추가 하지 않고 이동하려면 `$router.replace()` 메서드를 사용합니다.
  ```tsx
  $router.replace('/account/usage-history');
  
  // 이동 후 히스토리 스택 ('/account/main' 페이지는 삭제됩니다.)
  [ '/account/usage-history' ]
  ```
:::







## 서버환경에서 페이지 이동 예제
---
* 서버환경에서도 페이지 이동을 하려면 **$router.push()**, **$router.replace()** 메서드를 똑같이 사용할 수 있습니다.
  - `push()`와 `replace()` 메서드는 **서버환경**일 때 내부적으로 **redirect()** 함수를 호출하여 페이지 이동을 합니다.
#### Server Action
```tsx
'use server';
import { $router } from '@router';

export async function createAccountAction(formData: FormData) {
  const result = await createAccount(formData);
  
  // 성공 시 계좌메인화면(main) 페이지로 이동 (파라미터 전달 방식 사용)
  $router.push('/account/main', {
    params: {
      id: result.id,
      message: '계좌가 생성되었습니다'
    }
  });
}
```






## $router.back() 메서드 사용 예제
---
* `$router.back()` 메서드는 **클라이언트환경**에서만 사용할 수 있습니다.
* **서버환경**에서는 동작하지 않습니다. 왜냐하면 **서버환경**에서는 **브라우저 히스토리 스택**을 관리하지 않기 때문입니다.
  - 만약 서버환경에서 이전 페이지로 이동하려면 **$router.push()**, **$router.replace()** 메서드를 사용하여 이전 페이지로 바로 이동하게 해야 합니다.
```tsx
'use client';

import { $router } from '@router';
import { Button } from '@components/ui';

export default function AccountMain() {
  return (
    <div>
      <h1>계좌메인화면</h1>
      <Button onClick={() => $router.back()}>
        이전 페이지로 이동
      </Button>
    </div>
  );
}
```