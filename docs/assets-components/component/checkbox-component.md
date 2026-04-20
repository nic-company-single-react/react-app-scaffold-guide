---
sidebar_position: 1
displayed_sidebar: 'componentsDocSidebar'
title: 'Checkbox☑️'
---

# Checkbox
**Checkbox** 컴포넌트는 여러가지 옵션 중 **하나 이상을 선택**할 수 있게하는 컴포넌트입니다.
:::note 예제
* **Checkbox 실제 구동 예제를 확인해보기** : → [http://redsky0212.dothome.co.kr/entec/react_assets/ex/#/example/components/checkbox](http://redsky0212.dothome.co.kr/entec/react_assets/ex/#/example/components/checkbox)
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Preview" label="Preview" default>
    
    ![button 컴포넌트 예제 이미지](../assets/checkbox-component01.png)
    
  </TabItem>
  <TabItem value="Code" label="Code">
    ```tsx showLineNumbers
    import type { IComponent } from '@/app/types/common';
    // highlight-start
    import { Checkbox } from '@/app/components/ui';
    // highlight-end

    interface ISamplePageProps {
      //
    }

    const SamplePage: IComponent<ISamplePageProps> = () => {
      const [date, setDate] = useState<Date | undefined>(new Date());

      return (
        <>
          <div className="flex items-center gap-3">
          // highlight-start
            <Checkbox id="terms" />
          // highlight-end
            <label htmlFor="terms">이용약관에 동의합니다</label>
          </div>
        </>
      );
    };

    SamplePage.displayName = 'SamplePage';
    export default SamplePage;
    ```
  </TabItem>
</Tabs>





## 사용법
---
* 애플리케이션 공통 컴포넌트 영역(`@/app/components/ui`)에서 **Checkbox** 컴포넌트를 가져옵니다.
  ```tsx
  import { Checkbox } from '@/app/components/ui';
  ```
* 화면 **jsx** 영역에 **Checkbox** 컴포넌트 코드를 작성하여 사용합니다.
  ```tsx
  <Checkbox />
  ```





## API 참조
---
**react-app-scaffold**의 **Checkbox** 컴포넌트는 **[shadcn/ui](https://ui.shadcn.com/)** 의 **Checkbox** 컴포넌트를 사용하는 래퍼 컴포넌트입니다. 내부에는 **button** html element를 사용합니다.
| Props     | Default | Type                         |
| :-------- | :------- | :-------------------------- |
| `asChild` | false   | boolean                     |
| `defaultChecked`| - | boolean \| 'indeterminate'  |
| `checked` | -       | boolean \| 'indeterminate'  |
| `onCheckedChange`| - | (checked: boolean \| 'indeterminate') => void |
| `disabled` | -      | boolean                      |
| `required` | -      | boolean                      |
| `name`    | -       | string                       |
| `value`   | on      | string                       |

:::warning
* **Checkbox** 컴포넌트는 랜더링 후 생성되는 **HTML element**가 **button**으로 생성됩니다. `<input type="checkbox">` 가 아닙니다. 따라서 다음과 같은 문제점이 있습니다.
  - 폼 데이터 전송 문제
    - 기본 `<input type="checkbox">`는 자동으로 폼 데이터에 포함됩니다.
    - **Checkbox** 컴포넌트는 `<button>` 기반이므로 폼 데이터에 자동으로 포함되지 않습니다.
  - **name**속성 부재
    - 기본 `<input type="checkbox">`는 name 속성으로 서버에 데이터를 전달합니다
    - **Checkbox** 컴포넌트는 `<button>` 기반이므로 name 속성으로 서버에 데이터 전달을 지원하지 않습니다
* 위와같은 상황 때문에 다음과 같이 몇가지 방법으로 사용할 수 있는 방법을 소개합니다.
  1. React Hook Form과 함께 사용
  ```tsx
  import { useForm } from "react-hook-form"
  import { Checkbox } from "@/components/ui/checkbox"
  import { Button } from "@/components/ui/button"

  function MyForm() {
    const { register, handleSubmit, setValue, watch } = useForm({
      defaultValues: {
        terms: false,
        marketing: false,
      }
    })

    const onSubmit = (data) => {
      console.log(data) // { terms: true, marketing: false }
      // API 호출 등
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={watch("terms")}
            onCheckedChange={(checked) => setValue("terms", checked)}
          />
          <label htmlFor="terms">약관에 동의합니다</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketing"
            checked={watch("marketing")}
            onCheckedChange={(checked) => setValue("marketing", checked)}
          />
          <label htmlFor="marketing">마케팅 수신 동의</label>
        </div>

        <Button type="submit">제출</Button>
      </form>
    )
  }
  ```
  2. FormData Controller 패턴 사용
  ```tsx
  import { useForm, Controller } from "react-hook-form"
  import { Checkbox } from "@/components/ui/checkbox"

  function MyForm() {
    const { control, handleSubmit } = useForm()

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          name="terms"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label>약관에 동의합니다</label>
            </div>
          )}
        />
      </form>
    )
  }
  ```
  3. 상태 관리로 직접 처리
  ```tsx
  import { useState } from "react"
  import { Checkbox } from "@/components/ui/checkbox"

  function MyForm() {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      
      // formData 상태를 직접 서버에 전송
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    }

    return (
      <form onSubmit={handleSubmit}>
        <Checkbox
          checked={formData.terms}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, terms: checked }))
          }
        />
        <button type="submit">제출</button>
      </form>
    )
  }
  ```
  4. Hidden Input과 함께 사용 (전통적인 폼 제출 시)
  ```tsx
  function MyForm() {
    const [isChecked, setIsChecked] = useState(false)

    return (
      <form action="/api/submit" method="POST">
        <Checkbox
          checked={isChecked}
          onCheckedChange={setIsChecked}
        />
        {/* Hidden input으로 실제 폼 데이터 전송 */}
        <input 
          type="hidden" 
          name="terms" 
          value={isChecked ? "true" : "false"} 
        />
        <button type="submit">제출</button>
      </form>
    )
  }
  ```
:::







## Button을 사용하는 이유
`Checkbox` 컴포넌트가 내부적으로 Button을 사용하는 이유는 다음과 같습니다.
* **스타일링의 유연성**: CSS로 완전히 커스터마이징 가능
* **애니메이션**: 체크 상태 전환 시 부드러운 애니메이션
* **접근성**: ARIA 속성(role="checkbox", aria-checked)으로 스크린 리더 지원
* **일관된 디자인**: 모던한 UI 패턴에 맞는 시각적 표현

* <span class="text-green-bold">프로젝트에서 React 기반 SPA를 만든다면 문제없지만, 전통적인 서버 사이드 폼 제출이 필요하다면 **hidden input** 방식을 함께 사용하거나 일반 `<input type="checkbox">`를 고려해야 합니다.</span>








## 예제
---
* [Checkbox 컴포넌트 예제 이동](http://redsky0212.dothome.co.kr/entec/react_assets/ex/#/example/checkbox)

### Size

### variant (default)

### variant (outline)

### variant (ghost)





## 변경 내역
---
* 2025-10-22 최초 생성.