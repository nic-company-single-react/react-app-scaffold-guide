---
sidebar_position: 1
displayed_sidebar: 'componentsDocSidebar'
title: 'Accordion'
---

# Accordion
**Accordion** 컴포넌트는 **Client Component 전용** 컴포넌트입니다.  

**Accordion** 컴포넌트는 여러 개의 섹션으로 나누어진 콘텐츠 영역을 제공하며, 각 섹션은 제목을 클릭하여 내용을 확장하거나 축소할 수 있습니다. 이를 통해 사용자는 필요한 정보만을 선택적으로 확인할 수 있어 화면 공간을 효율적으로 활용할 수 있습니다.

**Accordion** 컴포넌트는 `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger` 이렇게 4가지 컴포넌트로 구성되어 있습니다.

이 네 가지를 조합하여 하나 이상의 섹션을 자유롭게 만들 수 있으며, 각 `AccordionItem`에는 `AccordionTrigger`와 `AccordionContent`를 배치하여 토글 기능과 내용을 구현합니다.

- 기본적으로 `type="single"` 속성을 사용하면 한 번에 한 섹션만 펼칠 수 있습니다.
- `type="multiple"` 속성을 주면 여러 섹션이 동시에 펼쳐지는 등 유연한 설정이 가능합니다.
- 또한 `collapsible` 옵션을 추가하면 열린 항목을 다시 클릭해서 모두 닫을 수도 있습니다.

