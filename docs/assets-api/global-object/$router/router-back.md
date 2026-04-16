---
sidebar_position: 1
displayed_sidebar: 'apiDocSidebar'
title: '⋮ $router.back'
---

# $router.back()
* **$router.back()** 메서드는 **클라이언트 전용** 이며 **현재 페이지에서 이전 페이지로 이동**하는 메서드입니다.
* 서버환경에서는 `$router.back()` 메서드는 동작하지 않습니다. 서버환경에서 back 페이지 이동을 위해서는 `$router.push()` 메서드를 사용하여 이전 페이지를 직접 지정해주어야 합니다.






## 기본 사용법
---
```tsx
import { $router } from '@router';

// 브라우저 history stack에서 이전 페이지로 이동
$router.back();
```