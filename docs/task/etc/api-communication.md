---
sidebar_position: 1
displayed_sidebar: 'taskDocSidebar'
title: 'API 통신관련'
---

# Next.js 에서 API 통신관련

// 최근 react-query + api routes, server action을 사용한 공통함수 관련 api질문 답변링크공유
[https://claude.ai/share/48e8ce44-37e2-4ca0-9cf2-04ee6100e023](https://claude.ai/share/48e8ce44-37e2-4ca0-9cf2-04ee6100e023)

// api 통신모듈 ai
* 공유링크 : [https://claude.ai/share/7df59433-37fe-4d36-a918-b265fc1e5f0b](https://claude.ai/share/7df59433-37fe-4d36-a918-b265fc1e5f0b)

## claude에서 검색한 내용
---
* 공유링크 : [https://claude.ai/share/c6c796b6-5d2d-4240-8eda-e2d9038eefe8](https://claude.ai/share/c6c796b6-5d2d-4240-8eda-e2d9038eefe8)
```sh
Next.js 에서 Server Action 에 대해 알려줘

Next.js의 Server Action에 대해 설명드리겠습니다.

Server Action이란?
Server Action은 Next.js 13.4에서 도입된 기능으로, 서버에서 실행되는 비동기 함수입니다. 클라이언트에서 API 라우트를 별도로 만들지 않고도 서버 측 로직을 직접 호출할 수 있게 해줍니다.

주요 특징
서버 측 실행: 코드가 서버에서만 실행되므로 민감한 정보(API 키, 데이터베이스 접근 등)를 안전하게 처리할 수 있습니다.

간편한 사용: API 엔드포인트를 별도로 만들 필요 없이 함수를 직접 호출하는 방식으로 사용합니다.

폼 통합: HTML 폼과 자연스럽게 통합되어 Progressive Enhancement를 지원합니다.

사용 방법
1. Server Component에서 정의
javascript
// app/actions.js
'use server'

export async function createTodo(formData) {
  const title = formData.get('title')
  
  // 데이터베이스 작업
  await db.todo.create({
    data: { title }
  })
}
2. 폼에서 사용
javascript
// app/page.js
import { createTodo } from './actions'

export default function Page() {
  return (
    <form action={createTodo}>
      <input name="title" type="text" />
      <button type="submit">추가</button>
    </form>
  )
}
3. Client Component에서 사용
javascript
'use client'

import { createTodo } from './actions'

export default function TodoForm() {
  async function handleSubmit(formData) {
    await createTodo(formData)
    // 추가 클라이언트 측 로직
  }

  return (
    <form action={handleSubmit}>
      <input name="title" type="text" />
      <button type="submit">추가</button>
    </form>
  )
}
주요 사용 사례
폼 제출 처리
데이터 변경 (생성, 수정, 삭제)
서버 측 유효성 검사
데이터베이스 직접 접근
외부 API 호출
장점
API 라우트 보일러플레이트 감소
타입 안정성 (TypeScript 사용 시)
자동 재검증 및 캐시 업데이트
더 나은 DX(개발자 경험)
Server Action을 사용하면 Next.js 앱에서 서버-클라이언트 간 데이터 흐름을 더 간결하고 안전하게 관리할 수 있습니다.

Next.js 프로젝트에서 api 데이터를 가져오는 로직을 구현할 때 실무 금융권 에서는 API Routes와 Server Actions 그리고 react-query 과 같이 3가지 방식중에 어떻게 좋을까?

실무 금융권에서 API 데이터를 가져오는 로직 구현 시, 각 방식의 장단점과 실제 사용 패턴을 말씀드리겠습니다.

금융권에서의 일반적인 접근 방식
실무에서는 혼합 방식을 많이 사용합니다. 각 방식의 특성에 따라 적재적소에 활용하는 것이 일반적입니다.

1. Server Actions (서버 컴포넌트에서 직접 fetch)
typescript
// app/dashboard/page.tsx
async function getAccountData() {
  const res = await fetch('https://api.bank.com/accounts', {
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
    cache: 'no-store' // 금융 데이터는 실시간성 중요
  })
  return res.json()
}

export default async function Dashboard() {
  const data = await getAccountData()
  return <AccountList data={data} />
}
금융권에서의 장점:

API 키가 서버에서만 관리됨 (보안 강화)
초기 로딩이 빠름 (SSR)
코드가 간결함
단점:

실시간 업데이트 어려움
클라이언트 측 인터랙션 제한적
복잡한 에러 처리 구현 필요
2. API Routes + React Query
typescript
// app/api/accounts/route.ts
export async function GET() {
  try {
    const res = await fetch('https://api.bank.com/accounts', {
      headers: { 
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'X-Request-ID': generateRequestId() // 추적용
      }
    })
    
    // 로깅, 모니터링
    await logApiCall('accounts', res.status)
    
    return Response.json(await res.json())
  } catch (error) {
    // 에러 처리 및 로깅
    await logError(error)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
typescript
// app/dashboard/AccountList.tsx
'use client'

import { useQuery } from '@tanstack/react-query'

export default function AccountList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await fetch('/api/accounts')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    staleTime: 30000, // 30초
    refetchInterval: 60000, // 1분마다 자동 갱신
    retry: 3,
    retryDelay: 1000
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorBoundary />
  
  return <div>{/* 계좌 목록 */}</div>
}
금융권에서의 장점:

캐싱, 재시도, 에러 처리가 강력함
실시간 업데이트 용이
낙관적 업데이트 지원
로깅 및 모니터링 중앙화
토큰 갱신, 인증 로직 통합 가능
단점:

코드량이 상대적으로 많음
API Routes 레이어 추가로 인한 지연
3. Server Actions (mutation용)
typescript
// app/actions/transfer.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function transferMoney(formData: FormData) {
  const amount = formData.get('amount')
  const to = formData.get('to')
  
  try {
    // 서버에서 직접 API 호출
    const res = await fetch('https://api.bank.com/transfer', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
      body: JSON.stringify({ amount, to })
    })
    
    if (!res.ok) {
      return { error: '이체 실패' }
    }
    
    // 캐시 무효화
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { error: '시스템 오류' }
  }
}
금융권 실무에서의 권장 조합
✅ 추천하는 패턴
typescript
// 1. 읽기(조회): API Routes + React Query
// - 실시간 업데이트가 중요한 잔액, 거래내역 등

// 2. 쓰기(변경): Server Actions
// - 이체, 계좌 개설 등의 민감한 작업

// 3. 초기 데이터: Server Components
// - 사용자 프로필, 설정 등 정적 데이터
구체적인 구현 예시
typescript
// app/api/balance/route.ts - 조회용
export async function GET(request: Request) {
  const session = await getSession()
  
  // 인증 확인
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // 감사 로그
  await auditLog({
    userId: session.userId,
    action: 'VIEW_BALANCE',
    timestamp: new Date()
  })
  
  const balance = await fetchBalance(session.userId)
  return Response.json(balance)
}
typescript
// app/components/Balance.tsx - React Query 사용
'use client'

export default function Balance() {
  const { data, isLoading } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await fetch('/api/balance')
      return res.json()
    },
    refetchInterval: 30000, // 30초마다 갱신
    staleTime: 10000
  })
  
  return <div>{data?.amount}</div>
}
typescript
// app/actions/transfer.ts - Server Action 사용
'use server'

export async function transfer(amount: number, to: string) {
  const session = await getSession()
  
  // 서버에서 모든 검증
  if (amount > MAX_TRANSFER_LIMIT) {
    return { error: '이체 한도 초과' }
  }
  
  // 2차 인증 확인
  const verified = await verify2FA(session.userId)
  if (!verified) {
    return { error: '인증 실패' }
  }
  
  // 트랜잭션 처리
  const result = await processTransfer(session.userId, amount, to)
  
  // 감사 로그
  await auditLog({
    userId: session.userId,
    action: 'TRANSFER',
    amount,
    to,
    result: result.success
  })
  
  return result
}
금융권에서 중요한 고려사항
보안: API 키는 절대 클라이언트에 노출 안 됨
감사 로그: 모든 금융 거래는 추적 가능해야 함
에러 처리: 명확한 에러 메시지와 재시도 로직
실시간성: 잔액, 거래내역은 최신 데이터 유지
트랜잭션: 원자성 보장
결론
금융권 실무에서는 API Routes + React Query 조합이 가장 선호됩니다. 이유는:

중앙화된 에러 처리 및 로깅
강력한 캐싱 전략
실시간 데이터 동기화
감사 추적 용이
토큰 갱신 등 인증 로직 통합
다만 Server Actions는 폼 제출, 이체 등 민감한 mutation 작업에 보조적으로 활용하는 것이 효과적입니다.
```










## Server Actions, API Routes, react-query
---

### 1. Server Actions.
* AI 질문 공유내용: [https://claude.ai/share/1724c350-2e42-4462-ab20-4734029e9bc4](https://claude.ai/share/1724c350-2e42-4462-ab20-4734029e9bc4)



### 2. API Routes




### 3. react-query (TanStack Query)