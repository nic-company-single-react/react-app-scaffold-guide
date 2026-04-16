---
sidebar_position: 1
displayed_sidebar: 'componentsDocSidebar'
title: 'Badge☑️'
---

# Badge
**Badge** 컴포넌트는 작은 라벨이나 상태 표시를 위해 사용되는 컴포넌트입니다. 주로 텍스트, 아이콘, 또는 다른 요소 옆에 배치되어 추가 정보나 상태를 시각적으로 강조하여 표시합니다.
:::note 예제
* **Badge 실제 구동 예제를 확인해보기** : → [http://redsky0212.dothome.co.kr/entec/react_assets/ex/#/example/components/badge](http://redsky0212.dothome.co.kr/entec/react_assets/ex/#/example/components/badge)
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Preview" label="Preview" default>
    
  ![Badge 컴포넌트 예제 이미지](../assets/badge-component01.png)

  </TabItem>
  <TabItem value="Code" label="Code">
    ```tsx showLineNumbers
    import type { IComponent } from '@/app/types/common';
    // highlight-start
    import { Badge } from '@/app/components/ui';
    // highlight-end

    interface ISampleBadgePageProps {
      //
    }

    const SampleBadgePage: IComponent<ISampleBadgePageProps> = () => {
      return (
        <>
          {/* highlight-start */}
          <Badge>Badge</Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
          <Badge
            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            99
          </Badge>
          {/* highlight-end */}
        </>
      );
    };

    SampleBadgePage.displayName = 'SampleBadgePage';
    export default SampleBadgePage;
    ```
  </TabItem>
</Tabs>



## 사용법
---

* 애플리케이션 공통 컴포넌트 영역(`@/app/components/ui`)에서 **Badge** 컴포넌트를 가져옵니다.
  ```tsx
  import { Badge } from '@/app/components/ui';
  ```
* 화면 **jsx** 영역에 **Badge** 컴포넌트를 구성하여 사용합니다.
  ```tsx
  <Badge>라벨</Badge>
  ```



## API 참조
---
**next-app-boilerplate**의 **Badge** 컴포넌트는 **[shadcn/ui](https://ui.shadcn.com/)** 의 Badge 컴포넌트를 래핑(wrap)한 컴포넌트입니다.

| Component | 설명                                                         |
| :-------- | :---------------------------------------------------------- |
| `Badge`   | 상태나 라벨을 표시하는 Badge 컴포넌트.                      |

### Badge Props

| Props     | Type                                                         | Default | 설명                                                                                  |
| :-------- | :----------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------ |
| `variant` | "default" \| "secondary" \| "destructive" \| "outline"      | "default" | Badge의 스타일 변형을 지정합니다. "default"는 기본 스타일, "secondary"는 보조 스타일, "destructive"는 경고/오류 스타일, "outline"은 외곽선 스타일입니다. |
| `asChild` | boolean                                                      | false   | 자식 요소를 렌더링할지 여부.                                                          |



## 예제
---

### 기본 사용법

```tsx
<Badge>기본 Badge</Badge>
```

### Secondary variant

```tsx
<Badge variant="secondary">Secondary Badge</Badge>
```

### Destructive variant (경고/오류)

```tsx
<Badge variant="destructive">Destructive Badge</Badge>
```

### Outline variant

```tsx
<Badge variant="outline">Outline Badge</Badge>
```

### 텍스트와 함께 사용

```tsx
<div>
  <span>알림</span>
  <Badge>3</Badge>
</div>
```



## 변경 내역
---

* 2025-10-22 최초 생성.

