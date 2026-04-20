---
sidebar_position: 1
displayed_sidebar: "documentDocSidebar"
title: "Server Actions"
---

# Next.js Server Actions


## Server Actions란?
---
**Server Actions**는 **Next.js 13.4**에서 도입된 기능으로, **서버에서만** 실행되는 **비동기 함수**입니다.



## 실무에서 Server Actions 활용 전략
---
```ls
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Browser   │ ───▶ │   Next.js    │ ───▶ │ Spring Boot │
│  (Client)   │      │    (BFF)     │      │ API Server  │
└─────────────┘      └──────────────┘      └─────────────┘
                     Server Actions
                     - 토큰 관리
                     - 세션 검증
                     - 로깅/감사
                     - 에러 처리
```

:::tip BFF란?
* BFF는 **Backend For Frontend**의 약자로, 프론트엔드를 위한 전용 백엔드 서버를 의미합니다.
* 전통적인 아키텍처
  ```ls
  [Mobile App] ─────┐
                    ├──→ [Backend API]
  [Web App] ────────┘
  ```
  - 문제점
    - 모바일과 웹의 요구사항이 다름
    - 하나의 API로 모든 클라이언트를 만족시키기 어려움
    - 불필요한 데이터 전송 (오버페칭)
    - 여러 API를 호출해야 하는 경우 복잡도 증가
* BFF 아키텍처
  ```ls
  [Mobile App] ──→ [Mobile BFF] ─────┐
                                     ├──→ [Backend Services]
  [Web App] ────→ [Web BFF] ─────────┘
  ```
  - 각 클라이언트를 위한 맞춤형 API 제공
  - 프론트엔드 팀이 직접 관리 가능
* **BFF의 장점**
  - ✅ Server Component, Server Actions사용 (서버에서 데이터 페칭, 폼 제출 가능)
  - ✅ 프론트엔드 팀의 자율성: 백엔드 팀을 기다리지 않고 필요한 API 구성 가능
  - ✅ 보안 강화: API 키, 토큰 등을 서버에서만 관리
  - ✅ 성능 최적화: 불필요한 데이터 제거, 서버 사이드 캐싱
  - ✅ API 버전 관리: 백엔드 API 변경 시 BFF에서 호환성 유지
  - ✅ 네트워크 최적화: 여러 API 호출을 하나로 통합
* **BFF의 단점**
  - ❌ 추가 레이어: 시스템 복잡도 증가
  - ❌ 유지보수 부담: BFF도 관리해야 할 서버
  - ❌ 중복 코드: 여러 BFF 간 로직 중복 가능성
:::


# AI

금융권 실무에서 Next.js + Spring Boot 구조에서 Server Actions를 효과적으로 활용하는 방법을 알려드리겠습니다! 🏦

# 금융권에서 Server Actions 활용 전략

## 🏗️ 아키텍처 개요

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Browser   │ ───▶ │   Next.js    │ ───▶ │ Spring Boot │
│  (Client)   │      │    (BFF)     │      │ API Server  │
└─────────────┘      └──────────────┘      └─────────────┘
                     Server Actions
                     - 토큰 관리
                     - 세션 검증
                     - 로깅/감사
                     - 에러 처리
```

## 🎯 1. Server Actions를 BFF 계층으로 활용

Server Actions는 **Next.js와 Spring Boot 사이의 중간 계층(BFF)**으로 활용합니다.

### 핵심 레이어 구조

```typescript
// ============================================
// 📁 프로젝트 구조
// ============================================
src/
├── actions/              # Server Actions (BFF)
│   ├── accounts.ts       # 계좌 관련
│   ├── transfers.ts      # 이체 관련
│   ├── auth.ts          # 인증 관련
│   └── loans.ts         # 대출 관련
├── lib/
│   ├── api-client.ts    # Spring Boot API 호출 클라이언트
│   ├── auth.ts          # 인증 유틸
│   ├── encryption.ts    # 암호화
│   └── audit-log.ts     # 감사 로그
└── app/
    ├── (auth)/
    └── (banking)/
```

---

## 💡 2. 실전 구현 패턴

### 패턴 1: API Client 레이어 (Spring Boot 호출)

```typescript
// lib/api-client.ts
import { cookies } from 'next/headers';

interface ApiClientConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

class SpringBootApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';
  }

  /**
   * Spring Boot API 호출
   */
  async call<T>(
    endpoint: string,
    config: ApiClientConfig = {}
  ): Promise<T> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const sessionId = cookieStore.get('session_id')?.value;

    // 헤더 구성
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Client-Type': 'WEB',
      'X-Request-ID': this.generateRequestId(),
      ...config.headers,
    };

    // 토큰 추가 (클라이언트에 노출되지 않음!)
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: config.method || 'GET',
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
        cache: 'no-store', // 금융 데이터는 캐시 안함
      });

      // 응답 로깅 (감사 추적)
      await this.logRequest({
        endpoint,
        method: config.method || 'GET',
        status: response.status,
        requestId: headers['X-Request-ID'],
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return await response.json();
    } catch (error) {
      // 에러 로깅
      await this.logError(endpoint, error);
      throw error;
    }
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async handleError(response: Response) {
    const error = await response.json();
    
    return {
      status: response.status,
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || '오류가 발생했습니다',
      details: error.details,
    };
  }

  private async logRequest(data: any) {
    // 감사 로그 기록 (DB 또는 로깅 시스템)
    console.log('[API Request]', data);
  }

  private async logError(endpoint: string, error: any) {
    console.error('[API Error]', { endpoint, error });
  }
}

export const springApi = new SpringBootApiClient();
```

---

### 패턴 2: Server Actions로 래핑

```typescript
// actions/transfers.ts
'use server';

import { springApi } from '@/lib/api-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { encrypt } from '@/lib/encryption';
import { auditLog } from '@/lib/audit-log';

// ============================================
// 타입 정의
// ============================================

const transferSchema = z.object({
  fromAccountId: z.string().min(1, '출금 계좌를 선택하세요'),
  toAccountId: z.string().min(1, '입금 계좌를 선택하세요'),
  amount: z.number().min(1, '금액을 입력하세요').max(10000000),
  password: z.string().min(4, '비밀번호를 입력하세요'),
  memo: z.string().optional(),
});

type TransferInput = z.infer<typeof transferSchema>;

// ============================================
// Server Action: 계좌 이체
// ============================================

export async function transferMoney(formData: FormData) {
  try {
    // 1️⃣ 데이터 추출 및 검증
    const rawData = {
      fromAccountId: formData.get('fromAccountId') as string,
      toAccountId: formData.get('toAccountId') as string,
      amount: Number(formData.get('amount')),
      password: formData.get('password') as string,
      memo: formData.get('memo') as string,
    };

    const validation = transferSchema.safeParse(rawData);

    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const data = validation.data;

    // 2️⃣ 비밀번호 암호화 (Spring Boot로 전송 전)
    const encryptedPassword = await encrypt(data.password);

    // 3️⃣ 감사 로그 시작
    const auditId = await auditLog.start({
      action: 'TRANSFER',
      userId: 'current-user-id', // 실제로는 세션에서 가져옴
      details: {
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        amount: data.amount,
      },
    });

    // 4️⃣ Spring Boot API 호출
    const response = await springApi.call<{
      transactionId: string;
      status: string;
      balance: number;
    }>('/api/v1/transfers', {
      method: 'POST',
      body: {
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        amount: data.amount,
        password: encryptedPassword, // 암호화된 비밀번호
        memo: data.memo,
        requestTime: new Date().toISOString(),
      },
    });

    // 5️⃣ 감사 로그 완료
    await auditLog.complete(auditId, {
      success: true,
      transactionId: response.transactionId,
    });

    // 6️⃣ 캐시 무효화 (계좌 잔액 등)
    revalidatePath('/accounts');
    revalidatePath('/transactions');

    // 7️⃣ 성공 응답
    return {
      success: true,
      data: {
        transactionId: response.transactionId,
        message: '이체가 완료되었습니다',
      },
    };

  } catch (error: any) {
    // 8️⃣ 에러 처리
    await auditLog.fail(auditId, {
      error: error.message,
    });

    return {
      success: false,
      error: error.message || '이체에 실패했습니다',
      code: error.code,
    };
  }
}

// ============================================
// Server Action: 이체 가능 여부 확인
// ============================================

