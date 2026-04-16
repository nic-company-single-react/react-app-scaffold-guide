---
sidebar_position: 1
displayed_sidebar: "nextjsTrainingSidebar"
title: "Image 컴포넌트 사용"
---

# Next.js Image 컴포넌트 사용


## 왜 Next.js Image 컴포넌트를 사용해야 하는가?
---
Next.js의 `Image` 컴포넌트는 일반 HTML `<img>` 태그를 대체하는 강력한 컴포넌트입니다. 다음과 같은 이점들이 있습니다.

**1. 자동 이미지 최적화**
* 자동으로 WebP, AVIF 같은 최신 이미지 포맷으로 변환
* 브라우저가 지원하는 최적의 포맷을 자동 선택
* 이미지 크기를 자동으로 최적화하여 페이지 로딩 속도 향상

**2. 성능 최적화**
* Lazy Loading이 기본적으로 적용되어 뷰포트에 들어올 때만 로드
* CLS(Cumulative Layout Shift) 방지로 레이아웃 변경 없음
* 자동으로 srcset 생성하여 반응형 이미지 제공

**3. 자동 리사이징**
* 다양한 디바이스 크기에 맞는 이미지를 자동 생성
* 불필요하게 큰 이미지 다운로드 방지





## 기본 사용법
---
```tsx showLineNumbers
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="프로필 사진"
      width={500}
      height={500}
    />
  )
}
```
:::info 주요 <span class="admonition-title">Props</span>
**필수 Props:**
* **src**: 이미지 경로 (로컬 또는 외부 URL)
* **alt**: 대체 텍스트
* **width**, **height**: 이미지 크기 (fill 사용 시 제외)

**선택 Props:**
* **fill**: 부모 요소를 채우도록 설정
* **priority**: 우선 로딩 (LCP 이미지에 사용)
* **quality**: 이미지 품질 (1-100, 기본값 75)
* **placeholder**: 로딩 중 표시할 플레이스홀더
* **sizes**: 반응형 이미지 크기 지정
:::






## 실전 예제
---

**1. 로컬 이미지 사용**
```tsx showLineNumbers
import Image from 'next/image';
import profilePic from '../public/me.jpg';

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="내 프로필"
      // width, height는 자동으로 설정됨
      placeholder="blur" // 자동 blur 효과
    />
  )
}
```

**2. 외부 이미지 사용**  
외부 이미지를 사용하려면 next.config.js에 도메인을 추가해야 합니다.
```ts showLineNumbers
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
```

```tsx showLineNumbers
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image
      src="https://example.com/images/avatar.jpg"
      alt="사용자 아바타"
      width={200}
      height={200}
    />
  )
}
```

**3. 반응형 이미지 (fill 사용)**
```tsx showLineNumbers
import Image from 'next/image';

export default function Hero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
        src="/hero.jpg"
        alt="히어로 이미지"
        fill
        style={{ objectFit: 'cover' }}
        sizes="100vw"
      />
    </div>
  )
}
```

**4. Priority 설정 (LCP 최적화)**  
페이지 상단의 중요한 이미지에는 `priority`를 설정하세요.
```tsx showLineNumbers
import Image from 'next/image';

export default function MainBanner() {
  return (
    <Image
      src="/main-banner.jpg"
      alt="메인 배너"
      width={1200}
      height={600}
      priority // Lazy loading 비활성화
    />
  )
}
```

**5. 반응형 sizes 활용**
```tsx showLineNumbers
import Image from 'next/image';

export default function ResponsiveImage() {
  return (
    <Image
      src="/product.jpg"
      alt="제품 이미지"
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // 모바일: 100% / 태블릿: 50% / 데스크톱: 33%
    />
  )
}
```


**6. 블러 플레이스홀더**
```tsx showLineNumbers
import Image from 'next/image';

export default function BlurImage() {
  return (
    <Image
      src="/gallery.jpg"
      alt="갤러리"
      width={600}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // 작은 base64 이미지
    />
  )
}
```



## 성능 비교
---
일반 `<img>` 태그 대비 Next.js Image의 성능 향상:

* 40-60% 더 작은 파일 크기 (WebP/AVIF 변환)
* Lazy loading으로 초기 로딩 시간 단축
* CLS 점수 개선으로 사용자 경험 향상
* 자동 반응형 이미지로 대역폭 절약

## 팁
---
* **LCP 이미지**에는 반드시 `priority` 추가
* 외부 이미지는 보안을 위해 도메인 화이트리스트 설정
* `fill`을 사용할 때는 부모 요소에 `position: relative` 필수
* 정적 import를 사용하면 width/height 자동 설정
* `quality` 값을 조정하여 파일 크기와 품질의 균형 맞추기

Next.js Image 컴포넌트는 웹 성능을 크게 향상시키는 필수 도구입니다. 특별한 이유가 없다면 항상 `<img>` 대신 Image를 사용합니다.