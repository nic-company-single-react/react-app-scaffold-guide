---
sidebar_position: 3
displayed_sidebar: 'assetsDocSidebar'
title: '코딩스타일'
---

# React 코딩 스타일


## <span class="text-blue-normal">*.tsx</span> 파일명
---
**컴포넌트, 페이지** 이름은 **PascalCase** 형식을 사용합니다.
:::danger 나쁨
```javascript
reservationCard.tsx
reservation-card.tsx
```
:::
:::info 좋음
```javascript
// PascalCase 사용
ReservationCard.tsx
```
:::






## 참조 이름 명
---
**컴포넌트**의 참조명은 **PascalCase** 형식을 사용합니다.  
**변수명, 인스턴스명**은 **camelCase**를 사용합니다.
:::danger 나쁨
```javascript
import reservationCard from './ReservationCard';
const ReservationItem = <ReservationCard />;
```
:::
:::info 좋음
```javascript
// PascalCase 사용(컴포넌트)
import ReservationCard from './ReservationCard';
// camelCase 사용(인스턴스)
const reservationItem = <ReservationCard />;
```
:::






## 디렉토리 루트 요소 이름 지정
---
디렉토리 루트 파일은 `index.tsx`로 지정하고 참조명은 해당 디렉토리명으로 지정합니다.
:::danger 나쁨
```javascript
import Footer from './Footer/Footer';
import Footer from './Footer/index';
```
:::
:::info 좋음
```javascript
import Footer from './Footer';
```
:::





## <span class="text-blue-normal">jsx구문</span>의 속성 정렬
---
다음과 같은 **ESLint**의 정렬 규칙을 따릅니다.
:::danger 나쁨
```jsx
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />
```
:::
:::info 좋음
```jsx
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>
```
:::





## <span class="text-blue-normal">Props</span> 이름
---
prop 이름은 항상 **camelCase**를 사용합니다.  
prop의 값이 컴포넌트명 일때는 **PascalCase**를 사용합니다.  
:::danger 나쁨
```jsx
<Foo
  UserName="hello"
  phone_number={12345678}
/>
```
:::
:::info 좋음
```jsx
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```
:::





## <span class="text-blue-normal">Refs</span> 할당
---
**ref**는 `useRef`를 사용하고, 특별한 요구사항이 있을 경우 **콜백 ref**를 사용합니다.
:::info <span class="admonition-title">useRef</span> 사용 예제
```jsx
const myRef = useRef(null);
<Foo ref={myRef} />
```
:::
:::info <span class="admonition-title">콜백 ref</span> 사용 예제
```jsx
const [node, setNode] = useState(null);
<Foo ref={(el) => setNode(el)}>Content</Foo>
```
* **콜백 ref**를 사용하는 경우
  - **동적으로 ref를 관리**할 때 (예: 리스트 아이템)
  - **ref가 설정되는 시점에 특정 로직을 실행**해야 할 때
  - **여러 요소를 배열로 관리**할 때
  - **ref가 null이 되는 시점을 감지**해야 할 때
:::





## <span class="text-blue-normal">jsx 엘리먼트</span> 괄호
---
**jsx 엘리먼트**가 두 줄 이상일 경우에는 괄호로 묶습니다.  
:::danger 나쁨
```jsx
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}
```
:::
:::info 좋음
```jsx
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}
```
:::










## <span class="text-blue-normal">Link</span> 컴포넌트 사용
---
**Link 컴포넌트**는 클라이언트 사이드 라우팅을 위해 사용합니다.  
* **Link 컴포넌트** 를 사용하는 이유
  * `<a>` 태그를 사용하면 페이지 이동 시 새로고침이 발생하지만, `<Link>` 컴포넌트를 사용하면 페이지 이동 시 새로고침이 발생하지 않습니다.
  * `<Link>` 컴포넌트는 뷰포트에 보이는 링크의 페이지를 자동으로 미리 로드(**prefetching**)합니다.
  * `<a>` 태그는 React 상태, 스크롤 위치 등을 모두 초기화하지만, `<Link>` 컴포넌트는 모두 유지된 상태에서 페이지만 전환합니다.
  * 하지만 외부 링크는 `<a>` 태그를 사용해야 합니다.

:::danger 나쁨
```jsx
// 느리고 상태가 날아감
<a href="/about">소개</a>
<a href="/blog">블로그</a>
<a href={`/products/${id}`}>상품 보기</a>
```
:::
:::info 좋음
```jsx
import Link from 'next/link';

// 내부 페이지 이동
<Link href="/about">소개</Link>
<Link href="/blog">블로그</Link>
<Link href={`/products/${id}`}>상품 보기</Link>
```
:::
:::info <span class="admonition-title">외부 링크</span> 사용 예제
```jsx
// 외부 사이트
<a href="https://google.com" target="_blank">구글</a>

// 이메일, 전화
<a href="mailto:hello@example.com">이메일</a>
<a href="tel:010-1234-5678">전화</a>

// 파일 다운로드
<a href="/file.pdf" download>다운로드</a>
```
:::