:::info <span class="admonition-title">Accordion</span> 실제 구동 예제 확인해보기
👉 [Accordion: https://next-app-boilerplate.vercel.app/example/components/accordion](https://next-app-boilerplate.vercel.app/example/components/accordion)
:::





## 기본 사용법
---
```tsx showLineNumbers
'use client';

import type { JSX } from 'react';
// highlight-start
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@components/ui';
// highlight-end

interface ISampleAccordionPageProps {
  //
}

const SampleAccordionPage({}: ISampleAccordionPageProps): JSX.Element {
  return (
    <>
      {/* highlight-start */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>아코디언 제목 1</AccordionTrigger>
          <AccordionContent>
            첫 번째 섹션의 내용입니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>아코디언 제목 2</AccordionTrigger>
          <AccordionContent>
            두 번째 섹션의 내용입니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>아코디언 제목 3</AccordionTrigger>
          <AccordionContent>
            세 번째 섹션의 내용입니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* highlight-end */}
    </>
  );
}
```





## 결과 화면
---
![accordion 컴포넌트 예제 이미지](../assets/accordion-component02.png)

:::info <span class="admonition-title">설</span>명
* **next-app-boilerplate** 공통 UI 컴포넌트 디렉토리(`@components/ui`)에서 **Accordion** 관련 컴포넌트들을 import하여 가져옵니다.
  ```tsx
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
  } from '@components/ui';
  ```
* 화면의 **JSX** 영역에서 **Accordion** 컴포넌트와 내부에 각 **AccordionItem**, **AccordionTrigger**, **AccordionContent** 등을 올바른 계층 구조로 배치하여 사용합니다.
  ```tsx
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>제목</AccordionTrigger>
      <AccordionContent>내용</AccordionContent>
    </AccordionItem>
  </Accordion>
  ```
:::



## API 참조
---
**Accordion** 컴포넌트는 **[shadcn/ui](https://ui.shadcn.com/)** 의 Accordion 컴포넌트를 래핑하여 사용합니다.


### 구성 컴포넌트 및 역할
실제 구현 시에는 각 하위 컴포넌트를 문법에 맞는 올바른 계층 구조로 배치해야 합니다.

| Component           | 설명                                                                                                                         |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `Accordion`         | 아코디언의 최상위 래퍼 컴포넌트. 여러 개의 AccordionItem을 묶어주며, type(single/multiple), collapsible 등 전체 동작 방식을 제어합니다. |
| `AccordionItem`     | 각각의 아코디언 섹션을 나타내는 컴포넌트. value(고유값)로 구분하며, 내부적으로 Trigger(제목)와 Content(내용)을 감쌉니다.                 |
| `AccordionTrigger`  | 사용자가 클릭할 수 있는 섹션 헤더(제목) 컴포넌트. 클릭시 해당 섹션이 확장/축소 됩니다. 버튼으로 렌더링되어 접근성 속성(aria-expanded 등)이 자동 처리됩니다.         |
| `AccordionContent`  | 실제로 펼쳐지는 내용 영역. 트랜지션 애니메이션과 함께 렌더링되며, 텍스트·이미지·컴포넌트 등 다양한 내용을 자유롭게 포함할 수 있습니다.                 |


### `<Accordion>` Props

| Prop           | Type             | Default        | 설명                                                                                  |
| :-------------- | :--------------- | :------------- | :------------------------------------------------------------------------------------ |
| `type`          | "single" \| "multiple" | (필수)        | `<Accordion>` 컴포넌트에 반드시 필요한 속성입니다. 단일 또는 다중 오픈 모드를 지정합니다.<br />**single** : 하나의 Contents만 열림.<br />**multiple**: 여러개의 Contents가 열리거나 닫힐 수 있음.                                                |
| `collapsible`   | boolean          | false          | 모든 항목을 닫을 수 있게 할지 여부. `type`속성이 **single**일 때만 사용할 수 있음.                                                  |
| `disabled`      | boolean          | false          | 전체 Accordion의 비활성화 여부.                                                       |
| `asChild`       | boolean          | false          | `true`로 설정하면 Accordion이 자체 DOM 요소를 렌더링하는 대신, 직접 작성한 자식 요소를 렌더링하고 Accordion의 모든 props를 자식 요소에 전달합니다. |
| `dir`           | "ltr" \| "rtl"   | "ltr"          | 레이아웃 텍스트 방향.<br />**용도**: 아랍어, 히브리어 등 RTL언어 지원용.<br />**설명**: 대부분의 한국어\/영어 프로젝트에서는 `dir`속성을 명시할 필요가 없으며, 기본값인 `ltr`이 자동 적용됩니다.                                                                 |
| `expandIcon`    | keyof typeof LucideIcons           | "ChevronDownIcon" | 아코디언 헤더 전체에 표시되는 모든 아이콘 변경. 값으로 [LucideIcons](https://lucide.dev/icons/) 중 하나를 파스칼 케이스로 선택할 수 있습니다.                                                                                 |
| `orientation`   | "vertical"       | "vertical"     | 아코디언의 방향<br />`vertical` \(기본\): 전통적인 FAQ 스타일, 위아래로 쌓임.<br />`horizontal`: 탭형 레이아웃, 좌우로 나열.<br />**사용 시 주의**: horizontal은 flex 레이아웃 필수.<br />**키보드 내비게이션**: 방향에 따라 화살표 키 동작 변경.<br />**실무 활용**: 제품 비교, 타임라인, 대시보드 위젯 등.<br />대부분의 경우 기본 `vertical`을 사용하며, 특별한 레이아웃이 필요할 때만 `horizontal`을 사용합니다.                                              |
| `value`         | string / string[]| 없음           | 제어 방식.<br />`onValueChange`와 함께 사용해야 합니다.<br /><span class="text-color-red">`type="single"`일 때 string, `type="multiple"`일 때 string[] 타입의 값으로 셋팅되어야 합니다.</span>  |
| `defaultValue`  | string / string[]| 없음           | 비제어 초기값.<br /><span class="text-color-red">`type="single"`일 때 string, `type="multiple"`일 때 string[] 타입의 값으로 셋팅되어야 합니다.</span>                        |
| `onValueChange` | (value: string \| string[]) => void | 없음           | value 변경 이벤트 콜백 함수입니다. `value`와 함께 사용해야 합니다.          |

### `<AccordionItem>` Props

| Prop           | Type             | Default        | 설명                                                                                  |
| :------------- | :--------------- | :------------- | :------------------------------------------------------------------------------------ |
| `value`        | `string`         | (필수)         | 아코디언 항목의 고유 값입니다. 모든 아코디언 항목은 고유한 값을 가져야 합니다.            |
| `disabled`     | `boolean`        | `false`        | `true`인 경우, 사용자가 항목과 상호 작용하는 것을 막습니다.                           |
| `asChild`      | `boolean`        | `false`        | `true`로 설정하면, `AccordionItem`이 자체 DOM 요소를 렌더링하는 대신, 직접 작성한 자식 요소를 렌더링하고 `AccordionItem`의 모든 props를 자식 요소에 전달합니다. |


### `<AccordionTrigger>` Props

| Prop           | Type             | Default        | 설명                                                                                  |
| :------------- | :--------------- | :------------- | :------------------------------------------------------------------------------------ |
| `asChild`      | `boolean`        | `false`        | `true`로 설정하면, `AccordionTrigger`이 자체 DOM 요소를 렌더링하는 대신, 직접 작성한 자식 요소를 렌더링하고 `AccordionTrigger`의 모든 props를 자식 요소에 전달합니다. |
| `expandIcon`    | keyof typeof LucideIcons           | "ChevronDownIcon" | 아코디언 헤더에 표시되는 아이콘을 개별적으로 변경. 값으로 [LucideIcons](https://lucide.dev/icons/) 중 하나를 파스칼 케이스로 선택할 수 있습니다.                                                                                 |

### `<AccordionContent>` Props
| Prop           | Type             | Default        | 설명                                                                                  |
| :------------- | :--------------- | :------------- | :------------------------------------------------------------------------------------ |
| `asChild`      | `boolean`        | `false`        | `true`로 설정하면, `AccordionContent`이 자체 DOM 요소를 렌더링하는 대신, 직접 작성한 자식 요소를 렌더링하고 `AccordionContent`의 모든 props를 자식 요소에 전달합니다. |
| `forceMount`   | `boolean`        | -              | `true`인 경우, `open` 상태가 아닐 때도 DOM에 렌더링을 강제합니다. 애니메이션 라이브러리와 함께 사용할 때 유용합니다. |





## 예제
---

### Single(하나씩 열리는) type
* `<Accordion>` 컴포넌트에 **type="single"** 속성을 추가하여 하나씩 열리는 아코디언을 구현할 수 있습니다.

```tsx
// highlight-start
<Accordion type="single">
// highlight-end
  <AccordionItem value="item-1">
    <AccordionTrigger>제목1</AccordionTrigger>
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple(여러 개 열리는) type
* `<Accordion>` 컴포넌트에 **type="multiple"** 속성을 추가하여 여러 섹션을 동시에 열 수 있는 아코디언을 구현할 수 있습니다.
* **type="multiple"** 속성에서 **defaultValue**속성을 사용할 때는 값을 배열로 입력하여야 합니다.

```tsx
// highlight-start
<Accordion
  type="multiple"
  defaultValue={['item-1', 'item-2']}
>
// highlight-end
  <AccordionItem value="item-1">
    <AccordionTrigger>제목1</AccordionTrigger>
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```







### Collapsible (열고 닫기 가능) type
* `<Accordion>` 컴포넌트에 **collapsible** 속성을 추가하면, 현재 열려있는 아코디언 항목을 다시 클릭하여 닫을 수 있습니다.
* **collapsible** 속성을 추가하지 않으면, 아코디언 항목을 클릭하여 열고 닫을 수 없습니다. 또한 **type** 속성을 **single**로 설정해야 합니다.

```tsx
// highlight-start
<Accordion type="single" collapsible>
// highlight-end
  <AccordionItem value="item-1">
    <AccordionTrigger>제목1</AccordionTrigger>
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```








### expandIcon (아코디언 헤더에 표시되는 아이콘 변경)
* `<Accordion>` 컴포넌트의 **expandIcon** 속성을 사용하여 확장 표시 아이콘을 전체적으로 변경하거나, `<AccordionTrigger>` 컴포넌트의 **expandIcon** 속성을 사용하여 확장 표시 아이콘을 개별적으로 변경할 수 있습니다.
* **expandIcon** 속성을 추가하지 않으면, 아코디언 헤더에 표시되는 아이콘은 기본값인 `ChevronDownIcon`이 사용됩니다.
* `<Accordion>` 컴포넌트에 **expandIcon** 속성을 추가했다면, `<AccordionTrigger>` 컴포넌트의 **expandIcon** 속성은 사용할 필요가 없습니다.

```tsx
{/* 아이콘 전체 적용 방법 */}
// highlight-start
<Accordion
  type="single"
  expandIcon="ArrowBigDown"
>
// highlight-end
  <AccordionItem value="item-1">
    {/* 아이콘 개별 적용 방법 */}
    // highlight-start
    <AccordionTrigger expandIcon="ArrowBigDown">제목1</AccordionTrigger>
    // highlight-end
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```






### Disabled (비활성화)
* `<Accordion>` 컴포넌트나 `<AccordionItem>` 컴포넌트의 **disabled** 속성을 사용하여 비활성화 처리할 수 있습니다.
  - `<Accordion>` 컴포넌트에 **disabled** 속성을 추가하면 모든 섹션이 비활성화 됩니다.
  - `<AccordionItem>` 컴포넌트에 **disabled** 속성을 추가하면 해당 섹션이 비활성화 됩니다.
* **disabled** 속성을 추가하면, 아코디언 항목을 클릭해도 열고 닫을 수 없습니다.

```tsx
// highlight-start
<Accordion
  type="single"
  disabled
>
// highlight-end
  {/* AccordionItem 컴포넌트에 disabled 속성을 추가(해당 섹션만 비활성화) */}
  // highlight-start
  <AccordionItem
    value="item-1"
    disabled
  >
  // highlight-end
    <AccordionTrigger>제목1</AccordionTrigger>
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```







### **value**와 **onValueChange**를 사용하여 상태 관리
* `<Accordion>` 컴포넌트에 **value**와 **onValueChange** 속성을 추가하여 아코디언 상태를 관리할 수 있습니다.  
* **value** 속성은 현재 열려있는 아코디언 항목의 고유값을 나타내며, **onValueChange** 속성은 아코디언 항목이 열리거나 닫힐 때 호출되는 콜백 이벤트 함수입니다.

```tsx
// value 상태 값
// highlight-start
const [value, setValue] = useState('item-1');
// highlight-end

// jsx 코드 <Accordion>부분에 value와 onValueChange 속성을 추가
// highlight-start
<Accordion
  type="single"
  expandIcon="ArrowBigDown"
  value={value}
  onValueChange={setValue}
>
// highlight-end
  <AccordionItem value="item-1">
    <AccordionTrigger>제목1</AccordionTrigger>
    <AccordionContent>내용1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>제목2</AccordionTrigger>
    <AccordionContent>내용2</AccordionContent>
  </AccordionItem>
</Accordion>
```

