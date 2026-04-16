---
sidebar_position: 1
displayed_sidebar: "assetsDocSidebar"
title: "call api ai 복사"
---

# Next.js callAPI 전략

* callAPI - Server Component
* useAPI - Client Component (조회)
* useAPIMutation - Client Component (변경)
* submitAPI - Form/Server Actions

```ts
// types/api.ts
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiOptions<TData = unknown> {
  endpoint: string;
  method?: ApiMethod;
  params?: Record<string, any>;
  body?: any;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
}

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: {
    message: string;
    status?: number;
    details?: any;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// lib/api/callAPI.ts
import { createQueryKey } from '@/utils/queryKeyFactory';

/**
 * 🎯 통합 API 호출 함수
 * 
 * 모든 상황에 맞는 최적의 데이터 페칭 방법을 자동으로 선택
 * - Server Component: 직접 fetch (캐싱 최적화)
 * - Client Component: React Query 사용
 * - Form: Server Actions
 * - 동적 인터랙션: Client fetch
 */

// ============================================
// 1. Server Component용 API 호출
// ============================================
export async function callAPI<T = unknown>(
  options: ApiOptions<T>
): Promise<T> {
  const { endpoint, method = 'GET', params, body, cache, revalidate, tags } = options;

  // URL 생성
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
  
  // Query params 추가
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Fetch 옵션 구성
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(cache && { cache }),
    ...(revalidate !== undefined && { next: { revalidate } }),
    ...(tags && { next: { tags } }),
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`, {
      cause: {
        status: response.status,
        statusText: response.statusText,
      },
    });
  }

  return response.json();
}

// ============================================
// 2. Client Component용 React Query 훅
// ============================================
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * Client Component에서 GET 요청
 */
export function useAPI<T = unknown>(
  options: ApiOptions<T> & {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  const { endpoint, params, enabled = true, staleTime, gcTime } = options;

  return useQuery({
    queryKey: createQueryKey(endpoint, params),
    queryFn: async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    },
    enabled,
    staleTime,
    gcTime,
  });
}


// ============================================
// 2. Client Component용 React Query 훅(axios)
// ============================================
import axios from 'axios';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * Client Component에서 GET 요청 (axios)
 */
export function useAPI<T = unknown>(
  options: ApiOptions<T> & {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  const { endpoint, params, enabled = true, staleTime, gcTime } = options;

  return useQuery({
    queryKey: createQueryKey(endpoint, params),
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

      const response = await axios.get<T>(url, {
        params,
      });

      return response.data;
    },
    enabled,
    staleTime,
    gcTime,
  });
}



/**
 * Client Component에서 POST/PUT/DELETE 요청(axios + react-query)
 */
export function useAPIMutation<TData = unknown, TVariables = unknown>(
  options: ApiOptions & {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateKeys?: string[];
  }
) {
  const queryClient = useQueryClient();
  const { endpoint, method = 'POST', invalidateKeys, onSuccess, onError } = options;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
      let res;

      if (method === 'GET') {
        res = await axios.get<TData>(url, { params: variables });
      } else {
        res = await axios.request<TData>({
          url,
          method,
          data: variables,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      return res.data;
    },
    onSuccess: (data) => {
      // 자동으로 관련 쿼리 무효화
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
      onSuccess?.(data);
    },
    onError,
  });
}






// ============================================
// 3. Server Actions (Form 제출용)
// ============================================
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Form 제출이나 데이터 변경을 위한 Server Action
 */
export async function submitAPI<T = unknown>(
  options: ApiOptions<T> & {
    revalidatePaths?: string[];
    revalidateTags?: string[];
  }
): Promise<ApiResult<T>> {
  const { endpoint, method = 'POST', body, revalidatePaths, revalidateTags } = options;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        error: {
          message: 'API 요청에 실패했습니다',
          status: response.status,
        },
      };
    }

    const data = await response.json();

    // 캐시 재검증
    if (revalidatePaths) {
      revalidatePaths.forEach((path) => revalidatePath(path));
    }
    if (revalidateTags) {
      revalidateTags.forEach((tag) => revalidateTag(tag));
    }

    return { data };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
      },
    };
  }
}

// ============================================
// 사용 예시
// ============================================

// ✅ 1. Server Component - 초기 데이터 로딩
// app/users/page.tsx
async function UsersPage() {
  // 자동 캐싱, ISR
  const users = await callAPI<User[]>({
    endpoint: 'users',
    params: { status: 'active' },
    revalidate: 60, // 60초마다 재검증
  });

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// ✅ 2. Client Component - 동적 데이터 & 인터랙션
// components/UsersList.tsx
'use client';

function UsersList() {
  // React Query 자동 사용, 캐싱, 리페칭
  const { data: users, isLoading, refetch } = useAPI<User[]>({
    endpoint: 'users',
    params: { status: 'active' },
    staleTime: 5 * 60 * 1000, // 5분
  });

  const deleteMutation = useAPIMutation({
    endpoint: 'users',
    method: 'DELETE',
    invalidateKeys: ['users'], // 자동으로 users 쿼리 무효화
    onSuccess: () => {
      alert('삭제 완료!');
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => refetch()}>새로고침</button>
      {users?.map((user) => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => deleteMutation.mutate(user.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

// ✅ 3. Form 제출 - Server Actions
// app/users/new/page.tsx
'use client';

function CreateUserForm() {
  async function handleSubmit(formData: FormData) {
    const result = await submitAPI({
      endpoint: 'users',
      method: 'POST',
      body: {
        name: formData.get('name'),
        email: formData.get('email'),
      },
      revalidatePaths: ['/users'], // /users 페이지 자동 재검증
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      alert('생성 완료!');
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">생성</button>
    </form>
  );
}

// ✅ 4. 버튼 클릭 시 데이터 페칭
// components/LoadMoreButton.tsx
'use client';

function LoadMoreButton() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAPI<Post[]>({
    endpoint: 'posts',
    params: { page, limit: 10 },
  });

  return (
    <div>
      {data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button 
        onClick={() => setPage(p => p + 1)}
        disabled={isLoading}
      >
        더보기
      </button>
    </div>
  );
}

// ✅ 5. 조건부 데이터 페칭
// components/ConditionalData.tsx
'use client';

function ConditionalData({ userId }: { userId?: string }) {
  const { data } = useAPI<User>({
    endpoint: `users/${userId}`,
    enabled: !!userId, // userId가 있을 때만 실행
  });

  if (!userId) return <div>사용자를 선택하세요</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}

// ============================================
// 🎯 핵심 장점
// ============================================
/*
1. ✅ 하나의 함수로 모든 상황 처리
   - callAPI: Server Component
   - useAPI: Client Component 조회
   - useAPIMutation: Client Component 변경
   - submitAPI: Form & Server Actions

2. ✅ 자동 최적화
   - Server: 자동 캐싱, ISR, 태그 기반 재검증
   - Client: React Query 캐싱, 리페칭, 낙관적 업데이트

3. ✅ 타입 안전성
   - 제네릭으로 응답 타입 자동 추론
   - Zod 스키마와 결합 가능

4. ✅ 일관된 API
   - 모든 곳에서 동일한 인터페이스
   - endpoint, params, body만 전달

5. ✅ 자동 queryKey 생성
   - createQueryKey로 일관된 캐시 키
   - Invalidation 간편

6. ✅ 에러 처리 통일
   - 모든 함수에서 동일한 에러 형식
*/
```