export async function checkTransferAvailability(
  accountId: string,
  amount: number
) {
  try {
    const response = await springApi.call<{
      available: boolean;
      dailyLimit: number;
      remainingLimit: number;
    }>(`/api/v1/accounts/${accountId}/transfer-check`, {
      method: 'POST',
      body: { amount },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============================================
// Server Action: 이체 내역 조회
// ============================================

export async function getTransferHistory(accountId: string) {
  try {
    const response = await springApi.call<{
      transactions: Array<{
        id: string;
        type: string;
        amount: number;
        date: string;
        description: string;
      }>;
    }>(`/api/v1/accounts/${accountId}/transactions`, {
      method: 'GET',
    });

    return {
      success: true,
      data: response.transactions,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

---

### 패턴 3: 클라이언트 컴포넌트에서 사용

```typescript
// components/TransferForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { transferMoney, checkTransferAvailability } from '@/actions/transfers';
import { useState, useTransition } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-300"
    >
      {pending ? '처리 중...' : '이체하기'}
    </button>
  );
}

export function TransferForm({ accounts }) {
  const [state, formAction] = useFormState(transferMoney, {
    success: false,
    errors: {},
  });
  
  const [isPending, startTransition] = useTransition();
  const [availabilityCheck, setAvailabilityCheck] = useState(null);

  // 실시간 이체 가능 여부 확인
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    const accountId = (document.getElementById('fromAccountId') as HTMLSelectElement)?.value;
    
    if (amount > 0 && accountId) {
      startTransition(async () => {
        const result = await checkTransferAvailability(accountId, amount);
        setAvailabilityCheck(result.data);
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">계좌 이체</h2>
      
      {state.success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          ✅ {state.data?.message}
          <br />
          <small>거래번호: {state.data?.transactionId}</small>
        </div>
      )}
      
      {state.error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          ❌ {state.error}
        </div>
      )}
      
      <form action={formAction} className="space-y-4">
        {/* 출금 계좌 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            출금 계좌
          </label>
          <select
            id="fromAccountId"
            name="fromAccountId"
            className="w-full border rounded p-2"
            required
          >
            <option value="">선택하세요</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.accountNumber} ({acc.balance.toLocaleString()}원)
              </option>
            ))}
          </select>
          {state.errors?.fromAccountId && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.fromAccountId[0]}
            </p>
          )}
        </div>

        {/* 입금 계좌 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            입금 계좌번호
          </label>
          <input
            name="toAccountId"
            placeholder="123-456-789012"
            className="w-full border rounded p-2"
            required
          />
          {state.errors?.toAccountId && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.toAccountId[0]}
            </p>
          )}
        </div>

        {/* 금액 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            이체 금액
          </label>
          <input
            name="amount"
            type="number"
            placeholder="0"
            className="w-full border rounded p-2"
            onChange={handleAmountChange}
            required
          />
          {state.errors?.amount && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.amount[0]}
            </p>
          )}
          
          {/* 실시간 이체 가능 여부 */}
          {availabilityCheck && (
            <div className="mt-2 text-sm">
              {availabilityCheck.available ? (
                <p className="text-green-600">
                  ✅ 이체 가능 (일일한도: {availabilityCheck.remainingLimit.toLocaleString()}원 남음)
                </p>
              ) : (
                <p className="text-red-600">
                  ❌ 일일 이체 한도 초과
                </p>
              )}
            </div>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            계좌 비밀번호
          </label>
          <input
            name="password"
            type="password"
            maxLength={4}
            placeholder="4자리"
            className="w-full border rounded p-2"
            required
          />
          {state.errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* 메모 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            메모 (선택)
          </label>
          <input
            name="memo"
            placeholder="용돈"
            className="w-full border rounded p-2"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
```

---

## 🔒 3. 금융권 필수 기능 구현

### A. 인증/세션 관리

```typescript
// lib/auth.ts
import { cookies } from 'next/headers';
import { springApi } from './api-client';

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) {
    return null;
  }
  
  try {
    // Spring Boot에 세션 검증
    const response = await springApi.call<{
      userId: string;
      userName: string;
      roles: string[];
    }>('/api/v1/auth/validate-session', {
      method: 'POST',
      body: { sessionId },
    });
    
    return response;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}
```

### B. 감사 로그

```typescript
// lib/audit-log.ts
import { springApi } from './api-client';

export const auditLog = {
  async start(data: {
    action: string;
    userId: string;
    details: any;
  }) {
    const response = await springApi.call<{ auditId: string }>(
      '/api/v1/audit/start',
      {
        method: 'POST',
        body: {
          ...data,
          timestamp: new Date().toISOString(),
          ip: await this.getClientIP(),
          userAgent: await this.getUserAgent(),
        },
      }
    );
    
    return response.auditId;
  },

  async complete(auditId: string, result: any) {
    await springApi.call('/api/v1/audit/complete', {
      method: 'POST',
      body: {
        auditId,
        result,
        completedAt: new Date().toISOString(),
      },
    });
  },

  async fail(auditId: string, error: any) {
    await springApi.call('/api/v1/audit/fail', {
      method: 'POST',
      body: {
        auditId,
        error,
        failedAt: new Date().toISOString(),
      },
    });
  },

  async getClientIP() {
    // Next.js에서 클라이언트 IP 추출
    return '127.0.0.1'; // 실제 구현 필요
  },

  async getUserAgent() {
    return 'NextJS/14.0.0'; // 실제 구현 필요
  },
};
```

### C. 암호화/복호화

```typescript
// lib/encryption.ts
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex'); // 32바이트

export async function encrypt(text: string): Promise<string> {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // IV + AuthTag + Encrypted 조합
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export async function decrypt(encryptedText: string): Promise<string> {
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
  
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

---

## 🎯 4. 실전 사용 케이스

### 케이스 1: 계좌 조회 (GET)

```typescript
// actions/accounts.ts
'use server';

import { springApi } from '@/lib/api-client';
import { requireAuth } from '@/lib/auth';

export async function getAccountList() {
  // 인증 확인
  const session = await requireAuth();
  
  try {
    const response = await springApi.call<{
      accounts: Array<{
        id: string;
        accountNumber: string;
        accountName: string;
        balance: number;
        type: string;
      }>;
    }>(`/api/v1/users/${session.userId}/accounts`, {
      method: 'GET',
    });
    
    return {
      success: true,
      data: response.accounts,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAccountDetail(accountId: string) {
  const session = await requireAuth();
  
  try {
    const response = await springApi.call(`/api/v1/accounts/${accountId}`, {
      method: 'GET',
    });
    
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

### 케이스 2: 대출 신청 (POST)

```typescript
// actions/loans.ts
'use server';

import { springApi } from '@/lib/api-client';
import { requireAuth } from '@/lib/auth';
import { auditLog } from '@/lib/audit-log';
import { z } from 'zod';

const loanApplicationSchema = z.object({
  amount: z.number().min(1000000).max(100000000),
  period: z.number().min(12).max(360),
  purpose: z.string().min(10),
  employmentType: z.enum(['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED']),
  annualIncome: z.number().min(0),
});

export async function applyForLoan(formData: FormData) {
  const session = await requireAuth();
  
  try {
    // 1. 데이터 검증
    const validation = loanApplicationSchema.safeParse({
      amount: Number(formData.get('amount')),
      period: Number(formData.get('period')),
      purpose: formData.get('purpose') as string,
      employmentType: formData.get('employmentType') as string,
      annualIncome: Number(formData.get('annualIncome')),
    });
    
    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }
    
    // 2. 감사 로그 시작
    const auditId = await auditLog.start({
      action: 'LOAN_APPLICATION',
      userId: session.userId,
      details: validation.data,
    });
    
    // 3. Spring Boot API 호출
    const response = await springApi.call<{
      applicationId: string;
      status: 'PENDING' | 'APPROVED' | 'REJECTED';
      estimatedRate: number;
    }>('/api/v1/loans/apply', {
      method: 'POST',
      body: {
        ...validation.data,
        userId: session.userId,
        applicationDate: new Date().toISOString(),
      },
    });
    
    // 4. 감사 로그 완료
    await auditLog.complete(auditId, {
      applicationId: response.applicationId,
      status: response.status,
    });
    
    return {
      success: true,
      data: response,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

### 케이스 3: 계좌 생성 (POST)

```typescript
// actions/accounts.ts
'use server';

export async function createAccount(formData: FormData) {
  const session = await requireAuth();
  
  try {
    const accountType = formData.get('accountType') as string;
    const accountName = formData.get('accountName') as string;
    const initialDeposit = Number(formData.get('initialDeposit'));
    
    // 감사 로그
    const auditId = await auditLog.start({
      action: 'CREATE_ACCOUNT',
      userId: session.userId,
      details: { accountType, accountName, initialDeposit },
    });
    
    // Spring Boot API 호출
    const response = await springApi.call<{
      accountId: string;
      accountNumber: string;
    }>('/api/v1/accounts', {
      method: 'POST',
      body: {
        userId: session.userId,
        accountType,
        accountName,
        initialDeposit,
      },
    });
    
    await auditLog.complete(auditId, response);
    
    revalidatePath('/accounts');
    
    return {
      success: true,
      data: response,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

---

## ✅ 5. 금융권에서 Server Actions를 사용해야 하는 이유

| 이유 | 설명 |
|------|------|
| 🔒 **보안** | Access Token이 클라이언트에 노출되지 않음 |
| 📝 **감사 추적** | 모든 요청을 서버에서 로깅 가능 |
| 🔐 **암호화** | 민감 정보를 서버에서 암호화 후 전송 |
| ⚡ **캐시 관리** | revalidatePath로 실시간 데이터 동기화 |
| 🎯 **에러 처리** | 중앙화된 에러 처리 및 사용자 친화적 메시지 |
| 📊 **모니터링** | 서버에서 성능 및 비즈니스 메트릭 수집 |

---

## 🚀 6. 환경 변수 설정

```bash
# .env.local

# Spring Boot API
SPRING_BOOT_API_URL=http://localhost:8080

# 암호화 키 (32바이트 hex)
ENCRYPTION_KEY=your-32-byte-hex-key-here

# 세션 설정
SESSION_SECRET=your-session-secret

# 로깅
LOG_LEVEL=info
AUDIT_LOG_ENABLED=true
```

---

## 📊 7. 최종 정리

```typescript
// ✅ 금융권에서 이렇게 사용하세요!

// 1. 조회 (GET) - Server Component 또는 Server Action
const accounts = await getAccountList();

// 2. 변경 (POST/PUT/DELETE) - Server Action
<form action={transferMoney}>
  {/* Form fields */}
</form>

// 3. 실시간 검증 - useTransition + Server Action
startTransition(async () => {
  const result = await checkTransferAvailability(accountId, amount);
});

// 4. 복잡한 UI - React Query + Route Handler (필요시)
const { data } = useQuery({
  queryKey: ['transactions'],
  queryFn: () => fetch('/api/transactions').then(r => r.json())
});
```

이 구조를 사용하면 **Next.js는 BFF 역할**을 하고, **실제 비즈니스 로직은 Spring Boot**에서 처리하면서도, **보안과 사용자 경험을 모두 챙길 수 있습니다**! 🎯



좋은 질문입니다! Server Actions의 사용 범위에 대해 명확히 정리해드리겠습니다. 🎯

# Server Actions 사용 범위 명확히 구분하기

## 📊 상황별 사용 여부

### ✅ Server Actions를 사용하는 경우

| 상황 | 사용 여부 | 방법 | 비고 |
|------|---------|------|------|
| **Form 제출** | ✅ 주력 용도 | `<form action={serverAction}>` | 가장 이상적 |
| **버튼 클릭 시 DELETE/UPDATE** | ✅ 권장 | `useTransition` + Server Action | 권장 패턴 |
| **이벤트 핸들러에서 Mutation** | ✅ 가능 | `startTransition(() => serverAction())` | 가능 |
| **Server Component 초기 데이터** | ⚠️ 가능하지만 비권장 | `await serverAction()` | 직접 fetch 권장 |

---

## 1️⃣ Server Component 초기 데이터 조회

### ❌ Server Actions 사용 (가능하지만 권장하지 않음)

```typescript
// actions/users.ts
'use server';

export async function getUsers() {
  const response = await fetch('http://localhost:8080/api/users');
  return response.json();
}

// app/users/page.tsx
import { getUsers } from '@/actions/users';

export default async function UsersPage() {
  // ⚠️ 가능하지만 권장하지 않음
  const users = await getUsers();
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**왜 권장하지 않나요?**
- Server Actions는 **"변경(Mutation)"** 을 위해 설계됨
- 초기 데이터 로드는 **캐싱 전략**이 중요한데, Server Actions는 기본적으로 캐시하지 않음
- `revalidatePath/revalidateTag` 같은 기능도 조회에는 불필요

---

### ✅ 직접 fetch 사용 (권장)

```typescript
// app/users/page.tsx

export default async function UsersPage() {
  // ✅ 권장: 직접 fetch로 캐싱 제어
  const users = await fetch('http://localhost:8080/api/users', {
    cache: 'force-cache',       // SSG: 빌드 타임에 캐시
    // next: { revalidate: 60 }, // ISR: 60초마다 재검증
    // cache: 'no-store',        // SSR: 매번 새로 가져옴
  }).then(r => r.json());
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

---

### ✅ API Client 함수로 래핑 (더 나은 방법)

```typescript
// lib/api/users.ts
import { springApi } from '@/lib/api-client';

// 일반 함수 (Server Action 아님)
export async function fetchUsers() {
  return springApi.call<User[]>('/api/v1/users', {
    method: 'GET',
  });
}

// app/users/page.tsx
import { fetchUsers } from '@/lib/api/users';

export default async function UsersPage() {
  // ✅ 더 나은 방법: API Client 함수 사용
  const users = await fetchUsers();
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

---

## 2️⃣ 버튼 클릭으로 DELETE/UPDATE

### ✅ Server Actions 사용 (권장!)

```typescript
// actions/users.ts
'use server';

import { revalidatePath } from 'next/cache';
import { springApi } from '@/lib/api-client';

export async function deleteUser(userId: string) {
  try {
    await springApi.call(`/api/v1/users/${userId}`, {
      method: 'DELETE',
    });
    
    // 캐시 무효화
    revalidatePath('/users');
    
    return { success: true, message: '삭제되었습니다' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUserStatus(userId: string, status: string) {
  try {
    await springApi.call(`/api/v1/users/${userId}/status`, {
      method: 'PATCH',
      body: { status },
    });
    
    revalidatePath('/users');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

---

### ✅ Client Component에서 사용

```typescript
// components/UserList.tsx
'use client';

import { deleteUser, updateUserStatus } from '@/actions/users';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function UserList({ users }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // ✅ 패턴 1: useTransition 사용
  const handleDelete = (userId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    startTransition(async () => {
      const result = await deleteUser(userId);
      
      if (result.success) {
        alert(result.message);
        // router.refresh(); // 필요시 수동 새로고침
      } else {
        alert(result.error);
      }
    });
  };

  // ✅ 패턴 2: 상태 변경
  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    
    startTransition(async () => {
      await updateUserStatus(userId, newStatus);
    });
  };

  return (
    <div className="space-y-2">
      {users.map(user => (
        <div key={user.id} className="flex items-center gap-4 p-4 border rounded">
          <div className="flex-1">
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          
          <div className="flex gap-2">
            {/* 상태 토글 버튼 */}
            <button
              onClick={() => handleStatusToggle(user.id, user.status)}
              disabled={isPending}
              className={`px-3 py-1 rounded ${
                user.status === 'ACTIVE' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300'
              }`}
            >
              {user.status}
            </button>
            
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDelete(user.id)}
              disabled={isPending}
              className="px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-300"
            >
              {isPending ? '처리 중...' : '삭제'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 3️⃣ 금융권 실전 예제: 계좌 관리

```typescript
// ============================================
// Server Component: 초기 데이터 로드
// ============================================

// lib/api/accounts.ts
import { springApi } from '@/lib/api-client';

// 일반 함수 (Server Action 아님)
export async function fetchAccounts(userId: string) {
  return springApi.call<Account[]>(`/api/v1/users/${userId}/accounts`, {
    method: 'GET',
  });
}

// app/accounts/page.tsx
import { fetchAccounts } from '@/lib/api/accounts';
import { requireAuth } from '@/lib/auth';
import { AccountList } from '@/components/AccountList';

export default async function AccountsPage() {
  const session = await requireAuth();
  
  // ✅ 초기 데이터: 직접 fetch (또는 API Client 함수)
  const accounts = await fetchAccounts(session.userId);
  
  return (
    <div>
      <h1>내 계좌 목록</h1>
      <AccountList accounts={accounts} />
    </div>
  );
}
```

```typescript
// ============================================
// Server Actions: 변경 작업
// ============================================

// actions/accounts.ts
'use server';

import { springApi } from '@/lib/api-client';
import { requireAuth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function deleteAccount(accountId: string) {
  const session = await requireAuth();
  
  try {
    await springApi.call(`/api/v1/accounts/${accountId}`, {
      method: 'DELETE',
    });
    
    revalidatePath('/accounts');
    
    return { success: true, message: '계좌가 해지되었습니다' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleAccountAlert(accountId: string, enabled: boolean) {
  try {
    await springApi.call(`/api/v1/accounts/${accountId}/alert`, {
      method: 'PATCH',
      body: { enabled },
    });
    
    revalidatePath('/accounts');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAccountAlias(accountId: string, alias: string) {
  try {
    await springApi.call(`/api/v1/accounts/${accountId}/alias`, {
      method: 'PATCH',
      body: { alias },
    });
    
    revalidatePath('/accounts');
    
    return { success: true, message: '별칭이 변경되었습니다' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

```typescript
// ============================================
// Client Component: 버튼 클릭 처리
// ============================================

// components/AccountList.tsx
'use client';

import { deleteAccount, toggleAccountAlert } from '@/actions/accounts';
import { useTransition } from 'react';

export function AccountList({ accounts }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = (accountId: string, accountNumber: string) => {
    const confirmed = confirm(
      `${accountNumber} 계좌를 정말 해지하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
    );
    
    if (!confirmed) return;
    
    startTransition(async () => {
      const result = await deleteAccount(accountId);
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(`오류: ${result.error}`);
      }
    });
  };

  const handleToggleAlert = (accountId: string, currentEnabled: boolean) => {
    startTransition(async () => {
      await toggleAccountAlert(accountId, !currentEnabled);
    });
  };

  return (
    <div className="space-y-4">
      {accounts.map(account => (
        <div 
          key={account.id} 
          className="p-6 border rounded-lg bg-white shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{account.accountName}</h3>
              <p className="text-gray-600">{account.accountNumber}</p>
              <p className="text-2xl font-bold mt-2">
                {account.balance.toLocaleString()}원
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              {/* 알림 토글 */}
              <button
                onClick={() => handleToggleAlert(account.id, account.alertEnabled)}
                disabled={isPending}
                className={`px-4 py-2 rounded ${
                  account.alertEnabled 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                🔔 {account.alertEnabled ? '알림 ON' : '알림 OFF'}
              </button>
              
              {/* 계좌 해지 */}
              <button
                onClick={() => handleDeleteAccount(account.id, account.accountNumber)}
                disabled={isPending}
                className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
              >
                계좌 해지
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 4. 정리: 언제 무엇을 사용할까?

### A. 데이터 조회 (GET)

```typescript
// ✅ Server Component 초기 로드
export default async function Page() {
  // 직접 fetch 또는 API Client 함수
  const data = await fetchData();
  return <List data={data} />;
}

// ✅ Client Component 동적 조회
'use client';
function SearchResults() {
  // React Query 사용
  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
  });
}
```

### B. 데이터 변경 (POST/PUT/DELETE)

```typescript
// ✅ Form 제출
<form action={serverAction}>
  <button type="submit">제출</button>
</form>

// ✅ 버튼 클릭
<button onClick={() => {
  startTransition(async () => {
    await deleteItem(id);
  });
}}>
  삭제
</button>

// ✅ 이벤트 핸들러
const handleUpdate = async () => {
  const result = await updateItem(id, data);
  if (result.success) {
    // 성공 처리
  }
};
```

---

## 🎯 5. 최종 답변

### 질문 1: Server Component 초기 데이터 호출 시?

**❌ Server Actions 사용 가능하지만 권장하지 않음**
- 초기 데이터 로드는 **직접 fetch** 또는 **API Client 함수** 사용
- 캐싱 전략이 중요한 조회에는 적합하지 않음

```typescript
// ⚠️ 가능하지만 비권장
const data = await serverAction();

// ✅ 권장
const data = await fetch('...').then(r => r.json());
// 또는
const data = await fetchUsers(); // 일반 함수
```

### 질문 2: 버튼 클릭으로 DELETE 등?

**✅ Server Actions 사용 권장!**
- DELETE, UPDATE 등 **변경 작업**에 최적화
- `revalidatePath`로 자동 캐시 무효화
- 감사 로그, 권한 확인 등 서버 로직 실행

```typescript
// ✅ 이렇게 사용하세요
'use client';
<button onClick={() => {
  startTransition(async () => {
    await deleteUser(userId);
  });
}}>
  삭제
</button>
```

---

## 📋 요약 표

| 작업 | 사용 기술 | 이유 |
|------|----------|------|
| **Server Component 초기 조회** | 직접 fetch / API Client 함수 | 캐싱 제어 |
| **Form 제출** | Server Actions | 최적화됨 |
| **버튼 클릭 DELETE** | Server Actions ✅ | 권장 |
| **버튼 클릭 UPDATE** | Server Actions ✅ | 권장 |
| **Client 동적 조회** | React Query | 실시간 업데이트 |

이제 명확하게 이해되셨나요? 추가 질문 있으시면 말씀해주세요! 😊

